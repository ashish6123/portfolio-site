export const site = {
  name: "Ashish Ranjan",
  title: "AI Engineer",
  positioning: "AI engineer building guarded agents, LLM products and payment workflows.",
  location: "India, open to remote",
  email: "ashishranjaniitp@gmail.com",
  github: "https://github.com/ashish6123",
  linkedin: "https://www.linkedin.com/in/ashish-ranjan6",
  resume: "/resume.pdf",
  resumeFilename: "Ashish-Ranjan-Resume.pdf",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashishranjan-ai.vercel.app").replace(
    /\/$/,
    "",
  ),
  headline:
    "I build AI agents that can act on real systems, and the guardrails that stop them doing damage.",
  role: "Forward Deployed Engineer Intern at Infivector. Final-year at IIT Patna.",
  availability: "Open to FDE, AI and backend roles. Full-time from January 2027.",
  about: [
    "Final-year BS student in Computer Science and Data Analytics at IIT Patna (CPI 8.88, graduating July 2027).",
    "I build AI products and integrations, from workflow design through implementation, validation and handoff. My work includes LLM infrastructure, agentic systems, and full-stack products.",
    "Available now for remote contract projects for 20 to 30 hours per week. Available for full-time roles from January 2027.",
  ],
} as const;

export type Education = {
  degree: string;
  school: string;
  detail: string;
};

export const education: Education[] = [
  {
    degree: "BS, Computer Science and Data Analytics (4-year)",
    school: "Indian Institute of Technology Patna",
    detail: "CPI 8.88. Expected July 2027.",
  },
  {
    degree: "BSc, Computer Science and Data Analytics (3-year, provisional)",
    school: "Indian Institute of Technology Patna",
    detail: "Provisional degree.",
  },
];

export type Highlight = {
  value: string;
  label: string;
  detail: string;
};

export const highlights: Highlight[] = [
  {
    value: "Top 80",
    label: "of 3,000+ developers",
    detail: "National finalist, Google Cloud Agentic Premier League 2026.",
  },
  {
    value: "FDE",
    label: "Intern at Infivector",
    detail: "Since July 2026, in a two-person team with the founder.",
  },
  {
    value: "Kestra",
    label: "Merged core fix",
    detail: "Streams records instead of buffering whole files in memory.",
  },
  {
    value: "8.88",
    label: "CPI at IIT Patna",
    detail: "BS, Computer Science and Data Analytics. Graduating July 2027.",
  },
];

export type OpenSource = {
  repo: string;
  title: string;
  detail: string;
  href: string;
};

export const openSource: OpenSource[] = [
  {
    repo: "kestra-io/kestra",
    title: "Stream records in FilterItems and DeduplicateItems",
    detail: "Core fix. The tasks now stream records instead of buffering the whole file.",
    href: "https://github.com/kestra-io/kestra/pull/21997",
  },
  {
    repo: "kestra-io/kestra",
    title: "Unit tests for a UI widget",
    detail: "A small test contribution to the Kestra UI.",
    href: "https://github.com/kestra-io/kestra/pull/21724",
  },
  {
    repo: "kestra-io/blueprints",
    title: "Go benchmark regression gate",
    detail: "An example workflow that gates on benchstat results.",
    href: "https://github.com/kestra-io/blueprints/pull/4831",
  },
];

export type SkillGroup = {
  name: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { name: "Languages", items: ["Python", "Go", "TypeScript", "SQL"] },
  { name: "Backend and web", items: ["FastAPI", "Next.js", "PostgreSQL", "Supabase"] },
  {
    name: "AI",
    items: ["Claude API", "Gemini API", "Google ADK", "Groq", "Hugging Face"],
  },
  { name: "Payments and cloud", items: ["Razorpay", "Cloud Run", "Render", "Vercel"] },
];
