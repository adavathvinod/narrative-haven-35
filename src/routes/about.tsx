import { createFileRoute, Link } from "@tanstack/react-router";
import { img } from "@/lib/images";
import { Reveal } from "@/components/reveal";
import { PageHero, NewsletterSection } from "@/components/sections";
import { staff } from "@/data/people";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ampersand & Ash" },
      {
        name: "description",
        content:
          "Why we built an independent bookstore on Fernhill Row: our story, our philosophy, our space, our booksellers and our community in Bellamy Park.",
      },
      { property: "og:title", content: "About — Ampersand & Ash" },
      {
        property: "og:description",
        content: "The story behind an independent bookstore built by its own neighbourhood.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About the shop"
        title={
          <>
            We knocked on ninety-one doors before we ordered a single{" "}
            <span className="italic">book.</span>
          </>
        }
        intro="Ampersand & Ash is an independent bookstore, reading room and event space built with — and partly by — the street it stands on."
      />

      {/* Our story */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="label-eyebrow text-terracotta">01 — Our story</p>
                <h2 className="mt-5 display-md">A shop that kept describing itself</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xl leading-relaxed text-foreground/85">
                  Rosa spent eleven years in publishing watching good books disappear because
                  nobody was standing in a room able to say: this one, for you, today.
                </p>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  She left in the spring, took a lease on a former hardware store with a
                  double-height ceiling and dreadful wiring, and spent six weeks walking Fernhill
                  Row with a clipboard asking people what they actually wanted from a bookshop. The
                  answers reshaped the floor plan twice. The most requested thing was not a genre —
                  it was chairs.
                </p>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  So there are eleven chairs, and none of them are for sale.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — dark pull quote */}
      <section className="bg-espresso text-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="label-eyebrow text-paper/45">02 — Our philosophy</p>
            <blockquote className="mt-8 max-w-5xl display-lg text-paper">
              “Discovery cannot be automated. It requires a person who has read the whole thing and
              is willing to be{" "}
              <span className="italic text-terracotta">wrong in public.</span>”
            </blockquote>
          </Reveal>
          <div className="mt-16 grid gap-10 border-t border-paper/15 pt-12 sm:grid-cols-3">
            {[
              {
                t: "Independent first",
                c: "A third of our shelf space goes to presses publishing fewer than twenty titles a year. That is where the risk-taking happens.",
              },
              {
                t: "Read before recommended",
                c: "No shelf-talker goes up unless one of us has finished the book. Not the proof summary. The book.",
              },
              {
                t: "A room, not a funnel",
                c: "You can stay three hours and buy nothing. This is a feature of the design, not an oversight.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 90}>
                <h3 className="font-display text-2xl">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{item.c}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our space */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="label-eyebrow text-terracotta">03 — Our space</p>
            <h2 className="mt-5 max-w-3xl display-lg">
              A former hardware store with terrible wiring and a perfect ceiling.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <img
                src={img.storeAtrium}
                alt="The double-height main room with a mezzanine of shelves"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover lg:aspect-[4/3]"
              />
              <p className="mt-3 text-xs text-muted-foreground">
                The main room and mezzanine. Six thousand titles, two ladders.
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5 lg:pt-20">
              <img
                src={img.childrensCorner}
                alt="The Burrow, the children's corner, with low shelves and a window seat"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="mt-3 text-xs text-muted-foreground">
                The Burrow. Everything at the height of a five-year-old, including the light switch.
              </p>
              <p className="mt-8 leading-relaxed text-muted-foreground">
                Upstairs is the Reading Room: forty chairs when we clear it for an event, a long
                table and a kettle the rest of the time. Downstairs, the shelves are on castors so
                the whole floor can be rolled back by two people in under ten minutes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our people */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="label-eyebrow text-terracotta">04 — Our people</p>
            <h2 className="mt-5 display-lg">Three booksellers, one opinion each.</h2>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {staff.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <img
                  src={p.portrait}
                  alt={`Portrait of ${p.name}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <h3 className="mt-5 font-display text-2xl">{p.name}</h3>
                <p className="mt-1 label-eyebrow">{p.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.line}</p>
                <p className="mt-4 text-sm italic text-foreground/70">Reads: {p.reads}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img
              src={img.storefront}
              alt="Neighbours passing the storefront on Fernhill Row"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="label-eyebrow text-terracotta">05 — Our community</p>
            <h2 className="mt-5 display-lg">The street made this shop.</h2>
            <p className="mt-8 leading-relaxed text-foreground/80">
              Every quarter we give the Reading Room free to a local group — a writing circle, an
              ESOL class, the neighbourhood association, whoever asks first. Ten per cent of every
              Neighbourhood Night goes to the Bellamy Park school library fund.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              If you run something that needs forty chairs and a kettle on a weeknight, write to us.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-block bg-primary px-8 py-4 label-eyebrow text-primary-foreground transition-colors hover:bg-terracotta"
            >
              Get in touch
            </Link>
          </Reveal>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
