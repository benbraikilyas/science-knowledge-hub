"""Inject reviewed image descriptions without renaming or recompressing images.

Default: validate and preview. Use --apply to write metadata and the web catalog.
Use --windows-compatible to convert non-JPEG images to high-quality JPEG so
Windows Explorer displays Title, Subject, Tags, Comments and credited Author.
Use --webp to convert the catalog to optimized WebP while retaining EXIF fields.
JPEG: EXIF/Windows fields; PNG: UTF-8 iTXt; other formats: web catalog only.
Original EXIF, XMP, ICC profiles and compressed pixels are retained.
"""
import argparse
from hashlib import sha256
from io import BytesIO
import json
import os
from pathlib import Path
import struct
import sys
import tempfile
import zlib
from PIL import Image

ROOT = Path(__file__).resolve().parent
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"

ARTICLE_TOPICS = {
    "ai": ["artificial intelligence infrastructure", "AI data centers", "machine learning hardware", "high-performance computing", "data center technology", "computing infrastructure"],
    "apollo": ["Apollo 11", "Moon landing", "Buzz Aldrin", "NASA", "lunar exploration", "space history"],
    "bell-test": ["Bell inequality", "quantum mechanics", "photon experiment", "quantum physics", "optical laboratory", "quantum nonlocality"],
    "crispr": ["CRISPR Cas9", "gene editing", "genome engineering", "molecular biology", "biotechnology", "genetics research"],
    "darkmatter": ["dark matter", "galaxy cluster", "gravitational lensing", "Hubble Space Telescope", "cosmology", "astrophysics"],
    "jwst": ["James Webb Space Telescope", "Webb deep field", "infrared astronomy", "early universe", "galaxy formation", "space telescope"],
    "mathematical-proof": ["mathematical proof", "logical reasoning", "geometry", "theorem", "mathematics education", "formal logic"],
    "quantum-computing": ["quantum computing", "dilution refrigerator", "cryogenic hardware", "qubits", "quantum technology", "quantum processor"],
    "quantum": ["quantum computing laboratory", "quantum computer", "qubits", "quantum information", "quantum technology", "research laboratory"],
    "relativity-gps": ["GPS satellites", "general relativity", "special relativity", "satellite navigation", "time dilation", "Einstein relativity"],
    "science-instruments": ["scientific instruments", "history of science", "telescope", "microscope", "laboratory equipment", "scientific discovery"],
    "semiconductors": ["semiconductor technology", "integrated circuits", "microelectronics", "transistors", "chip manufacturing", "electronics engineering"],
    "stellar-evolution": ["stellar evolution", "star life cycle", "supernova", "neutron star", "astronomy", "astrophysics"],
    "team-science": ["scientific collaboration", "research team", "interdisciplinary science", "laboratory research", "teamwork in science", "scientific community"],
}

SCIENTIST_TOPICS = {
    "einstein": ["theoretical physics", "theory of relativity", "mass energy equivalence", "modern physics"],
    "curie": ["radioactivity", "physics", "chemistry", "Nobel Prize scientist"],
    "tesla": ["electrical engineering", "alternating current", "inventor", "electric power"],
    "hawking": ["cosmology", "black holes", "Hawking radiation", "theoretical physics"],
    "newton": ["classical mechanics", "laws of motion", "universal gravitation", "mathematics"],
    "lovelace": ["computer programming", "analytical engine", "first computer algorithm", "women in computing"],
    "al-khwarizmi": ["algebra", "algorithms", "mathematics", "Islamic Golden Age"],
    "ibn-al-haytham": ["optics", "experimental science", "physics", "Book of Optics"],
    "ibn-sina": ["Avicenna", "medicine", "Canon of Medicine", "Islamic Golden Age"],
    "al-zahrawi": ["surgery", "medical instruments", "history of medicine", "Islamic Golden Age"],
    "al-biruni": ["astronomy", "geodesy", "Earth measurement", "Islamic Golden Age"],
    "jabir-ibn-hayyan": ["early chemistry", "alchemy", "laboratory methods", "Islamic Golden Age"],
    "al-jazari": ["mechanical engineering", "automata", "robotics history", "elephant clock"],
    "ibn-al-nafis": ["pulmonary circulation", "medicine", "physiology", "Islamic Golden Age"],
    "al-kindi": ["cryptanalysis", "frequency analysis", "mathematics", "Islamic Golden Age"],
    "al-razi": ["Rhazes", "clinical medicine", "chemistry", "history of medicine"],
    "alan-turing": ["computer science", "Turing machine", "cryptanalysis", "artificial intelligence history"],
    "grace-hopper": ["computer programming", "compiler", "COBOL", "women in technology"],
    "claude-shannon": ["information theory", "digital communication", "computer science", "mathematics"],
    "margaret-hamilton": ["software engineering", "Apollo guidance computer", "NASA", "women in computing"],
    "john-von-neumann": ["computer architecture", "stored-program computer", "mathematics", "computing history"],
    "charles-darwin": ["evolution", "natural selection", "evolutionary biology", "Origin of Species"],
    "galileo-galilei": ["astronomy", "telescope", "experimental physics", "scientific revolution"],
    "louis-pasteur": ["microbiology", "germ theory", "vaccination", "pasteurization"],
    "rosalind-franklin": ["DNA structure", "X-ray crystallography", "molecular biology", "women in science"],
    "michael-faraday": ["electromagnetism", "electromagnetic induction", "electric motor", "chemistry"],
}


