import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { NewsletterForm } from "@/components/newsletter";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  image?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-espresso text-paper" : "bg-ivory text-foreground",
      )}
    >
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-espresso/55" />
        </>
      )}
      <div
        className={cn(
          "relative mx-auto max-w-[1600px] px-5 pb-14 pt-36 sm:px-8 sm:pb-20 sm:pt-44",
          image && "text-paper",
        )}
      >
        <Reveal>
          <p className={cn("label-eyebrow", (dark || image) && "text-paper/60")}>{eyebrow}</p>
          <h1 className="mt-6 max-w-5xl display-lg">{title}</h1>
          {intro && (
            <p
              className={cn(
                "mt-7 max-w-2xl text-lg leading-relaxed",
                dark || image ? "text-paper/75" : "text-muted-foreground",
              )}
            >
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  action?: { to: string; label: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-end",
        className,
      )}
    >
      <div>
        <p className="label-eyebrow">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl display-lg">{title}</h2>
      </div>
      {action && (
        <Link
          to={action.to as never}
          className="label-eyebrow link-underline whitespace-nowrap text-foreground"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function NewsletterSection() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="grid gap-12 border border-border bg-paper px-6 py-14 sm:px-14 lg:grid-cols-[1fr_1fr] lg:items-end lg:px-20 lg:py-20">
          <div>
            <p className="label-eyebrow text-terracotta">Newsletter</p>
            <h2 className="mt-5 display-lg">Stay curious.</h2>
          </div>
          <div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              New books, upcoming events, staff recommendations, and stories from the bookstore —
              delivered occasionally, never excessively.
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
