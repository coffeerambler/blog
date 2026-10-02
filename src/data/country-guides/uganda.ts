import type { CountryGuide } from "@/data/country-guides/types";

export const ugandaGuide: CountryGuide = {
  slug: "country-guide-uganda",
  path: "/country-guide-uganda",
  name: "Uganda",
  kicker: "World Coffee Guide",
  lede: "Washed arabica from Mount Elgon can be floral and citrusy, with a sweetness that is easy to like, while Ugandan robusta is heavy and chocolatey and turns up in a lot of espresso blends. Robusta is native to Uganda and makes up most of the harvest, and USDA now counts Uganda among the larger coffee producers in the world.",
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
    "Mount Elgon and the Rwenzori are shown by the districts around each mountain, and West Nile by Okoro. The robusta is shown across the whole Central Region, though the farms only cover part of it. Uganda is landlocked, so there is no port on the map.",
  regions: [
    { id: "elgon", number: 1, name: "Mount Elgon / Bugisu", species: "arabica", altitude: "1,500–2,200 m", season: "Oct–Feb", notes: "Mbale, Sironko, Kapchorwa and Bududa, where Uganda's washed arabica comes from." },
    { id: "rwenzori", number: 2, name: "Rwenzori", species: "arabica", altitude: "1,400–2,200 m", season: "Oct–Jan", notes: "The Kasese side of the mountains, seen less often than Bugisu." },
    { id: "westnile", number: 3, name: "West Nile", species: "arabica", altitude: "1,200–1,800 m", season: "Oct–Feb", notes: "A small arabica area in Okoro and Zombo." },
    { id: "central", number: 4, name: "Central", species: "robusta", altitude: "1,000–1,400 m", season: "Oct–Feb", notes: "Native robusta, which makes up most of the national harvest." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Bugisu arabica from Mount Elgon is usually [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean) at a mill, and the better lots are now sold with the name of a co-operative or a hillside rather than just a grade. Some Elgon coffee is also sold as a natural, which gives a fruitier, heavier cup.

Most Ugandan robusta is [natural](/archive/the-dry-process-an-introduction-to-natural-coffees). The cherry is dried whole, then hulled and sold, much as it has been for generations. Washed robusta and carefully picked fine robusta lots are becoming more common, and they can be surprisingly clean and sweet, but they are still a small part of the harvest.

[SL14](/archive/coffee-varieties-a-brief-look-at-significant-varieties) and Nyasaland, an old Typica-type variety, are common on Elgon. Robusta, though, is not an import here. It grows wild in Uganda's forests, and the country is one of the places it comes from.

USDA has 7.16 million bags for 2026/27, putting Uganda in the same league as India and well ahead of [Kenya](/country-guide-kenya). Most of that is robusta.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Ugandan coffee is graded by screen size and by process. Washed arabica, mostly Bugisu, is graded in a similar way to [Kenya](/country-guide-kenya):

AA — the largest beans

A — slightly smaller beans

B — smaller beans again

PB — peaberries

Natural arabica is sold as Drugar, short for dry Ugandan arabica, which is a heavier and more rustic cup than washed Bugisu. Robusta is graded by screen, with Screen 18 the largest bean, followed by Screen 15 and Screen 12.

As with other origins, the grade tells you about the size of the bean rather than how it tastes, so for specialty coffee the cup score and the name of the co-op or washing station matter more.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Robusta grew wild in the forests around Lake Victoria long before anyone farmed it, and it is still grown by smallholders across the centre and south of the country. Arabica came later, planted on the slopes of Mount Elgon in the early twentieth century, and the Bugisu people living there took it up as their own crop.

For decades the trade was run by a state marketing board, until it was liberalised in the early 1990s. The Uganda Coffee Development Authority then oversaw the industry for over thirty years, until it was dissolved at the end of 2024 and its work was handed to the Ministry of Agriculture, Animal Industry and Fisheries.

Production has climbed steadily as old trees have been replaced and as high robusta prices have encouraged farmers to plant more, and Uganda is now one of the biggest coffee exporters in Africa. Kampala is the capital and Mbale is the main town on Elgon. As Uganda is landlocked, the coffee travels by road and rail to Mombasa before it is shipped, as Rwanda's does.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Tea is still more popular than coffee in a lot of Ugandan homes, and when coffee is drunk it is often instant, or milky and sweet. Kampala has a growing number of specialty cafés though, and they are proud to serve Bugisu arabica alongside good local robusta.

If you want to get to know the origin, try a washed Elgon next to a washed robusta. They are from the same country but they are very different drinks, and it is a good way to see why robusta deserves more credit than it gets.`,
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
