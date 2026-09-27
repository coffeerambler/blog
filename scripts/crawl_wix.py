#!/usr/bin/env python3
"""Crawl coffeerambler.com (Wix) into content JSON + rehosted images."""

from __future__ import annotations

import html as html_lib
import json
import re
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path

from bs4 import BeautifulSoup
from markdownify import markdownify as md

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
PUBLIC_IMAGES = ROOT / "public" / "images"
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
HOST = "https://www.coffeerambler.com"
BLOG_APP = "14bcded7-0066-7c35-14d7-466cb3f09103"
NAV_NOISE = {
    "home",
    "brewing guides",
    "archive",
    "world coffee guide",
    "about",
    "more...",
    "log in",
    "top of page",
    "use tab to navigate through the menu items.",
    "central america",
    "south america",
    "africa",
    "asia",
    "all posts",
    "search",
    "skip to main content",
}

SOCIAL_MEDIA_IDS = {
    "9c6e996394004de18762b693d9e1eabb",
    "767689ba34f143a1a36e49b5f2fbe31a",
    "f61c7a3b4b4947b28511a25034973383",
    "e0678ef25486466ba65ef6ad47b559e1",
    "da7ef6dd1302486c9a67baebe4b364bc",
}


def is_logo_title(value: str) -> bool:
    t = re.sub(r"\s+", " ", value or "").strip()
    if not t:
        return True
    core = re.sub(r"\s*\|\s*Coffee Rambler.*$", "", t, flags=re.I).strip()
    return core.upper() in {"COFFEE RAMBLER", "HOME"}


def visible_page_title(doc_title: str, h1: str) -> str:
    for candidate in (doc_title, h1):
        if not candidate or is_logo_title(candidate):
            continue
        cleaned = re.sub(r"\s*\|\s*Coffee Rambler.*$", "", candidate, flags=re.I).strip()
        return cleaned or candidate
    return doc_title or h1 or "Coffee Rambler"


def seo_page_title(doc_title: str, visible: str) -> str:
    if doc_title and not is_logo_title(doc_title):
        return doc_title.strip()
    if re.search(r"\|\s*Coffee Rambler$", visible, flags=re.I):
        return visible
    return f"{visible} | Coffee Rambler"


def fetch(url: str, retries: int = 4) -> bytes:
    last = None
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
            with urllib.request.urlopen(req, timeout=60) as resp:
                return resp.read()
        except Exception as e:
            last = e
            time.sleep(1.5 * (i + 1))
    raise last  # type: ignore[misc]


def fetch_json(url: str, headers: dict | None = None) -> object:
    h = {"User-Agent": UA, "Accept": "application/json"}
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read())


def parse_sitemap(xml_bytes: bytes) -> list[dict]:
    root = ET.fromstring(xml_bytes)
    ns = {
        "sm": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "image": "http://www.google.com/schemas/sitemap-image/1.1",
    }
    rows = []
    for url in root.findall("sm:url", ns):
        loc = (url.findtext("sm:loc", default="", namespaces=ns) or "").strip()
        lastmod = url.findtext("sm:lastmod", default="", namespaces=ns) or ""
        images = []
        for im in url.findall("image:image", ns):
            iloc = im.findtext("image:loc", default="", namespaces=ns) or ""
            title = im.findtext("image:title", default="", namespaces=ns) or ""
            if iloc:
                images.append({"src": iloc, "title": title})
        if loc:
            rows.append({"url": loc, "lastmod": lastmod, "images": images})
    return rows


def canonical_path(url: str) -> str:
    p = urllib.parse.urlparse(url)
    path = p.path or "/"
    if path != "/" and path.endswith("/"):
        path = path[:-1]
    return path


def media_id(url: str) -> str:
    m = re.search(r"/media/([^/?#]+)", url)
    if not m:
        return re.sub(r"[^a-zA-Z0-9._-]", "_", url)[-80:]
    name = urllib.parse.unquote(m.group(1)).replace("%7E", "~")
    name = name.split("/")[0]
    return name


def original_media_url(url: str) -> str:
    m = re.search(r"(https://static\.wixstatic\.com/media/[^/?#]+)", url)
    if not m:
        return url.split("?")[0]
    return urllib.parse.unquote(m.group(1)).replace("%7E", "~")


def should_keep_image(url: str) -> bool:
    mid = media_id(url)
    if any(s in mid for s in SOCIAL_MEDIA_IDS):
        return False
    if mid.endswith(".svg") and "wix" in mid.lower():
        return False
    return "static.wixstatic.com/media/" in url


