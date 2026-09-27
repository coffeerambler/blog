import type { CountryGuide } from "@/data/country-guides/types";
import { USDA_COFFEE_CIRCULAR_MD } from "@/lib/usda";

export const rwandaGuide: CountryGuide = {
  slug: "country-guide-rwanda",
  path: "/country-guide-rwanda",
  name: "Rwanda",
  kicker: "World Coffee Guide",
  lede: "Bourbon, washed, small lots from the hills around the Western and Southern provinces. Nyamasheke, Huye, Nyamagabe. The good cups are red fruit, citrus and tea. The crop is small. Potato defect is a real risk, not a rumour, and a reason some buyers still hedge.",
  flag: {
    src: "/images/flags/rwanda.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Kigali" },
    { label: "Coffee in Kinyarwanda", value: "Ikawa" },
    { label: "Population", value: "14.6 million (World Bank, 2025)" },
    { label: "Production", value: "About 16,500 tonnes / 275,000 60-kg bags (USDA PSD, 2024/25)" },
    { label: "Main varieties", value: "Bourbon (and Bourbon descendants)" },
    { label: "Typical cup", value: "Red fruit, citrus, black tea; clean when the station is careful" },
  ],
  mapPoints: [
    { id: "kigali", name: "Kigali", kind: "capital", coordinates: [30.0619, -1.9441] },
    { id: "huye", name: "Huye", kind: "city", coordinates: [29.739, -2.5967], label: "left" },
  ],
  regionsCaption:
    "District polygons. Western and Southern districts carry most of the crop. Rwanda is landlocked, so there is no export port on this map. Arabica only.",
  regions: [
    { id: "nyamasheke", number: 1, name: "Nyamasheke", species: "arabica", altitude: "1,500–2,000 m", season: "Mar–Jul", notes: "Lake Kivu. A lot of the stations people chase." },
    { id: "rusizi", number: 2, name: "Rusizi", species: "arabica", altitude: "1,400–1,900 m", season: "Mar–Jul", notes: "Southwest, toward the Congo border." },
    { id: "huye", number: 3, name: "Huye", species: "arabica", altitude: "1,500–2,000 m", season: "Mar–Jul", notes: "Southern province. Huye is the old Butare." },
    { id: "nyamagabe", number: 4, name: "Nyamagabe", species: "arabica", altitude: "1,600–2,100 m", season: "Mar–Jul", notes: "High south. Nyungwe is next door." },
    { id: "nyaruguru", number: 5, name: "Nyaruguru", species: "arabica", altitude: "1,600–2,100 m", season: "Mar–Jul", notes: "Far south. Small." },
    { id: "gakenke", number: 6, name: "Gakenke", species: "arabica", altitude: "1,600–2,100 m", season: "Mar–Jul", notes: "Northern hills. Bourbon gardens." },
    { id: "nyabihu", number: 7, name: "Nyabihu", species: "arabica", altitude: "1,700–2,200 m", season: "Mar–Jul", notes: "Northwest, volcanoes. High and cool." },
    { id: "rutsiro", number: 8, name: "Rutsiro", species: "arabica", altitude: "1,500–2,000 m", season: "Mar–Jul", notes: "Kivu shore, north of Nyamasheke." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Fully washed at a station is the Rwandan specialty story. Cherry is delivered, sorted, pulped, fermented, washed in channels, dried on raised beds. The station name is often more useful than the district.

Naturals and honeys exist. They are still the exception.

Potato defect, from a bacteria in the cherry, gives a raw-potato smell in the cup. It is not unique to Rwanda, but Rwanda and [Burundi](/country-guide-burundi) are where buyers talk about it. Sorting helps. It does not make the risk zero. I would rather say that than pretend every lot is clean.

USDA does not give Rwanda its own line in ${USDA_COFFEE_CIRCULAR_MD}. The PSD series has about 275,000 bags in 2024/25. That is smaller than [Kenya](/country-guide-kenya).`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Belgian colonial planting put Bourbon on the hills. After 1994 the industry had to be rebuilt. Washing stations and cupping competitions, including the Cup of Excellence years, are how specialty Rwanda got a name.

The National Agricultural Export Development Board still sits over the trade. Most farms are tiny. The kilos have never been the story. The cup can be.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Ikawa is drunk, often black and strong, or as a sweet café coffee in Kigali. The specialty scene in the capital will talk about Nyamasheke in the same way a London bar would. Most of the good lots still leave.

Kigali is landlocked. Export goes out through Mombasa or Dar. That is logistics rather than a tasting note, but it is why a Rwandan lot can wait around before it ships.

If you visit a station in harvest, go early. The sorting tables tell you more than the cupping room.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/rwanda/rwanda-01-maraba-drying.jpg",
      alt: "Raised drying beds at Maraba",
    },

    {
      src: "/images/country/rwanda/rwanda-03-cuppers.jpg",
      alt: "Cupping table in Rwanda",
    },
    {
      src: "/images/country/rwanda/rwanda-06-maraba-chute.jpg",
      alt: "Washing-station chute at Maraba",
    },
  ],
};
