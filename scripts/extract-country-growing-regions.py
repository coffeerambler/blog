#!/usr/bin/env python3
"""Build simplified country + growing-region GeoJSON from geoBoundaries.

Expects cached files in /tmp/geo from the geoBoundaries simplified downloads.
"""

from __future__ import annotations

import json
from pathlib import Path

from shapely.geometry import mapping, shape
from shapely.ops import unary_union

CACHE = Path("/tmp/geo")
OUT = Path(__file__).resolve().parents[1] / "src/data/country-guides"

SOURCE = {
    "name": "geoBoundaries gbOpen",
    "license": "PDDL 1.0 / public domain",
}


def _centroid_xy(geom):
    p = geom.representative_point()
    return p.x, p.y


def is_taiwan_part(geom):
    """Taiwan island, Kinmen, and Matsu. Not Hainan or Fujian mainland."""
    x, y = _centroid_xy(geom)
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
    if simple.is_empty:
        simple = cleaned
    # Drop coastline specks. They invert d3-geo spherical winding and stretch the map.
    if simple.geom_type == "MultiPolygon":
        parts = [part for part in simple.geoms if part.area >= 1e-4]
        if len(parts) == 1:
            simple = parts[0]
        elif parts:
            simple = type(simple)(parts)
    return simple


def load(name):
    return json.loads((CACHE / name).read_text())


def by_name(features):
    out = {}
    for feature in features:
        name = feature["properties"].get("shapeName") or ""
        out[name] = feature
    return out


def feat(geom, region_id, name, number, species, tol=0.02):
    simple = simplify(geom if not isinstance(geom, list) else unary_union(geom), tol)
    point = simple.representative_point()
    return {
        "type": "Feature",
        "id": region_id,
        "properties": {
            "id": region_id,
            "name": name,
            "number": number,
            "species": species,
            "label": [round(point.x, 4), round(point.y, 4)],
        },
        "geometry": mapping(simple),
    }


def country_feat(adm0, country_id, name, tol=0.03):
    geom = shape(adm0["features"][0]["geometry"])
    return {
        "type": "Feature",
        "id": country_id,
        "properties": {"id": country_id, "name": name},
        "geometry": mapping(simplify(geom, tol)),
    }


def pick(index, names):
    geoms = []
    for name in names:
        if name not in index:
            raise SystemExit(f"missing {name}")
        geoms.append(shape(index[name]["geometry"]))
    return geoms if len(geoms) > 1 else geoms[0]


def write_collection(slug, country, regions, note, extra=None):
    payload = {
        "type": "FeatureCollection",
        "name": f"{slug}-coffee-growing-regions",
        "source": {
            **SOURCE,
            "country": extra or "",
            "regionsAdm1": "",
            "regionsAdm2": "",
            "note": note,
        },
        "features": [country, *regions],
    }
    path = OUT / f"{slug}-map.json"
    path.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
    print("wrote", path, path.stat().st_size)


