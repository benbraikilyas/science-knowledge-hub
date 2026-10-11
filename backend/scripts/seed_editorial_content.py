"""Seed reviewed ScienceHub content into MongoDB.

The default mode is deliberately safe: categories and scientist profiles are
upserted, while articles are saved as unpublished ``review_required`` drafts.
Publishing requires both ``--publish`` and an explicit ``--reviewed-by`` value.

Usage:
    python -m scripts.seed_editorial_content --dry-run
    python -m scripts.seed_editorial_content
    python -m scripts.seed_editorial_content --publish --reviewed-by "Editor Name"
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BASE_DIR.parent
DATA_DIR = BASE_DIR / "data"
sys.path.insert(0, str(BASE_DIR))

REFERENCE_PATTERN = re.compile(r"\[[^\]]+\]\((https://[^\s)]+)\)")


def load_json(filename: str) -> list[dict[str, Any]]:
    path = DATA_DIR / filename
    if not path.exists():
        raise RuntimeError(
            f"Missing {path}. Run 'node frontend/scripts/export-editorial-data.mjs' first."
        )
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, list):
        raise RuntimeError(f"Expected a JSON array in {path}.")
    return payload


def validate(categories: list[dict[str, Any]], articles: list[dict[str, Any]], scientists: list[dict[str, Any]]) -> None:
    category_slugs = {item["slug"] for item in categories}
    article_slugs = [item["slug"] for item in articles]
    scientist_slugs = [item["slug"] for item in scientists]

    if len(category_slugs) != len(categories):
        raise RuntimeError("Category slugs must be unique.")
    if len(set(article_slugs)) != len(article_slugs):
        raise RuntimeError("Article slugs must be unique.")
    if len(set(scientist_slugs)) != len(scientist_slugs):
        raise RuntimeError("Scientist slugs must be unique.")

    for article in articles:
        category_slug = article.get("category", {}).get("slug")
        if category_slug not in category_slugs:
            raise RuntimeError(f"Article '{article['slug']}' has unknown category '{category_slug}'.")
        content = str(article.get("content", ""))
        references = REFERENCE_PATTERN.findall(content)
        if len(content.split()) < 300:
            raise RuntimeError(f"Article '{article['slug']}' is too short for editorial import.")
        if "## References" not in content or len(references) < 2:
            raise RuntimeError(f"Article '{article['slug']}' needs at least two linked references.")

    for scientist in scientists:
        if not scientist.get("biography") or not scientist.get("sourceUrl"):
            raise RuntimeError(f"Scientist '{scientist['slug']}' needs a biography and source URL.")


def configure_django() -> None:
    from dotenv import load_dotenv

    load_dotenv(BASE_DIR / ".env")
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend_config.settings")
    import django

    django.setup()


def seed(args: argparse.Namespace) -> None:
    categories = load_json("categories.json")
    articles = load_json("editorial_articles.json")
    scientists = load_json("scientists.json")
    validate(categories, articles, scientists)

    print(
        f"Validated {len(categories)} categories, {len(articles)} editorial articles, "
        f"and {len(scientists)} scientist profiles."
    )
    if args.dry_run:
        print("Dry run complete; MongoDB was not changed.")
        return

    if args.publish and not args.reviewed_by:
        raise RuntimeError("--publish requires --reviewed-by with the responsible editor's name.")

    configure_django()
    from articles.models import Article
    from categories.models import Category
    from scientists.models import Scientist

    category_by_slug: dict[str, Any] = {}
    for item in categories:
        category = Category.objects(slug=item["slug"]).first() or Category(slug=item["slug"])
        category.name = item["name"]
        category.description = item["description"]
        category.icon = item["icon"]
        category.color = item["color"]
        category.gradient = item.get("gradient", "")
        category.order = int(item.get("order", 0))
        category.is_active = bool(item.get("isActive", True))
        category.save()
        category_by_slug[category.slug] = category

    now = datetime.now(timezone.utc)
    for item in articles:
        category_data = item["category"]
        category = category_by_slug[category_data["slug"]]
        article = Article.objects(slug=item["slug"]).first() or Article(
            slug=item["slug"], category_id=str(category.id), author_id="sciencehub-editorial-team"
        )
        article.title = item["title"]
        article.content = item["content"]
        article.excerpt = item["excerpt"]
        article.featured_image = item.get("featuredImage", "")
        article.thumbnail = item.get("thumbnail", "")
        article.category_id = str(category.id)
        article.category_name = category.name
        article.category_slug = category.slug
        article.category_color = category.color
        article.category_icon = category.icon
        article.author_name = "ScienceHub Editorial Team"
        article.tags = item.get("tags", [])
        article.read_time = int(item.get("readTime", 8))
        article.is_featured = bool(item.get("isFeatured", False))
        article.meta_title = item.get("metaTitle", item["title"])
        article.meta_description = item.get("metaDescription", item["excerpt"])
        article.source_urls = list(dict.fromkeys(REFERENCE_PATTERN.findall(item["content"])))
        article.generation_method = "research_assisted_editorial"
        article.editorial_status = "approved" if args.publish else "review_required"
        article.is_published = bool(args.publish)
        if args.publish:
            article.reviewed_by = args.reviewed_by
            article.reviewed_at = now
            article.published_at = article.published_at or now
        article.save()

    for item in scientists:
        scientist = Scientist.objects(slug=item["slug"]).first() or Scientist(slug=item["slug"])
        scientist.name = item["name"]
        scientist.portrait_image = item.get("portraitImage", "")
        scientist.birth_date = item.get("birthDate", "")
        scientist.death_date = item.get("deathDate", "")
        scientist.nationality = item.get("nationality", "")
        scientist.era = item.get("era", "")
        scientist.field = item.get("field", "")
        scientist.group = item.get("group", "")
        scientist.breakthrough = item.get("breakthrough", "")
        scientist.source_url = item.get("sourceUrl", "")
        scientist.biography = item.get("biography", "")
        scientist.key_contributions = item.get("keyContributions", [])
        scientist.famous_quotes = item.get("famousQuotes", [])
        scientist.awards = item.get("awards", [])
        scientist.is_featured = bool(item.get("isFeatured", False))
        scientist.save()

    for slug, category in category_by_slug.items():
        published_count = Article.objects(category_slug=slug, is_published=True).count()
        category.update(set__article_count=published_count)

    mode = "published after explicit review" if args.publish else "saved as unpublished review drafts"
    print(f"Seed complete: articles {mode}; categories and scientist profiles upserted.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Seed ScienceHub editorial content safely")
    parser.add_argument("--dry-run", action="store_true", help="Validate local data without connecting to MongoDB")
    parser.add_argument("--publish", action="store_true", help="Publish articles after explicit human review")
    parser.add_argument("--reviewed-by", help="Responsible editor; required with --publish")
    return parser.parse_args()


if __name__ == "__main__":
    try:
        seed(parse_args())
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(2)
