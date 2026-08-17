import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { store } from "@/data/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ampersand & Ash" },
      {
        name: "description",
        content:
          "Get in touch with Ampersand & Ash: book orders, event enquiries, room hire and everything else. Fernhill Row, Bellamy Park, Portland.",
      },
      { property: "og:title", content: "Contact — Ampersand & Ash" },
      { property: "og:description", content: "Write to us, call us, or simply come in." },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent. We answer within two working days.");
    e.currentTarget.reset();
  };

  const field =
    "w-full border-b border-foreground/25 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-terracotta";

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
          <Reveal>
            <p className="label-eyebrow">Contact</p>
            <h1 className="mt-6 max-w-3xl display-lg">
              Write to us, call us, or simply <span className="italic">come in.</span>
            </h1>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label-eyebrow">
                      Name
                    </label>
                    <input id="name" name="name" required placeholder="Your name" className={`mt-3 ${field}`} />
                  </div>
                  <div>
                    <label htmlFor="email" className="label-eyebrow">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={`mt-3 ${field}`}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="label-eyebrow">
                    Subject
                  </label>
                  <select id="subject" name="subject" className={`mt-3 ${field}`}>
                    <option>A book order or special request</option>
                    <option>An event enquiry</option>
                    <option>Hiring the Reading Room</option>
                    <option>Press</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="label-eyebrow">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what you need."
                    className={`mt-3 resize-none ${field}`}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary px-10 py-4 label-eyebrow text-primary-foreground transition-colors hover:bg-terracotta"
                >
                  Send message
                </button>
                {sent && (
                  <p className="text-sm text-olive">
                    Thank you — we read everything and answer within two working days.
                  </p>
                )}
              </form>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="border border-border bg-ivory p-8">
                <p className="label-eyebrow text-terracotta">The shop</p>
                <p className="mt-5 leading-relaxed">
                  {store.address.line1}
                  <br />
                  {store.address.line2}
                  <br />
                  {store.address.city}, {store.address.region} {store.address.postal}
                </p>
                <p className="mt-6">{store.phone}</p>
                <a href={`mailto:${store.email}`} className="link-underline">
                  {store.email}
                </a>

                <p className="mt-10 label-eyebrow text-terracotta">Opening hours</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {store.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4 border-b border-border pb-2">
                      <span>{h.days}</span>
                      <span className="tabular-nums">{h.time}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-10 label-eyebrow text-terracotta">Follow</p>
                <div className="mt-4 flex gap-6">
                  {store.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="label-eyebrow link-underline text-foreground"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
