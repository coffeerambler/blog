import type { CountryGuide } from "@/data/country-guides/types";

export const vietnamGuide: CountryGuide = {
  slug: "country-guide-vietnam",
  path: "/country-guide-vietnam",
  name: "Vietnam",
  kicker: "World Coffee Guide",
  lede: "Vietnamese robusta is heavy and bittersweet, with dark chocolate and an earthy depth that stands up well to condensed milk. Vietnam is the world's second-largest coffee producer, and almost all of it is robusta from the Central Highlands. There is a much smaller amount of arabica too, mainly from Cầu Đất near Đà Lạt and from Sơn La in the north, which can be clean and tea-like.",
  flag: {
    src: "/images/flags/vietnam.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Hanoi" },
    { label: "Coffee in Vietnamese", value: "Cà phê" },
    { label: "Population", value: "101.6 million (World Bank, 2025)" },
    { label: "Production", value: "1.95 million tonnes / 32.5 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Robusta clones; Catimor, Typica and Bourbon in the arabica pockets" },
    { label: "Typical cup", value: "Robusta: heavy, earthy, bitter-sweet. Highland arabica: cleaner, tea and stone fruit" },
  ],
  mapPoints: [
    { id: "hanoi", name: "Hanoi", kind: "capital", coordinates: [105.8342, 21.0278] },
    { id: "buonmathuot", name: "Buôn Ma Thuột", kind: "city", coordinates: [108.05, 12.6667] },
    { id: "haiphong", name: "Hải Phòng", kind: "port", coordinates: [106.6881, 20.8449] },
  ],
  legendArabica: "Arabica (Lâm Đồng, Sơn La, Quảng Trị)",
  legendRobusta: "Robusta (Đắk Lắk, Gia Lai, Đắk Nông, Kon Tum)",
  regionsCaption:
    "The map uses the provinces as they were before July 2025, which are still the names on most coffee bags. Since then Đắk Nông has joined Lâm Đồng, Kon Tum has joined Quảng Ngãi, Gia Lai has absorbed Bình Định and Đắk Lắk has absorbed Phú Yên. Lâm Đồng is coloured as arabica because of Cầu Đất and Đà Lạt, though a lot of robusta grows there too, and Đắk Lắk, around Buôn Ma Thuột, is the heart of the robusta belt.",
  regions: [
    { id: "daklak", number: 1, name: "Đắk Lắk", species: "robusta", altitude: "300–800 m", season: "Nov–Jan", notes: "Around Buôn Ma Thuột, which grows more coffee than anywhere else in the country." },
    { id: "lamdong", number: 2, name: "Lâm Đồng", species: "arabica", altitude: "1,200–1,700 m", season: "Oct–Jan", notes: "Arabica high up around Cầu Đất and Đà Lạt, with robusta lower down." },
    { id: "gialai", number: 3, name: "Gia Lai", species: "robusta", altitude: "400–800 m", season: "Nov–Jan", notes: "Central Highlands robusta, north of Đắk Lắk." },
    { id: "daknong", number: 4, name: "Đắk Nông", species: "robusta", altitude: "400–800 m", season: "Nov–Jan", notes: "The same robusta belt, now part of Lâm Đồng." },
    { id: "kontum", number: 5, name: "Kon Tum", species: "robusta", altitude: "500–900 m", season: "Nov–Jan", notes: "The northern edge of the highlands, now part of Quảng Ngãi." },
    { id: "sonla", number: 6, name: "Sơn La", species: "arabica", altitude: "1,000–1,500 m", season: "Nov–Jan", notes: "Arabica on steep gardens in the north-west." },
    { id: "quangtri", number: 7, name: "Quảng Trị", species: "arabica", altitude: "500–1,200 m", season: "Nov–Jan", notes: "A small arabica area around Khe Sanh." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most Vietnamese robusta is [natural](/archive/the-dry-process-an-introduction-to-natural-coffees), or dry processed. Whole cherries are spread out on patios, tarpaulins or even the roadside to dry in the sun, then hulled to remove the dried fruit and husk. Some is wet-polished before export to clean up the look of the bean. The result is a heavy, bittersweet coffee, which is exactly what cà phê sữa đá needs, and what the instant coffee factories want.

A small but growing number of farms now pick robusta ripe and process it with care, and these fine robustas can be surprisingly sweet and chocolatey.

The arabica from Cầu Đất is often [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean), and sometimes honey processed, as is some of the coffee from Sơn La. These highland lots are a much cleaner cup than the robusta, with tea and stone fruit when they are good. They will not taste like a [Kenya](/country-guide-kenya), but they are well worth trying.

USDA forecasts a record 32.5 million bags for 2026/27, almost all of it robusta. That is why Vietnam sits next to [Brazil](/country-guide-brazil) in every conversation about coffee prices.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Vietnamese robusta is graded by screen size and by the share of black, broken and foreign material in a sample. The two grades you will see most are:

Grade 1 — screen 16, with low limits for defects

Grade 2 — screen 13, with higher limits for defects

There are larger screen 18 lots as well. Arabica is sold more like specialty coffee elsewhere, by region and cup score, and a good Cầu Đất lot will usually carry its farm or processor name rather than a grade.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `French missionaries brought arabica to Vietnam in the nineteenth century, and the colonial government later planted robusta, which coped better with the heat and disease at lower altitudes and gave far bigger harvests. The plantations were small by today's standards, and war held the industry back for much of the twentieth century.

Everything changed after the Đổi Mới reforms of 1986, which allowed private farming and trade. Smallholders and migrants moved into the Central Highlands and planted robusta on a huge scale, and within a generation Vietnam went from a minor producer to the second-largest in the world. It is one of the biggest changes in coffee production of the last century.

Buôn Ma Thuột is the coffee capital and hosts a coffee festival. Most of the coffee leaves through Ho Chi Minh City and Hải Phòng, while Hanoi, the capital, has a café culture all of its own.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Cà phê sữa đá is the national drink, strong robusta dripped through a small metal phin filter over sweetened condensed milk and poured over ice. You will find phin filters sitting on glasses in cafés all over the country. In Hanoi, egg coffee, whipped egg yolk and sugar over strong coffee, has become popular with tourists, but locals have been drinking it since the 1940s. Coconut coffee and salt coffee are well worth trying too.

Saigon and Hanoi also have specialty cafés that roast arabica from Lâm Đồng alongside imported Ethiopian and Kenyan coffees, though they are still a small part of how people drink coffee here.

I really like a good washed Cầu Đất, but I also love a cà phê sữa đá when it is made with decent robusta rather than just bitterness. They are completely different drinks, and Vietnam does both well.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/vietnam/vietnam-02-lamdong-cherries.jpg",
      alt: "Ripe arabica cherries on the tree in Lâm Đồng",
    },

    {
      src: "/images/country/vietnam/vietnam-03-lamdong-robusta-process.jpg",
      alt: "Coffee cherry on a drying bed in Lâm Đồng",
    },
    {
      src: "/images/country/vietnam/vietnam-04-baoloc-harvest.jpg",
      alt: "Picking coffee cherries in Bảo Lộc, Lâm Đồng",
    },
  ],
};