def china():
    adm0 = load("CHN_ADM0.json") if (CACHE / "CHN_ADM0.json").exists() else load("adm0.geojson")
    adm1 = by_name(load("CHN_ADM1.json")["features"] if (CACHE / "CHN_ADM1.json").exists() else load("adm1.geojson")["features"])
    adm2 = load("adm2.geojson")["features"]

    def bbox_ok(geom, box):
        minx, miny, maxx, maxy = geom.bounds
        cx, cy = (minx + maxx) / 2, (miny + maxy) / 2
        return box[0] <= cx <= box[2] and box[1] <= cy <= box[3]

    specs = {
        "baoshan": ({"Baoshanshi", "Shidianxian", "Tengchongxian", "Longlingxian"}, {"Changningxian": (99.0, 24.0, 100.4, 25.5)}),
        "puer": (
            {
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
            {},
        ),
        "dehong": (
            {"Ruilishi", "Wandingshi", "Lianghexian", "Yingjiangxian"},
            {"Longchuanxian": (97.4, 24.0, 98.5, 24.8), "Luxixian": (97.8, 24.0, 99.0, 24.9)},
        ),
        "lincang": (
            {"Linchangxian", "Fengqingxian", "Yongdexian", "Zhenkangxian", "Gengmadaizhuwazuzizhixian"},
            {"Yunxian": (99.4, 23.8, 100.8, 25.0)},
        ),
    }
    geoms = {key: [] for key in specs}
    for feature in adm2:
        name = feature["properties"].get("shapeName") or ""
        geom = shape(feature["geometry"])
        for key, (exact, boxes) in specs.items():
            if name in exact or (name in boxes and bbox_ok(geom, boxes[name])):
                geoms[key].append(geom)
    meta = [
        ("baoshan", "Baoshan", 1, "arabica"),
        ("puer", "Pu'er", 2, "arabica"),
        ("dehong", "Dehong", 3, "arabica"),
        ("lincang", "Lincang", 4, "arabica"),
        ("hainan", "Hainan", 5, "robusta"),
        ("fujian", "Fujian", 6, "robusta"),
    ]
    regions = []
    for region_id, name, number, species in meta:
        if region_id in ("hainan", "fujian"):
            key = "Hainan Province" if region_id == "hainan" else "Fujian Province"
            geom = shape(adm1[key]["geometry"])
            if region_id == "fujian":
                geom = drop_taiwan(geom)
                if geom is None:
                    raise SystemExit("Fujian vanished after dropping Taiwan polygons")
            regions.append(feat(geom, region_id, name, number, species))
        else:
            if not geoms[region_id]:
                raise SystemExit(f"no counties for {region_id}")
            print("china", region_id, len(geoms[region_id]))
            regions.append(feat(geoms[region_id], region_id, name, number, species))
    china_outline = drop_taiwan(shape(adm0["features"][0]["geometry"]))
    if china_outline is None:
        raise SystemExit("China outline vanished after dropping Taiwan")
    write_collection(
        "china",
        {
            "type": "Feature",
            "id": "china",
            "properties": {"id": "china", "name": "China"},
            "geometry": mapping(simplify(china_outline, 0.03)),
        },
        regions,
        "Arabica overlays are Yunnan prefecture unions (Pu'er, Baoshan, Dehong, Lincang). Hainan and Fujian are province polygons for the remaining robusta.",
        "https://www.geoboundaries.org/api/current/gbOpen/CHN/ADM0/",
    )


def colombia():
    adm0 = load("COL_ADM0.json")
    adm1 = by_name(load("COL_ADM1.json")["features"])
    rows = [
        ("magdalena", "Magdalena", 1, ["Magdalena"]),
        ("santander", "Santander", 2, ["Santander", "Norte de Santander"]),
        ("antioquia", "Antioquia", 3, ["Antioquia"]),
        ("caldas", "Caldas", 4, ["Caldas"]),
        ("risaralda", "Risaralda", 5, ["Risaralda"]),
        ("cundinamarca", "Cundinamarca", 6, ["Cundinamarca"]),
        ("valle", "Valle del Cauca", 7, ["Valle del Cauca"]),
        ("cauca", "Cauca", 8, ["Cauca"]),
        ("tolima", "Tolima", 9, ["Tolima"]),
        ("huila", "Huila", 10, ["Huila"]),
        ("narino", "Nariño", 11, ["Nariño"]),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, "arabica", 0.03)
        for rid, name, num, names in rows
    ]
    write_collection(
        "colombia",
        country_feat(adm0, "colombia", "Colombia", 0.04),
        regions,
        "Department polygons (geoBoundaries ADM1). Santander includes Norte de Santander. These are administrative stand-ins for the FNC growing regions, not farm cadastres.",
        "https://www.geoboundaries.org/api/current/gbOpen/COL/ADM0/",
    )


def ethiopia():
    adm0 = load("ETH_ADM0.json")
    adm2 = by_name(load("ETH_ADM2.json")["features"])
    rows = [
        ("harrar", "Harrar", 1, ["East Harerge", "Hareri"]),
        ("yirgacheffe", "Yirgacheffe", 2, ["Gedio"]),
        ("sidama", "Sidama", 3, ["Sidama"]),
        ("guji", "Guji", 4, ["Guji"]),
        ("jimma", "Jimma", 5, ["Jimma"]),
        ("lekempti", "Lekempti", 6, ["West Wellega"]),
        ("tepi", "Tepi", 7, ["Sheka"]),
        ("bebeka", "Bebeka", 8, ["Bench Maji"]),
    ]
    regions = [
        feat(pick(adm2, names), rid, name, num, "arabica", 0.025)
        for rid, name, num, names in rows
    ]
    write_collection(
        "ethiopia",
        country_feat(adm0, "ethiopia", "Ethiopia", 0.04),
        regions,
        "Zone polygons (geoBoundaries ETH ADM2): Gedeo for Yirgacheffe, East Harerge/Hareri for Harrar, West Wellega for Lekempti, Sheka for Tepi, Bench Maji for Bebeka. Guji is listed separately from Sidama.",
        "https://www.geoboundaries.org/api/current/gbOpen/ETH/ADM0/",
    )


