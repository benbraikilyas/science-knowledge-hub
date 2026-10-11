from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlparse

from research_engine.config import CURATED_TOPIC_SOURCES, is_trusted_url
from research_engine.errors import ValidationError
from research_engine.models import Source
from research_engine.processing.validator import normalize_url, slugify


class SourceFinder:
    """Returns trusted, topic-specific source candidates without scraping search pages."""

    def discover(
        self,
        topic: str,
        category: str | None,
        max_sources: int,
        source_urls: list[str] | None = None,
    ) -> list[Source]:
        slug = slugify(topic)
        candidates = list(CURATED_TOPIC_SOURCES.get(slug, ()))
        candidates.extend((self._name_from_url(url), url) for url in (source_urls or []))

        seen: set[str] = set()
        sources: list[Source] = []
        for name, url in candidates:
            normalized = normalize_url(url)
            if normalized in seen:
                continue
            if not is_trusted_url(normalized, category):
                raise ValidationError(f"Untrusted or invalid source URL: {url}")
            seen.add(normalized)
            sources.append(Source(
                name=name,
                domain=urlparse(normalized).hostname or "",
                url=normalized,
                category=category,
            ))
            if len(sources) >= max_sources:
                break

        if not sources:
            raise ValidationError(
                "No curated sources exist for this topic. Add at least one trusted URL with --source."
            )
        return sources

    @staticmethod
    def urls_from_file(path: str) -> list[str]:
        """Load a user-curated JSON list of HTTPS URLs without scraping a search engine."""
        source_path = Path(path)
        try:
            payload = json.loads(source_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            raise ValidationError(f"Cannot read --sources-file '{path}': {error}") from error
        if not isinstance(payload, list):
            raise ValidationError("--sources-file must contain a JSON array of URLs or {url, name} objects.")
        urls: list[str] = []
        for item in payload:
            if isinstance(item, str):
                urls.append(item)
            elif isinstance(item, dict) and isinstance(item.get("url"), str):
                urls.append(item["url"])
            else:
                raise ValidationError("Every --sources-file item must be a URL string or an object with a string 'url'.")
        return urls

    @staticmethod
    def _name_from_url(url: str) -> str:
        host = urlparse(url).hostname or url
        return host.removeprefix("www.")
