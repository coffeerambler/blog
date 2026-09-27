import type { CountryGuide } from "@/data/country-guides/types";

export const papuaNewGuineaGuide: CountryGuide = {
  slug: "country-guide-papuanewguinea",
  path: "/country-guide-papuanewguinea",
  name: "Papua New Guinea",
  kicker: "World Coffee Guide",
  lede: "Almost all of the crop is arabica from the highlands. Eastern Highlands, Western Highlands, Simbu, Jiwaka. Typica and Bourbon, usually washed, and the good lots are sweet, with tropical fruit and a tea-like finish. A lot of cherry still walks to a mill on a road that is mud for half the year.",
  flag: {
    src: "/images/flags/papuanewguinea.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Port Moresby" },
    { label: "Coffee in Tok Pisin", value: "Kopi" },
    { label: "Population", value: "10.8 million (World Bank, 2025)" },
    { label: "Production", value: "48,000 tonnes / 800,000 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Typica, Bourbon, Arusha" },
    { label: "Typical cup", value: "Sweet, tropical fruit, tea-like; wilder when the mill is late" },
  ],
  mapPoints: [
    { id: "moresby", name: "Port Moresby", kind: "capital", coordinates: [147.1803, -9.4438], label: "left" },
    { id: "goroka", name: "Goroka", kind: "city", coordinates: [145.3869, -6.0834] },
    { id: "lae", name: "Lae", kind: "port", coordinates: [146.999, -6.733], label: "left" },
  ],
  regionsCaption:
    "Highland provinces. Coffee is almost all arabica. The country outline still includes the islands. Morobe includes the Markham as well as the highland edge.",
  regions: [
    { id: "easternhighlands", number: 1, name: "Eastern Highlands", species: "arabica", altitude: "1,400–2,100 m", season: "Apr–Sep", notes: "Goroka. A lot of the lots that show up on specialty menus." },
    { id: "westernhighlands", number: 2, name: "Western Highlands", species: "arabica", altitude: "1,400–2,000 m", season: "Apr–Sep", notes: "Mount Hagen. Bigger volume than Goroka some years." },
    { id: "simbu", number: 3, name: "Simbu", species: "arabica", altitude: "1,500–2,100 m", season: "Apr–Sep", notes: "Chimbu. Steep gardens, small lots." },
    { id: "jiwaka", number: 4, name: "Jiwaka", species: "arabica", altitude: "1,400–2,000 m", season: "Apr–Sep", notes: "Split from Western Highlands in 2012. Same belt." },
    { id: "morobe", number: 5, name: "Morobe", species: "arabica", altitude: "1,000–1,800 m", season: "May–Sep", notes: "Includes the Markham. Lower than Goroka. Lae is the export port." },
    { id: "enga", number: 6, name: "Enga", species: "arabica", altitude: "1,600–2,200 m", season: "May–Sep", notes: "High and remote. Less of it reaches the sample table." },
    { id: "southernhighlands", number: 7, name: "Southern Highlands", species: "arabica", altitude: "1,400–2,000 m", season: "May–Sep", notes: "Mendi and the southern slope. Small." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Washed coffee is the aim. Small wet mills, or a hand-crank pulper and a ferment tank, then parchment on tarpaulins or raised beds if the co-op has them. Rain in harvest is the usual problem. Cherry that waits too long before it is pulped starts to ferment on its own, and the cup goes wild. That is not a process with a name. It is what happens when the road to the mill is mud for half the year.

A lot of PNG on menus is still sold as a grade, A or X, more than as a farm. The better importers now name a mill or a district. [Typica](/archive/coffee-varieties-a-brief-look-at-significant-varieties) and Bourbon do most of the interesting work. Arusha turns up.

Robusta exists on the coast. It is not what people mean when they buy Papua New Guinea.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Missionaries and colonial planters put arabica in the highlands in the twentieth century. Smallholders took it over. The Coffee Industry Corporation still talks about the crop. The kilos have not grown with the reputation.

USDA has production around 800,000 bags for 2026/27. That is a bit under [Kenya](/country-guide-kenya). The cup can be as distinctive. The logistics are harder. Lae is the port that actually moves most of it. Port Moresby is the capital, not the coffee town.

Sigri and the old plantation names still appear on bags. Some of those estates are still running. A lot of the volume is village coffee that gets blended on the way to the ship.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Kopi is drunk, often instant or a dark roast with sugar. Goroka and Mount Hagen have mills and a harvest economy. They are not café cities in the Melbourne sense.

If you get a washed Eastern Highlands lot that was milled on time, it can be one of the sweeter cups in the Pacific. If the parchment sat in a store in the wet, you will taste that too. I would rather drink an honest mill coffee than a romanticised "wild PNG" that is just late cherry.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/papuanewguinea/png-03-bobiufa-picking-2.jpg",
      alt: "Picking coffee in Bobiufa, Eastern Highlands, 1991",
    },

    {
      src: "/images/country/papuanewguinea/png-01-raw-arabica.jpg",
      alt: "Export sack of Papua New Guinea raw arabica",
    },
  ],
};
