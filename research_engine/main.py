from __future__ import annotations

import argparse
import asyncio
import logging
import sys
from pathlib import Path

if __package__ in {None, ""}:
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from research_engine.ai import DraftReviewer, EvidenceDraftWriter, LLMClient, OutlineGenerator, Researcher
from research_engine.config import EngineConfig
from research_engine.crawler import Crawl4AICollector
from research_engine.discovery import SourceFinder
from research_engine.errors import InsufficientResearchError, ResearchEngineError
from research_engine.exporters import BackendDraftExporter
from research_engine.models import ArticleDraft, JobStatus, ResearchJob, ReviewResult
from research_engine.processing import ContentCleaner, ResearchMerger, slugify
from research_engine.storage import FileStore


def configure_logging(config: EngineConfig) -> logging.Logger:
    config.logs_root.mkdir(parents=True, exist_ok=True)
    logger = logging.getLogger("science_hub.research")
    logger.setLevel(logging.INFO)
    if not logger.handlers:
        formatter = logging.Formatter("%(asctime)s %(levelname)s %(message)s")
        stream = logging.StreamHandler()
        stream.setFormatter(formatter)
        file_handler = logging.FileHandler(config.logs_root / "research_engine.log", encoding="utf-8")
        file_handler.setFormatter(formatter)
        logger.addHandler(stream)
        logger.addHandler(file_handler)
    return logger


async def run_topic(args: argparse.Namespace) -> int:
    config = EngineConfig.from_environment()
    logger = configure_logging(config)
    store = FileStore(config.storage_root)
    slug = slugify(args.topic)
    job = ResearchJob(topic=args.topic, slug=slug, category=args.category)
    store.save_job(slug, job.to_dict())

    print("\nSCIENCE KNOWLEDGE HUB RESEARCH ENGINE")
    print(f"Topic: {args.topic}\nCategory: {args.category or 'general'}")
    finder = SourceFinder()
    file_sources = finder.urls_from_file(args.sources_file) if args.sources_file else []
    sources = finder.discover(args.topic, args.category, args.max_sources, [*args.source, *file_sources])
    job.record("sources_discovered", f"{len(sources)} trusted candidates")
    store.save_job(slug, job.to_dict())
    logger.info("Discovered %s trusted source candidates for %s", len(sources), slug)
    print(f"[1/7] Discovered {len(sources)} trusted sources")

    crawler = Crawl4AICollector(config.max_source_chars, respect_robots=config.respect_robots)
    crawled, failures = await crawler.crawl_sources(sources)
    for source in crawled:
        store.save_raw_immutable(slug, source)
    for failure in failures:
        logger.warning("Source failure: %s", failure)
        job.record("source_failed", failure)
    print(f"[2/7] Crawled {len(crawled)}/{len(sources)} sources")
    if len(crawled) < config.min_valid_sources:
        job.transition(JobStatus.INSUFFICIENT_RESEARCH.value)
        store.save_job(slug, job.to_dict())
        raise InsufficientResearchError(
            f"Only {len(crawled)} sources succeeded; minimum is {config.min_valid_sources}."
        )
    job.transition(JobStatus.CRAWLED.value)
    store.save_job(slug, job.to_dict())

    cleaner = ContentCleaner()
    cleaned = [type(source)(**{**source.__dict__, "content": cleaner.clean(source.content)}) for source in crawled]
    llm_client = LLMClient.from_config(config.llm)
    researcher = Researcher(client=llm_client, max_input_chars=config.llm.max_input_chars)
    dataset = ResearchMerger(extractor=researcher).build_dataset(args.topic, slug, args.category, cleaned)
    for warning in researcher.warnings:
        logger.warning(warning)
        job.record("ai_fallback", warning)
    store.save_research(slug, dataset.to_dict())
    job.transition(JobStatus.RESEARCH_COMPLETE.value)
    store.save_job(slug, job.to_dict())
    print(f"[3/7] Saved research dataset with {len(dataset.definitions) + len(dataset.facts)} evidence notes")

    job.transition(JobStatus.GENERATING.value)
    store.save_job(slug, job.to_dict())
    outline_generator = OutlineGenerator(client=llm_client)
    outline = outline_generator.generate(dataset)
    writer = EvidenceDraftWriter(client=llm_client)
    draft = writer.write(dataset, outline)
    reviewer = DraftReviewer(client=llm_client)
    review = reviewer.review(draft, dataset)
    for warning in [*outline_generator.warnings, *writer.warnings, *reviewer.warnings]:
        logger.warning(warning)
        job.record("ai_fallback", warning)
    blocking_issues = {"insufficient_sources", "missing_evidence", "human_rewrite_required", "unsupported_claims", "missing_citations"}
    can_review = (
        draft.generation_method == "llm"
        and review.overall_score >= config.min_review_score
        and not any(issue.type in blocking_issues for issue in review.issues)
    )
    draft_status = JobStatus.REVIEW_REQUIRED.value if can_review else JobStatus.NEEDS_REVISION.value
    draft = ArticleDraft(**{**draft.__dict__, "status": draft_status, "review": review.to_dict()})
    store.save_draft(slug, draft.to_dict())
    store.save_review(slug, review.to_dict())
    job.transition(draft_status)
    store.save_job(slug, job.to_dict())
    print(f"[4/7] Draft and review saved. Score: {review.overall_score}/100")
    print(f"STATUS: {job.status.upper()}")
    print(f"Draft: {config.storage_root / 'drafts' / f'{slug}.json'}")
    return 0


