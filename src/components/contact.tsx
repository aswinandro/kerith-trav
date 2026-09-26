"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import { revealIn } from "@/lib/gsap";
import { destinations } from "@/data/destinations";
import { cn } from "@/lib/utils";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const cleanup = revealIn(root.current!, { stagger: 0.07 });
    return () => cleanup?.();
  }, []);

  return (
    <section ref={root} className="bg-ink py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1fr_0.9fr]">
        {/* form */}
        <div>
          <span className="eyebrow" data-reveal>
            Talk to a trip designer
          </span>
          <h2
            className="display mt-6 text-[clamp(2rem,4.2vw,3.2rem)] text-cream"
            data-reveal
          >
            Tell us where you&apos;re
            <span className="gradient-text italic"> dreaming of</span>
          </h2>
          <p className="lede mt-5 max-w-lg" data-reveal>
            Share a few details and you&apos;ll get a drafted itinerary within
            24 hours — no obligation, no automated sales sequence.
          </p>

          <form
            data-reveal
            className="mt-9 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-cream/50">
                Name
              </span>
              <input required placeholder="Your name" className="field" aria-label="Name" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-cream/50">
                Email
              </span>
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="field"
                aria-label="Email"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-cream/50">
                Phone
              </span>
              <input
                type="tel"
                placeholder="+91 00000 00000"
                className="field"
                aria-label="Phone"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-cream/50">
                Travel window
              </span>
              <input
                placeholder="e.g. March 2026"
                className="field"
                aria-label="Travel window"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-cream/50">
                Where to?
              </span>
              <select
                className="field"
                aria-label="Destination"
                defaultValue=""
              >
                <option value="" disabled>
                  Pick a destination
                </option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}, {d.country}
                  </option>
                ))}
                <option value="other">Somewhere else / not sure yet</option>
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-cream/50">
                Trip notes
              </span>
              <textarea
                rows={5}
                placeholder="Travellers, pace, budget, must-dos…"
                className="field resize-none !pt-3"
                aria-label="Trip notes"
              />
            </label>

            <div className="sm:col-span-2">
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                {sent ? (
                  <>
                    <FiCheckCircle size={16} /> Sent — we&apos;ll reply within 48h
                  </>
                ) : (
                  <>
                    <FiSend size={16} /> Send inquiry
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* details */}
        <aside data-reveal className="lg:pt-16">
          <div className="glass rounded-[30px] p-8">
            <h3 className="display text-2xl text-cream">
              Reach us directly
            </h3>
            <ul className="mt-6 space-y-5 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <FiPhone size={17} className="mt-0.5 shrink-0 text-amber" />
                <a href="tel:+919486781846" className="transition hover:text-amber-2">
                  +91 94867 81846
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMail size={17} className="mt-0.5 shrink-0 text-amber" />
                <a
                  href="mailto:info@kerithtravel.com"
                  className="transition hover:text-amber-2"
                >
                  info@kerithtravel.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin size={17} className="mt-0.5 shrink-0 text-amber" />
                <span>
                  Mano Complex 18 41 B20, Kuzhithurai, Kanyakumari, Tamil Nadu,
                  India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FiClock size={17} className="mt-0.5 shrink-0 text-amber" />
                <span>Mon–Sat, 9:30am – 7:00pm IST</span>
              </li>
            </ul>

            <div className="mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
              {[
                { k: "24h", v: "Itinerary draft" },
                { k: "48h", v: "Reply guarantee" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-white/10 bg-black/25 py-4 text-center"
                >
                  <p className="display gradient-text text-2xl">{s.k}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-cream/50">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={cn("mt-5 overflow-hidden rounded-[30px] border border-white/10")}>
            <iframe
              title="Kerith Travels office location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.30%2C8.06%2C77.45%2C8.18&layer=mapnik"
              className="h-64 w-full opacity-80 grayscale-[0.3]"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
