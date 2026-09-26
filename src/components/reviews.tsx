"use client";

import { useEffect, useRef } from "react";
import { FiStar, FiQuote } from "react-icons/fi";
import { revealIn, gsap } from "@/lib/gsap";

const CLIENTS = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    quote:
      "They rebooked our whole Santorini leg overnight when a strike hit — we barely noticed.",
    tint: "from-amber to-coral",
  },
  {
    name: "Michael Chen",
    location: "London, UK",
    rating: 5,
    quote:
      "The Kyoto guide knew every quiet shrine. It felt like travelling with a friend.",
    tint: "from-sky to-jade",
  },
  {
    name: "Emily Rodriguez",
    location: "Sydney, Australia",
    rating: 5,
    quote:
      "Reef days, rainforest nights. Every transfer was on time and honestly delightful.",
    tint: "from-coral to-amber-2",
  },
  {
    name: "David Kim",
    location: "Toronto, Canada",
    rating: 5,
    quote:
      "Best value we've found for a family of five — no surprise fees, ever.",
    tint: "from-jade to-sky",
  },
];

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: n }).map((_, i) => (
        <FiStar key={i} size={14} className="fill-amber text-amber" />
      ))}
    </span>
  );
}

export default function Reviews() {
  const root = useRef<HTMLElement>(null);
  const art = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = revealIn(root.current!, { stagger: 0.08 });

    const tw = gsap.fromTo(
      art.current,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      cleanup?.();
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <section
      ref={root}
      id="reviews"
      className="relative overflow-hidden bg-ink py-24 md:py-32"
    >
      <img
        src="/images/svg/plane.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-10 top-16 w-72 opacity-25"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* left: story */}
          <div ref={art}>
            <span className="eyebrow" data-reveal>
              From our clients
            </span>
            <h2
              className="display mt-6 text-[clamp(2.2rem,4.6vw,3.6rem)] text-cream"
              data-reveal
            >
              Real travel history from
              <span className="gradient-text italic"> beloved clients</span>
            </h2>
            <p className="lede mt-6 max-w-md" data-reveal>
              Choosing Kerith means choosing an enriching experience filled with
              unforgettable memories — and a team that answers at 3am.
            </p>

            <div
              data-reveal
              className="glass mt-10 rounded-[30px] p-8"
            >
              <FiQuote
                size={34}
                className="text-amber"
                aria-hidden
              />
              <p className="display mt-5 text-2xl italic leading-snug text-cream md:text-[1.7rem]">
                “Ten days across Peru and not one logistic out of place. The
                Machu Picchu sunrise slot they secured was worth the trip
                alone.”
              </p>
              <div className="mt-7 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber to-coral text-lg font-bold text-ink">
                  AK
                </span>
                <div>
                  <p className="font-semibold text-cream">Arun Kumar</p>
                  <p className="text-sm text-cream/50">
                    Bengaluru, India · Peru & Bolivia, 2025
                  </p>
                </div>
                <span className="ml-auto hidden sm:block">
                  <Stars />
                </span>
              </div>
            </div>

            <dl
              data-reveal
              className="mt-8 grid grid-cols-3 gap-4 text-center"
            >
              {[
                { k: "98%", v: "Would rebook" },
                { k: "4.9", v: "Avg. trip score" },
                { k: "48h", v: "Reply guarantee" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] py-5"
                >
                  <dt className="display gradient-text text-3xl">{s.k}</dt>
                  <dd className="mt-1 text-[10px] uppercase tracking-[0.16em] text-cream/50">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* right: client cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {CLIENTS.map((c) => (
              <article
                key={c.name}
                data-reveal
                className="glass card-hover group rounded-3xl p-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${c.tint} text-sm font-bold text-ink`}
                  >
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-cream">
                      {c.name}
                    </p>
                    <p className="text-xs text-cream/50">{c.location}</p>
                  </div>
                  <span className="ml-auto">
                    <Stars n={c.rating} />
                  </span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-cream/65">
                  “{c.quote}”
                </p>
                <span className="mt-5 block h-px w-full bg-gradient-to-r from-amber/60 via-coral/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
