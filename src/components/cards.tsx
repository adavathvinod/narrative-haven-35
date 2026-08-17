import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, type Book } from "@/data/books";
import type { StoreEvent } from "@/data/events";
import type { Author } from "@/data/authors";
import type { Article } from "@/data/journal";
import { cn } from "@/lib/utils";

export function BookCard({ book, className }: { book: Book; className?: string }) {
  return (
    <Link
      to="/books/$slug"
      params={{ slug: book.slug }}
      className={cn("group block", className)}
    >
      <div className="overflow-hidden bg-secondary">
        <img
          src={book.cover}
          alt={`Cover of ${book.title} by ${book.author}`}
          loading="lazy"
          width={800}
          height={1104}
          className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4">
        <p className="label-eyebrow">{book.genre}</p>
        <h3 className="mt-2 font-display text-xl leading-tight transition-colors group-hover:text-terracotta">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
        <p className="mt-3 text-sm tabular-nums">{formatPrice(book.price)}</p>
      </div>
    </Link>
  );
}

export function EventCard({ event }: { event: StoreEvent }) {
  return (
    <Link
      to="/events/$slug"
      params={{ slug: event.slug }}
      className="group grid gap-6 border-t border-border py-8 md:grid-cols-[8rem_1fr_auto] md:items-start md:gap-10"
    >
      <div>
        <p className="label-eyebrow text-terracotta">{event.category}</p>
        <p className="mt-2 font-display text-lg leading-tight">{event.displayDate}</p>
        <p className="mt-1 text-xs text-muted-foreground">{event.time}</p>
      </div>
      <div className="min-w-0">
        <h3 className="display-md transition-colors group-hover:text-terracotta">
          {event.title}
        </h3>
        <p className="mt-2 text-sm italic text-muted-foreground">{event.speaker}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/75">
          {event.blurb}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          {event.location} · {event.price}
        </p>
      </div>
      <span className="label-eyebrow inline-flex items-center gap-1.5 whitespace-nowrap text-foreground">
        RSVP <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

export function AuthorCard({ author }: { author: Author }) {
  return (
    <Link to="/authors/$slug" params={{ slug: author.slug }} className="group block">
      <div className="overflow-hidden bg-secondary">
        <img
          src={author.portrait}
          alt={`Portrait of ${author.name}`}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-4 label-eyebrow">{author.genre}</p>
      <h3 className="mt-2 font-display text-2xl leading-tight transition-colors group-hover:text-terracotta">
        {author.name}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {author.shortBio}
      </p>
    </Link>
  );
}

export function ArticleCard({ article, large }: { article: Article; large?: boolean }) {
  return (
    <Link to="/journal/$slug" params={{ slug: article.slug }} className="group block">
      <div className="overflow-hidden bg-secondary">
        <img
          src={article.image}
          alt=""
          loading="lazy"
          className={cn(
            "w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
            large ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        />
      </div>
      <p className="mt-4 label-eyebrow text-terracotta">{article.category}</p>
      <h3
        className={cn(
          "mt-2 font-display leading-tight transition-colors group-hover:text-terracotta",
          large ? "text-3xl sm:text-4xl" : "text-xl",
        )}
      >
        {article.title}
      </h3>
      <p
        className={cn(
          "mt-3 max-w-2xl leading-relaxed text-muted-foreground",
          large ? "text-base" : "text-sm",
        )}
      >
        {article.standfirst}
      </p>
      <p className="mt-4 text-xs text-muted-foreground">
        {article.author} · {article.date} · {article.readingTime}
      </p>
    </Link>
  );
}
