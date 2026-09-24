export interface CoupleProfile {
  partner1: string; // e.g. Tola
  partner2: string; // e.g. Lina
  partner1Role: string;
  partner2Role: string;
  startDate: string; // ISO date string e.g. "2024-09-24T00:00:00"
  subtitle: string;
  loveLetterTitle: string;
  loveLetterBody: string;
  weddingOrPromise: string;
}

export interface CommitMilestone {
  id: string;
  hash: string;
  date: string;
  branch: "main" | "first-date" | "adventure" | "future";
  author: string;
  message: string;
  description: string;
  tag: "feat" | "fix" | "refactor" | "release" | "merge";
  photoUrl?: string;
  diffCode?: string;
}

export interface PhotoMemory {
  id: string;
  title: string;
  date: string;
  category: "all" | "dates" | "trips" | "milestones";
  description: string;
  tags: string[];
  imageUrl: string;
  likes: number;
}

export interface UnitTestItem {
  id: string;
  suite: string;
  testName: string;
  expected: string;
  actual: string;
  status: "pending" | "running" | "passed";
  durationMs: number;
}
