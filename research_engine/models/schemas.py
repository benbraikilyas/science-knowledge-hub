from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any

from research_engine.errors import InvalidStatusTransitionError


def utcnow() -> str:
    return datetime.now(timezone.utc).isoformat()


class JobStatus(str, Enum):
    DISCOVERED = "discovered"
    CRAWLED = "crawled"
    RESEARCH_COMPLETE = "research_complete"
    GENERATING = "generating"
    NEEDS_REVISION = "needs_revision"
    REVIEW_REQUIRED = "review_required"
    APPROVED = "approved"
    IMPORTED = "imported"
    REJECTED = "rejected"
    INSUFFICIENT_RESEARCH = "insufficient_research"


ALLOWED_TRANSITIONS: dict[str, set[str]] = {
    JobStatus.DISCOVERED.value: {JobStatus.CRAWLED.value, JobStatus.INSUFFICIENT_RESEARCH.value},
    JobStatus.CRAWLED.value: {JobStatus.RESEARCH_COMPLETE.value, JobStatus.INSUFFICIENT_RESEARCH.value},
    JobStatus.RESEARCH_COMPLETE.value: {JobStatus.GENERATING.value},
    JobStatus.GENERATING.value: {JobStatus.NEEDS_REVISION.value, JobStatus.REVIEW_REQUIRED.value},
    JobStatus.NEEDS_REVISION.value: {JobStatus.GENERATING.value, JobStatus.REJECTED.value},
    JobStatus.REVIEW_REQUIRED.value: {JobStatus.APPROVED.value, JobStatus.NEEDS_REVISION.value, JobStatus.REJECTED.value},
    JobStatus.APPROVED.value: {JobStatus.IMPORTED.value},
    JobStatus.IMPORTED.value: set(),
    JobStatus.REJECTED.value: set(),
    JobStatus.INSUFFICIENT_RESEARCH.value: set(),
}


@dataclass(frozen=True)
class Source:
    name: str
    domain: str
    url: str
    category: str | None
    authority: str = "high"

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class CrawledSource:
    source: Source
    title: str
    content: str
    headings: list[str]
    author: str | None = None
    published_at: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)
    references: list[str] = field(default_factory=list)
    crawled_at: str = field(default_factory=utcnow)

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["source"] = self.source.to_dict()
        return data


@dataclass(frozen=True)
class Evidence:
    source_name: str
    source_url: str

    def to_dict(self) -> dict[str, str]:
        return asdict(self)


@dataclass(frozen=True)
class ResearchFact:
    id: str
    claim: str
    supported_by: list[Evidence]
    confidence: str
    kind: str = "fact"

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "claim": self.claim,
            "supported_by": [item.to_dict() for item in self.supported_by],
            "confidence": self.confidence,
            "kind": self.kind,
        }


@dataclass(frozen=True)
class ResearchDataset:
    topic: str
    slug: str
    category: str | None
    definitions: list[ResearchFact]
    facts: list[ResearchFact]
    scientists: list[str]
    experiments: list[str]
    discoveries: list[str]
    applications: list[str]
    limitations: list[str]
    misconceptions: list[str]
    open_questions: list[str]
    sources: list[Source]
    created_at: str = field(default_factory=utcnow)

    def to_dict(self) -> dict[str, Any]:
        return {
            "topic": self.topic,
            "slug": self.slug,
            "category": self.category,
            "definitions": [fact.to_dict() for fact in self.definitions],
            "facts": [fact.to_dict() for fact in self.facts],
            "scientists": self.scientists,
            "experiments": self.experiments,
            "discoveries": self.discoveries,
            "applications": self.applications,
            "limitations": self.limitations,
            "misconceptions": self.misconceptions,
            "open_questions": self.open_questions,
            "sources": [source.to_dict() for source in self.sources],
            "created_at": self.created_at,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ResearchDataset":
        def fact(item: dict[str, Any]) -> ResearchFact:
            return ResearchFact(
                id=item["id"], claim=item["claim"], confidence=item.get("confidence", "medium"),
                kind=item.get("kind", "fact"),
                supported_by=[Evidence(**evidence) for evidence in item.get("supported_by", [])],
            )

        return cls(
            topic=data["topic"], slug=data["slug"], category=data.get("category"),
            definitions=[fact(item) for item in data.get("definitions", [])],
            facts=[fact(item) for item in data.get("facts", [])],
            scientists=data.get("scientists", []), experiments=data.get("experiments", []),
            discoveries=data.get("discoveries", []), applications=data.get("applications", []),
            limitations=data.get("limitations", []), misconceptions=data.get("misconceptions", []),
            open_questions=data.get("open_questions", []),
            sources=[Source(**source) for source in data.get("sources", [])],
            created_at=data.get("created_at", utcnow()),
        )


@dataclass(frozen=True)
class ArticleOutline:
    title: str
    sections: list[str]
    faq_questions: list[str]

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class ArticleDraft:
    title: str
    slug: str
    category: str | None
    excerpt: str
    content: str
    faq: list[dict[str, str]]
    sources: list[dict[str, str]]
    status: str
    generation_method: str = "citation_scaffold"
    review: dict[str, Any] | None = None
    created_at: str = field(default_factory=utcnow)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ArticleDraft":
        return cls(
            title=data["title"], slug=data["slug"], category=data.get("category"),
            excerpt=data["excerpt"], content=data["content"], faq=data.get("faq", []),
            sources=data.get("sources", []), status=data["status"], review=data.get("review"),
            generation_method=data.get("generation_method", "citation_scaffold"),
            created_at=data.get("created_at", utcnow()),
        )


@dataclass(frozen=True)
class ReviewIssue:
    type: str
    section: str
    message: str

    def to_dict(self) -> dict[str, str]:
        return asdict(self)


@dataclass(frozen=True)
class ReviewResult:
    factual_accuracy: int
    source_coverage: int
    readability: int
    structure: int
    overall_score: int
    issues: list[ReviewIssue]

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["issues"] = [issue.to_dict() for issue in self.issues]
        return data

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ReviewResult":
        return cls(
            factual_accuracy=int(data["factual_accuracy"]),
            source_coverage=int(data["source_coverage"]),
            readability=int(data["readability"]), structure=int(data["structure"]),
            overall_score=int(data["overall_score"]),
            issues=[ReviewIssue(**issue) for issue in data.get("issues", [])],
        )


@dataclass
class ResearchJob:
    topic: str
    slug: str
    category: str | None
    status: str = JobStatus.DISCOVERED.value
    events: list[dict[str, str]] = field(default_factory=list)

    def transition(self, target: str) -> None:
        if target not in ALLOWED_TRANSITIONS.get(self.status, set()):
            raise InvalidStatusTransitionError(f"Cannot move from {self.status} to {target}")
        self.status = target
        self.events.append({"status": target, "at": utcnow()})

    def record(self, event: str, detail: str = "") -> None:
        self.events.append({"event": event, "detail": detail, "at": utcnow()})

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ResearchJob":
        return cls(
            topic=data["topic"], slug=data["slug"], category=data.get("category"),
            status=data.get("status", JobStatus.DISCOVERED.value), events=data.get("events", []),
        )
