import type { CountryGuide } from "@/data/country-guides/types";
import { USDA_COFFEE_CIRCULAR_HREF } from "@/lib/usda";

export const burundiGuide: CountryGuide = {
  slug: "country-guide-burundi",
  path: "/country-guide-burundi",
  name: "Burundi",
  kicker: "World Coffee Guide",
  lede: "Bourbon from small gardens, washed at stations, often sold as Kayanza or Ngozi. The cups I like are bright, with red fruit and a bergamot edge. The crop is tiny, the hills are steep, and a lot of cherry still moves on foot. Next door to Rwanda, and easy to confuse with it on a menu.",
  flag: {
    src: "/images/flags/burundi.svg",
    alt: "",
  },
  facts: [
    { label: "Capital", value: "Gitega (political); Bujumbura (economic)" },
    { label: "Coffee in Kirundi", value: "Ikawa" },
    { label: "Population", value: "14.4 million (World Bank, 2025)" },
    { label: "Production", value: "About 9,000 tonnes / 150,000 60-kg bags (USDA PSD, 2024/25)" },
    { label: "Main varieties", value: "Bourbon" },
    { label: "Typical cup", value: "Bright, red fruit, bergamot and black tea when the station is clean" },
  ],
  mapPoints: [
    { id: "gitega", name: "Gitega", kind: "capital", coordinates: [29.9246, -3.4264] },
    { id: "bujumbura", name: "Bujumbura", kind: "city", coordinates: [29.3599, -3.3614], label: "left" },
  ],
  regionsCaption:
    "Province polygons. Kayanza and Ngozi are the names on a lot of specialty bags. Burundi is landlocked; Bujumbura sits on Lake Tanganyika. Arabica only.",
  regions: [
    { id: "kayanza", number: 1, name: "Kayanza", species: "arabica", altitude: "1,600–2,000 m", season: "Mar–Jul", notes: "The name people look for. Northern hills." },
    { id: "ngozi", number: 2, name: "Ngozi", species: "arabica", altitude: "1,600–2,000 m", season: "Mar–Jul", notes: "Next to Kayanza. Similar cup, similar altitude." },
    { id: "kirundo", number: 3, name: "Kirundo", species: "arabica", altitude: "1,400–1,800 m", season: "Mar–Jul", notes: "Far north. A bit lower." },
    { id: "muyinga", number: 4, name: "Muyinga", species: "arabica", altitude: "1,400–1,800 m", season: "Mar–Jul", notes: "Northeast. Volume more than fame." },
    { id: "gitega", number: 5, name: "Gitega", species: "arabica", altitude: "1,500–1,900 m", season: "Mar–Jul", notes: "Centre. The political capital is here." },
    { id: "muramvya", number: 6, name: "Muramvya", species: "arabica", altitude: "1,600–2,000 m", season: "Mar–Jul", notes: "West of Gitega. High." },
    { id: "karuzi", number: 7, name: "Karuzi", species: "arabica", altitude: "1,400–1,800 m", season: "Mar–Jul", notes: "East-central. Smaller on menus." },
    { id: "cibitoke", number: 8, name: "Cibitoke", species: "arabica", altitude: "1,400–1,900 m", season: "Mar–Jul", notes: "Northwest, toward the Congo border." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `Fully washed at a station, same family of method as Rwanda. Cherry in, parchment out, raised beds where they exist. The station and the washing-station code are the useful names. Kayanza on a bag often means the province, not one hillside.

Potato defect is the same conversation as in Rwanda. Sorting and cupping help, and you can still get the odd roast that smells like a pantry.

[The circular](${USDA_COFFEE_CIRCULAR_HREF}) lumps Burundi into Other. The PSD series has about 150,000 bags in 2024/25. That is half of Rwanda, and a fraction of [Ethiopia](/country-guide-ethiopia).`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee was a colonial cash crop here too. After independence it stayed the main export that smallholders actually grow. Political instability has knocked production around. The Bourbon in the ground is old. That is part of why the cups can be so bright, and part of why yields are not Brazil's.

Gitega is the political capital. Bujumbura is still where a lot of the trade sits, on the lake. Export still has to leave East Africa through someone else's port.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `Ikawa is hospitality. Sweet, dark, often instant in town. Specialty bars are fewer than in Kigali. The lots that cup well still leave.

If you only try one Burundi, try a washed Kayanza from a named station, roasted light enough to keep the bergamot. A muddy cup is usually the drying, not the Bourbon in the ground.`,
    },
  ],
  gallery: [
    {
      src: "/images/country/burundi/burundi-01-cherries-trees.jpg",
      alt: "Coffee cherries on the tree in Burundi",
    },

    {
      src: "/images/country/burundi/burundi-02-trees.jpg",
      alt: "Coffee under bananas in a Burundi garden",
    },
    {
      src: "/images/country/burundi/burundi-03-garden.jpg",
      alt: "Green and red cherries on a Burundi tree",
    },
    {
      src: "/images/country/burundi/burundi-04-close.jpg",
      alt: "Close cherries on a Burundi coffee tree",
    },
  ],
};