def costa_rica():
    adm0 = load("CRI_ADM0.json")
    adm2 = by_name(load("CRI_ADM2.json")["features"])
    rows = [
        ("west-valley", "West Valley", 1, ["Naranjo", "Grecia", "Sarchi", "San Ramon", "Palmeras", "Zarcero", "Poas", "Atenas", "Alajuela"]),
        ("central-valley", "Central Valley", 2, ["San Jose", "Escazu", "Desamparados", "Aserri", "Heredia", "Barva", "Santa Ana"]),
        ("tarrazu", "Tarrazú", 3, ["Tarrazu", "Dota", "Leon Cortes Castro"]),
        ("tres-rios", "Tres Ríos", 4, ["La Union"]),
        ("turrialba", "Turrialba", 5, ["Turrialba"]),
        ("orosi", "Orosí", 6, ["Paraiso"]),
        ("brunca", "Brunca", 7, ["Perez Zeledon", "Coto Brus", "Buenos Aires"]),
    ]
    regions = [
        feat(pick(adm2, names), rid, name, num, "arabica", 0.01)
        for rid, name, num, names in rows
    ]
    write_collection(
        "costarica",
        country_feat(adm0, "costarica", "Costa Rica", 0.015),
        regions,
        "ICAFE regions as canton unions (geoBoundaries CRI ADM2). West Valley and Central Valley are partial canton sets, not every farm. Robusta is legal again since 2018 but still a rounding error on the map.",
        "https://www.geoboundaries.org/api/current/gbOpen/CRI/ADM0/",
    )


def el_salvador():
    adm0 = load("SLV_ADM0.json")
    adm1 = by_name(load("SLV_ADM1.json")["features"])
    rows = [
        ("apaneca", "Apaneca-Ilamatepec", 1, ["Departamento de Ahuachapán", "Departamento de Santa Ana", "Departamento de Sonsonate"]),
        ("balsamo", "El Bálsamo-Quezaltepec", 2, ["La Libertad"]),
        ("tecapa", "Tecapa-Chinameca", 3, ["Departamento de Usulután", "Departamento de San Miguel"]),
        ("chichontepec", "Chichontepec", 4, ["San Vicente"]),
        ("cacahuatique", "Cacahuatique", 5, ["Departamento de Morazán"]),
        ("alotepec", "Alotepec-Metapán", 6, ["Departamento de Chalatenango"]),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, "arabica", 0.01)
        for rid, name, num, names in rows
    ]
    write_collection(
        "elsalvador",
        country_feat(adm0, "elsalvador", "El Salvador", 0.012),
        regions,
        "The six CSC denominations of origin, drawn as department unions (geoBoundaries SLV ADM1). Apaneca-Ilamatepec uses Ahuachapán, Santa Ana and Sonsonate. Arabica only — El Salvador does not grow robusta at commercial scale.",
        "https://www.geoboundaries.org/api/current/gbOpen/SLV/ADM0/",
    )


def kenya():
    adm0 = load("KEN_ADM0.json")
    adm1 = by_name(load("KEN_ADM1.json")["features"])
    rows = [
        ("nyeri", "Nyeri", 1, ["Nyeri"], "arabica"),
        ("kirinyaga", "Kirinyaga", 2, ["Kirinyaga"], "arabica"),
        ("muranga", "Murang'a", 3, ["Murang'a"], "arabica"),
        ("kiambu", "Kiambu", 4, ["Kiambu"], "arabica"),
        ("embu", "Embu", 5, ["Embu"], "arabica"),
        ("meru", "Meru", 6, ["Meru", "Tharaka"], "arabica"),
        ("machakos", "Machakos", 7, ["Machakos"], "arabica"),
        ("bungoma", "Mount Elgon / Bungoma", 8, ["Bungoma"], "arabica"),
        ("kisii", "Kisii", 9, ["Kisii", "Nyamira"], "arabica"),
        ("kericho", "Kericho", 10, ["Kericho", "Bomet"], "arabica"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.015)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "kenya",
        country_feat(adm0, "kenya", "Kenya", 0.02),
        regions,
        "County polygons (geoBoundaries KEN ADM1). Meru includes Tharaka. Kisii includes Nyamira. Kericho includes Bomet. Kenya is arabica; robusta is not a commercial crop here.",
        "https://www.geoboundaries.org/api/current/gbOpen/KEN/ADM0/",
    )


