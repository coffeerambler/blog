import type { CountryGuide } from "@/data/country-guides/types";
import { USDA_COFFEE_CIRCULAR_HREF } from "@/lib/usda";

export const ethiopiaGuide: CountryGuide = {
  slug: "country-guide-ethiopia",
  path: "/country-guide-ethiopia",
  name: "Ethiopia",
  kicker: "World Coffee Guide",
  lede: "Incredibly diverse and surprising, Ethiopian coffees can be a real joy. From British teatime flavours of black tea, biscuits and strawberries of Sidamo to juicy blueberries of Harrar. Also expect citrus and tropical fruit flavours, floral too.",
  flag: {
    src: "/images/675337_9a52fe04185a4addbc48086bf161e944~mv2.jpg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Addis Ababa" },
    { label: "Coffee in Amharic", value: "Buna" },
    { label: "Population", value: "135 million (World Bank, 2025)" },
    { label: "Production", value: "726,000 tonnes / 12.1 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Heirloom landraces; Geisha among them" },
    { label: "Typical cup", value: "Floral, citrus, black tea; naturals can go blueberry and strawberry" },
  ],
  mapPoints: [
    { id: "addis", name: "Addis Ababa", kind: "capital", coordinates: [38.7524, 9.0358] },
    { id: "jimma", name: "Jimma", kind: "city", coordinates: [36.8479, 7.6756], label: "left" },
    { id: "diredawa", name: "Dire Dawa", kind: "city", coordinates: [41.8566, 9.5913] },
  ],
  regionsCaption:
    "Zones, not the whole of Oromia. Gedeo stands in for Yirgacheffe; East Harerge and Hareri for Harrar. Guji is listed on its own. It used to get lumped into Sidama. Ethiopia is arabica country; robusta is not a commercial crop here.",
  regions: [
    { id: "harrar", number: 1, name: "Harrar", species: "arabica", altitude: "1,500–2,100 m", season: "Oct–Feb", notes: "East. Dry-processed fruit bombs when they are good. Inky when they are not." },
    { id: "yirgacheffe", number: 2, name: "Yirgacheffe", species: "arabica", altitude: "1,700–2,200 m", season: "Oct–Jan", notes: "Gedeo zone. Washed lots can taste like bergamot. The name everyone knows." },
    { id: "sidama", number: 3, name: "Sidama", species: "arabica", altitude: "1,400–2,200 m", season: "Oct–Jan", notes: "Now its own regional state. Broader than Yirgacheffe, still often excellent." },
    { id: "guji", number: 4, name: "Guji", species: "arabica", altitude: "1,800–2,200 m", season: "Oct–Jan", notes: "Split out of Sidama in the trade. Dense, floral, a lot of the exciting lots of the last decade." },
    { id: "jimma", number: 5, name: "Jimma / Limu", species: "arabica", altitude: "1,400–2,100 m", season: "Nov–Jan", notes: "Western Oromia. Limu and the old Djimmah market sit in this zone." },
    { id: "lekempti", number: 6, name: "Lekempti", species: "arabica", altitude: "1,500–2,100 m", season: "Feb–Apr", notes: "West Wellega / Gimbi. Later harvest than the south." },
    { id: "tepi", number: 7, name: "Tepi", species: "arabica", altitude: "1,100–1,900 m", season: "Nov–Jan", notes: "Sheka. Forest and plantation coffee, lower than Yirgacheffe." },
    { id: "bebeka", number: 8, name: "Bebeka", species: "arabica", altitude: "950–1,200 m", season: "Nov–Jan", notes: "Bench Maji. The low one. Plantation history, less of the tea-floral thing." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Due to the lack of water in some areas of Ethiopia, and its dry air, the natural process is well suited to these coffees. These [dry processed coffees](/archive/the-dry-process-an-introduction-to-natural-coffees) can be remarkably delicious, with fermented tropical fruit and strawberry flavours with a pleasant medium acidity. Washed coffees tend to be more acidic with tangy, tangerine flavours.

A bag of Ethiopian coffee beans are usually mixed in size. Compare this with uniform sizes of coffee from Kenya or Colombia, where bean size is measured and segregated. Ethiopian coffee's non-uniformity is a result of the heirloom varieties and their trees not being farmed in the way they are in other countries. This helps add to the diversity we taste in Ethiopian coffee.

There are so many [varieties of arabica](/archive/coffee-varieties-a-brief-look-at-significant-varieties) in Ethiopia that to isolate and farm them has not occurred on any large scale. There are some cooperatives offering all [Geisha](/archive/the-geisha-variety-what-s-the-big-deal) beans (the variety originates in Ethiopia) but this is rare. Instead, wild and planted coffees are combined and are called heirloom. Characteristics of Ethiopian coffee can therefore be loosely based on their origin, and named after areas such as Yirgacheffe and the cooperatives that grew them.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Said to be where coffee originates, specialty grade Ethiopian beans deliver an abundance of flavour. It was an Ethiopian single origin espresso that first blew my mind, kick-starting a coffee epiphany. I couldn't believe the elegant complexity, the creamy mouthfeel and the beautiful flavours.

There are a number of legends of how the rejuvenating qualities of coffee were discovered, [the main](http://www.ncausa.org/About-Coffee/History-of-Coffee) being a goatherd seeing the liveliness of his flock after consuming the cherries. Nowadays the plant is widely grown on plantations, wild in forests and in rural areas. Farmers have formed cooperatives and collect their coffee at mills for processing. [The circular](${USDA_COFFEE_CIRCULAR_HREF}) from July 2026 has Ethiopia at a record 12.1 million bags, fourth globally behind Brazil, Vietnam and Colombia.

Ethiopian coffees typically grow at very high altitudes meaning there is a slower maturation and therefore a denser, sweeter and more complex bean.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Coffee plays a very important role in Ethiopian culture, in both modern hospitality and in ancient tribal traditions. In the TV documentary series [Tribe](https://en.wikipedia.org/wiki/Tribe_(UK_TV_series)), chieftains of the Omo River Valley tribes spray coffee onto the face of Bruce Parry as a blessing. In less dramatic customs coffee is served to guests as such.

Coffee beans are roasted in a pan and then ground with a pestle and mortar. The grounds are then placed into the beautifully shaped Jebena, a ceramic pot used for brewing coffee. The same grounds are brewed over fire three times, pouring into small cups after each boil. The first is called the Abol, the second the Tona, and the final the Baraka.

[Tomoca](http://www.tomocacoffee.com/) is the oldest of coffee shops found in Ethiopia's capital, Addis Ababa. Founded in 1953, the name is an abbreviation of the Italian language, Torrefazione Moderna Café.

[Modern specialty coffee](https://migrationology.com/5-best-coffee-shops-addis-ababa-ethiopia/) shops are popping up around major cities. These will sometimes roast your coffee in the traditional method and serve it all whilst you wait, a new take on the old.`,
    },
  ],
  gallery: [
    { src: "/images/675337_cc9dd86ca21443fbba41e3f47a0c8e23~mv2.jpg", alt: "Coffee in Ethiopia" },
    { src: "/images/675337_1293d133fc8a4084b45da9af583d1593~mv2.jpeg", alt: "Ethiopian coffee ceremony" },
    { src: "/images/675337_177918cc65264560a412da38bb0b5f1b~mv2.jpg", alt: "Coffee growing in Ethiopia" },
  ],
};
