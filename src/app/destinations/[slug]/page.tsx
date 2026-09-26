import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  destinations,
  getDestination,
} from "@/data/destinations";
import { packagesData } from "@/data/packages";
import PageHeader from "@/components/page-header";
import Photo from "@/components/photo";
import Subscribe from "@/components/subscribe";
import {
  FiMapPin,
  FiStar,
  FiClock,
  FiSunrise,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return { title: "Destination not found | Kerith Travels" };
  return {
    title: `${dest.name}, ${dest.country} | Kerith Travels`,
    description: `${dest.tagline} — ${dest.desc}`,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

  const related = packagesData.filter((p) =>
    p.name.toLowerCase().startsWith(dest.name.toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow={`${dest.region} · ${dest.country}`}
        title={dest.name}
        accent={dest.tagline.toLowerCase()}
        lede={dest.desc}
        image={dest.img}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: dest.name },
        ]}
      />

      <section className="bg-ink py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-[1.25fr_0.75fr]">
          {/* main */}
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: FiStar, k: dest.rating.toString(), v: "Traveller score" },
                { icon: FiClock, k: dest.duration, v: "Typical trip" },
                { icon: FiSunrise, k: "₹" + dest.priceINR.toLocaleString("en-IN"), v: "From / person" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <s.icon size={18} className="text-amber" />
                  <p className="display mt-4 text-2xl text-cream">{s.k}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-cream/50">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="display mt-14 text-3xl text-cream">
              Why travellers
              <span className="gradient-text italic"> love it</span>
            </h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-3">
              {dest.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-ink-3/60 p-5 text-sm text-cream/70"
                >
                  <FiCheckCircle size={17} className="mt-0.5 shrink-0 text-jade" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-white/10">
                <Photo
                  src={dest.img}
                  alt={`${dest.name}, ${dest.country}`}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="glass rounded-[26px] p-7">
                <span className="eyebrow">Plan the timing</span>
                <p className="display mt-4 text-2xl text-cream">
                  {dest.bestTime}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  Best window for weather and prices. Shoulder months are
                  quieter and often 15–20% cheaper on flights.
                </p>
                <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-cream/50">Region</dt>
                    <dd className="text-cream">{dest.region}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-cream/50">Country</dt>
                    <dd className="text-cream">{dest.country}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-cream/50">Trip length</dt>
                    <dd className="text-right text-cream">{dest.duration}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* related packages */}
            <div className="mt-14">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="display text-3xl text-cream">
                  Trips to {dest.name}
                </h2>
                <Link
                  href="/packages"
                  className="text-sm text-cream/55 transition hover:text-amber-2"
                >
                  All packages →
                </Link>
              </div>

              {related.length ? (
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {related.map((p) => (
                    <Link
                      key={p.id}
                      href={`/packages/${p.slug}`}
                      className="group overflow-hidden rounded-[24px] border border-white/10 bg-ink-3/70 transition-colors hover:border-amber/50"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Photo
                          src={p.img}
                          alt={p.name}
                          sizes="(max-width: 640px) 100vw, 30vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-3 to-transparent" />
                      </div>
                      <div className="p-5">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-2">
                          {p.duration}
                        </p>
                        <p className="display mt-1.5 text-xl text-cream">
                          {p.name}
                        </p>
                        <p className="display mt-3 text-lg text-cream">
                          ₹{p.priceINR.toLocaleString("en-IN")}
                          <span className="ml-2 text-xs font-normal text-cream/45">
                            / person
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-7 rounded-[24px] border border-dashed border-white/15 p-8 text-sm text-cream/60">
                  Custom departures to {dest.name} are quoted on request — our
                  route desk builds these to your dates.
                </div>
              )}
            </div>
          </div>

          {/* sticky booking rail */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass rounded-[30px] p-7">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] text-cream/50">
                  Starting from
                </span>
                <span className="flex items-center gap-1 text-sm text-amber-2">
                  <FiStar className="fill-amber-2" size={13} /> {dest.rating}
                </span>
              </div>
              <p className="display gradient-text mt-3 text-4xl">
                ₹{dest.priceINR.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-cream/45">per person · {dest.duration}</p>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-cream/65">
                <FiMapPin size={16} className="mt-0.5 shrink-0 text-amber" />
                {dest.name}, {dest.country}
              </div>

              <Link
                href={
                  related.length
                    ? `/packages/${related[0].slug}`
                    : "/contact"
                }
                className="btn btn-primary mt-6 w-full"
              >
                {related.length ? "View this package" : "Request a quote"}
                <FiArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="btn btn-ghost mt-3 w-full justify-center"
              >
                Talk to a trip designer
              </Link>

              <p className="mt-4 text-center text-[11px] text-cream/40">
                Free itinerary draft in 24 hours · No booking fees
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Subscribe />
    </>
  );
}
