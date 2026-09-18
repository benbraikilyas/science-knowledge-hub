from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from urllib.error import HTTPError

from research_engine.ai.client import LLMClient
from research_engine.ai.reviewer import DraftReviewer
from research_engine.ai.writer import EvidenceDraftWriter
from research_engine.config import is_trusted_url
from research_engine.crawler import Crawl4AICollector
from research_engine.discovery import SourceFinder
from research_engine.models import ArticleDraft, ArticleOutline, CrawledSource, Evidence, ResearchDataset, ResearchFact, Source
from research_engine.models.schemas import JobStatus, ResearchJob
from research_engine.processing.deduplicator import FactDeduplicator
from research_engine.processing.validator import normalize_url, slugify
from research_engine.storage import FileStore


class CoreEngineTest(unittest.TestCase):
    def test_slugify(self) -> None:
        self.assertEqual(slugify("Quantum Entanglement!"), "quantum-entanglement")

    def test_normalize_url_rejects_http(self) -> None:
        with self.assertRaises(Exception):
            normalize_url("http://example.org")

    def test_arxiv_domain_is_trusted_for_quantum(self) -> None:
        self.assertTrue(is_trusted_url("https://arxiv.org/abs/quant-ph/0702225", "quantum-physics"))

    def test_deduplicator_keeps_evidence(self) -> None:
        first = ResearchFact("one", "Quantum systems show non-classical correlations in experiments.", [Evidence("IBM", "https://ibm.com")], "medium")
        second = ResearchFact("two", "Quantum systems show non-classical correlations in experiments today.", [Evidence("APS", "https://aps.org")], "medium")
        result = FactDeduplicator().deduplicate([first, second])
        self.assertEqual(len(result), 1)
        self.assertEqual(len(result[0].supported_by), 2)

    def test_status_transition_validation(self) -> None:
        job = ResearchJob(topic="Topic", slug="topic", category="quantum-physics")
        job.transition(JobStatus.CRAWLED.value)
        with self.assertRaises(Exception):
            job.transition(JobStatus.APPROVED.value)

    def test_file_store_preserves_raw_file(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            store = FileStore(Path(directory))
            store.save_research("topic", {"topic": "first"})
            self.assertEqual(store._read_json(Path(directory) / "research" / "topic.json")["topic"], "first")

    def test_raw_storage_uses_url_hash_and_is_immutable(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            store = FileStore(Path(directory))
            source = Source("A source", "aps.org", "https://aps.org/article", "quantum-physics")
            capture = CrawledSource(source, "Title", "original capture", [])
            path = store.save_raw_immutable("topic", capture)
            store.save_raw_immutable("topic", CrawledSource(source, "Changed", "changed capture", []))
            self.assertIn("a-source-", path.name)
            self.assertEqual(store._read_json(path)["content"], "original capture")

    def test_job_persistence_round_trip(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            store = FileStore(Path(directory))
            job = ResearchJob(topic="Topic", slug="topic", category="quantum-physics")
            job.transition(JobStatus.CRAWLED.value)
            job.record("source_failed", "blocked")
            store.save_job(job.slug, job.to_dict())
            restored = ResearchJob.from_dict(store.load_job("topic"))
            self.assertEqual(restored.status, JobStatus.CRAWLED.value)
            self.assertEqual(restored.events[-1]["event"], "source_failed")

    def test_sources_file_accepts_structured_urls(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "sources.json"
            path.write_text('["https://arxiv.org/abs/quant-ph/0702225", {"name": "APS", "url": "https://physics.aps.org/articles/v15/157"}]', encoding="utf-8")
            urls = SourceFinder.urls_from_file(str(path))
            sources = SourceFinder().discover("Different topic", "quantum-physics", 3, urls)
            self.assertEqual(len(sources), 2)

    def test_review_requires_human_rewrite(self) -> None:
        source = Source("IBM", "ibm.com", "https://ibm.com", "quantum-physics")
        dataset = ResearchDataset("Topic", "topic", "quantum-physics", [], [], [], [], [], [], [], [], [], [source])
        draft = ArticleDraft("Title", "topic", "quantum-physics", "Excerpt", "# Title", [], [], "needs_revision")
        review = DraftReviewer().review(draft, dataset)
        self.assertTrue(any(issue.type == "human_rewrite_required" for issue in review.issues))

    def test_ai_writer_produces_reviewable_draft_with_evidence_urls(self) -> None:
        class FakeClient:
            def complete_json(self, *_args: object) -> dict[str, object]:
                return {
                    "title": "What Is Quantum Entanglement?",
                    "excerpt": "A clear, evidence-grounded overview of quantum entanglement and why scientists study it.",
                    "content": "# What Is Quantum Entanglement?\n\n" + ("Original explanation. " * 50) + "\n\n[Evidence](https://aps.org/article)\n\n## References\n- [APS](https://aps.org/article)",
                    "faq": [{"question": "What is it?", "answer": "A quantum correlation."}, {"question": "Why study it?", "answer": "It tests quantum theory."}],
                }

        source = Source("APS", "aps.org", "https://aps.org/article", "quantum-physics")
        fact = ResearchFact("fact_01_001", "Experiments test quantum correlations.", [Evidence("APS", source.url)], "medium")
        dataset = ResearchDataset("Quantum Entanglement", "quantum-entanglement", "quantum-physics", [], [fact], [], [], [], [], [], [], [], [source])
        draft = EvidenceDraftWriter(client=FakeClient()).write(dataset, ArticleOutline("What Is Quantum Entanglement?", ["Core"], ["What is it?", "Why study it?"]))
        self.assertEqual(draft.generation_method, "llm")
        self.assertIn(source.url, draft.content)

    def test_llm_json_decoder_accepts_fenced_json(self) -> None:
        self.assertEqual(LLMClient._decode_json("```json\n{\"ok\": true}\n```"), {"ok": True})

    def test_missing_robots_file_allows_collection(self) -> None:
        missing = HTTPError("https://aps.org/robots.txt", 404, "Not Found", {}, None)
        with patch("research_engine.crawler.crawl.urlopen", side_effect=missing):
            allowed, reason = Crawl4AICollector._robots_decision("https://aps.org/article")
        self.assertTrue(allowed)
        self.assertIn("not found", reason)
