export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
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
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Data visualization tool for tracking key business metrics and user behavior.",
    longDescription:
      "Designed and developed an analytics dashboard that aggregates data from multiple sources. Features include customizable charts, real-time data streaming, export functionality, and role-based access control. Reduced report generation time by 80%.",
    tags: ["TypeScript", "React", "D3.js"],
    year: "2024",
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates and team features.",
    longDescription:
      "Created a collaborative task management application supporting real-time updates across team members. Includes Kanban boards, time tracking, file attachments, and integration with popular communication tools. Serves over 500 active teams.",
    tags: ["React", "Node.js", "WebSocket"],
    year: "2024",
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
];

export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
