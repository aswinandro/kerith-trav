import React from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/Loader"));
const Hero = dynamic(() => import("@/components/hero"));
const Middle = dynamic(() => import("@/components/middle"));
const Destinations = dynamic(() => import("@/components/destinations"));
const Packages = dynamic(() => import("@/components/packages"));
const Reviews = dynamic(() => import("@/components/reviews"));
const Subscribe = dynamic(() => import("@/components/subscribe"));

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ink text-cream">
      <Loader />
      <Hero />
      <Middle />
      <Destinations />
      <Packages />
      <Reviews />
      <Subscribe />
    </main>
  );
}
