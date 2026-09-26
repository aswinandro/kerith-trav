import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import Reviews from "@/components/reviews";
import ReviewsGallery from "@/components/reviews-gallery";
import Subscribe from "@/components/subscribe";

export const metadata: Metadata = {
  title: "Reviews | Kerith Travels",
  description:
    "Real travel history from our clients — trip scores, postcards sent back and the 98% who would rebook.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="From our clients"
        title="Real travel history from"
        accent="beloved clients"
        lede="Choosing Kerith means choosing an enriching experience filled with unforgettable memories — and a team that answers at 3am."
        image="/images/static/happycustomer.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
      />
      <Reviews />
      <ReviewsGallery />
      <Subscribe />
    </>
  );
}
