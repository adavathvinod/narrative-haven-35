import { img } from "@/lib/images";

export type Author = {
  slug: string;
  name: string;
  genre: string;
  role: string;
  shortBio: string;
  bio: string[];
  portrait: string;
  books: string[];
  eventSlug?: string;
};

export const authors: Author[] = [
  {
    slug: "meg-bedford",
    name: "Meg Bedford",
    genre: "Fiction",
    role: "Novelist",
    shortBio:
      "Writes quiet, tidal novels about houses and the women who pass through them.",
    bio: [
      "Meg Bedford grew up between a lighthouse keeper's cottage and a bus depot, which she says explains everything about her sentences. Her third novel, The Whispering Hours, took seven years and three abandoned drafts.",
      "She teaches one workshop a year, refuses to write on a computer before noon, and has been a customer of independent bookstores in four countries — a fact she mentions in every interview.",
      "She lives an hour north of here with a badly behaved lurcher named Pike.",
    ],
    portrait: img.authorPortrait,
    books: ["whispering-hours"],
    eventSlug: "meg-bedford-in-conversation",
  },
  {
    slug: "megan-wells",
    name: "Megan E. Wells",
    genre: "Non-fiction",
    role: "Essayist & naturalist",
    shortBio: "Ten years, nine miles of shoreline, one extraordinary book of essays.",
    bio: [
      "Megan E. Wells trained as a marine ecologist before turning to essays. Salt and Lichen collects a decade of fieldwork notebooks reworked into prose.",
      "Her writing has appeared in small journals and one very large magazine she declines to name.",
    ],
    portrait: img.portrait3,
    books: ["salt-and-lichen"],
    eventSlug: "salt-and-lichen-launch",
  },
  {
    slug: "jane-hirshfield",
    name: "Jane Hirshfield",
    genre: "Poetry",
    role: "Poet",
    shortBio: "Counts in poems. Finds that arithmetic is another word for grief.",
    bio: [
      "Jane Hirshfield has published five collections. Night Arithmetic is the shortest and, she insists, the hardest.",
      "She reads standing very still, hands at her sides, and it is remarkable.",
    ],
    portrait: img.portrait2,
    books: ["night-arithmetic"],
    eventSlug: "poetry-after-hours",
  },
];

export const getAuthor = (slug: string) => authors.find((a) => a.slug === slug);
