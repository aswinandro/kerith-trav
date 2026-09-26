"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiMail, FiSend, FiMessageCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { revealIn } from "@/lib/gsap";

const ITEMS = [
  {
    id: 1,
    title: "How do I choose the right destination for me?",
    desc: "Tell us your interests, budget, dates and the kind of pace you enjoy. We shortlist three options with real seasonality notes, then refine together until it feels right.",
  },
  {
    id: 2,
    title: "How can I find budget-friendly travel options?",
    desc: "Travel mid-week, shoulder-season and a few days flexible either side of your ideal dates. Our price-watch tool flags the cheapest window across the next six months.",
  },
  {
    id: 3,
    title: "When is the best time to visit a specific place?",
    desc: "It varies — Kyoto peaks in early April and November, the reef is calmest June to October, and Patagonia is best November to March. Every package page lists a month-by-month guide.",
  },
  {
    id: 4,
    title: "Can I change or cancel my booking?",
    desc: "Most packages allow free changes up to 30 days before departure. Beyond that, we pass on the supplier's terms transparently at checkout — no surprise fees from us, ever.",
  },
  {
    id: 5,
    title: "Do you handle visas, insurance and permits?",
    desc: "Yes. Visa documentation, travel insurance, trek permits and internal flights are all managed in-house, with a checklist shared in your trip dashboard.",
  },
];

export default function Questions() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(1);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const cleanup = revealIn(root.current!);
    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={root}
      id="faq"
      className="relative overflow-hidden bg-ink-2 py-24 md:py-32"
    >
      <img
        src="/images/svg/compass.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 w-80 opacity-[0.07]"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* FAQ */}
          <div>
            <span className="eyebrow" data-reveal>
              Good to know
            </span>
            <h2
              className="display mt-6 text-[clamp(2.2rem,4.6vw,3.6rem)] text-cream"
              data-reveal
            >
              Frequently asked
              <span className="gradient-text italic"> questions</span>
            </h2>

            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {ITEMS.map((item) => {
                const isOpen = open === item.id;
                return (
                  <div key={item.id} data-reveal>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "display text-lg transition-colors md:text-xl",
                          isOpen
                            ? "text-amber-2"
                            : "text-cream/85 group-hover:text-cream"
                        )}
                      >
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500",
                          isOpen
                            ? "rotate-45 border-amber bg-amber text-ink"
                            : "border-white/20 text-cream/70 group-hover:border-amber group-hover:text-amber-2"
                        )}
                      >
                        <FiPlus size={16} />
                      </span>
                    </button>
                    <div className={cn("acc-panel", isOpen && "open")}>
                      <div>
                        <p className="max-w-2xl pb-7 pr-12 text-sm leading-relaxed text-cream/60">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* contact card */}
          <div data-reveal className="lg:pt-16">
            <div className="glass rounded-[30px] p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber/30 bg-amber/10 text-amber-2">
                  <FiMessageCircle size={20} />
                </span>
                <div>
                  <h3 className="display text-xl text-cream">
                    Still curious?
                  </h3>
                  <p className="text-xs text-cream/50">
                    We reply within 48 hours.
                  </p>
                </div>
              </div>

              <form
                className="mt-7 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="relative">
                  <FiMail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    className="field !pl-11"
                    aria-label="Email address"
                  />
                </div>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us where you're dreaming of…"
                  className="field !pl-4 !pt-3 resize-none"
                  aria-label="Your question"
                />
                <button type="submit" className="btn btn-primary w-full">
                  <FiSend size={16} />
                  {sent ? "Sent — thank you!" : "Submit inquiry"}
                </button>
              </form>

              <div className="mt-7 space-y-2 border-t border-white/10 pt-6 text-sm text-cream/60">
                <p>
                  <span className="text-cream/40">Call&nbsp;</span>
                  <a
                    href="tel:+919486781846"
                    className="text-cream transition hover:text-amber-2"
                  >
                    +91 94867 81846
                  </a>
                </p>
                <p>
                  <span className="text-cream/40">Mail&nbsp;</span>
                  <a
                    href="mailto:info@kerithtravel.com"
                    className="text-cream transition hover:text-amber-2"
                  >
                    info@kerithtravel.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
