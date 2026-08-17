import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("That doesn't look like an email address.");
      return;
    }
    toast.success("You're on the list. We write rarely and mean it.");
    setEmail("");
  };

  const dark = tone === "dark";

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <label htmlFor={`nl-${tone}`} className="sr-only">
        Email address
      </label>
      <input
        id={`nl-${tone}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className={cn(
          "min-w-0 flex-1 border-b bg-transparent px-1 py-3 text-base outline-none transition-colors placeholder:text-current/45 focus:border-terracotta",
          dark ? "border-paper/40 text-paper" : "border-foreground/30 text-foreground",
        )}
      />
      <button
        type="submit"
        className={cn(
          "shrink-0 px-8 py-3.5 label-eyebrow transition-colors",
          dark
            ? "bg-paper text-espresso hover:bg-terracotta hover:text-paper"
            : "bg-primary text-primary-foreground hover:bg-terracotta",
        )}
      >
        Join the List
      </button>
    </form>
  );
}
