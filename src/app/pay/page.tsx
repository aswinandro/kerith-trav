import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PayPage = dynamic(() => import("@/components/payment/PayPage"));

export const metadata: Metadata = {
  title: "Pay | Kerith Travels",
  description:
    "Choose PhonePe or PayPal and pay securely — each gateway on its own checkout, no currency conversion.",
};

function PayFallback() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="glass h-[32rem] w-full animate-pulse rounded-[30px]" />
        <div className="h-[24rem] w-full animate-pulse rounded-[30px] border border-white/10 bg-ink-3" />
      </div>
    </div>
  );
}

export default function PayRoute() {
  return (
    <main className="relative min-h-screen bg-ink text-cream">
      <div className="pt-24">
        <Suspense fallback={<PayFallback />}>
          <PayPage />
        </Suspense>
      </div>
    </main>
  );
}
