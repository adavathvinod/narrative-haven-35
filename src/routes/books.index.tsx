import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BookCard } from "@/components/cards";
import { NewsletterSection } from "@/components/sections";
import { books, genres } from "@/data/books";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/books/")({
  head: () => ({
    meta: [
      { title: "Books — Ampersand & Ash Bookshop" },
      {
        name: "description",
        content:
          "Browse the shelves: fiction, poetry, non-fiction, children's books and more. New releases, bestsellers and staff picks from our independent bookstore in Portland.",
      },
      { property: "og:title", content: "Books — Ampersand & Ash" },
      {
        property: "og:description",
        content: "New releases, bestsellers and staff picks, chosen by booksellers who read them.",
      },
      { property: "og:url", content: "/books" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/books" }],
  }),
  component: BooksPage,
});

const collections = [
  { key: "all", label: "Everything" },
  { key: "new", label: "New releases" },
  { key: "bestseller", label: "Bestsellers" },
  { key: "staff-pick", label: "Staff picks" },
] as const;

const sorts = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price, low to high" },
  { key: "price-desc", label: "Price, high to low" },
  { key: "title", label: "Title A–Z" },
] as const;

function BooksPage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<string>("All");
  const [collection, setCollection] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState(40);
  const [sort, setSort] = useState<string>("featured");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = books.filter((b) => {
      if (q && !`${b.title} ${b.author} ${b.genre}`.toLowerCase().includes(q)) return false;
      if (genre !== "All" && b.genre !== genre) return false;
      if (collection !== "all" && !b.tags.includes(collection as never)) return false;
      if (b.price > maxPrice) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "title") sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [query, genre, collection, maxPrice, sort]);

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 pb-12 pt-36 sm:px-8 sm:pb-16 sm:pt-44">
          <Reveal>
            <p className="label-eyebrow">The bookshop</p>
            <h1 className="mt-6 max-w-4xl display-lg">
              Six thousand titles. Every one of them chosen by a person.
            </h1>
          </Reveal>

          <Reveal delay={100} className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="relative max-w-lg">
              <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <label htmlFor="book-search" className="sr-only">
                Search books
              </label>
              <input
                id="book-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, author or genre"
                className="w-full border-b border-foreground/25 bg-transparent py-3 pl-7 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-terracotta"
              />
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-3 label-eyebrow">
                Under ${maxPrice}
                <input
                  type="range"
                  min={15}
                  max={40}
                  step={1}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="h-1 w-36 accent-terracotta"
                  aria-label="Maximum price"
                />
              </label>
              <label className="flex items-center gap-3 label-eyebrow">
                Sort
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border-b border-foreground/25 bg-transparent py-1 font-sans text-xs uppercase tracking-[0.18em] outline-none focus:border-terracotta"
                >
                  {sorts.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-2">
            {collections.map((c) => (
              <button
                key={c.key}
                onClick={() => setCollection(c.key)}
                className={cn(
                  "border px-4 py-2 label-eyebrow transition-colors",
                  collection === c.key
                    ? "border-foreground bg-foreground text-paper"
                    : "border-border hover:border-foreground",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="no-scrollbar mt-4 flex gap-5 overflow-x-auto pb-1">
            {["All", ...genres].map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={cn(
                  "whitespace-nowrap py-1 text-sm transition-colors",
                  genre === g
                    ? "text-terracotta underline underline-offset-4"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20">
          <p className="label-eyebrow border-t border-border pt-6">
            {results.length} {results.length === 1 ? "title" : "titles"}
          </p>
          {results.length === 0 ? (
            <p className="py-24 text-center font-display text-2xl text-muted-foreground">
              Nothing on that shelf. Try a wider search — or ask us, we order daily.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 sm:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((book, i) => (
                <Reveal key={book.slug} delay={(i % 4) * 70}>
                  <BookCard book={book} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
