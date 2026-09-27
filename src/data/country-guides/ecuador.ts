import type { CountryGuide } from "@/data/country-guides/types";

export const ecuadorGuide: CountryGuide = {
  slug: "country-guide-ecuador",
  path: "/country-guide-ecuador",
  name: "Ecuador",
  kicker: "World Coffee Guide",
  lede: "A small Andean arabica origin that people still under-order. Loja, Zaruma, Pichincha, Intag. High-grown lots can be floral and citrus. There is robusta in the Amazon as well. Sidra is an Ecuadorian variety you will see on more expensive menus; Typica and Caturra still fill most of the bags.",
  flag: {
    src: "/images/flags/ecuador.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Quito" },
    { label: "Coffee in Spanish", value: "Café" },
    { label: "Population", value: "18.3 million (World Bank, 2025)" },
    { label: "Production", value: "21,000 tonnes / 350,000 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Typica, Caturra, Sidra, Bourbon; robusta in the Amazon" },
    { label: "Typical cup", value: "Floral and citrus at height; chocolate on lower washed lots" },
  ],
  mapPoints: [
    { id: "quito", name: "Quito", kind: "capital", coordinates: [-78.4678, -0.1807] },
    { id: "loja", name: "Loja", kind: "city", coordinates: [-79.2023, -3.9931], label: "left" },
    { id: "guayaquil", name: "Guayaquil", kind: "port", coordinates: [-79.8881, -2.1894], label: "left" },
  ],
  legendArabica: "Arabica (Loja, El Oro, Pichincha, Imbabura, Zamora)",
  legendRobusta: "Robusta (Napo, Orellana)",
  regionsCaption:
    "Province polygons. Galápagos is dropped from the country outline so the mainland fits. Loja is the arabica name people know. Napo and Orellana are Amazon robusta.",
  regions: [
    { id: "loja", number: 1, name: "Loja", species: "arabica", altitude: "1,200–2,000 m", season: "Jun–Sep", notes: "South. The specialty volume, when there is any." },
    { id: "elor", number: 2, name: "El Oro / Zaruma", species: "arabica", altitude: "1,000–1,800 m", season: "Jun–Sep", notes: "Zaruma. Gold-mining hills that also grow coffee." },
    { id: "pichincha", number: 3, name: "Pichincha", species: "arabica", altitude: "1,200–1,800 m", season: "Jun–Oct", notes: "Around Quito. Nanegalito and the western slope." },
    { id: "imbabura", number: 4, name: "Imbabura / Intag", species: "arabica", altitude: "1,200–1,800 m", season: "Jun–Oct", notes: "Intag valley. Cloud forest, small lots." },
    { id: "zamora", number: 5, name: "Zamora Chinchipe", species: "arabica", altitude: "1,200–1,900 m", season: "Jun–Sep", notes: "East of Loja, over the divide." },
    { id: "napo", number: 6, name: "Napo", species: "robusta", altitude: "Low–600 m", season: "Apr–Aug", notes: "Amazon robusta. Volume, not a menu name." },
    { id: "orellana", number: 7, name: "Orellana", species: "robusta", altitude: "Low–500 m", season: "Apr–Aug", notes: "Amazon robusta, with Napo." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Washed arabica is the default in Loja and the sierra. Small mills, patio or raised-bed drying. Honey and [natural](/archive/the-dry-process-an-introduction-to-natural-coffees) lots show up in the specialty sample tables.

Sidra is an Ecuadorian variety, a Typica/Bourbon family tree depending on who you ask, that can cup floral and expensive. It is not the national crop. Typica and Caturra still fill most of the bags.

Robusta in Napo and Orellana is a different drink. USDA's 350,000 bags for 2026/27 is the whole country, arabica and robusta together. It is small next to [Colombia](/country-guide-colombia).`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee was never the national story that bananas and oil were. It stayed a hillside crop, then shrank, then specialty buyers found Loja. Fine Cacao and Coffee Association of Ecuador (ACE) and the ministry numbers do not always match USDA. I am using USDA here, same as the other pages.

Guayaquil is the port. Quito is the capital and a café city. The farms are south and west of that, not in the middle of town.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Café pasado, instant, and a sweet dark roast are still the everyday cups. Quito has specialty bars, and they will talk about Loja. A lot of what they pour is still imported, which is an odd feeling in a producing country.

If you go, go to Loja in harvest. The altitude is real, and so is the smallness of the lots. The kilos will never look like Brazil's, and that is not a complaint so much as the size of the origin.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/ecuador/ecuador-02-vilcabamba-trees.jpg",
      alt: "Coffee in cherry in Vilcabamba, Loja",
    },

    {
      src: "/images/country/ecuador/ecuador-01-vilcabamba.jpg",
      alt: "Path through a Vilcabamba coffee garden",
    },
    {
      src: "/images/country/ecuador/ecuador-04-vilcabamba-1451.jpg",
      alt: "Staked coffee plot in Vilcabamba",
    },
    {
      src: "/images/country/ecuador/ecuador-05-vilcabamba-1461.jpg",
      alt: "Ripe and green cherries on one branch, Vilcabamba",
    },
  ],
};
