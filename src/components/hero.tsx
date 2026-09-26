"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const GlobeScene = dynamic(() => import("@/components/three/globe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src="/images/svg/globe.svg"
        alt=""
        width={460}
        height={460}
        className="w-[70%] max-w-[460px] opacity-70"
      />
    </div>
  ),
});

const STATS = [
  { value: "10+", label: "Years crafting trips" },
  { value: "2K+", label: "Destinations mapped" },
  { value: "10K+", label: "Happy travellers" },
  { value: "4.1", label: "Average rating" },
];

const ROUTES = ["Paris", "Dubai", "Phuket", "Bali", "Kyoto", "Santorini"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          ".hero-chip",
          { opacity: 0, y: 16, stagger: 0.05, duration: 0.6 },
          "-=0.6"
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 30, stagger: 0.08, duration: 0.9 },
          "-=0.7"
        )
        .from(".hero-cue", { opacity: 0, duration: 0.8 }, "-=0.4");

      gsap.to(stage.current, {
        yPercent: 18,
        scale: 0.92,
        opacity: 0.35,
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
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 78% 18%, #17233f 0%, #0a0e1c 45%, #05060c 100%)",
      }}
    >
      {/* topographic backdrop */}
      <img
        src="/images/svg/topography.svg"
        alt=""
        aria-hidden
        className="hero-grid pointer-events-none absolute -right-24 -top-24 w-[46rem] opacity-[0.13] mix-blend-screen"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#05060c_100%)]" />

      {/* 3D stage */}
      <div
        ref={stage}
        className="pointer-events-none absolute inset-y-0 right-[-8%] w-full md:right-[-4%] md:w-[68%]"
      >
        <div className="pointer-events-auto h-full w-full">
          <GlobeScene />
        </div>
      </div>

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-10">
        <div className="max-w-2xl">
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

          <div className="mt-8 flex flex-wrap gap-2">
            {ROUTES.map((r) => (
              <span
                key={r}
                className="hero-chip rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs tracking-wide text-cream/70 backdrop-blur transition hover:border-amber/60 hover:text-amber-2"
              >
                {r}
              </span>
            ))}
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

      {/* scroll cue */}
      <div className="hero-cue pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-cream/45">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="relative block h-12 w-px bg-white/20">
            <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 animate-bounce bg-amber" />
          </span>
        </div>
      </div>
    </section>
  );
}
