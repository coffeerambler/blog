import type { CountryGuide } from "@/data/country-guides/types";

export const elSalvadorGuide: CountryGuide = {
  slug: "country-guide-elsalvador",
  path: "/country-guide-elsalvador",
  name: "El Salvador",
  kicker: "World Coffee Guide",
  lede: "Salvadoran coffees are sweet and gentle, with chocolate and stone fruit, and a well-made Pacamara can be floral and enormous in the cup. Almost all of it is arabica, much of it Bourbon grown on the western volcanoes, and there is less of it than there used to be after leaf rust and a shortage of farm workers cut the harvest.",
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
    "These are the six coffee regions recognised by the Consejo Salvadoreño del Café, shown by the departments they cover. Apaneca-Ilamatepec in the west grows the most coffee. Alotepec-Metapán is shown as Chalatenango, because the town of Metapán sits in Santa Ana, which is already coloured as Apaneca. El Salvador does not grow robusta at any scale.",
  regions: [
    {
      id: "apaneca",
      number: 1,
      name: "Apaneca-Ilamatepec",
      species: "arabica",
      altitude: "500–2,300 m",
      season: "Nov–Feb",
      notes: "Ahuachapán, Santa Ana and Sonsonate, roughly half the national crop and the first protected origin, in 2010.",
    },
    {
      id: "balsamo",
      number: 2,
      name: "El Bálsamo-Quezaltepec",
      species: "arabica",
      altitude: "500–1,800 m",
      season: "Nov–Feb",
      notes: "The volcanic highlands of La Libertad and San Salvador, close to the capital.",
    },
    {
      id: "tecapa",
      number: 3,
      name: "Tecapa-Chinameca",
      species: "arabica",
      altitude: "500–1,600 m",
      season: "Nov–Feb",
      notes: "The eastern volcanoes of Usulután and San Miguel.",
    },
    {
      id: "chichontepec",
      number: 4,
      name: "Chichontepec",
      species: "arabica",
      altitude: "500–2,000 m",
      season: "Nov–Feb",
      notes: "The slopes of the San Vicente volcano.",
    },
    {
      id: "cacahuatique",
      number: 5,
      name: "Cacahuatique",
      species: "arabica",
      altitude: "600–1,800 m",
      season: "Nov–Feb",
      notes: "A smaller area in Morazán, whose high-grown lots turn up in specialty.",
    },
    {
      id: "alotepec",
      number: 6,
      name: "Alotepec-Metapán",
      species: "arabica",
      altitude: "1,000–1,800 m",
      season: "Dec–Feb",
      notes: "The cool Chalatenango and Metapán highlands, often the most interesting of the six.",
    },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most Salvadoran coffee is [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean), and it is what the mills here do best. Cherry is pulped, fermented and washed, then dried on patios or raised beds. Honey and natural lots are made too, as they are in [Costa Rica](/country-guide-costarica), though El Salvador has fewer micro mills and farmers have less spare money to gamble on experiments that might not sell.

El Salvador has given the coffee world two well-known varieties. Pacas is a natural mutation of Bourbon found on a Salvadoran farm in the 1940s. Pacamara was bred here by crossing Pacas with the giant Maragogipe, and when it is picked ripe and dried well it can be extraordinary, floral and savoury, from a bean the size of a thumbnail. After leaf rust, many farms planted Catimors, which kept the trees alive but did not always keep the cup interesting.

Most coffee is grown under shade, which is traditional here, and the altitude of the volcanoes does the rest. The [Consejo Salvadoreño del Café](https://www.csc.gob.sv/) looks after the six protected regions and supports farmers, and certifications such as Rainforest Alliance and Fairtrade are still how many farms earn a little more than the market price.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Salvadoran coffee is graded by altitude, in the same way as Costa Rica's hard-bean system. The classifications are as follows:

SHG, Strictly High Grown — grown above about 1,200 metres

HG, High Grown — grown below that

Central Standard — the lower-grown coffee

On a specialty bag the region often matters more than the grade. A Chalatenango SHG and a lower-grown lot from the west will taste quite different, even if both are washed, and the grade tells you where the coffee grew rather than whether it was picked ripe.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee made nineteenth-century El Salvador rich, but the wealth and the land ended up in very few hands. Augustine Sedgewick's [Coffeeland](/post/coffeeland-a-short-summary-and-review) tells that story in detail. The civil war from 1979 to 1992 emptied many farms and wrecked mills, and some famous fincas never fully recovered. Leaf rust in 2012 and 2013 did a second round of damage.

Production has been well below a million bags for years, and USDA puts the 2026/27 harvest at around 542,000 bags. That is tiny next to Colombia, but it is still an origin well worth seeking out if you love Bourbon.

Labour is the biggest problem now. Many people have left the farms, and pruning and picking suffer as a result. The government has given out young coffee plants, but USDA's attachés note that many are never planted, because farmers cannot afford the work needed to grow them.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `As with most coffee producing countries, much of the best coffee is exported. The coffee you are served in a San Salvador office is often darker and cheaper than the Pacamara that ends up in a café in Oslo. There are specialty cafés in the capital now, though, and they are happy to talk about Chalatenango and the western volcanoes.

At home, people usually make coffee on the stove or with a cloth filter, and drink it sweet. Farm visits are much easier than they were during the war, especially in the west around Juayúa, Ataco and the road up the Santa Ana volcano. If you can visit during the harvest, look out for the Pacamara trees, whose huge cherries are hard to miss.`,
    },
  ],
  gallery: [],
};
