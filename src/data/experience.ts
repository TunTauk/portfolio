export interface ProjectBullet {
  title: string;
  period?: string; // optional sub-period label e.g. "03/2026 - Present · Bangkok"
  desc: string;
  slug?: string; // links to /projects/{slug}
}

export interface ExperienceItem {
  period: string;
  periodColor: 'orange' | 'muted'; // orange for current, muted for past
  location: string;
  company: string;
  companyUrl?: string;
  role: string;
  type: 'Full-time' | 'Freelance' | 'Contract';
  description: string;
  projects?: ProjectBullet[]; // linked project bullets (entry 2 style)
  tags?: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "Mar 2023 - Apr 2026",
    periodColor: "muted",
    location: "Tokyo, Japan (Remote)",
    company: "One Terrace",
    companyUrl: "https://oneterrace.jp",
    role: "Full Stack Engineer",
    type: "Full-time",
    description:
      "Built full-stack apps with Laravel, Next.js, React, NestJS. Managed CI/CD pipelines, Docker configs, and AWS deployments.",
    projects: [
      { title: "Koyou Assess - Employment Assessment System", desc: "Internal management system and customer app for foreign worker employment compliance assessments in Japan.", slug: "koyou-assess" },
      { title: "ZicoLog - Traffic Accident Visualization Platform", desc: "Interactive map-based platform visualizing Japan traffic accident data with filtering and cross-tabulation analysis.", slug: "zicolog" },
    ],
    tags: ["Laravel", "Next.js", "AWS", "Docker", "MySQL"],
  },
  {
    period: "2019 - Present",
    periodColor: "orange",
    location: "Yangon, Myanmar (Remote)",
    company: "Ideafresh",
    companyUrl: "https://www.facebook.com/100063888946027",
    role: "Full Stack Engineer",
    type: "Freelance",
    description:
      "Built 5+ production systems spanning web platforms, e-commerce, gym management, POS and inventory. Led multi-role architectures and multi-instance deployments.",
    projects: [
      { title: "Forex IB Marketing & Education Platform", desc: "Multi-language Forex IB marketing & trader education platform with CMS, tutorial system, Q&A forum and admin panel.", slug: "forex-ib-marketing-platform" },
      { title: "Suitup 777",                              desc: "CMS-driven tailor website with admin dashboard, fabric inventory, online ordering, appointment logic and WhatsApp integration.", slug: "suitup-777" },
      { title: "CrossFit Gym & E-commerce",               desc: "Gym operations, product sales, customer fitness app.",        slug: "crossfit-gym-platform" },
      { title: "Kyaw Distribution POS",                   desc: "Mobile sales tablet app, multi-instance deployments.",       slug: "kyaw-distribution-pos" },
      { title: "UMT Store",                                desc: "Role-based inventory system for Admin and Salesman operations with stock transfers, individual sales tracking and automated P&L reporting.", slug: "umt-store" },
    ],
    tags: ["React", "Node.js", "MongoDB", "Docker", "Laravel", "MySQL"],
  },
  {
    period: "Oct - Dec 2021",
    periodColor: "muted",
    location: "Yangon, Myanmar (Remote)",
    company: "AGB Communication Co., Ltd.",
    companyUrl: "https://www.agbcommunication.com/",
    role: "Frontend Developer",
    type: "Contract",
    description: "",
    projects: [
      {
        title: "AGB Billing Admin Panel",
        desc: "Web-based admin panel for managing user billing and payment operations using React.js. Built reusable UI components with responsive design. Worked in an Agile environment coordinating with backend teams.",
      },
      {
        title: "AGB Billing Mobile UI",
        desc: "Designed and prototyped a mobile billing application UI in Figma following Material Design guidelines. Created high-fidelity wireframes and user flows focused on mobile-first UX.",
        slug: "agb-billing-mobile-ui",
      },
    ],
    tags: ["React.js", "Figma"],
  },
];
