export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  role?: string;
  timeline?: string;
  images?: ProjectImage[];
  highlights?: string[];
  techStack?: string[];
  challenges?: Array<{
    title: string;
    description: string;
  }>;
  results?: Array<{
    metric: string;
    description: string;
  }>;
  links?: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A modern online store with real-time inventory and seamless checkout experience.",
    longDescription:
      "Built a full-featured e-commerce platform handling thousands of daily transactions. Implemented real-time inventory tracking, a streamlined checkout flow, and an admin dashboard for managing products and orders. Focused on performance optimization and mobile-first design.",
    tags: ["React", "Node.js", "PostgreSQL"],
    year: "2025",
    role: "Lead Full-Stack Engineer",
    timeline: "4 months",
    images: [
      { src: "/next.svg", alt: "E-Commerce homepage preview", caption: "Homepage" },
      { src: "/vercel.svg", alt: "E-Commerce product catalog preview", caption: "Product catalog" },
      { src: "/globe.svg", alt: "E-Commerce checkout preview", caption: "Checkout flow" },
    ],
    highlights: [
      "Designed checkout flow with reduced cart abandonment.",
      "Implemented real-time stock sync for product inventory.",
      "Built admin tools for order and catalog management.",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis"],
    results: [
      { metric: "-28%", description: "Checkout drop-off" },
      { metric: "+40%", description: "Page speed score" },
      { metric: "99.9%", description: "Checkout uptime" },
    ],
    links: {
      github: "https://github.com",
    },
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Data visualization tool for tracking key business metrics and user behavior.",
    longDescription:
      "Designed and developed an analytics dashboard that aggregates data from multiple sources. Features include customizable charts, real-time data streaming, export functionality, and role-based access control. Reduced report generation time by 80%.",
    tags: ["TypeScript", "React", "D3.js"],
    year: "2024",
    role: "Frontend Engineer",
    timeline: "3 months",
    images: [
      { src: "/globe.svg", alt: "Analytics dashboard overview", caption: "Dashboard overview" },
      { src: "/file.svg", alt: "Analytics reports screen", caption: "Reports and exports" },
      { src: "/next.svg", alt: "Analytics chart detail", caption: "Chart detail view" },
    ],
    highlights: [
      "Created modular charts and filter architecture.",
      "Implemented role-based access for internal teams.",
    ],
    techStack: ["TypeScript", "React", "D3.js", "Node.js"],
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates and team features.",
    longDescription:
      "Created a collaborative task management application supporting real-time updates across team members. Includes Kanban boards, time tracking, file attachments, and integration with popular communication tools. Serves over 500 active teams.",
    tags: ["React", "Node.js", "WebSocket"],
    year: "2024",
    role: "Full-Stack Engineer",
    timeline: "5 months",
    images: [
      { src: "/file.svg", alt: "Task board overview", caption: "Kanban board" },
      { src: "/vercel.svg", alt: "Task detail modal", caption: "Task details" },
      { src: "/next.svg", alt: "Team activity timeline", caption: "Activity timeline" },
    ],
    techStack: ["React", "Node.js", "WebSocket", "PostgreSQL"],
  },
  {
    slug: "ai-content-assistant",
    title: "AI Content Assistant",
    description: "An AI-powered writing tool that helps create and optimize content efficiently.",
    longDescription:
      "Developed an AI-powered content assistant that helps writers create, edit, and optimize their content. Features include tone adjustment, SEO suggestions, grammar checking, and multi-language support. Integrated with popular CMS platforms.",
    tags: ["Python", "React", "OpenAI"],
    year: "2024",
  },
  {
    slug: "health-tracker",
    title: "Health & Wellness Tracker",
    description: "Mobile-friendly app for tracking fitness goals, nutrition, and daily habits.",
    longDescription:
      "Built a comprehensive health tracking application with support for fitness goals, nutrition logging, habit tracking, and progress visualization. Includes integration with wearable devices and provides personalized recommendations based on user data.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2023",
  },
  {
    slug: "api-gateway",
    title: "API Gateway Service",
    description: "A scalable API gateway handling authentication, rate limiting, and routing.",
    longDescription:
      "Architected and built a high-performance API gateway service handling millions of requests daily. Features include JWT authentication, rate limiting, request transformation, caching, and detailed logging. Reduced API response times by 40%.",
    tags: ["Node.js", "Redis", "Docker"],
    year: "2023",
  },
  {
    slug: "fintech-mobile-wallet",
    title: "Fintech Mobile Wallet",
    description: "Secure digital wallet experience with instant transfers and spending analytics.",
    longDescription:
      "Built a mobile-first wallet platform focused on fast transfers, transaction categorization, and account security. Implemented fraud detection signals, card controls, and account activity insights to improve trust and retention.",
    tags: ["React", "TypeScript", "Node.js"],
    year: "2023",
    role: "Frontend Lead",
    timeline: "6 months",
  },
  {
    slug: "edtech-learning-portal",
    title: "EdTech Learning Portal",
    description: "Interactive learning platform with quizzes, progress tracking, and instructor tools.",
    longDescription:
      "Developed a scalable learning portal with lesson authoring, assessment modules, and learner progress analytics. Added role-based dashboards for instructors and administrators to improve content management workflows.",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    year: "2022",
    role: "Full-Stack Engineer",
    timeline: "5 months",
  },
  {
    slug: "real-estate-crm-suite",
    title: "Real Estate CRM Suite",
    description: "CRM for agencies with listings, lead pipelines, and automated follow-up sequences.",
    longDescription:
      "Created a real-estate CRM that unified lead capture, property listing management, and automated email follow-ups. Improved sales visibility with pipeline stages and reporting dashboards tailored to broker workflows.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2022",
    role: "Product Engineer",
    timeline: "4 months",
  },
  {
    slug: "logistics-route-optimizer",
    title: "Logistics Route Optimizer",
    description: "Route planning tool that reduces delivery times through dynamic optimization.",
    longDescription:
      "Implemented route optimization features for dispatch teams using geo-based constraints and delivery windows. Added live ETA updates and operator tooling that reduced manual planning overhead and late deliveries.",
    tags: ["TypeScript", "Redis", "Docker"],
    year: "2021",
    role: "Backend Engineer",
    timeline: "7 months",
  },
  {
    slug: "saas-billing-platform",
    title: "SaaS Billing Platform",
    description: "Subscription billing engine with metered usage, invoicing, and dunning workflows.",
    longDescription:
      "Built a billing platform supporting recurring subscriptions, usage-based pricing, and tax-ready invoicing. Integrated payment retries and account status automation to reduce churn from failed payments.",
    tags: ["Node.js", "PostgreSQL", "Stripe"],
    year: "2021",
    role: "Platform Engineer",
    timeline: "5 months",
  },
  {
    slug: "healthcare-patient-portal",
    title: "Healthcare Patient Portal",
    description: "Patient portal for appointments, lab results, and secure provider messaging.",
    longDescription:
      "Delivered a patient portal with secure authentication, appointment scheduling, and document sharing. Focused on accessibility and data privacy controls, improving patient communication efficiency for clinic staff.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2020",
    role: "Senior Software Engineer",
    timeline: "8 months",
  },
];

export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
