import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import Questions from "@/components/questions";
import Subscribe from "@/components/subscribe";

export const metadata: Metadata = {
  title: "FAQ | Kerith Travels",
  description:
    "How we pick destinations, pricing, changes and cancellations, visas and insurance — answered before you ask.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Good to know"
        title="Frequently asked"
        accent="questions"
        lede="Everything travellers ask us before booking — pricing, timing, changes, paperwork. Still curious? The form on this page reaches a trip designer directly."
        image="/images/static/bg.svg"
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <Questions />
      <Subscribe />
    </>
  );
}
