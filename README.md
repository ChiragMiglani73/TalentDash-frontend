# TalentDash Frontend

TalentDash is a modern career intelligence platform that helps users explore company insights, salaries, interview experiences, employee reviews, benefits, and job opportunities through an intuitive and data-driven interface.

## Features

* Company profiles and overviews
* Salary insights and analytics
* Employee reviews and ratings
* Interview experience sharing
* Benefits and perks information
* Job listings and career opportunities
* Interactive charts and visualizations
* Responsive UI optimized for desktop and mobile
* SEO-friendly Next.js architecture

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4
* Recharts
* D3.js
* TopoJSON
* Clerk Authentication
* Lucide React Icons

## Project Structure

```text
app/
├── companies/
├── salaries/
├── reviews/
├── interviews/
├── jobs/
├── tools/
└── page.tsx

components/
├── companies/
├── home/
├── layout/
└── shared/

hooks/
lib/
public/
types/
```

## Getting Started

### Prerequisites

* Node.js 22+
* pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file and configure the required environment variables.

Example:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
```

### Run Development Server

```bash
pnpm run dev
```

Visit:

```text
http://localhost:3000
```

## Build for Production

```bash
pnpm run build
pnpm start
```

## Scripts

```bash
pnpm run dev
pnpm run build
pnpm run start
pnpm run lint
pnpm run typecheck
```

## Highlights

* Dynamic company pages
* Salary benchmarking and trends
* Review aggregation
* Interactive visual analytics
* Modular component architecture
* Optimized SEO metadata

## Future Enhancements

* Backend integration
* Real-time salary updates
* User-generated content moderation
* AI-powered career insights
* Advanced company comparison tools
* Personalized recommendations


Built as a career intelligence platform focused on helping students and professionals make informed career decisions.
