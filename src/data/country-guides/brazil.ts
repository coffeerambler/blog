import type { CountryGuide } from "@/data/country-guides/types";

export const brazilGuide: CountryGuide = {
  slug: "country-guide-brazil",
  path: "/country-guide-brazil",
  name: "Brazil",
  kicker: "World Coffee Guide",
  lede: "Brazil grows about two fifths of the world's coffee. Most of what you actually drink is a natural or pulped-natural arabica from Minas Gerais, or conilon robusta from Espírito Santo. The cup is usually chocolate, nut and low acidity. That is the point of it in a blend, and it is easy to write off as boring when it is just filling a bag.",
  flag: {
    src: "/images/flags/brazil.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Brasília" },
    { label: "Coffee in Portuguese", value: "Café" },
    { label: "Population", value: "212.8 million (World Bank, 2025)" },
    { label: "Production", value: "4.31 million tonnes / 71.9 million 60-kg bags (USDA, 2026/27)" },
    { label: "Main varieties", value: "Mundo Novo, Catuaí, Bourbon, Catucaí; conilon clones" },
    { label: "Typical cup", value: "Chocolate, nut, low acidity on naturals; washed lots are cleaner and less common" },
  ],
  mapPoints: [
    { id: "brasilia", name: "Brasília", kind: "capital", coordinates: [-47.8825, -15.7939] },
    { id: "varginha", name: "Varginha", kind: "city", coordinates: [-45.4303, -21.5516] },
    { id: "santos", name: "Santos", kind: "port", coordinates: [-46.3336, -23.9608], label: "left" },
  ],
  legendArabica: "Arabica (Minas, São Paulo, Bahia, Paraná)",
  legendRobusta: "Robusta / conilon (Espírito Santo, Rondônia)",
  regionsCaption:
    "State polygons. The farms sit in belts inside those states, not the whole polygon. USDA puts most arabica in Minas Gerais and most conilon in Espírito Santo.",
  regions: [
    { id: "minas", number: 1, name: "Minas Gerais", species: "arabica", altitude: "700–1,400 m", season: "May–Sep", notes: "Sul de Minas, Cerrado and Matas. Most of the arabica kilos." },
    { id: "saopaulo", number: 2, name: "São Paulo", species: "arabica", altitude: "800–1,300 m", season: "May–Sep", notes: "Mogiana. Older estates, close to the Santos road." },
    { id: "bahia", number: 3, name: "Bahia", species: "arabica", altitude: "700–1,200 m", season: "Jun–Oct", notes: "Chapada Diamantina and the western cerrado. Some of the better lots." },
    { id: "parana", number: 4, name: "Paraná", species: "arabica", altitude: "600–1,000 m", season: "May–Sep", notes: "Frost country. Smaller than it was." },
    { id: "espirito", number: 5, name: "Espírito Santo", species: "robusta", altitude: "Low–800 m", season: "Apr–Sep", notes: "Conilon. USDA says about 70% of the robusta crop." },
    { id: "rondonia", number: 6, name: "Rondônia", species: "robusta", altitude: "Low–400 m", season: "Apr–Aug", notes: "Amazon conilon. Volume, not a specialty story." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most Brazilian arabica is a [natural](/archive/the-dry-process-an-introduction-to-natural-coffees) or a pulped natural. Cherry dries on the patio, or it is pulped and the mucilage is left on. The climate in the Cerrado and Sul de Minas is dry enough at harvest that this works. You get body and chocolate. You also get the fermenty edge when the drying is slow or the pile is too deep.

Washed coffee exists. It is not the default. When a Minas lot is fully washed it can taste closer to a mild Central American than to the Brazil people expect in espresso.

Conilon is the robusta. It is stripped, dried and used in soluble and in the cheaper end of blends. USDA's 2026/27 split is about 47.5 million bags of arabica and 24.4 million of robusta, a record overall.

Screen size still shows up on bags: 17/18, 14/16. It is not a cup score, in the same way AA is not in [Kenya](/country-guide-kenya).`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee came in from French Guiana in the 1720s and became the crop that paid for a lot of the nineteenth-century economy. Rio, then São Paulo, then Paraná, then Minas as frost and soil exhaustion moved the belt. Santos was the port that named the grade.

Mechanisation is the bit that still surprises people who only know smallholder origins. Large farms in the Cerrado harvest with machines. That is why Brazil can move tens of millions of bags, and why a lot of it tastes even.

USDA has 2026/27 at 71.9 million bags, up on a rebound in Minas after a run of poor arabica years. [Vietnam](/country-guide-vietnam) is second, at about 32.5 million, almost all robusta. The two of them set the price of the drink more than anyone else.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Cafezinho is the everyday cup: small, hot, sweet, often from a blend that would not get a score on a tasting table. That is the drink. São Paulo and Belo Horizonte have specialty bars now, and they will talk about a Chapada lot the way a Melbourne bar would. At the padaria it is still cafezinho.

I use Brazil in espresso blends when I want chocolate and a round body without the brightness of a washed [Colombia](/country-guide-colombia). A single-origin natural from Sul de Minas can be more interesting than the blend coffee people dismiss. It is still Brazil: chocolate and nut, not the blackcurrant you get from a washed Kenya, and that is the cup it is.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/brazil/brazil-01-plantation-sunset.jpg",
      alt: "Coffee rows at sunset in Espírito Santo do Pinhal, São Paulo",
    },

    {
      src: "/images/country/brazil/brazil-03-cherries-hands.jpg",
      alt: "Hands holding coffee cherries and parchment beans",
    },
    {
      src: "/images/country/brazil/brazil-05-saopaulo-rows.jpg",
      alt: "São Paulo fazenda with a drying patio and planted hills",
    },
  ],
};
