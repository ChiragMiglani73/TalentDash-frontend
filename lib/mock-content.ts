export type Review = {
  id: string;
  company_slug: string;
  company_name: string;
  role: string;
  rating: number;
  title: string;
  pros: string;
  cons: string;
  location: string;
  created_at: string;
};

export type InterviewExperience = {
  id: string;
  company_slug: string;
  company_name: string;
  role: string;
  difficulty: "Easy" | "Medium" | "Hard";
  outcome: string;
  rounds: number;
  summary: string;
};

export type ForumThread = {
  id: string;
  title: string;
  company?: string;
  topic: string;
  replies: number;
  upvotes: number;
  time_ago: string;
  badge?: "Hot" | "Trending";
};

export type WorkplaceRanking = {
  rank: number;
  company_slug: string;
  company_name: string;
  score: number;
  industry: string;
  category: string;
};

export const reviews: Review[] = [
  {
    id: "rev-1",
    company_slug: "amazon",
    company_name: "Amazon",
    role: "Software Engineer",
    rating: 4.2,
    title: "High ownership, demanding pace",
    pros: "Strong learning, good compensation, clear leveling.",
    cons: "On-call load can be heavy; documentation varies by team.",
    location: "Bengaluru",
    created_at: "2026-04-12",
  },
  {
    id: "rev-2",
    company_slug: "google",
    company_name: "Google",
    role: "Product Manager",
    rating: 4.5,
    title: "Excellent WLB for senior ICs",
    pros: "Thoughtful culture, strong peer bar, good benefits.",
    cons: "Promotion cycles can feel opaque.",
    location: "Hyderabad",
    created_at: "2026-03-28",
  },
  {
    id: "rev-3",
    company_slug: "tcs",
    company_name: "TCS",
    role: "Data Analyst",
    rating: 3.4,
    title: "Stable but slow growth",
    pros: "Job security, large client portfolio.",
    cons: "Below-market pay at junior levels; process-heavy.",
    location: "Pune",
    created_at: "2026-02-15",
  },
];

export const interviews: InterviewExperience[] = [
  {
    id: "int-1",
    company_slug: "google",
    company_name: "Google",
    role: "Software Engineer",
    difficulty: "Hard",
    outcome: "Offer",
    rounds: 5,
    summary:
      "DSA + system design + googliness. Bar is consistent across locations.",
  },
  {
    id: "int-2",
    company_slug: "flipkart",
    company_name: "Flipkart",
    role: "Software Engineer",
    difficulty: "Medium",
    outcome: "Offer",
    rounds: 4,
    summary:
      "Machine coding round plus DS/Algo. Emphasis on practical trade-offs.",
  },
  {
    id: "int-3",
    company_slug: "meta",
    company_name: "Meta",
    role: "Data Scientist",
    difficulty: "Hard",
    outcome: "Rejected",
    rounds: 4,
    summary:
      "Product sense, SQL, and ML case study. Fast feedback loop.",
  },
];

export const forumThreads: ForumThread[] = [
  {
    id: "f-1",
    title:
      "Amazon SDE-2 salary hike 2026 — what are you expecting?",
    company: "Amazon",
    topic: "compensation",
    replies: 190,
    upvotes: 420,
    time_ago: "1h ago",
    badge: "Hot",
  },
  {
    id: "f-2",
    title: "Is remote work disappearing in big tech?",
    company: "Meta",
    topic: "culture",
    replies: 142,
    upvotes: 310,
    time_ago: "3h ago",
    badge: "Trending",
  },
  {
    id: "f-3",
    title: "Best cities for AI engineers in 2026?",
    topic: "careers",
    replies: 88,
    upvotes: 156,
    time_ago: "5h ago",
  },
];

export const workplaceRankings: WorkplaceRanking[] = [
  {
    rank: 1,
    company_slug: "google",
    company_name: "Google",
    score: 4.6,
    industry: "Technology",
    category: "Overall",
  },
  {
    rank: 2,
    company_slug: "microsoft",
    company_name: "Microsoft",
    score: 4.4,
    industry: "Technology",
    category: "Overall",
  },
  {
    rank: 3,
    company_slug: "razorpay",
    company_name: "Razorpay",
    score: 4.3,
    industry: "Fintech",
    category: "Overall",
  },
  {
    rank: 4,
    company_slug: "amazon",
    company_name: "Amazon",
    score: 4.1,
    industry: "E-commerce",
    category: "Overall",
  },
  {
    rank: 5,
    company_slug: "tcs",
    company_name: "TCS",
    score: 3.5,
    industry: "IT Services",
    category: "Overall",
  },
];
