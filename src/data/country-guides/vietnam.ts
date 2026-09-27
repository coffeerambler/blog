import type { CountryGuide } from "@/data/country-guides/types";

export const vietnamGuide: CountryGuide = {
  slug: "country-guide-vietnam",
  path: "/country-guide-vietnam",
  name: "Vietnam",
  kicker: "World Coffee Guide",
  lede: "The second-largest coffee origin on earth, and almost all of it is robusta from the Central Highlands. Đắk Lắk, Gia Lai, Đắk Nông. The arabica that specialty talks about is a smaller pile: Cầu Đất in Lâm Đồng, Sơn La in the north, a little Khe Sanh. The drink most people actually have is cà phê sữa đá.",
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
    "Province polygons. Lâm Đồng is mapped as arabica because Cầu Đất / Đà Lạt is the specialty story; robusta is grown there too. Đắk Lắk is the robusta heart, with Buôn Ma Thuột in the middle of it.",
  regions: [
    { id: "daklak", number: 1, name: "Đắk Lắk", species: "robusta", altitude: "300–800 m", season: "Nov–Jan", notes: "Buôn Ma Thuột. Most of the kilos." },
    { id: "lamdong", number: 2, name: "Lâm Đồng", species: "arabica", altitude: "1,200–1,700 m", season: "Nov–Feb", notes: "Cầu Đất and Đà Lạt. Arabica at height; robusta lower down." },
    { id: "gialai", number: 3, name: "Gia Lai", species: "robusta", altitude: "400–800 m", season: "Nov–Jan", notes: "Central Highlands robusta, north of Đắk Lắk." },
    { id: "daknong", number: 4, name: "Đắk Nông", species: "robusta", altitude: "400–800 m", season: "Nov–Jan", notes: "Split from Đắk Lắk. Same belt." },
    { id: "kontum", number: 5, name: "Kon Tum", species: "robusta", altitude: "500–900 m", season: "Nov–Jan", notes: "Northern edge of the highlands." },
    { id: "sonla", number: 6, name: "Sơn La", species: "arabica", altitude: "1,000–1,500 m", season: "Nov–Jan", notes: "Northwest. Arabica on steep gardens." },
    { id: "quangtri", number: 7, name: "Quảng Trị", species: "arabica", altitude: "500–1,200 m", season: "Nov–Jan", notes: "Khe Sanh. Small, named, not the national crop." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Robusta here is usually wet-processed in the Vietnamese sense: pulped, washed or semi-washed, then dried hard. A lot of it is polished. The cup is heavy and bitter-sweet, which is what cà phê sữa đá wants, and what soluble factories want.

Arabica at Cầu Đất is often fully washed, sometimes honey. Sơn La can be too. The highland lots are a cleaner cup than the robusta, with tea and stone fruit when they are good. They are not a [Kenya](/country-guide-kenya), and they are not trying to be.

USDA's 2026/27 forecast is a record 32.5 million bags, almost all robusta. That is why Vietnam sits next to [Brazil](/country-guide-brazil) in every price conversation.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `The French planted arabica, then robusta took over because it survived at lower altitude and yielded. After Đổi Mới the Central Highlands filled with smallholders and Vietnam became the robusta origin. That happened in a generation. It is the production story of the late twentieth century.

Buôn Ma Thuột is the coffee town. Hải Phòng and Ho Chi Minh City are the ports that move it. Hanoi is the capital and a café city of a different kind.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Cà phê sữa đá is the drink: robusta, condensed milk, ice. Egg coffee in Hanoi is a tourist cup now, and also a real one. Phin filters sit on glasses across the country.

Saigon and Hanoi have specialty bars that roast Lâm Đồng and imported Ethiopia. They are not the volume. The volume is the phin and the sữa đá.

I like a good Cầu Đất washed lot. I also like sữa đá when it is made with decent robusta and not just bitterness. They are different drinks. Vietnam is large enough to be both.`,
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
