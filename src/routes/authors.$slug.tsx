import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { BookCard } from "@/components/cards";
import { getAuthor } from "@/data/authors";
import { books } from "@/data/books";
import { getEvent } from "@/data/events";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    return {
      author,
      titles: books.filter((b) => author.books.includes(b.slug)),
      event: author.eventSlug ? (getEvent(author.eventSlug) ?? null) : null,
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Author unavailable — Ampersand & Ash" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { author } = loaderData;
    return {
      meta: [
        { title: `${author.name} — Ampersand & Ash` },
        { name: "description", content: author.shortBio },
        { property: "og:title", content: author.name },
        { property: "og:description", content: author.shortBio },
        { property: "og:url", content: `/authors/${params.slug}` },
        { property: "og:type", content: "profile" },
      ],
      links: [{ rel: "canonical", href: `/authors/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: author.name,
            jobTitle: author.role,
            description: author.shortBio,
          }),
        },
      ],
    };
  },
  component: AuthorDetail,
});

function AuthorDetail() {
  const { author, titles, event } = Route.useLoaderData();

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
          <nav aria-label="Breadcrumb" className="label-eyebrow">
            <Link to="/authors" className="link-underline">
              Authors
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-muted-foreground">{author.genre}</span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <img
                src={author.portrait}
                alt={`Portrait of ${author.name}`}
                className="aspect-[4/5] w-full object-cover"
              />
            </Reveal>
            <div className="lg:col-span-6 lg:pt-6">
              <Reveal>
                <p className="label-eyebrow text-terracotta">{author.role}</p>
                <h1 className="mt-5 display-lg">{author.name}</h1>
                <p className="mt-8 text-xl leading-relaxed text-foreground/85">{author.shortBio}</p>
                {author.bio.map((p) => (
                  <p key={p} className="mt-5 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {event && (
                  <Link
                    to="/events/$slug"
                    params={{ slug: event.slug }}
                    className="mt-10 block border border-border bg-ivory p-6 transition-colors hover:border-terracotta"
                  >
                    <p className="label-eyebrow text-terracotta">Appearing at the shop</p>
                    <p className="mt-3 font-display text-xl">{event.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.displayDate} · {event.time}
                    </p>
                  </Link>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24">
          <h2 className="border-t border-border pt-8 display-md">On our shelves</h2>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
            {titles.map((b, i) => (
              <Reveal key={b.slug} delay={i * 80}>
                <BookCard book={b} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
