import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/images";
import { Reveal } from "@/components/reveal";
import { SectionHeading, NewsletterSection } from "@/components/sections";
import { EventCard, ArticleCard } from "@/components/cards";
import { featuredBooks, formatPrice } from "@/data/books";
import { upcomingEvents } from "@/data/events";
import { authors } from "@/data/authors";
import { articles } from "@/data/journal";
import { store } from "@/data/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ampersand & Ash — An Independent Bookstore in Portland" },
      {
        name: "description",
        content:
          "A place for people who love books. Independent bookstore, reading room and event space on Fernhill Row, Bellamy Park, Portland.",
      },
      { property: "og:title", content: "Ampersand & Ash — An Independent Bookstore" },
      {
        property: "og:description",
        content:
          "Discover stories, ideas, and unexpected worlds at your new neighbourhood bookstore.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const experiences = [
  {
    n: "01",
    title: "Browse",
    copy: "Take your time. There is always something unexpected waiting on the third shelf down.",
    image: img.storeAtrium,
  },
  {
    n: "02",
    title: "Discover",
    copy: "Recommendations from people who genuinely love books — handwritten, signed, arguable.",
    image: img.stillLife,
  },
  {
    n: "03",
    title: "Gather",
    copy: "Events, conversations, readings and ideas. Four nights a week the shop becomes a room.",
    image: img.storeInterior,
  },
  {
    n: "04",
    title: "Stay",
    copy: "Eleven chairs, none of them for sale. A space to slow down and spend an afternoon.",
    image: img.childrensCorner,
  },
];

