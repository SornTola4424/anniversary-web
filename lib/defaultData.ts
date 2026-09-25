import { CoupleProfile, CommitMilestone, PhotoMemory, UnitTestItem } from "./types";

export const DEFAULT_COUPLE_PROFILE: CoupleProfile = {
  partner1: "Tola",
  partner2: "Lina",
  partner1Role: "Senior Heart Developer & 24/7 Support",
  partner2Role: "Chief Happiness Officer & Sunshine Architect",
  startDate: "2024-09-24T00:00:00",
  subtitle: "Two developers, one repository, zero merge conflicts.",
  loveLetterTitle: "To My Favorite Human in the Entire Universe 💌",
  loveLetterBody: `Dearest Lina,

If our love was written in code, it would be an infinite loop with no break condition, running forever on the world's most stable server. 

From the very first moment we started talking, every moment with you has felt like finding the missing piece of my source code. You make everyday moments magical — whether we are sharing late-night coffees, laughing over silly jokes, traveling together, or simply sitting quietly in each other's warmth.

Thank you for being my anchor, my sweetest inspiration, and my greatest adventure. No matter what bugs life throws at us, I promise to always stand by you, listen to you, hold your hand, and love you more with every single git push.

Happy Anniversary, my darling Lina. Here is to a lifetime of releases, zero downtime, and infinite happiness together!

Forever Yours,
Tola ❤️`,
  weddingOrPromise: "We promise to love, cherish, debug each other's bad days, share the last slice of pizza, and build our dreams together forever.",
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
    description: "The spark that started it all. Our first hello turned into endless hours of conversation, laughter, and realizing we found someone truly irreplaceable.",
    photoUrl: "/images/tola_lina_1.jpg",
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
    description: "Our magical first official date. Warm tea, shy smiles, looking into your eyes and completely forgetting everything else around us.",
    photoUrl: "/images/tola_lina_2.jpg",
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
    description: "Learning how to navigate our differences with patience, listening, gentle hugs, and favorite snacks. Every conversation made us closer.",
    photoUrl: "/images/tola_lina_4.jpg",
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
    message: "feat(travel): our unforgettable getaway under the festival lights ✨",
    description: "Celebrating together under the glowing festival lights. Hand in hand through the crowd, making wishes and laughing together.",
    photoUrl: "/images/tola_lina_3.jpg",
    diffCode: `+ const memory = {
+   location: "Festival lights & stars",
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
    description: "Promising to always put your happiness, your dreams, and your peace of mind first. Through every storm and every sunshine.",
    photoUrl: "/images/tola_lina_4.jpg",
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
    description: "Celebrating another breathtaking milestone! 2 full years of laughter, growth, mutual respect, and unconditional love. Here's to forever!",
    photoUrl: "/images/tola_lina_5.jpg",
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
    title: "Night Stroll & Peace Sign ✌️",
    date: "Autumn Night Walk",
    category: "dates",
    description: "Cool evening breeze, walking together with your cute cap, flashing that sweet smile and peace sign.",
    tags: ["#NightWalk", "#CuteCap", "#SweetSmile"],
    imageUrl: "/images/tola_lina_1.jpg",
    likes: 142,
  },
  {
    id: "photo-2",
    title: "Panda Smile & Peeking Hugs 🐼",
    date: "Cozy Fun Moments",
    category: "milestones",
    description: "The absolute cutest moment! Hiding playfully under my arm with your adorable panda sticker and radiant smile.",
    tags: ["#PandaSticker", "#PureJoy", "#CutestLina"],
    imageUrl: "/images/tola_lina_2.jpg",
    likes: 198,
  },
  {
    id: "photo-3",
    title: "Khmer new year✨",
    date: "Festival Celebration",
    category: "trips",
    description:
      "Wrapped in a warm blanket, watching shooting stars and making wishes about our future.",
    tags: ["#RoadTrip", "#Stargazing", "#MagicMoments"],
    imageUrl:"/images/tola_lina_3.jpg",
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
    imageUrl:"/images/tola_lina_4.jpg",
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
    imageUrl:"/images/tola_lina_5.jpg",
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
    imageUrl:"/images/tola_lina_6.jpg",
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
