export const site = {
  name: "Ashish Ranjan",
  title: "AI Engineer",
  positioning: "AI engineer building guarded agents, LLM products and payment workflows.",
  location: "India, open to remote",
  email: "ashishranjaniitp@gmail.com",
  github: "https://github.com/ashish6123",
  linkedin: "https://www.linkedin.com/in/ashish-ranjan6",
  resume: "/resume.pdf",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashish-ranjan-flame.vercel.app").replace(
    /\/$/,
    "",
  ),
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
