import type { CountryGuide } from "@/data/country-guides/types";
import { USDA_COFFEE_CIRCULAR_MD } from "@/lib/usda";

export const boliviaGuide: CountryGuide = {
  slug: "country-guide-bolivia",
  path: "/country-guide-bolivia",
  name: "Bolivia",
  kicker: "World Coffee Guide",
  lede: "Bolivian coffees are quietly lovely when the drying has gone well. Almost all of it grows high in the Yungas of La Paz, especially around Caranavi, and there is not very much of it. Washed Caturra and Catuai tend to be sweet, with stone fruit and chocolate, and a clean cup when the rain has not rushed the drying.",
  flag: {
    src: "/images/flags/bolivia.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Sucre (constitutional); La Paz (seat of government)" },
    { label: "Coffee in Spanish / Aymara", value: "Café / Kaphiy" },
    { label: "Population", value: "12.6 million (World Bank, 2025)" },
    { label: "Production", value: "About 5,000 tonnes / 85,000 60-kg bags (USDA PSD, 2024)" },
    { label: "Main varieties", value: "Caturra, Catuai, Typica" },
    { label: "Typical cup", value: "Sweet, stone fruit and chocolate; clean when the drying is careful" },
  ],
  mapPoints: [
    { id: "lapaz", name: "La Paz", kind: "capital", coordinates: [-68.1336, -16.4955], label: "left" },
    { id: "caranavi", name: "Caranavi", kind: "city", coordinates: [-67.3921, -15.6946] },
  ],
  regionsCaption:
    "Caranavi is where most of the coffee actually grows. The other Yungas, Nor, Sud and Inquisivi, sit beside it. Cochabamba and Santa Cruz are drawn as whole departments, but the farms are on the Andean edge rather than across the lowlands. Los Cintis is Nor and Sur Cinti in Tarija. It is arabica only.",
  regions: [
    { id: "caranavi", number: 1, name: "Caranavi", species: "arabica", altitude: "1,400–2,000 m", season: "Apr–Sep", notes: "La Paz Yungas. Roughly four fifths of the national crop." },
    { id: "yungas", number: 2, name: "Other Yungas", species: "arabica", altitude: "1,400–2,300 m", season: "Apr–Sep", notes: "Nor Yungas, Sud Yungas and Inquisivi, including La Asunta." },
    { id: "cochabamba", number: 3, name: "Cochabamba", species: "arabica", altitude: "1,200–2,000 m", season: "May–Sep", notes: "Chapare and the mountain edge. The map shows the whole department." },
    { id: "santacruz", number: 4, name: "Santa Cruz", species: "arabica", altitude: "800–1,600 m", season: "May–Sep", notes: "Lower and warmer. Specialty lots exist, though they are not the main story." },
    { id: "cintis", number: 5, name: "Los Cintis / Tarija", species: "arabica", altitude: "1,500–2,200 m", season: "Jun–Sep", notes: "Nor and Sur Cinti. High, dry and small." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most Bolivian coffee is [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean). Cherry is pulped at small wet mills, fermented, and then dried on raised beds where a farm can afford them, or on patios where it cannot. Harvest in the Yungas comes with rain, which is the usual problem. If the drying is rushed the cup goes woody, and a lot that looked sweet on the tree never quite makes it into the bag.

Honey and [natural](/archive/the-dry-process-an-introduction-to-natural-coffees) lots do turn up in specialty sample tables, in the same way they do elsewhere in the Andes. There are just fewer of them. When they are dried carefully they can be fuller and fruitier than the washed coffees, but the reputation of the origin was built on a clean wash.

Most farms are tiny, a few hectares, and a lot of them are certified organic because they never used much fertiliser in the first place. [Caturra and Catuai](/archive/coffee-varieties-a-brief-look-at-significant-varieties) took over from Typica because they yield more on a small plot. You still find Typica in older gardens, and those trees can be the sweetest of the lot when someone is willing to pick them slowly.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Bolivia does not have a famous export grade that specialty drinkers learn the way they learn Supremo or SHB. There is no national screen size that means the coffee is the good one. Most of what reaches a roaster is sold by where it grew, Caranavi or the wider Yungas, often with an organic certificate and a cup score.

That is not a complaint. The lots are small, and a score plus a mill name tells you more than a grade invented for a container would. The altitude is already high almost everywhere that matters here, so a hard-bean label would not sort the coffee the way it does in [Costa Rica](/country-guide-costarica). If you are buying, read the region and how it was dried first.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee arrived with the missions and stayed a hillside crop in the Yungas. It never became the national cash crop that it was in [El Salvador](/country-guide-elsalvador) or [Colombia](/country-guide-colombia). Coca, mining and soya have paid more of the country's bills, and coffee has remained something grown on steep plots above the towns rather than a crop that organises the whole economy.

USDA does not give Bolivia its own line in ${USDA_COFFEE_CIRCULAR_MD}. The PSD series (via IndexMundi) has arabica around 85,000 bags in 2024. CONCAFE, the national coffee council, talks nearer 100,000. Either figure is tiny next to Peru, which is why a good Bolivian lot can still feel like a secret.

The road is part of the story too. Blockades still happen in harvest. When the road down from La Paz is closed, cherry cannot get to a mill in time, and the quality that was on the tree does not make it into the bag. A small origin is fragile in a way a big one is not. One closed road can be the difference between a sweet lot and a woody one.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Mate de coca is the more common cup on a La Paz morning. Coffee is drunk too, often dark and sweet, and it is hospitality in the same way it is in a lot of producing countries. The better Caranavi lots still leave for export, because that is who pays. That does not mean there is nothing good to drink if you are there.

There are specialty bars in La Paz and Santa Cruz now, and they will talk about Caranavi properly, which is a nice change from a menu that just says Bolivia. At home it is still a stove-top pot and sugar, and there is nothing wrong with that.

If you go, go in harvest, and give yourself time for the road down from La Paz into the Yungas. It is a long drive, and it is the best way to see why so little of this coffee makes it out looking as good as it tasted on the tree.`,
    },
  ],
  gallery: [],
};
