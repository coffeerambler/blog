import type { CountryGuide } from "@/data/country-guides/types";

export const guatemalaGuide: CountryGuide = {
  slug: "country-guide-guatemala",
  path: "/country-guide-guatemala",
  name: "Guatemala",
  kicker: "World Coffee Guide",
  lede: "Washed arabica from volcanic slopes. Huehuetenango, Antigua, Cobán, Atitlán, San Marcos. Bourbon and Caturra still do most of the work. The better lots are cocoa, stone fruit and a proper acidity. Pacamara turns up when someone wants a bigger cup.",
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
  ],
  regionsCaption:
    "Anacafé regions as department polygons. Antigua is Sacatepéquez. Fraijanes is the department of Guatemala, not only the plateau. Nuevo Oriente is Chiquimula. Arabica only.",
  regions: [
    { id: "antigua", number: 1, name: "Antigua", species: "arabica", altitude: "1,400–1,800 m", season: "Dec–Apr", notes: "Sacatepéquez. Volcanic, the name people know." },
    { id: "acatenango", number: 2, name: "Acatenango", species: "arabica", altitude: "1,400–2,000 m", season: "Dec–Apr", notes: "Chimaltenango. Next to Antigua, often a bit higher." },
    { id: "atitlan", number: 3, name: "Atitlán", species: "arabica", altitude: "1,400–1,800 m", season: "Dec–Apr", notes: "Sololá. Lake and volcanoes. Small lots." },
    { id: "coban", number: 4, name: "Cobán", species: "arabica", altitude: "1,300–1,700 m", season: "Dec–Apr", notes: "Alta Verapaz. Wetter. Cardamom country as well as coffee." },
    { id: "fraijanes", number: 5, name: "Fraijanes", species: "arabica", altitude: "1,300–1,800 m", season: "Dec–Mar", notes: "Mapped as the whole Guatemala department. The plateau is a strip of that." },
    { id: "huehue", number: 6, name: "Huehuetenango", species: "arabica", altitude: "1,500–2,000 m", season: "Jan–Apr", notes: "High, dry, often the brightest cup. A lot of the specialty volume." },
    { id: "oriente", number: 7, name: "Nuevo Oriente", species: "arabica", altitude: "1,300–1,700 m", season: "Dec–Mar", notes: "Chiquimula. Eastern hills. Less famous, still washed arabica." },
    { id: "sanmarcos", number: 8, name: "San Marcos", species: "arabica", altitude: "1,400–1,900 m", season: "Dec–Apr", notes: "Western slope toward Mexico. Rainier than Huehue." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Washed coffee is the default. Depulped, fermented, washed, dried on patios or beds. Anacafé's eight regions are the names you see on bags. They are departments more than farm gates. A Huehuetenango lot should taste high and dry. A Cobán lot can taste like it grew in the wet, because it did.

Honey and natural lots exist, as they do in [Costa Rica](/country-guide-costarica). They are still the smaller pile.

Pacamara is a Pacas × Maragogipe cross that Guatemala made famous. It can be excellent. It can also be a big bean with not much in the cup. [Bourbon and Caturra](/archive/coffee-varieties-a-brief-look-at-significant-varieties) are still what most of the country grows.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee became the export crop in the nineteenth century, on land that was not empty. The industry was built on large fincas and indigenous labour. That history is not a tasting note, but it is why the map still has estate names next to smallholder co-ops.

Leaf rust in the 2010s cut production and pushed some farms into Catimors. USDA has 2026/27 around 3.26 million bags. That is behind Honduras in the region, ahead of [El Salvador](/country-guide-elsalvador). Puerto Quetzal is the Pacific port that exports a lot of it.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Sweet, dark coffee is still the everyday cup. Antigua has tasting rooms because tourists are already there for the town. Guatemala City has specialty bars now, and they will talk about Huehue properly.

If you go in harvest, Huehuetenango is a long drive and worth it. Antigua is easier and still a real origin, not only a postcard. I would rather drink a washed Huehue than a natural experiment from a farm that is guessing.`,
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
