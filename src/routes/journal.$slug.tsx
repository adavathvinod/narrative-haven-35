import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/cards";
import { articles, getArticle } from "@/data/journal";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article, more: articles.filter((a) => a.slug !== params.slug).slice(0, 3) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable — Ampersand & Ash" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — The Journal | Ampersand & Ash` },
        { name: "description", content: article.standfirst },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.standfirst },
        { property: "og:url", content: `/journal/${params.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/journal/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.standfirst,
            author: { "@type": "Person", name: article.author },
            datePublished: article.date,
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, more } = Route.useLoaderData();

  return (
    <>
      <article className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
          <nav aria-label="Breadcrumb" className="label-eyebrow">
            <Link to="/journal" className="link-underline">
              Journal
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-muted-foreground">{article.category}</span>
          </nav>

          <Reveal>
            <h1 className="mt-10 max-w-4xl display-lg">{article.title}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
              {article.standfirst}
            </p>
            <p className="mt-8 label-eyebrow">
              {article.author} · {article.date} · {article.readingTime}
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-14">
            <img src={article.image} alt="" className="aspect-[16/9] w-full object-cover" />
          </Reveal>

          <div className="mx-auto mt-16 max-w-2xl pb-20">
            {article.body.map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i} className="mt-14 display-md">
                  {block.text}
                </h2>
              ) : block.type === "quote" ? (
                <blockquote
                  key={i}
                  className="my-12 border-l-2 border-terracotta pl-6 font-display text-2xl italic leading-snug sm:text-3xl"
                >
                  “{block.text}”
                </blockquote>
              ) : (
                <p key={i} className="mt-6 text-lg leading-[1.75] text-foreground/85">
                  {block.text}
                </p>
              ),
            )}
          </div>
        </div>
      </article>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24">
          <h2 className="border-t border-border pt-8 display-md">More from the Journal</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {more.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
