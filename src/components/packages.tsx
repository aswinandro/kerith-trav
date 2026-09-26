"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiStar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiMinus,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { packagesData, type Package } from "@/data/packages";
import { revealIn } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export default function Packages() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Package | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const cleanup = revealIn(root.current!);
    return () => cleanup?.();
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const total = active ? active.priceINR * qty : 0;

  return (
    <section
      ref={root}
      id="packages"
      className="relative overflow-hidden bg-ink-2 py-24 md:py-32"
    >
      <img
        src="/images/svg/topography.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 w-[34rem] opacity-[0.07]"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow" data-reveal>
              Featured tours
            </span>
            <h2
              className="display mt-6 max-w-xl text-[clamp(2.2rem,4.6vw,3.8rem)] text-cream"
              data-reveal
              data-testid="packages-title"
            >
              Journeys curated
              <span className="gradient-text italic"> end to end</span>
            </h2>
          </div>
          <p className="lede max-w-sm" data-reveal>
            Flights, stays, transfers and the little extras — priced per person,
            zero hidden fees.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packagesData.map((p, i) => (
            <motion.article
              key={p.id}
              data-reveal
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className={cn(
                "group flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-ink-3/80",
                i === 0 && "md:col-span-2 xl:col-span-1"
              )}
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-3 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[11px] tracking-wide text-cream/85 backdrop-blur">
                  {p.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-amber-2">
                    <FiMapPin size={12} /> {p.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-cream/60">
                    <FiStar className="fill-amber text-amber" size={12} />
                    {p.rating}
                  </span>
                </div>

                <h3 className="display mt-3 text-2xl text-cream">{p.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-xs text-cream/50">
                  <FiClock size={13} /> {p.duration}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream/55">
                  {p.desc}
                </p>

                <div className="mt-auto flex items-end justify-between pt-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-cream/45">
                      Per person
                    </p>
                    <p className="display text-2xl text-cream">
                      ₹{p.priceINR.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setQty(1);
                      setActive(p);
                    }}
                    className="btn btn-ghost !px-5 !py-2.5 text-sm"
                  >
                    View trip
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} package details`}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border border-white/12 bg-ink-3 sm:rounded-[28px]"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close details"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-cream backdrop-blur transition hover:border-amber hover:text-amber-2"
              >
                <FiX size={18} />
              </button>

              <div className="relative aspect-[16/8] overflow-hidden">
                <img
                  src={active.img}
                  alt={active.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-3 via-ink-3/20 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-amber-2">
                    {active.category}
                  </span>
                  <h3 className="display text-3xl text-cream">
                    {active.name}
                  </h3>
                </div>
              </div>

              <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                <div>
                  <p className="lede">{active.desc}</p>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <dt className="text-cream/50">Duration</dt>
                      <dd className="text-cream">{active.duration}</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <dt className="text-cream/50">Stay</dt>
                      <dd className="text-right text-cream">{active.stay}</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <dt className="text-cream/50">Transport</dt>
                      <dd className="text-right text-cream">
                        {active.transport}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-cream/50">Rating</dt>
                      <dd className="flex items-center gap-1 text-amber-2">
                        <FiStar className="fill-amber" size={13} />
                        {active.rating}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="glass rounded-3xl p-6">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-cream/50">
                    Travellers
                  </p>
                  <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/12 bg-black/25 px-4 py-3">
                    <button
                      type="button"
                      aria-label="Decrease travellers"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream transition hover:border-amber hover:text-amber-2"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="flex items-center gap-2 text-cream">
                      <FiUsers size={15} className="text-amber" />
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase travellers"
                      onClick={() => setQty((q) => Math.min(12, q + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream transition hover:border-amber hover:text-amber-2"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-cream/50">
                      Estimated total
                    </span>
                    <span className="display gradient-text text-3xl">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <a
                    href={`/checkout?pkg=${active.id}&qty=${qty}`}
                    className="btn btn-primary mt-5 w-full"
                  >
                    Reserve this trip
                  </a>
                  <p className="mt-3 text-center text-[11px] text-cream/40">
                    Free cancellation up to 30 days before departure
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
