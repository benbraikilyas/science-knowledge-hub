from __future__ import annotations

import re
from urllib.parse import urlparse, urlunparse

from research_engine.errors import ValidationError


def slugify(value: str) -> str:
    normalized = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    if not normalized:
        raise ValidationError("Topic must contain letters or numbers")
    return normalized


def normalize_url(value: str) -> str:
    parsed = urlparse(value.strip())
    if parsed.scheme != "https" or not parsed.netloc:
        raise ValidationError("Sources must use a complete HTTPS URL")
    path = parsed.path.rstrip("/") or "/"
    return urlunparse(("https", parsed.netloc.lower(), path, "", parsed.query, ""))
