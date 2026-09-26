import React from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/Loader"));
const NavBar = dynamic(() => import("@/components/navbar"));
const Hero = dynamic(() => import("@/components/hero"));
const Middle = dynamic(() => import("@/components/middle"));
const Destinations = dynamic(() => import("@/components/destinations"));
const Reviews = dynamic(() => import("@/components/reviews"));
const Packages = dynamic(() => import("@/components/packages"));
const Questions = dynamic(() => import("@/components/questions"));
const Subscribe = dynamic(() => import("@/components/subscribe"));
const Footer = dynamic(() => import("@/components/footer"));
const FloatingButtons = dynamic(() => import("@/components/floating-buttons"));

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ink text-cream">
      <Loader />
      <NavBar />
      <Hero />
      <Middle />
      <Destinations />
      <Packages />
      <Reviews />
      <Questions />
      <Subscribe />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
