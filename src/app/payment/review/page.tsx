import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("@/components/navbar"));
const Footer = dynamic(() => import("@/components/footer"));
const PayPalReview = dynamic(() => import("@/components/payment/PayPalReview"));

export const metadata: Metadata = {
  title: "Review Payment | Kerith Travels",
};

export default function PaymentReviewPage() {
  return (
    <main className="relative min-h-screen bg-ink text-cream">
      <NavBar />
      <div className="pt-20">
        <Suspense
          fallback={
            <div className="mx-auto max-w-3xl px-6 py-14 md:px-10">
              <div className="glass h-96 w-full animate-pulse rounded-[30px]" />
            </div>
          }
        >
          <PayPalReview />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
