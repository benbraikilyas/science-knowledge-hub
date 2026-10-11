from __future__ import annotations

import re


class ContentCleaner:
    NOISE_MARKERS = ("cookie", "subscribe", "newsletter", "privacy settings", "skip to")

    def clean(self, markdown: str) -> str:
        lines: list[str] = []
        previous = ""
        for raw_line in markdown.splitlines():
            line = re.sub(r"\s+", " ", raw_line).strip()
            if not line or line.lower().startswith(self.NOISE_MARKERS):
                continue
            if line == previous:
                continue
            lines.append(line)
            previous = line
        return "\n".join(lines)
