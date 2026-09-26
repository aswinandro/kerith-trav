import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PaymentSuccess = dynamic(
  () => import("@/components/payment/PaymentSuccess")
);

export const metadata: Metadata = {
  title: "Payment Status | Kerith Travels",
};

export default function PaymentSuccessPage() {
  return (
    <main className="relative min-h-screen bg-ink text-cream">
      <div className="pt-24">
        <Suspense
          fallback={
            <div className="grid min-h-[60vh] place-items-center">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-amber" />
            </div>
          }
        >
          <PaymentSuccess />
        </Suspense>
      </div>
    </main>
  );
}
