import { img } from "@/lib/images";

export type Book = {
  slug: string;
  title: string;
  author: string;
  authorSlug?: string;
  genre: string;
  price: number;
  blurb: string;
  description: string[];
  publisher: string;
  published: string;
  isbn: string;
  pages: number;
  availability: "In stock" | "Low stock" | "Pre-order";
  tags: Array<"new" | "bestseller" | "staff-pick" | "featured">;
  cover: string;
};

export const genres = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Biography",
  "History",
  "Poetry",
  "Children's",
  "Young Adult",
  "Art & Design",
  "Philosophy",
  "Business",
  "Travel",
] as const;

export const books: Book[] = [
  {
    slug: "whispering-hours",
    title: "The Whispering Hours",
    author: "Meg Bedford",
    authorSlug: "meg-bedford",
    genre: "Fiction",
    price: 26,
    blurb:
      "A novel about the hours nobody records — the ones between shifts, between griefs, between lives.",
    description: [
      "In a coastal town where the tide keeps the only reliable schedule, three women pass a single house between them across forty years. Bedford writes the in-between hours: the kettle boiling, the letter unopened, the argument that never quite arrives.",
      "Written in prose so restrained it hums, The Whispering Hours asks what a life is made of once you subtract the events. It is a book to be read slowly, ideally near a window.",
    ],
    publisher: "Blackwell House",
    published: "March 2026",
    isbn: "978-1-83810-442-7",
    pages: 328,
    availability: "In stock",
    tags: ["featured", "staff-pick", "bestseller"],
    cover: img.covers["whispering-hours"],
  },
  {
    slug: "salt-and-lichen",
    title: "Salt and Lichen",
    author: "Megan E. Wells",
    authorSlug: "megan-wells",
    genre: "Non-fiction",
    price: 24,
    blurb:
      "Essays on landscape, belonging and the small ecologies that outlive us.",
    description: [
      "A naturalist walks the same nine miles of shoreline for a decade and records what changes. What emerges is less a nature book than a study of attention — of what it costs to keep looking at one place until it becomes legible.",
      "Wells is that rare essayist who can move from lichen taxonomy to inheritance in a single paragraph without losing her footing.",
    ],
    publisher: "Northlight Editions",
    published: "January 2026",
    isbn: "978-1-90114-778-3",
    pages: 244,
    availability: "In stock",
    tags: ["featured", "new"],
    cover: img.covers["salt-and-lichen"],
  },
  {
    slug: "night-arithmetic",
    title: "Night Arithmetic",
    author: "Jane Hirshfield",
    authorSlug: "jane-hirshfield",
    genre: "Poetry",
    price: 19,
    blurb: "Forty-one poems on counting, insomnia, and the mathematics of loss.",
    description: [
      "A slim, ferocious collection. Hirshfield counts in these poems — sheep, debts, breaths, the years between one house and the next — and finds that arithmetic is another word for grief and also for hope.",
      "Read one at a time. They are not designed to be consumed in a sitting.",
    ],
    publisher: "Fern & Anchor",
    published: "October 2025",
    isbn: "978-1-77234-091-5",
    pages: 96,
    availability: "Low stock",
    tags: ["featured", "staff-pick"],
    cover: img.covers["night-arithmetic"],
  },
  {
    slug: "cartographers-daughter",
    title: "The Cartographer's Daughter",
    author: "Juliet Marlowe",
    genre: "History",
    price: 32,
    blurb:
      "The true story of the woman who drew the coastlines of an empire and was left off every map.",
    description: [
      "Working from ledgers, ships' manifests and a single surviving sketchbook, Marlowe reconstructs the life of Anne Verrell, who between 1783 and 1821 charted more coastline than any of her credited contemporaries.",
      "A work of patient archival detective work that reads like an adventure novel.",
    ],
    publisher: "Corvid Press",
    published: "September 2025",
    isbn: "978-1-56621-330-9",
    pages: 412,
    availability: "In stock",
    tags: ["bestseller", "featured"],
    cover: img.covers["cartographers-daughter"],
  },
  {
    slug: "the-lantern-fox",
    title: "The Lantern Fox",
    author: "Helen Lantern",
    genre: "Children's",
    price: 18,
    blurb:
      "A small fox carries a light up the mountain so the night has somewhere to rest.",
    description: [
      "Illustrated in gouache over ten painstaking months, this picture book has already become the shelf favourite of everyone who works here. Best read aloud, twice.",
      "For ages 3 to 8, and for adults who need reminding that carrying a small light is enough.",
    ],
    publisher: "Meadowlark Books",
    published: "November 2025",
    isbn: "978-1-44890-217-1",
    pages: 48,
    availability: "In stock",
    tags: ["staff-pick", "new", "featured"],
    cover: img.covers["the-lantern-fox"],
  },
  {
    slug: "on-quiet-things",
    title: "On Quiet Things",
    author: "Michael S. Sherwin",
    genre: "Philosophy",
    price: 21,
    blurb: "A philosophical essay on silence as a civic practice.",
    description: [
      "Sherwin argues that quiet is not the absence of speech but a form of it — and that a culture unable to be quiet together loses the ability to think together.",
      "Short, austere, and quietly radical.",
    ],
    publisher: "New Vista",
    published: "February 2026",
    isbn: "978-1-90992-556-2",
    pages: 158,
    availability: "In stock",
    tags: ["new", "featured", "staff-pick"],
    cover: img.covers["on-quiet-things"],
  },
];

export const getBook = (slug: string) => books.find((b) => b.slug === slug);

export const featuredBooks = books.filter((b) => b.tags.includes("featured"));

export const relatedBooks = (slug: string, count = 3) =>
  books.filter((b) => b.slug !== slug).slice(0, count);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
