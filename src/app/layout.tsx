import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingButtons from "@/components/floating-buttons";

export const metadata: Metadata = {
  title: "Kerith Travels | Tours, Trips & Adventures",
  description:
    "Kerith Travels crafts immersive journeys across the world — handpicked destinations, curated packages and adventures made for you.",
  keywords: [
    "travel",
    "tours",
    "adventure",
    "Kerith Travels",
    "holiday packages",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-ink text-cream antialiased">
        <NavBar />
        {children}
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
