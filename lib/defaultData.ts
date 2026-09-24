import {
  CoupleProfile,
  CommitMilestone,
  PhotoMemory,
  UnitTestItem,
} from "./types";

export const DEFAULT_COUPLE_PROFILE: CoupleProfile = {
  partner1: "Tola",
  partner2: "Lina",
  partner1Role: "Sneha coder & 24/7 Support",
  partner2Role: "Chief Happiness Officer & Sunshine Architect",
  startDate: "2025-10-12T00:00:00",
  subtitle: "Two developers, one repository, zero merge conflicts.",
  loveLetterTitle: "To My Favorite Human in the Entire Universe 💌",
  loveLetterBody: `Dearest Lina,

If our love was written in code, it would be an infinite loop with no break condition, running forever on the world's most stable server. 

From the very first moment we started talking, every moment with you has felt like finding the missing piece of my source code. You make everyday moments magical — whether we are sharing late-night coffees, laughing over silly jokes, traveling together, or simply sitting quietly in each other's warmth.

Thank you for being my anchor, my sweetest inspiration, and my greatest adventure. No matter what bugs life throws at us, I promise to always stand by you, listen to you, hold your hand, and love you more with every single git push.

Happy Anniversary, my darling Lina. Here is to a lifetime of releases, zero downtime, and infinite happiness together!

Forever Yours,
Tola ❤️`,
  weddingOrPromise:
    "We promise to love, cherish, debug each other's bad days, share the last slice of pizza, and build our dreams together forever.",
};

export const DEFAULT_COMMITS: CommitMilestone[] = [
  {
    id: "commit-1",
    hash: "a1f9e20",
    date: "Sep 24, 2024",
    branch: "main",
    author: "Tola & Lina",
    tag: "feat",
    message: "feat(core): git init our love repository ❤️",
    description:
      "The spark that started it all. Our first hello turned into endless hours of conversation, laughter, and realizing we found someone truly irreplaceable.",
    diffCode: `+ const couple = new LoveConnection({
+   partnerA: "Tola",
+   partnerB: "Lina",
+   chemistry: "Unprecedented",
+   connectionStatus: "Instant spark"
+ });`,
  },
  {
    id: "commit-2",
    hash: "7c3b801",
    date: "Nov 12, 2024",
    branch: "first-date",
    author: "Tola",
    tag: "feat",
    message: "feat(first_date): unhandled heartbeat exception",
    description:
      "Our magical first official date. Warm tea, shy smiles, looking into your eyes and completely forgetting everything else around us.",
    diffCode: `  function onFirstLookAt(lina) {
-   let heartRate = 72; // normal
+   let heartRate = 180; // extreme butterflies
+   return "Lost in her smile completely";
  }`,
  },
  {
    id: "commit-3",
    hash: "3d5f992",
    date: "Mar 18, 2025",
    branch: "main",
    author: "Lina",
    tag: "fix",
    message: "fix(arguments): resolved immediately with warm hugs & boba 🧋",
    description:
      "Learning how to navigate our differences with patience, listening, gentle hugs, and favorite snacks. Every conversation made us closer.",
    diffCode: `+ async function resolveBadDay(mood) {
+   await deliverWarmHug();
+   await orderFavoriteFood();
+   return { status: "Loved and protected" };
+ }`,
  },
  {
    id: "commit-4",
    hash: "e90c41b",
    date: "Jul 05, 2025",
    branch: "adventure",
    author: "Tola & Lina",
    tag: "feat",
    message: "feat(travel): our unforgettable getaway under the stars ✨",
    description:
      "Exploring new horizons together. Holding hands under starry skies, taking silly selfies, and realizing home isn't a place — it's being with you.",
    diffCode: `+ const memory = {
+   location: "Under starry skies",
+   holdingHands: true,
+   vibe: "Pure enchantment",
+   savedToHeartForever: true
+ };`,
  },
  {
    id: "commit-5",
    hash: "9b4d110",
    date: "Jan 14, 2026",
    branch: "main",
    author: "Tola",
    tag: "refactor",
    message: "refactor(priority): Lina locked as permanent TOP_PRIORITY",
    description:
      "Promising to always put your happiness, your dreams, and your peace of mind first. Through every storm and every sunshine.",
    diffCode: `  const priorities = {
-   work: 1,
-   hobbies: 2,
+   linasHappiness: Infinity,
+   holdingHerTight: 1
  };`,
  },
  {
    id: "commit-6",
    hash: "f402c89",
    date: "Sep 24, 2026",
    branch: "main",
    author: "Tola & Lina",
    tag: "release",
    message: "release(v2.0): Happy Anniversary! 100% Love Coverage 🚀",
    description:
      "Celebrating another breathtaking milestone! 2 full years of laughter, growth, mutual respect, and unconditional love. Here's to forever!",
    diffCode: `+ export const FOREVER_AND_ALWAYS = {
+   version: "2.0.0-anniversary",
+   uptime: "100%",
+   mergeConflicts: 0,
+   nextMilestone: "A lifetime together"
+ };`,
  },
];

