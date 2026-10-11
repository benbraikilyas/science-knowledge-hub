from __future__ import annotations

import os
import sys
from pathlib import Path

from research_engine.config import PROJECT_ROOT
from research_engine.errors import BackendImportError
from research_engine.models import ArticleDraft


class BackendDraftExporter:
    """Imports an approved research draft through the existing MongoEngine models only."""

    def __init__(self, author_id: str, author_name: str) -> None:
        self.author_id = author_id
        self.author_name = author_name

    def import_draft(self, draft: ArticleDraft) -> str:
        backend_root = PROJECT_ROOT / "backend"
        if str(backend_root) not in sys.path:
            sys.path.insert(0, str(backend_root))
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend_config.settings")
        try:
            import django
            django.setup()
            from articles.models import Article
            from categories.models import Category
        except Exception as error:
            raise BackendImportError(f"Unable to initialize the existing backend: {error}") from error

        if not draft.category:
            raise BackendImportError("Approved draft has no category slug.")
        category = Category.objects(slug=draft.category, is_active=True).first()
        if not category:
            raise BackendImportError(f"No active backend category matches '{draft.category}'.")
        if Article.objects(slug=draft.slug).first():
            raise BackendImportError(f"An article with slug '{draft.slug}' already exists.")
        article = Article(
            title=draft.title,
            slug=draft.slug,
            content=draft.content,
            excerpt=draft.excerpt,
            category_id=str(category.id),
            category_name=category.name,
            category_slug=category.slug,
            category_color=category.color,
            category_icon=category.icon,
            author_id=self.author_id,
            author_name=self.author_name,
            tags=[draft.category, "research-engine"],
            is_published=False,
            is_featured=False,
            meta_title=draft.title,
            meta_description=draft.excerpt,
        )
        article.save()
        return str(article.id)
