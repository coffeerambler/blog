import type { CountryGuide } from "@/data/country-guides/types";

export const papuaNewGuineaGuide: CountryGuide = {
  slug: "country-guide-papuanewguinea",
  path: "/country-guide-papuanewguinea",
  name: "Papua New Guinea",
  kicker: "World Coffee Guide",
  lede: "A good Papua New Guinea coffee is sweet and gentle, with tropical fruit and a tea-like finish. Almost all of it is arabica grown in the highlands, mostly Typica and Bourbon, and much of it is still picked in small village gardens and carried to the mill along roads that turn to mud in the rain.",
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
    "The map shows the highland provinces where nearly all the coffee grows, and almost all of it is arabica. The outline of the country still includes the islands, and Morobe includes the lower Markham valley as well as the edge of the highlands.",
  regions: [
    { id: "easternhighlands", number: 1, name: "Eastern Highlands", species: "arabica", altitude: "1,400–2,100 m", season: "May–Aug", notes: "Around Goroka, where many of the lots on specialty menus come from." },
    { id: "westernhighlands", number: 2, name: "Western Highlands", species: "arabica", altitude: "1,400–2,000 m", season: "May–Aug", notes: "Around Mount Hagen, which some years grows more than Goroka." },
    { id: "simbu", number: 3, name: "Simbu", species: "arabica", altitude: "1,500–2,100 m", season: "May–Aug", notes: "Also called Chimbu, with steep gardens and small lots." },
    { id: "jiwaka", number: 4, name: "Jiwaka", species: "arabica", altitude: "1,400–2,000 m", season: "May–Aug", notes: "Split from the Western Highlands in 2012, in the same coffee belt." },
    { id: "morobe", number: 5, name: "Morobe", species: "arabica", altitude: "1,000–1,800 m", season: "May–Aug", notes: "Lower than Goroka, and home to Lae, the main export port." },
    { id: "enga", number: 6, name: "Enga", species: "arabica", altitude: "1,600–2,200 m", season: "May–Aug", notes: "High and remote, so less of its coffee reaches buyers." },
    { id: "southernhighlands", number: 7, name: "Southern Highlands", species: "arabica", altitude: "1,400–2,000 m", season: "May–Aug", notes: "A small amount of coffee around Mendi." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most Papua New Guinea coffee is [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean). Larger estates and co-ops have wet mills, but many village farmers pulp their own cherry with a hand-cranked pulper, ferment it in a tank or a bucket, and dry the parchment on tarpaulins or raised beds before selling it on.

Rain during the harvest is the usual problem. When cherry waits too long before it is pulped, or parchment sits damp in a store, it starts to ferment on its own and the cup turns wild and boozy. That is not a deliberate process, just the result of long, muddy roads between the gardens and the mill.

[Typica](/archive/coffee-varieties-a-brief-look-at-significant-varieties) and Bourbon do most of the interesting work, and Arusha turns up as well. A little robusta grows near the coast, but it is not what people mean when they buy Papua New Guinea coffee.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Papua New Guinea coffee is graded by where it comes from as well as by bean size and defects. Plantation and estate coffee is sorted into grades such as AA, A and X, with A the most common good export grade and X a lower, mixed grade.

Smallholder coffee that has been processed and sorted to a high standard is sold as PSC, Premium Smallholder Coffee, and lower smallholder grades are sold under a Y grade. A lot of what you see on menus is still sold as A or PSC rather than by farm, though the better importers now name the mill or the district as well.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Missionaries and colonial planters brought arabica to Papua New Guinea in the early twentieth century, and after the Second World War, plantations were set up in the highlands around Goroka and Mount Hagen. From the 1960s smallholders began planting coffee in their own gardens, and today they grow most of the crop.

Some of the old estate names, such as Sigri, are still running and still appear on bags. Much of the rest is village coffee, bought from many small growers and blended on the way to the ship. The Coffee Industry Corporation oversees the trade.

USDA puts production at around 800,000 bags for 2026/27, a little under [Kenya](/country-guide-kenya). The coffee can be just as distinctive, but getting it out of the highlands is much harder. Lae is the port that ships most of it, while Port Moresby, the capital, is a long way from the coffee.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Kopi is often drunk as instant, or as a dark roast with plenty of sugar. Goroka and Mount Hagen are busy coffee towns during the harvest, with mills and buyers everywhere, but they are not café cities, and a lot of the best coffee leaves the country.

A washed Eastern Highlands lot that has been milled on time can be one of the sweetest coffees in the Pacific. If the parchment was left sitting in the wet, you will taste that too. I would much rather drink an honest, clean mill coffee than one sold as "wild PNG" that is really just cherry that waited too long.`,
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
