"use client";

import React from "react";

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
    img: "/placeholder.svg?height=400&width=600",
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
    img: "/placeholder.svg?height=400&width=600",
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
    img: "/placeholder.svg?height=400&width=600",
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
    img: "/placeholder.svg?height=400&width=600",
    rating: 4.5,
    duration: "7 days / 6 nights",
    priceINR: 106000,
    desc: "Snorkeling, reef cruise, marine wildlife spotting.",
    stay: "3-star reef motel near Cairns",
    transport: "Airport transfer + boat tours",
  },
];

export default function Packages() {
  const [activePack, setActivePack] = React.useState<Package | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [isCustomMode, setIsCustomMode] = React.useState(false);
  const [customDetails, setCustomDetails] = React.useState({
    name: "Custom Tour",
    priceINR: "",
    duration: "",
    location: "",
    category: "",
    stay: "",
    transport: "",
    desc: "",
  });

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const closeModal = () => {
    setActivePack(null);
    setIsCustomMode(false);
    setQuantity(1);
    setCustomDetails({
      name: "Custom Tour",
      priceINR: "",
      duration: "",
      location: "",
      category: "",
      stay: "",
      transport: "",
      desc: "",
    });
  };

  const cards = packagesData.map((p) => (
    <div
      key={p.id}
      className="bg-gray-700 rounded p-4 hover:shadow-lg transition-shadow mb-4"
    >
      <img
        src={p.img}
        alt={p.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <div className="info">
        <h3 className="text-xl mb-2">{p.name}</h3>
        <p className="text-sm mb-2">
          {p.duration} • ₹{p.priceINR.toLocaleString("en-IN")} per person
        </p>
        <div className="rating text-yellow-500">⭐ {p.rating}</div>
      </div>
    </div>
  ));

  return (
    <section className="py-12 bg-gray-800 text-white">
      <div className="secContainer container">
        <h2 className="text-3xl mb-6">Our Featured Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards}
        </div>

        {activePack && (
          <div className="mt-8 p-6 bg-white bg-opacity-20 rounded-lg text-black">
            <h3 className="text-2xl mb-4">Package Details</h3>
            <p><strong>Selected:</strong> {activePack.name}</p>
            <button
              onClick={closeModal}
              className="mt-4 btn"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </section>
  );
}