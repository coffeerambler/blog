import type { CountryGuide } from "@/data/country-guides/types";

export const mexicoGuide: CountryGuide = {
  slug: "country-guide-mexico",
  path: "/country-guide-mexico",
  name: "Mexico",
  kicker: "World Coffee Guide",
  lede: "Chiapas grows most of it. Veracruz, Oaxaca, Puebla, a little Guerrero and Hidalgo. Washed arabica, often shade-grown, often organic because the hills never saw much fertiliser. The everyday cup is mild chocolate. The better lots, usually higher, can be brighter than the reputation.",
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
    "State polygons. Chiapas is the volume. Farms sit in the south of those states, not the whole polygon. Arabica at commercial scale.",
  regions: [
    { id: "chiapas", number: 1, name: "Chiapas", species: "arabica", altitude: "900–1,700 m", season: "Nov–Mar", notes: "Soconusco and the highlands. Most of the national crop." },
    { id: "veracruz", number: 2, name: "Veracruz", species: "arabica", altitude: "1,000–1,600 m", season: "Nov–Mar", notes: "Coatepec, Huatusco, Córdoba. An older named belt." },
    { id: "oaxaca", number: 3, name: "Oaxaca", species: "arabica", altitude: "1,000–1,700 m", season: "Dec–Mar", notes: "Pluma and the southern hills. Smallholder, often organic." },
    { id: "puebla", number: 4, name: "Puebla", species: "arabica", altitude: "1,000–1,500 m", season: "Nov–Mar", notes: "Sierra Norte. Smaller than Chiapas, still real." },
    { id: "guerrero", number: 5, name: "Guerrero", species: "arabica", altitude: "900–1,500 m", season: "Dec–Mar", notes: "The Costa and the highlands. Less on specialty menus." },
    { id: "hidalgo", number: 6, name: "Hidalgo", species: "arabica", altitude: "1,000–1,500 m", season: "Nov–Mar", notes: "Huehuetla and the east. A pocket." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Washed coffee is the default. Small wet mills, patios, some raised beds. Honey and natural lots exist in the specialty sample tables, in the same way they do in [Guatemala](/country-guide-guatemala).

Leaf rust hit hard in the 2010s. Catimors and Marsellesa went into the ground because they survived. Typica and Bourbon are still there on higher plots. [Variety](/archive/coffee-varieties-a-brief-look-at-significant-varieties) on a Mexican bag is often a mix.

USDA has 4.14 million bags for 2026/27. That is a real origin, not a rounding error, and still smaller than Honduras.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee came in through Veracruz and the Soconusco. Large fincas, then land reform, then a lot of smallholders in Chiapas and Oaxaca. AMECAFE and the institutes have come and gone. The hills kept growing coffee.

Veracruz is the historic port. Tapachula is the Chiapas coffee town, near the Guatemala border. Mexico City drinks a lot of it and imports as well.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Café de olla is the folkloric cup: clay pot, piloncillo, cinnamon. Instant and a dark espresso are the weekday cups. Mexico City has a proper specialty scene now, and it will talk about Oaxaca and Chiapas without pretending they are Ethiopia.

I have had washed Pluma lots that were sweeter than the mild-Mexico reputation. I have also had a lot of chocolate-nut coffee that did its job in a blend and did not need a story. Both are Mexico.`,
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
