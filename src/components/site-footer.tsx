import { Link } from "@tanstack/react-router";
import { store } from "@/data/store";
import { NewsletterForm } from "@/components/newsletter";

const columns = [
  {
    title: "Shop",
    links: [
      { to: "/books", label: "All books" },
      { to: "/authors", label: "Authors" },
      { to: "/journal", label: "Journal" },
    ],
  },
  {
    title: "The shop",
    links: [
      { to: "/about", label: "About us" },
      { to: "/events", label: "Events" },
      { to: "/visit", label: "Visit us" },
      { to: "/contact", label: "Contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="max-w-sm">
            <p className="font-display text-3xl leading-none">
              Ampersand <span className="italic text-terracotta">&amp;</span> Ash
            </p>
            <p className="mt-5 text-sm leading-relaxed text-paper/65">{store.description}</p>
            <div className="mt-7 space-y-1 text-sm text-paper/65">
              <p>{store.address.line1}</p>
              <p>
                {store.address.line2}, {store.address.city} {store.address.postal}
              </p>
              <p className="pt-2">{store.phone}</p>
              <a href={`mailto:${store.email}`} className="link-underline">
                {store.email}
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="label-eyebrow text-paper/45">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="link-underline text-sm text-paper/80">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="label-eyebrow text-paper/45">Newsletter</p>
            <p className="mt-5 text-sm text-paper/70">
              New books, events and staff recommendations — occasionally, never excessively.
            </p>
            <div className="mt-5">
              <NewsletterForm tone="dark" />
            </div>
            <div className="mt-8 flex gap-6">
              {store.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label-eyebrow text-paper/70 link-underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-20 font-display text-[clamp(1.75rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-paper/90">
          For readers, dreamers, and the endlessly curious.
        </p>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 pt-6 text-xs text-paper/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Ampersand &amp; Ash. An independent bookstore.</p>
          <p>Bellamy Park, {store.address.city}</p>
        </div>
      </div>
    </footer>
  );
}
