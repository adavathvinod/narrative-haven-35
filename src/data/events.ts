import { img } from "@/lib/images";

export type StoreEvent = {
  slug: string;
  title: string;
  speaker: string;
  category: "Author talk" | "Book launch" | "Reading club" | "Children's" | "Poetry" | "Workshop" | "Community";
  date: string; // ISO
  displayDate: string;
  time: string;
  location: string;
  price: string;
  blurb: string;
  description: string[];
  image: string;
  relatedBooks: string[];
  past?: boolean;
};

export const events: StoreEvent[] = [
  {
    slug: "meg-bedford-in-conversation",
    title: "Meg Bedford in Conversation",
    speaker: "Meg Bedford with Priya Raman",
    category: "Author talk",
    date: "2026-09-18",
    displayDate: "18 September 2026",
    time: "19:00 — 20:30",
    location: "The Reading Room, upstairs",
    price: "Free, RSVP required",
    blurb:
      "Seven years, three abandoned drafts, one extraordinary novel. Bedford on writing the hours nobody records.",
    description: [
      "We open the store's event season with the novelist whose book we have pressed into more hands than any other this year. Bedford will read for twenty minutes, then sit down with critic Priya Raman for a conversation about time, houses and the long middle of a book.",
      "Signing to follow. Wine, and something warm if the evening turns.",
    ],
    image: img.storeInterior,
    relatedBooks: ["whispering-hours", "on-quiet-things"],
  },
  {
    slug: "salt-and-lichen-launch",
    title: "Salt and Lichen — Launch Night",
    speaker: "Megan E. Wells",
    category: "Book launch",
    date: "2026-09-26",
    displayDate: "26 September 2026",
    time: "18:30 — 20:00",
    location: "Ground floor, main room",
    price: "Free",
    blurb:
      "A decade of shoreline fieldwork, one book of essays, and a slideshow of nine miles of coast.",
    description: [
      "Wells brings her field notebooks — the actual, salt-warped notebooks — and talks through how a decade of looking at one stretch of coast became a book.",
      "Copies available on the night, signed.",
    ],
    image: img.stillLife,
    relatedBooks: ["salt-and-lichen"],
  },
  {
    slug: "poetry-after-hours",
    title: "Poetry After Hours",
    speaker: "Jane Hirshfield and three local poets",
    category: "Poetry",
    date: "2026-10-03",
    displayDate: "3 October 2026",
    time: "20:00 — 22:00",
    location: "Shop floor, shelves rolled back",
    price: "$8",
    blurb:
      "The doors lock at eight and the shop becomes something else entirely. Low light, four voices.",
    description: [
      "Once a month we close, dim the lights, roll the front tables back and give the room to poets. Hirshfield reads from Night Arithmetic alongside three poets from within a mile of this address.",
      "Limited to forty people. It sells out.",
    ],
    image: img.storeAtrium,
    relatedBooks: ["night-arithmetic"],
  },
  {
    slug: "saturday-storytelling",
    title: "Saturday Storytelling",
    speaker: "Fern, our children's bookseller",
    category: "Children's",
    date: "2026-10-10",
    displayDate: "Every Saturday from 10 October",
    time: "10:30 — 11:15",
    location: "The Burrow, children's corner",
    price: "Free, drop in",
    blurb:
      "Cushions, a picture book, and forty-five minutes where nobody has to be anywhere else.",
    description: [
      "Ages 2 to 7 with a grown-up. Fern reads two or three books, does the voices without embarrassment, and hands out a drawing sheet at the end.",
      "No booking. Arrive five minutes early for a good cushion.",
    ],
    image: img.childrensCorner,
    relatedBooks: ["the-lantern-fox"],
  },
  {
    slug: "the-slow-read-club",
    title: "The Slow Read Club",
    speaker: "Hosted by Theo, bookseller",
    category: "Reading club",
    date: "2026-10-15",
    displayDate: "15 October 2026",
    time: "19:00 — 20:30",
    location: "The Reading Room, upstairs",
    price: "Free, RSVP required",
    blurb:
      "One difficult book. Three months. No shame in not finishing — that's rather the point.",
    description: [
      "We take one demanding book per season and read it at eighty pages a month. This autumn: a novel we will announce at the first meeting, mostly for the drama.",
      "Newcomers always welcome, including those who haven't done the reading.",
    ],
    image: img.storeInterior,
    relatedBooks: ["on-quiet-things"],
  },
  {
    slug: "binding-workshop",
    title: "Bookbinding: A Beginner's Evening",
    speaker: "Ada Ferreira, bookbinder",
    category: "Workshop",
    date: "2026-10-24",
    displayDate: "24 October 2026",
    time: "18:00 — 21:00",
    location: "The Reading Room, upstairs",
    price: "$65, materials included",
    blurb:
      "Sew and case-bind a small notebook from scratch. Take it home the same night.",
    description: [
      "Ada has bound for three national libraries and can teach a coptic stitch to anyone with three hours and a little patience.",
      "Twelve places. All tools and papers provided.",
    ],
    image: img.stillLife,
    relatedBooks: ["on-quiet-things"],
  },
  {
    slug: "neighbourhood-night",
    title: "Neighbourhood Night",
    speaker: "Everyone on Fernhill Row",
    category: "Community",
    date: "2026-11-07",
    displayDate: "7 November 2026",
    time: "17:00 — late",
    location: "The shop and the pavement outside",
    price: "Free",
    blurb:
      "The street closes, the bakery brings bread, and we stay open until the last person leaves.",
    description: [
      "Our first proper street night. Local makers, the bakery two doors down, a record player in the window and 10% off everything on the shelves.",
      "Bring the neighbours you haven't met yet.",
    ],
    image: img.storefront,
    relatedBooks: ["cartographers-daughter"],
  },
  {
    slug: "opening-week-readings",
    title: "Opening Week: Nine Readers, Nine Minutes Each",
    speaker: "Nine writers from Bellamy Park",
    category: "Community",
    date: "2026-08-02",
    displayDate: "2 August 2026",
    time: "19:00 — 21:00",
    location: "Shop floor",
    price: "Free",
    blurb: "The night we opened the doors. Nine local writers, nine minutes each.",
    description: [
      "Our first ever event, held before half the shelves were full. It set the tone for everything since.",
    ],
    image: img.storeAtrium,
    relatedBooks: ["night-arithmetic"],
    past: true,
  },
];

export const upcomingEvents = events.filter((e) => !e.past);
export const pastEvents = events.filter((e) => e.past);
export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
export const eventCategories = [
  "All",
  "Author talk",
  "Book launch",
  "Reading club",
  "Children's",
  "Poetry",
  "Workshop",
  "Community",
] as const;
