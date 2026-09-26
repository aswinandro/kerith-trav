export interface ItineraryDay {
  day: number;
  title: string;
  detail: string;
}

export interface Package {
  id: number;
  slug: string;
  name: string;
  location: string;
  category: string;
  img: string;
  rating: number;
  duration: string;
  priceINR: number;
  desc: string;
  stay: string;
  transport: string;
  highlights: string[];
  includes: string[];
  itinerary: ItineraryDay[];
}

export const packagesData: Package[] = [
  {
    id: 1,
    slug: "paris-getaway",
    name: "Paris, France",
    location: "Île-de-France",
    category: "Heritage & Romance",
    img: "/images/static/tripparis.jpg",
    rating: 4.8,
    duration: "6 days / 5 nights",
    priceINR: 132000,
    desc: "Explore Eiffel Tower, Louvre, Montmartre and a slow Seine cruise — with a day trip to Versailles.",
    stay: "4-star central Paris hotel",
    transport: "Airport transfer + daily metro pass",
    highlights: ["Eiffel Tower at sunset", "Louvre skip-the-line", "Versailles gardens"],
    includes: ["Return flights", "5 nights breakfast stay", "All airport transfers", "Versailles entry + guide"],
    itinerary: [
      { day: 1, title: "Arrival & Seine lights", detail: "Private transfer in, evening river walk past a lit-up Eiffel Tower." },
      { day: 2, title: "Louvre & Tuileries", detail: "Skip-the-line museum morning, garden afternoon, Marais dinner." },
      { day: 3, title: "Montmartre & Sacré-Cœur", detail: "Artist lanes, a café stop at Place du Tertre, cabaret night option." },
      { day: 4, title: "Versailles day trip", detail: "Train out to the palace, gardens and the Trianon estates." },
      { day: 5, title: "Free day & farewell cruise", detail: "Shop the Grands Boulevards, then dinner aboard a Seine boat." },
      { day: 6, title: "Departure", detail: "Transfer to CDG after a final boulangerie breakfast." },
    ],
  },
  {
    id: 2,
    slug: "dubai-escape",
    name: "Dubai, UAE",
    location: "Dubai Emirate",
    category: "Luxury & Desert",
    img: "/images/static/tripdubai.jpg",
    rating: 4.7,
    duration: "5 days / 4 nights",
    priceINR: 65000,
    desc: "Burj Khalifa, red-dune safari, dhow dinner cruise and the best shopping in the Gulf.",
    stay: "4-star hotel with breakfast",
    transport: "Airport transfer + private AC minivan",
    highlights: ["Burj Khalifa 124th floor", "Desert safari with BBQ", "Dhow cruise at Marina"],
    includes: ["Return flights", "4 nights with breakfast", "Desert safari + BBQ dinner", "Burj Khalifa tickets"],
    itinerary: [
      { day: 1, title: "Arrival & Marina skyline", detail: "Check in, Dhow dinner cruise along Dubai Marina." },
      { day: 2, title: "Downtown & Burj Khalifa", detail: "At the Top observation deck, Dubai Mall fountain show." },
      { day: 3, title: "Desert safari", detail: "Dune bashing, camel ride, sandboarding and a BBQ night under stars." },
      { day: 4, title: "Old Dubai & souks", detail: "Abra crossing, spice and gold souks, afternoon at leisure." },
      { day: 5, title: "Departure", detail: "Transfer to DXB after a late checkout." },
    ],
  },
  {
    id: 3,
    slug: "phuket-islands",
    name: "Phuket, Thailand",
    location: "Andaman Sea",
    category: "Beach & Adventure",
    img: "/images/static/phuket.webp",
    rating: 4.6,
    duration: "5 days / 4 nights",
    priceINR: 59000,
    desc: "Phi Phi islands, snorkelling, beach days and old-town nightlife on the Andaman coast.",
    stay: "Beachside resort",
    transport: "Airport pickup + shared van transfers",
    highlights: ["Phi Phi speedboat", "Snorkel at Maya Bay", "Old Phuket night market"],
    includes: ["Return flights", "4 nights beachside stay", "Phi Phi island tour", "Daily breakfast"],
    itinerary: [
      { day: 1, title: "Arrival & beach evening", detail: "Transfer to the resort, sunset walk on Kata beach." },
      { day: 2, title: "Phi Phi island tour", detail: "Speedboat hop, snorkel stops, lunch on the sand." },
      { day: 3, title: "James Bond & Phang Nga", detail: "Limestone karst cruise with sea-canoe caves." },
      { day: 4, title: "Old town & free time", detail: "Sino-Portuguese lanes, street food, optional Thai massage." },
      { day: 5, title: "Departure", detail: "Transfer to HKT for your flight home." },
    ],
  },
  {
    id: 4,
    slug: "great-barrier-reef",
    name: "Great Barrier Reef, Australia",
    location: "Queensland",
    category: "Marine & Nature",
    img: "/images/static/tripreef.jpg",
    rating: 4.6,
    duration: "7 days / 6 nights",
    priceINR: 106000,
    desc: "Reef cruises, snorkelling with turtles and two nights in the Daintree rainforest.",
    stay: "3-star reef motel near Cairns",
    transport: "Airport transfer + boat tours",
    highlights: ["Outer reef cruise", "Green Island walk", "Rainforest night tour"],
    includes: ["Return flights", "6 nights with breakfast", "Outer reef day cruise", "Daintree transfer"],
    itinerary: [
      { day: 1, title: "Arrival in Cairns", detail: "Esplanade walk and lagoon swim." },
      { day: 2, title: "Outer reef cruise", detail: "Two snorkel dives, underwater observatory, lunch on board." },
      { day: 3, title: "Green Island", detail: "Coral walk, optional glass-bottom boat." },
      { day: 4, title: "Atherton Tablelands", detail: "Waterfalls, crater lakes and curtain fig trees." },
      { day: 5, title: "Daintree rainforest", detail: "Night walk for cassowaries and possums." },
      { day: 6, title: "Cape Tribulation", detail: "Where reef meets rainforest — beach time and croc cruise." },
      { day: 7, title: "Departure", detail: "Transfer to CNS." },
    ],
  },
  {
    id: 5,
    slug: "santorini-blue",
    name: "Santorini, Greece",
    location: "Cyclades",
    category: "Honeymoon & Slow Travel",
    img: "/images/static/santorini.jpg",
    rating: 4.9,
    duration: "6 days / 5 nights",
    priceINR: 144000,
    desc: "Caldera views in Oia, a catamaran cruise and volcanic hot springs in the Aegean.",
    stay: "Caldera-view boutique suite",
    transport: "Private transfers + ferry",
    highlights: ["Oia sunset point", "Catamaran cruise", "Red beach & hot springs"],
    includes: ["Return flights + ferry", "5 nights breakfast suite", "Private catamaran cruise", "Wine tasting"],
    itinerary: [
      { day: 1, title: "Arrival & Fira", detail: "Cliff-edge check-in, evening in Fira." },
      { day: 2, title: "Oia village", detail: "Blue domes, marble lanes, sunset at the castle." },
      { day: 3, title: "Catamaran day", detail: "Swim stops, hot springs, grilled lunch on deck." },
      { day: 4, title: "Wine & volcano", detail: "Assyrtiko tasting, optional hike to Nea Kameni." },
      { day: 5, title: "Red beach & Akrotiri", detail: "Ancient ruins then a long lunch by the water." },
      { day: 6, title: "Departure", detail: "Ferry and flight home." },
    ],
  },
  {
    id: 6,
    slug: "bali-escape",
    name: "Bali, Indonesia",
    location: "Bali",
    category: "Island & Culture",
    img: "/images/static/bali.webp",
    rating: 4.8,
    duration: "7 days / 6 nights",
    priceINR: 72000,
    desc: "Ubud terraces, Uluwatu sunset kecak, temple mornings and a Nusa Penida day trip.",
    stay: "4-star Ubud + Seminyak stays",
    transport: "Private driver throughout",
    highlights: ["Tegallalang terraces", "Uluwatu kecak dance", "Nusa Penida boat"],
    includes: ["Return flights", "3 nights Ubud + 3 Seminyak", "Private driver", "Temple & dance entries"],
    itinerary: [
      { day: 1, title: "Arrival in Ubud", detail: "Rice-field check-in, evening market stroll." },
      { day: 2, title: "Temples & waterfalls", detail: "Tirta Empul purification, Tegenungan falls." },
      { day: 3, title: "Tegallalang & coffee", detail: "Terrace walk, luwak coffee tasting." },
      { day: 4, title: "Move to Seminyak", detail: "Beach club afternoon, sunset cocktails." },
      { day: 5, title: "Nusa Penida", detail: "Kelingking beach and snorkel with mantas." },
      { day: 6, title: "Uluwatu sunset", detail: "Cliff temple, kecak fire dance, seafood dinner." },
      { day: 7, title: "Departure", detail: "Transfer to DPS." },
    ],
  },
  {
    id: 7,
    slug: "swiss-alps-rail",
    name: "Swiss Alps, Switzerland",
    location: "Interlaken & Lucerne",
    category: "Mountains & Rail",
    img: "/images/static/swissalps.webp",
    rating: 4.9,
    duration: "8 days / 7 nights",
    priceINR: 215000,
    desc: "Jungfraujoch, the Glacier Express and lake cruises — all on the Swiss Travel Pass.",
    stay: "4-star lakeside hotels",
    transport: "First-class rail pass + transfers",
    highlights: ["Jungfraujoch top of Europe", "Glacier Express", "Lucerne lake cruise"],
    includes: ["Return flights", "7 nights breakfast", "8-day first-class rail pass", "Alpine excursions"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich", detail: "Train to Lucerne, lakeside evening." },
      { day: 2, title: "Lucerne & Rigi", detail: "Chapel Bridge, cogwheel ascent for panorama views." },
      { day: 3, title: "Transfer to Interlaken", detail: "Lakeside town, Harder Kulm sunset funicular." },
      { day: 4, title: "Jungfraujoch", detail: "Rail to the Aletsch glacier — the top of Europe." },
      { day: 5, title: "Grindelwald & First", detail: "Cliff walk, optional first-flyer zipline." },
      { day: 6, title: "Glacier Express", detail: "Panoramic rail through 291 bridges and 91 tunnels." },
      { day: 7, title: "Zermatt & Matterhorn", detail: "Gornergrat railway for the classic peak view." },
      { day: 8, title: "Departure", detail: "Rail to Zurich airport." },
    ],
  },
  {
    id: 8,
    slug: "amalfi-coast",
    name: "Amalfi Coast, Italy",
    location: "Campania",
    category: "Coast & Food",
    img: "/images/static/tripalmafi.jpg",
    rating: 4.8,
    duration: "7 days / 6 nights",
    priceINR: 165000,
    desc: "Positano mornings, Ravello gardens and a boat day to Capri along the lemon cliffs.",
    stay: "Cliff-side 4-star with sea view",
    transport: "Flights + private transfers & ferries",
    highlights: ["Positano beach", "Ravello concerts", "Capri boat day"],
    includes: ["Return flights", "6 nights sea-view stay", "Private boat day to Capri", "Daily breakfast"],
    itinerary: [
      { day: 1, title: "Arrival in Naples", detail: "Transfer down the coast to Positano." },
      { day: 2, title: "Positano", detail: "Spiaggia Grande, boutiques, Aperol at golden hour." },
      { day: 3, title: "Capri by boat", detail: "Blue Grotto, Faraglioni rocks, Anacapri chairlift." },
      { day: 4, title: "Ravello", detail: "Villa Rufolo gardens and cliff-edge lunch." },
      { day: 5, title: "Amalfi town", detail: "Cathedral steps, paper museum, lemon grove tasting." },
      { day: 6, title: "Path of the Gods", detail: "Guided ridge hike ending in Nocelle." },
      { day: 7, title: "Departure", detail: "Transfer to Naples airport." },
    ],
  },
];

export const packageCategories = Array.from(
  new Set(packagesData.map((p) => p.category))
);

export function getPackage(idOrSlug: string | number) {
  return packagesData.find(
    (p) => p.slug === idOrSlug || String(p.id) === String(idOrSlug)
  );
}
