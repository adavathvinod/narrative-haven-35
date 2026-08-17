import { createFileRoute, Link } from "@tanstack/react-router";
import { createFileRoute as _unused } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { NewsletterSection } from "@/components/sections";
import { img } from "@/lib/images";
import { fullAddress, store } from "@/data/store";

void _unused;

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit Us — Ampersand & Ash, Bellamy Park Portland" },
      {
        name: "description",
        content:
          "Find us at 42 Fernhill Row, Bellamy Park, Portland. Opening hours, parking, transit and directions to your neighbourhood independent bookstore.",
      },
      { property: "og:title", content: "Visit Us — Ampersand & Ash" },
      { property: "og:description", content: "Come find us on Fernhill Row." },
      { property: "og:url", content: "/visit" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/visit" }],
  }),
  component: VisitPage,
});

function VisitPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <>
      <section className="relative overflow-hidden bg-espresso">
        <img
          src={img.storefront}
          alt="The Ampersand & Ash storefront on Fernhill Row at dusk"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/60" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-40 sm:px-8 sm:pb-20">
          <Reveal>
            <p className="label-eyebrow text-paper/60">Visit us</p>
            <h1 className="mt-6 display-xl text-paper">Come find us.</h1>
            <p className="mt-6 max-w-md text-lg text-paper/75">
              42 Fernhill Row, on the corner where the old hardware store used to be.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-3">
          <Reveal>
            <p className="label-eyebrow text-terracotta">Address</p>
            <p className="mt-5 text-lg leading-relaxed">
              {store.address.line1}
              <br />
              {store.address.line2}
              <br />
              {store.address.city}, {store.address.region} {store.address.postal}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-block bg-primary px-8 py-4 label-eyebrow text-primary-foreground transition-colors hover:bg-terracotta"
            >
              Get directions
            </a>
          </Reveal>

          <Reveal delay={90}>
            <p className="label-eyebrow text-terracotta">Opening hours</p>
            <ul className="mt-5 space-y-3">
              {store.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 border-b border-border pb-2 text-sm">
                  <span>{h.days}</span>
                  <span className="tabular-nums">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              The Reading Room upstairs closes an hour earlier unless there's an event on.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="label-eyebrow text-terracotta">Getting here</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{store.parking}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{store.transit}</p>
            <p className="mt-8 text-sm">{store.phone}</p>
            <a href={`mailto:${store.email}`} className="link-underline text-sm">
              {store.email}
            </a>
            <Link to="/contact" className="mt-8 block label-eyebrow link-underline">
              Contact the shop
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-24">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="border border-border">
            <iframe
              title="Map showing the location of Ampersand & Ash"
              src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
              loading="lazy"
              className="h-[26rem] w-full grayscale-[0.35] sm:h-[34rem]"
            />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
