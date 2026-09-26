"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiHome, FiPrinter, FiCheckCircle, FiLoader, FiFileText } from "react-icons/fi";
import {
  getPayPalOrderDetails,
  capturePayPalPayment,
} from "@/services/paypalPayment";
import { sendPaymentConfirmationEmail } from "@/services/mail";

type Review = {
  id?: string;
  status?: string;
  create_time?: string;
  payment_source?: { paypal?: { account_status?: string } };
  payer?: {
    name?: { given_name?: string; surname?: string };
    email_address?: string;
  };
  purchase_units?: Array<{
    description?: string;
    invoice_id?: string;
    amount?: { value?: string; currency_code?: string };
    payee?: { display_data?: { brand_name?: string } };
    items?: Array<{ name?: string }>;
  }>;
};

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-2/3 rounded bg-white/10" />
      <div className="h-3 w-full rounded bg-white/8" />
      <div className="h-3 w-5/6 rounded bg-white/8" />
      <div className="h-3 w-1/2 rounded bg-white/8" />
      <div className="h-28 w-full rounded-xl bg-white/6" />
    </div>
  );
}

export default function PayPalReview() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("token");

  const [review, setReview] = useState<Review | null>(null);
  const [fetched, setFetched] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null
  );
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;

    getPayPalOrderDetails(orderId)
      .then((data) => {
        if (!cancelled) setReview(data ?? null);
      })
      .catch((err) => console.error("Failed to fetch PayPal order:", err))
      .finally(() => {
        if (!cancelled) setFetched(true);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const loading = Boolean(orderId) && !fetched;

  const handleCapture = async () => {
    if (!orderId || capturing) return;
    setCapturing(true);
    setNotice(null);
    try {
      await capturePayPalPayment(orderId);
      setCaptured(true);
      setNotice({ kind: "ok", text: "Payment captured successfully." });

      try {
        await sendPaymentConfirmationEmail({
          customerEmail: review?.payer?.email_address || "",
          orderId: review?.id || orderId,
          orderDetailsHTML: receiptRef.current?.innerHTML || "<p>Receipt</p>",
        });
        setNotice({
          kind: "ok",
          text: "Payment captured — confirmation email sent.",
        });
      } catch (err) {
        console.error("Confirmation email failed:", err);
      }
    } catch (err) {
      console.error("Capture failed:", err);
      setNotice({
        kind: "err",
        text: "Could not capture this payment. Please contact support.",
      });
    } finally {
      setCapturing(false);
    }
  };

  const purchase = review?.purchase_units?.[0] || {};
  const item = purchase?.items?.[0] || {};
  const payer = review?.payer;
  const payee = purchase?.payee || {};
  const brand = payee?.display_data?.brand_name;

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 md:px-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-cream/55 transition hover:text-amber-2"
      >
        <FiHome size={15} /> Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="glass mt-6 overflow-hidden rounded-[30px]"
      >
        {/* header */}
        <div className="flex items-center gap-4 border-b border-white/10 bg-black/20 px-7 py-6">
          <img src="/images/svg/logo.svg" alt="" width={46} height={46} />
          <div>
            <h1 className="display text-xl text-cream">
              Kerith Travel &amp; Tourism
            </h1>
            <p className="text-xs uppercase tracking-[0.24em] text-amber-2">
              Travel · Secure · Simple
            </p>
          </div>
          <span className="ml-auto hidden rounded-full border border-white/15 px-3 py-1 text-[11px] tracking-wide text-cream/60 sm:block">
            {review?.status || "—"}
          </span>
        </div>

        <div className="p-7 md:p-9">
          {loading ? (
            <Skeleton />
          ) : !review ? (
            <div className="py-8 text-center">
              <h2 className="display text-2xl text-cream">
                Unable to retrieve order
              </h2>
              <p className="lede mt-3">
                We couldn&apos;t find that PayPal order. Check your email for
                the receipt, or contact support.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[11px] uppercase tracking-[0.22em] text-cream/50">
                Review payment details
              </p>

              {/* printable receipt */}
              <div ref={receiptRef} className="print-area mt-5">
                <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                  <div className="flex justify-between border-b border-white/10 pb-3 sm:block">
                    <dt className="text-cream/50">Order ID</dt>
                    <dd className="truncate pl-3 text-cream sm:pl-0">{review.id}</dd>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3 sm:block">
                    <dt className="text-cream/50">Created</dt>
                    <dd className="text-cream sm:mt-1">
                      {review.create_time
                        ? new Date(review.create_time).toLocaleString()
                        : "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3 sm:block">
                    <dt className="text-cream/50">Payer</dt>
                    <dd className="text-cream sm:mt-1">
                      {payer?.name?.given_name} {payer?.name?.surname}
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3 sm:block">
                    <dt className="text-cream/50">Email</dt>
                    <dd className="truncate pl-3 text-cream sm:pl-0 sm:mt-1">
                      {payer?.email_address}
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3 sm:block">
                    <dt className="text-cream/50">Item</dt>
                    <dd className="text-cream sm:mt-1">
                      {item?.name || purchase?.description || "Travel package"}
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3 sm:block">
                    <dt className="text-cream/50">Account status</dt>
                    <dd className="text-cream sm:mt-1">
                      {review.payment_source?.paypal?.account_status || "—"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex items-end justify-between rounded-2xl border border-white/12 bg-black/25 px-5 py-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cream/50">
                      Total{brand ? ` · ${brand}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-cream/45">
                      Invoice {purchase?.invoice_id || "n/a"}
                    </p>
                  </div>
                  <p className="display gradient-text text-3xl">
                    {purchase?.amount?.value} {purchase?.amount?.currency_code}
                  </p>
                </div>
              </div>

              {notice && (
                <p
                  className={`mt-5 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
                    notice.kind === "ok"
                      ? "border-jade/40 bg-jade/10 text-jade"
                      : "border-coral/40 bg-coral/10 text-coral"
                  }`}
                >
                  <FiCheckCircle size={16} />
                  {notice.text}
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                {!captured ? (
                  <button
                    type="button"
                    onClick={handleCapture}
                    disabled={capturing}
                    className="btn btn-primary"
                  >
                    {capturing ? (
                      <>
                        <FiLoader size={16} className="animate-spin" />{" "}
                        Confirming…
                      </>
                    ) : (
                      "Confirm payment"
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn btn-primary"
                    >
                      <FiPrinter size={16} /> Download receipt
                    </button>
                    <Link href="/" className="btn btn-ghost">
                      <FiHome size={16} /> Return home
                    </Link>
                  </>
                )}
                <span className="btn btn-ghost pointer-events-none opacity-70">
                  <FiFileText size={15} /> SSL secured
                </span>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
