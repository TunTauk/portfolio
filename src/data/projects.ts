export interface Project {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  image: string;
  heroImage: string;
  tech: string[];
  category: string;
  date: string;
  company?: string;
  sourceUrl?: string;
  liveUrl?: string;
  archived?: boolean;
  featured: boolean;
  featuresTitle?: string;
  features: { icon: string; title: string; desc: string }[];
  architectureImage?: string;
}

export const projects: Project[] = [
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    slug: "forex-ib-marketing-platform",
    title: "Myanmar Trader Care - Forex Broker & Education Platform",
    shortDesc:
      "I co-developed a bilingual Next.js platform, built its public-facing features and backend workflows, and guided the project through setup and code reviews.",
    description:
      "I co-developed Myanmar Trader Care, an English/Myanmar forex broker and education platform, with another developer as a freelance project. I set up the project structure and full-stack foundation, provided technical guidance, and reviewed my teammate's code. I built the customer-facing Next.js pages and their tRPC/Prisma backend integrations for broker listings, tutorials, reviews, performance galleries, and member Q&A. I also implemented account registration, approval-gated login integration, password recovery, AWS SES notifications, localization, and Tiptap editing with sanitized content rendering. I handled technical SEO and automated Docker deployments through GitHub Actions and Dokploy. My teammate built much of the admin console, the initial database schema, and the later blog module.",
    image: "/images/projects/myanmar-trader-care.png",
    heroImage: "/images/projects/myanmar-trader-care.png",
    category: "Web Application",
    date: "Mar 2026 - Present",
    company: "Ideafresh",
    tech: ["Next.js", "React", "TypeScript", "tRPC", "Prisma", "MySQL", "NextAuth", "next-intl", "AWS SES", "Docker", "GitHub Actions"],
    featured: true,
    liveUrl: "https://myanmartradercare.com/",
    featuresTitle: "My Contributions",
    features: [
      {
        icon: "🧭",
        title: "Project Setup & Code Review",
        desc: "I set up the project structure and full-stack foundation, guided implementation, and reviewed my teammate's code.",
      },
      {
        icon: "🔗",
        title: "Full-Stack Feature Delivery",
        desc: "I built the public broker, tutorial, review, and performance pages plus member Q&A, connecting Next.js pages to tRPC endpoints and Prisma/MySQL queries.",
      },
      {
        icon: "🔐",
        title: "Account & Password Recovery",
        desc: "I built registration and integrated approval-gated login, with hashed passwords and expiring, single-use password reset tokens applied through database transactions.",
      },
      {
        icon: "📧",
        title: "Transactional Email",
        desc: "I integrated AWS SES for registration alerts, approval/rejection notices, Q&A responses, password resets, and contact-form notifications.",
      },
      {
        icon: "🌍",
        title: "English/Myanmar Localization",
        desc: "I added English/Myanmar localization with next-intl across the landing page, authentication, brokers, tutorials, reviews, Q&A, and performance pages.",
      },
      {
        icon: "📝",
        title: "Rich-Text Editing",
        desc: "I added Tiptap editing to the existing broker and tutorial admin forms and sanitized rendered HTML using an allowlist of tags, attributes, and URL schemes.",
      },
      {
        icon: "🔍",
        title: "Technical SEO",
        desc: "I implemented Next.js metadata, canonical and hreflang URLs, social previews, structured data, crawlable pagination, and filtered-page indexing controls.",
      },
      {
        icon: "🚀",
        title: "Automated Deployment",
        desc: "I configured Docker builds and GitHub Actions to publish container images and deploy to production through Dokploy.",
      },
    ],
  },
  {
    slug: "suitup-777",
    title: "Suitup 777 - Tailoring & Order Management Platform",
    liveUrl: "https://suitup.archive.ideafresh.dev/",
    archived: true,
    shortDesc:
      "I co-developed a Next.js tailoring platform and built its multi-step ordering workflow, draft persistence, and account handoff. Now available as an archived demo.",
    description:
      "I co-developed Suitup, a tailoring website and order-management platform, with another developer. I migrated the initial v0-scaffolded site into a full-stack Next.js structure, set up the project foundation, and reviewed my teammate's code. I built the six-step customer ordering wizard, covering product and fabric selection, measurements, fitting appointments, delivery, and contact details. I implemented its tRPC/Prisma draft-order APIs, guest-to-account handoff, persisted state, draft resumption, and order-access checks. I also worked on authentication, registration, public catalog integration, AWS SES contact emails, and automated Docker deployment through GitHub Actions and Dokploy. My teammate implemented much of the admin console, customer profile and measurement management, gallery, and review features. The project is now an archived demo for portfolio viewing only and is no longer affiliated with Suit Up Bangkok Tailor.",
    image: "/images/projects/suitup-archive.png",
    heroImage: "/images/projects/suitup-archive.png",
    category: "Web Application",
    date: "Oct 2025 - Oct 2026",
    company: "Ideafresh",
    tech: ["Next.js", "React", "TypeScript", "tRPC", "Prisma", "MySQL", "NextAuth", "Zustand", "AWS SES", "Docker", "GitHub Actions"],
    featured: true,
    featuresTitle: "My Contributions",
    features: [
      {
        icon: "🧭",
        title: "Project Setup & Code Review",
        desc: "I migrated the initial site into a full-stack Next.js/tRPC structure, configured the project foundation, and reviewed my teammate's implementation.",
      },
      {
        icon: "🧵",
        title: "Six-Step Ordering Workflow",
        desc: "I built the customer wizard for product and fabric selection, measurements, fitting appointments, delivery preferences, and contact details.",
      },
      {
        icon: "💾",
        title: "Draft Persistence & Account Handoff",
        desc: "I implemented draft-order APIs and guest-to-account handoff, with Zustand/localStorage persistence, draft resumption, expiry, and logout handling.",
      },
      {
        icon: "🔐",
        title: "Authentication & Order Access",
        desc: "I reworked customer/admin authentication, added registration and role-specific API guards, and implemented order ownership checks and guest-draft expiration.",
      },
      {
        icon: "🔗",
        title: "Public Catalog Integration",
        desc: "I implemented and refined product and fabric browsing and detail pages, connecting the customer-facing interface to tRPC endpoints and Prisma/MySQL queries.",
      },
      {
        icon: "🚀",
        title: "Contact Email & Deployment",
        desc: "I implemented AWS SES contact notifications and confirmation emails, and configured Docker/GitHub Actions deployment through Dokploy.",
      },
    ],
  },
  {
    slug: "koyou-assess",
    title: "Koyou Assess - Employment Assessment System",
    shortDesc:
      "Internal management system and customer app for foreign worker employment compliance assessments in Japan.",
    description:
      "Built the internal management system and customer-facing assessment application for Koyou Assess, a Japanese third-party service that evaluates companies' foreign worker employment practices for ESG and human rights due diligence compliance. The platform handles the full assessment lifecycle - from questionnaire submission and assessor scheduling through on-site inspection tracking and certification issuance.",
    image: "/images/projects/assessment.png",
    heroImage: "/images/projects/assessment.png",
    category: "Web Application",
    date: "Jul 2023 - Apr 2025",
    company: "One Terrace",
    tech: ["Laravel", "React.js", "MySQL"],
    featured: true,
    liveUrl: "https://koyouassess.jp/",
    features: [
      {
        icon: "📋",
        title: "Assessment Workflow",
        desc: "End-to-end lifecycle management from questionnaire submission to inspection tracking and report delivery.",
      },
      {
        icon: "🏅",
        title: "Certification Management",
        desc: "Manages compliance certification issuance and status across assessed organizations.",
      },
      {
        icon: "👤",
        title: "Customer App",
        desc: "Dedicated customer-facing application for companies to submit and track their assessments.",
      },
      {
        icon: "🖥️",
        title: "Internal System",
        desc: "Back-office management system for assessors to coordinate evaluations and generate reports.",
      },
    ],
  },

  {
    slug: "crossfit-gym-platform",
    title: "CrossFit Gym Platform",
    liveUrl: "https://crossfitmm.net/",
    shortDesc:
      "Gym management with memberships, e-commerce, class scheduling and fitness tracking.",
    description:
      "An all-in-one gym management solution covering member onboarding, class scheduling, attendance tracking, workout performance metrics, e-commerce for supplements/gear, billing subscriptions, and staff management.",
    image: "/images/projects/crossfit.png",
    heroImage: "/images/projects/crossfit.png",
    category: "Web Application",
    date: "2022",
    company: "Ideafresh",
    tech: ["React.js", "Express.js", "Laravel", "MySQL", "Sqlite"],
    featured: true,
    features: [
      {
        icon: "🏋️",
        title: "Member Dashboard",
        desc: "Progress tracking, workout history, personal bests and goal setting.",
      },
      {
        icon: "📅",
        title: "Class Scheduling",
        desc: "Coach assignment, capacity limits, and automated reminders.",
      },
      {
        icon: "🛍️",
        title: "E-commerce",
        desc: "Integrated product store for supplements, gear, and merchandise.",
      },
      {
        icon: "💳",
        title: "Subscription Billing",
        desc: "Recurring plans, invoices, payment history and expiry alerts.",
      },
    ],
  },
  {
    slug: "kyaw-distribution-pos",
    title: "Kyaw Distribution POS",
    shortDesc:
      "Multi-instance distribution system with mobile tablet sales for field teams.",
    description:
      "A wholesale distribution management platform with multi-instance support for field sales teams using mobile tablets. Features route-based sales rep management, van stock tracking, customer order history, and real-time inventory synchronisation.",
    image: "/images/projects/kyaw.png",
    heroImage: "/images/projects/kyaw.png",
    category: "Web Application",
    date: "2021 - 2022",
    company: "Ideafresh",
    tech: ["React.js", "Express.js", "MongoDB"],
    featured: true,
    features: [
      {
        icon: "🏭",
        title: "Multi-instance",
        desc: "Deploy multiple isolated instances per distribution branch.",
      },
      {
        icon: "📱",
        title: "Tablet Sales App",
        desc: "Field sales reps take orders on mobile tablets with offline support.",
      },
      {
        icon: "🚐",
        title: "Route Management",
        desc: "Van loading, route planning and sales rep order management.",
      },
      {
        icon: "📋",
        title: "Order Pipeline",
        desc: "From purchase order to delivery with real-time status updates.",
      },
    ],
  },
  {
    slug: "vidmoji",
    title: "Vidmoji",
    shortDesc:
      "Real-time hand gesture detection that translates your movements into emojis for video meetings - no buttons, just gestures.",
    description:
      "Vidmoji is a real-time computer vision project that detects hand gestures through a webcam and overlays corresponding emojis on the video feed. Built with MediaPipe, OpenCV, and Pillow, it recognises five gestures per hand - from a closed fist to an 'I love you' sign - and maps them instantly to emoji. Designed for casual online video meetings where expressive, button-free interaction matters.",
    image: "/images/projects/vidmoji-cover.svg",
    heroImage: "/images/projects/vidmoji-cover.svg",
    category: "Computer Vision",
    date: "Aug 2025",
    company: "Personal",
    tech: ["Python", "MediaPipe", "OpenCV", "Pillow"],
    featured: true,
    sourceUrl: "https://github.com/tuntauk/vidmoji",
    features: [
      {
        icon: "✋",
        title: "Gesture Recognition",
        desc: "Detects 5 hand gestures per hand in real time using MediaPipe's hand landmark model.",
      },
      {
        icon: "😄",
        title: "Emoji Overlay",
        desc: "Maps recognised gestures to emojis and renders them directly onto the live video frame.",
      },
      {
        icon: "⚡",
        title: "Low-latency Pipeline",
        desc: "Configurable detection delay and display duration for smooth, responsive interaction.",
      },
      {
        icon: "🎥",
        title: "Video Meeting Ready",
        desc: "Designed for casual online meetings - raise your hand, flash a peace sign, no button clicks needed.",
      },
    ],
  },

  {
    slug: "agb-billing-mobile-ui",
    title: "AGB Billing Mobile UI",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.agb.customer.billing",
    shortDesc:
      "High-fidelity Figma prototype for a mobile billing app following Material Design 2 guidelines.",
    description:
      "Independently conceived and designed a mobile billing application from the ground up during a short-term contract at AGB Communication Co., Ltd. Defined the full system flow, user journeys and information architecture without a prior reference system. Translated those flows into high-fidelity Figma prototypes following Material Design 2 guidelines - covering payment screens, billing history, invoice detail views and account management. Focused on mobile-first design, thumb-friendly navigation and a clean, consistent visual language.",
    image: "/images/projects/agb-billing-mobile-ui.png",
    heroImage: "/images/projects/billing-admin.png",
    category: "UI/UX Design",
    date: "Oct - Dec 2021",
    company: "AGB Communication",
    tech: ["Figma", "Material Design 2"],
    featured: true,
    features: [
      {
        icon: "📱",
        title: "Mobile-first Design",
        desc: "Designed for small screens with thumb-friendly tap targets and minimal navigation depth.",
      },
      {
        icon: "🎨",
        title: "Material Design 2",
        desc: "Followed Google's Material Design 2 guidelines for components, colour and typography.",
      },
      {
        icon: "🗺️",
        title: "User Flows",
        desc: "End-to-end user flows covering onboarding, payment, invoice view and account settings.",
      },
      {
        icon: "✏️",
        title: "High-fidelity Frames",
        desc: "Pixel-perfect mockups with interactive prototype links for stakeholder review.",
      },
    ],
  },

  // ── Non-featured (accessible via direct URL) ────────────────────────────

  {
    slug: "ideafresh-blog",
    title: "Ideafresh Blog",
    shortDesc:
      "I help maintain a shared Next.js technical blog, adapted from an open-source starter, and contribute articles alongside other authors.",
    description:
      "I contributed to adapting and maintaining Ideafresh Blog, a shared publication where I and other authors write about software development, algorithms, and data structures. I used Timothy Lin's Tailwind Next.js Starter Blog (timlrx/tailwind-nextjs-starter-blog) as the foundation, keeping its Next.js Pages Router and MDX publishing workflow, statically generated articles, tag navigation, syntax highlighting, RSS feeds, and light/dark themes. Each article credits its author, and the original design and starter features belong to the template's maintainers. The blog first launched in April 2022 under a different domain and is now available at blog.ideafresh.dev.",
    image: "/images/projects/ideafresh-blog.png",
    heroImage: "/images/projects/ideafresh-blog.png",
    category: "Web Application",
    date: "Apr 2022 - Present",
    company: "Ideafresh",
    tech: ["Next.js", "React", "JavaScript", "Tailwind CSS", "MDX"],
    featured: false,
    liveUrl: "https://blog.ideafresh.dev/",
    features: [
      {
        icon: "👥",
        title: "Shared Authorship",
        desc: "Technical articles from multiple contributors, with individual author profiles and per-post attribution.",
      },
      {
        icon: "📝",
        title: "MDX Publishing",
        desc: "Template-provided Markdown and MDX publishing with syntax highlighting for technical articles.",
      },
      {
        icon: "🏷️",
        title: "Content Discovery",
        desc: "Statically generated article pages, tag navigation, pagination, and RSS feeds supported by the starter.",
      },
      {
        icon: "🌗",
        title: "Responsive Reading",
        desc: "Responsive layouts and light/dark themes adapted from the open-source starter blog.",
      },
    ],
  },

  {
    slug: "leetcode-solutions",
    title: "LeetCode Solutions",
    shortDesc:
      "Not grinding numbers - solving with intent. A curated repo of clean, well-thought-out solutions by a competitive programmer.",
    description:
      "As a competitive programmer, I never stopped thinking algorithmically. This repository holds my LeetCode solutions - not a grind log, but a collection of problems I genuinely worked through. Each solution reflects how I approach algorithmic thinking: understanding the problem deeply before writing a single line. Browse the repo and see how I think.",
    image: "/images/projects/leetcode-cover.svg",
    heroImage: "/images/projects/leetcode-cover.svg",
    category: "Competitive Programming",
    date: "2022 - Present",
    company: "Personal",
    tech: ["Python", "Algorithms", "Data Structures"],
    featured: false,
    sourceUrl: "https://github.com/tuntauk/leetcode",
    features: [
      {
        icon: "🧠",
        title: "Algorithmic Thinking",
        desc: "Each solution focuses on understanding the problem deeply before optimising for speed or memory.",
      },
      {
        icon: "📐",
        title: "Clean Code",
        desc: "Readable, well-structured solutions - not just accepted submissions, but maintainable code.",
      },
      {
        icon: "🏆",
        title: "ICPC Background",
        desc: "Competitive programming mindset shaped by ICPC participation and regional contest experience.",
      },
      {
        icon: "📚",
        title: "Pattern Recognition",
        desc: "Problems grouped by patterns: sliding window, DP, graphs, backtracking, and more.",
      },
    ],
  },

  {
    slug: "portfolio",
    title: "Personal Portfolio Website",
    shortDesc:
      "Astro-powered portfolio with an AI chat assistant, animated sections, and dark/light theming.",
    description:
      "Designed and built a personal portfolio from scratch using Astro and TypeScript. The site features smooth scroll-driven animations powered by Motion, a fully responsive dark/light theme, and a project detail system with dynamic routing. Includes an embedded AI chat widget that lets visitors ask questions about experience, skills and projects in real time. Deployed on Vercel with a custom domain.",
    image: "/images/projects/portfolio-cover.svg",
    heroImage: "/images/projects/portfolio-cover.svg",
    category: "Web Application",
    date: "Mar 2026 - Present",
    company: "Personal",
    tech: ["Astro", "TypeScript", "Tailwind CSS", "Motion"],
    featured: false,
    sourceUrl: "https://github.com/tuntauk/portfolio",
    liveUrl: "https://tt.ideafresh.dev",
    features: [
      {
        icon: "🚀",
        title: "Astro Static Site",
        desc: "Zero-JS-by-default architecture with island components for fast page loads.",
      },
      {
        icon: "🤖",
        title: "AI Chat Assistant",
        desc: "Embedded chat widget powered by Claude that answers visitor questions about Tun Tauk.",
      },
      {
        icon: "✨",
        title: "Scroll Animations",
        desc: "Smooth entrance animations on every section using the Motion library.",
      },
      {
        icon: "🌗",
        title: "Dark / Light Theme",
        desc: "Persisted theme toggle with animated icon transition and CSS variable theming.",
      },
    ],
  },
  {
    slug: "zicolog",
    title: "ZicoLog - Traffic Accident Visualization Platform",
    shortDesc:
      "Interactive map-based platform visualizing Japan traffic accident data with advanced filtering and cross-tabulation analysis.",
    description:
      "Developed a data visualization web platform for the Transportation Safety AI Laboratory that presents Japan's traffic accident records spanning 2019-2024. The system features an interactive map with location clustering, detailed incident data including weather, vehicle type, injury severity, and party-specific information. Supports advanced filtering across multiple dimensions and cross-tabulation analysis for safety research and policy decision-making.",
    image: "/images/projects/zicolog.png",
    heroImage: "/images/projects/zicolog.png",
    category: "Web Application",
    date: "May 2025 - Aug 2025",
    company: "One Terrace",
    tech: ["React.js", "Laravel", "MySQL", "Google Maps API"],
    liveUrl: "https://zicolog.com/",
    featured: false,
    features: [
      {
        icon: "🗺️",
        title: "Interactive Map",
        desc: "Location-based clustering on Google Maps with street-level panoramic views of accident sites.",
      },
      {
        icon: "🔍",
        title: "Advanced Filtering",
        desc: "Filter by age group, injury severity, time of day, accident type, and weather conditions.",
      },
      {
        icon: "📊",
        title: "Cross-tabulation Analysis",
        desc: "Examine correlations between variables across 2019-2024 accident data for safety research.",
      },
      {
        icon: "📋",
        title: "Detailed Incident Data",
        desc: "Comprehensive records covering party info, vehicle damage, collision points, and jurisdiction details.",
      },
    ],
  },

  {
    slug: "umt-store",
    title: "UMT Store",
    shortDesc:
      "Role-based inventory system with automated P&L reporting for Admin and Salesman.",
    description:
      "Designed and developed a role-based inventory system supporting Admin and Salesman operations. Features include centralized supply management, stock transfers between admin and salesmen, individual sales tracking and automated profit and loss reporting.",
    image: "/images/projects/umt-pos.png",
    heroImage: "/images/projects/umt-pos.png",
    category: "Web Application",
    date: "2020 - 2021",
    company: "Ideafresh",
    tech: ["React", "Node.js", "MongoDB"],
    featured: false,
    features: [
      {
        icon: "👥",
        title: "Role-based Access",
        desc: "Separate Admin and Salesman dashboards with scoped permissions.",
      },
      {
        icon: "📦",
        title: "Stock Transfers",
        desc: "Centralized supply management with transfers between admin and salesmen.",
      },
      {
        icon: "📈",
        title: "Sales Tracking",
        desc: "Individual salesman performance tracked per transaction.",
      },
      {
        icon: "💰",
        title: "P&L Reporting",
        desc: "Automated profit and loss reports generated per period.",
      },
    ],
  },

  {
    slug: "nan-oo-store-pos",
    title: "Nan Oo Store POS",
    shortDesc:
      "Multi-channel POS & inventory management for retail/wholesale distribution.",
    description:
      "A full-featured multi-channel Point of Sale and Inventory Management system built for a retail/wholesale distribution chain in Myanmar. Handles sales transactions, stock levels, supplier management, and detailed financial reporting across multiple store locations.",
    image: "/images/projects/nan-oo.png",
    heroImage: "/images/projects/nan-oo.png",
    category: "Desktop / Web App",
    date: "Jun 2022 - Jan 2023",
    company: "Ideafresh",
    tech: ["React", "Express"],
    featured: false,
    features: [
      {
        icon: "🛒",
        title: "POS Terminal",
        desc: "Fast barcode-scan checkout, receipt printing, and multi-payment support.",
      },
      {
        icon: "📦",
        title: "Inventory Tracking",
        desc: "Real-time stock levels, reorder alerts, and multi-warehouse support.",
      },
      {
        icon: "📈",
        title: "Sales Reporting",
        desc: "Daily, weekly, monthly reports with charts and CSV export.",
      },
      {
        icon: "👥",
        title: "Supplier Management",
        desc: "Purchase orders, supplier contacts, and payment tracking.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