def enriched_metadata(url, metadata):
    """Add accurate discovery terms while keeping alt text human-readable."""
    result = dict(metadata)
    keywords = list(metadata["keywords"])
    stem = Path(url).stem
    if url.startswith("/images/articles/"):
        keywords += ARTICLE_TOPICS.get(stem, [])
        keywords += ["science education", "science article", "educational image", "Science Knowledge Hub"]
    elif url.startswith("/images/scientists/"):
        keywords += SCIENTIST_TOPICS.get(stem, [])
        keywords += ["scientist biography", "scientific contributions", "history of science", "science education", "historical portrait", "Science Knowledge Hub"]
    elif url.startswith("/images/authors/"):
        keywords += ["profile avatar", "editorial profile", "profile image", "digital avatar", "science editorial team", "science website", "Science Knowledge Hub"]
    elif url.startswith("/og."):
        keywords += ["STEM education", "science website", "scientists", "technology", "educational resources", "science articles"]
    result["keywords"] = list(dict.fromkeys(keyword.strip() for keyword in keywords if keyword.strip()))[:15]
    return result


def atomic_write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as handle:
            temporary = Path(handle.name)
            handle.write(data)
        os.replace(temporary, path)
    finally:
        if temporary and temporary.exists():
            temporary.unlink()


def jpeg_metadata(data, metadata):
    """Replace EXIF APP1 only; retain the entire encoded image scan."""
    with Image.open(BytesIO(data)) as image:
        exif = image.getexif()
        creator = metadata.get("creator") or metadata.get("creditText")
        fields = {
            0x9C9B: metadata["title"], 0x9C9C: metadata["description"],
            0x9C9E: "; ".join(metadata["keywords"]), 0x9C9F: metadata["description"],
        }
        if creator:
            fields[0x9C9D] = creator
        for tag, value in fields.items():
            exif[tag] = value.encode("utf-16le") + b"\0\0"
        # EXIF ASCII fields complement Unicode Windows fields.
        if metadata["title"].isascii():
            exif[270] = metadata["title"]
        if creator and creator.isascii():
            exif[315] = creator
        payload = exif.tobytes()
    if len(payload) + 2 > 65535:
        raise ValueError("EXIF exceeds JPEG APP1 size limit")
    parts = [data[:2], b"\xff\xe1" + struct.pack(">H", len(payload) + 2) + payload]
    offset = 2
    while offset < len(data):
        start = offset
        if data[offset] != 255:
            raise ValueError("Invalid JPEG marker")
        while offset < len(data) and data[offset] == 255:
            offset += 1
        if offset >= len(data):
            raise ValueError("Truncated JPEG marker")
        marker = data[offset]
        offset += 1
        if marker in (0xDA, 0xD9):
            parts.append(data[start:])
            return b"".join(parts)
        if marker == 0x01 or 0xD0 <= marker <= 0xD7:
            parts.append(data[start:offset])
            continue
        length = int.from_bytes(data[offset:offset + 2], "big")
        end = offset + length
        if length < 2 or end > len(data):
            raise ValueError("Truncated JPEG segment")
        if not (marker == 0xE1 and data[offset + 2:end].startswith(b"Exif\0\0")):
            parts.append(data[start:end])
        offset = end
    raise ValueError("JPEG has no image scan")


