"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { revealIn } from "@/lib/gsap";
import { destinations, regions, type Region } from "@/data/destinations";
import Photo from "@/components/photo";
import { FiMapPin, FiStar, FiArrowRight, FiSearch } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function DestinationsDirectory() {
  const root = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "All">("All");

  useEffect(() => {
    const cleanup = revealIn(root.current!, { stagger: 0.06 });
    return () => cleanup?.();
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((d) => {
      const inRegion = region === "All" || d.region === region;
      const inQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q);
      return inRegion && inQuery;
    });
  }, [query, region]);

  return (
    <div ref={root} className="mx-auto max-w-7xl px-6 pb-4 md:px-10">
      <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["All", ...regions] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r as Region | "All")}
              aria-pressed={region === r}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300",
                region === r
                  ? "border-amber bg-amber text-ink"
                  : "border-white/15 text-cream/60 hover:border-amber/60 hover:text-cream"
              )}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="relative md:w-72">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a country or city…"
            aria-label="Search destinations"
            className="field !pl-11"
          />
        </div>
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-cream/45">
        {list.length} destination{list.length === 1 ? "" : "s"}
      </p>

      {list.length === 0 ? (
        <div className="mt-10 rounded-[28px] border border-dashed border-white/15 p-14 text-center">
          <p className="display text-2xl text-cream">No places match that.</p>
          <p className="mt-3 text-sm text-cream/55">
            Try another region or a shorter search.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setRegion("All");
            }}
            className="btn btn-ghost mt-6 !px-5 !py-2.5 text-sm"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              data-reveal
              className="group overflow-hidden rounded-[26px] border border-white/10 bg-ink-3/70 transition-colors duration-500 hover:border-amber/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo
                  src={d.img}
                  alt={`${d.name}, ${d.country}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-3 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] text-cream/85 backdrop-blur">
                  {d.region}
                </span>
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-amber-2 backdrop-blur">
                  <FiStar className="fill-amber-2" size={11} /> {d.rating}
                </span>
              </div>

              <div className="p-6">
                <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-amber-2">
                  <FiMapPin size={12} /> {d.country}
                </span>
                <h3 className="display mt-2 text-2xl text-cream">{d.name}</h3>
                <p className="mt-1 text-sm text-cream/50">{d.tagline}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream/60">
                  {d.desc}
                </p>

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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