export const DEFAULT_PHOTOS: PhotoMemory[] = [
  {
    id: "photo-1",
    title: "The Golden Hour Glow",
    date: "First Autumn",
    category: "dates",
    description:
      "You looked so breathtaking against the sunset light, I couldn't take my eyes off you.",
    tags: ["#Sunset", "#FirstDate", "#CutestSmile"],
    imageUrl:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
    likes: 42,
  },
  {
    id: "photo-2",
    title: "Cozy Coffee & Coding Late",
    date: "Winter Evenings",
    category: "milestones",
    description:
      "Two laptops, one cozy café corner, sharing headphones and warm lattes.",
    tags: ["#CoderCouple", "#CoffeeVibes", "#CozyNight"],
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop",
    likes: 88,
  },
  {
    id: "photo-3",
    title: "Stargazing Adventure",
    date: "Summer Road Trip",
    category: "trips",
    description:
      "Wrapped in a warm blanket, watching shooting stars and making wishes about our future.",
    tags: ["#RoadTrip", "#Stargazing", "#MagicMoments"],
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=900&auto=format&fit=crop",
    likes: 120,
  },
  {
    id: "photo-4",
    title: "Rainy Afternoon Laughs",
    date: "Spring Memories",
    category: "dates",
    description:
      "Caught in the rain without an umbrella, laughing uncontrollably all the way home.",
    tags: ["#RainyDay", "#PureJoy", "#SillyUs"],
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=900&auto=format&fit=crop",
    likes: 95,
  },
  {
    id: "photo-5",
    title: "Beachside Hand-in-Hand",
    date: "Summer Getaway",
    category: "trips",
    description:
      "Walking along the shore at dusk with the waves gently washing over our feet.",
    tags: ["#BeachWalk", "#Peaceful", "#LoveOfMyLife"],
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=900&auto=format&fit=crop",
    likes: 156,
  },
  {
    id: "photo-6",
    title: "Our Celebratory Toast",
    date: "Anniversary Eve",
    category: "milestones",
    description:
      "Cheers to our journey, to all we have overcome, and to all the magic yet to come.",
    tags: ["#Anniversary", "#Celebration", "#TwoDevsOneHeart"],
    imageUrl:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",
    likes: 210,
  },
];

export const DEFAULT_UNIT_TESTS: UnitTestItem[] = [
  {
    id: "test-1",
    suite: "RelationshipIntegrity",
    testName: "should verify Lina's smile lights up any gloomy day",
    expected: "100% Brightness Boost",
    actual: "100% Brightness Boost",
    status: "passed",
    durationMs: 12,
  },
  {
    id: "test-2",
    suite: "RelationshipIntegrity",
    testName: "should confirm zero merge conflicts between our hearts",
    expected: "0 conflicts, clean fast-forward merge",
    actual: "0 conflicts, clean fast-forward merge",
    status: "passed",
    durationMs: 8,
  },
  {
    id: "test-3",
    suite: "RelationshipIntegrity",
    testName: "should ensure Tola's love for Lina is infinite and non-nullable",
    expected: "Infinity (non-nullable)",
    actual: "Infinity (non-nullable)",
    status: "passed",
    durationMs: 15,
  },
  {
    id: "test-4",
    suite: "SnackProtocol",
    testName: "should assign the last bite of dessert to Lina automatically",
    expected: "Lina gets the last piece",
    actual: "Lina gets the last piece",
    status: "passed",
    durationMs: 6,
  },
  {
    id: "test-5",
    suite: "FaultTolerance",
    testName: "should recover from any bad day with warm hugs & patience",
    expected: "100% Resilience, Infinite Support",
    actual: "100% Resilience, Infinite Support",
    status: "passed",
    durationMs: 14,
  },
  {
    id: "test-6",
    suite: "LongTermVision",
    testName: "should build our dreams together with eternal happiness",
    expected: "Forever & Always",
    actual: "Forever & Always",
    status: "passed",
    durationMs: 20,
  },
];