def bolivia():
    adm0 = load("BOL_ADM0.json")
    adm1 = by_name(load("BOL_ADM1.json")["features"])
    adm2 = by_name(load("BOL_ADM2.json")["features"])
    regions = [
        feat(pick(adm2, ["Caranavi"]), "caranavi", "Caranavi", 1, "arabica", 0.015),
        feat(pick(adm2, ["Nor Yungas", "Sud Yungas", "Inquisivi"]), "yungas", "Other Yungas", 2, "arabica", 0.02),
        feat(pick(adm1, ["Cochabamba"]), "cochabamba", "Cochabamba", 3, "arabica", 0.03),
        feat(pick(adm1, ["Santa Cruz"]), "santacruz", "Santa Cruz", 4, "arabica", 0.04),
        feat(pick(adm2, ["Nor Cinti", "Sur Cinti"]), "cintis", "Los Cintis / Tarija", 5, "arabica", 0.02),
    ]
    write_collection(
        "bolivia",
        country_feat(adm0, "bolivia", "Bolivia", 0.04),
        regions,
        "Caranavi and the other Yungas are ADM2 unions in La Paz. Cochabamba and Santa Cruz are whole departments; farms sit on the Andean edge, not the whole polygon. Los Cintis is Nor and Sur Cinti. Arabica only.",
        "https://www.geoboundaries.org/api/current/gbOpen/BOL/ADM0/",
    )


def drop_galapagos(geom):
    """Galápagos sits west of about 85°W and stretches Mercator fitExtent."""
    if geom.geom_type == "Polygon":
        return None if _centroid_xy(geom)[0] < -85 else geom
    if geom.geom_type == "MultiPolygon":
        parts = [part for part in geom.geoms if _centroid_xy(part)[0] >= -85]
        if not parts:
            return None
        if len(parts) == 1:
            return parts[0]
        return type(geom)(parts)
    return geom


def country_feat_filtered(adm0, country_id, name, filter_fn, tol=0.03):
    geom = filter_fn(shape(adm0["features"][0]["geometry"]))
    if geom is None:
        raise SystemExit(f"empty country after filter: {country_id}")
    return {
        "type": "Feature",
        "id": country_id,
        "properties": {"id": country_id, "name": name},
        "geometry": mapping(simplify(geom, tol)),
    }


def indonesia():
    adm0 = load("IDN_ADM0.json")
    adm1 = by_name(load("IDN_ADM1.json")["features"])
    rows = [
        ("aceh", "Aceh / Gayo", 1, ["Aceh"], "arabica"),
        ("sumut", "North Sumatra", 2, ["North Sumatra"], "arabica"),
        ("eastjava", "East Java", 3, ["East Java"], "arabica"),
        ("sulsel", "South Sulawesi / Toraja", 4, ["South Sulawesi"], "arabica"),
        ("bali", "Bali", 5, ["Bali"], "arabica"),
        ("flores", "Flores", 6, ["East Nusa Tenggara"], "arabica"),
        ("papua", "Papua", 7, ["Papua"], "arabica"),
        ("lampung", "Lampung", 8, ["Lampung"], "robusta"),
        ("sumsel", "South Sumatra", 9, ["South Sumatra"], "robusta"),
        ("bengkulu", "Bengkulu", 10, ["Bengkulu"], "robusta"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.04)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "indonesia",
        country_feat(adm0, "indonesia", "Indonesia", 0.08),
        regions,
        "Province polygons (geoBoundaries IDN ADM1). Flores is the whole of East Nusa Tenggara. Papua is the large eastern province, not only the highlands. Robusta is Lampung, South Sumatra and Bengkulu.",
        "https://www.geoboundaries.org/api/current/gbOpen/IDN/ADM0/",
    )


