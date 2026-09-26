export interface Package {
  id: number;
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
}

export const packagesData: Package[] = [
  {
    id: 1,
    name: "Paris, France",
    location: "Île‑de‑France",
    category: "Heritage & Romance",
    img: "/images/svg/dest-paris.svg",
    rating: 4.8,
    duration: "6 days / 5 nights",
    priceINR: 132000,
    desc: "Explore Eiffel Tower, Louvre, Montmartre, Seine Cruise.",
    stay: "4-star central Paris hotel",
    transport: "Airport transfer + daily metro pass",
  },
  {
    id: 2,
    name: "Dubai, UAE",
    location: "Dubai Emirate",
    category: "Luxury & Desert",
    img: "/images/svg/dest-dubai.svg",
    rating: 4.7,
    duration: "5 days / 4 nights",
    priceINR: 65000,
    desc: "Burj Khalifa, desert safari, dhow cruise, shopping.",
    stay: "4-star hotel with breakfast",
    transport: "Airport transfer + private AC minivan",
  },
  {
    id: 3,
    name: "Phuket, Thailand",
    location: "Andaman Sea",
    category: "Beach & Adventure",
    img: "/images/svg/dest-phuket.svg",
    rating: 4.6,
    duration: "5 days / 4 nights",
    priceINR: 59000,
    desc: "Phi Phi tour, snorkeling, beach days & nightlife.",
    stay: "Beachside resort",
    transport: "Airport pickup + shared van transfers",
  },
  {
    id: 4,
    name: "Great Barrier Reef, Australia",
    location: "Queensland",
    category: "Marine & Nature",
    img: "/images/svg/dest-reef.svg",
    rating: 4.5,
    duration: "7 days / 6 nights",
    priceINR: 106000,
    desc: "Snorkeling, reef cruise, marine wildlife spotting.",
    stay: "3-star reef motel near Cairns",
    transport: "Airport transfer + boat tours",
  },
];