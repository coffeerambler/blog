import type { CountryGuide } from "@/data/country-guides/types";

export const elSalvadorGuide: CountryGuide = {
  slug: "country-guide-elsalvador",
  path: "/country-guide-elsalvador",
  name: "El Salvador",
  kicker: "World Coffee Guide",
  lede: "Almost all arabica, and not a lot of it. Bourbon and Pacamara from the western volcanoes can be excellent when the mill is paying attention. Rust and people leaving the farms have cut the volume.",
  flag: {
    src: "/images/flags/el-salvador.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "San Salvador" },
    { label: "Coffee in Spanish", value: "Café" },
    { label: "Population", value: "6.4 million (World Bank, 2025)" },
    { label: "Production", value: "32,500 tonnes / 542,000 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Bourbon, Pacas, Pacamara, Catuai, Catimor" },
    { label: "Typical cup", value: "Sweet, chocolate and stone fruit; Pacamara can go floral and huge" },
  ],
  mapPoints: [
    { id: "sansalvador", name: "San Salvador", kind: "capital", coordinates: [-89.1912, 13.6976] },
    { id: "santaana", name: "Santa Ana", kind: "city", coordinates: [-89.5605, 13.9721], label: "top" },
    { id: "acajutla", name: "Acajutla", kind: "port", coordinates: [-89.8298, 13.5898], label: "bottom" },
  ],
  regionsCaption:
    "The six Consejo Salvadoreño del Café denominations of origin, drawn as department unions. Apaneca-Ilamatepec is the volume engine. Alotepec-Metapán is Chalatenango on the map. Metapán town sits in Santa Ana, already coloured as Apaneca. El Salvador does not grow robusta at commercial scale.",
  regions: [
    {
      id: "apaneca",
      number: 1,
      name: "Apaneca-Ilamatepec",
      species: "arabica",
      altitude: "500–2,300 m",
      season: "Oct–Mar",
      notes: "Ahuachapán, Santa Ana, Sonsonate. First GI (2010). Roughly half the national crop.",
    },
    {
      id: "balsamo",
      number: 2,
      name: "El Bálsamo-Quezaltepec",
      species: "arabica",
      altitude: "500–1,800 m",
      season: "Oct–Mar",
      notes: "La Libertad / San Salvador highlands. Closer to the capital, still volcanic.",
    },
    {
      id: "tecapa",
      number: 3,
      name: "Tecapa-Chinameca",
      species: "arabica",
      altitude: "500–1,600 m",
      season: "Nov–Mar",
      notes: "Usulután and San Miguel. Eastern volcanoes.",
    },
    {
      id: "chichontepec",
      number: 4,
      name: "Chichontepec",
      species: "arabica",
      altitude: "500–2,000 m",
      season: "Nov–Mar",
      notes: "San Vicente. The San Vicente volcano massif.",
    },
    {
      id: "cacahuatique",
      number: 5,
      name: "Cacahuatique",
      species: "arabica",
      altitude: "600–1,800 m",
      season: "Nov–Mar",
      notes: "Morazán. Smaller belt, high-grown lots turn up in specialty.",
    },
    {
      id: "alotepec",
      number: 6,
      name: "Alotepec-Metapán",
      species: "arabica",
      altitude: "1,000–1,800 m",
      season: "Dec–Mar",
      notes: "Chalatenango / Metapán highlands. Cooler, slower, often the most ‘specialty’ of the six.",
    },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Washed coffee is still what most Salvadoran mills know how to do well. Honey and natural lots exist. Same Central American story as Costa Rica, just with fewer micro mills and less spare cash to gamble.

Pacas is a Bourbon mutation found here in the 1940s. Pacamara is Pacas × Maragogype, also Salvadoran breeding, and when it is ripe and well dried it can be absurd: floral, savoury, a bean the size of a thumbnail. Catimors went in after rust. They kept trees alive. They did not always keep the cup interesting.

Shade is traditional. Altitude does the rest. The [Consejo Salvadoreño del Café](https://www.csc.gob.sv/) runs the six geographical indications and the usual extension work. Certifications (Rainforest, Fairtrade, Café Practices) are how a lot of farms still get paid above C.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee made nineteenth-century El Salvador rich and politically lopsided. Augustine Sedgewick’s [Coffeeland](/post/coffeeland-a-short-summary-and-review) is the long version. The civil war (1979–1992) emptied farms and wrecked mills; some of the famous fincas never fully came back. Leaf rust in 2012–13 did a second round of damage. Production has been stuck well below a million bags for years. USDA’s 2026/27 number is about 542,000 bags. Tiny next to Colombia. A live origin if you care about Bourbon.

Labour is the current squeeze. People leave, and pruning and picking slip. The government has handed out plants. FAS notes many of them never go in the ground because nobody can afford to farm them.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `As with most coffee producing countries, a lot of the best coffee is packed off for export. What you are poured in a San Salvador office is often darker and cheaper than the Pacamara that landed in Oslo. There are specialty bars now, and they will talk about Chalatenango.

At home it is still a stove-top or a chorreador cousin, usually sweet. Farm visits are easier in the west, Juayúa, Ataco, the Santa Ana volcano road, than they were during the war. Go in harvest if you can. Pacamara trees look slightly ridiculous, with beans the size of a thumbnail. When they are ripe and well dried they can be floral and huge.`,
    },
  ],
  gallery: [],
};
