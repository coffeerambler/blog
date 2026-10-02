import type { CountryGuide } from "@/data/country-guides/types";

export const mexicoGuide: CountryGuide = {
  slug: "country-guide-mexico",
  path: "/country-guide-mexico",
  name: "Mexico",
  kicker: "World Coffee Guide",
  lede: "Mexican coffee is usually mild and easy to drink, with chocolate and nut flavours, though the higher-grown lots can be much brighter than the country's reputation suggests. Most of it is washed arabica from Chiapas, Veracruz and Oaxaca, often shade grown and very often organic.",
  flag: {
    src: "/images/flags/mexico.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Mexico City" },
    { label: "Coffee in Spanish", value: "Café" },
    { label: "Population", value: "131.9 million (World Bank, 2025)" },
    { label: "Production", value: "248,000 tonnes / 4.14 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Typica, Bourbon, Caturra, Mundo Novo, Marsellesa, Catimor" },
    { label: "Typical cup", value: "Chocolate, nut, mild acidity; higher lots are brighter, with citrus and stone fruit" },
  ],
  mapPoints: [
    { id: "mexicocity", name: "Mexico City", kind: "capital", coordinates: [-99.1332, 19.4326] },
    { id: "tapachula", name: "Tapachula", kind: "city", coordinates: [-92.2606, 14.9056] },
    { id: "veracruz", name: "Veracruz", kind: "port", coordinates: [-96.1342, 19.1738] },
  ],
  regionsCaption:
    "The map shows the main coffee-growing states, though the farms are in the mountains rather than across each whole state. Chiapas grows the most, and the coffee grown at any scale is arabica.",
  regions: [
    { id: "chiapas", number: 1, name: "Chiapas", species: "arabica", altitude: "900–1,700 m", season: "Nov–Mar", notes: "The Soconusco and the highlands, which grow most of the national crop." },
    { id: "veracruz", number: 2, name: "Veracruz", species: "arabica", altitude: "1,000–1,600 m", season: "Nov–Mar", notes: "Coatepec, Huatusco and Córdoba, one of the oldest coffee areas." },
    { id: "oaxaca", number: 3, name: "Oaxaca", species: "arabica", altitude: "1,000–1,700 m", season: "Dec–Mar", notes: "Pluma Hidalgo and the southern hills, mostly smallholders and often organic." },
    { id: "puebla", number: 4, name: "Puebla", species: "arabica", altitude: "1,000–1,500 m", season: "Nov–Mar", notes: "The Sierra Norte, around Xicotepec and Zihuateutla." },
    { id: "guerrero", number: 5, name: "Guerrero", species: "arabica", altitude: "900–1,500 m", season: "Dec–Mar", notes: "The coastal mountains, seen less often on specialty menus." },
    { id: "hidalgo", number: 6, name: "Hidalgo", species: "arabica", altitude: "1,000–1,500 m", season: "Nov–Mar", notes: "A small area in the east of the state, around Huehuetla." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most Mexican coffee is [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean), usually at small wet mills on or near the farm, and dried on patios or sometimes raised beds. Honey and natural lots are becoming more common in specialty, as they are in [Guatemala](/country-guide-guatemala) next door, but washed coffee is still what Mexico is known for.

Much of the coffee is grown under shade by smallholders who have never been able to afford much fertiliser, and Mexico is one of the largest producers of certified organic coffee in the world.

Leaf rust hit Mexico hard in the 2010s, and many farmers replanted with resistant varieties such as Marsellesa and Catimors because they survived. Typica and Bourbon are still grown on higher plots, and a bag of Mexican coffee is often a mix of [varieties](/archive/coffee-varieties-a-brief-look-at-significant-varieties) from many small farms.

USDA has 4.14 million bags for 2026/27, which makes Mexico a sizeable origin, though still a little smaller than Honduras.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Mexican coffee is graded by altitude, in a similar way to [Guatemala](/country-guide-guatemala) and [Costa Rica](/country-guide-costarica). The classifications are roughly as follows:

SHG, Strictly High Grown — grown above about 1,700 metres

HG, High Grown — grown between about 1,000 and 1,600 metres

Prime Washed — the lower-grown washed coffee

You may also see older names like Altura, meaning high-grown, on bags from Coatepec or Pluma. As always, the grade tells you where the coffee grew rather than how it tastes, and for specialty coffee the region, the farm or co-op and the cup score tell you more.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee arrived in Veracruz in the late eighteenth century and spread through the mountains of the south. In the late nineteenth century, German and other European planters set up large fincas in the Soconusco of Chiapas, near the Guatemalan border, and much of the work was done by indigenous labourers.

After the Mexican Revolution, land reform broke up many of the big estates, and coffee became a smallholder crop in Chiapas, Oaxaca and Veracruz. For decades the state coffee institute, INMECAFE, bought coffee and supported farmers, but it was wound down around 1990, just as world coffee prices collapsed. Many farmers formed co-operatives to sell their coffee themselves, which is part of why Mexico has so much organic and Fairtrade coffee today.

Veracruz is the historic coffee port, and Tapachula is the coffee town of Chiapas. Mexico City drinks a lot of Mexican coffee, but also imports coffee from abroad.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Café de olla is the traditional cup, brewed in a clay pot with piloncillo, an unrefined cane sugar, and cinnamon. Day to day, a lot of people drink instant or a dark espresso, but Mexico City now has a real specialty coffee scene, and its cafés serve coffee from Oaxaca, Chiapas and Veracruz with real pride.

I have had washed lots from Pluma Hidalgo that were far sweeter and brighter than the mild Mexican reputation would suggest. I have also had plenty of chocolate and nut coffees that were simply good in a blend, and there is nothing wrong with that.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/mexico/mexico-01-xicotepec-harvest.jpg",
      alt: "Farmer picking coffee in Xicotepec, Puebla",
    },

    {
      src: "/images/country/mexico/mexico-02-xicotepec-basket.jpg",
      alt: "Cherries poured between baskets in Xicotepec",
    },
    {
      src: "/images/country/mexico/mexico-04-shade.jpg",
      alt: "Shade-grown coffee on a Mexican hillside",
    },
    {
      src: "/images/country/mexico/mexico-05-zihuateutla.jpg",
      alt: "Coffee plants by a weir in Zihuateutla, Puebla",
    },
  ],
};
