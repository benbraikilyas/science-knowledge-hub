from __future__ import annotations

import re

from research_engine.models.schemas import CrawledSource, Evidence, ResearchFact


class FactExtractor:
    """Conservative local extractor that creates evidence-linked research notes."""

    SCIENCE_TERMS = (
        "experiment", "theory", "measurement", "evidence", "quantum", "particle",
        "energy", "research", "study", "scientist", "discovery", "observed", "proved",
        "demonstrated", "measured", "law", "model", "technology",
    )

    def extract(self, source: CrawledSource, source_index: int) -> tuple[list[ResearchFact], list[ResearchFact]]:
        sentences = self._sentences(source.content)
        evidence = Evidence(source_name=source.source.name, source_url=source.source.url)
        facts: list[ResearchFact] = []
        definitions: list[ResearchFact] = []
        for sentence in sentences:
            lowered = sentence.lower()
            if not any(term in lowered for term in self.SCIENCE_TERMS):
                continue
            if len(sentence) < 80 or len(sentence) > 500:
                continue
            target = definitions if self._is_definition(lowered) else facts
            if len(target) >= 8:
                continue
            target.append(ResearchFact(
                id=f"fact_{source_index:02d}_{len(facts) + len(definitions) + 1:03d}",
                claim=sentence,
                supported_by=[evidence],
                confidence="medium",
                kind="definition" if target is definitions else "fact",
            ))
        return definitions, facts

    @staticmethod
    def _sentences(content: str) -> list[str]:
        plain = re.sub(r"\[[^\]]+\]\([^\)]+\)", "", content)
        return [item.strip(" -") for item in re.split(r"(?<=[.!?])\s+", plain) if item.strip()]

    @staticmethod
    def _is_definition(sentence: str) -> bool:
        return " is " in sentence or " refers to " in sentence or " is defined " in sentence
