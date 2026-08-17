import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { AuthorCard } from "@/components/cards";
import { PageHero, NewsletterSection } from "@/components/sections";
import { authors } from "@/data/authors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/authors/")({
  head: () => ({
    meta: [
      { title: "Authors — Ampersand & Ash" },
      {
        name: "description",
        content:
          "The novelists, essayists and poets we stock, host and argue about. Author profiles, featured books and upcoming appearances at our Portland bookstore.",
      },
      { property: "og:title", content: "Authors — Ampersand & Ash" },
      {
        property: "og:description",
        content: "The writers we stock, host and argue about.",
      },
      { property: "og:url", content: "/authors" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/authors" }],
  }),
  component: AuthorsPage,
});

function AuthorsPage() {
  const [genre, setGenre] = useState("All");
  const genreList = ["All", ...new Set(authors.map((a) => a.genre))];
  const list = genre === "All" ? authors : authors.filter((a) => a.genre === genre);

  return (
    <>
      <PageHero
        eyebrow="Authors"
        title={
          <>
            The writers we stock, host, and <span className="italic">argue about.</span>
          </>
        }
        intro="Every author on this page has either stood in our shop or is about to."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap gap-5 border-b border-border pb-6">
            {genreList.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={cn(
                  "text-sm transition-colors",
                  genre === g
                    ? "text-terracotta underline underline-offset-4"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <AuthorCard author={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