function Home() {
  const featured = featuredBooks.slice(0, 5);
  const spotlight = authors[0]!;
  const journal = articles.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden bg-espresso">
        <img
          src={img.storeAtrium}
          alt="The main room of Ampersand & Ash, with floor-to-ceiling shelves and afternoon light"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          width={768}
          height={1344}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/45 to-espresso/70" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-40 sm:px-8 sm:pb-24">
          <Reveal>
            <p className="label-eyebrow text-paper/70">
              Opening this autumn · {store.address.line2}, {store.address.city}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 max-w-[15ch] display-xl text-paper">
              A place for people who <span className="italic text-terracotta">love</span> books.
            </h1>
          </Reveal>
          <Reveal delay={240} className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-md text-lg leading-relaxed text-paper/75">
              Discover stories, ideas, and unexpected worlds at your new neighbourhood bookstore.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/books"
                className="group inline-flex items-center gap-3 bg-paper px-8 py-4 label-eyebrow text-espresso transition-colors hover:bg-terracotta hover:text-paper"
              >
                Explore the Bookshop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/visit"
                className="inline-flex items-center border border-paper/60 px-8 py-4 label-eyebrow text-paper transition-colors hover:bg-paper hover:text-espresso"
              >
                Plan Your Visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED BOOKS — editorial horizontal rows */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading
            eyebrow="On the front table"
            title="Six books we are pressing into people's hands."
            action={{ to: "/books", label: "Explore all books" }}
          />

          <div className="mt-14">
            {featured.map((book, i) => (
              <Reveal key={book.slug}>
                <Link
                  to="/books/$slug"
                  params={{ slug: book.slug }}
                  className="group grid grid-cols-[5.5rem_1fr] items-start gap-6 border-t border-border py-8 transition-colors hover:bg-paper sm:gap-10 md:grid-cols-[3rem_9rem_1fr_auto] md:items-center"
                >
                  <span className="hidden font-display text-sm text-muted-foreground md:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="overflow-hidden bg-secondary">
                    <img
                      src={book.cover}
                      alt={`Cover of ${book.title}`}
                      loading="lazy"
                      width={800}
                      height={1104}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="label-eyebrow text-terracotta">{book.genre}</p>
                    <h3 className="mt-2 display-md transition-colors group-hover:text-terracotta">
                      {book.title}
                    </h3>
                    <p className="mt-1.5 text-sm italic text-muted-foreground">{book.author}</p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/75">
                      {book.blurb}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center gap-6 md:col-span-1 md:flex-col md:items-end md:gap-3">
                    <span className="font-display text-2xl tabular-nums">
                      {formatPrice(book.price)}
                    </span>
                    <span className="label-eyebrow inline-flex items-center gap-1.5 whitespace-nowrap">
                      View book
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* STORY — asymmetrical */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <img
                src={img.storeInterior}
                alt="Readers in armchairs by the window at Ampersand & Ash"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
            <div className="lg:col-span-5 lg:pt-16">
              <Reveal>
                <p className="label-eyebrow text-terracotta">Our story</p>
                <h2 className="mt-5 display-lg">
                  More than a <span className="italic">bookstore.</span>
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-foreground/80">
                  We built this place because the shop we kept describing to people at parties did
                  not exist within walking distance of anyone we knew.
                </p>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  A room where you can meet the author you have read three times over. Where a
                  bookseller who has read the whole thing tells you the truth about it. Where you
                  can sit down for an hour without buying anything and nobody makes it awkward.
                </p>
                <blockquote className="mt-10 border-l-2 border-terracotta pl-6 text-2xl italic leading-snug">
                  “A shop is only really a shop for about eight hours a day. The rest of the time
                  it should be a room the neighbourhood owns.”
                </blockquote>
                <p className="mt-4 label-eyebrow">Rosa Iversen, founder</p>
                <Link
                  to="/about"
                  className="mt-10 inline-flex items-center gap-2 label-eyebrow link-underline"
                >
                  Read our story <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="bg-espresso text-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="label-eyebrow text-paper/50">The experience</p>
            <h2 className="mt-5 max-w-3xl display-lg text-paper">
              Four reasons to lose an afternoon here.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((e, i) => (
              <Reveal key={e.n} delay={i * 80} className="group bg-espresso p-7">
                <div className="overflow-hidden">
                  <img
                    src={e.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover opacity-80 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-6 label-eyebrow text-terracotta">{e.n}</p>
                <h3 className="mt-3 font-display text-3xl">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{e.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading
            eyebrow="What's on"
            title="Upcoming at the shop."
            action={{ to: "/events", label: "View all events" }}
          />
          <div className="mt-12">
            {upcomingEvents.slice(0, 4).map((event) => (
              <Reveal key={event.slug}>
                <EventCard event={event} />
              </Reveal>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* AUTHOR SPOTLIGHT */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:pt-10">
              <Reveal>
                <p className="label-eyebrow text-terracotta">Author spotlight</p>
                <h2 className="mt-5 display-lg">{spotlight.name}</h2>
                <p className="mt-3 text-sm italic text-muted-foreground">{spotlight.role}</p>
                <p className="mt-8 leading-relaxed text-foreground/80">{spotlight.bio[0]}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{spotlight.bio[1]}</p>
                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <Link
                    to="/authors/$slug"
                    params={{ slug: spotlight.slug }}
                    className="label-eyebrow link-underline"
                  >
                    Read more
                  </Link>
                  <Link to="/authors" className="label-eyebrow link-underline">
                    Meet our authors
                  </Link>
                </div>
                {spotlight.eventSlug && (
                  <Link
                    to="/events/$slug"
                    params={{ slug: spotlight.eventSlug }}
                    className="mt-10 block border border-border bg-ivory p-6 transition-colors hover:border-terracotta"
                  >
                    <p className="label-eyebrow text-terracotta">Appearing here</p>
                    <p className="mt-3 font-display text-xl">Meg Bedford in Conversation</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      18 September 2026 · 19:00, The Reading Room
                    </p>
                  </Link>
                )}
              </Reveal>
            </div>
            <Reveal delay={120} className="lg:col-span-7">
              <img
                src={spotlight.portrait}
                alt={`Portrait of ${spotlight.name}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading
            eyebrow="The Journal"
            title="Stories worth spending time with."
            action={{ to: "/journal", label: "Read the journal" }}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-3">
            {journal.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />

      {/* VISIT */}
      <section className="relative overflow-hidden bg-espresso text-paper">
        <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-2">
          <div className="order-2 px-5 py-20 sm:px-8 sm:py-28 lg:order-1 lg:px-16">
            <Reveal>
              <p className="label-eyebrow text-paper/50">Visit us</p>
              <h2 className="mt-5 display-lg text-paper">Come find us.</h2>
              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                <div>
                  <p className="label-eyebrow text-paper/45">Address</p>
                  <p className="mt-3 leading-relaxed text-paper/80">
                    {store.address.line1}
                    <br />
                    {store.address.line2}
                    <br />
                    {store.address.city}, {store.address.region} {store.address.postal}
                  </p>
                  <p className="mt-6 text-paper/80">{store.phone}</p>
                  <a href={`mailto:${store.email}`} className="link-underline text-paper/80">
                    {store.email}
                  </a>
                </div>
                <div>
                  <p className="label-eyebrow text-paper/45">Opening hours</p>
                  <ul className="mt-3 space-y-2 text-sm text-paper/80">
                    {store.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-4 border-b border-paper/10 pb-2">
                        <span>{h.days}</span>
                        <span className="tabular-nums">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link
                to="/visit"
                className="mt-12 inline-flex items-center gap-3 bg-paper px-8 py-4 label-eyebrow text-espresso transition-colors hover:bg-terracotta hover:text-paper"
              >
                Directions & parking <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={img.storefront}
              alt="The Ampersand & Ash storefront on Fernhill Row at dusk"
              loading="lazy"
              className="h-full min-h-[24rem] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