def brazil():
    adm0 = load("BRA_ADM0.json")
    adm1 = by_name(load("BRA_ADM1.json")["features"])
    rows = [
        ("minas", "Minas Gerais", 1, ["Minas Gerais"], "arabica"),
        ("saopaulo", "São Paulo", 2, ["Sao Paulo"], "arabica"),
        ("bahia", "Bahia", 3, ["Bahia"], "arabica"),
        ("parana", "Paraná", 4, ["Parana"], "arabica"),
        ("espirito", "Espírito Santo", 5, ["Espirito Santo"], "robusta"),
        ("rondonia", "Rondônia", 6, ["Rondonia"], "robusta"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.04)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "brazil",
        country_feat(adm0, "brazil", "Brazil", 0.08),
        regions,
        "State polygons (geoBoundaries BRA ADM1). Minas, São Paulo, Bahia and Paraná are the arabica belt. Espírito Santo and Rondônia are conilon/robusta. The farms sit in belts inside those states, not the whole polygon.",
        "https://www.geoboundaries.org/api/current/gbOpen/BRA/ADM0/",
    )


def papua_new_guinea():
    adm0 = load("PNG_ADM0.json")
    adm1 = by_name(load("PNG_ADM1.json")["features"])
    rows = [
        ("easternhighlands", "Eastern Highlands", 1, ["Eastern Highlands Province"], "arabica"),
        ("westernhighlands", "Western Highlands", 2, ["Western Highlands Province"], "arabica"),
        ("simbu", "Simbu", 3, ["Chimbu (Simbu) Province"], "arabica"),
        ("jiwaka", "Jiwaka", 4, ["Jiwaka Province"], "arabica"),
        ("morobe", "Morobe", 5, ["Morobe Province"], "arabica"),
        ("enga", "Enga", 6, ["Enga Province"], "arabica"),
        ("southernhighlands", "Southern Highlands", 7, ["Southern Highlands Province"], "arabica"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.03)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "papuanewguinea",
        country_feat(adm0, "papuanewguinea", "Papua New Guinea", 0.05),
        regions,
        "Highland provinces (geoBoundaries PNG ADM1). Coffee is almost all arabica in the highlands; the country outline still includes the islands. Morobe includes the Markham and the highland edge.",
        "https://www.geoboundaries.org/api/current/gbOpen/PNG/ADM0/",
    )


def taiwan():
    adm0 = load("TWN_ADM0.json")
    adm1 = by_name(load("TWN_ADM1.json")["features"])
    rows = [
        ("chiayi", "Chiayi / Alishan", 1, ["Chiayi County"], "arabica"),
        ("nantou", "Nantou", 2, ["Nantou County"], "arabica"),
        ("yunlin", "Yunlin / Gukeng", 3, ["Yunlin County"], "arabica"),
        ("tainan", "Tainan / Dongshan", 4, ["Tainan"], "arabica"),
        ("pingtung", "Pingtung", 5, ["Pingtung County"], "arabica"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.008)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "taiwan",
        country_feat(adm0, "taiwan", "Taiwan", 0.012),
        regions,
        "County and city polygons (geoBoundaries TWN ADM1). Alishan is Chiayi County, not the city. Gukeng is Yunlin. Dongshan is Tainan. Arabica only at commercial scale.",
        "https://www.geoboundaries.org/api/current/gbOpen/TWN/ADM0/",
    )


def guatemala():
    adm0 = load("GTM_ADM0.json")
    adm1 = by_name(load("GTM_ADM1.json")["features"])
    rows = [
        ("antigua", "Antigua", 1, ["Sacatepéquez"], "arabica"),
        ("acatenango", "Acatenango", 2, ["Chimaltenango"], "arabica"),
        ("atitlan", "Atitlán", 3, ["Sololá"], "arabica"),
        ("coban", "Cobán", 4, ["Alta Verapaz"], "arabica"),
        ("fraijanes", "Fraijanes", 5, ["Guatemala"], "arabica"),
        ("huehue", "Huehuetenango", 6, ["Huehuetenango"], "arabica"),
        ("oriente", "Nuevo Oriente", 7, ["Chiquimula"], "arabica"),
        ("sanmarcos", "San Marcos", 8, ["San Marcos"], "arabica"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.015)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "guatemala",
        country_feat(adm0, "guatemala", "Guatemala", 0.02),
        regions,
        "Anacafé regions as department polygons (geoBoundaries GTM ADM1). Antigua is Sacatepéquez. Fraijanes is the department of Guatemala, not only the plateau. Nuevo Oriente is Chiquimula. Arabica only.",
        "https://www.geoboundaries.org/api/current/gbOpen/GTM/ADM0/",
    )


