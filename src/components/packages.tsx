"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiStar, FiClock, FiMapPin, FiArrowRight } from "react-icons/fi";
import { packagesData, packageCategories } from "@/data/packages";
import { revealIn } from "@/lib/gsap";
import Photo from "@/components/photo";
import { cn } from "@/lib/utils";

export default function Packages({ preview = false }: { preview?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const cleanup = revealIn(root.current!);
    return () => cleanup?.();
  }, []);

  const list = useMemo(() => {
    const all = preview ? packagesData.slice(0, 4) : packagesData;
    if (preview) return all;
    return category === "All"
      ? all
      : all.filter((p) => p.category === category);
  }, [preview, category]);

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
            >
              Journeys curated
              <span className="gradient-text italic"> end to end</span>
            </h2>
          </div>
          <div className="max-w-sm" data-reveal>
            <p className="lede">
              Flights, stays, transfers and the little extras — priced per
              person, zero hidden fees.
            </p>
            {preview && (
              <Link href="/packages" className="btn btn-ghost mt-5 !px-5 !py-2.5 text-sm">
                All packages <FiArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>

        {!preview && (
          <div className="mt-10 flex flex-wrap gap-2" data-reveal>
            {["All", ...packageCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300",
                  category === c
                    ? "border-amber bg-amber text-ink"
                    : "border-white/15 text-cream/60 hover:border-amber/60 hover:text-cream"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {list.map((p, i) => (
            <motion.article
              key={p.id}
              data-reveal
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className={cn(
                "group flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-ink-3/80 transition-colors duration-500 hover:border-amber/50",
                i === 0 && !preview && "md:col-span-2 xl:col-span-1"
              )}
            >
              <Link href={`/packages/${p.slug}`} className="flex flex-1 flex-col">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Photo
                    src={p.img}
                    alt={p.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
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
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream transition-all duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                      <FiArrowRight size={17} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-12 rounded-[26px] border border-dashed border-white/15 p-14 text-center text-sm text-cream/60">
            No packages in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
