"use client";

import React from "react";
import { Package } from "../data/packages";

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
    <motion.div
      key={p.id}
      className="bg-gray-700 rounded p-4 hover:shadow-2xl transition-shadow mb-4 group"
      whileHover={{ scale: 1.02, shadow: "0 20px 40px rgba(0,0,0,0.5)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
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
    </motion.div>
  ));

  return (
    <section
      className="py-12 bg-gray-900 relative overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #141413 100%)" }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-96"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
        >
          <rect width="100" height="100" fill="url(#grad3)" />
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1a1a2e" />
              <stop offset="100%" style="stop-color:#141413" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="secContainer container mx-auto px-6 py-20">
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          style={{ color: "#fff" }}
        >
          Our Featured Tours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards}
        </div>

        {activePack && (
          <div
            className="mt-8 p-6 bg-white bg-opacity-20 rounded-lg text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
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