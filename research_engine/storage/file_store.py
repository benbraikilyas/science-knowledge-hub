from __future__ import annotations

import json
import hashlib
from pathlib import Path
from typing import Any

from research_engine.models import CrawledSource
from research_engine.processing.validator import slugify


class FileStore:
    def __init__(self, root: Path) -> None:
        self.root = root
        for name in ("raw", "research", "drafts", "reviews", "approved", "jobs"):
            (self.root / name).mkdir(parents=True, exist_ok=True)

    def save_raw_immutable(self, topic_slug: str, source: CrawledSource) -> Path:
        directory = self.root / "raw" / topic_slug
        directory.mkdir(parents=True, exist_ok=True)
        source_hash = hashlib.sha256(source.source.url.encode("utf-8")).hexdigest()[:10]
        path = directory / f"{slugify(source.source.name)}-{source_hash}.json"
        if not path.exists():
            self._write_json(path, source.to_dict())
        return path

    def save_research(self, slug: str, payload: dict[str, Any]) -> Path:
        return self._save("research", slug, payload)

    def save_draft(self, slug: str, payload: dict[str, Any]) -> Path:
        return self._save("drafts", slug, payload)

    def save_review(self, slug: str, payload: dict[str, Any]) -> Path:
        return self._save("reviews", slug, payload)

    def save_job(self, slug: str, payload: dict[str, Any]) -> Path:
        return self._save("jobs", slug, payload)

    def load_job(self, slug: str) -> dict[str, Any]:
        return self._read_json(self.root / "jobs" / f"{slug}.json")

    def approve_draft(self, slug: str) -> Path:
        draft = self.load_draft(slug)
        draft["status"] = "approved"
        return self._save("approved", slug, draft)

    def load_draft(self, slug: str) -> dict[str, Any]:
        return self._read_json(self.root / "drafts" / f"{slug}.json")

    def load_review(self, slug: str) -> dict[str, Any]:
        return self._read_json(self.root / "reviews" / f"{slug}.json")

    def _save(self, directory: str, slug: str, payload: dict[str, Any]) -> Path:
        path = self.root / directory / f"{slug}.json"
        self._write_json(path, payload)
        return path

    @staticmethod
    def _write_json(path: Path, payload: dict[str, Any]) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        temp_path = path.with_suffix(".tmp")
        temp_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        temp_path.replace(path)

    @staticmethod
    def _read_json(path: Path) -> dict[str, Any]:
        if not path.exists():
            raise FileNotFoundError(f"Missing research-engine file: {path}")
        return json.loads(path.read_text(encoding="utf-8"))
