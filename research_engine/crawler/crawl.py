from __future__ import annotations

import asyncio
import re
from typing import Any
from urllib.parse import urlsplit, urlunsplit
from urllib.error import HTTPError
from urllib.request import Request, urlopen
from urllib.robotparser import RobotFileParser

from research_engine.errors import CrawlUnavailableError
from research_engine.models import CrawledSource, Source


class Crawl4AICollector:
    """Thin, lazy Crawl4AI adapter. It collects data only; no rewriting occurs here."""

    def __init__(self, max_content_chars: int, concurrency: int = 3, respect_robots: bool = True) -> None:
        self.max_content_chars = max_content_chars
        self.concurrency = concurrency
        self.respect_robots = respect_robots

    async def crawl_sources(self, sources: list[Source]) -> tuple[list[CrawledSource], list[str]]:
        try:
            from crawl4ai import AsyncWebCrawler, BrowserConfig, CacheMode, CrawlerRunConfig
        except ImportError as error:
            raise CrawlUnavailableError(
                "Crawl4AI is not installed in this Python interpreter. Install research_engine/requirements.txt."
            ) from error

        browser_config = BrowserConfig(headless=True, text_mode=True)
        run_config = CrawlerRunConfig(
            cache_mode=CacheMode.BYPASS,
            excluded_tags=["nav", "footer", "aside", "form", "script", "style"],
            remove_overlay_elements=True,
            word_count_threshold=20,
        )
        semaphore = asyncio.Semaphore(self.concurrency)

        async with AsyncWebCrawler(config=browser_config) as crawler:
            async def collect(source: Source) -> CrawledSource | str:
                async with semaphore:
                    if self.respect_robots:
                        allowed, reason = await asyncio.to_thread(self._robots_decision, source.url)
                        if not allowed:
                            return f"{source.name}: robots policy blocked collection ({reason})"
                    try:
                        result = await crawler.arun(url=source.url, config=run_config)
                    except Exception as error:  # Crawl4AI/network errors are source-local.
                        return f"{source.name}: {error}"
                    if not getattr(result, "success", False):
                        return f"{source.name}: {getattr(result, 'error_message', 'crawl failed')}"
                    content = self._markdown_text(getattr(result, "markdown", ""))[:self.max_content_chars]
                    if len(content.split()) < 80:
                        return f"{source.name}: insufficient article content"
                    metadata = getattr(result, "metadata", {}) or {}
                    return CrawledSource(
                        source=source,
                        title=str(metadata.get("title") or self._first_heading(content) or source.name),
                        content=content,
                        headings=self._headings(content),
                        author=metadata.get("author"),
                        published_at=metadata.get("published_time") or metadata.get("article:published_time"),
                        metadata={str(key): value for key, value in metadata.items()},
                        references=self._links(getattr(result, "links", {})),
                    )

            results = await asyncio.gather(*(collect(source) for source in sources))
        successful = [result for result in results if isinstance(result, CrawledSource)]
        failures = [result for result in results if isinstance(result, str)]
        return successful, failures

    @staticmethod
    def _robots_decision(url: str) -> tuple[bool, str]:
        """Fail closed when a source's robots policy cannot be checked."""
        parts = urlsplit(url)
        robots_url = urlunsplit((parts.scheme, parts.netloc, "/robots.txt", "", ""))
        parser = RobotFileParser()
        parser.set_url(robots_url)
        try:
            request = Request(robots_url, headers={"User-Agent": "ScienceHubResearchBot/1.0"})
            with urlopen(request, timeout=10) as response:  # nosec B310: source URL has passed trust validation
                parser.parse(response.read().decode("utf-8", errors="replace").splitlines())
        except HTTPError as error:
            # RFC 9309: an unavailable robots file (4xx) means no crawl rules
            # are available. Authentication/rate-limit responses remain blocked.
            if error.code in {404, 410}:
                return True, "robots.txt not found; no rules declared"
            return False, f"could not read robots.txt: HTTP {error.code}"
        except Exception as error:
            return False, f"could not read robots.txt: {error}"
        if not parser.can_fetch("ScienceHubResearchBot/1.0", url):
            return False, "disallowed by robots.txt"
        return True, "allowed"

    @staticmethod
    def _markdown_text(markdown: Any) -> str:
        if isinstance(markdown, str):
            return markdown
        return str(getattr(markdown, "fit_markdown", "") or getattr(markdown, "raw_markdown", "") or "")

    @staticmethod
    def _headings(content: str) -> list[str]:
        return [line.lstrip("#").strip() for line in content.splitlines() if line.startswith("#")][:30]

    @staticmethod
    def _first_heading(content: str) -> str | None:
        return next(iter(Crawl4AICollector._headings(content)), None)

    @staticmethod
    def _links(links: Any) -> list[str]:
        if not isinstance(links, dict):
            return []
        values: list[str] = []
        for group in links.values():
            if not isinstance(group, list):
                continue
            for item in group:
                if isinstance(item, dict) and item.get("href"):
                    values.append(str(item["href"]))
        return list(dict.fromkeys(values))[:50]
