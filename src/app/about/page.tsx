import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import About from "@/components/about";
import ReviewsGallery from "@/components/reviews-gallery";
import Subscribe from "@/components/subscribe";

export const metadata: Metadata = {
  title: "About us | Kerith Travels",
  description:
    "A small team with a big map — how Kerith Travels plans trips, what we promise, and the road so far.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Kerith"
        title="A small team with"
        accent="a big map"
        lede="We build trips the way we'd want them — slow mornings, honest travel times, local guides who actually live there, and no herding."
        image="/images/static/banftrip.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />
      <About />
      <ReviewsGallery />
      <Subscribe />
    </>
  );
}