def png_chunk(kind, payload):
    return (struct.pack(">I", len(payload)) + kind + payload
            + struct.pack(">I", zlib.crc32(kind + payload) & 0xFFFFFFFF))


def png_metadata(data, metadata):
    """Update text without decoding/re-encoding IDAT or animation chunks."""
    fields = {"Title": metadata["title"], "Description": metadata["description"],
              "Keywords": "; ".join(metadata["keywords"])}
    if metadata.get("creator"):
        fields["Author"] = metadata["creator"]
    if metadata.get("source"):
        fields["Source"] = metadata["source"]
    parts = [PNG_SIGNATURE]
    offset = len(PNG_SIGNATURE)
    while offset < len(data):
        length = int.from_bytes(data[offset:offset + 4], "big")
        kind = data[offset + 4:offset + 8]
        end = offset + length + 12
        if end > len(data):
            raise ValueError("Truncated PNG chunk")
        payload = data[offset + 8:end - 4]
        if zlib.crc32(kind + payload) & 0xFFFFFFFF != int.from_bytes(data[end - 4:end], "big"):
            raise ValueError("PNG checksum mismatch")
        if kind == b"IEND":
            for key, value in fields.items():
                parts.append(png_chunk(b"iTXt", key.encode("ascii") + b"\0\0\0\0\0" + value.encode("utf-8")))
            parts.append(data[offset:])
            return b"".join(parts)
        key = payload.split(b"\0", 1)[0].decode("latin-1")
        if not (kind in (b"tEXt", b"zTXt", b"iTXt") and key in fields):
            parts.append(data[offset:end])
        offset = end
    raise ValueError("PNG has no IEND chunk")


def webp_metadata(data, metadata):
    """Replace the WebP EXIF chunk without recompressing image pixels."""
    if data[:4] != b"RIFF" or data[8:12] != b"WEBP":
        raise ValueError("Invalid WebP container")
    with Image.open(BytesIO(data)) as image:
        exif = metadata_exif(image, metadata).tobytes()
        pixels, size, mode = image.tobytes(), image.size, image.mode
    if exif.startswith(b"Exif\0\0"):
        exif = exif[6:]
    chunks = []
    chunk_names = []
    has_vp8x = False
    offset = 12
    replaced = False
    while offset + 8 <= len(data):
        kind = data[offset:offset + 4]
        length = struct.unpack("<I", data[offset + 4:offset + 8])[0]
        end = offset + 8 + length + (length % 2)
        if end > len(data):
            raise ValueError("Truncated WebP chunk")
        payload = data[offset + 8:offset + 8 + length]
        if kind == b"EXIF":
            payload = exif
            replaced = True
        elif kind == b"VP8X" and len(payload) >= 1:
            payload = bytes([payload[0] | 0x08]) + payload[1:]
            has_vp8x = True
        chunk_names.append(kind)
        chunks.append(kind + struct.pack("<I", len(payload)) + payload + (b"\0" if len(payload) % 2 else b""))
        offset = end
    if offset != len(data):
        raise ValueError("Invalid WebP padding")
    if not replaced:
        chunks.append(b"EXIF" + struct.pack("<I", len(exif)) + exif + (b"\0" if len(exif) % 2 else b""))
        chunk_names.append(b"EXIF")
    if not has_vp8x:
        flags = 0x08
        if "A" in mode:
            flags |= 0x10
        if b"ICCP" in chunk_names:
            flags |= 0x20
        if b"XMP " in chunk_names:
            flags |= 0x04
        if b"ANIM" in chunk_names:
            flags |= 0x02
        vp8x = bytes([flags, 0, 0, 0]) + (size[0] - 1).to_bytes(3, "little") + (size[1] - 1).to_bytes(3, "little")
        chunks.insert(0, b"VP8X" + struct.pack("<I", len(vp8x)) + vp8x)
    body = b"WEBP" + b"".join(chunks)
    result = b"RIFF" + struct.pack("<I", len(body)) + body
    with Image.open(BytesIO(result)) as updated:
        updated.load()
        if updated.size != size or updated.mode != mode or updated.tobytes() != pixels:
            raise ValueError("WebP pixel verification failed")
    return result


