class ResearchEngineError(Exception):
    """Base error for expected research-engine failures."""


class ValidationError(ResearchEngineError):
    """Raised when a source or command input is invalid."""


class InsufficientResearchError(ResearchEngineError):
    """Raised when too few trusted sources could be collected."""


class CrawlUnavailableError(ResearchEngineError):
    """Raised when Crawl4AI is unavailable in the active interpreter."""


class InvalidStatusTransitionError(ResearchEngineError):
    """Raised when an article status transition is not allowed."""


class BackendImportError(ResearchEngineError):
    """Raised when an approved article cannot be imported as a backend draft."""


class LLMConfigurationError(ResearchEngineError):
    """Raised when AI generation is enabled without a complete configuration."""


class LLMResponseError(ResearchEngineError):
    """Raised when an AI provider returns an unusable response."""
