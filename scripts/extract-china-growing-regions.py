#!/usr/bin/env python3
"""Build a reusable China coffee-region GeoJSON from geoBoundaries.

Country outline: geoBoundaries CHN ADM0 (public domain).
Growing overlays: union of geoBoundaries CHN ADM2 counties that make up
Baoshan, Pu'er and Dehong prefectures, plus ADM1 polygons for Hainan and
Fujian (robusta). These are administrative stand-ins for growing areas,
not farm-level coffee polygons.
"""

from __future__ import annotations

import json
from pathlib import Path

from shapely.geometry import mapping, shape
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[1]
CACHE = Path("/tmp/geo")
OUT = ROOT / "src/data/country-guides/china-map.json"

ADM2_NAMES = {
    "baoshan": {
        "exact": {"Baoshanshi", "Shidianxian", "Tengchongxian", "Longlingxian"},
        "bbox": {
            "Changningxian": (99.0, 24.0, 100.4, 25.5),
        },
    },
    "puer": {
        "exact": {
            "Puerhanizhuyizuzizhixian",
            "Simaoxian",
            "Jiangchenghanizhuyizuzizhixian",
            "Jingdongyizuzizhixian",
            "Jinggudaizhuyizuzizhixian",
            "Mengliandaizhulaguzhuvazuzizhixian",
            "Mojianghanizuzizhixian",
            "Ximengwazuzizhixian",
            "Zhenyuanyizhuhanizhulahuzuzizhixain",
            "Lanchanglaguzuzizhixian",
        },
        "bbox": {},
    },
    "ruili": {
        "exact": {"Ruilishi", "Wandingshi", "Lianghexian", "Yingjiangxian"},
        "bbox": {
            "Longchuanxian": (97.4, 24.0, 98.5, 24.8),
            "Luxixian": (97.8, 24.0, 99.0, 24.9),
        },
    },
}

REGION_META = {
    "baoshan": {"name": "Baoshan", "number": 1, "species": "arabica"},
    "puer": {"name": "Pu'er", "number": 2, "species": "arabica"},
    "ruili": {"name": "Ruili", "number": 3, "species": "arabica"},
    "hainan": {"name": "Hainan", "number": 4, "species": "robusta"},
    "fujian": {"name": "Fujian", "number": 5, "species": "robusta"},
}


def in_bbox(geom, box):
    minx, miny, maxx, maxy = geom.bounds
    cx, cy = (minx + maxx) / 2, (miny + maxy) / 2
    return box[0] <= cx <= box[2] and box[1] <= cy <= box[3]


def is_taiwan_part(geom):
    p = geom.representative_point()
    x, y = p.x, p.y
    if 119.2 <= x <= 122.3 and 21.7 <= y <= 25.5:
        return True
    if 118.15 <= x <= 118.55 and 24.3 <= y <= 24.55:
        return True
    if 119.4 <= x <= 120.7 and 25.9 <= y <= 26.5:
        return True
    return False


def drop_taiwan(geom):
    if geom.geom_type == "Polygon":
        return None if is_taiwan_part(geom) else geom
    if geom.geom_type == "MultiPolygon":
        parts = [part for part in geom.geoms if not is_taiwan_part(part)]
        if not parts:
            return None
        if len(parts) == 1:
            return parts[0]
        return type(geom)(parts)
    return geom


def simplify(geom, tol=0.02):
    cleaned = geom.buffer(0)
    if cleaned.is_empty:
        return geom
    simple = cleaned.simplify(tol, preserve_topology=True)
    return simple if not simple.is_empty else cleaned


def pick_counties(features, spec):
    picked = []
    for feature in features:
        name = feature["properties"].get("shapeName") or ""
        geom = shape(feature["geometry"])
        if name in spec["exact"]:
            picked.append(geom)
            continue
        box = spec["bbox"].get(name)
        if box and in_bbox(geom, box):
            picked.append(geom)
    return picked


def feature_for(geom, region_id):
    meta = REGION_META[region_id]
    simple = simplify(unary_union(geom) if isinstance(geom, list) else geom)
    point = simple.representative_point()
    return {
        "type": "Feature",
        "id": region_id,
        "properties": {
            "id": region_id,
            "name": meta["name"],
            "number": meta["number"],
            "species": meta["species"],
            "label": [round(point.x, 4), round(point.y, 4)],
        },
        "geometry": mapping(simple),
    }


def main():
    adm0 = json.loads((CACHE / "adm0.geojson").read_text())["features"][0]
    adm1 = json.loads((CACHE / "adm1.geojson").read_text())["features"]
    adm2 = json.loads((CACHE / "adm2.geojson").read_text())["features"]

    outline = drop_taiwan(shape(adm0["geometry"]))
    if outline is None:
        raise SystemExit("China outline vanished after dropping Taiwan")
    country = {
        "type": "Feature",
        "id": "china",
        "properties": {"id": "china", "name": "China"},
        "geometry": mapping(simplify(outline, 0.03)),
    }

    regions = []
    for region_id, spec in ADM2_NAMES.items():
        geoms = pick_counties(adm2, spec)
        if not geoms:
            raise SystemExit(f"no counties matched {region_id}")
        print(f"{region_id}: {len(geoms)} counties")
        regions.append(feature_for(geoms, region_id))

    adm1_by_name = {f["properties"]["shapeName"]: f for f in adm1}
    regions.append(feature_for(shape(adm1_by_name["Hainan Province"]["geometry"]), "hainan"))
    fujian = drop_taiwan(shape(adm1_by_name["Fujian Province"]["geometry"]))
    if fujian is None:
        raise SystemExit("Fujian vanished after dropping Taiwan polygons")
    regions.append(feature_for(fujian, "fujian"))
    regions.sort(key=lambda f: f["properties"]["number"])

    payload = {
        "type": "FeatureCollection",
        "name": "china-coffee-growing-regions",
        "source": {
            "name": "geoBoundaries gbOpen CHN",
            "license": "PDDL 1.0 / public domain",
            "country": "https://www.geoboundaries.org/api/current/gbOpen/CHN/ADM0/",
            "regionsAdm2": "https://www.geoboundaries.org/api/current/gbOpen/CHN/ADM2/",
            "regionsAdm1": "https://www.geoboundaries.org/api/current/gbOpen/CHN/ADM1/",
            "note": "Arabica overlays are unions of prefecture counties (Baoshan, Pu'er, Dehong/Ruili). Hainan and Fujian use province polygons as robusta stand-ins. Not a farm-level coffee cadastre.",
        },
        "features": [country, *regions],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
    print("wrote", OUT, "bytes", OUT.stat().st_size)


if __name__ == "__main__":
    main()
