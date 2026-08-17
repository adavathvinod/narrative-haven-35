/**
 * Store information. Content is kept separate from presentation so it can
 * later be sourced from a CMS without touching components.
 */
export const store = {
  name: "Ampersand & Ash",
  tagline: "For readers, dreamers, and the endlessly curious.",
  description:
    "An independent bookstore, reading room and event space on Fernhill Row — opening this autumn in Bellamy Park.",
  address: {
    line1: "42 Fernhill Row",
    line2: "Bellamy Park",
    city: "Portland",
    region: "OR",
    postal: "97214",
  },
  phone: "(503) 555-0142",
  email: "hello@ampersandandash.com",
  hours: [
    { days: "Monday — Thursday", time: "9:00 — 19:00" },
    { days: "Friday", time: "9:00 — 21:00" },
    { days: "Saturday", time: "10:00 — 21:00" },
    { days: "Sunday", time: "10:00 — 17:00" },
  ],
  parking:
    "Two hours of free street parking on Fernhill Row, and a public lot behind the old cannery on Weir Street, three minutes on foot.",
  transit: "Bus 14 and 71 stop at Fernhill & Ash. Streetcar line B, Bellamy Park stop.",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
};

export const fullAddress = `${store.address.line1}, ${store.address.line2}, ${store.address.city}, ${store.address.region} ${store.address.postal}`;