def prepare_image(data, metadata):
    with Image.open(BytesIO(data)) as original:
        original.load()
        image_format, size, mode = original.format, original.size, original.mode
        pixels = original.tobytes()
    if image_format == "JPEG":
        result = jpeg_metadata(data, metadata)
    elif image_format == "PNG":
        result = png_metadata(data, metadata)
    elif image_format == "WEBP":
        result = webp_metadata(data, metadata)
    else:
        result = data
    with Image.open(BytesIO(result)) as updated:
        updated.load()
        if updated.size != size or updated.mode != mode or updated.tobytes() != pixels:
            raise ValueError("Pixel verification failed; original was not changed")
    return result, *size, image_format


def convert_to_jpeg(data, metadata):
    """Create a Windows-friendly JPEG while retaining size and color profile."""
    with Image.open(BytesIO(data)) as original:
        original.seek(0)
        icc_profile = original.info.get("icc_profile")
        if original.mode in ("RGBA", "LA") or "transparency" in original.info:
            rgba = original.convert("RGBA")
            background = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
            background.alpha_composite(rgba)
            converted = background.convert("RGB")
        else:
            converted = original.convert("RGB")
        stream = BytesIO()
        save_options = {"quality": 95, "subsampling": 0, "optimize": True}
        if icc_profile:
            save_options["icc_profile"] = icc_profile
        converted.save(stream, format="JPEG", **save_options)
    result = jpeg_metadata(stream.getvalue(), metadata)
    with Image.open(BytesIO(result)) as verified:
        verified.load()
        if verified.size != converted.size:
            raise ValueError("Converted JPEG dimensions changed")
    return result, *converted.size, "JPEG"


def metadata_exif(image, metadata):
    """Return EXIF containing the same descriptive fields used for JPEG."""
    exif = image.getexif()
    creator = metadata.get("creator") or metadata.get("creditText")
    fields = {
        0x9C9B: metadata["title"], 0x9C9C: metadata["description"],
        0x9C9E: "; ".join(metadata["keywords"]), 0x9C9F: metadata["description"],
    }
    if creator:
        fields[0x9C9D] = creator
    for tag, value in fields.items():
        exif[tag] = value.encode("utf-16le") + b"\0\0"
    if metadata["title"].isascii():
        exif[270] = metadata["title"]
    if creator and creator.isascii():
        exif[315] = creator
    return exif


def convert_to_webp(data, metadata):
    """Create an optimized WebP with EXIF, dimensions and color profile."""
    with Image.open(BytesIO(data)) as original:
        original.seek(0)
        original.load()
        icc_profile = original.info.get("icc_profile")
        exif = metadata_exif(original, metadata)
        stream = BytesIO()
        save_options = {"quality": 90, "method": 6, "exif": exif}
        if icc_profile:
            save_options["icc_profile"] = icc_profile
        original.save(stream, format="WEBP", **save_options)
        size = original.size
    result = stream.getvalue()
    with Image.open(BytesIO(result)) as verified:
        verified.load()
        if verified.size != size or verified.format != "WEBP":
            raise ValueError("Converted WebP verification failed")
        if verified.getexif().get(0x9C9B) != exif.get(0x9C9B):
            raise ValueError("Converted WebP EXIF verification failed")
    return result, *size, "WEBP"


def load_manifest(path, public_root):
    records = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(records, dict) or not records:
        raise ValueError("Manifest must be a nonempty object keyed by /images/... URLs")
    for url, metadata in records.items():
        if not (url.startswith("/images/") or url in ("/og.png", "/og.jpg", "/og.webp", "/brand-logo.webp")) or "\\" in url or ".." in url.split("/"):
            raise ValueError(f"Unsafe image URL: {url}")
        image_path = (public_root / url.lstrip("/")).resolve()
        if not image_path.is_relative_to(public_root.resolve()) or not image_path.is_file():
            raise ValueError(f"Missing image or path outside public directory: {url}")
        if not isinstance(metadata, dict):
            raise ValueError(f"{url}: metadata must be an object")
        for field in ("title", "description", "alt"):
            if not isinstance(metadata.get(field), str) or not metadata[field].strip():
                raise ValueError(f"{url}: nonempty {field} required")
        keywords = metadata.get("keywords")
        if not isinstance(keywords, list) or not all(isinstance(k, str) and k.strip() for k in keywords):
            raise ValueError(f"{url}: keywords must be a list of nonempty strings")
        for field in ("source", "license"):
            value = metadata.get(field)
            if value and (not isinstance(value, str) or not value.startswith("https://")):
                raise ValueError(f"{url}: {field} must be an HTTPS URL")
    return records


