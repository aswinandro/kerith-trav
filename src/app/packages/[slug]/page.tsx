import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { packagesData, getPackage } from "@/data/packages";
import PageHeader from "@/components/page-header";
import PackageBooking from "@/components/package-booking";
import Photo from "@/components/photo";
import { FiCheckCircle, FiStar, FiArrowRight } from "react-icons/fi";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return packagesData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return { title: "Package not found | Kerith Travels" };
  return {
    title: `${pkg.name} — ${pkg.duration} | Kerith Travels`,
    description: pkg.desc,
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const others = packagesData.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`${pkg.category} · ${pkg.location}`}
        title={pkg.name.split(",")[0]}
        accent={pkg.name.split(",")[1]?.trim().toLowerCase()}
        lede={pkg.desc}
        image={pkg.img}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Packages", href: "/packages" },
          { label: pkg.name },
        ]}
      />

      <section className="bg-ink py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="relative aspect-[16/8] overflow-hidden rounded-[30px] border border-white/10">
              <Photo
                src={pkg.img}
                alt={pkg.name}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-5 left-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] tracking-wide text-cream/85 backdrop-blur">
                  {pkg.duration}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] text-amber-2 backdrop-blur">
                  <FiStar className="fill-amber-2" size={11} /> {pkg.rating}
                </span>
              </div>
            </div>

            {/* highlights */}
            <h2 className="display mt-14 text-3xl text-cream">
              What you&apos;ll
              <span className="gradient-text italic"> remember</span>
            </h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-3">
              {pkg.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-ink-3/60 p-5 text-sm text-cream/70"
                >
                  <FiCheckCircle size={17} className="mt-0.5 shrink-0 text-jade" />
                  {h}
                </li>
              ))}
            </ul>

            {/* itinerary */}
            <h2 className="display mt-14 text-3xl text-cream">
              Day by
              <span className="gradient-text italic"> day</span>
            </h2>
            <ol className="mt-8 space-y-5 border-l border-white/10 pl-6 md:pl-8">
              {pkg.itinerary.map((d) => (
                <li key={d.day} className="relative">
                  <span className="absolute -left-[34px] grid h-7 w-7 place-items-center rounded-full border border-amber/50 bg-ink text-[11px] text-amber-2 md:-left-[42px]">
                    {d.day}
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-amber-2">
                      Day {d.day}
                    </p>
                    <h3 className="display mt-1.5 text-xl text-cream">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">
                      {d.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* includes */}
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[26px] border border-white/10 bg-ink-3/60 p-7">
                <span className="eyebrow">What&apos;s included</span>
                <ul className="mt-5 space-y-3 text-sm text-cream/70">
                  {pkg.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3">
                      <FiCheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-jade"
                      />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[26px] border border-white/10 bg-ink-3/60 p-7">
                <span className="eyebrow">Good to know</span>
                <ul className="mt-5 space-y-3 text-sm text-cream/65">
                  <li>Prices are per person on twin-share occupancy.</li>
                  <li>Visa handling and travel insurance can be added at checkout.</li>
                  <li>Free date changes up to 30 days before departure.</li>
                  <li>Custom dates available — ask for a private departure.</li>
                </ul>
              </div>
            </div>

            {/* other packages */}
            <div className="mt-14">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="display text-3xl text-cream">
                  More ways to go
                </h2>
                <Link
                  href="/packages"
                  className="text-sm text-cream/55 transition hover:text-amber-2"
                >
                  All packages →
                </Link>
              </div>
              <div className="mt-7 grid gap-5 sm:grid-cols-3">
                {others.map((p) => (
                  <Link
                    key={p.id}
                    href={`/packages/${p.slug}`}
                    className="group overflow-hidden rounded-[24px] border border-white/10 bg-ink-3/70 transition-colors hover:border-amber/50"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <Photo
                        src={p.img}
                        alt={p.name}
                        sizes="(max-width: 640px) 100vw, 28vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-3 to-transparent" />
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-amber-2">
                        {p.duration}
                      </p>
                      <p className="display mt-1.5 text-lg text-cream">
                        {p.name}
                      </p>
                      <p className="mt-3 flex items-center justify-between text-sm text-cream/60">
                        ₹{p.priceINR.toLocaleString("en-IN")}
                        <FiArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <PackageBooking
              id={pkg.id}
              priceINR={pkg.priceINR}
              rating={pkg.rating}
              duration={pkg.duration}
              stay={pkg.stay}
              transport={pkg.transport}
            />
          </aside>
        </div>
      </section>
    </>
  );
}
