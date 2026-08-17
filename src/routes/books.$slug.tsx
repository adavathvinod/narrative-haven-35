import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { BookCard } from "@/components/cards";
import { useCart } from "@/components/cart";
import { formatPrice, getBook, relatedBooks } from "@/data/books";

export const Route = createFileRoute("/books/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return { book, related: relatedBooks(params.slug) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Book unavailable — Ampersand & Ash" }, { name: "robots", content: "noindex" }],
      };
    }
    const { book } = loaderData;
    return {
      meta: [
        { title: `${book.title} by ${book.author} — Ampersand & Ash` },
        { name: "description", content: book.blurb },
        { property: "og:title", content: `${book.title} — ${book.author}` },
        { property: "og:description", content: book.blurb },
        { property: "og:url", content: `/books/${params.slug}` },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `/books/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            name: book.title,
            author: { "@type": "Person", name: book.author },
            isbn: book.isbn,
            numberOfPages: book.pages,
            publisher: book.publisher,
            datePublished: book.published,
            genre: book.genre,
            offers: {
              "@type": "Offer",
              price: book.price,
              priceCurrency: "USD",
              availability:
                book.availability === "Pre-order"
                  ? "https://schema.org/PreOrder"
                  : "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: BookDetail,
});

function BookDetail() {
  const { book, related } = Route.useLoaderData();
  const { add } = useCart();

  const details = [
    ["Genre", book.genre],
    ["Publisher", book.publisher],
    ["Published", book.published],
    ["Pages", String(book.pages)],
    ["ISBN", book.isbn],
    ["Availability", book.availability],
  ] as const;

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <nav aria-label="Breadcrumb" className="label-eyebrow">
            <Link to="/books" className="link-underline">
              Books
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-muted-foreground">{book.genre}</span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="bg-secondary">
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title} by ${book.author}`}
                  width={800}
                  height={1104}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7 lg:pt-4">
              <Reveal>
                <p className="label-eyebrow text-terracotta">{book.genre}</p>
                <h1 className="mt-5 display-lg">{book.title}</h1>
                <p className="mt-4 text-xl italic text-muted-foreground">{book.author}</p>

                <p className="mt-10 text-xl leading-relaxed text-foreground/85">{book.blurb}</p>
                {book.description.map((p) => (
                  <p key={p} className="mt-5 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}

                <div className="mt-10 flex flex-wrap items-center gap-6 border-y border-border py-6">
                  <span className="font-display text-4xl tabular-nums">
                    {formatPrice(book.price)}
                  </span>
                  <span className="label-eyebrow text-olive">{book.availability}</span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => add(book.slug)}
                    className="inline-flex items-center gap-3 bg-primary px-8 py-4 label-eyebrow text-primary-foreground transition-colors hover:bg-terracotta"
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to bag
                  </button>
                  <button
                    onClick={() => {
                      add(book.slug);
                      toast.success("Reserved. We'll hold it at the till for five days.");
                    }}
                    className="border border-foreground px-8 py-4 label-eyebrow transition-colors hover:bg-foreground hover:text-paper"
                  >
                    Reserve in store
                  </button>
                  <button
                    onClick={() => toast.success(`${book.title} saved to your wishlist.`)}
                    className="inline-flex items-center gap-2 px-4 py-4 label-eyebrow text-muted-foreground transition-colors hover:text-terracotta"
                  >
                    <Heart className="h-4 w-4" /> Wishlist
                  </button>
                </div>

                <dl className="mt-12 grid gap-x-10 gap-y-4 border-t border-border pt-8 sm:grid-cols-2">
                  {details.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-border pb-3">
                      <dt className="label-eyebrow">{k}</dt>
                      <dd className="text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="border-t border-border pt-8 display-md">You might also like</h2>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-3">
            {related.map((b, i) => (
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
