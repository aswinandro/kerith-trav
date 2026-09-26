import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import Packages from "@/components/packages";
import Subscribe from "@/components/subscribe";

export const metadata: Metadata = {
  title: "Packages | Kerith Travels",
  description:
    "Curated tour packages with flights, stays and transfers included — filter by style and open one for the full day-by-day itinerary.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Featured tours"
        title="Journeys curated"
        accent="end to end"
        lede="Flights, stays, transfers and the little extras — priced per person, zero hidden fees. Open any package for the day-by-day plan."
        image="/images/static/popular2.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Packages" }]}
      />
      <Packages />
      <Subscribe />
    </>
  );
}
