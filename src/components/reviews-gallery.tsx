"use client";

import { useEffect, useRef } from "react";
import { revealIn } from "@/lib/gsap";
import Photo from "@/components/photo";

const SHOTS = [
  { src: "/images/static/rev (1).jpg", caption: "Santorini, Greece" },
  { src: "/images/static/popular1.jpg", caption: "Kyoto, Japan" },
  { src: "/images/static/rev (2).jpg", caption: "Bali, Indonesia" },
  { src: "/images/static/trip3.jpg", caption: "Swiss Alps, Switzerland" },
  { src: "/images/static/popular3.jpg", caption: "Dubai, UAE" },
  { src: "/images/static/rev (4).jpg", caption: "Amalfi Coast, Italy" },
];

export default function ReviewsGallery() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const cleanup = revealIn(root.current!, { stagger: 0.07 });
    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={root}
      className="relative border-t border-white/10 bg-ink-2 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <span className="eyebrow" data-reveal>
          Straight from the phone
        </span>
        <h2
          className="display mt-6 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] text-cream"
          data-reveal
        >
          Postcards our travellers
          <span className="gradient-text italic"> sent back</span>
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SHOTS.map((s) => (
            <figure
              key={s.src}
              data-reveal
              className="group relative overflow-hidden rounded-[26px] border border-white/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo
                  src={s.src}
                  alt={s.caption}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <figcaption className="absolute bottom-4 left-5 text-[11px] uppercase tracking-[0.2em] text-cream/85">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
