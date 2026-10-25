export const site = {
  name: "Ashish Ranjan",
  positioning: "Forward Deployed Engineer building LLM infrastructure and agentic systems.",
  location: "India, open to remote",
  email: "ashishranjaniitp@gmail.com",
  github: "https://github.com/ashish6123",
  linkedin: "https://www.linkedin.com/in/ashish-ranjan6",
  resume: "/resume.pdf",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashishranjan.vercel.app").replace(/\/$/, ""),
  about: [
    "Final-year BS student in Computer Science and Data Analytics at IIT Patna (CPI 8.88, graduating July 2027).",
    "I work on AI and LLM infrastructure, agentic systems, and full-stack products, and I care about shipping things that are deployed and used. I prefer high-autonomy teams with direct access to the people building the product.",
    "Available to start a new role from January 2027.",
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
