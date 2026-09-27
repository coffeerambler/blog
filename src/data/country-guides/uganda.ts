import type { CountryGuide } from "@/data/country-guides/types";

export const ugandaGuide: CountryGuide = {
  slug: "country-guide-uganda",
  path: "/country-guide-uganda",
  name: "Uganda",
  kicker: "World Coffee Guide",
  lede: "Robusta is native here, and it is still most of the kilos. The arabica people talk about is Bugisu on Mount Elgon, and a smaller pile on the Rwenzori. Washed Elgon can be floral and citrus. The robusta is the crop that actually pays, and USDA now puts Uganda among the bigger origins on earth.",
  flag: {
    src: "/images/flags/uganda.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Kampala" },
    { label: "Coffee in Luganda", value: "Kaawa" },
    { label: "Population", value: "51.4 million (World Bank, 2025)" },
    { label: "Production", value: "430,000 tonnes / 7.16 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Robusta (native); arabica SL14, Nyasaland, Bugisu types" },
    { label: "Typical cup", value: "Elgon: floral, citrus, tea. Robusta: heavy, cocoa, the blend coffee" },
  ],
  mapPoints: [
    { id: "kampala", name: "Kampala", kind: "capital", coordinates: [32.5825, 0.3476] },
    { id: "mbale", name: "Mbale", kind: "city", coordinates: [34.175, 1.078] },
  ],
  legendArabica: "Arabica (Elgon, Rwenzori, West Nile)",
  legendRobusta: "Robusta (Central Region)",
  regionsCaption:
    "Elgon and Rwenzori are older-county unions. West Nile is Okoro. Central robusta is the whole Central Region; farms are not the whole polygon. Uganda is landlocked.",
  regions: [
    { id: "elgon", number: 1, name: "Mount Elgon / Bugisu", species: "arabica", altitude: "1,500–2,200 m", season: "Oct–Feb", notes: "Mbale, Sironko, Kapchorwa, Bududa. The washed arabica name." },
    { id: "rwenzori", number: 2, name: "Rwenzori", species: "arabica", altitude: "1,400–2,200 m", season: "Sep–Jan", notes: "Kasese side. Smaller than Bugisu on menus." },
    { id: "westnile", number: 3, name: "West Nile", species: "arabica", altitude: "1,200–1,800 m", season: "Oct–Feb", notes: "Okoro / Zombo. A pocket, not the national crop." },
    { id: "central", number: 4, name: "Central", species: "robusta", altitude: "1,000–1,400 m", season: "Oct–Feb", notes: "Native robusta. Most of the kilos. Mapped as the whole region." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Bugisu arabica is usually washed at a mill and sold as a grade. The better lots now come with a co-op or a hillside name. Natural robusta is the old default for the south and centre: cherry dried, hulled, shipped. Washed robusta exists. It is still not what most of the volume is.

[SL14](/archive/coffee-varieties-a-brief-look-at-significant-varieties) and Nyasaland show up on Elgon. Robusta here is not an import. It is Ugandan.

USDA has 7.16 million bags for 2026/27. That is in the same conversation as India, and well above [Kenya](/country-guide-kenya). Most of it is robusta.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Arabica on Elgon is a colonial planting. Robusta was already in the lakeshore forests. The Uganda Coffee Development Authority still sits over the trade. Production has climbed as trees were replanted and as robusta prices jumped.

Kampala is the capital. Mbale is the Elgon town. There is no seaport. Export goes out through Mombasa, same problem as Rwanda, with more kilos behind it.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Kaawa is drunk, often milky and sweet, or as a strong black café coffee in Kampala. Instant is still everywhere. Specialty bars in the capital will talk about Bugisu. A lot of Ugandans still drink tea.

If you want the origin, drink a washed Elgon next to a decent washed robusta. They are from the same country and they are not the same drink. The robusta is the one the numbers are about.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/uganda/uganda-02-beans.jpg",
      alt: "Green and roasted coffee in a basket",
    },

    {
      src: "/images/country/uganda/uganda-03-roast.jpg",
      alt: "Adding coffee to a roasting machine in Uganda",
    },
  ],
};
