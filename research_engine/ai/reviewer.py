from __future__ import annotations

from __future__ import annotations

import json

from research_engine.ai.client import LLMClient
from research_engine.ai.prompts import REVIEWER_SYSTEM_PROMPT
from research_engine.errors import LLMResponseError
from research_engine.models import ArticleDraft, ResearchDataset, ReviewIssue, ReviewResult


class DraftReviewer:
    def __init__(self, client: LLMClient | None = None) -> None:
        self.client = client
        self.warnings: list[str] = []

    def review(self, draft: ArticleDraft, dataset: ResearchDataset) -> ReviewResult:
        issues: list[ReviewIssue] = []
        coverage = min(100, len(dataset.sources) * 25)
        factual = min(100, 55 + min(len(dataset.facts) + len(dataset.definitions), 20) * 2)
        readability = 80 if len(draft.content) > 500 else 55
        structure = 90 if "## References" in draft.content else 50
        if len(dataset.sources) < 3:
            issues.append(ReviewIssue("insufficient_sources", "Research", "At least three successful trusted sources are required."))
        if not dataset.facts and not dataset.definitions:
            issues.append(ReviewIssue("missing_evidence", "Research", "No factual evidence notes were extracted."))
        if draft.generation_method != "llm":
            issues.append(ReviewIssue("human_rewrite_required", "Draft", "The draft is a citation scaffold; an editor or configured AI writer must create final original prose."))
        overall = round((factual + coverage + readability + structure) / 4)
        deterministic = ReviewResult(
            factual_accuracy=factual, source_coverage=coverage, readability=readability,
            structure=structure, overall_score=overall, issues=issues,
        )
        if not self.client:
            return deterministic
        try:
            return self._review_with_ai(draft, dataset, deterministic)
        except LLMResponseError as error:
            self.warnings.append(f"AI review failed; used deterministic review ({error})")
            return deterministic

    def _review_with_ai(self, draft: ArticleDraft, dataset: ResearchDataset, deterministic: ReviewResult) -> ReviewResult:
        payload = {"draft": draft.to_dict(), "evidence_dataset": dataset.to_dict(), "deterministic_review": deterministic.to_dict()}
        result = self.client.complete_json(REVIEWER_SYSTEM_PROMPT, json.dumps(payload, ensure_ascii=False))
        try:
            scores = {key: max(0, min(100, int(result[key]))) for key in ("factual_accuracy", "source_coverage", "readability", "structure")}
        except (KeyError, TypeError, ValueError) as error:
            raise LLMResponseError("AI review has invalid scores.") from error
        raw_issues = result.get("issues", [])
        if not isinstance(raw_issues, list):
            raise LLMResponseError("AI review issues must be a list.")
        ai_issues = [
            ReviewIssue(type=str(item.get("type", "review_note")), section=str(item.get("section", "Draft")), message=str(item.get("message", "")))
            for item in raw_issues if isinstance(item, dict) and str(item.get("message", "")).strip()
        ]
        issues = [*deterministic.issues, *ai_issues]
        return ReviewResult(
            factual_accuracy=min(deterministic.factual_accuracy, scores["factual_accuracy"]),
            source_coverage=min(deterministic.source_coverage, scores["source_coverage"]),
            readability=min(deterministic.readability, scores["readability"]),
            structure=min(deterministic.structure, scores["structure"]),
            overall_score=min(deterministic.overall_score, round(sum(scores.values()) / 4)),
            issues=issues,
        )
