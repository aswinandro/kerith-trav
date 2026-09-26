import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import DestinationsDirectory from "@/components/destinations-directory";

export const metadata: Metadata = {
  title: "Destinations | Kerith Travels",
  description:
    "Browse every destination Kerith Travels runs trips to — filter by region, season and budget, then open a place for full route notes.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Explore now"
        title="Find your next"
        accent="dream destination"
        lede="Twenty-four places across six continents, each with real seasonality, honest pricing and route notes from our own trip reports."
        image="/images/static/travel.png"
        crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
      />
      <section className="bg-ink py-14 md:py-20">
        <DestinationsDirectory />
      </section>
    </>
  );
}