def rwanda():
    adm0 = load("RWA_ADM0.json")
    adm2 = by_name(load("RWA_ADM2.json")["features"])
    rows = [
        ("nyamasheke", "Nyamasheke", 1, ["Nyamasheke"], "arabica"),
        ("rusizi", "Rusizi", 2, ["Rusizi"], "arabica"),
        ("huye", "Huye", 3, ["Huye"], "arabica"),
        ("nyamagabe", "Nyamagabe", 4, ["Nyamagabe"], "arabica"),
        ("nyaruguru", "Nyaruguru", 5, ["Nyaruguru"], "arabica"),
        ("gakenke", "Gakenke", 6, ["Gakenke"], "arabica"),
        ("nyabihu", "Nyabihu", 7, ["Nyabihu"], "arabica"),
        ("rutsiro", "Rutsiro", 8, ["Rutsiro"], "arabica"),
    ]
    regions = [
        feat(pick(adm2, names), rid, name, num, species, 0.008)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "rwanda",
        country_feat(adm0, "rwanda", "Rwanda", 0.012),
        regions,
        "District polygons (geoBoundaries RWA ADM2). Western and Southern districts carry most of the crop. Arabica only.",
        "https://www.geoboundaries.org/api/current/gbOpen/RWA/ADM0/",
    )


def burundi():
    adm0 = load("BDI_ADM0.json")
    adm1 = by_name(load("BDI_ADM1.json")["features"])
    rows = [
        ("kayanza", "Kayanza", 1, ["Kayanza"], "arabica"),
        ("ngozi", "Ngozi", 2, ["Ngozi"], "arabica"),
        ("kirundo", "Kirundo", 3, ["Kirundo"], "arabica"),
        ("muyinga", "Muyinga", 4, ["Muyinga"], "arabica"),
        ("gitega", "Gitega", 5, ["Gitega"], "arabica"),
        ("muramvya", "Muramvya", 6, ["Muramvya"], "arabica"),
        ("karuzi", "Karuzi", 7, ["Karuzi"], "arabica"),
        ("cibitoke", "Cibitoke", 8, ["Cibitoke"], "arabica"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.01)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "burundi",
        country_feat(adm0, "burundi", "Burundi", 0.012),
        regions,
        "Province polygons (geoBoundaries BDI ADM1). Kayanza and Ngozi are the names on a lot of specialty bags. Arabica only.",
        "https://www.geoboundaries.org/api/current/gbOpen/BDI/ADM0/",
    )


def ecuador():
    adm0 = load("ECU_ADM0.json")
    adm1 = by_name(load("ECU_ADM1.json")["features"])
    rows = [
        ("loja", "Loja", 1, ["Loja"], "arabica"),
        ("elor", "El Oro / Zaruma", 2, ["El Oro"], "arabica"),
        ("pichincha", "Pichincha", 3, ["Pichincha"], "arabica"),
        ("imbabura", "Imbabura / Intag", 4, ["Imbabura"], "arabica"),
        ("zamora", "Zamora Chinchipe", 5, ["Zamora Chinchipe"], "arabica"),
        ("napo", "Napo", 6, ["Napo"], "robusta"),
        ("orellana", "Orellana", 7, ["Orellana"], "robusta"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.02)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "ecuador",
        country_feat_filtered(adm0, "ecuador", "Ecuador", drop_galapagos, 0.03),
        regions,
        "Province polygons (geoBoundaries ECU ADM1). Galápagos is dropped from the country outline so the mainland fits. Loja, El Oro, Pichincha, Imbabura and Zamora Chinchipe are arabica. Napo and Orellana are Amazon robusta.",
        "https://www.geoboundaries.org/api/current/gbOpen/ECU/ADM0/",
    )


