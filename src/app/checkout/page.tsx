import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PaymentGateway = dynamic(
  () => import("@/components/payment/PaymentGateway")
);

export const metadata: Metadata = {
  title: "Secure Checkout | Kerith Travels",
  description: "Complete your Kerith Travels booking securely.",
};

function GatewayFallback() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
      <div className="glass h-[28rem] w-full animate-pulse rounded-[30px]" />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="relative min-h-screen bg-ink text-cream">
      <div className="pt-24">
        <Suspense fallback={<GatewayFallback />}>
          <PaymentGateway />
        </Suspense>
      </div>
    </main>
  );
}
