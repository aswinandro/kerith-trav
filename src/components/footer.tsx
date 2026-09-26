"use client";

import { useEffect, useRef } from "react";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { revealIn } from "@/lib/gsap";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "#home" },
      { label: "Destinations", href: "#destinations" },
      { label: "Packages", href: "#packages" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#home" },
      { label: "FAQ", href: "#faq" },
      { label: "Careers", href: "#faq" },
      { label: "Press", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & conditions", href: "#subscribe" },
      { label: "Privacy policy", href: "#subscribe" },
      { label: "Cancellation policy", href: "#subscribe" },
      { label: "Cookie preferences", href: "#subscribe" },
    ],
  },
];

const SOCIALS = [
  { icon: FiInstagram, label: "Instagram" },
  { icon: FiTwitter, label: "Twitter" },
  { icon: FiFacebook, label: "Facebook" },
  { icon: FiYoutube, label: "YouTube" },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const cleanup = revealIn(root.current!, { stagger: 0.05 });
    return () => cleanup?.();
  }, []);

  return (
    <footer
      ref={root}
      className="relative overflow-hidden border-t border-white/10 bg-ink-2 pt-24"
    >
      <img
        src="/images/svg/mountains.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 w-full object-cover opacity-30"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-transparent to-ink-2" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* CTA row */}
        <div
          data-reveal
          className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-14 md:flex-row md:items-center"
        >
          <h2 className="display max-w-2xl text-[clamp(1.9rem,3.4vw,3rem)] text-cream">
            Ready when you are —
            <span className="gradient-text italic"> let's map it out.</span>
          </h2>
          <a href="#subscribe" className="btn btn-primary">
            Plan my trip
          </a>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div data-reveal>
            <a href="#home" className="flex items-center gap-3">
              <img
                src="/images/svg/logo.svg"
                alt=""
                width={44}
                height={44}
              />
              <span className="display text-xl text-cream">
                Kerith<span className="text-amber">.</span> Travels
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              Small team, big map. We craft slow, thoughtful journeys across
              six continents — and answer our own phones.
            </p>

            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-cream/60 transition-all duration-300 hover:-translate-y-1 hover:border-amber hover:text-amber-2"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} data-reveal>
              <h3 className="text-[11px] uppercase tracking-[0.24em] text-amber-2">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      <span className="h-px w-0 bg-amber transition-all duration-300 group-hover:w-4" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          data-reveal
          className="grid gap-6 border-t border-white/10 py-8 text-sm text-cream/55 sm:grid-cols-3"
        >
          <a
            href="tel:+919486781846"
            className="flex items-center gap-3 transition hover:text-amber-2"
          >
            <FiPhone size={16} className="text-amber" /> +91 94867 81846
          </a>
          <a
            href="mailto:info@kerithtravel.com"
            className="flex items-center gap-3 transition hover:text-amber-2"
          >
            <FiMail size={16} className="text-amber" /> info@kerithtravel.com
          </a>
          <p className="flex items-start gap-3">
            <FiMapPin size={16} className="mt-0.5 shrink-0 text-amber" />
            Mano Complex 18 41 B20, Kuzhithurai, Kanyakumari, Tamil Nadu, India
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs text-cream/40 sm:flex-row">
          <p>© 2026 Kerith Travels. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">
            Designed for wanderers ✦ Built with Three.js &amp; GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
