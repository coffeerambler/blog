import type { CountryGuide } from "@/data/country-guides/types";

export const costaRicaGuide: CountryGuide = {
  slug: "country-guide-costarica",
  path: "/country-guide-costarica",
  name: "Costa Rica",
  kicker: "World Coffee Guide",
  lede: "Costa Rican coffees are easy to like, with good sweetness and tasting generally quite juicy. Where washed coffees can have a rather light body and taste very clean, the newer micro mill honey processed coffees are fuller and exhibit citrus, grape and tropical fruit flavours.",
  flag: {
    src: "/images/675337_5325c78b01874f5585b0edd947d37165~mv2.png",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "San José" },
    { label: "Coffee in Spanish", value: "Café" },
    { label: "Population", value: "5.2 million (World Bank, 2025)" },
    { label: "Production", value: "72,000 tonnes / 1.2 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Caturra, Catuai, Villa Sarchí, Bourbon, Geisha, SL28" },
    { label: "Typical cup", value: "Sweet, juicy; washed lots are light and clean, honeys fuller with citrus and grape" },
  ],
  mapPoints: [
    { id: "sanjose", name: "San José", kind: "capital", coordinates: [-84.0796, 9.9328] },
    { id: "caldera", name: "Caldera", kind: "port", coordinates: [-84.6894, 9.9196], label: "left" },
  ],
  regionsCaption:
    "ICAFE’s named regions as canton unions. Tarrazú is Dota, Tarrazú and León Cortés. A 30-year robusta ban was lifted in 2018; plantings exist, but they are not a region on this map yet.",
  regions: [
    { id: "west-valley", number: 1, name: "West Valley", species: "arabica", altitude: "800–1,650 m", season: "Nov–Mar", notes: "Alajuela belt. Villa Sarchí comes from here." },
    { id: "central-valley", number: 2, name: "Central Valley", species: "arabica", altitude: "900–1,600 m", season: "Nov–Mar", notes: "Around San José and Heredia. Urban pressure on the trees." },
    { id: "tarrazu", number: 3, name: "Tarrazú", species: "arabica", altitude: "1,200–1,900 m", season: "Dec–Mar", notes: "Los Santos. The name that sells. High, tight, often the most expensive." },
    { id: "tres-rios", number: 4, name: "Tres Ríos", species: "arabica", altitude: "1,200–1,650 m", season: "Dec–Mar", notes: "La Unión, Cartago. Small, volcanic, historically fancy." },
    { id: "turrialba", number: 5, name: "Turrialba", species: "arabica", altitude: "600–1,400 m", season: "Nov–Feb", notes: "The wetter Caribbean side of the country." },
    { id: "orosi", number: 6, name: "Orosí", species: "arabica", altitude: "900–1,400 m", season: "Nov–Feb", notes: "Paraíso canton. Valley coffee, less famous than Tarrazú, still proper." },
    { id: "brunca", number: 7, name: "Brunca", species: "arabica", altitude: "800–1,200 m", season: "Nov–Jan", notes: "Pérez Zeledón and Coto Brus. South, often a bit lower." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Costa Rica is a strong performer when it comes to specialty coffee. Farms are mostly small and coffee is [processed](/archive/coffee-processing-methods-from-cherry-to-green-bean) in microlots in micro mills, making it highly traceable.

As a relatively rich coffee producing country, farmers have a little more money to process their own coffee. It also means wages for locals are higher, resulting in the employment of poorer Nicaraguans and Hondurans during the harvest season.

There is much experimentation with processing methods in Costa Rica, with many farmers operating their own micro mills. This is a specialty coffee buyer's dream, offering the chance to find exciting new profiles but not without risk. The farmers can roll the dice experimenting, especially if asked to do so by major specialty roasters. If the bean doesn't cup well after processing, the farmer can be left with large quantities of coffee they can't sell, or which they lose money on. However, results can be great with Costa Rica consistently producing fantastic coffees, particularly [honey-processed](/archive/coffee-processing-the-honey-process) beans.

The Panamanian [Geishas](/archive/the-geisha-variety-what-s-the-big-deal) we have all come to know were carried away from Costa Rica in the 1960s. Since they blew up in the 00s, Costa Rica has taken again to high quality geisha and SL28 [varieties](/archive/coffee-varieties-a-brief-look-at-significant-varieties). Other common varieties include Caturra, Villa Sarchi (a mutation of bourbon endemic to Costa Rica), Villa Lobos and Venecia, a mutation of Caturra.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Grading of Costa Rican coffee is done by the density of the bean based on the altitude it grows at. Coffee beans grown at higher elevations are more dense than those grown closer to the sea. The classifications are as follows:

SHB, Strictly Hard Bean — grown above 1,188 metres

GHB, Good Hard Bean — grown between 1,005 and 1,188 metres

MHB, Medium Hard Bean — the rest`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Having begun exporting coffee in the 1830s, Costa Rica has a long history in its organised trade and development. After claiming its independence from Spain in 1821, the government gave tax breaks and land to anyone who grew coffee. ICAFE, the national coffee institute, grew out of the 1933 coffee defence board and was established as an institute in 1948, to help with the agricultural, commercial and export growth of coffee. Emphasis on high quality was taken, and in 2018 a [30-year ban on growing robusta was lifted](https://www.reuters.com/article/us-costa-rica-coffee-exclusive/exclusive-costa-rica-to-lift-30-year-ban-on-planting-robusta-coffee-trees-idUSKBN1FT2UH). This is to contend with the future threats to arabica coffee in the next half century.

As with most coffee producing countries, Costa Rica is at threat with Global Warming. Average temperatures have been steadily increasing, resulting in the widespread arrival of the coffee borer beetle in 2001. Borers lay eggs in the coffee fruit and reduce yield. Extreme rain events and hotter days (on average a degree Celsius [hotter than 100 years ago](http://www.climatehotmap.org/global-warming-locations/san-marcos-de-tarrazu-costa-rica.html)) have put more strain on farms and reduced the land available for growing coffee. Yields have decreased over the decades. Urbanisation has also played a part in farming area decline.

Despite these threats, Costa Rica's recent [record for battling deforestation](https://www.azocleantech.com/article.aspx?ArticleID=554) is strong. A stable government with effective bans is paying off after decades of aggressive deforestation. More shade grown trees will also help protect coffee plants from extreme weather.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Coffee is regularly enjoyed after meals, coming with heated milk on the side. As with many coffee producing countries, the best coffee is exported to countries and businesses which will pay more. However, there is a lot of high quality coffee in Costa Rica.

Locals brew coffee with a cotton, sock-like cloth called a [chorreador, or Sander](http://www.cafebritt.com/experience-britt/coffee-101/cafe-britt-brewing-series-chorreador) (pictured), which hangs on a stand. Ground coffee is placed into the cloth and water is poured over, much like the pour overs many of us use at home. Water passes through and into a carafe. Chorrear translates into English as the verb to drip, trickle or gush. Don't forget to try this brew method when travelling in Costa Rica.

Cafe culture has also [been changing fast](https://www.freshcup.com/costa-rica-specialty-coffee-cafe-culture/) in recent years to accommodate for the global rise in specialty coffee. This has seen the invention of the Vandola, something you could consider an improvement on the [Chemex](/chemex). Brewed in much the same way, the ceramic Vandola has a spout for pouring the coffee on the upper side of the rounded bulb in which the fluid sits. There is also a handle for ease of pouring.

And finally, eco-tourism is huge in Costa Rica, tourism generally making the greatest contribution to the country's economy. Visiting coffee farms is included in many packages where you can see examples of coffee cultivation and processing. There they'll hopefully let you try their home roasted coffee, if you're nice.`,
    },
  ],
  gallery: [
    { src: "/images/675337_a07d8fdda4c44a11b9804a301d1203c1~mv2.jpg", alt: "Coffee in Costa Rica" },
    { src: "/images/675337_e6d903f177fb4b409fdd963213bd1615~mv2.jpg", alt: "Costa Rican coffee mill" },
    { src: "/images/675337_8937fb16cadc47388dbbb3621f3dc29b~mv2.jpg", alt: "Chorreador coffee brewer" },
  ],
};
