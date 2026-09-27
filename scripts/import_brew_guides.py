#!/usr/bin/env python3
"""Re-import the nine live Wix brew-guide pages. Does not rewrite copy."""

from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("crawl_wix", ROOT / "scripts" / "crawl_wix.py")
crawl = importlib.util.module_from_spec(spec)
assert spec.loader
sys.modules["crawl_wix"] = crawl
spec.loader.exec_module(crawl)

PATHS = [
    "/french-press",
    "/clever-cup",
    "/syphon",
    "/chemex",
    "/pour-over-filter",
    "/aeropress",
    "/moka-pot",
    "/immersion-cold-brew",
    "/cupping",
]


def main() -> None:
    image_map: dict[str, str] = {}
    existing_map = ROOT / "content" / "image-map.json"
    if existing_map.exists():
        image_map.update(json.loads(existing_map.read_text()))

    for path in PATHS:
        url = crawl.HOST + path
        print("import", path)
        raw = crawl.fetch(url).decode("utf-8", "replace")
        s = crawl.soup(raw)
        extracted = crawl.extract_page(s)
        doc_title = s.title.get_text(strip=True) if s.title else ""
        h1 = extracted.get("h1") or ""
        title = crawl.visible_page_title(doc_title, h1)
        seo_title = crawl.seo_page_title(doc_title, title)
        description = crawl.meta_content(s, "description") or crawl.meta_content(s, "og:description")
        page_images = []
        seen = set()
        for im in extracted["images"]:
            local = crawl.download_image(im["src"], image_map)
            if not local or local in seen:
                continue
            seen.add(local)
            page_images.append(
                {
                    "wix": crawl.original_media_url(im["src"]),
                    "local": local,
                    "alt": im.get("alt") or "",
                }
            )
        body = crawl.html_to_markdown(extracted["html"], image_map)
        slug = path.strip("/")
        dest = ROOT / "content" / "pages" / f"{slug}.json"
        prev = json.loads(dest.read_text()) if dest.exists() else {}
        rec = {
            **prev,
            "type": "brew-guide",
            "slug": slug,
            "path": path,
            "title": title,
            "description": description,
            "body": body,
            "images": page_images,
            "internalLinks": crawl.collect_internal_links(extracted["html"]),
            "seoTitle": seo_title,
            "seoDescription": description,
            "draft": False,
        }
        dest.write_text(json.dumps(rec, indent=2, ensure_ascii=False) + "\n")
        old_len = len(prev.get("body") or "")
        print(f"  images {len(page_images)} body {old_len} -> {len(body)}")

    print("done")


if __name__ == "__main__":
    main()
