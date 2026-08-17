import { img } from "@/lib/images";

export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  category:
    | "Staff picks"
    | "Author interviews"
    | "Reading guides"
    | "Literary news"
    | "Behind the scenes"
    | "Community";
  author: string;
  date: string;
  readingTime: string;
  image: string;
  featured?: boolean;
  body: Array<{ type: "p" | "h2" | "quote"; text: string }>;
};

export const articles: Article[] = [
  {
    slug: "what-we-mean-by-a-staff-pick",
    title: "What we actually mean when we say “staff pick”",
    standfirst:
      "A shelf-talker is a promise. Here is what has to be true before one of us writes yours.",
    category: "Staff picks",
    author: "Theo Nakamura",
    date: "12 August 2026",
    readingTime: "6 min",
    image: img.stillLife,
    featured: true,
    body: [
      {
        type: "p",
        text: "There is a small card below certain books in this shop, handwritten, with a name at the bottom. It takes about four minutes to write and roughly a fortnight to earn, and it is the single most powerful object in the building.",
      },
      { type: "h2", text: "The rule" },
      {
        type: "p",
        text: "One of us has read the whole thing. Not the first fifty pages, not the proof summary, not the enthusiastic email from the publicist. The whole thing. If nobody here has finished it, it does not get a card, however much we might want it to sell.",
      },
      {
        type: "quote",
        text: "A recommendation is only worth anything if it can be wrong and still be honest.",
      },
      {
        type: "p",
        text: "The second rule is that the card has to say something a blurb cannot. Not “gripping” or “luminous”. Something like: read this if you have ever moved house in a hurry. Something that tells you whether you are the person for this book.",
      },
      { type: "h2", text: "Why we sign them" },
      {
        type: "p",
        text: "Because then you can come back and argue with us. Several of our favourite conversations this year began with somebody waving a card at the till and saying: you were wrong about this. That is the shop working exactly as intended.",
      },
    ],
  },
  {
    slug: "meg-bedford-interview",
    title: "Meg Bedford on seven years, three drafts, and one house",
    standfirst:
      "The novelist talks about writing the hours between events — and why she threw out an entire finished book.",
    category: "Author interviews",
    author: "Priya Raman",
    date: "28 July 2026",
    readingTime: "11 min",
    image: img.authorPortrait,
    featured: true,
    body: [
      {
        type: "p",
        text: "We met upstairs, before the shelves were installed, with the sound of a drill coming through the floor. Bedford did not seem to mind. “I wrote most of this book in a room above a garage,” she said. “Noise is fine. It's quiet I can't work in.”",
      },
      { type: "h2", text: "On abandoning a draft" },
      {
        type: "p",
        text: "The second version of The Whispering Hours was finished, copy-edited, and scheduled. She withdrew it eleven weeks before publication. “It was a good book. It just wasn't the one. Those are different problems and only one of them is fixable.”",
      },
      {
        type: "quote",
        text: "You can't write the in-between hours in a hurry. The form has to move at the speed of the subject.",
      },
      {
        type: "p",
        text: "What survived from that draft, she says, is a single scene: a woman standing in a hallway, deciding not to say something. It is now on page 204.",
      },
    ],
  },
  {
    slug: "how-to-read-poetry-if-you-think-you-cant",
    title: "How to read poetry if you're convinced you can't",
    standfirst: "A reading guide in five short steps, four of which involve reading aloud.",
    category: "Reading guides",
    author: "Fern Adeyemi",
    date: "16 July 2026",
    readingTime: "5 min",
    image: img.storeAtrium,
    body: [
      {
        type: "p",
        text: "Almost everyone who tells us they “don't get poetry” is describing an experience of being tested rather than an experience of reading. Nobody is testing you here.",
      },
      { type: "h2", text: "Start with sound" },
      {
        type: "p",
        text: "Read it aloud, badly, at normal speaking speed. Meaning is often the last thing to arrive and that is entirely fine.",
      },
      {
        type: "p",
        text: "Then read one poem a day for a week. Not a collection — a poem. Poetry rewards small, regular doses in a way almost no other form does.",
      },
    ],
  },
  {
    slug: "building-the-burrow",
    title: "Building the Burrow: notes on a children's corner",
    standfirst:
      "Low shelves, one window seat, and a rule that no adult may say “be careful with that” more than twice.",
    category: "Behind the scenes",
    author: "Fern Adeyemi",
    date: "2 July 2026",
    readingTime: "7 min",
    image: img.childrensCorner,
    body: [
      {
        type: "p",
        text: "We spent longer designing sixteen square metres of children's corner than the rest of the shop combined. Everything is at the height of a five-year-old, including the light switch.",
      },
      {
        type: "quote",
        text: "A child who is allowed to pull a book off a shelf themselves becomes a reader. A child handed a book becomes a listener. We want both, but the order matters.",
      },
      {
        type: "p",
        text: "The window seat took four attempts. The final version has a cushion firm enough to stand on, because they will.",
      },
    ],
  },
  {
    slug: "independent-publishing-autumn",
    title: "Six small presses worth watching this autumn",
    standfirst:
      "The most interesting books of the season are coming from imprints with fewer than eight staff.",
    category: "Literary news",
    author: "Theo Nakamura",
    date: "20 June 2026",
    readingTime: "8 min",
    image: img.storeInterior,
    body: [
      {
        type: "p",
        text: "Roughly a third of our shelf space goes to presses that publish fewer than twenty titles a year. It is not charity — it is where the risk-taking happens.",
      },
      {
        type: "p",
        text: "Northlight, Fern & Anchor and Corvid all have autumn lists worth clearing a weekend for. We will be stocking all three in depth.",
      },
    ],
  },
  {
    slug: "the-street-that-made-a-bookshop",
    title: "The street that made a bookshop",
    standfirst:
      "Before we sold a single book, ninety-one people on Fernhill Row told us what they wanted from one.",
    category: "Community",
    author: "Rosa Iversen",
    date: "5 June 2026",
    readingTime: "9 min",
    image: img.storefront,
    body: [
      {
        type: "p",
        text: "We knocked on doors for six weeks with a clipboard and an embarrassing amount of optimism. The answers reshaped the floor plan twice.",
      },
      {
        type: "p",
        text: "The most requested thing was not a genre. It was chairs. So there are eleven of them, and none are for sale.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articleCategories = [
  "All",
  "Staff picks",
  "Author interviews",
  "Reading guides",
  "Literary news",
  "Behind the scenes",
  "Community",
] as const;
