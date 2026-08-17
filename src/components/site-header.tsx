import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart";
import { SearchDialog } from "@/components/search-dialog";
import { store } from "@/data/store";

const nav = [
  { to: "/books", label: "Books" },
  { to: "/events", label: "Events" },
  { to: "/authors", label: "Authors" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/visit", label: "Visit" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, setOpen } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlay = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || !overlay;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b border-border bg-ivory/92 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-all duration-500 sm:px-8 lg:grid-cols-[1fr_auto_1fr]",
            solid ? "py-3.5" : "py-6",
          )}
        >
          <Link
            to="/"
            className={cn(
              "min-w-0 font-display text-xl leading-none tracking-tight transition-colors sm:text-2xl",
              solid ? "text-foreground" : "text-paper",
            )}
          >
            Ampersand <span className="italic text-terracotta">&amp;</span> Ash
          </Link>

          <nav className="hidden justify-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "label-eyebrow link-underline transition-colors",
                  solid ? "text-foreground/70 hover:text-foreground" : "text-paper/80 hover:text-paper",
                )}
                activeProps={{
                  className: solid ? "!text-terracotta" : "!text-paper",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            className={cn(
              "flex items-center justify-end gap-1 sm:gap-3",
              solid ? "text-foreground" : "text-paper",
            )}
          >
            <button
              aria-label="Search the shop"
              onClick={() => setSearchOpen(true)}
              className="p-2 transition-opacity hover:opacity-60"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              aria-label={`Bag, ${count} items`}
              onClick={() => setOpen(true)}
              className="relative p-2 transition-opacity hover:opacity-60"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-terracotta px-1 text-[10px] font-medium text-paper">
                  {count}
                </span>
              )}
            </button>
            <Link
              to="/visit"
              className={cn(
                "ml-2 hidden border px-5 py-2.5 label-eyebrow transition-colors lg:inline-block",
                solid
                  ? "border-foreground text-foreground hover:bg-foreground hover:text-paper"
                  : "border-paper/70 text-paper hover:bg-paper hover:text-foreground",
              )}
            >
              Visit Us
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="p-2 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-espresso text-paper transition-all duration-500 lg:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <span className="font-display text-xl">
            Ampersand <span className="italic text-terracotta">&amp;</span> Ash
          </span>
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8">
          {nav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="border-b border-paper/15 py-4 font-display text-4xl transition-colors hover:text-terracotta sm:text-5xl"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 pb-10 sm:px-8">
          <button
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
            className="label-eyebrow text-paper/70"
          >
            Search
          </button>
          <p className="mt-4 text-sm text-paper/60">
            {store.address.line1}, {store.address.line2}
          </p>
          <p className="mt-1 text-sm text-paper/60">{store.phone}</p>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
