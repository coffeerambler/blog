import type { CountryGuide } from "@/data/country-guides/types";

export const guatemalaGuide: CountryGuide = {
  slug: "country-guide-guatemala",
  path: "/country-guide-guatemala",
  name: "Guatemala",
  kicker: "World Coffee Guide",
  lede: "Guatemalan coffees tend to be sweet and chocolatey, with stone fruit and a proper acidity in the higher lots. Most of it is washed arabica grown on volcanic slopes, and each region has its own character, from the bright, dry-grown cups of Huehuetenango to the softer, spicier coffees of rainy Cobán.",
  flag: {
    src: "/images/flags/guatemala.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Guatemala City" },
    { label: "Coffee in Spanish", value: "Café" },
    { label: "Population", value: "18.7 million (World Bank, 2025)" },
    { label: "Production", value: "196,000 tonnes / 3.26 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Bourbon, Caturra, Catuaí, Pacamara, Typica" },
    { label: "Typical cup", value: "Cocoa, stone fruit, bright acidity at height; Cobán is wetter and spicier" },
  ],
  mapPoints: [
    { id: "guatemalacity", name: "Guatemala City", kind: "capital", coordinates: [-90.5069, 14.6349] },
    { id: "antigua", name: "Antigua", kind: "city", coordinates: [-90.7345, 14.5586], label: "left" },
    { id: "quetzal", name: "Puerto Quetzal", kind: "port", coordinates: [-90.7872, 13.9233], label: "left" },
    { id: "santotomas", name: "Santo Tomás de Castilla", kind: "port", coordinates: [-88.6167, 15.6958], label: "left" },
  ],
  regionsCaption:
    "These are the eight coffee regions recognised by Anacafé, the national coffee association, shown by the departments they sit in. Antigua is in Sacatepéquez, Fraijanes covers the department of Guatemala rather than just the plateau, and Nuevo Oriente is in Chiquimula. Guatemala grows arabica.",
  regions: [
    { id: "antigua", number: 1, name: "Antigua", species: "arabica", altitude: "1,400–1,800 m", season: "Dec–Mar", notes: "Volcanic soil around the old colonial capital, and the name most people know." },
    { id: "acatenango", number: 2, name: "Acatenango", species: "arabica", altitude: "1,400–2,000 m", season: "Dec–Mar", notes: "Next door to Antigua in Chimaltenango, and often a little higher." },
    { id: "atitlan", number: 3, name: "Atitlán", species: "arabica", altitude: "1,400–1,800 m", season: "Dec–Mar", notes: "Small lots grown around the lake and its volcanoes in Sololá." },
    { id: "coban", number: 4, name: "Cobán", species: "arabica", altitude: "1,300–1,700 m", season: "Dec–Mar", notes: "Rainy Alta Verapaz, which is cardamom country as well as coffee." },
    { id: "fraijanes", number: 5, name: "Fraijanes", species: "arabica", altitude: "1,300–1,800 m", season: "Dec–Mar", notes: "A plateau just south-east of Guatemala City." },
    { id: "huehue", number: 6, name: "Huehuetenango", species: "arabica", altitude: "1,500–2,000 m", season: "Jan–Mar", notes: "High and dry, often the brightest cup, and a lot of the specialty coffee." },
    { id: "oriente", number: 7, name: "Nuevo Oriente", species: "arabica", altitude: "1,300–1,700 m", season: "Dec–Mar", notes: "The eastern hills of Chiquimula, less famous but still good washed coffee." },
    { id: "sanmarcos", number: 8, name: "San Marcos", species: "arabica", altitude: "1,400–1,900 m", season: "Dec–Mar", notes: "The western slope towards Mexico, and rainier than Huehuetenango." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most Guatemalan coffee is [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean). Cherry is pulped, fermented and washed at the farm or a nearby mill, then dried on patios or raised beds. Anacafé's eight regions are the names you will see on bags, and they really do taste different. A Huehuetenango lot is grown high in a dry, windy climate and often has the brightest acidity, while a lot from Cobán grows in rain and cloud for much of the year and tends to be softer and spicier.

Honey and natural lots are becoming more common, as they have in [Costa Rica](/country-guide-costarica), but they are still a small part of the harvest. Guatemala's reputation was built on clean washed coffee, and that is still what it does best.

[Bourbon and Caturra](/archive/coffee-varieties-a-brief-look-at-significant-varieties) are still what most of the country grows, alongside Catuaí and some older Typica. You will also see Pacamara on more expensive menus. It was bred in [El Salvador](/country-guide-elsalvador) by crossing Pacas with Maragogipe, and Guatemalan farms have taken to it well. It can be excellent, floral and sweet, but it is a large bean that needs careful picking and drying to taste its best.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Guatemalan coffee is graded by the altitude it grows at, as in [Costa Rica](/country-guide-costarica). Coffee grown higher up matures more slowly and makes a denser bean, which tends to give a brighter, more complex cup. The classifications are roughly as follows:

SHB, Strictly Hard Bean — grown above about 1,400 metres

HB, Hard Bean — grown between about 1,200 and 1,400 metres

SH, Semi Hard Bean — grown between about 1,000 and 1,200 metres

EPW, Extra Prime Washed — grown between about 900 and 1,000 metres

PW, Prime Washed — the lower-grown coffee

Most of the specialty coffee you will find is SHB, often with the region printed next to it. The grade tells you where the coffee grew, but not how carefully it was picked or dried, so the region and the farm or mill name are still worth reading.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee became Guatemala's main export in the second half of the nineteenth century, when the liberal governments of the 1870s pushed hard for it. Land that belonged to indigenous communities was taken for large fincas, and forced labour laws made people work the harvest. German planters settled in Alta Verapaz, which is why Cobán still has old estate names. That history is part of why you see large estates next to small co-ops on the map today.

Leaf rust swept through Central America in 2012 and 2013 and cut Guatemala's harvest badly. A lot of farms replanted with rust-resistant Catimors and Sarchimors to keep their trees alive. USDA puts the 2026/27 harvest at around 3.26 million bags. That is behind Honduras in the region, but well ahead of El Salvador.

Most of the coffee leaves through Puerto Quetzal on the Pacific coast, and some from Santo Tomás de Castilla on the Caribbean side.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `As with many coffee producing countries, the best Guatemalan coffee is mostly exported. The everyday cup at home is often weak, sweet and made from lower grades, or instant. Antigua is the exception, with tasting rooms and farm tours aimed at the tourists who are already there for the colonial town.

Guatemala City now has a good number of specialty cafés, and the baristas will happily talk you through the differences between Huehuetenango, Atitlán and Cobán. If you are visiting during the harvest, the drive up to Huehuetenango is long but worth it, and you will drink some of the best washed coffee in Central America.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/guatemala/guatemala-02-shade-canopy.jpg",
      alt: "Canopy of a shade-grown coffee farm in Guatemala",
    },

    {
      src: "/images/country/guatemala/guatemala-03-coffee-blossom.jpg",
      alt: "Coffee blossom on a Guatemalan hillside",
    },
  ],
};
