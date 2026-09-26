"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiX, FiCheckCircle } from "react-icons/fi";
import { revealIn } from "@/lib/gsap";

const TERMS = [
  "A 25% advance confirms your seat; the balance is due 21 days before departure.",
  "Free date changes up to 30 days before departure on most packages.",
  "Travel insurance is included on trips valued above ₹75,000 per person.",
  "Passports must be valid for at least six months beyond your return date.",
  "We follow a strict no-hidden-fees policy — every cost is shown at checkout.",
];

export default function Subscribe() {
  const root = useRef<HTMLElement>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const openTerms = useCallback(() => setShowTerms(true), []);
  const closeTerms = useCallback(() => setShowTerms(false), []);

  useEffect(() => {
    const cleanup = revealIn(root.current!);
    return () => cleanup?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeTerms();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeTerms]);

  return (
    <section
      ref={root}
      id="subscribe"
      className="relative overflow-hidden bg-ink py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(120%_120%_at_15%_0%,#2a1c3f_0%,#101427_45%,#0a0d18_100%)]">
          <img
            src="/images/svg/journey.svg"
            alt=""
            aria-hidden
            data-reveal
            className="pointer-events-none absolute -right-16 -top-10 hidden w-[30rem] opacity-70 md:block"
          />
          <img
            src="/images/svg/wave.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full object-cover opacity-30"
          />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <span className="eyebrow" data-reveal>
                Start your journey
              </span>
              <h2
                className="display mt-6 text-[clamp(2.1rem,4.4vw,3.5rem)] text-cream"
                data-reveal
              >
                Your next great story
                <span className="gradient-text italic"> starts here</span>
              </h2>
              <p className="lede mt-5 max-w-md" data-reveal>
                Personalised itineraries built around your interests — plus a
                monthly letter with flight-deal drops and quiet-season guides.
              </p>

              <form
                data-reveal
                className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  aria-label="Email address"
                  className="field !pl-4 sm:!w-auto sm:flex-1"
                />
                <button type="submit" className="btn btn-primary whitespace-nowrap">
                  {subscribed ? "You're in ✦" : "Get travel ideas"}
                  {!subscribed && <FiArrowRight size={16} />}
                </button>
              </form>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={openTerms}
                  className="btn btn-ghost text-sm"
                >
                  Terms & conditions
                </button>
                <span className="text-xs text-cream/45">
                  No spam. Unsubscribe anytime.
                </span>
              </div>
            </div>

            <div data-reveal className="relative self-end">
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  "Free itinerary draft in 24h",
                  "Visa & permit handling",
                  "Local guides in 60+ countries",
                  "Price-match on identical routes",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-cream/70 backdrop-blur"
                  >
                    <FiCheckCircle
                      size={17}
                      className="mt-0.5 shrink-0 text-jade"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* terms modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTerms}
            role="dialog"
            aria-modal="true"
            aria-label="Terms and conditions"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[26px] border border-white/12 bg-ink-3 p-8"
            >
              <button
                type="button"
                onClick={closeTerms}
                aria-label="Close terms"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-cream transition hover:border-amber hover:text-amber-2"
              >
                <FiX size={16} />
              </button>
              <h3 className="display text-2xl text-cream">
                Terms & conditions
              </h3>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-cream/65">
                {TERMS.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-cream/40">
                Full policy available on request at info@kerithtravel.com
              </p>
              <button
                type="button"
                onClick={closeTerms}
                className="btn btn-primary mt-6 w-full"
              >
                Understood
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
