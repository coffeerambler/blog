import type { CountryGuide } from "@/data/country-guides/types";
import { USDA_COFFEE_CIRCULAR_MD } from "@/lib/usda";

export const boliviaGuide: CountryGuide = {
  slug: "country-guide-bolivia",
  path: "/country-guide-bolivia",
  name: "Bolivia",
  kicker: "World Coffee Guide",
  lede: "Almost all Bolivian coffee sits in the Yungas of La Paz, especially Caranavi. It is high-grown, often organic, and there is not much of it. Caturra and Catuai, usually washed. The good lots are sweet, with stone fruit and chocolate.",
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
    "Caranavi is the volume. Other Yungas (Nor, Sud, Inquisivi) sit next to it. Cochabamba and Santa Cruz are whole departments; the farms are on the Andean edge. Los Cintis is Nor and Sur Cinti in Tarija. Arabica only.",
  regions: [
    { id: "caranavi", number: 1, name: "Caranavi", species: "arabica", altitude: "1,400–2,000 m", season: "Apr–Sep", notes: "La Paz Yungas. Roughly four fifths of the national crop." },
    { id: "yungas", number: 2, name: "Other Yungas", species: "arabica", altitude: "1,400–2,300 m", season: "Apr–Sep", notes: "Nor Yungas, Sud Yungas, Inquisivi. Includes La Asunta." },
    { id: "cochabamba", number: 3, name: "Cochabamba", species: "arabica", altitude: "1,200–2,000 m", season: "May–Sep", notes: "Chapare and the mountain edge. Mapped as the whole department." },
    { id: "santacruz", number: 4, name: "Santa Cruz", species: "arabica", altitude: "800–1,600 m", season: "May–Sep", notes: "Lower and warmer. Specialty lots exist; they are not the main story." },
    { id: "cintis", number: 5, name: "Los Cintis / Tarija", species: "arabica", altitude: "1,500–2,200 m", season: "Jun–Sep", notes: "Nor and Sur Cinti. High, dry, small." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Washed coffee is the default. Small wet mills, raised beds where people can afford them, patios where they cannot. Rain in harvest is the usual problem. If the drying is rushed the cup goes woody.

Honey and [natural](/archive/the-dry-process-an-introduction-to-natural-coffees) lots show up in the specialty sample tables, in the same way they do elsewhere in the Andes. There are just fewer of them.

Most farms are tiny, a few hectares, and often certified organic because they never used much fertiliser in the first place. Caturra and Catuai took over from Typica. You still find Typica in older plots.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee arrived with the missions and stayed a hillside crop in the Yungas. It never became the national cash crop that it was in [El Salvador](/country-guide-elsalvador) or [Colombia](/country-guide-colombia). Coca, mining and soya paid more bills.

USDA does not give Bolivia its own line in ${USDA_COFFEE_CIRCULAR_MD}. The PSD series (via IndexMundi) has arabica around 85,000 bags in 2024. CONCAFE talks nearer 100,000. Either way it is tiny next to Peru.

Road blockades still happen in harvest. When the road down from La Paz is closed, cherry cannot get to a mill in time, and the quality that was on the tree does not make it into the bag.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Mate de coca is the more common cup on a La Paz morning. Coffee is drunk, often dark and sweet, and the better Caranavi lots still leave for export.

There are specialty bars in La Paz and Santa Cruz now, and they will talk about Caranavi properly. At home it is still a stove-top and sugar.

If you go, go in harvest, and give yourself time for the road down from La Paz into the Yungas. It is a long drive.`,
    },
  ],
  gallery: [],
};
