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
    slug: "zypto-defi-crypto-wallet-app",
    title: "Zypto DeFi Crypto Wallet App",
    description: "All-in-one multichain self-custody crypto wallet for beginners and power users.",
    longDescription:
      "Zypto DeFi Crypto Wallet App is an all-in-one multichain, self-custody wallet that makes crypto simple for beginners and power users. It lets users manage thousands of assets, swap tokens across chains via built-in routing, and connect to dApps and DeFi from one interface. Available on Google Play and the App Store, it is designed as a crypto super-app with real-world spending features (cards/payments) where supported.",
    tags: ["Web3", "MetaMask", "Web Development", "Node.js", "NestJS"],
    year: "2026",
    role: "Full-stack Developer",
    timeline: "Published on Feb 4, 2026",
    images: [
      { src: "/projects/zypto/9.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/zypto/8.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/zypto/7.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/zypto/6.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/zypto/5.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/zypto/4.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/zypto/3.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/zypto/2.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/zypto/1.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
    ],
    highlights: [
      "Built multichain wallet flows for managing thousands of crypto assets.",
      "Implemented built-in routing for cross-chain token swaps.",
      "Enabled dApp and DeFi connectivity from a single product interface.",
    ],
    techStack: ["Web3", "MetaMask", "Node.js", "NestJS"],
    links: {
      live: "https://zypto.com",
    },
  },
  {
    slug: "mapme-interactive-maps",
    title: "Mapme",
    description: "No-code platform for creating custom interactive maps for businesses and organizations.",
    longDescription:
      "Mapme allows users to create custom, interactive maps without coding skills. It is designed for individuals, businesses, and organizations that want to visually represent geographical data, locations, events, or points of interest on a map. The platform provides a user-friendly interface where users can input data and customize how it is displayed, including icons, colors, and pop-up information. Maps created using Mapme can be embedded on websites or shared with others.",
    tags: ["Socket.io", "ExpressJS", "Vue.js", "Amazon Web Services", "MongoDB"],
    year: "2024",
    role: "Full-stack Developer",
    timeline: "Published on Jan 4, 2024",
    images: [
      { src: "/projects/mapme/1.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/mapme/2.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/mapme/3.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/mapme/4.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/mapme/5.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/mapme/6.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/mapme/7.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
    ],
    highlights: [
      "Built no-code map creation flows for location-based data.",
      "Implemented customizable markers, color themes, and popup content.",
      "Enabled map embedding and sharing across external websites.",
    ],
    techStack: ["Socket.io", "ExpressJS", "Vue.js", "Amazon Web Services", "MongoDB"],
    links: {
      live: "https://mapme.com",
    },
  },
  {
    slug: "addictions-in-europe-web-application",
    title: "Addictions in Europe Web Application",
    description: "Web app to find drug treatment centers with maps, analytics, and reporting.",
    longDescription:
      "Developed a data-driven web platform for the Eurasian Harm Reduction Association where users can find drug treatment centers and explore regional harm-reduction data. The product includes interactive maps, dashboards, and visual reports that support public health research and program planning across Eurasia. Users can apply custom selection criteria, analyze trends, and generate detailed PDF reports to share with clients. Secure authentication with role-based access and AWS Cognito enables safe collaboration.",
    tags: ["React", "NestJS", "PostgreSQL", "AWS Cognito", "DocuSign"],
    year: "2022",
    role: "Node.js Developer",
    timeline: "Published on Dec 16, 2022",
    images: [
      { src: "/projects/ehra/1.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/ehra/2.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/ehra/3.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/ehra/4.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/ehra/5.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/ehra/6.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/ehra/7.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/ehra/8.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
      { src: "/projects/ehra/9.png", alt: "Zypto wallet app preview", caption: "Wallet overview" },
    ],
    highlights: [
      "Created a sophisticated web app to discover drug treatment centers.",
      "Implemented data-driven filtering and detailed PDF report generation for client sharing.",
      "Built interactive charts and visual dashboards for regional trend analysis.",
      "Integrated role-based access with AWS Cognito for secure identity and access management.",
      "Added DocuSign so users can sign documents directly in the platform.",
    ],
    techStack: ["Node.js", "NestJS", "React", "MUI", "PostgreSQL", "Chart.js", "PDFkit", "AWS Cognito", "DocuSign"],
    challenges: [
      {
        title: "MVP Timeline",
        description: "Delivered a fully functional MVP in 2.5 weeks from scratch, including design, development, testing, and deployment.",
      },
    ],
  },
  // {
  //   slug: "ai-content-assistant",
  //   title: "AI Content Assistant",
  //   description: "An AI-powered writing tool that helps create and optimize content efficiently.",
  //   longDescription:
  //     "Developed an AI-powered content assistant that helps writers create, edit, and optimize their content. Features include tone adjustment, SEO suggestions, grammar checking, and multi-language support. Integrated with popular CMS platforms.",
  //   tags: ["Python", "React", "OpenAI"],
  //   year: "2024",
  // },
  // {
  //   slug: "health-tracker",
  //   title: "Health & Wellness Tracker",
  //   description: "Mobile-friendly app for tracking fitness goals, nutrition, and daily habits.",
  //   longDescription:
  //     "Built a comprehensive health tracking application with support for fitness goals, nutrition logging, habit tracking, and progress visualization. Includes integration with wearable devices and provides personalized recommendations based on user data.",
  //   tags: ["React", "Node.js", "MongoDB"],
  //   year: "2023",
  // },
  // {
  //   slug: "api-gateway",
  //   title: "API Gateway Service",
  //   description: "A scalable API gateway handling authentication, rate limiting, and routing.",
  //   longDescription:
  //     "Architected and built a high-performance API gateway service handling millions of requests daily. Features include JWT authentication, rate limiting, request transformation, caching, and detailed logging. Reduced API response times by 40%.",
  //   tags: ["Node.js", "Redis", "Docker"],
  //   year: "2023",
  // },
  // {
  //   slug: "fintech-mobile-wallet",
  //   title: "Fintech Mobile Wallet",
  //   description: "Secure digital wallet experience with instant transfers and spending analytics.",
  //   longDescription:
  //     "Built a mobile-first wallet platform focused on fast transfers, transaction categorization, and account security. Implemented fraud detection signals, card controls, and account activity insights to improve trust and retention.",
  //   tags: ["React", "TypeScript", "Node.js"],
  //   year: "2023",
  //   role: "Frontend Lead",
  //   timeline: "6 months",
  // },
  // {
  //   slug: "edtech-learning-portal",
  //   title: "EdTech Learning Portal",
  //   description: "Interactive learning platform with quizzes, progress tracking, and instructor tools.",
  //   longDescription:
  //     "Developed a scalable learning portal with lesson authoring, assessment modules, and learner progress analytics. Added role-based dashboards for instructors and administrators to improve content management workflows.",
  //   tags: ["Next.js", "PostgreSQL", "Prisma"],
  //   year: "2022",
  //   role: "Full-Stack Engineer",
  //   timeline: "5 months",
  // },
  // {
  //   slug: "real-estate-crm-suite",
  //   title: "Real Estate CRM Suite",
  //   description: "CRM for agencies with listings, lead pipelines, and automated follow-up sequences.",
  //   longDescription:
  //     "Created a real-estate CRM that unified lead capture, property listing management, and automated email follow-ups. Improved sales visibility with pipeline stages and reporting dashboards tailored to broker workflows.",
  //   tags: ["React", "Node.js", "MongoDB"],
  //   year: "2022",
  //   role: "Product Engineer",
  //   timeline: "4 months",
  // },
  // {
  //   slug: "logistics-route-optimizer",
  //   title: "Logistics Route Optimizer",
  //   description: "Route planning tool that reduces delivery times through dynamic optimization.",
  //   longDescription:
  //     "Implemented route optimization features for dispatch teams using geo-based constraints and delivery windows. Added live ETA updates and operator tooling that reduced manual planning overhead and late deliveries.",
  //   tags: ["TypeScript", "Redis", "Docker"],
  //   year: "2021",
  //   role: "Backend Engineer",
  //   timeline: "7 months",
  // },
  // {
  //   slug: "saas-billing-platform",
  //   title: "SaaS Billing Platform",
  //   description: "Subscription billing engine with metered usage, invoicing, and dunning workflows.",
  //   longDescription:
  //     "Built a billing platform supporting recurring subscriptions, usage-based pricing, and tax-ready invoicing. Integrated payment retries and account status automation to reduce churn from failed payments.",
  //   tags: ["Node.js", "PostgreSQL", "Stripe"],
  //   year: "2021",
  //   role: "Platform Engineer",
  //   timeline: "5 months",
  // },
  // {
  //   slug: "healthcare-patient-portal",
  //   title: "Healthcare Patient Portal",
  //   description: "Patient portal for appointments, lab results, and secure provider messaging.",
  //   longDescription:
  //     "Delivered a patient portal with secure authentication, appointment scheduling, and document sharing. Focused on accessibility and data privacy controls, improving patient communication efficiency for clinic staff.",
  //   tags: ["Next.js", "TypeScript", "PostgreSQL"],
  //   year: "2020",
  //   role: "Senior Software Engineer",
  //   timeline: "8 months",
  // },
];

export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
