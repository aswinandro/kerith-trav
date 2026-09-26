import Link from "next/link";
import Photo from "@/components/photo";

type Crumb = { label: string; href?: string };

export default function PageHeader({
  eyebrow,
  title,
  accent,
  lede,
  image,
  crumbs = [],
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  image?: string;
  crumbs?: Crumb[];
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-white/10 pb-20 pt-36 md:pb-24 md:pt-44">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Photo
            src={image}
            alt=""
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink" />
        </div>
      )}
      <img
        src="/images/svg/topography.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 -z-10 w-[34rem] opacity-[0.12]"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream/45">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>✦</span>}
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="transition-colors hover:text-amber-2"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-cream/75">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display mt-6 max-w-3xl text-[clamp(2.4rem,5.4vw,4.4rem)] text-cream">
          {title}
          {accent && <span className="gradient-text italic"> {accent}</span>}
        </h1>
        {lede && <p className="lede mt-6 max-w-2xl">{lede}</p>}
      </div>
    </header>
  );
}
