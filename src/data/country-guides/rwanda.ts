import type { CountryGuide } from "@/data/country-guides/types";
import { USDA_COFFEE_CIRCULAR_MD } from "@/lib/usda";

export const rwandaGuide: CountryGuide = {
  slug: "country-guide-rwanda",
  path: "/country-guide-rwanda",
  name: "Rwanda",
  kicker: "World Coffee Guide",
  lede: "Rwandan coffees can be bright and juicy, with red fruit, citrus and a black tea finish when a washing station has taken care over them. Almost all of it is washed Bourbon grown by smallholders in the hills of the Western and Southern provinces, around Lake Kivu, Huye and Nyamagabe.",
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
    "The map shows the main coffee districts. Most of the crop comes from the Western and Southern provinces, along Lake Kivu and in the hills around Huye. Rwanda is landlocked, so there is no export port to show, and the coffee grown is arabica.",
  regions: [
    { id: "nyamasheke", number: 1, name: "Nyamasheke", species: "arabica", altitude: "1,500–2,000 m", season: "Mar–Jul", notes: "On the shore of Lake Kivu, home to many of the best-known washing stations." },
    { id: "rusizi", number: 2, name: "Rusizi", species: "arabica", altitude: "1,400–1,900 m", season: "Mar–Jul", notes: "The south-west corner, towards the Congo border." },
    { id: "huye", number: 3, name: "Huye", species: "arabica", altitude: "1,500–2,000 m", season: "Mar–Jul", notes: "Southern province, around the town once called Butare." },
    { id: "nyamagabe", number: 4, name: "Nyamagabe", species: "arabica", altitude: "1,600–2,100 m", season: "Mar–Jul", notes: "High in the south, next to Nyungwe forest." },
    { id: "nyaruguru", number: 5, name: "Nyaruguru", species: "arabica", altitude: "1,600–2,100 m", season: "Mar–Jul", notes: "A small district in the far south." },
    { id: "gakenke", number: 6, name: "Gakenke", species: "arabica", altitude: "1,600–2,100 m", season: "Mar–Jul", notes: "Northern hills with old Bourbon gardens." },
    { id: "nyabihu", number: 7, name: "Nyabihu", species: "arabica", altitude: "1,700–2,200 m", season: "Mar–Jul", notes: "High and cool, near the volcanoes of the north-west." },
    { id: "rutsiro", number: 8, name: "Rutsiro", species: "arabica", altitude: "1,500–2,000 m", season: "Mar–Jul", notes: "Further up the Kivu shore, north of Nyamasheke." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Most Rwandan coffee is [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean) at a washing station rather than on the farm. Smallholders pick their cherry and carry it to the station, where it is sorted, pulped, fermented and washed in long channels before drying on raised beds. Because each station takes in cherry from hundreds of farmers, the station name on a bag is often more useful than the district, and the good ones have built real reputations.

Natural and honey lots are made too, and some stations have become quite experimental, but they are still a small part of what Rwanda sells.

The thing you will hear about with Rwandan coffee is the potato defect. It gives an odd raw-potato smell to the occasional bean, and is linked to bacteria that get into the cherry where the antestia bug has damaged it. It is not unique to Rwanda, but Rwanda and [Burundi](/country-guide-burundi) are where buyers talk about it most. Careful sorting at the station helps a lot, though it cannot rule it out completely, and it is one reason the price of a good lot reflects so much hand work.

USDA does not give Rwanda its own line in ${USDA_COFFEE_CIRCULAR_MD}. Its PSD series puts the 2024/25 crop at about 275,000 bags, which is smaller than [Kenya](/country-guide-kenya) and a tiny share of the world's coffee.`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Rwandan coffee is graded by screen size and by the number of defects in a sample, rather than by altitude. The fully washed coffee is sorted into grades, with A1 the top export grade of large, clean beans, followed by lower grades with smaller beans or more defects. Peaberries are separated out and sold on their own.

As with other origins, the grade tells you about the beans rather than the flavour. Most specialty buyers cup every lot and buy by score and by washing station, so you will usually see a station name and a cup score on the bag rather than a grade.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `German missionaries brought coffee to Rwanda in the early twentieth century, and the Belgian colonial government later made smallholders plant it as a cash crop. That is how Bourbon came to be grown on so many small hillside plots. For decades most of it was sold as cheap, semi-washed coffee with little reward for quality.

The industry was devastated in 1994 and had to be rebuilt. In the early 2000s, development projects and the government backed new washing stations, and the number grew from a handful to hundreds. In 2008 Rwanda became the first African country to hold a Cup of Excellence competition, which brought specialty buyers to the country and gave farmers a reason to pick only ripe cherry.

The National Agricultural Export Development Board, NAEB, still oversees the trade. Most farms are still tiny, often just a few hundred trees, and it is the quality of the cup rather than the size of the harvest that has put Rwanda on the map.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Tea is still the more common drink in Rwanda, and as with most coffee producing countries, the best coffee is exported. Coffee drinking is growing though, particularly in Kigali, where there are now specialty cafés serving Rwandan coffee from named stations, and the baristas will talk about Nyamasheke and Huye just as a London café would.

Rwanda is landlocked, so coffee travels by road to Mombasa or Dar es Salaam before it is shipped. That adds time and cost, and it is one reason Rwandan lots can take a while to reach roasters after the harvest.

If you visit during the harvest, try to see a washing station early in the day. Watching the cherry being sorted by hand will tell you a lot about why a clean Rwandan coffee costs what it does.`,
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
