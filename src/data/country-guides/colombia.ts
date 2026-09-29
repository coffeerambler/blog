import type { CountryGuide } from "@/data/country-guides/types";

export const colombiaGuide: CountryGuide = {
  slug: "country-guide-colombia",
  path: "/country-guide-colombia",
  name: "Colombia",
  kicker: "World Coffee Guide",
  lede: "Often grown at high altitudes, coffee from Colombia is also high in acidity and sweetness, with impressive cup quality. Expect a broad range of flavours including dark chocolate, cherry and other sweet fruits.",
  flag: {
    src: "/images/675337_2d305059e44c4edfad17ba86276ad30e~mv2.jpg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Bogotá" },
    { label: "Coffee in Spanish", value: "Café" },
    { label: "Population", value: "53.4 million (World Bank, 2025)" },
    { label: "Production", value: "804,000 tonnes / 13.4 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Castillo, Caturra, Colombia, Typica, Bourbon, Tabi" },
    { label: "Typical cup", value: "Bright acidity, chocolate, cherry and other sweet fruit" },
  ],
  mapPoints: [
    { id: "bogota", name: "Bogotá", kind: "capital", coordinates: [-74.0836, 4.6534] },
    { id: "medellin", name: "Medellín", kind: "city", coordinates: [-75.6026, 6.2697], label: "left" },
    { id: "buenaventura", name: "Buenaventura", kind: "port", coordinates: [-77.0738, 3.8882], label: "left" },
  ],
  regionsCaption:
    "Department polygons for the classic FNC belt. Harvest timing flips with latitude: many northern departments pick late in the year; Cauca, Tolima, Cundinamarca and Nariño also run a first-half crop. Colombia does not grow robusta at any scale that belongs on this map.",
  regions: [
    { id: "magdalena", number: 1, name: "Sierra Nevada / Magdalena", species: "arabica", altitude: "900–1,600 m", season: "Sep–Dec", notes: "Caribbean slope. Lower, often a bit wilder in the cup." },
    { id: "santander", number: 2, name: "Santander", species: "arabica", altitude: "1,200–1,800 m", season: "Sep–Dec", notes: "Mapped with Norte de Santander. Body and cocoa more than floral lift." },
    { id: "antioquia", number: 3, name: "Antioquia", species: "arabica", altitude: "1,300–2,200 m", season: "Sep–Dec", notes: "Medellín’s department. Volume and a wide quality spread." },
    { id: "caldas", number: 4, name: "Caldas", species: "arabica", altitude: "1,300–1,800 m", season: "Sep–Dec", notes: "Coffee triangle. Cenicafé sits here." },
    { id: "risaralda", number: 5, name: "Risaralda", species: "arabica", altitude: "1,300–1,650 m", season: "Sep–Dec", notes: "Triangle again. Small department, serious density of trees." },
    { id: "cundinamarca", number: 6, name: "Cundinamarca", species: "arabica", altitude: "1,400–1,800 m", season: "Mar–Jun", notes: "Around Bogotá. Earlier main harvest than the north." },
    { id: "valle", number: 7, name: "Valle del Cauca", species: "arabica", altitude: "1,400–2,000 m", season: "Sep–Dec", notes: "Western cordillera above the Cauca valley." },
    { id: "cauca", number: 8, name: "Cauca", species: "arabica", altitude: "1,700–2,100 m", season: "Mar–Jun", notes: "High, often very clean. Indigenous and smallholder country." },
    { id: "tolima", number: 9, name: "Tolima", species: "arabica", altitude: "1,200–1,900 m", season: "Mar–Jun", notes: "Opened up after the peace deal. Quality has been climbing." },
    { id: "huila", number: 10, name: "Huila", species: "arabica", altitude: "1,200–2,000 m", season: "Sep–Dec", notes: "The fruitier end of Colombia. Specialty buyers live here." },
    { id: "narino", number: 11, name: "Nariño", species: "arabica", altitude: "1,700–2,300 m", season: "Apr–Jun", notes: "Extreme altitude. Cold nights, valley heat, sharp aromatics." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most Colombian coffees are [wet processed](/archive/coffee-processing-methods-from-cherry-to-green-bean). Naturals and honeys exist, but the country's reputation was built on a clean wet mill.

More recently, lots of Colombian farmers are experimenting with [co-ferments](/post/co-fermented-coffee) and other innovative processing methods. However, there are also [reports of adding synthetic flavours to green coffee](https://perfectdailygrind.com/2024/10/why-infused-co-fermented-coffees-are-different/) in the craze for 'fruit bomb' profiles.

Main harvests are generally at the end of the year whilst there is also a smaller fly harvest, or mitaca, just before the midpoint of the year.

Another great aspect of Colombian farming is the diversity of the ecosystem. Many coffees are shade grown with lemon, orange, maize, apples and many other fruits. This is both highly beneficial for soil quality and Colombia's bird species, of which are over 1900. No other country has as many bird species.

It's worth tasting coffee from the different regions as each one has distinct characteristics. Coffee from Nariño can be quite special, grown at very high elevation and therefore highly acidic and aromatic. If it weren't for the rising heat from the valley, coffee crops here would probably die from the night's cold. It's mild flavour contrasts with the obvious fruitier coffees from the Huila region.

Most of the growing regions' main three [varieties](/archive/coffee-varieties-a-brief-look-at-significant-varieties) are Typica, Caturra and Castillo. The Caturra is a naturally occurring mutation of the Bourbon variety first found in Brazil. Castillo (2005) has received some negative bias because of its Catimor lineage. This bias might be misplaced though, as [this research](https://coffeelands.crs.org/2015/04/more-precision-on-castillo-v-caturra/) conducted in 2015 shows cuppers could not much distinguish quality between the Castillo and Caturra varieties.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Colombian coffees are graded by size rather than quality, though some believe greater size correlates with high quality. It is easy to misinterpret Supremo and Excelso as a mark of how good the coffee is. What they really mean is the size of the bean. I personally feel these terms are not overly helpful for the specialty market, as different varieties have different sizes. They are helpful for sorting coffee for roasting though, with similar size beans more likely to roast evenly.

Supremo — the larger bean, generally screen 17 and above

Excelso — the smaller export grade, generally screens 14 to 16`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Colombian coffee is well known for its high quality. Typically grown at high altitudes, the beans mature more slowly, becoming denser and developing a bright acidity. Its success is in a large part down to the [Federación Nacional de Cafeteros de Colombia](https://www.federaciondecafeteros.org/) ([National Federation of Coffee Growers, FNC](https://www.federaciondecafeteros.org/particulares/en/)), which has focused on three simply stated goals since its founding in 1927; furthering the interest of Colombian coffee, to study its problems and to protect the industry.

In furthering the interest of Colombian coffee, the FNC have been strong marketeers. Perhaps their most successful marketing creation is [Juan Valdez](https://en.wikipedia.org/wiki/Juan_Valdez), a fictional and relatable coffee farmer who works hard with his mule, Conchita. Along with this, there is a strong emphasis on exported coffee being 100% Colombian, and therefore suggesting it's of premium quality.

For protecting the industry, the FNC also invests in local communities, helping to build roads and other institutions of public benefit all in an effort to keep production steady and growing. In addition to this, farmers are supported in getting their harvest to market. With over half a million farmers as part of the organisation, there is much faith in its mission.

And then to study its problems, the FNC founded [Cenicafé](http://www.cenicafe.org/). This research institute investigates and analyses threats to production, such as rust and pests, and in part of the solution creates new varieties to tackle these problems.

Cenicafé has helped produce new varieties to increase yield and protect the plant. One criticism is that it sometimes favours yield over quality. However, Colombian coffee is generally of very high quality. Brazil and Vietnam are the biggest producers of coffee overall. Brazil also grows more arabica. Colombia is the large washed-arabica origin, usually second in arabica and third in coffee overall.

With peace being made in 2017 with the guerrilla fighters of FARC, we can now expect more quality to come from regions like Tolima affected by the group. This is a welcome new era with this disruptive force hopefully at an end. Long may it continue.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `As is natural in a country of such great coffee production, Colombians drink a lot. Unfortunately for many locals, a lot of the best coffee is packed off for export, leaving lower quality coffee and beans exported from neighbouring countries to fulfil demand. This might be why in the countryside, [coffee is boiled in sugar cane water](https://colombiareports.com/evolution-coffee-culture-colombias-coffee-region/) to help improve the taste.

Tinto is a coffee drink enjoyed in Colombia. A friend of mine described it as "a version of Americano but way better, in a small cup and sweet as most Colombian coffee." Usually made with commercial quality coffee, Tinto has a thicker mouthfeel and is more concentrated than filter.

The global trend for coffee is to have more awareness of a coffee's provenance. Colombia is no different. [Café Cultor](http://www.cafecultor.co) in [Bogotá](https://en.wikipedia.org/wiki/Bogot%C3%A1) is one such coffee shop which provides its guests with a wide range of Colombian coffees. A quick look on the website will show you the different coffees they offer and the type of soil they're grown, along with other origin information.`,
    },
  ],
  gallery: [
    { src: "/images/675337_b77d244d1e4c4cd686dd97dd5c9d6ac2~mv2.png", alt: "Coffee in Colombia" },
    { src: "/images/675337_eb739007799443ea81994f0c9ff9ec44~mv2.jpg", alt: "Colombian coffee farm" },
    { src: "/images/675337_3989f2618e3c4dcbba5a4c43701a1f5a~mv2.jpg", alt: "Coffee cherries in Colombia" },
  ],
};