def download_image(url: str, mapping: dict[str, str]) -> str | None:
    orig = original_media_url(url)
    if not should_keep_image(orig):
        return None
    if orig in mapping:
        return mapping[orig]
    name = media_id(orig)
    dest = PUBLIC_IMAGES / name
    if not dest.exists():
        try:
            data = fetch(orig)
            dest.write_bytes(data)
        except Exception:
            try:
                data = fetch(url.split("/v1/")[0] if "/v1/" in url else url)
                dest.write_bytes(data)
            except Exception as e:
                print(f"  image fail {orig}: {e}")
                return None
    local = f"/images/{name}"
    mapping[orig] = local
    mapping[url] = local
    return local


def blog_headers() -> dict:
    tokens = fetch_json(f"{HOST}/_api/v1/access-tokens")
    inst = tokens["apps"][BLOG_APP]["instance"]  # type: ignore[index]
    return {"User-Agent": UA, "Authorization": inst, "x-wix-instance": inst}


def fetch_all_posts(headers: dict) -> list[dict]:
    posts = []
    offset = 0
    size = 50
    while True:
        url = (
            f"{HOST}/_api/communities-blog-node-api/_api/posts"
            f"?offset={offset}&size={size}"
        )
        batch = fetch_json(url, headers)
        if not isinstance(batch, list) or not batch:
            break
        posts.extend(batch)
        if len(batch) < size:
            break
        offset += size
    return posts


def fetch_categories(headers: dict) -> list[dict]:
    urls = [
        f"{HOST}/_api/communities-blog-node-api/_api/v2/categories",
        f"{HOST}/_api/communities-blog-node-api/_api/categories/query",
        f"{HOST}/_api/communities-blog-node-api/_api/v1/categories",
    ]
    for u in urls:
        try:
            data = fetch_json(u, headers)
            if isinstance(data, list) and data:
                return data
            if isinstance(data, dict):
                for key in ("categories", "items", "data"):
                    if isinstance(data.get(key), list) and data[key]:
                        return data[key]
        except Exception:
            continue
    return []


def soup(html: str) -> BeautifulSoup:
    return BeautifulSoup(html, "lxml")


def meta_content(s: BeautifulSoup, name: str) -> str:
    tag = s.find("meta", attrs={"name": name}) or s.find("meta", attrs={"property": name})
    if tag and tag.get("content"):
        return str(tag["content"]).strip()
    return ""


def extract_post(s: BeautifulSoup) -> dict:
    article = s.find(attrs={"data-hook": "post-description"})
    title_el = s.find(attrs={"data-hook": "post-title"})
    hero = s.find(attrs={"data-hook": "post-hero-image"})
    title = title_el.get_text(" ", strip=True) if title_el else (s.title.get_text(strip=True) if s.title else "")
    html_body = str(article) if article else ""
    images = []
    if hero:
        for img in hero.find_all("img"):
            src = img.get("src") or ""
            if src:
                images.append({"src": src, "alt": img.get("alt") or ""})
    if article:
        for img in article.find_all("img"):
            src = img.get("src") or img.get("data-src") or ""
            if src and src != "true":
                images.append({"src": src, "alt": img.get("alt") or ""})
    return {
        "title": title,
        "html": html_body,
        "images": images,
    }


def extract_page(s: BeautifulSoup) -> dict:
    title = s.title.get_text(strip=True) if s.title else ""
    h1 = s.find("h1")
    container = s.find(id="PAGES_CONTAINER") or s.find(id="SITE_PAGES")
    target = container or s.find("main") or s.body
    if not target:
        return {"title": title, "html": "", "images": []}
    clone = BeautifulSoup(str(target), "lxml")
    for bad in clone.select("header, footer, nav, script, style, noscript"):
        bad.decompose()
    images = []
    for img in clone.find_all("img"):
        src = img.get("src") or img.get("data-src") or ""
        if src:
            images.append({"src": src, "alt": img.get("alt") or ""})
    return {"title": title, "h1": h1.get_text(" ", strip=True) if h1 else "", "html": str(clone), "images": images}


def html_to_markdown(raw_html: str, mapping: dict[str, str]) -> str:
    if not raw_html:
        return ""

    def repl_img(match: re.Match[str]) -> str:
        url = match.group(1)
        local = mapping.get(url) or mapping.get(original_media_url(url))
        return f'src="{local or url}"'

    rewritten = re.sub(r'src="(https://static\.wixstatic\.com/[^"]+)"', repl_img, raw_html)
    rewritten = re.sub(
        r'href="https://www\.coffeerambler\.com([^"]*)"',
        lambda m: f'href="{m.group(1) or "/"}"',
        rewritten,
    )
    text = md(rewritten, heading_style="ATX", bullets="-")
    text = html_lib.unescape(text)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    lines = []
    for line in text.splitlines():
        stripped = line.strip().lower()
        if stripped in NAV_NOISE:
            continue
        lines.append(line)
    return "\n".join(lines).strip()


