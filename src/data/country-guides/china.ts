import type { CountryGuide } from "@/data/country-guides/types";

export const chinaGuide: CountryGuide = {
  slug: "country-guide-china",
  path: "/country-guide-china",
  name: "China",
  kicker: "World Coffee Guide",
  lede: "Most of China's arabica is the catimor variety, with a relatively light body, medium acidity and potential for high sweetness. Flavours tend to be cream, chocolate and fruits with light-coloured flesh. Coffee grown in Hainan and Fujian is typically robusta.",
  flag: {
    src: "/images/675337_7dc0b827c2e041fdb40b3bbd28be6e6d~mv2.png",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Beijing" },
    { label: "Coffee in Mandarin", value: "Ka fei" },
    { label: "Population", value: "1.41 billion (World Bank, 2025)" },
    { label: "Production", value: "114,000 tonnes / 1.9 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Catimor, with Typica, Bourbon and a growing specialty mix" },
    { label: "Typical cup", value: "Light body, medium acidity, cream, chocolate, pale-flesh fruit" },
  ],
  mapPoints: [
    { id: "beijing", name: "Beijing", kind: "capital", coordinates: [116.3913, 39.9057], label: "left" },
    { id: "puer", name: "Pu'er", kind: "city", coordinates: [100.8784, 23.2949] },
    { id: "shanghai", name: "Shanghai", kind: "port", coordinates: [121.47, 31.2313], label: "left" },
  ],
  insetLabel: "Yunnan arabica",
  legendArabica: "Arabica (Yunnan)",
  legendRobusta: "Robusta (Hainan, Fujian)",
  regionsCaption:
    "Yunnan still accounts for about 98% of China’s crop. Pu'er, Baoshan, Dehong and Lincang are the four arabica prefectures USDA names. Hainan and Fujian are the robusta leftover.",
  regions: [
    {
      id: "baoshan",
      number: 1,
      name: "Baoshan",
      species: "arabica",
      altitude: "1,000–1,700 m",
      season: "Dec–Jan",
      notes: "Yunnan. About a quarter of the Yunnan crop. Catimor country, dry and bright.",
    },
    {
      id: "puer",
      number: 2,
      name: "Pu'er",
      species: "arabica",
      altitude: "1,300–2,000 m",
      season: "Nov–Jan",
      notes: "Largest Yunnan volume, around two fifths of the provincial crop.",
    },
    {
      id: "dehong",
      number: 3,
      name: "Dehong",
      species: "arabica",
      altitude: "1,000–2,000 m",
      season: "Dec–Jan",
      notes: "Includes Ruili. Hotter, lower, and one of the older commercial planting belts.",
    },
    {
      id: "lincang",
      number: 4,
      name: "Lincang",
      species: "arabica",
      altitude: "1,000–1,800 m",
      season: "Nov–Jan",
      notes: "Fourth Yunnan prefecture. Smaller than Pu'er and Baoshan, now on the USDA list.",
    },
    {
      id: "hainan",
      number: 5,
      name: "Hainan",
      species: "robusta",
      altitude: "Low, island",
      season: "Oct–Dec",
      notes: "Robusta. Tiny next to Yunnan. The two coastal origins are a few percent of national output.",
    },
    {
      id: "fujian",
      number: 6,
      name: "Fujian",
      species: "robusta",
      altitude: "500–1,500 m",
      season: "Oct–Dec",
      notes: "Robusta. Mapped as the whole province; farms are a fraction of that polygon.",
    },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Chinese coffees are not yet at the highest standard, although it's getting easier to find good single origins. Farmers are experimenting more with different [processing methods](/archive/coffee-processing-methods-from-cherry-to-green-bean), with many now adopting the [honey process](/archive/coffee-processing-the-honey-process) to add variation to what was mostly washed.

In 2016, as much as 50% of the harvest was wasted through poor practices but now companies like [Torch House](http://www.torchcoffee.asia/), [Hani](http://hanicoffee.com/), the [Yunnan Coffee Traders](http://ynct.co/) and the [Coffee Association of Yunnan](http://www.yunnancoffee.org/) are helping the local communities massively in their processing.

Most coffee is grown in Yunnan, the south western region of China rich in minority groups. Coffee is also grown in Hainan and Fujian but this tends to be low quality robusta. Rubber, pineapple and jackfruit trees are used as shade.

As with coffee producing countries around the world, climate change is having an impact. Farmers are seeing wilder swings in temperatures with frost sometimes killing crops and exceptionally hot days decreasing yields. Although Yunnan has an unusual climate for its latitude due to the great rifts of the Himalayas and air currents, it too is not safe from the rapidly changing climate.

The majority is [Catimor](/archive/coffee-varieties-a-brief-look-at-significant-varieties) - the Caturra-Timor hybrid. Before it had been Typica and Bourbon but this changed because, with the encouragement of large multinationals, it has good rust-resistance and yields high. One farmer I spoke with told me some are finding natural mutations of the Catimor, with one they called purple for its colour. She said it tasted sweeter than other Catimors but yield was lower and the trees also died more easily.

More recently farmers have been experimenting with specialty varieties like Pacamara, Maragogype and even Geisha, a variety becoming incredibly famous in China for its delicate tea-like flavours. With much focus on soil enrichment too there should be some exciting, if not expensive, Chinese coffees appearing in the next few years.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Yunnan does not sort coffee into a national grade that you will see on a specialty menu the way Costa Rica puts SHB on a sack. The better lots are sold by mill, variety and a cup score. Catimor is still most of the trees. Pacamara and Geisha are the experiments.

Hainan and Fujian robusta is a different, lower commercial coffee. It is not the Yunnan arabica people mean when they talk about Chinese single origin.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `French missionaries [brought coffee to China](https://www.freshcup.com/yunnan-coffee/) but it took a good hundred years for it to be grown on any scale. [Since 2009](http://www.ico.org/documents/cy2014-15/icc-115-7e-study-china.pdf) coffee production has soared and since 2013 more has been staying for in-country consumption. A lot of that coffee used to leave for Hamburg. Most of it is roasted in China now. USDA has the country at about 1.9 million bags.

Today, Starbucks and Nestlé oversee a lot of the industry, in some ways keeping a large portion at the commercial grade. Luckin now has more shops than Starbucks in China, and both keep opening. Instant still does a huge amount of the actual drinking. In 2016, specialty Chinese coffee shops were bidding high for the [best lots in Panama](http://auction.stoneworks.com/PA2016/final_results.php).`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `What was very fringe is now a fast-growing coffee culture. The young, middle class are curious and culturally quite separate from the elder tea-drinking generations. But this is only for the larger, more prominent metropolises such as Shanghai, [Beijing](/archive/city-cafe-guide-coffee-in-beijing), Guangzhou, Shenzhen, Chengdu, [Wuhan](/archive/city-cafe-guide-coffee-in-wuhan), Nanjing and a handful more.

The majority of China's coffee drinkers consume instant but there was a big increase in specialty coffee shops in 2016. Single origin, pour over coffees have become particularly popular, especially from Panama and Ethiopia, because of the more tea-like flavours and the showy price tag of Geishas. Wet-hulled Mandhelings are also highly consumed, the tastes and flavours representing the Chinese idea of traditional coffee.

Many independent coffee shops are minimalist in style, with colours of concrete and brown. Most offer a good selection of specialty coffees and well-made desserts. They look set to follow western and northern European coffee cultures. Local commercial coffee chains are large and look more rustic, serving Chinese-style western food. Coffee and food quality is generally low here.

In Pu'er, southern Yunnan, there are some who drink Pu'er tea mixed with whole coffee beans. Pu'er tea is very famous throughout China for its distinctive taste and unique processing method. It has overripe fruit and earthy flavours, a heavy body and balanced sweetness. With coffee it can mix well, adding a complementing bitter-sweet taste.`,
    },
  ],
  gallery: [
    { src: "/images/675337_6ba4e5ad1ed040409e4e34c2b58d017c~mv2.jpg", alt: "Coffee in China" },
    { src: "/images/675337_e8cecb111c6d4be78b9ed8dd51e94847~mv2.jpg", alt: "Yunnan coffee landscape" },
    { src: "/images/675337_eba960ce49db4a48b28f21a28f753b65~mv2.jpg", alt: "Coffee cherries in China" },
    { src: "/images/675337_6a6a246f6a96455e9d4c47ffc61848f6~mv2.jpg", alt: "Chinese coffee production" },
  ],
};
