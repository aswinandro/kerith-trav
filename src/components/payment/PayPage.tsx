"use client";

import React, { useMemo, useState } from "react";
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
  FiInfo,
} from "react-icons/fi";
import { packagesData } from "@/data/packages";
import { initiatePhonePePayment } from "@/services/paymentService";
import { initiatePayPalPayment } from "@/services/paypalPayment";
import TermsModal from "@/components/payment/TermsModal";

type Gateway = "phonepe" | "paypal";
type FormState = { name: string; email: string; address: string };
type Errors = Partial<Record<keyof FormState | "amount", string>>;

const GATEWAYS: Array<{
  type: Gateway;
  label: string;
  currency: "INR" | "USD";
  hint: string;
  icon: React.ReactNode;
}> = [
  {
    type: "phonepe",
    label: "PhonePe / UPI / Cards",
    currency: "INR",
    hint: "Charged in ₹ INR · phonepe checkout",
    icon: <SiPhonepe size={22} />,
  },
  {
    type: "paypal",
    label: "PayPal",
    currency: "USD",
    hint: "Charged in $ USD · paypal checkout",
    icon: <SiPaypal size={22} />,
  },
];

export default function PayPage() {
  const searchParams = useSearchParams();
  const pkgId = Number(searchParams.get("pkg"));
  const qty = Math.min(12, Math.max(1, Number(searchParams.get("qty")) || 1));

  const selectedPackage = useMemo(
    () => packagesData.find((p) => p.id === pkgId) || null,
    [pkgId]
  );

  const [gateway, setGateway] = useState<Gateway>("phonepe");
  const [draft, setDraft] = useState<{ key: string; value: string } | null>(null);
  const [amountUSD, setAmountUSD] = useState("");
  const [form, setForm] = useState<FormState>({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState("");

  const pkgKey = selectedPackage ? `${selectedPackage.id}:${qty}` : "";
  const packageINR = selectedPackage ? String(selectedPackage.priceINR * qty) : "";
  const amountINR = draft?.key === pkgKey ? draft.value : packageINR;
  const setAmountINR = (value: string) => setDraft({ key: pkgKey, value });

  const active = GATEWAYS.find((g) => g.type === gateway)!;
  const amountValue = gateway === "phonepe" ? amountINR : amountUSD;
  const numericAmount = Number(amountValue);

  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Name is required";
    if (!/^\S+@\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (form.address.trim().length < 6) next.address = "Address is required";
    if (!amountValue || !Number.isFinite(numericAmount) || numericAmount < 1) {
      next.amount = `Enter an amount of at least ${active.currency === "INR" ? "₹1" : "$1"}`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFailure("");
    if (!agreed || !validate()) return;

    const commonPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      quantity: selectedPackage ? qty : 1,
      packageName: selectedPackage ? selectedPackage.name : "Custom payment",
    };

    setSubmitting(true);
    try {
      if (gateway === "phonepe") {
        const response = await initiatePhonePePayment({
          ...commonPayload,
          merchantOrderId: `TX${Date.now()}`,
          amount: Math.round(numericAmount * 100),
          redirectUrl: `${window.location.origin}/payment/success`,
          failureRedirectUrl: `${window.location.origin}/payment/error`,
          packageDetails: selectedPackage
            ? JSON.stringify(selectedPackage)
            : undefined,
        });

        if (response?.redirectUrl) {
          window.location.href = response.redirectUrl;
          return;
        }
        setFailure("PhonePe could not start the payment. Please try again.");
      } else {
        const response = await initiatePayPalPayment({
          ...commonPayload,
          amount: Number(numericAmount.toFixed(2)),
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

  const symbol = active.currency === "INR" ? "₹" : "$";

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-cream/55 transition hover:text-amber-2"
      >
        <FiArrowLeft size={15} /> Back to home
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <form onSubmit={handleSubmit} className="glass rounded-[30px] p-7 md:p-9">
          <span className="eyebrow">Secure payment</span>
          <h1 className="display mt-5 text-3xl text-cream md:text-4xl">
            Make a<span className="gradient-text italic"> payment</span>
          </h1>
          <p className="lede mt-4">
            Pick a gateway and pay — each one runs on its own checkout, so the
            amount you enter is what gets charged.
          </p>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/50">
              Payment gateway
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {GATEWAYS.map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => setGateway(option.type)}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    gateway === option.type
                      ? "border-amber bg-amber/10 text-cream"
                      : "border-white/12 bg-black/20 text-cream/65 hover:border-white/25"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={gateway === option.type ? "text-amber-2" : "text-cream/60"}
                    >
                      {option.icon}
                    </span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </span>
                  <span className="mt-2 block text-[11px] uppercase tracking-[0.14em] text-cream/45">
                    {option.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <label
              htmlFor="amount"
              className="text-[11px] uppercase tracking-[0.2em] text-cream/50"
            >
              Amount to pay ({active.currency})
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cream/45">
                {symbol}
              </span>
              <input
                id="amount"
                type="number"
                min={1}
                step="0.01"
                inputMode="decimal"
                className="field !pl-9"
                placeholder={active.currency === "INR" ? "10000" : "150"}
                aria-label={`Amount in ${active.currency}`}
                value={amountValue}
                onChange={(e) =>
                  gateway === "phonepe"
                    ? setAmountINR(e.target.value)
                    : setAmountUSD(e.target.value)
                }
              />
            </div>
            {errors.amount ? (
              <p className="mt-1.5 text-xs text-coral">{errors.amount}</p>
            ) : (
              <p className="mt-2 flex items-start gap-2 text-xs text-cream/45">
                <FiInfo size={13} className="mt-0.5 shrink-0" />
                No currency conversion — PhonePe bills in ₹ INR, PayPal in $ USD.
              </p>
            )}
          </div>

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
            className={`btn btn-primary mt-7 w-full ${!agreed || submitting ? "opacity-60" : ""}`}
          >
            <FiLock size={16} />
            {submitting
              ? "Redirecting…"
              : `Pay ${symbol}${
                  amountValue
                    ? Number(amountValue).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })
                    : "0"
                } ${active.currency}`}
          </button>

          <p className="mt-4 text-center text-xs text-cream/40">
            Payments are encrypted end-to-end. We never store card details.
          </p>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-ink-3">
            {selectedPackage ? (
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
            ) : (
              <div className="border-b border-white/10 p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-amber-2">
                  Pay anytime
                </p>
                <h2 className="display mt-2 text-2xl text-cream">
                  Direct payment
                </h2>
                <p className="mt-2 text-sm text-cream/55">
                  No trip selected — the amount above is what we&apos;ll charge.
                </p>
              </div>
            )}

            <dl className="space-y-3 p-6 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-cream/50">Gateway</dt>
                <dd className="flex items-center gap-2 text-cream">
                  <span className="text-amber-2">{active.icon}</span>
                  {active.type === "phonepe" ? "PhonePe" : "PayPal"}
                </dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-cream/50">Currency</dt>
                <dd className="text-cream">{active.currency}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-cream/50">Travellers</dt>
                <dd className="text-cream">{selectedPackage ? qty : "—"}</dd>
              </div>
              <div className="flex items-end justify-between pt-1">
                <dt className="text-cream/50">Total</dt>
                <dd className="display gradient-text text-3xl">
                  {symbol}
                  {amountValue
                    ? Number(amountValue).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })
                    : "0"}
                </dd>
              </div>
            </dl>

            <div className="border-t border-white/10 p-6">
              <ul className="space-y-2.5 text-sm text-cream/60">
                <li className="flex gap-2">
                  <span className="text-jade">✓</span> Each gateway has its own
                  checkout URL
                </li>
                <li className="flex gap-2">
                  <span className="text-jade">✓</span> No exchange-rate markups
                </li>
                <li className="flex gap-2">
                  <span className="text-jade">✓</span> 24/7 on-trip support
                </li>
              </ul>
            </div>
          </div>

          {!selectedPackage && (
            <Link
              href="/#packages"
              className="btn btn-ghost mt-4 w-full justify-center"
            >
              Browse packages instead
            </Link>
          )}
        </aside>
      </div>

      <AnimatePresence>
        {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      </AnimatePresence>
    </div>
  );
}
