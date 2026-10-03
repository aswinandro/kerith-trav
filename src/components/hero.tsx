"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Photo from "@/components/photo";
import { packagesData } from "@/data/packages";

const STATS = [
  { value: "10+", label: "Years crafting trips" },
  { value: "2K+", label: "Destinations mapped" },
  { value: "10K+", label: "Happy travellers" },
  { value: "4.1", label: "Average rating" },
];

const CODES: Record<string, string> = {
  "paris-getaway": "CDG",
  "dubai-escape": "DXB",
  "phuket-islands": "HKT",
  "great-barrier-reef": "CNS",
  "santorini-blue": "JTR",
  "bali-escape": "DPS",
  "swiss-alps-rail": "ZRH",
  "amalfi-coast": "NAP",
};

const DATES = [
  "12 Oct",
  "19 Oct",
  "26 Oct",
  "02 Nov",
  "09 Nov",
  "16 Nov",
  "23 Nov",
  "30 Nov",
];

const DEPARTURES = packagesData.map((p, i) => ({
  code: CODES[p.slug] ?? "KER",
  city: p.name.split(",")[0],
  date: DATES[i % DATES.length],
  price: p.priceINR,
}));

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.1 },
      });

      tl.from(".hero-eyebrow", { opacity: 0, y: 24, duration: 0.8 })
        .from(
          ".hero-word",
          { opacity: 0, yPercent: 110, rotate: 4, stagger: 0.07, duration: 1.2 },
          "-=0.4"
        )
        .from(".hero-lede", { opacity: 0, y: 26 }, "-=0.7")
        .from(
          ".hero-cta",
          { opacity: 0, y: 22, stagger: 0.1, duration: 0.8 },
          "-=0.7"
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 30, stagger: 0.08, duration: 0.9 },
          "-=0.7"
        )
        .from(".hero-cue", { opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-strip", { opacity: 0, y: 26, duration: 0.9 }, "-=0.7");

      gsap.from(".hero-photo-img", {
        scale: 1.16,
        duration: 2.4,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.to(".hero-photo", {
        yPercent: 7,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(".hero-grid", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="home"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* full-bleed destination photograph */}
      <div className="hero-photo pointer-events-none absolute inset-x-0 -top-[10%] h-[120%]">
        <Photo
          src="/images/static/croatiatrip.jpg"
          alt="The walled old town of Dubrovnik above the Adriatic Sea"
          sizes="100vw"
          priority
          className="hero-photo-img object-cover object-[62%_45%]"
        />
      </div>

      {/* topographic watermark */}
      <img
        src="/images/svg/topography.svg"
        alt=""
        aria-hidden
        className="hero-grid pointer-events-none absolute -right-24 -top-24 w-[46rem] opacity-[0.1] mix-blend-screen"
      />

      {/* scrims: keep the copy legible over the photo */}
      <div className="pointer-events-none absolute inset-0 bg-ink/72 md:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(96deg,#05060c_0%,rgba(5,6,12,0.94)_34%,rgba(5,6,12,0.6)_58%,rgba(5,6,12,0.14)_80%,rgba(5,6,12,0)_100%)] md:block" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,6,12,0.7)_0%,rgba(5,6,12,0)_20%,rgba(5,6,12,0)_52%,rgba(5,6,12,0.9)_100%)]" />

      {/* copy */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-32">
          <div className="pointer-events-auto max-w-2xl">
            <span className="hero-eyebrow eyebrow">Kerith Travels — est. 2014</span>

            <h1 className="display mt-7 text-[clamp(2.9rem,7vw,5.6rem)] text-cream">
              <span className="block overflow-hidden">
                <span className="hero-word block">Chase the</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-word gradient-text block italic">
                  horizon,
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-word block">not the crowd.</span>
              </span>
            </h1>

            <p className="hero-lede lede mt-7 max-w-lg">
              Handcrafted journeys across 60+ countries — slow mornings in
              Santorini, sunrise treks in the Andes, and everything in between.
              We plan it, you live it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#destinations" className="hero-cta btn btn-primary">
                Explore destinations
                <span aria-hidden>→</span>
              </a>
              <a href="#packages" className="hero-cta btn btn-ghost">
                View packages
              </a>
            </div>

            <dl className="mt-14 grid max-w-xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="hero-stat">
                  <dt className="display gradient-text text-3xl md:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-cream/50">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* scroll cue — right edge, over the photograph */}
      <div className="hero-cue pointer-events-none absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 md:block">
        <div className="flex flex-col items-center gap-3 text-cream/50">
          <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="relative block h-16 w-px bg-white/20">
            <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 animate-bounce bg-amber" />
          </span>
        </div>
      </div>

      {/* next departures ticker */}
      <div className="hero-strip relative z-10 border-t border-white/10 bg-ink/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-6 md:px-10">
          <div className="hidden shrink-0 border-r border-white/10 py-4 pr-5 md:block">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-2">
              Next departures
            </span>
          </div>
          <div className="min-w-0 flex-1 overflow-hidden py-4">
            <div className="marquee">
              {[0, 1].map((half) => (
                <div
                  key={half}
                  aria-hidden={half === 1}
                  className="flex shrink-0 gap-12 pr-12"
                >
                  {DEPARTURES.map((d) => (
                    <span
                      key={d.code}
                      className="flex items-baseline gap-3 whitespace-nowrap text-sm"
                    >
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-amber-2">
                        {d.code}
                      </span>
                      <span className="text-cream/85">{d.city}</span>
                      <span className="text-cream/30">·</span>
                      <span className="text-xs text-cream/50">{d.date}</span>
                      <span className="text-cream/30">·</span>
                      <span className="text-xs text-cream/65">
                        from ₹{d.price.toLocaleString("en-IN")}
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
