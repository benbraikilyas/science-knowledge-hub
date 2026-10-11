from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from research_engine.config import LLMConfig
from research_engine.errors import LLMConfigurationError, LLMResponseError


@dataclass(frozen=True)
class LLMClient:
    """Small OpenAI-compatible JSON client, isolated from the research workflow.

    It is deliberately dependency-free and is never created unless
    ``RESEARCH_LLM_ENABLED=true``. This keeps offline evidence collection usable
    and avoids tying the project to one commercial provider.
    """

    config: LLMConfig

    @classmethod
    def from_config(cls, config: LLMConfig) -> "LLMClient | None":
        if not config.enabled:
            return None
        missing = [
            name for name, value in {
                "RESEARCH_LLM_BASE_URL": config.base_url,
                "RESEARCH_LLM_API_KEY": config.api_key,
                "RESEARCH_LLM_MODEL": config.model,
            }.items() if not value
        ]
        if missing:
            raise LLMConfigurationError(
                "AI generation is enabled but missing: " + ", ".join(missing)
            )
        return cls(config)

    def complete_json(self, system_prompt: str, user_prompt: str) -> dict[str, Any]:
        payload = {
            "model": self.config.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": 0.2,
            "response_format": {"type": "json_object"},
        }
        request = Request(
            f"{self.config.base_url}/chat/completions",
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {self.config.api_key}",
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method="POST",
        )
        try:
            with urlopen(request, timeout=self.config.timeout_seconds) as response:  # nosec B310: explicit configured HTTPS endpoint
                body = json.loads(response.read().decode("utf-8"))
        except HTTPError as error:
            raise LLMResponseError(f"AI provider returned HTTP {error.code}.") from error
        except (URLError, TimeoutError, json.JSONDecodeError) as error:
            raise LLMResponseError(f"AI provider request failed: {error}") from error

        try:
            content = body["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as error:
            raise LLMResponseError("AI provider response did not contain a chat completion.") from error
        return self._decode_json(content)

    @staticmethod
    def _decode_json(content: Any) -> dict[str, Any]:
        if not isinstance(content, str):
            raise LLMResponseError("AI provider returned a non-text completion.")
        value = content.strip()
        if value.startswith("```"):
            value = value.split("\n", 1)[-1].rsplit("```", 1)[0].strip()
        try:
            result = json.loads(value)
        except json.JSONDecodeError as error:
            raise LLMResponseError("AI provider did not return valid JSON.") from error
        if not isinstance(result, dict):
            raise LLMResponseError("AI provider JSON result must be an object.")
        return result
