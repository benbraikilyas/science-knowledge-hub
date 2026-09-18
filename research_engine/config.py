from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urlparse

from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parent.parent
ENGINE_ROOT = PROJECT_ROOT / "research_engine"


TRUSTED_DOMAINS: dict[str, tuple[str, ...]] = {
    "general": (
        "nature.com", "science.org", "mit.edu", "stanford.edu", "harvard.edu",
        "nobelprize.org", "cern.ch", "home.cern", "aps.org", "nist.gov",
    ),
    "space": ("nasa.gov", "jpl.nasa.gov", "esa.int"),
    "quantum-physics": (
        "ibm.com", "aps.org", "physics.aps.org", "cern.ch", "home.cern", "mit.edu", "nist.gov", "arxiv.org",
        "nature.com", "nobelprize.org",
    ),
    "biology": ("nih.gov", "ncbi.nlm.nih.gov", "nature.com", "science.org"),
    "artificial-intelligence": (
        "arxiv.org", "openai.com", "deepmind.google", "mit.edu", "stanford.edu",
    ),
}

# These are curated entry points, not copied content. Users can add --source URLs
# when they need a more specific research set.
CURATED_TOPIC_SOURCES: dict[str, tuple[tuple[str, str], ...]] = {
    "quantum-entanglement": (
        ("Nobel Prize", "https://www.nobelprize.org/prizes/physics/2022/popular-information/"),
        ("APS Physics", "https://physics.aps.org/articles/v15/157"),
        ("Stanford Encyclopedia of Philosophy", "https://plato.stanford.edu/entries/qt-entangle/"),
        ("arXiv Review", "https://arxiv.org/abs/quant-ph/0702225"),
    ),
}


@dataclass(frozen=True)
class LLMConfig:
    enabled: bool
    base_url: str
    api_key: str
    model: str
    timeout_seconds: int
    max_input_chars: int


@dataclass(frozen=True)
class EngineConfig:
    engine_root: Path
    storage_root: Path
    logs_root: Path
    min_valid_sources: int
    min_review_score: int
    max_source_chars: int
    respect_robots: bool
    author_id: str
    author_name: str
    llm: LLMConfig

    @classmethod
    def from_environment(cls) -> "EngineConfig":
        load_dotenv(ENGINE_ROOT / ".env")
        llm_enabled = os.getenv("RESEARCH_LLM_ENABLED", "false").lower() in {"1", "true", "yes"}
        return cls(
            engine_root=ENGINE_ROOT,
            storage_root=ENGINE_ROOT / "storage",
            logs_root=ENGINE_ROOT / "logs",
            min_valid_sources=int(os.getenv("RESEARCH_MIN_VALID_SOURCES", "3")),
            min_review_score=int(os.getenv("RESEARCH_MIN_REVIEW_SCORE", "85")),
            max_source_chars=int(os.getenv("RESEARCH_MAX_SOURCE_CHARS", "30000")),
            respect_robots=os.getenv("RESEARCH_RESPECT_ROBOTS", "true").lower() in {"1", "true", "yes"},
            author_id=os.getenv("RESEARCH_AUTHOR_ID", "sciencehub-editorial-team"),
            author_name=os.getenv("RESEARCH_AUTHOR_NAME", "ScienceHub Editorial Team"),
            llm=LLMConfig(
                enabled=llm_enabled,
                base_url=os.getenv("RESEARCH_LLM_BASE_URL", "").rstrip("/"),
                api_key=os.getenv("RESEARCH_LLM_API_KEY", ""),
                model=os.getenv("RESEARCH_LLM_MODEL", ""),
                timeout_seconds=int(os.getenv("RESEARCH_LLM_TIMEOUT_SECONDS", "60")),
                max_input_chars=int(os.getenv("RESEARCH_LLM_MAX_INPUT_CHARS", "24000")),
            ),
        )


def trusted_domains_for(category: str | None) -> tuple[str, ...]:
    domains = list(TRUSTED_DOMAINS["general"])
    for domain in TRUSTED_DOMAINS.get(category or "", ()):
        if domain not in domains:
            domains.append(domain)
    return tuple(domains)


def is_trusted_url(url: str, category: str | None) -> bool:
    parsed = urlparse(url)
    if parsed.scheme != "https" or not parsed.netloc:
        return False
    host = parsed.hostname.lower() if parsed.hostname else ""
    return any(host == domain or host.endswith(f".{domain}") for domain in trusted_domains_for(category))
