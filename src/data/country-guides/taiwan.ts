import type { CountryGuide } from "@/data/country-guides/types";
import { USDA_COFFEE_CIRCULAR_MD } from "@/lib/usda";

export const taiwanGuide: CountryGuide = {
  slug: "country-guide-taiwan",
  path: "/country-guide-taiwan",
  name: "Taiwan",
  kicker: "World Coffee Guide",
  lede: "Taiwan grows a small pile of arabica, mostly in the central mountains, and drinks a lot more than it grows. Alishan, Gukeng, Dongshan, Nantou. High-grown lots can be floral and tea-like. The rest of the cup in Taipei is imported.",
  flag: {
    src: "/images/flags/taiwan.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Taipei" },
    { label: "Coffee in Mandarin", value: "Ka fei" },
    { label: "Population", value: "23.3 million (MOI, year-end 2025)" },
    { label: "Production", value: "About 1,000 tonnes / 17,000 60-kg bags (MOA TARI, ~2024)" },
    { label: "Main varieties", value: "Typica, SL34, Bourbon, Gesha; Tainong 1" },
    { label: "Typical cup", value: "Tea-like, floral, citrus when high-grown; lower plots are milder" },
  ],
  mapPoints: [
    { id: "taipei", name: "Taipei", kind: "capital", coordinates: [121.5654, 25.033] },
    { id: "chiayi", name: "Chiayi", kind: "city", coordinates: [120.4491, 23.4801], label: "left" },
    { id: "kaohsiung", name: "Kaohsiung", kind: "port", coordinates: [120.3014, 22.6273], label: "left" },
  ],
  regionsCaption:
    `County and city polygons. Alishan is Chiayi County, not the city. Gukeng is Yunlin. Dongshan is Tainan. USDA does not give Taiwan its own line in ${USDA_COFFEE_CIRCULAR_MD}.`,
  regions: [
    { id: "chiayi", number: 1, name: "Chiayi / Alishan", species: "arabica", altitude: "1,000–1,600 m", season: "Nov–Mar", notes: "The name people know. High, expensive, small." },
    { id: "nantou", number: 2, name: "Nantou", species: "arabica", altitude: "700–1,400 m", season: "Nov–Mar", notes: "Central mountains. Mix of altitudes." },
    { id: "yunlin", number: 3, name: "Yunlin / Gukeng", species: "arabica", altitude: "400–1,000 m", season: "Nov–Feb", notes: "Gukeng. Lower than Alishan. A lot of domestic café coffee." },
    { id: "tainan", number: 4, name: "Tainan / Dongshan", species: "arabica", altitude: "600–1,200 m", season: "Nov–Feb", notes: "Dongshan. One of the older named belts." },
    { id: "pingtung", number: 5, name: "Pingtung", species: "arabica", altitude: "200–1,000 m", season: "Nov–Feb", notes: "South. Lower, warmer, some Dawu and Taiwu plots." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `[Washed](/archive/coffee-processing-methods-from-cherry-to-green-bean) coffee is common, and so are honey and natural lots, because the crop is small enough that people can experiment. Raised beds, careful picking, and prices that only work because Taipei will pay for a local story.

Tainong 1 is a Taiwanese arabica released by the agricultural research institute. Typica and SL34 are also grown. Gesha shows up on menus the way it does everywhere else: rare, expensive, and not necessarily the crop.

USDA does not list Taiwan in its circular. The Ministry of Agriculture's research institute talks about roughly 1,000 tonnes of green a year, against more than 50,000 tonnes imported. Treat the production number as an order of magnitude, not a USDA bag count.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee was planted under Japanese rule in the early twentieth century, then faded, then came back as a hillside crop once cafés took off. It never became an export origin in the [Colombia](/country-guide-colombia) sense. The interesting bit is domestic: a country that imports almost everything it drinks also grows a little, high up, and sells it as Taiwanese coffee.

Alishan is tea country that also grows coffee. That is why some of the cups taste like they are reaching for a tea finish. It is what high-grown Typica does here when the processing is clean.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Taipei is a café city. Hand-drip, light roasts, a lot of imported Ethiopia and Guatemala, sometimes next to some Alishan. Convenience-store coffee is also consumed in volume at shops like 7-Eleven and Family Mart, as it is in Japan.

If you are here for the origin, go south of Taipei. Visiting a tasting room in Chiayi and Nantou in harvest will tell you more. The lot will cost more than a Kenyan of the same score. You are paying for a tiny farm and a domestic market, not for a shipping advantage.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/taiwan/taiwan-05-gukeng-beans.jpg",
      alt: "Gukeng coffee beans, Yunlin",
    },

    {
      src: "/images/country/taiwan/taiwan-06-gukeng-shop.jpg",
      alt: "Baden Coffee shop in Gukeng",
    },
    {
      src: "/images/country/taiwan/taiwan-01-matsu-garden.jpg",
      alt: "Matsu coffee garden on a hillside",
    },
  ],
};
