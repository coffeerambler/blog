import type { CountryGuide } from "@/data/country-guides/types";

export const indonesiaGuide: CountryGuide = {
  slug: "country-guide-indonesia",
  path: "/country-guide-indonesia",
  name: "Indonesia",
  kicker: "World Coffee Guide",
  lede: "Most of the crop is robusta from southern Sumatra. The arabica on specialty menus is a smaller pile: Gayo, Lintong, Toraja, Kintamani, Flores, a little Java and Papua. A lot of it is wet-hulled, which is why the cups can taste earthy and heavy.",
  flag: {
    src: "/images/flags/indonesia.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Jakarta" },
    { label: "Coffee in Indonesian", value: "Kopi" },
    { label: "Population", value: "286 million (World Bank, 2025)" },
    { label: "Production", value: "683,000 tonnes / 11.4 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Robusta clones; arabica Typica, Ateng, Gayo, USDA lines" },
    { label: "Typical cup", value: "Wet-hulled arabica: earth, cedar, low acidity, heavy body. Washed lots are cleaner and rarer." },
  ],
  mapPoints: [
    { id: "jakarta", name: "Jakarta", kind: "capital", coordinates: [106.8272, -6.1754] },
    { id: "medan", name: "Medan", kind: "city", coordinates: [98.6742, 3.5895] },
    { id: "surabaya", name: "Surabaya", kind: "port", coordinates: [112.7378, -7.2463] },
  ],
  legendArabica: "Arabica",
  legendRobusta: "Robusta (Lampung, South Sumatra, Bengkulu)",
  regionsCaption:
    "Province polygons. Flores is mapped as all of East Nusa Tenggara. Papua is the large eastern province, not only the highland plots. Robusta is Lampung, South Sumatra and Bengkulu, where USDA says most of the kilos are.",
  regions: [
    { id: "aceh", number: 1, name: "Aceh / Gayo", species: "arabica", altitude: "1,200–1,700 m", season: "Sep–Dec", notes: "Takengon and the Gayo highlands. Often organic, often wet-hulled." },
    { id: "sumut", number: 2, name: "North Sumatra", species: "arabica", altitude: "1,000–1,600 m", season: "Sep–Dec", notes: "Lintong, Mandheling, Sidikalem. The classic wet-hulled cup." },
    { id: "eastjava", number: 3, name: "East Java", species: "arabica", altitude: "900–1,600 m", season: "May–Sep", notes: "Ijen and the old estates. Some washed lots. Harvest is the dry season, unlike Sumatra." },
    { id: "sulsel", number: 4, name: "South Sulawesi / Toraja", species: "arabica", altitude: "1,100–1,800 m", season: "May–Sep", notes: "Tana Toraja and Kalosi. Typica still turns up." },
    { id: "bali", number: 5, name: "Bali", species: "arabica", altitude: "1,000–1,600 m", season: "May–Oct", notes: "Kintamani. Subak irrigation, often washed, often sold to tourists." },
    { id: "flores", number: 6, name: "Flores", species: "arabica", altitude: "1,200–1,800 m", season: "May–Sep", notes: "Bajawa. Mapped as East Nusa Tenggara. Sweet, chocolate, less earth than Sumatra." },
    { id: "papua", number: 7, name: "Papua", species: "arabica", altitude: "1,400–2,000 m", season: "May–Sep", notes: "Wamena and the highlands. Mapped as the whole province; farms are a fraction of that." },
    { id: "lampung", number: 8, name: "Lampung", species: "robusta", altitude: "Low–800 m", season: "May–Sep", notes: "Robusta. One of the big southern Sumatra volumes." },
    { id: "sumsel", number: 9, name: "South Sumatra", species: "robusta", altitude: "Low–900 m", season: "May–Sep", notes: "Robusta. USDA points at this belt, with Lampung, for most of the national kilos." },
    { id: "bengkulu", number: 10, name: "Bengkulu", species: "robusta", altitude: "Low–900 m", season: "May–Sep", notes: "Robusta. Smaller than Lampung, same story." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Wet-hulling, or giling basah, is the Sumatran method. The coffee is pulped and then dried to about 30% moisture. The parchment is hulled while it is still wet, and the green bean is dried the rest of the way. It dries faster in a wet climate. It also nicks the bean and leaves that heavy, earthy, low-acid cup people call Mandheling.

I find these coffees quite difficult to enjoy, but they are well liked in Asia and often used in espresso blends to add body. Better examples have slight, high fruity notes blending with the traditional heavy flavours, which can be umami and sweet. Some people treat the earthiness as a defect. It is the method.

Washed coffee exists, especially on Java, Bali and some Gayo lots. Honey is an experiment, as elsewhere.

Robusta is the majority of the crop. USDA's 2026/27 split is about 10 million bags of robusta and 1.4 million of arabica. Instant and espresso blends absorb most of the robusta. Specialty talks about the arabica, which is the smaller and more interesting pile.

[Kopi luwak](/archive/what-is-the-world-s-best-coffee) is a civet story, usually from caged animals. Don't buy it. It isn't the world's best coffee.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Indonesian coffee is graded by defects, under the national standard, not by altitude. Grade 1 is the cleanest, with the fewest defects in the sample. Grades 2, 3 and on down are progressively dirtier. On a Sumatra sack, Grade 1 is what you want to see next to the regional name.

The grade does not tell you the coffee was wet-hulled, and it does not tell you it will taste like earth and cedar. A Grade 1 Mandheling and a Grade 1 washed Java are both "good" by the defect count and nothing like each other in the cup. Screen size is sometimes printed as well. Treat it the way you treat AA in Kenya: useful for the roast, not a score.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `The Dutch East India Company planted arabica on Java in the 1690s. Leaf rust in the 1870s wiped a lot of it out, and robusta was brought in from Africa because it survived. That is why Indonesia is a robusta country with arabica pockets, rather than the other way around.

The trade names stuck: Java, Mandheling, Ankola, Toraja. They are markets and methods more than farm gates. A bag labelled Mandheling might be a wet-hulled blend from North Sumatra. It might be good. It is not one hillside. USDA has production around 11.4 million bags for 2026/27, down on the year before after wet weather in southern Sumatra.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Kopi tubruk is the everyday brew. Grounds go in a glass, hot water goes on top, you wait, and you drink past the sludge. Kopi jahe adds ginger. Street stalls do this all day, and it is a better introduction to how coffee is actually drunk than a tasting flight in a hotel.

Jakarta, Bandung and Yogyakarta have specialty bars now. They roast Gayo and Flores, and they will talk about process in the same way a Melbourne bar would. At home, tubruk still wins. A wet-hulled Lintong is a fairer introduction to what this origin tastes like than anything with a civet on the bag. It will not cup like Kenya. They are different drinks.`,
    },
  ],
  gallery: [],
};
