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
  sourceUrl?: string;
  liveUrl?: string;
  featured: boolean;
  features: { icon: string; title: string; desc: string }[];
  architectureImage?: string;
}

export const projects: Project[] = [
  // ── 6 featured (displayed on homepage & projects page) ──────────────────

  {
    slug: "forex-ib-marketing-platform",
    title: "Forex IB Marketing & Education Platform",
    shortDesc: "Multi-language CMS with trader education, Q&A forum, performance board and admin panel.",
    description:
      "Designed and developed a multi-language (EN/MM) web platform for Forex IB marketing and trader education. The system includes a dynamic landing page with CMS-based content management, provider showcase and a structured tutorial system supporting both step-by-step learning modules and flexible content blocks. Implemented user authentication with admin approval, a moderated review system with featured display and a member-only Q&A forum. Built a performance board for showcasing trading proof through a gallery-based interface. Developed a centralized admin panel for managing content, users and platform interactions.",
    image: "/images/projects/forex-ib.png",
    heroImage: "/images/projects/forex-ib.png",
    category: "Web Application",
    date: "Mar 2026 – Present",
    tech: ["Next.js", "MySQL"],
    featured: true,
    features: [
      { icon: "🌍", title: "Multi-language CMS",    desc: "EN/MM content management with dynamic landing pages and provider showcase." },
      { icon: "📚", title: "Tutorial System",        desc: "Step-by-step learning modules and flexible content blocks for trader education." },
      { icon: "💬", title: "Member Q&A Forum",       desc: "Member-only forum with moderated review system and featured display." },
      { icon: "📊", title: "Performance Board",      desc: "Gallery-based interface for showcasing trading proof and results." },
    ],
  },

  {
    slug: "suitup-777",
    title: "Suitup 777",
    liveUrl: "https://www.suitup777.com/",
    shortDesc: "CMS-driven tailor website with admin dashboard, online ordering and WhatsApp integration.",
    description:
      "Designed and developed a custom CMS-driven tailor website with an admin dashboard, enabling management of product catalogs, fabric inventories, media galleries, customer profiles, and order workflows. Implemented an online ordering system with appointment logic, status tracking, and WhatsApp integration for customer communication.",
    image: "/images/projects/suitup-777.png",
    heroImage: "/images/projects/suitup-777.png",
    category: "Web Application",
    date: "2024",
    tech: ["Next.js", "MySQL"],
    featured: true,
    features: [
      { icon: "🧵", title: "Product & Fabric CMS",  desc: "Manage product catalogs, fabric inventories and media galleries from one dashboard." },
      { icon: "🛒", title: "Online Ordering",        desc: "Order system with appointment logic, status tracking and customer profiles." },
      { icon: "💬", title: "WhatsApp Integration",   desc: "Automated customer communication via WhatsApp for order updates." },
      { icon: "🖼️", title: "Media Gallery",          desc: "Rich media management for showcasing tailoring work and collections." },
    ],
  },

  {
    slug: "crossfit-gym-platform",
    title: "CrossFit Gym Platform",
    liveUrl: "https://crossfitmm.net/",
    shortDesc: "Gym management with memberships, e-commerce, class scheduling and fitness tracking.",
    description:
      "An all-in-one gym management solution covering member onboarding, class scheduling, attendance tracking, workout performance metrics, e-commerce for supplements/gear, billing subscriptions, and staff management.",
    image: "/images/projects/crossfit.png",
    heroImage: "/images/projects/crossfit.png",
    category: "Web Application",
    date: "2022",
    tech: ["React.js", "Express.js", "Laravel", "MySQL", "Sqlite"],
    featured: true,
    features: [
      { icon: "🏋️", title: "Member Dashboard",      desc: "Progress tracking, workout history, personal bests and goal setting." },
      { icon: "📅", title: "Class Scheduling",       desc: "Coach assignment, capacity limits, and automated reminders." },
      { icon: "🛍️", title: "E-commerce",            desc: "Integrated product store for supplements, gear, and merchandise." },
      { icon: "💳", title: "Subscription Billing",   desc: "Recurring plans, invoices, payment history and expiry alerts." },
    ],
  },

  {
    slug: "kyaw-distribution-pos",
    title: "Kyaw Distribution POS",
    shortDesc: "Multi-instance distribution system with mobile tablet sales for field teams.",
    description:
      "A wholesale distribution management platform with multi-instance support for field sales teams using mobile tablets. Features route-based sales rep management, van stock tracking, customer order history, and real-time inventory synchronisation.",
    image: "/images/projects/kyaw.png",
    heroImage: "/images/projects/kyaw.png",
    category: "Web Application",
    date: "2021–2022",
    tech: [ "React.js", "Express.js", "MongoDB" ],
    featured: true,
    features: [
      { icon: "🏭", title: "Multi-instance",         desc: "Deploy multiple isolated instances per distribution branch." },
      { icon: "📱", title: "Tablet Sales App",        desc: "Field sales reps take orders on mobile tablets with offline support." },
      { icon: "🚐", title: "Route Management",        desc: "Van loading, route planning and sales rep order management." },
      { icon: "📋", title: "Order Pipeline",          desc: "From purchase order to delivery with real-time status updates." },
    ],
  },

  {
    slug: "umt-store",
    title: "UMT Store",
    shortDesc: "Role-based inventory system with automated P&L reporting for Admin and Salesman.",
    description:
      "Designed and developed a role-based inventory system supporting Admin and Salesman operations. Features include centralized supply management, stock transfers between admin and salesmen, individual sales tracking and automated profit and loss reporting.",
    image: "/images/projects/umt-pos.png",
    heroImage: "/images/projects/umt-pos.png",
    category: "Web Application",
    date: "2020–2021",
    tech: ["React", "Node.js", "MongoDB"],
    featured: true,
    features: [
      { icon: "👥", title: "Role-based Access",      desc: "Separate Admin and Salesman dashboards with scoped permissions." },
      { icon: "📦", title: "Stock Transfers",         desc: "Centralized supply management with transfers between admin and salesmen." },
      { icon: "📈", title: "Sales Tracking",          desc: "Individual salesman performance tracked per transaction." },
      { icon: "💰", title: "P&L Reporting",           desc: "Automated profit and loss reports generated per period." },
    ],
  },

  {
    slug: "agb-billing-mobile-ui",
    title: "AGB Billing Mobile UI",
    liveUrl: "https://play.google.com/store/apps/details?id=com.agb.customer.billing",
    shortDesc: "High-fidelity Figma prototype for a mobile billing app following Material Design.",
    description:
      "Independently conceived and designed a mobile billing application from the ground up during a short-term contract at AGB Communication Co., Ltd. Defined the full system flow, user journeys and information architecture without a prior reference system. Translated those flows into high-fidelity Figma prototypes following Material Design guidelines - covering payment screens, billing history, invoice detail views and account management. Focused on mobile-first design, thumb-friendly navigation and a clean, consistent visual language.",
    image: "/images/projects/agb-billing-mobile-ui.png",
    heroImage: "/images/projects/billing-admin.png",
    category: "UI/UX Design",
    date: "Oct – Dec 2021",
    tech: ["Figma", "Material Design"],
    featured: true,
    features: [
      { icon: "📱", title: "Mobile-first Design",    desc: "Designed for small screens with thumb-friendly tap targets and minimal navigation depth." },
      { icon: "🎨", title: "Material Design",         desc: "Followed Google's Material Design 3 guidelines for components, colour and typography." },
      { icon: "🗺️", title: "User Flows",             desc: "End-to-end user flows covering onboarding, payment, invoice view and account settings." },
      { icon: "✏️", title: "High-fidelity Frames",   desc: "Pixel-perfect mockups with interactive prototype links for stakeholder review." },
    ],
  },

  // ── Non-featured (accessible via direct URL) ────────────────────────────

  {
    slug: "nan-oo-store-pos",
    title: "Nan Oo Store POS",
    shortDesc: "Multi-channel POS & inventory management for retail/wholesale distribution.",
    description:
      "A full-featured multi-channel Point of Sale and Inventory Management system built for a retail/wholesale distribution chain in Myanmar. Handles sales transactions, stock levels, supplier management, and detailed financial reporting across multiple store locations.",
    image: "/images/projects/retail-pos.png",
    heroImage: "/images/projects/retail-store.png",
    category: "Desktop / Web App",
    date: "Jun 2022 – Jan 2023",
    tech: ["React", "Express"],
    featured: false,
    features: [
      { icon: "🛒", title: "POS Terminal",           desc: "Fast barcode-scan checkout, receipt printing, and multi-payment support." },
      { icon: "📦", title: "Inventory Tracking",     desc: "Real-time stock levels, reorder alerts, and multi-warehouse support." },
      { icon: "📈", title: "Sales Reporting",        desc: "Daily, weekly, monthly reports with charts and CSV export." },
      { icon: "👥", title: "Supplier Management",    desc: "Purchase orders, supplier contacts, and payment tracking." },
    ],
    architectureImage: "/images/projects/retail-real.png",
  },

  {
    slug: "momo-delivery-app",
    title: "Momo Delivery App",
    shortDesc: "Real-time delivery tracking with rider assignment and verification codes.",
    description:
      "A real-time food and parcel delivery application featuring live GPS rider tracking, automated rider assignment, delivery verification codes, push notifications, in-app chat, and an admin dashboard for dispatch management.",
    image: "/images/projects/delivery-app.png",
    heroImage: "/images/projects/gofetch.png",
    category: "Mobile App",
    date: "2022",
    tech: ["Node.js", "MongoDB"],
    featured: false,
    features: [
      { icon: "📍", title: "Live Tracking",          desc: "Real-time GPS map with rider location updates every 5 seconds." },
      { icon: "🔔", title: "Push Notifications",     desc: "Order status updates at every delivery stage via FCM." },
      { icon: "🔑", title: "Verification Codes",     desc: "OTP-based delivery confirmation to prevent fraud." },
      { icon: "🚀", title: "Smart Dispatch",         desc: "Nearest-rider assignment algorithm minimising delivery time." },
    ],
    architectureImage: "/images/projects/swifttrack.png",
  },

  {
    slug: "agb-billing-panel",
    title: "AGB Billing Admin Panel",
    shortDesc: "Admin panel for billing & payments with reusable React components.",
    description:
      "Developed a web-based admin panel for managing user billing and payment operations using React.js. Built reusable UI components and implemented responsive design for improved usability. Gained hands-on experience in frontend development, component-based architecture and team collaboration. Worked in an Agile environment while coordinating with backend teams.",
    image: "/images/projects/billing-pro.png",
    heroImage: "/images/projects/billing-admin.png",
    category: "Web Application",
    date: "Oct – Dec 2021",
    tech: ["React.js", "Laravel"],
    featured: false,
    features: [
      { icon: "💳", title: "Billing Management",    desc: "Manage user billing records and payment operations from a central panel." },
      { icon: "🧩", title: "Component Library",     desc: "Reusable React components for rapid and consistent UI development." },
      { icon: "📱", title: "Responsive Design",     desc: "Fully responsive layout optimised for desktop and tablet use." },
      { icon: "🤝", title: "Agile Collaboration",   desc: "Coordinated with backend teams in an Agile sprint workflow." },
    ],
    architectureImage: "/images/projects/financier.png",
  },
];

export const featuredProjects = projects.filter(p => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const idx = projects.findIndex(p => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
