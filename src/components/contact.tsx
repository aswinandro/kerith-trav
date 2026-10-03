"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiMessageCircle,
} from "react-icons/fi";
import { revealIn } from "@/lib/gsap";
import { destinations } from "@/data/destinations";
import { CONTACT, OFFICES, OFFICE_MAP, whatsappLink } from "@/data/contact";
import { cn } from "@/lib/utils";

/** Reads the inquiry form and returns a human-readable WhatsApp message. */
function buildWhatsAppMessage(form: HTMLFormElement) {
  const data = new FormData(form);
  const dest = form.elements.namedItem("destination") as HTMLSelectElement;
  const value = (key: string) => String(data.get(key) ?? "").trim();

  return [
    "Hi Kerith Travels, I'd like help planning a trip.",
    "",
    `Name: ${value("name") || "-"}`,
    `Email: ${value("email") || "-"}`,
    ...(value("phone") ? [`Phone: ${value("phone")}`] : []),
    ...(value("window") ? [`Travel window: ${value("window")}`] : []),
    ...(dest?.selectedOptions?.[0]?.text
      ? [`Destination: ${dest.selectedOptions[0].text.trim()}`]
      : []),
    ...(value("notes") ? [`Trip notes: ${value("notes")}`] : []),
  ].join("\n");
}

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
              window.open(
                whatsappLink(buildWhatsAppMessage(e.currentTarget)),
                "_blank",
                "noopener,noreferrer"
              );
              setSent(true);
            }}
          >
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-cream/50">
                Name
              </span>
              <input
                required
                placeholder="Your name"
                className="field"
                aria-label="Name"
                name="name"
              />
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
                name="email"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-cream/50">
                Phone
              </span>
              <input
                type="tel"
                placeholder="+971 50 000 0000"
                className="field"
                aria-label="Phone"
                name="phone"
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
                name="window"
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
                name="destination"
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
                name="notes"
              />
            </label>

            <div className="sm:col-span-2">
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                {sent ? (
                  <>
                    <FiCheckCircle size={16} /> Opening WhatsApp…
                  </>
                ) : (
                  <>
                    <FiMessageCircle size={16} /> Send on WhatsApp
                  </>
                )}
              </button>
              <p className="mt-3 flex items-center gap-2 text-xs text-cream/45">
                <FiSend size={13} className="text-amber" />
                Opens WhatsApp with your trip details pre-filled — a designer
                replies within 24h.
              </p>
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
                <span className="flex flex-wrap items-center gap-2">
                  <a
                    href={CONTACT.phoneHref}
                    className="transition hover:text-amber-2"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-jade/30 bg-jade/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-jade transition hover:bg-jade/20"
                  >
                    <FiMessageCircle size={12} /> WhatsApp us
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FiMail size={17} className="mt-0.5 shrink-0 text-amber" />
                <a
                  href={CONTACT.emailHref}
                  className="transition hover:text-amber-2"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin size={17} className="mt-0.5 shrink-0 text-amber" />
                <span>
                  <span className="block">{CONTACT.address}</span>
                  <span className="mt-3 block text-[10px] uppercase tracking-[0.2em] text-cream/40">
                    Our offices
                  </span>
                  <span className="mt-2 flex flex-wrap gap-2">
                    {OFFICES.map((office) => (
                      <span
                        key={office}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-cream/60"
                      >
                        {office}
                      </span>
                    ))}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FiClock size={17} className="mt-0.5 shrink-0 text-amber" />
                <span>{CONTACT.hours}</span>
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
              title="Kerith Travels Abu Dhabi office"
              src={OFFICE_MAP}
              className="h-64 w-full opacity-80 grayscale-[0.3]"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
