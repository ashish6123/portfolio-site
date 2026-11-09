export type Experience = {
  role: string;
  company: string;
  place: string;
  period: string;
  points: string[];
};

// Infivector work is proprietary: keep this high level. No customer names,
// internal metrics, architecture details or screenshots.
export const experience: Experience[] = [
  {
    role: "Forward Deployed Engineer Intern",
    company: "Infivector",
    place: "Remote",
    period: "July 2026 to present",
    points: [
      "Work across two products: AION, a Go-based enterprise LLM gateway, and Conduit, a desktop app for coding agents.",
      "Fix backend bugs in the AION Go codebase, and build and run benchmarking and acceptance-testing infrastructure for customer pilots.",
      "Build Windows support, agent adapters, connectors and diagnostics on Conduit.",
      "Two-person team with the founder, so I own work end to end.",
    ],
  },
];
