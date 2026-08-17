import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { BookCard } from "@/components/cards";
import { getEvent, upcomingEvents } from "@/data/events";
import { books } from "@/data/books";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = getEvent(params.slug);
    if (!event) throw notFound();
    return {
      event,
      related: books.filter((b) => event.relatedBooks.includes(b.slug)),
      more: upcomingEvents.filter((e) => e.slug !== params.slug).slice(0, 3),
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Event unavailable — Ampersand & Ash" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} — Ampersand & Ash` },
        { name: "description", content: event.blurb },
        { property: "og:title", content: event.title },
        { property: "og:description", content: event.blurb },
        { property: "og:url", content: `/events/${params.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/events/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            startDate: event.date,
            description: event.blurb,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: `Ampersand & Ash — ${event.location}`,
              address: "42 Fernhill Row, Bellamy Park, Portland, OR 97214",
            },
            performer: { "@type": "Person", name: event.speaker },
          }),
        },
      ],
    };
  },
  component: EventDetail,
});

function EventDetail() {
  const { event, related, more } = Route.useLoaderData();

  return (
    <>
      <section className="relative overflow-hidden bg-espresso text-paper">
        <img src={event.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-espresso/55" />
        <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
          <Reveal>
            <nav aria-label="Breadcrumb" className="label-eyebrow text-paper/60">
              <Link to="/events" className="link-underline">
                Events
              </Link>
              <span className="mx-2">/</span>
              <span>{event.category}</span>
            </nav>
            <h1 className="mt-8 max-w-4xl display-lg text-paper">{event.title}</h1>
            <p className="mt-5 text-xl italic text-paper/75">{event.speaker}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xl leading-relaxed text-foreground/85">{event.blurb}</p>
              {event.description.map((p) => (
                <p key={p} className="mt-5 leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="border border-border bg-ivory p-8">
              <dl className="space-y-4">
                {[
                  ["Date", event.displayDate],
                  ["Time", event.time],
                  ["Location", event.location],
                  ["Speaker", event.speaker],
                  ["Tickets", event.price],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-border pb-3">
                    <dt className="label-eyebrow">{k}</dt>
                    <dd className="text-right text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
              <button
                onClick={() => toast.success("You're on the list. We'll email the details.")}
                className="mt-8 w-full bg-primary px-6 py-4 label-eyebrow text-primary-foreground transition-colors hover:bg-terracotta"
              >
                RSVP for this event
              </button>
              <button
                onClick={() => toast.success("Calendar invite on its way.")}
                className="mt-3 w-full border border-foreground px-6 py-4 label-eyebrow transition-colors hover:bg-foreground hover:text-paper"
              >
                Add to calendar
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ivory">
          <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24">
            <h2 className="border-t border-border pt-8 display-md">Books for this evening</h2>
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-3">
              {related.map((b, i) => (
                <Reveal key={b.slug} delay={i * 80}>
                  <BookCard book={b} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24">
          <h2 className="border-t border-border pt-8 display-md">Also coming up</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {more.map((e) => (
              <Link
                key={e.slug}
                to="/events/$slug"
                params={{ slug: e.slug }}
                className="group border-t border-border pt-6"
              >
                <p className="label-eyebrow text-terracotta">{e.displayDate}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight transition-colors group-hover:text-terracotta">
                  {e.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.speaker}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
