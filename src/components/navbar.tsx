"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#packages" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 md:px-10 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <a href="#home" className="group flex items-center gap-3">
          <img
            src="/images/svg/logo.svg"
            alt=""
            width={38}
            height={38}
            className="transition-transform duration-500 group-hover:rotate-[18deg]"
          />
          <span className="display text-lg tracking-tight text-cream">
            Kerith<span className="text-amber">.</span>
            <span className="hidden text-cream/55 sm:inline"> Travels</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm text-cream/65 transition-colors hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-amber to-coral transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#subscribe"
            className="btn btn-primary hidden !px-6 !py-2.5 text-sm md:inline-flex"
          >
            Plan my trip
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 md:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-px w-full bg-cream transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-full bg-cream transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-cream transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-5">
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: `${i * 40}ms` }}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-cream/75 transition hover:bg-white/5 hover:text-amber-2"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#subscribe"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              Plan my trip
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
