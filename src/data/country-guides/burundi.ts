import type { CountryGuide } from "@/data/country-guides/types";
import { USDA_COFFEE_CIRCULAR_HREF } from "@/lib/usda";

export const burundiGuide: CountryGuide = {
  slug: "country-guide-burundi",
  path: "/country-guide-burundi",
  name: "Burundi",
  kicker: "World Coffee Guide",
  lede: "The Burundi coffees I like best are bright and sweet, with red fruit and a bergamot edge, a little like a good Earl Grey. Almost all of it is Bourbon from small gardens on steep hills, washed at stations and often sold under the names of the northern provinces, Kayanza and Ngozi. It sits right next to Rwanda, and the two are easy to confuse on a menu.",
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
    "The map shows the main coffee provinces. Kayanza and Ngozi in the north are the names you will see on most specialty bags. Burundi is landlocked, with Bujumbura on the shore of Lake Tanganyika, and the coffee grown is arabica.",
  regions: [
    { id: "kayanza", number: 1, name: "Kayanza", species: "arabica", altitude: "1,600–2,000 m", season: "Mar–Jul", notes: "Northern hills, and the name most buyers look for." },
    { id: "ngozi", number: 2, name: "Ngozi", species: "arabica", altitude: "1,600–2,000 m", season: "Mar–Jul", notes: "Next to Kayanza, with a similar cup and altitude." },
    { id: "kirundo", number: 3, name: "Kirundo", species: "arabica", altitude: "1,400–1,800 m", season: "Mar–Jul", notes: "The far north, a little lower." },
    { id: "muyinga", number: 4, name: "Muyinga", species: "arabica", altitude: "1,400–1,800 m", season: "Mar–Jul", notes: "The north-east, which grows a lot of coffee but is less well known." },
    { id: "gitega", number: 5, name: "Gitega", species: "arabica", altitude: "1,500–1,900 m", season: "Mar–Jul", notes: "The centre of the country, around the political capital." },
    { id: "muramvya", number: 6, name: "Muramvya", species: "arabica", altitude: "1,600–2,000 m", season: "Mar–Jul", notes: "High ground west of Gitega." },
    { id: "karuzi", number: 7, name: "Karuzi", species: "arabica", altitude: "1,400–1,800 m", season: "Mar–Jul", notes: "East-central, and seen less often on menus." },
    { id: "cibitoke", number: 8, name: "Cibitoke", species: "arabica", altitude: "1,400–1,900 m", season: "Mar–Jul", notes: "The north-west, towards the Congo border." },
  ],
  sections: [
    {
      id: "processes",
      title: "Common processes",
      markdown: `As in [Rwanda](/country-guide-rwanda), most Burundian coffee is [washed](/archive/coffee-processing-methods-from-cherry-to-green-bean) at a washing station. Farmers deliver cherry from their small gardens, often carrying it on foot or by bicycle, and the station pulps, ferments and washes it before drying the parchment on raised beds. A bag labelled Kayanza usually means the province rather than one hillside, so the station name is the more useful thing to look for.

Some stations now make natural and honey lots as well, and they can be lovely and fruity, but washed coffee is still most of what Burundi sells.

Burundi shares the potato defect with Rwanda. Careful sorting and cupping catch most of it, but every so often a bean slips through and a cup smells oddly of raw potato. It is worth knowing about, but it should not put you off the origin.

[The USDA circular](${USDA_COFFEE_CIRCULAR_HREF}) groups Burundi under "Other". Its PSD series puts the 2024/25 crop at around 150,000 bags, about half of Rwanda's and a tiny fraction of [Ethiopia](/country-guide-ethiopia).`,
    },
    {
      id: "grading",
      title: "Grading",
      markdown: `Burundian coffee is graded by screen size and defects. The fully washed coffee is sorted by bean size and the number of defects in a sample, with the larger, cleaner beans making the top export grades and peaberries sorted out on their own.

For specialty coffee, the grade matters less than the washing station and the cup score. A small lot from a good station that has been sorted carefully will usually be sold by name, and that is what is worth looking for.`,
    },
    {
      id: "history",
      title: "Historical development",
      markdown: `Coffee was introduced as a colonial cash crop in the early twentieth century, and under Belgian rule smallholders were required to grow it. After independence in 1962 it stayed the country's main export, and it is still grown by hundreds of thousands of small farmers rather than on large estates.

Civil war and political instability have knocked production around many times since. Many of the Bourbon trees in the ground are old, which helps explain why yields are low, but old Bourbon at altitude is also part of why the best Burundian coffees taste so bright and sweet.

Gitega became the political capital in 2019, while Bujumbura on Lake Tanganyika is still where much of the trade happens. As Burundi is landlocked, the coffee has to leave East Africa through someone else's port, usually Dar es Salaam or Mombasa.`,
    },
    {
      id: "culture",
      title: "Present-day coffee culture",
      markdown: `In Burundi, offering coffee is a sign of hospitality, though tea and instant coffee are what most people drink day to day. There are fewer specialty cafés than in Kigali, and as with most coffee producing countries, the best lots are exported.

If you only try one Burundian coffee, make it a washed Kayanza from a named station, roasted light enough to keep the bergamot. If a Burundi tastes muddy, the drying is usually to blame rather than the Bourbon itself.`,
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