def collect_internal_links(html: str) -> list[str]:
    links = []
    for href in re.findall(r'href="(https://www\.coffeerambler\.com[^"]*|/[^"]*)"', html):
        if href.startswith("http"):
            path = canonical_path(href)
        else:
            path = href.split("?")[0].split("#")[0]
        if path and path not in links and not path.startswith("/_"):
            links.append(path)
    return links


def page_kind(path: str) -> str:
    if path == "/":
        return "home"
    if path.startswith("/post/"):
        return "post"
    if path == "/archive":
        return "archive"
    if path.startswith("/archive/categories/"):
        return "category"
    if path == "/brewing-guides":
        return "brew-hub"
    if path in {
        "/french-press",
        "/aeropress",
        "/chemex",
        "/clever-cup",
        "/syphon",
        "/moka-pot",
        "/pour-over-filter",
        "/immersion-cold-brew",
        "/cupping",
    }:
        return "brew-guide"
    if path == "/world-coffee-guide":
        return "world-guide"
    if path in {"/africa", "/asia", "/central-america", "/south-america"}:
        return "region"
    if path.startswith("/country-guide"):
        return "country"
    if path == "/about":
        return "about"
    if path == "/admin":
        return "admin"
    return "page"


def main() -> None:
    CONTENT.mkdir(parents=True, exist_ok=True)
    (CONTENT / "posts").mkdir(exist_ok=True)
    (CONTENT / "pages").mkdir(exist_ok=True)
    PUBLIC_IMAGES.mkdir(parents=True, exist_ok=True)

    print("sitemaps…")
    index = fetch(f"{HOST}/sitemap.xml")
    sm_root = ET.fromstring(index)
    sm_ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    child_locs = [el.text for el in sm_root.findall("sm:sitemap/sm:loc", sm_ns) if el.text]
    sitemap_rows: list[dict] = []
    for loc in child_locs:
        print(" ", loc)
        sitemap_rows.extend(parse_sitemap(fetch(loc)))

    by_path = {canonical_path(r["url"]): r for r in sitemap_rows}

    print("blog API…")
    headers = blog_headers()
    posts_meta = fetch_all_posts(headers)
    print(f"  posts {len(posts_meta)}")
    cats_meta = fetch_categories(headers)
    print(f"  categories {len(cats_meta)}")

    image_map: dict[str, str] = {}
    inventory: list[dict] = []
    post_records: list[dict] = []
    page_records: list[dict] = []
    category_records: list[dict] = []

    post_by_slug = {}
    for p in posts_meta:
        slug = p.get("seoSlug") or p.get("slug") or (p.get("slugs") or [None])[0]
        if slug:
            post_by_slug[slug] = p

    # Cover images from sitemap + API
    for row in sitemap_rows:
        for im in row.get("images") or []:
            download_image(im["src"], image_map)

    for p in posts_meta:
        cover = ((p.get("coverImage") or {}).get("src") or {})
        fid = cover.get("id") or cover.get("file_name")
        if fid:
            download_image(f"https://static.wixstatic.com/media/{fid}", image_map)

    paths = sorted(by_path.keys(), key=lambda x: (page_kind(x), x))
    print(f"crawl {len(paths)} urls")

    for i, path in enumerate(paths, 1):
        url = HOST + ("" if path == "/" else path)
        kind = page_kind(path)
        print(f"[{i}/{len(paths)}] {kind} {path}")
        try:
            raw = fetch(url).decode("utf-8", "replace")
        except Exception as e:
            inventory.append(
                {
                    "url": url,
                    "path": path,
                    "kind": kind,
                    "status": "fetch-error",
                    "error": str(e),
                }
            )
            continue
        s = soup(raw)
        title = s.title.get_text(strip=True) if s.title else ""
        description = meta_content(s, "description") or meta_content(s, "og:description")
        published = ""
        ld = s.find("script", attrs={"type": "application/ld+json"})
        if ld and ld.string:
            try:
                data = json.loads(ld.string)
                published = data.get("datePublished") or ""
                if not description:
                    description = data.get("description") or ""
            except Exception:
                pass

        if kind == "post":
            extracted = extract_post(s)
            slug = path.split("/post/", 1)[-1]
            meta = post_by_slug.get(slug, {})
            title = extracted["title"] or meta.get("title") or title
            description = meta.get("seoDescription") or description
            published = meta.get("firstPublishedDate") or published
            cover_id = ((meta.get("coverImage") or {}).get("src") or {}).get("id")
            cover_local = None
            if cover_id:
                cover_local = download_image(
                    f"https://static.wixstatic.com/media/{cover_id}", image_map
                )
            page_images = []
            for im in extracted["images"] + (by_path[path].get("images") or []):
                local = download_image(im["src"], image_map)
                if local:
                    page_images.append(
                        {
                            "wix": original_media_url(im["src"]),
                            "local": local,
                            "alt": im.get("alt") or im.get("title") or "",
                        }
                    )
            body = html_to_markdown(extracted["html"], image_map)
            cats = []
            rec = {
                "type": "post",
                "slug": slug,
                "path": path,
                "title": title,
                "description": description,
                "date": (published or "")[:10],
                "datetime": published,
                "author": (meta.get("owner") or {}).get("name") or "Keiran Jones",
                "minutes": meta.get("timeToRead"),
                "categories": cats,
                "categoryIds": meta.get("categoryIds") or [],
                "coverImage": cover_local,
                "excerpt": meta.get("excerpt") or description,
                "body": body,
                "images": page_images,
                "internalLinks": collect_internal_links(extracted["html"]),
                "seoTitle": meta.get("seoTitle") or title,
                "seoDescription": description,
                "draft": False,
            }
            (CONTENT / "posts" / f"{slug}.json").write_text(
                json.dumps(rec, indent=2, ensure_ascii=False) + "\n"
            )
            post_records.append(rec)
            inventory.append(
                {
                    "url": url,
                    "path": path,
                    "kind": kind,
                    "title": title,
                    "date": rec["date"],
                    "description": description,
                    "coverImage": cover_local,
                    "images": page_images,
                    "gscIndexed": None,
                }
            )
        else:
            extracted = extract_page(s)
            doc_title = s.title.get_text(strip=True) if s.title else title
            h1 = extracted.get("h1") or ""
            title = visible_page_title(doc_title, h1)
            seo_title = seo_page_title(doc_title, title)
            page_images = []
            for im in extracted["images"] + (by_path[path].get("images") or []):
                local = download_image(im["src"], image_map)
                if local:
                    page_images.append(
                        {
                            "wix": original_media_url(im["src"]),
                            "local": local,
                            "alt": im.get("alt") or im.get("title") or "",
                        }
                    )
            body = html_to_markdown(extracted["html"], image_map)
            slug = path.strip("/") or "home"
            rec = {
                "type": kind,
                "slug": slug,
                "path": path,
                "title": title,
                "description": description,
                "date": by_path[path].get("lastmod") or "",
                "body": body,
                "images": page_images,
                "internalLinks": collect_internal_links(extracted["html"]),
                "seoTitle": seo_title,
                "seoDescription": description,
                "draft": False,
            }
            fname = slug.replace("/", "--") or "home"
            (CONTENT / "pages" / f"{fname}.json").write_text(
                json.dumps(rec, indent=2, ensure_ascii=False) + "\n"
            )
            page_records.append(rec)
            if kind == "category":
                category_records.append(
                    {
                        "slug": path.split("/archive/categories/")[-1],
                        "path": path,
                        "title": title,
                    }
                )
            inventory.append(
                {
                    "url": url,
                    "path": path,
                    "kind": kind,
                    "title": title,
                    "date": rec["date"],
                    "description": description,
                    "coverImage": page_images[0]["local"] if page_images else None,
                    "images": page_images,
                    "gscIndexed": None,
                }
            )
        time.sleep(0.15)

    (CONTENT / "inventory.json").write_text(
        json.dumps(inventory, indent=2, ensure_ascii=False) + "\n"
    )
    (CONTENT / "image-map.json").write_text(
        json.dumps(image_map, indent=2, ensure_ascii=False) + "\n"
    )
    (CONTENT / "posts-index.json").write_text(
        json.dumps(
            [
                {
                    "slug": p["slug"],
                    "path": p["path"],
                    "title": p["title"],
                    "date": p["date"],
                    "description": p["description"],
                    "excerpt": p.get("excerpt"),
                    "coverImage": p.get("coverImage"),
                    "author": p.get("author"),
                    "minutes": p.get("minutes"),
                    "categoryIds": p.get("categoryIds"),
                    "categories": p.get("categories"),
                    "draft": False,
                }
                for p in sorted(post_records, key=lambda x: x.get("date") or "", reverse=True)
            ],
            indent=2,
            ensure_ascii=False,
        )
        + "\n"
    )
    (CONTENT / "pages-index.json").write_text(
        json.dumps(
            [
                {
                    "slug": p["slug"],
                    "path": p["path"],
                    "type": p["type"],
                    "title": p["title"],
                    "description": p["description"],
                    "date": p["date"],
                }
                for p in page_records
            ],
            indent=2,
            ensure_ascii=False,
        )
        + "\n"
    )
    (CONTENT / "categories.json").write_text(
        json.dumps(category_records or cats_meta, indent=2, ensure_ascii=False) + "\n"
    )
    (CONTENT / "blog-api-posts.json").write_text(
        json.dumps(posts_meta, indent=2, ensure_ascii=False) + "\n"
    )
    print("done", len(inventory), "urls", len(image_map), "images")


if __name__ == "__main__":
    main()
