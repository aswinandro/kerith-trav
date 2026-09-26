import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import Contact from "@/components/contact";
import Subscribe from "@/components/subscribe";

export const metadata: Metadata = {
  title: "Contact | Kerith Travels",
  description:
    "Talk to a trip designer — call, mail or send trip notes and get a drafted itinerary within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us where you're"
        accent="dreaming of"
        lede="A real trip designer reads every message. Call us, mail us, or send your dates and we'll draft an itinerary within 24 hours."
        image="/images/static/venice.webp"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <Contact />
      <Subscribe />
    </>
  );
}
