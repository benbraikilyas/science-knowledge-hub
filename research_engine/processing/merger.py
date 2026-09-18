from __future__ import annotations

from research_engine.models import CrawledSource, ResearchDataset, ResearchFact
from research_engine.processing.deduplicator import FactDeduplicator
from research_engine.processing.extractor import FactExtractor


class ResearchMerger:
    def __init__(self, extractor: FactExtractor | None = None, deduplicator: FactDeduplicator | None = None) -> None:
        self.extractor = extractor or FactExtractor()
        self.deduplicator = deduplicator or FactDeduplicator()

    def build_dataset(self, topic: str, slug: str, category: str | None, sources: list[CrawledSource]) -> ResearchDataset:
        definitions: list[ResearchFact] = []
        facts: list[ResearchFact] = []
        for index, source in enumerate(sources, start=1):
            extracted_definitions, extracted_facts = self.extractor.extract(source, index)
            definitions.extend(extracted_definitions)
            facts.extend(extracted_facts)
        definitions = self.deduplicator.deduplicate(definitions)
        facts = self.deduplicator.deduplicate(facts)
        return ResearchDataset(
            topic=topic, slug=slug, category=category, definitions=definitions, facts=facts,
            scientists=[], experiments=[], discoveries=[], applications=[], limitations=[],
            misconceptions=[], open_questions=[], sources=[source.source for source in sources],
        )