def vietnam():
    adm0 = load("VNM_ADM0.json")
    adm1 = by_name(load("VNM_ADM1.json")["features"])
    rows = [
        ("daklak", "Đắk Lắk", 1, ["Đắk Lắk"], "robusta"),
        ("lamdong", "Lâm Đồng", 2, ["Lâm Đồng"], "arabica"),
        ("gialai", "Gia Lai", 3, ["Gia Lai"], "robusta"),
        ("daknong", "Đắk Nông", 4, ["Đắk Nông"], "robusta"),
        ("kontum", "Kon Tum", 5, ["Kon Tum"], "robusta"),
        ("sonla", "Sơn La", 6, ["Sơn La"], "arabica"),
        ("quangtri", "Quảng Trị", 7, ["Quảng Trị"], "arabica"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.02)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "vietnam",
        country_feat(adm0, "vietnam", "Vietnam", 0.04),
        regions,
        "Province polygons (geoBoundaries VNM ADM1). Central Highlands robusta is Đắk Lắk, Gia Lai, Đắk Nông and Kon Tum. Lâm Đồng is mapped as arabica (Cầu Đất / Đà Lạt) even though robusta is grown there too. Sơn La and Quảng Trị (Khe Sanh) are the northern and central arabica pockets.",
        "https://www.geoboundaries.org/api/current/gbOpen/VNM/ADM0/",
    )


def uganda():
    adm0 = load("UGA_ADM0.json")
    adm1 = by_name(load("UGA_ADM1.json")["features"])
    adm2 = by_name(load("UGA_ADM2.json")["features"])
    regions = [
        feat(
            pick(adm2, ["Bungokho", "Budadiri", "Bulambuli", "Manjiya", "Tingey", "Kongasis", "Kween"]),
            "elgon",
            "Mount Elgon / Bugisu",
            1,
            "arabica",
            0.015,
        ),
        feat(
            pick(adm2, ["Busongora", "Bukonjo", "Burahya", "Bunyangabu", "Ntoroko"]),
            "rwenzori",
            "Rwenzori",
            2,
            "arabica",
            0.015,
        ),
        feat(pick(adm2, ["Okoro"]), "westnile", "West Nile", 3, "arabica", 0.015),
        feat(pick(adm1, ["Central Region"]), "central", "Central", 4, "robusta", 0.025),
    ]
    write_collection(
        "uganda",
        country_feat(adm0, "uganda", "Uganda", 0.03),
        regions,
        "Elgon and Rwenzori are ADM2 unions of older counties (geoBoundaries UGA ADM2). West Nile is Okoro. Central robusta is the whole Central Region; farms are not the whole polygon. Robusta is most of the kilos.",
        "https://www.geoboundaries.org/api/current/gbOpen/UGA/ADM0/",
    )


def mexico():
    adm0 = load("MEX_ADM0.json")
    adm1 = by_name(load("MEX_ADM1.json")["features"])
    rows = [
        ("chiapas", "Chiapas", 1, ["Chiapas"], "arabica"),
        ("veracruz", "Veracruz", 2, ["Veracruz de Ignacio de la Llave"], "arabica"),
        ("oaxaca", "Oaxaca", 3, ["Oaxaca"], "arabica"),
        ("puebla", "Puebla", 4, ["Puebla"], "arabica"),
        ("guerrero", "Guerrero", 5, ["Guerrero"], "arabica"),
        ("hidalgo", "Hidalgo", 6, ["Hidalgo"], "arabica"),
    ]
    regions = [
        feat(pick(adm1, names), rid, name, num, species, 0.03)
        for rid, name, num, names, species in rows
    ]
    write_collection(
        "mexico",
        country_feat(adm0, "mexico", "Mexico", 0.06),
        regions,
        "State polygons (geoBoundaries MEX ADM1). Chiapas is the volume. Veracruz, Oaxaca, Puebla, Guerrero and Hidalgo are the other named belts. Farms sit in the south of those states, not the whole polygon. Arabica at commercial scale.",
        "https://www.geoboundaries.org/api/current/gbOpen/MEX/ADM0/",
    )


if __name__ == "__main__":
    brazil()
    papua_new_guinea()
    taiwan()
    guatemala()
    rwanda()
    burundi()
    ecuador()
    vietnam()
    uganda()
    mexico()
