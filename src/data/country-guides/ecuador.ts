import type { CountryGuide } from "@/data/country-guides/types";

export const ecuadorGuide: CountryGuide = {
  slug: "country-guide-ecuador",
  path: "/country-guide-ecuador",
  name: "Ecuador",
  kicker: "World Coffee Guide",
  lede: "High-grown Ecuadorian coffee can be delicate and floral, with citrus and a sweetness that surprises people who have never ordered it. It is a small origin, mostly arabica from the Andes, with Loja in the south the best-known region, and there is also robusta grown in the Amazon.",
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
    "The map shows the main coffee provinces, with the Galápagos left off so the mainland fits. Loja is the arabica region most people know, while Napo and Orellana grow robusta in the Amazon.",
  regions: [
    { id: "loja", number: 1, name: "Loja", species: "arabica", altitude: "1,200–2,000 m", season: "Jun–Sep", notes: "The far south, and where most of the specialty coffee comes from." },
    { id: "elor", number: 2, name: "El Oro / Zaruma", species: "arabica", altitude: "1,000–1,800 m", season: "Jun–Sep", notes: "Old gold-mining hills around Zaruma that also grow coffee." },
    { id: "pichincha", number: 3, name: "Pichincha", species: "arabica", altitude: "1,200–1,800 m", season: "Jun–Oct", notes: "The western slopes near Quito, around Nanegalito." },
    { id: "imbabura", number: 4, name: "Imbabura / Intag", species: "arabica", altitude: "1,200–1,800 m", season: "Jun–Oct", notes: "Small lots from the cloud forest of the Intag valley." },
    { id: "zamora", number: 5, name: "Zamora Chinchipe", species: "arabica", altitude: "1,200–1,900 m", season: "Jun–Sep", notes: "East of Loja, over the Andean divide." },
    { id: "napo", number: 6, name: "Napo", species: "robusta", altitude: "Low–600 m", season: "Apr–Aug", notes: "Amazon robusta, mostly for the domestic and instant market." },
    { id: "orellana", number: 7, name: "Orellana", species: "robusta", altitude: "Low–500 m", season: "Apr–Aug", notes: "More Amazon robusta, alongside Napo." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most of the arabica from Loja and the rest of the Andes is [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean). Farms are small, so the coffee is often pulped and fermented on the farm itself and dried on patios or raised beds. Honey and [natural](/archive/the-dry-process-an-introduction-to-natural-coffees) lots are becoming more common in specialty, especially from farms that compete for higher prices.

Typica and Caturra are still what most farmers grow. Sidra is the variety you will see on more expensive menus. It was long thought to be a cross between Typica and Bourbon, but genetic testing has shown it is actually related to Ethiopian landrace coffees. It can taste wonderfully floral, but it is still a small part of the harvest.

The robusta grown in Napo and Orellana is a different drink, mostly used at home and in instant coffee. Ecuador also imports robusta for its instant coffee factories. USDA's figure of 350,000 bags for 2026/27 covers both species, which is tiny next to [Colombia](/country-guide-colombia).`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Ecuador does not have a well-known export grade in the way that Colombia has Supremo or Guatemala has SHB. Specialty coffee is usually sold by region, farm and cup score, and Loja is the name that carries the most weight.

Taza Dorada, the national cup competition, has done a lot to make this happen. Winning lots are sold at auction and often come from small farms in Loja and Zamora Chinchipe, so for a buyer the score and the farm name are what really matter.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee was grown in Ecuador from the nineteenth century, but it never became the national crop in the way that cocoa, bananas and later oil did. Production was much larger in the 1980s than it is today, and then fell a long way as prices dropped and farmers moved to other crops.

Since then, specialty buyers have found Loja and the other highland regions, and quality has been climbing. Figures from Ecuador's own coffee bodies do not always match USDA's, but I use USDA here to keep the numbers comparable with the other guides.

Guayaquil is the main port. Quito is the capital and has a good café scene, but the farms are mostly to the south and west of the city.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Café pasado, a strong coffee concentrate that is diluted with hot water or milk, is the traditional cup, though instant and sweet dark roasts are what most people drink day to day. Quito has specialty cafés now, and they are proud to serve Loja coffee, though a lot of what the country drinks is still imported, which is a strange thing in a producing country.

If you travel to Loja during the harvest you will see how small the farms are and how much work goes into every lot. It will never be a large origin, but it is one well worth ordering.`,
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
