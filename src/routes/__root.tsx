import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart";
import { Toaster } from "@/components/ui/sonner";
import { fullAddress, store } from "@/data/store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="label-eyebrow">Error 404</p>
        <h1 className="mt-4 display-lg">This page is out of print.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist, or has been moved to another shelf.
        </p>
        <div className="mt-8">
          <Link to="/" className="bg-primary px-7 py-4 label-eyebrow text-primary-foreground">
            Back to the shop
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-md">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try again, or head back to the shop.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary px-6 py-3.5 label-eyebrow text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="border border-foreground px-6 py-3.5 label-eyebrow">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ampersand & Ash — Independent Bookstore" },
      { name: "description", content: store.description },
      { property: "og:site_name", content: store.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#f6f1e7" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Work+Sans:ital,wght@0,300..600;1,300..500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BookStore",
          name: store.name,
          description: store.description,
          address: {
            "@type": "PostalAddress",
            streetAddress: store.address.line1,
            addressLocality: store.address.city,
            addressRegion: store.address.region,
            postalCode: store.address.postal,
          },
          telephone: store.phone,
          email: store.email,
          openingHours: ["Mo-Th 09:00-19:00", "Fr 09:00-21:00", "Sa 10:00-21:00", "Su 10:00-17:00"],
          areaServed: fullAddress,
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <SiteHeader />
        <main id="main">
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster position="bottom-right" />
      </CartProvider>
    </QueryClientProvider>
  );
}
