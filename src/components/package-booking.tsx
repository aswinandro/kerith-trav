"use client";

import { useState } from "react";
import { FiMinus, FiPlus, FiUsers, FiStar } from "react-icons/fi";

export default function PackageBooking({
  id,
  priceINR,
  rating,
  duration,
  stay,
  transport,
}: {
  id: number;
  priceINR: number;
  rating: number;
  duration: string;
  stay: string;
  transport: string;
}) {
  const [qty, setQty] = useState(1);
  const total = priceINR * qty;

  return (
    <div className="glass rounded-[30px] p-7">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.2em] text-cream/50">
          Per person
        </span>
        <span className="flex items-center gap-1 text-sm text-amber-2">
          <FiStar className="fill-amber-2" size={13} /> {rating}
        </span>
      </div>
      <p className="display gradient-text mt-3 text-4xl">
        ₹{priceINR.toLocaleString("en-IN")}
      </p>

      <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-cream/50">Duration</dt>
          <dd className="text-right text-cream">{duration}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-cream/50">Stay</dt>
          <dd className="text-right text-cream">{stay}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-cream/50">Transport</dt>
          <dd className="text-right text-cream">{transport}</dd>
        </div>
      </dl>

      <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-cream/50">
        Travellers
      </p>
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/12 bg-black/25 px-4 py-3">
        <button
          type="button"
          aria-label="Decrease travellers"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream transition hover:border-amber hover:text-amber-2"
        >
          <FiMinus size={14} />
        </button>
        <span className="flex items-center gap-2 text-cream">
          <FiUsers size={15} className="text-amber" />
          {qty}
        </span>
        <button
          type="button"
          aria-label="Increase travellers"
          onClick={() => setQty((q) => Math.min(12, q + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream transition hover:border-amber hover:text-amber-2"
        >
          <FiPlus size={14} />
        </button>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <span className="text-[11px] uppercase tracking-[0.18em] text-cream/50">
          Estimated total
        </span>
        <span className="display gradient-text text-3xl">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <a
        href={`/checkout?pkg=${id}&qty=${qty}`}
        className="btn btn-primary mt-5 w-full"
      >
        Reserve this trip
      </a>
      <p className="mt-3 text-center text-[11px] text-cream/40">
        Free cancellation up to 30 days before departure
      </p>
    </div>
  );
}
