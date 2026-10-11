from __future__ import annotations

import re

from research_engine.models.schemas import ResearchFact


class FactDeduplicator:
    def deduplicate(self, facts: list[ResearchFact]) -> list[ResearchFact]:
        merged: list[ResearchFact] = []
        for fact in facts:
            match = next((candidate for candidate in merged if self._similar(fact.claim, candidate.claim)), None)
            if not match:
                merged.append(fact)
                continue
            evidence = list({(item.source_name, item.source_url): item for item in [*match.supported_by, *fact.supported_by]}.values())
            merged[merged.index(match)] = ResearchFact(
                id=match.id,
                claim=match.claim,
                supported_by=evidence,
                confidence="high" if len(evidence) > 1 else match.confidence,
                kind=match.kind,
            )
        return merged

    @staticmethod
    def _similar(first: str, second: str) -> bool:
        first_words = set(re.findall(r"[a-z0-9]+", first.lower()))
        second_words = set(re.findall(r"[a-z0-9]+", second.lower()))
        if not first_words or not second_words:
            return False
        return len(first_words & second_words) / len(first_words | second_words) >= 0.72
