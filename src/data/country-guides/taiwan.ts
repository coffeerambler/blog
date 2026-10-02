import type { CountryGuide } from "@/data/country-guides/types";
import { USDA_COFFEE_CIRCULAR_MD } from "@/lib/usda";

export const taiwanGuide: CountryGuide = {
  slug: "country-guide-taiwan",
  path: "/country-guide-taiwan",
  name: "Taiwan",
  kicker: "World Coffee Guide",
  lede: "High-grown Taiwanese coffee can be floral and delicate, with a tea-like finish that suits a country so well known for its oolong. Taiwan grows only a small amount of arabica, mostly in the central and southern mountains around Alishan, Gukeng, Dongshan and Nantou, and it drinks far more coffee than it grows.",
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
    `The map shows the counties and cities where coffee grows. Alishan is in Chiayi County rather than Chiayi city, Gukeng is in Yunlin, and Dongshan is in Tainan. USDA does not give Taiwan its own line in ${USDA_COFFEE_CIRCULAR_MD}.`,
  regions: [
    { id: "chiayi", number: 1, name: "Chiayi / Alishan", species: "arabica", altitude: "1,000–1,600 m", season: "Nov–Jan", notes: "The best-known name, with small, high-grown and expensive lots." },
    { id: "nantou", number: 2, name: "Nantou", species: "arabica", altitude: "700–1,400 m", season: "Nov–Jan", notes: "The central mountains, with farms at a range of altitudes." },
    { id: "yunlin", number: 3, name: "Yunlin / Gukeng", species: "arabica", altitude: "400–1,000 m", season: "Nov–Jan", notes: "Lower than Alishan, and a lot of the coffee served in local cafés." },
    { id: "tainan", number: 4, name: "Tainan / Dongshan", species: "arabica", altitude: "600–1,200 m", season: "Nov–Jan", notes: "Dongshan, one of the older coffee areas." },
    { id: "pingtung", number: 5, name: "Pingtung", species: "arabica", altitude: "200–1,000 m", season: "Nov–Jan", notes: "The warmer, lower south, with plots around Dawu and Taiwu." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `[Washed](/archive/coffee-processing-methods-from-cherry-to-green-bean) coffee is common in Taiwan, and so are honey and natural lots. The farms are small and the prices are high enough that farmers can afford to experiment, with careful picking and drying on raised beds. Many farmers also roast and sell their own coffee, often straight from a tasting room on the farm.

Typica and SL34 are grown widely, along with Bourbon and some Gesha, which turns up on menus here as it does everywhere else, rare and expensive. Tainong 1 is a Taiwanese arabica variety released by the government's agricultural research institute.

USDA does not list Taiwan in its circular. The Ministry of Agriculture's research institute puts the harvest at roughly 1,000 tonnes of green coffee a year, against more than 50,000 tonnes imported, so the production figure is best read as a rough guide rather than an exact bag count.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Taiwan grows too little coffee to have built an export grading system, so you will not see a grade like SHB or Grade 1 on a Taiwanese sack. Coffee is sold by place name, usually Alishan or Gukeng, along with the farm and the process.

Local competitions have become the closest thing to a grade. Taiwan holds national and county coffee competitions, and a high score or a winning lot can set the price for a whole farm's harvest. If there is a cup score on the bag, that is the most useful number to look for.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee first came to Taiwan in 1884, when the British trading firm Tait & Co. brought plants from Manila and planted them in Sanxia, near Taipei. The industry was really built under Japanese rule, from 1895 to 1945, when plantations were set up in the south and east of the island, including around Gukeng. After the war, coffee faded away as farmers moved to more profitable crops such as tea and betel nut.

It came back from the late 1990s, as café culture took off in Taiwan's cities and farmers in Gukeng and Alishan started planting coffee again. It has never become an export origin in the way [Colombia](/country-guide-colombia) is. What makes it interesting is that a country that imports almost everything it drinks also grows a little coffee high in the mountains, and sells it at home as Taiwanese coffee.

Alishan is tea country as well as coffee country, and some of its coffees really do seem to reach for a tea-like finish. That is what high-grown Typica tends to do here when it has been processed carefully.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Taipei is a café city, with hand-drip bars, light roasts and plenty of imported Ethiopian and Guatemalan coffee, sometimes served next to a cup from Alishan. Convenience-store coffee is also hugely popular, and 7-Eleven and FamilyMart sell enormous amounts of it, much as they do in Japan.

If you are interested in the origin itself, head south of Taipei to the tasting rooms in Chiayi and Nantou, ideally during the harvest. A Taiwanese lot will cost more than a Kenyan of the same score, because you are paying for a tiny farm and a home market willing to support it.`,
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
