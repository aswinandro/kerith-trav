"use client";

import { useEffect, useRef } from "react";
import { FiCheck } from "react-icons/fi";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Photo from "@/components/photo";
import { packagesData } from "@/data/packages";

const STATS = [
  { value: 10, suffix: "+", label: "Years crafting trips" },
  { value: 2, suffix: "K+", label: "Destinations mapped" },
  { value: 10, suffix: "K+", label: "Happy travellers" },
  { value: 4.1, suffix: "", label: "Average rating" },
];

const PROMISES = [
  "No booking fees",
  "Free itinerary draft in 24h",
  "24/7 on-trip support",
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

/** Splits `data-count` into a target number and the painter that renders it. */
function counter(node: HTMLElement) {
  const raw = node.dataset.count || "0";
  const target = parseFloat(raw);
  const decimals = (raw.split(".")[1] || "").length;
  return {
    target,
    paint: (v: number) => {
      node.textContent =
        decimals > 0
          ? v.toFixed(decimals)
          : Math.round(v).toLocaleString("en-US");
    },
  };
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const nodes = Array.from(
      scope.querySelectorAll<HTMLElement>("[data-count]")
    );

    if (prefersReducedMotion()) {
      nodes.forEach((node) => {
        const { target, paint } = counter(node);
        paint(target);
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.1 },
      });

      tl.from(".hero-eyebrow", { opacity: 0, y: 24, duration: 0.8 })
        .from(
          ".hero-word",
          { opacity: 0, yPercent: 110, rotate: 4, stagger: 0.07, duration: 1.2 },
          "-=0.4"
        );

      // hand-drawn underline under "horizon,"
      const underline = scope.querySelector<SVGPathElement>(
        ".hero-underline path"
      );
      if (underline) {
        const length = underline.getTotalLength();
        gsap.set(underline, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          underline,
          { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" },
          "-=0.5"
        );
      }

      tl.from(".hero-lede", { opacity: 0, y: 26 }, "-=0.7")
        .from(
          ".hero-cta",
          { opacity: 0, y: 22, stagger: 0.1, duration: 0.8 },
          "-=0.7"
        )
        .from(".hero-trust", { opacity: 0, y: 18, duration: 0.8 }, "-=0.7")
        .from(
          ".hero-stat",
          { opacity: 0, y: 30, stagger: 0.08, duration: 0.9 },
          "-=0.7"
        );

      // counters run alongside the stat tiles fading in
      nodes.forEach((node) => {
        const { target, paint } = counter(node);
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => paint(obj.v),
          },
          "<+=0.15"
        );
      });

      tl.from(".hero-cue", { opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-loc", { opacity: 0, y: -12, duration: 0.8 }, "-=0.7")
        .from(".hero-strip", { opacity: 0, y: 26, duration: 0.9 }, "-=0.7");

      gsap.from(".hero-photo-img", {
        scale: 1.16,
        duration: 2.4,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.to(".hero-glow-a", {
        xPercent: 14,
        yPercent: -10,
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".hero-glow-b", {
        xPercent: -16,
        yPercent: 12,
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
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
          className="hero-photo-img object-cover object-[62%_45%] saturate-[1.06]"
        />
      </div>

      {/* colour grade + vignette so the photo reads warm, not flat */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_80%_at_80%_35%,rgba(255,138,30,0.22),transparent_62%)] mix-blend-soft-light" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_200px_70px_rgba(5,6,12,0.72)]" />

      {/* topographic watermark */}
      <img
        src="/images/svg/topography.svg"
        alt=""
        aria-hidden
        className="hero-grid pointer-events-none absolute -right-24 -top-24 w-[46rem] opacity-[0.1] mix-blend-screen"
      />

      {/* scrims: keep the copy legible over the photo */}
      <div className="pointer-events-none absolute inset-0 bg-ink/72 md:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(96deg,#05060c_0%,rgba(5,6,12,0.95)_30%,rgba(5,6,12,0.82)_48%,rgba(5,6,12,0.5)_64%,rgba(5,6,12,0.15)_80%,rgba(5,6,12,0)_100%)] md:block" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,6,12,0.7)_0%,rgba(5,6,12,0)_20%,rgba(5,6,12,0)_52%,rgba(5,6,12,0.9)_100%)]" />

      {/* warm haze behind the copy */}
      <div className="hero-glow-a pointer-events-none absolute -left-40 top-[14%] h-[30rem] w-[30rem] rounded-full bg-amber/15 blur-[130px]" />
      <div className="hero-glow-b pointer-events-none absolute left-[18%] top-[56%] h-[26rem] w-[26rem] rounded-full bg-coral/12 blur-[140px]" />

      {/* copy */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
          <div className="pointer-events-auto max-w-2xl">
            <span className="hero-eyebrow eyebrow">Kerith Travels — est. 2014</span>

            <h1 className="display mt-6 text-[clamp(2.9rem,6.6vw,5.1rem)] text-cream">
              <span className="block overflow-hidden">
                <span className="hero-word block">Chase the</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-word relative block w-fit pb-3">
                  <span className="gradient-text italic">horizon,</span>
                  <svg
                    className="hero-underline pointer-events-none absolute bottom-0 left-0 h-4 w-full"
                    viewBox="0 0 300 24"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="heroUnderline" x1="0" x2="1">
                        <stop offset="0%" stopColor="#ffb547" />
                        <stop offset="100%" stopColor="#ff5f8f" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M4 16C58 6 128 20 186 12C226 6 266 10 296 7"
                      stroke="url(#heroUnderline)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-word block">not the crowd.</span>
              </span>
            </h1>

            <p className="hero-lede lede mt-5 max-w-lg">
              Handcrafted journeys across 60+ countries — slow mornings in
              Santorini, sunrise treks in the Andes, and everything in between.
              We plan it, you live it.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#destinations"
                className="hero-cta btn btn-primary group"
              >
                Explore destinations
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a href="#packages" className="hero-cta btn btn-ghost">
                View packages
              </a>
            </div>

            <ul className="hero-trust mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cream/55">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-center gap-2">
                  <FiCheck size={13} className="shrink-0 text-jade" />
                  {promise}
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="hero-stat rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md transition-colors duration-300 hover:border-amber/40 sm:py-3.5"
                >
                  <dt className="display gradient-text text-2xl md:text-3xl">
                    <span data-count={String(s.value)} className="tabular-nums">
                      0
                    </span>
                    {s.suffix}
                  </dt>
                  <dd className="mt-1 text-[10px] uppercase leading-relaxed tracking-[0.14em] text-cream/50">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* where the photograph was taken */}
      <div className="hero-loc absolute right-6 top-24 z-10 hidden items-center gap-2.5 rounded-full border border-white/15 bg-ink/45 px-4 py-2 backdrop-blur-md lg:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.26em] text-cream/75">
          Dubrovnik · 42°38′N 18°06′E
        </span>
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
