"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { SiPhonepe, SiPaypal } from "react-icons/si";
import {
  FiLock,
  FiUser,
  FiMail,
  FiMapPin,
  FiArrowLeft,
  FiAlertCircle,
} from "react-icons/fi";
import { packagesData } from "@/data/packages";
import { initiatePhonePePayment, initiatePayPalPayment } from "@/services/paymentService";
import { getExchangeRate } from "@/services/currencyService";
import TermsModal from "@/components/payment/TermsModal";

const POPULAR_CURRENCIES = [
  "INR",
  "AED",
  "SAR",
  "KWD",
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "JPY",
  "CNY",
  "SGD",
  "THB",
  "ZAR",
  "PKR",
  "BDT",
];

type FormState = { name: string; email: string; address: string };
type Errors = Partial<Record<keyof FormState, string>>;

export default function PaymentGateway() {
  const searchParams = useSearchParams();
  const pkgId = Number(searchParams.get("pkg"));
  const qty = Math.min(12, Math.max(1, Number(searchParams.get("qty")) || 1));

  const selectedPackage = useMemo(
    () => packagesData.find((p) => p.id === pkgId) || null,
    [pkgId]
  );
  const totalINR = selectedPackage ? selectedPackage.priceINR * qty : 0;

  const [method, setMethod] = useState<"phonepe" | "paypal">("phonepe");
  const [currency, setCurrency] = useState("INR");
  const [rates, setRates] = useState<{
    currency: string;
    usd: number;
    display: number;
  } | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState("");

  useEffect(() => {
    if (method !== "paypal") return;
    let cancelled = false;
    (async () => {
      const [usd, display] = await Promise.all([
        getExchangeRate("INR", "USD"),
        getExchangeRate("INR", currency),
      ]);
      if (!cancelled && usd) {
        setRates({ currency, usd, display: display ?? usd });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [method, currency, totalINR]);

  const activeRates =
    method === "paypal" && rates?.currency === currency ? rates : null;

  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Name is required";
    if (!/^\S+@\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (form.address.trim().length < 6) next.address = "Address is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFailure("");
    if (!selectedPackage || !agreed || !validate()) return;

    const commonPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      quantity: qty,
      packageName: selectedPackage.name,
    };

    setSubmitting(true);
    try {
      if (method === "phonepe") {
        const response = await initiatePhonePePayment({
          ...commonPayload,
          merchantOrderId: `TX${Date.now()}`,
          amount: Math.round(totalINR * 100),
          redirectUrl: `${window.location.origin}/payment/success`,
          failureRedirectUrl: `${window.location.origin}/payment/error`,
        });

        if (response?.redirectUrl) {
          window.location.href = response.redirectUrl;
          return;
        }
        setFailure("PhonePe could not start the payment. Please try again.");
      } else {
        if (!activeRates?.usd) {
          setFailure("Currency conversion is not ready yet — try again in a moment.");
          return;
        }
        const response = await initiatePayPalPayment({
          ...commonPayload,
          amount: Number((totalINR * activeRates.usd).toFixed(2)),
        });

        if (response?.redirectUrl) {
          window.location.href = response.redirectUrl;
          return;
        }
        setFailure("PayPal could not start the payment. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setFailure("Something went wrong while starting your payment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedPackage) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-6">
        <div className="glass max-w-md rounded-[28px] p-10 text-center">
          <h1 className="display text-3xl text-cream">No trip selected</h1>
          <p className="lede mt-3">
            Pick a package first and we&apos;ll hold your price for 24 hours.
          </p>
          <Link href="/#packages" className="btn btn-primary mt-7">
            Browse packages
          </Link>
        </div>
      </div>
    );
  }

  const converted = activeRates
    ? Math.round(totalINR * activeRates.display)
    : null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
      <Link
        href="/#packages"
        className="inline-flex items-center gap-2 text-sm text-cream/55 transition hover:text-amber-2"
      >
        <FiArrowLeft size={15} /> Back to packages
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        {/* form */}
        <form onSubmit={handleSubmit} className="glass rounded-[30px] p-7 md:p-9">
          <span className="eyebrow">Secure checkout</span>
          <h1 className="display mt-5 text-3xl text-cream md:text-4xl">
            Complete your
            <span className="gradient-text italic"> booking</span>
          </h1>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/50">
              Payment method
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { type: "phonepe", label: "PhonePe / UPI / Cards", icon: <SiPhonepe size={22} /> },
                  { type: "paypal", label: "PayPal", icon: <SiPaypal size={22} /> },
                ] as const
              ).map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => setMethod(option.type)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                    method === option.type
                      ? "border-amber bg-amber/10 text-cream"
                      : "border-white/12 bg-black/20 text-cream/65 hover:border-white/25"
                  }`}
                >
                  <span className={method === option.type ? "text-amber-2" : "text-cream/60"}>
                    {option.icon}
                  </span>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {method === "paypal" && (
            <div className="mt-5">
              <label
                htmlFor="currency"
                className="text-[11px] uppercase tracking-[0.2em] text-cream/50"
              >
                Show prices in
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="field !pl-4 mt-2"
              >
                {POPULAR_CURRENCIES.map((c) => (
                  <option key={c} value={c} className="bg-ink-3">
                    {c}
                  </option>
                ))}
              </select>
              {converted !== null && currency !== "INR" && (
                <p className="mt-2 text-sm text-cream/60">
                  ≈{" "}
                  <span className="text-amber-2">
                    {converted.toLocaleString("en-IN")} {currency}
                  </span>{" "}
                  · charged in USD
                </p>
              )}
            </div>
          )}

          <div className="mt-8 space-y-4">
            <div className="relative">
              <FiUser
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
              />
              <input
                className="field !pl-11"
                placeholder="Full name"
                aria-label="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="mt-1.5 text-xs text-coral">{errors.name}</p>}
            </div>

            <div className="relative">
              <FiMail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
              />
              <input
                type="email"
                className="field !pl-11"
                placeholder="Email address"
                aria-label="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="mt-1.5 text-xs text-coral">{errors.email}</p>}
            </div>

            <div className="relative">
              <FiMapPin
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
              />
              <textarea
                rows={3}
                className="field !pl-11 !pt-3 resize-none"
                placeholder="Billing address"
                aria-label="Billing address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              {errors.address && (
                <p className="mt-1.5 text-xs text-coral">{errors.address}</p>
              )}
            </div>
          </div>

          <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-cream/65">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#ff8a1e]"
            />
            <span>
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-amber-2 underline underline-offset-4"
              >
                Terms & conditions
              </button>
              .
            </span>
          </label>

          {failure && (
            <p className="mt-5 flex items-start gap-2 rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral">
              <FiAlertCircle size={16} className="mt-0.5 shrink-0" />
              {failure}
            </p>
          )}

          <button
            type="submit"
            disabled={!agreed || submitting}
            className={`btn btn-primary mt-7 w-full ${(!agreed || submitting) ? "opacity-60" : ""}`}
          >
            <FiLock size={16} />
            {submitting
              ? "Redirecting…"
              : method === "paypal" && activeRates
                ? `Pay $${(totalINR * activeRates.usd).toFixed(2)} USD`
                : `Pay ₹${totalINR.toLocaleString("en-IN")}`}
          </button>

          <p className="mt-4 text-center text-xs text-cream/40">
            Payments are encrypted end-to-end. We never store card details.
          </p>
        </form>

        {/* summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-ink-3">
            <div className="relative aspect-[16/9]">
              <img
                src={selectedPackage.img}
                alt={selectedPackage.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-3 via-ink-3/20 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-amber-2">
                  {selectedPackage.category}
                </p>
                <h2 className="display text-2xl text-cream">
                  {selectedPackage.name}
                </h2>
              </div>
            </div>

            <dl className="space-y-3 p-6 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-cream/50">Duration</dt>
                <dd className="text-cream">{selectedPackage.duration}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-cream/50">Travellers</dt>
                <dd className="text-cream">{qty}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-cream/50">Per person</dt>
                <dd className="text-cream">
                  ₹{selectedPackage.priceINR.toLocaleString("en-IN")}
                </dd>
              </div>
              <div className="flex items-end justify-between pt-1">
                <dt className="text-cream/50">Total</dt>
                <dd className="display gradient-text text-3xl">
                  ₹{totalINR.toLocaleString("en-IN")}
                </dd>
              </div>
            </dl>

            <div className="border-t border-white/10 p-6">
              <ul className="space-y-2.5 text-sm text-cream/60">
                <li className="flex gap-2">
                  <span className="text-jade">✓</span> Free cancellation up to 30
                  days before departure
                </li>
                <li className="flex gap-2">
                  <span className="text-jade">✓</span> Visa & permit assistance
                  included
                </li>
                <li className="flex gap-2">
                  <span className="text-jade">✓</span> 24/7 on-trip support
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      </AnimatePresence>
    </div>
  );
}
