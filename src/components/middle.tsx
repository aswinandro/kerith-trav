"use client";

import { useEffect, useRef } from "react";
import {
  FiCompass,
  FiMap,
  FiShield,
  FiHeadphones,
  FiStar,
  FiGlobe,
} from "react-icons/fi";
import { revealIn, countUp } from "@/lib/gsap";

const STATS = [
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: 2, suffix: "K+", label: "Fine destinations" },
  { value: 10, suffix: "K+", label: "Customer reviews" },
  { value: 4.1, suffix: "", label: "Overall rating" },
];

const FEATURES = [
  {
    icon: FiCompass,
    title: "Tailored itineraries",
    desc: "Every trip is shaped around your pace, palate and sense of adventure — never a template.",
  },
  {
    icon: FiShield,
    title: "Protected bookings",
    desc: "Secure payments, transparent pricing and travel cover on every package we sell.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 on-trip support",
    desc: "A real human, in your timezone, from the first query to the flight home.",
  },
  {
    icon: FiGlobe,
    title: "Local-first guides",
    desc: "Resident guides in 60+ countries who actually live where you're visiting.",
  },
];

const MARQUEE = [
  "Kerala backwaters",
  "Santorini sunsets",
  "Andes treks",
  "Sahari nights",
  "Reef diving",
  "Kyoto in bloom",
  "Bali terraces",
  "Phuket islands",
];

export default function Middle() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = revealIn(root.current!);
    const count = countUp(root.current!);
    return () => {
      ctx?.();
      count?.();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-y border-white/8 bg-ink-2 py-24 md:py-32"
    >
      <img
        src="/images/svg/compass.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 w-72 opacity-[0.08]"
      />
      <img
        src="/images/svg/mountains.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-52 w-full object-cover opacity-25"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* marquee band */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-4">
          <div className="marquee gap-10 whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span
                key={i}
                className="display flex items-center gap-10 text-xl italic text-cream/45 md:text-2xl"
              >
                {m}
                <span className="text-amber">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* heading */}
        <div className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow" data-reveal>
              Why travellers choose us
            </span>
            <h2
              className="display mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] text-cream"
              data-reveal
            >
              A decade of turning
              <span className="gradient-text italic"> “someday”</span> into
              boarding passes.
            </h2>
          </div>
          <p className="lede" data-reveal>
            From a two-person elopement in Kyoto to a 30-family reunion on the
            reef — we handle logistics, permits, transfers and the tiny details
            that make a trip feel effortless.
          </p>
        </div>

        {/* stats */}
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              data-reveal
              className="group bg-ink px-6 py-10 text-center transition-colors duration-500 hover:bg-ink-3"
            >
              <dt className="display gradient-text text-5xl md:text-6xl">
                <span
                  data-count={String(s.value)}
                  className="tabular-nums"
                >
                  0
                </span>
                {s.suffix}
              </dt>
              <dd className="mt-3 text-[11px] uppercase tracking-[0.2em] text-cream/50">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* features */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              data-reveal
              className="glass card-hover group rounded-3xl p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber/30 bg-amber/10 text-amber-2 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                <Icon size={22} />
              </div>
              <h3 className="display mt-6 text-xl text-cream">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">
                {desc}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center gap-3 text-cream/50">
          <FiMap size={18} className="text-amber" />
          <span className="text-sm tracking-wide">
            Trusted by 10,000+ travellers
          </span>
          <span className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <FiStar key={i} size={14} className="fill-amber text-amber" />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
