import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/cards";
import { NewsletterSection } from "@/components/sections";
import { articleCategories, articles } from "@/data/journal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "The Journal — Book Recommendations & Author Interviews | Ampersand & Ash" },
      {
        name: "description",
        content:
          "Staff picks, author interviews, reading guides and behind-the-scenes stories from an independent bookstore in Portland.",
      },
      { property: "og:title", content: "The Journal — Ampersand & Ash" },
      { property: "og:description", content: "Stories worth spending time with." },
      { property: "og:url", content: "/journal" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [category, setCategory] = useState<string>("All");
  const lead = articles.find((a) => a.featured) ?? articles[0]!;
  const rest = articles.filter((a) => a.slug !== lead.slug);
  const list = category === "All" ? rest : rest.filter((a) => a.category === category);

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
          <Reveal>
            <p className="label-eyebrow">The Journal — Issue 04</p>
            <h1 className="mt-6 max-w-4xl display-lg">
              Stories worth spending <span className="italic">time</span> with.
            </h1>
          </Reveal>

          <Reveal delay={120} className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <img
                src={lead.image}
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 lg:pt-4">
              <p className="label-eyebrow text-terracotta">Featured · {lead.category}</p>
              <h2 className="mt-4 display-md">{lead.title}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{lead.standfirst}</p>
              <p className="mt-6 text-xs text-muted-foreground">
                {lead.author} · {lead.date} · {lead.readingTime}
              </p>
              <a href={`/journal/${lead.slug}`} className="mt-8 inline-block label-eyebrow link-underline">
                Read the piece
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="no-scrollbar flex gap-5 overflow-x-auto border-b border-border pb-6">
            {articleCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "whitespace-nowrap text-sm transition-colors",
                  category === c
                    ? "text-terracotta underline underline-offset-4"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
