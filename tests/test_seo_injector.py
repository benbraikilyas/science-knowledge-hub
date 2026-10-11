import argparse
import importlib.util
from io import BytesIO
import json
from pathlib import Path
import tempfile
import unittest
from PIL import Image, PngImagePlugin

spec = importlib.util.spec_from_file_location('seo_injector', Path(__file__).resolve().parents[1] / 'seo-injector.py')
seo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(seo)
META = {'title': 'Étoiles علم', 'description': 'A scientific illustration.',
        'alt': 'A scientific illustration.', 'keywords': ['astronomy', 'stars']}


class ImageMetadataTests(unittest.TestCase):
    def test_jpeg_pixels_orientation_copyright_and_unicode_survive(self):
        image = Image.new('RGB', (23, 17), (23, 68, 115))
        exif = Image.Exif()
        exif[274] = 6
        exif[33432] = 'Original photographer'
        stream = BytesIO()
        image.save(stream, format='JPEG', exif=exif, icc_profile=b'test-icc')
        original = stream.getvalue()
        result, *_ = seo.prepare_image(original, META)
        with Image.open(BytesIO(result)) as updated:
            self.assertEqual(updated.getexif()[274], 6)
            self.assertEqual(updated.getexif()[33432], 'Original photographer')
            self.assertEqual(updated.getexif()[0x9C9B].decode('utf-16le').rstrip('\0'), META['title'])
            self.assertEqual(updated.info['icc_profile'], b'test-icc')
        self.assertEqual(original[original.index(b'\xff\xda'):], result[result.index(b'\xff\xda'):])
        self.assertEqual(seo.prepare_image(result, META)[0], result)

    def test_png_alpha_provenance_unicode_and_idempotence(self):
        image = Image.new('RGBA', (13, 19), (20, 60, 120, 40))
        info = PngImagePlugin.PngInfo()
        info.add_text('XML:com.adobe.xmp', '<original-provenance/>')
        info.add_text('Copyright', 'Original creator')
        stream = BytesIO()
        image.save(stream, format='PNG', pnginfo=info)
        result, *_ = seo.prepare_image(stream.getvalue(), META)
        with Image.open(BytesIO(result)) as updated:
            self.assertEqual(updated.text['Title'], META['title'])
            self.assertEqual(updated.text['Copyright'], 'Original creator')
            self.assertEqual(updated.text['XML:com.adobe.xmp'], '<original-provenance/>')
            self.assertEqual(updated.getpixel((0, 0)), (20, 60, 120, 40))
        self.assertEqual(seo.prepare_image(result, META)[0], result)

    def test_animated_gif_is_untouched(self):
        stream = BytesIO()
        Image.new('RGB', (10, 10), 'red').save(stream, format='GIF', save_all=True,
            append_images=[Image.new('RGB', (10, 10), 'blue')], duration=100, loop=0)
        self.assertEqual(seo.prepare_image(stream.getvalue(), META)[0], stream.getvalue())

    def test_preview_backup_and_repeat_run(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'images').mkdir()
            source = root / 'images/photo.png'
            Image.new('RGB', (10, 10)).save(source)
            original = source.read_bytes()
            manifest = root / 'manifest.json'
            manifest.write_text(json.dumps({'/images/photo.png': META}), encoding='utf-8')
            args = argparse.Namespace(manifest=manifest, public_root=root, apply=False,
                catalog=root / 'catalog.json', backup_dir=root / 'backups')
            seo.run(args)
            self.assertEqual(source.read_bytes(), original)
            self.assertFalse(args.catalog.exists())
            self.assertFalse(args.backup_dir.exists())
            args.apply = True
            seo.run(args)
            backups = list(args.backup_dir.iterdir())
            self.assertEqual(len(backups), 1)
            self.assertEqual(backups[0].read_bytes(), original)
            catalog = args.catalog.read_bytes()
            result = source.read_bytes()
            seo.run(args)
            self.assertEqual(source.read_bytes(), result)
            self.assertEqual(args.catalog.read_bytes(), catalog)
            self.assertEqual(len(list(args.backup_dir.iterdir())), 1)

    def test_path_traversal_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            manifest = root / 'manifest.json'
            manifest.write_text(json.dumps({'/images/../outside.png': META}))
            with self.assertRaises(ValueError):
                seo.load_manifest(manifest, root)

    def test_invalid_batch_leaves_valid_image_untouched(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'images').mkdir()
            source = root / 'images/a.png'
            Image.new('RGB', (10, 10)).save(source)
            original = source.read_bytes()
            (root / 'images/z.png').write_bytes(b'not an image')
            manifest = root / 'manifest.json'
            manifest.write_text(json.dumps({'/images/a.png': META, '/images/z.png': META}))
            args = argparse.Namespace(manifest=manifest, public_root=root, apply=True,
                catalog=root / 'catalog.json', backup_dir=root / 'backups')
            with self.assertRaises(OSError):
                seo.run(args)
            self.assertEqual(source.read_bytes(), original)
            self.assertFalse(args.catalog.exists())

    def test_windows_compatible_mode_converts_and_migrates_png(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'images').mkdir()
            source = root / 'images/photo.png'
            Image.new('RGBA', (12, 8), (30, 60, 90, 100)).save(source)
            original = source.read_bytes()
            manifest = root / 'manifest.json'
            manifest.write_text(json.dumps({'/images/photo.png': META}), encoding='utf-8')
            args = argparse.Namespace(manifest=manifest, public_root=root, apply=True,
                windows_compatible=True, catalog=root / 'catalog.json', backup_dir=root / 'backups')
            seo.run(args)
            target = root / 'images/photo.jpg'
            self.assertTrue(target.exists())
            self.assertFalse(source.exists())
            self.assertEqual(next(args.backup_dir.iterdir()).read_bytes(), original)
            self.assertIn('/images/photo.jpg', json.loads(manifest.read_text(encoding='utf-8')))
            with Image.open(target) as converted:
                self.assertEqual(converted.format, 'JPEG')
                self.assertEqual(converted.size, (12, 8))
                self.assertEqual(converted.getexif()[0x9C9B].decode('utf-16le').rstrip('\0'), META['title'])

    def test_webp_mode_converts_and_retains_exif(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'images').mkdir()
            source = root / 'images/photo.jpg'
            Image.new('RGB', (14, 9), (20, 50, 80)).save(source, quality=95)
            original = source.read_bytes()
            manifest = root / 'manifest.json'
            manifest.write_text(json.dumps({'/images/photo.jpg': META}), encoding='utf-8')
            args = argparse.Namespace(manifest=manifest, public_root=root, apply=True,
                windows_compatible=False, webp=True, catalog=root / 'catalog.json',
                backup_dir=root / 'backups')
            seo.run(args)
            target = root / 'images/photo.webp'
            self.assertTrue(target.exists())
            self.assertFalse(source.exists())
            self.assertEqual(next(args.backup_dir.iterdir()).read_bytes(), original)
            self.assertIn('/images/photo.webp', json.loads(manifest.read_text(encoding='utf-8')))
            with Image.open(target) as converted:
                self.assertEqual(converted.format, 'WEBP')
                self.assertEqual(converted.size, (14, 9))
                self.assertEqual(converted.getexif()[0x9C9B].decode('utf-16le').rstrip('\0'), META['title'])
            self.assertEqual(seo.prepare_image(target.read_bytes(), META)[0], target.read_bytes())

    def test_keyword_enrichment_is_specific_and_deduplicated(self):
        article = seo.enriched_metadata('/images/articles/jwst.webp', META)
        scientist = seo.enriched_metadata('/images/scientists/einstein.webp', META)
        self.assertIn('James Webb Space Telescope', article['keywords'])
        self.assertIn('theory of relativity', scientist['keywords'])
        self.assertGreaterEqual(len(article['keywords']), 10)
        self.assertEqual(len(article['keywords']), len(set(article['keywords'])))

    def test_lossless_alpha_webp_gets_readable_exif_without_pixel_changes(self):
        stream = BytesIO()
        Image.new('RGBA', (17, 11), (20, 50, 80, 90)).save(stream, format='WEBP', lossless=True)
        original = stream.getvalue()
        result, width, height, image_format = seo.prepare_image(original, META)
        self.assertEqual((width, height, image_format), (17, 11, 'WEBP'))
        with Image.open(BytesIO(original)) as before, Image.open(BytesIO(result)) as after:
            before.load(); after.load()
            self.assertEqual(before.tobytes(), after.tobytes())
            self.assertEqual(after.getexif()[0x9C9B].decode('utf-16le').rstrip('\0'), META['title'])
        self.assertEqual(seo.prepare_image(result, META)[0], result)


if __name__ == '__main__':
    unittest.main()
