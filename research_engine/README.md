# Science Knowledge Hub Research Engine

This isolated Python pipeline researches a scientific topic from multiple trusted sources, stores immutable raw captures, extracts evidence-linked research notes, creates a reviewable draft, and can import only an explicitly approved article into the existing MongoDB backend as an unpublished draft.

It never performs `scrape -> rewrite -> publish`. It requires multiple trusted sources, preserves provenance, and never publishes automatically.

## Architecture

`discovery/` selects centrally configured trusted sources; it never scrapes search-result pages. `crawler/` uses Crawl4AI only to collect permitted content and checks `robots.txt` by default. `processing/` cleans, extracts, merges, and deduplicates evidence. `ai/` optionally uses a provider-compatible JSON endpoint for source-bound extraction, original drafting, and review; with AI disabled it produces a clearly marked citation scaffold. `storage/` persists raw/research/draft/review/approved JSON plus a per-topic job audit trail. `exporters/` uses the existing Django/MongoEngine models to create an unpublished backend draft only after an explicit approval command.

## Installation

Use the Python interpreter where Crawl4AI is installed. From this directory:

```powershell
pip install -r requirements.txt
```

Create `.env` from `.env.example`. Do not commit `.env`.

## Run one topic

```powershell
cd C:\Users\ilyas\science-knowledge-hub\research_engine
python main.py --topic "Quantum Entanglement" --category quantum-physics --max-sources 4
```

For a topic without a curated source set, provide only trusted HTTPS URLs:

```powershell
python main.py --topic "Topic" --category biology --source "https://www.nih.gov/example"
```

For a repeatable research set, use a JSON file containing URL strings or objects such as `{"name": "NIH", "url": "https://www.nih.gov/example"}`:

```powershell
python main.py --topic "Topic" --category biology --sources-file .\sources.json
```

The run needs at least `RESEARCH_MIN_VALID_SOURCES` successful captures (default: 3). A failed source is logged without discarding the other successful sources.

## Storage and lifecycle

- `storage/raw/<slug>/`: immutable Crawl4AI captures
- `storage/research/<slug>.json`: evidence-linked dataset
- `storage/drafts/<slug>.json`: reviewable draft
- `storage/reviews/<slug>.json`: structured review result
- `storage/approved/<slug>.json`: explicit human approval only
- `storage/jobs/<slug>.json`: lifecycle events, successful stages, and source failures

Lifecycle: `discovered -> crawled -> research_complete -> generating -> needs_revision|review_required -> approved -> imported`. Nothing moves to `published` in this engine.

## Optional AI generation

The engine works without an AI provider. In that mode it saves a citation scaffold with status `needs_revision`; it cannot be approved or imported. This makes the missing editorial work explicit.

To create an original reviewable draft, set these values only in `research_engine/.env`:

```text
RESEARCH_LLM_ENABLED=true
RESEARCH_LLM_BASE_URL=https://your-provider.example/v1
RESEARCH_LLM_API_KEY=your-secret
RESEARCH_LLM_MODEL=your-model
```

The endpoint must support the OpenAI-compatible `POST /chat/completions` format and JSON-object responses. The engine sends raw source text only to the research extraction stage; outlining, drafting, and reviewing receive the structured evidence dataset instead. AI failures automatically fall back to a non-approvable scaffold and are recorded in the job audit trail.

Even an AI-generated draft reaches `review_required` only if it has enough trusted sources, contains evidence citations, has no blocking review issue, and meets `RESEARCH_MIN_REVIEW_SCORE`. AI output is never automatically published.

## Human approval and backend import

Only an AI-generated `review_required` draft above `RESEARCH_MIN_REVIEW_SCORE` can be approved:

```powershell
python main.py --approve quantum-entanglement
```

Import is separate and creates an existing `Article` with `is_published=False`:

```powershell
python main.py --import-approved quantum-entanglement
```

After human review, the editor can send a draft back for revision or reject it permanently:

```powershell
python main.py --mark-needs-revision quantum-entanglement
python main.py --reject quantum-entanglement
```

The importer requires an active backend category matching the supplied category slug, valid MongoDB environment variables, and no duplicate article slug.

## Tests

```powershell
python -m unittest discover research_engine/tests -v
```

## Safety rules

- Crawl only configured trusted HTTPS domains; `RESEARCH_RESPECT_ROBOTS=true` fails closed when `robots.txt` disallows or cannot be checked.
- Keep raw captures immutable; never use them as publishable copy.
- Preserve URL/source evidence for every extracted fact.
- Do not commit or share API keys, MongoDB URIs, or `.env` files.
- Publish through the existing editorial workflow only.
