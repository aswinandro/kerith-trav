"use client";

import { useEffect, useRef } from "react";
import { revealIn } from "@/lib/gsap";
import Photo from "@/components/photo";
import { FiCompass, FiHeart, FiShield, FiUsers } from "react-icons/fi";

const VALUES = [
  {
    icon: FiCompass,
    title: "Route first",
    body: "Every itinerary is walked by someone on our team before it's offered to you.",
  },
  {
    icon: FiHeart,
    title: "Small by choice",
    body: "We cap group sizes at 12 so trips stay personal and flexible.",
  },
  {
    icon: FiShield,
    title: "No hidden fees",
    body: "What you see at checkout is what you pay — supplier terms passed through, nothing marked up quietly.",
  },
  {
    icon: FiUsers,
    title: "Humans on call",
    body: "A real trip designer answers your message, in your time zone, within 48 hours.",
  },
];

const TIMELINE = [
  { year: "2016", title: "Two desks in Kanyakumari", detail: "Kerith starts as a homestay booking service for backpackers heading to Kovalam." },
  { year: "2019", title: "First international departures", detail: "Southeast Asia group trips, then Europe — with our own route notes by then." },
  { year: "2022", title: "In-house visas & insurance", detail: "Documentation moves under one roof so travellers stop chasing paperwork." },
  { year: "2026", title: "60+ countries, one promise", detail: "A trip designer for every client, and the same people answering the phone." },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const cleanup = revealIn(root.current!, { stagger: 0.07 });
    return () => cleanup?.();
  }, []);

  return (
    <section ref={root} className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow" data-reveal>
              Our story
            </span>
            <h2
              className="display mt-6 text-[clamp(2rem,4.2vw,3.4rem)] text-cream"
              data-reveal
            >
              A small team with
              <span className="gradient-text italic"> a big map</span>
            </h2>
            <p className="lede mt-6" data-reveal>
              Kerith Travels began in Kanyakumari with a notebook of bus
              timetables and one borrowed phone. Ten years later we run
              departures across six continents — and we still answer our own
              phones.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/60" data-reveal>
              We build trips the way we&apos;d want them: slow mornings, honest
              travel times, a local guide who actually lives there, and enough
              free hours that you never feel herded. Nothing leaves our office
              until someone on the team has walked the route.
            </p>
          </div>

          <div data-reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border border-white/10">
              <Photo
                src="/images/static/travel.png"
                alt="Travellers on the road with Kerith Travels"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="glass absolute -bottom-6 -left-4 hidden rounded-3xl p-6 sm:block">
              <p className="display gradient-text text-4xl">10 yrs</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-cream/55">
                Of route notes
              </p>
            </div>
          </div>
        </div>

        {/* values */}
        <div className="mt-24">
          <span className="eyebrow" data-reveal>
            How we work
          </span>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                data-reveal
                className="card-hover rounded-[26px] border border-white/10 bg-ink-3/60 p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber/30 bg-amber/10 text-amber-2">
                  <v.icon size={20} />
                </span>
                <h3 className="display mt-5 text-xl text-cream">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* timeline */}
        <div className="mt-24">
          <span className="eyebrow" data-reveal>
            The road so far
          </span>
          <ol className="mt-9 grid gap-6 md:grid-cols-4">
            {TIMELINE.map((t) => (
              <li
                key={t.year}
                data-reveal
                className="relative rounded-[24px] border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="display gradient-text text-3xl">{t.year}</span>
                <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream/85">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  {t.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* stats */}
        <div
          data-reveal
          className="mt-24 grid gap-5 rounded-[30px] border border-white/10 bg-[radial-gradient(120%_120%_at_15%_0%,#2a1c3f_0%,#101427_55%,#0a0d18_100%)] p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-12"
        >
          {[
            { k: "60+", v: "Countries covered" },
            { k: "12", v: "Max group size" },
            { k: "48h", v: "Reply guarantee" },
            { k: "98%", v: "Would rebook" },
          ].map((s) => (
            <div key={s.k} className="text-center">
              <p className="display text-5xl text-cream">{s.k}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-cream/55">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
