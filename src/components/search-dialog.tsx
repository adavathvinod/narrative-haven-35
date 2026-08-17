import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { books } from "@/data/books";
import { authors } from "@/data/authors";
import { events } from "@/data/events";
import { articles } from "@/data/journal";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  const go = (fn: () => void) => {
    onOpenChange(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search books, authors, events, journal…" />
      <CommandList>
        <CommandEmpty>Nothing found. Ask us at the till instead.</CommandEmpty>
        <CommandGroup heading="Books">
          {books.map((b) => (
            <CommandItem
              key={b.slug}
              value={`${b.title} ${b.author} ${b.genre}`}
              onSelect={() =>
                go(() => navigate({ to: "/books/$slug", params: { slug: b.slug } }))
              }
            >
              {b.title} <span className="ml-2 text-muted-foreground">{b.author}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Authors">
          {authors.map((a) => (
            <CommandItem
              key={a.slug}
              value={`${a.name} ${a.genre}`}
              onSelect={() =>
                go(() => navigate({ to: "/authors/$slug", params: { slug: a.slug } }))
              }
            >
              {a.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Events">
          {events.map((e) => (
            <CommandItem
              key={e.slug}
              value={`${e.title} ${e.speaker}`}
              onSelect={() =>
                go(() => navigate({ to: "/events/$slug", params: { slug: e.slug } }))
              }
            >
              {e.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Journal">
          {articles.map((a) => (
            <CommandItem
              key={a.slug}
              value={`${a.title} ${a.category}`}
              onSelect={() =>
                go(() => navigate({ to: "/journal/$slug", params: { slug: a.slug } }))
              }
            >
              {a.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
