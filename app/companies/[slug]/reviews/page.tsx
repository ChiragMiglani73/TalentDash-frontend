import { Star, ThumbsUp, MessageSquare, Filter, TrendingUp, Users, Award, Heart } from "lucide-react";


interface Review {
  role: string;
  department?: string;
  location?: string;
  employmentType?: string;
  rating: number;
  title: string;
  review: string;
  pros: string;
  cons: string;
  date?: string;
  helpful?: number;
}

interface CompanyReviewData {
  overallRating: number;
  recommendToFriend: number;
  stats: {
    workLifeBalance: number;
    careerGrowth: number;
    culture: number;
    compensation: number;
  };
  reviews: Review[];
}


const COMPANY_REVIEW_DATA: Record<string, CompanyReviewData> = {
  google: {
    overallRating: 4.4,
    recommendToFriend: 92,
    stats: {
      workLifeBalance: 4.2,
      careerGrowth: 4.5,
      culture: 4.3,
      compensation: 4.6,
    },
    reviews: [
      {
        role: "Software Engineer",
        department: "Engineering",
        location: "Mountain View, CA",
        employmentType: "Full-time",
        rating: 5,
        title: "Great learning environment with world-class engineers",
        review:
          "Strong engineering culture with opportunities to work on impactful products used by billions. The internal tools and infrastructure are incredible.",
        pros: "Excellent mentorship, growth opportunities, and access to cutting-edge technology. Free meals and great perks.",
        cons: "Large organization can slow decision making. Bureaucracy increases as teams scale.",
        date: "Mar 2024",
        helpful: 48,
      },
      {
        role: "Product Manager",
        department: "Product",
        location: "New York, NY",
        employmentType: "Full-time",
        rating: 4,
        title: "Amazing people, meaningful products, fast pace",
        review:
          "Collaborative teams and interesting challenges across multiple products. You work alongside some of the smartest people in the industry.",
        pros: "High ownership, talented colleagues, and strong compensation. Excellent internal mobility.",
        cons: "Fast-paced environment can lead to burnout. Expectations are very high.",
        date: "Feb 2024",
        helpful: 31,
      },
      {
        role: "UX Designer",
        department: "Design",
        location: "San Francisco, CA",
        employmentType: "Full-time",
        rating: 4,
        title: "Design-first culture with real product influence",
        review:
          "Strong design systems and opportunity to shape products at a massive scale. Design is treated as a first-class discipline.",
        pros: "Supportive design community, great tools, and opportunities to present to leadership.",
        cons: "Multiple stakeholder reviews can slow iteration cycles significantly.",
        date: "Jan 2024",
        helpful: 22,
      },
    ],
  },
};


function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const px = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${px} ${
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-36 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-400"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-800 w-6 text-right">{value}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">{review.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-700 font-medium">{review.role}</span>
            {review.department && (
              <>
                <span className="text-gray-400">·</span>
                <span className="text-sm text-gray-500">{review.department}</span>
              </>
            )}
            {review.location && (
              <>
                <span className="text-gray-400">·</span>
                <span className="text-sm text-gray-500">{review.location}</span>
              </>
            )}
            {review.employmentType && (
              <>
                <span className="text-gray-400">·</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                  {review.employmentType}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          <StarRow rating={review.rating} />
          {review.date && (
            <span className="text-xs text-gray-500">{review.date}</span>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-4">{review.review}</p>

      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
            Pros
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">{review.pros}</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">
            Cons
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">{review.cons}</p>
        </div>
      </div>

      <div className="flex items-center gap-5 pt-3 border-t border-gray-100">
        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors">
          <ThumbsUp className="w-3.5 h-3.5" />
          Helpful {review.helpful ? `(${review.helpful})` : ""}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors">
          <MessageSquare className="w-3.5 h-3.5" />
          Reply
        </button>
      </div>
    </div>
  );
}


interface ReviewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { slug } = await params;
  const companyName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const data = COMPANY_REVIEW_DATA[slug] ?? COMPANY_REVIEW_DATA["google"];

  const statCards = [
    { icon: Star, label: "Overall Rating", value: data.overallRating, suffix: "/5", color: "text-amber-500" },
    { icon: TrendingUp, label: "Career Growth", value: data.stats.careerGrowth, suffix: "/5", color: "text-blue-500" },
    { icon: Heart, label: "Work-Life Balance", value: data.stats.workLifeBalance, suffix: "/5", color: "text-rose-500" },
    { icon: Award, label: "Compensation", value: data.stats.compensation, suffix: "/5", color: "text-violet-500" },
  ];

  return (
    <div className="space-y-4">

      <div className="bg-white border border-gray-200 rounded-2xl px-7 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-primary)" }}>
          Employee Reviews
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {companyName} Reviews
        </h1>
        <p className="text-sm text-gray-600 max-w-xl">
          Read employee experiences, workplace insights, culture feedback, and career growth perspectives from verified employees.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {statCards.map(({ icon: Icon, label, value, suffix, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className={`${color} mb-3`}>
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {value}
              <span className="text-sm font-normal text-gray-500 ml-0.5">{suffix}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl px-7 py-6">
        <div className="flex items-start gap-10">
          <div className="flex-shrink-0 text-center">
            <p className="text-5xl font-bold text-gray-900">{data.overallRating}</p>
            <StarRow rating={data.overallRating} size="lg" />
          </div>

          <div className="w-px bg-gray-200 self-stretch" />

          <div className="flex-1 flex flex-col gap-3 justify-center">
            <RatingBar label="Work-Life Balance" value={data.stats.workLifeBalance} />
            <RatingBar label="Career Growth" value={data.stats.careerGrowth} />
            <RatingBar label="Culture & Values" value={data.stats.culture} />
            <RatingBar label="Compensation" value={data.stats.compensation} />
          </div>

          <div className="w-px bg-gray-200 self-stretch" />

          <div className="flex-shrink-0 flex flex-col items-center justify-center gap-1">
            <div className="w-16 h-16 rounded-full border-4 border-green-400 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900">{data.recommendToFriend}%</span>
            </div>
            <p className="text-xs text-gray-500 text-center max-w-[80px] leading-snug mt-1">
              Recommend to a friend
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filter Reviews</span>
        </div>
        <div className="flex items-center gap-2">
          {["All", "Software Engineer", "Product Manager", "Designer"].map((f) => (
            <button
              key={f}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                f === "All"
                  ? "border-[--color-primary] text-[--color-primary] bg-[#fff5f5]"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
              style={
                f === "All"
                  ? { borderColor: "var(--color-primary)", color: "var(--color-primary)" }
                  : {}
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {data.reviews.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>

    </div>
  );
}