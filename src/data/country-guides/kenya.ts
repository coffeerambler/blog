import type { CountryGuide } from "@/data/country-guides/types";

export const kenyaGuide: CountryGuide = {
  slug: "country-guide-kenya",
  path: "/country-guide-kenya",
  name: "Kenya",
  kicker: "World Coffee Guide",
  lede: "Specialty Kenyan coffee often has a wine-like body, a bright acidity and blackcurrant flavour notes. The washed lots from Nyeri and Kirinyaga, on the slopes of Mount Kenya, are the ones most people have in mind, and the old SL28 and SL34 varieties still do most of the interesting work.",
  flag: {
    src: "/images/flags/kenya.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Nairobi" },
    { label: "Coffee in Swahili", value: "Kahawa" },
    { label: "Population", value: "57.5 million (World Bank, 2025)" },
    { label: "Production", value: "57,000 tonnes / 950,000 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "SL28, SL34, Ruiru 11, Batian, K7" },
    { label: "Typical cup", value: "Wine-like body, bright acidity, blackcurrant and plum" },
  ],
  mapPoints: [
    { id: "nairobi", name: "Nairobi", kind: "capital", coordinates: [36.8173, -1.289] },
    { id: "mombasa", name: "Mombasa", kind: "port", coordinates: [39.6672, -4.0505], label: "left" },
  ],
  regionsCaption:
    "The map shows the counties of the main coffee belt. Meru is shown together with Tharaka, Kisii with Nyamira and Kericho with Bomet. Kenya does not grow robusta at any scale.",
  regions: [
    { id: "nyeri", number: 1, name: "Nyeri", species: "arabica", altitude: "1,400–2,000 m", season: "Oct–Dec", notes: "In the central highlands, and often the most expensive lots at auction." },
    { id: "kirinyaga", number: 2, name: "Kirinyaga", species: "arabica", altitude: "1,300–1,900 m", season: "Oct–Dec", notes: "On the slopes of Mount Kenya, home to a lot of the SL28 people look for." },
    { id: "muranga", number: 3, name: "Murang'a", species: "arabica", altitude: "1,300–1,800 m", season: "Oct–Dec", notes: "Between Kiambu and Nyeri, where co-operatives still handle most of the cherry." },
    { id: "kiambu", number: 4, name: "Kiambu", species: "arabica", altitude: "1,400–1,800 m", season: "Oct–Dec", notes: "Closest to Nairobi, with estates and smallholders under pressure from the growing city." },
    { id: "embu", number: 5, name: "Embu", species: "arabica", altitude: "1,300–1,800 m", season: "Oct–Dec", notes: "The eastern slope of Mount Kenya, with a cup similar to Kirinyaga and often a lower price." },
    { id: "meru", number: 6, name: "Meru", species: "arabica", altitude: "1,400–2,000 m", season: "Oct–Dec", notes: "Shown with Tharaka, and some years harvested later than Nyeri." },
    { id: "machakos", number: 7, name: "Machakos", species: "arabica", altitude: "1,300–1,800 m", season: "Oct–Dec", notes: "Ukambani, which is drier than the mountain counties." },
    { id: "bungoma", number: 8, name: "Mount Elgon / Bungoma", species: "arabica", altitude: "1,500–2,200 m", season: "Oct–Dec", notes: "Western Kenya, with different soils and often a softer cup." },
    { id: "kisii", number: 9, name: "Kisii", species: "arabica", altitude: "1,400–1,900 m", season: "Oct–Dec", notes: "The Nyanza highlands, shown together with Nyamira." },
    { id: "kericho", number: 10, name: "Kericho", species: "arabica", altitude: "1,700–2,200 m", season: "Oct–Dec", notes: "Tea country that also grows coffee, shown together with Bomet." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Almost all of the coffee that matters here is [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean). Cherry is pulped at a factory, fermented in water, washed and dried on raised beds. Kenyan factories often ferment twice, once in the tank and again after a wash, which is a big part of why the acidity can feel so sharp and clean. Washed Kenya is the origin I think of when people talk about blackcurrant and plum. Naturals exist, but they are still the exception, and they are not what built the reputation.

[SL28 and SL34](/archive/coffee-varieties-a-brief-look-at-significant-varieties) were selected in the 1930s at Scott Laboratories. Ruiru 11 and Batian came later, bred so the trees could cope with leaf rust and still yield. You can often taste the difference when a lot is honest about what is in the bag. The older SL varieties are still what most people mean when they say a Kenyan tastes like blackcurrant.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Grading of Kenyan coffee is done by screen size, not by how the coffee tastes. The beans are shaken over screens and sorted into sizes. A larger bean is not necessarily a better cup, and I have had AB lots that beat the AA from the same factory. The sizes help a roast stay even, in the same way Supremo and Excelso do in [Colombia](/country-guide-colombia), and they are easy to misread on a menu.

AA — screens 17 and 18, the large bean

AB — screens 15 and 16

PB — peaberry, one round bean in the cherry instead of two

C, TT and T — smaller beans and the lower grades

E — elephant beans, often misshapen rather than a prize`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Missionaries planted coffee around the turn of the twentieth century. The British then built an estate industry, and after them a co-operative and auction system that is still how a lot of Kenyan coffee gets a price. Smallholders grow most of the crop now. The Nairobi auction, run with the Coffee Directorate, is where factories sell and exporters buy.

Kenya is a small origin, and USDA puts it at around 950,000 bags for 2026/27, while [Ethiopia](/country-guide-ethiopia) next door grows more than ten times that. Its reputation comes from the quality of the cup rather than the size of the harvest. I used a [light roasted Kenyan](/archive/water-for-coffee-part-ii-tasting-with-ph-in-mind) when testing water for this site, so we could focus on the water rather than the coffee. It shows up good water, bad water and over-extraction very clearly, which is why I keep coming back to it, and why a lot of roasters do too.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Tea is still the bigger drink. At a roadside kiosk you are more likely to be poured instant, or a dark roast with milk and sugar, than a Nyeri pour-over. Kahawa is hospitality, and it does not have to be the coffee that wins a cupping.

Nairobi has a proper specialty scene now. Independent bars talk about Nyeri and Kirinyaga in the same way a London bar would, and they have first pick of some lots that used to leave the country immediately. If you get the chance to visit a factory during harvest, go early. You can see the double fermentation in the tanks, which is the bit that never quite comes across on a tasting card.`,
    },
  ],
  gallery: [],
};
