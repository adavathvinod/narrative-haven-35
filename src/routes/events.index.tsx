import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { EventCard } from "@/components/cards";
import { PageHero, NewsletterSection } from "@/components/sections";
import { eventCategories, pastEvents, upcomingEvents } from "@/data/events";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events — Author Talks, Readings & Workshops | Ampersand & Ash" },
      {
        name: "description",
        content:
          "Author talks, book launches, poetry nights, children's storytelling, workshops and community evenings at our independent bookstore in Bellamy Park, Portland.",
      },
      { property: "og:title", content: "Events — Ampersand & Ash" },
      {
        property: "og:description",
        content: "Four nights a week the shop becomes a room. See what's on.",
      },
      { property: "og:url", content: "/events" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [category, setCategory] = useState<string>("All");
  const [view, setView] = useState<"upcoming" | "past">("upcoming");

  const source = view === "upcoming" ? upcomingEvents : pastEvents;
  const list = category === "All" ? source : source.filter((e) => e.category === category);

  return (
    <>
      <PageHero
        eyebrow="What's on"
        title={
          <>
            Four nights a week, the shop becomes a <span className="italic">room.</span>
          </>
        }
        intro="Author talks, launches, poetry after hours, storytelling for the very small, and one street party a season."
        image={img.storeInterior}
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-center gap-3 border-b border-border pb-6">
            {(["upcoming", "past"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-4 py-2 label-eyebrow transition-colors",
                  view === v ? "bg-foreground text-paper" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {v === "upcoming" ? "Upcoming" : "Past events"}
              </button>
            ))}
            <div className="no-scrollbar ml-auto flex gap-5 overflow-x-auto">
              {eventCategories.map((c) => (
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
          </div>

          <div className="mt-8">
            {list.length === 0 ? (
              <p className="py-24 text-center font-display text-2xl text-muted-foreground">
                Nothing in that category yet. Check back — the season fills quickly.
              </p>
            ) : (
              list.map((e) => (
                <Reveal key={e.slug}>
                  <EventCard event={e} />
                </Reveal>
              ))
            )}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
