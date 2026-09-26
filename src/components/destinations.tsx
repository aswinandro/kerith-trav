"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, revealIn } from "@/lib/gsap";
import { FiMapPin, FiStar, FiArrowRight } from "react-icons/fi";

type Dest = {
  name: string;
  country: string;
  rating: string;
  tag: string;
  price: string;
  img: string;
};

const DESTINATIONS: Dest[] = [
  {
    name: "Paris",
    country: "France",
    rating: "4.7",
    tag: "City of Light",
    price: "1,32,000",
    img: "/images/svg/dest-paris.svg",
  },
  {
    name: "Dubai",
    country: "UAE",
    rating: "4.8",
    tag: "Desert & skyline",
    price: "65,000",
    img: "/images/svg/dest-dubai.svg",
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    rating: "4.9",
    tag: "Andean citadel",
    price: "1,86,000",
    img: "/images/svg/dest-machu.svg",
  },
  {
    name: "Great Barrier Reef",
    country: "Australia",
    rating: "4.6",
    tag: "Marine wonder",
    price: "1,06,000",
    img: "/images/svg/dest-reef.svg",
  },
  {
    name: "Phuket",
    country: "Thailand",
    rating: "4.6",
    tag: "Island hopping",
    price: "59,000",
    img: "/images/svg/dest-phuket.svg",
  },
  {
    name: "Bali",
    country: "Indonesia",
    rating: "4.8",
    tag: "Terraces & temples",
    price: "72,000",
    img: "/images/svg/dest-bali.svg",
  },
  {
    name: "Santorini",
    country: "Greece",
    rating: "4.9",
    tag: "Aegean sunsets",
    price: "1,44,000",
    img: "/images/svg/dest-santorini.svg",
  },
  {
    name: "Kyoto",
    country: "Japan",
    rating: "4.9",
    tag: "Sakura season",
    price: "1,58,000",
    img: "/images/svg/dest-kyoto.svg",
  },
];

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
        src="/images/svg/plane.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-6 top-10 hidden w-64 opacity-20 lg:block"
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
          <p className="lede max-w-sm" data-reveal>
            Drag through eight handpicked places our travellers keep coming
            back to — with real seasonality, pricing and route notes.
          </p>
        </div>
      </div>

      {/* pinned horizontal stage */}
      <div ref={wrap} className="relative mt-14 overflow-hidden md:h-[78vh]">
        <div
          ref={track}
          className="flex w-max gap-6 overflow-x-auto px-6 pb-4 md:overflow-visible md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {DESTINATIONS.map((d, i) => (
            <article
              key={d.name}
              className="dest-card group relative w-[80vw] max-w-[380px] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-ink-3 md:w-[26vw] md:min-w-[340px] md:max-w-[420px] md:self-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={d.img}
                  alt={`${d.name}, ${d.country}`}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] tracking-wide text-cream/85 backdrop-blur">
                  {d.tag}
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
                      ₹{d.price}
                    </p>
                  </div>
                  <a
                    href="#packages"
                    aria-label={`See ${d.name} package`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream transition-all duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink"
                  >
                    <FiArrowRight size={17} />
                  </a>
                </div>
              </div>

              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-amber to-coral transition-transform duration-700 group-hover:scale-x-100" />
            </article>
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
