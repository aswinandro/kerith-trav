"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiHome, FiRefreshCw, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { getPayPalOrderDetails } from "@/services/paypalPayment";

type OrderDetails = {
  id?: string;
  payer?: {
    name?: { given_name?: string; surname?: string };
    email_address?: string;
  };
  purchase_units?: Array<{
    payments?: {
      captures?: Array<{
        id?: string;
        amount?: { value?: string; currency_code?: string };
      }>;
    };
  }>;
};

type State =
  | { type: "loading" }
  | { type: "success"; data: OrderDetails }
  | { type: "error"; message: string };

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<State>({ type: "loading" });

  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    getPayPalOrderDetails(token)
      .then((data) => {
        if (!cancelled) {
          if (data) setState({ type: "success", data });
          else setState({ type: "error", message: "Failed to retrieve order details." });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ type: "error", message: "Failed to retrieve order details." });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const view: State = !token
    ? { type: "error", message: "Missing PayPal token in the return URL." }
    : state;

  const order = view.type === "success" ? view.data : null;
  const payer = order?.payer;
  const capture = order?.purchase_units?.[0]?.payments?.captures?.[0];

  return (
    <div className="grid min-h-[75vh] place-items-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="glass w-full max-w-lg rounded-[30px] p-10 text-center"
      >
        {view.type === "loading" && (
          <>
            <span className="mx-auto block h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-amber" />
            <h1 className="display mt-6 text-3xl text-cream">
              Processing payment…
            </h1>
            <p className="lede mt-3">Hang tight — this only takes a moment.</p>
          </>
        )}

        {view.type === "success" && (
          <>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-jade/40 bg-jade/10 text-jade">
              <FiCheckCircle size={30} />
            </span>
            <h1 className="display mt-6 text-3xl text-cream">
              Payment received
            </h1>
            <p className="lede mt-4">
              Thank you — your booking is confirmed and a confirmation email is
              on its way.
            </p>

            <dl className="mt-7 space-y-3 text-left text-sm">
              {payer?.name && (
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt className="text-cream/50">Payer</dt>
                  <dd className="text-cream">
                    {payer.name.given_name} {payer.name.surname}
                  </dd>
                </div>
              )}
              {payer?.email_address && (
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt className="text-cream/50">Email</dt>
                  <dd className="text-cream">{payer.email_address}</dd>
                </div>
              )}
              {capture?.amount && (
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt className="text-cream/50">Amount</dt>
                  <dd className="text-cream">
                    {capture.amount.value} {capture.amount.currency_code}
                  </dd>
                </div>
              )}
              {capture?.id && (
                <div className="flex justify-between">
                  <dt className="text-cream/50">Capture ID</dt>
                  <dd className="truncate pl-4 text-cream/80">{capture.id}</dd>
                </div>
              )}
            </dl>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={`/payment/review?token=${encodeURIComponent(token ?? "")}`}
                className="btn btn-primary"
              >
                View receipt
              </Link>
              <Link href="/" className="btn btn-ghost">
                <FiHome size={16} /> Go to home
              </Link>
            </div>
          </>
        )}

        {view.type === "error" && (
          <>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-coral/40 bg-coral/10 text-coral">
              <FiXCircle size={30} />
            </span>
            <h1 className="display mt-6 text-3xl text-cream">Payment failed</h1>
            <p className="lede mt-4">{view.message}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/#packages" className="btn btn-primary">
                <FiRefreshCw size={16} /> Try again
              </Link>
              <Link href="/" className="btn btn-ghost">
                <FiHome size={16} /> Go to home
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