def run(args):
    records = load_manifest(args.manifest, args.public_root)
    if getattr(args, "windows_compatible", False) and getattr(args, "webp", False):
        raise ValueError("Choose either --windows-compatible or --webp, not both")
    catalog, prepared, migrated_records = {}, [], {}
    # Validate the complete batch before writing any image.
    for url, metadata in sorted(records.items()):
        metadata = enriched_metadata(url, metadata)
        path = (args.public_root / url.lstrip("/")).resolve()
        original = path.read_bytes()
        with Image.open(BytesIO(original)) as probe:
            source_format = probe.format
        convert_to_windows = bool(getattr(args, "windows_compatible", False) and source_format != "JPEG")
        convert_to_web = bool(getattr(args, "webp", False) and source_format != "WEBP")
        convert = convert_to_windows or convert_to_web
        if convert_to_windows:
            updated, width, height, image_format = convert_to_jpeg(original, metadata)
            target = path.with_suffix(".jpg")
            target_url = str(Path(url).with_suffix(".jpg")).replace("\\", "/")
            if target.exists() and target != path:
                raise ValueError(f"Refusing to overwrite existing conversion target: {target_url}")
            mode = "converted"
        elif convert_to_web:
            updated, width, height, image_format = convert_to_webp(original, metadata)
            target = path.with_suffix(".webp")
            target_url = str(Path(url).with_suffix(".webp")).replace("\\", "/")
            if target.exists() and target != path:
                raise ValueError(f"Refusing to overwrite existing conversion target: {target_url}")
            mode = "converted"
        else:
            updated, width, height, image_format = prepare_image(original, metadata)
            target, target_url = path, url
            mode = "embedded" if image_format in ("JPEG", "PNG", "WEBP") else "catalog-only"
        catalog[target_url] = {**metadata, "width": width, "height": height,
                        "encodingFormat": Image.MIME.get(image_format, "application/octet-stream")}
        migrated_records[target_url] = metadata
        prepared.append((path, target, original, updated))
        print(f"{mode:12} {url}{' -> ' + target_url if convert else ''} ({width}x{height})")
    changed = 0
    if args.apply:
        for path, target, original, updated in prepared:
            if path == target and original == updated:
                continue
            backup = args.backup_dir / (sha256(original).hexdigest() + path.suffix)
            if backup.exists() and backup.read_bytes() != original:
                raise ValueError(f"Backup is corrupt: {backup}")
            if not backup.exists():
                atomic_write(backup, original)
            atomic_write(target, updated)
            if path != target:
                path.unlink()
            changed += 1
        encoded = (json.dumps(catalog, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
        if not args.catalog.exists() or args.catalog.read_bytes() != encoded:
            atomic_write(args.catalog, encoded)
        if migrated_records != records:
            manifest_bytes = (json.dumps(migrated_records, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
            atomic_write(args.manifest, manifest_bytes)
    print(f"{'Applied' if args.apply else 'Previewed'} {len(catalog)} images; {changed} files changed.")
    if not args.apply:
        print("No files written. Use --apply to inject metadata and generate the web catalog.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--windows-compatible", action="store_true",
                        help="convert PNG/GIF/WebP to JPEG and migrate manifest URLs")
    parser.add_argument("--webp", action="store_true",
                        help="convert images to optimized WebP and migrate manifest URLs")
    parser.add_argument("--manifest", type=Path, default=ROOT / "seo-images.json")
    parser.add_argument("--public-root", type=Path, default=ROOT / "frontend/public")
    parser.add_argument("--catalog", type=Path, default=ROOT / "frontend/src/lib/image-metadata.json")
    parser.add_argument("--backup-dir", type=Path, default=ROOT / ".seo-backups")
    try:
        run(parser.parse_args())
    except (OSError, ValueError, SyntaxError, struct.error) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
