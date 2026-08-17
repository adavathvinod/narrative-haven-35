import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { books, formatPrice } from "@/data/books";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type CartLine = { slug: string; qty: number };

type CartApi = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartApi | null>(null);
const KEY = "aa-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { slug, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback(
    (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
    [],
  );

  const setQty = useCallback(
    (slug: string, qty: number) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.slug !== slug)
          : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
      ),
    [],
  );

  const value = useMemo<CartApi>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((sum, l) => {
      const book = books.find((b) => b.slug === l.slug);
      return sum + (book ? book.price * l.qty : 0);
    }, 0);
    return { lines, count, total, add, remove, setQty, open, setOpen };
  }, [lines, add, remove, setQty, open]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

function CartDrawer() {
  const { lines, total, setQty, remove, open, setOpen } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full border-l bg-paper sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="display-md">Your bag</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="text-sm text-muted-foreground">
              Nothing here yet. There are six hundred things downstairs worth carrying home.
            </p>
            <Link
              to="/books"
              onClick={() => setOpen(false)}
              className="label-eyebrow text-foreground link-underline"
            >
              Browse the shelves
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y overflow-y-auto px-6">
              {lines.map((line) => {
                const book = books.find((b) => b.slug === line.slug);
                if (!book) return null;
                return (
                  <li key={line.slug} className="flex gap-4 py-5">
                    <img
                      src={book.cover}
                      alt=""
                      loading="lazy"
                      className="h-28 w-20 shrink-0 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg leading-tight">{book.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center border">
                          <button
                            aria-label={`Decrease quantity of ${book.title}`}
                            className="p-1.5 hover:bg-secondary"
                            onClick={() => setQty(line.slug, line.qty - 1)}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-sm tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            aria-label={`Increase quantity of ${book.title}`}
                            className="p-1.5 hover:bg-secondary"
                            onClick={() => setQty(line.slug, line.qty + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm tabular-nums">
                          {formatPrice(book.price * line.qty)}
                        </span>
                        <button
                          aria-label={`Remove ${book.title}`}
                          className="ml-auto text-muted-foreground hover:text-foreground"
                          onClick={() => remove(line.slug)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="label-eyebrow">Subtotal</span>
                <span className="font-display text-2xl tabular-nums">{formatPrice(total)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Reserve online, pay in store. We hold books for five days.
              </p>
              <button className="mt-5 w-full bg-primary px-6 py-4 label-eyebrow text-primary-foreground transition-colors hover:bg-espresso">
                Reserve for collection
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
