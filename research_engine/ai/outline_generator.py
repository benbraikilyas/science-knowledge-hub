from __future__ import annotations

from __future__ import annotations

import json

from research_engine.ai.client import LLMClient
from research_engine.ai.prompts import OUTLINE_SYSTEM_PROMPT
from research_engine.errors import LLMResponseError
from research_engine.models import ArticleOutline, ResearchDataset


class OutlineGenerator:
    def __init__(self, client: LLMClient | None = None) -> None:
        self.client = client
        self.warnings: list[str] = []

    def generate(self, dataset: ResearchDataset) -> ArticleOutline:
        if self.client:
            try:
                result = self.client.complete_json(OUTLINE_SYSTEM_PROMPT, json.dumps(dataset.to_dict(), ensure_ascii=False))
                title = str(result["title"]).strip()
                sections = [str(item).strip() for item in result["sections"] if str(item).strip()]
                questions = [str(item).strip() for item in result["faq_questions"] if str(item).strip()]
                if title and 3 <= len(sections) <= 7 and 2 <= len(questions) <= 4:
                    return ArticleOutline(title=title, sections=sections, faq_questions=questions)
                raise LLMResponseError("AI outline has an invalid title, section count, or FAQ count.")
            except (KeyError, TypeError, LLMResponseError) as error:
                self.warnings.append(f"AI outline failed; used deterministic outline ({error})")
        return ArticleOutline(
            title=f"What Is {dataset.topic}?",
            sections=[
                f"What Is {dataset.topic}?", "The Core Idea", "How Scientists Study It",
                "Why It Matters", "Limits and Open Questions", "References",
            ],
            faq_questions=[
                f"What is {dataset.topic}?", f"Why is {dataset.topic} important?",
                f"What are the limits of current research on {dataset.topic}?",
            ],
        )
