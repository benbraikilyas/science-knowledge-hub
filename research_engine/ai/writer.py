from __future__ import annotations

from __future__ import annotations

import json

from research_engine.ai.client import LLMClient
from research_engine.ai.prompts import WRITER_SYSTEM_PROMPT
from research_engine.errors import LLMResponseError
from research_engine.models import ArticleDraft, ArticleOutline, ResearchDataset


class EvidenceDraftWriter:
    """Creates a citation-first draft. It never publishes and keeps prose intentionally reviewable."""

    def __init__(self, client: LLMClient | None = None) -> None:
        self.client = client
        self.warnings: list[str] = []

    def write(self, dataset: ResearchDataset, outline: ArticleOutline) -> ArticleDraft:
        citations = [
            {"name": source.name, "url": source.url, "domain": source.domain}
            for source in dataset.sources
        ]
        if self.client:
            try:
                return self._write_with_ai(dataset, outline, citations)
            except LLMResponseError as error:
                self.warnings.append(f"AI writing failed; saved citation scaffold instead ({error})")
        selected_facts = [*dataset.definitions, *dataset.facts][:8]
        evidence_lines = []
        for fact in selected_facts:
            sources = ", ".join(item.source_name for item in fact.supported_by)
            evidence_lines.append(f"- {fact.claim} *(Evidence: {sources})*")
        content = "\n\n".join([
            f"# {outline.title}",
            f"This draft synthesizes evidence from {len(dataset.sources)} independent trusted sources. It is a research draft and requires human editorial review before publication.",
            "## The Core Idea",
            "The following evidence notes identify the concepts and findings that should be explained in an original editorial voice during human review:",
            "\n".join(evidence_lines) or "No extractable evidence notes were found; do not publish this draft.",
            "## How Scientists Study It",
            "The source set should be compared for methods, evidence, limits, and areas of agreement before any final publication.",
            "## References",
            "\n".join(f"- [{source['name']}]({source['url']})" for source in citations),
        ])
        faq = [
            {"question": question, "answer": "Answer after human review of the cited research dataset."}
            for question in outline.faq_questions
        ]
        return ArticleDraft(
            title=outline.title, slug=dataset.slug, category=dataset.category,
            excerpt=f"An evidence-grounded introduction to {dataset.topic}, based on {len(dataset.sources)} trusted sources.",
            content=content, faq=faq, sources=citations, status="needs_revision",
        )

    def _write_with_ai(
        self, dataset: ResearchDataset, outline: ArticleOutline, citations: list[dict[str, str]],
    ) -> ArticleDraft:
        prompt = json.dumps({"outline": outline.to_dict(), "evidence_dataset": dataset.to_dict()}, ensure_ascii=False)
        result = self.client.complete_json(WRITER_SYSTEM_PROMPT, prompt)
        title = str(result.get("title", "")).strip()
        excerpt = str(result.get("excerpt", "")).strip()
        content = str(result.get("content", "")).strip()
        raw_faq = result.get("faq", [])
        if not isinstance(raw_faq, list):
            raise LLMResponseError("AI draft FAQ must be a list.")
        faq = [
            {"question": str(item.get("question", "")).strip(), "answer": str(item.get("answer", "")).strip()}
            for item in raw_faq if isinstance(item, dict)
        ]
        allowed_urls = {item["url"] for item in citations}
        if not title or len(excerpt) < 40 or len(content) < 700 or "## References" not in content:
            raise LLMResponseError("AI draft is missing required article structure.")
        if not any(url in content for url in allowed_urls):
            raise LLMResponseError("AI draft contains no citation to the supplied evidence URLs.")
        if len(faq) < 2 or any(not item["question"] or not item["answer"] for item in faq):
            raise LLMResponseError("AI draft has an incomplete FAQ.")
        return ArticleDraft(
            title=title, slug=dataset.slug, category=dataset.category, excerpt=excerpt,
            content=content, faq=faq[:5], sources=citations, status="needs_revision",
            generation_method="llm",
        )
