"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, revealIn } from "@/lib/gsap";
import { featuredDestinations } from "@/data/destinations";
import Photo from "@/components/photo";
import { FiMapPin, FiStar, FiArrowRight } from "react-icons/fi";

export default function Destinations() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cleanupReveal = revealIn(root.current!, { start: "top 78%" });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const el = track.current;
      const box = wrap.current;
      if (!el || !box) return;

      const getDistance = () => Math.max(0, el.scrollWidth - box.clientWidth);

      const tween = gsap.to(el, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: box,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current)
              bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(el, { x: 0 });
      };
    });

    mm.add("(max-width: 767px)", () => {
      const cards = track.current?.querySelectorAll<HTMLElement>(".dest-card");
      if (!cards?.length) return;
      const tw = gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: track.current, start: "top 85%", once: true },
        }
      );
      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    });

    ScrollTrigger.refresh();
    return () => {
      cleanupReveal?.();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="destinations"
      className="relative overflow-hidden bg-ink py-24 md:py-28"
    >
      <img
        src="/images/static/destination.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-6 top-10 hidden w-64 opacity-40 lg:block"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow" data-reveal>
              Explore now
            </span>
            <h2
              className="display mt-6 max-w-xl text-[clamp(2.2rem,4.6vw,3.8rem)] text-cream"
              data-reveal
            >
              Find your next
              <span className="gradient-text italic"> dream destination</span>
            </h2>
          </div>
          <div className="max-w-sm" data-reveal>
            <p className="lede">
              Drag through a few handpicked places our travellers keep coming
              back to — with real seasonality, pricing and route notes.
            </p>
            <Link href="/destinations" className="btn btn-ghost mt-5 !px-5 !py-2.5 text-sm">
              All destinations <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* pinned horizontal stage */}
      <div ref={wrap} className="relative mt-14 overflow-hidden md:h-[78vh]">
        <div
          ref={track}
          className="flex w-max gap-6 overflow-x-auto px-6 pb-4 md:overflow-visible md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredDestinations.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="dest-card group relative block w-[80vw] max-w-[380px] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-ink-3 md:w-[26vw] md:min-w-[340px] md:max-w-[420px] md:self-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo
                  src={d.img}
                  alt={`${d.name}, ${d.country}`}
                  sizes="(max-width: 768px) 80vw, 26vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] tracking-wide text-cream/85 backdrop-blur">
                  {d.tagline}
                </span>
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-amber-2 backdrop-blur">
                  <FiStar className="fill-amber-2" size={11} /> {d.rating}
                </span>
              </div>

              <div className="relative -mt-14 px-6 pb-6">
                <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-amber-2">
                  <FiMapPin size={12} /> {d.country}
                </span>
                <h3 className="display mt-2 text-2xl text-cream">{d.name}</h3>
                <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-cream/45">
                      From / person
                    </p>
                    <p className="display text-lg text-cream">
                      ₹{d.priceINR.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream transition-all duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                    <FiArrowRight size={17} />
                  </span>
                </div>
              </div>

              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-amber to-coral transition-transform duration-700 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>

      {/* progress */}
      <div className="mx-auto mt-8 hidden max-w-7xl items-center gap-4 px-10 md:flex">
        <span className="h-px flex-1 bg-white/12">
          <span
            ref={bar}
            className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-amber to-coral"
          />
        </span>
        <span className="text-[11px] uppercase tracking-[0.24em] text-cream/40">
          Scroll to travel
        </span>
      </div>
    </section>
  );
}