def approve(slug: str) -> int:
    config = EngineConfig.from_environment()
    store = FileStore(config.storage_root)
    draft = ArticleDraft.from_dict(store.load_draft(slug))
    review = ReviewResult.from_dict(store.load_review(slug))
    if (
        draft.status != JobStatus.REVIEW_REQUIRED.value
        or draft.generation_method != "llm"
        or review.overall_score < config.min_review_score
    ):
        raise ResearchEngineError("Only a review_required draft that passes the quality threshold can be approved.")
    approved_path = store.approve_draft(slug)
    job = _load_job(store, slug, draft)
    job.transition(JobStatus.APPROVED.value)
    job.record("human_approved", "Explicit CLI approval; still not published.")
    store.save_job(slug, job.to_dict())
    print(f"Approved for manual backend import: {approved_path}")
    return 0


def import_approved(slug: str) -> int:
    config = EngineConfig.from_environment()
    store = FileStore(config.storage_root)
    approved_path = config.storage_root / "approved" / f"{slug}.json"
    draft = ArticleDraft.from_dict(store._read_json(approved_path))
    identifier = BackendDraftExporter(config.author_id, config.author_name).import_draft(draft)
    job = _load_job(store, slug, draft, default_status=JobStatus.APPROVED.value)
    job.transition(JobStatus.IMPORTED.value)
    job.record("backend_draft_imported", identifier)
    store.save_job(slug, job.to_dict())
    print(f"Imported backend draft id: {identifier}")
    return 0


def manual_transition(slug: str, target: str) -> int:
    config = EngineConfig.from_environment()
    store = FileStore(config.storage_root)
    draft = ArticleDraft.from_dict(store.load_draft(slug))
    job = _load_job(store, slug, draft)
    job.transition(target)
    job.record("human_status_change", target)
    draft = ArticleDraft(**{**draft.__dict__, "status": target})
    store.save_draft(slug, draft.to_dict())
    store.save_job(slug, job.to_dict())
    print(f"Draft status changed to: {target}")
    return 0


def _load_job(store: FileStore, slug: str, draft: ArticleDraft, default_status: str | None = None) -> ResearchJob:
    try:
        return ResearchJob.from_dict(store.load_job(slug))
    except FileNotFoundError:
        # Supports review artifacts produced by the earlier V1 without inventing approval.
        return ResearchJob(topic=draft.title, slug=slug, category=draft.category, status=default_status or draft.status)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Science Knowledge Hub evidence-grounded research engine")
    parser.add_argument("--topic", help="Research topic, e.g. Quantum Entanglement")
    parser.add_argument("--category", help="Existing Science Hub category slug")
    parser.add_argument("--max-sources", type=int, default=5)
    parser.add_argument("--source", action="append", default=[], help="Additional trusted HTTPS source URL; repeatable")
    parser.add_argument("--sources-file", help="JSON array of trusted source URLs or {url, name} objects")
    parser.add_argument("--approve", help="Approve a review_required draft by slug")
    parser.add_argument("--import-approved", help="Import an approved article to MongoDB as an unpublished draft")
    parser.add_argument("--mark-needs-revision", help="Move a review draft back to needs_revision after human review")
    parser.add_argument("--reject", help="Reject a draft permanently after human review")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        if args.approve:
            return approve(args.approve)
        if args.import_approved:
            return import_approved(args.import_approved)
        if args.mark_needs_revision:
            return manual_transition(args.mark_needs_revision, JobStatus.NEEDS_REVISION.value)
        if args.reject:
            return manual_transition(args.reject, JobStatus.REJECTED.value)
        if not args.topic:
            raise ResearchEngineError("--topic is required unless using --approve or --import-approved")
        return asyncio.run(run_topic(args))
    except ResearchEngineError as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
