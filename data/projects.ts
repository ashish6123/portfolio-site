export type ProjectLink = {
  label: string;
  href: string;
};

export type ArchitectureStep = {
  name: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  context?: string;
  status?: string;
  problem: string[];
  built: string[];
  architecture: ArchitectureStep[];
  stack: string[];
  outcome: string[];
  links: ProjectLink[];
};

// Keep copy factual. Do not add metrics, users or revenue that are not confirmed.
export const projects: Project[] = [
  {
    slug: "limbo",
    title: "Limbo",
    kind: "Autonomous payment reconciliation agent",
    summary:
      "An agent that finds payments stuck between the gateway and the merchant, and recovers them within hard guardrails.",
    context: "Built for the Razorpay AI Buildathon, Track 03",
    problem: [
      "A customer pays and the gateway marks the payment successful. The success webhook to the merchant is lost, delayed, or fails mid-processing.",
      "The merchant's system records a failed payment, cancels the order, and never issues a refund. The money sits in limbo until the customer escalates.",
    ],
    built: [
      "A reconciliation agent that compares gateway payments with merchant orders, classifies every mismatch, diagnoses the cause, and takes one bounded action: complete the order, replay the webhook, refund, or escalate to a person.",
      "A public demo where a visitor sends one payment into limbo and watches it recover, streamed from the real audit log.",
      "Postgres advisory locks, so two scheduler instances overlapping during a deploy can never run the same reconciliation cycle.",
      "A demo_sessions table that ties each demo order to an unguessable token, plus per-IP rate limiting, so the public demo is safe to leave open.",
    ],
    architecture: [
      {
        name: "Reconciliation engine",
        detail:
          "Deterministic. Diffs gateway records against merchant orders and classifies each mismatch.",
      },
      {
        name: "LLM diagnosis layer",
        detail:
          "Explains the likely root cause and triages ambiguous cases. It can never move money.",
      },
      {
        name: "Policy engine",
        detail:
          "Hard guardrails decide what is allowed: idempotency, amount ceilings, capped retries, a circuit breaker.",
      },
      {
        name: "Audit trail",
        detail: "Append-only. Every detection, decision and action is written once.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Next.js",
      "Claude API",
      "Razorpay",
      "Render",
      "Supabase",
      "Vercel",
    ],
    outcome: [
      "Deployed end to end on Render, Supabase and Vercel, with a live demo anyone can run.",
      "The key lesson: the real bugs only surfaced in live Razorpay test-mode integration runs, not in mocks.",
    ],
    links: [
      { label: "Live demo", href: "https://limbo-ochre.vercel.app/demo" },
      { label: "Source on GitHub", href: "https://github.com/ashish6123/limbo" },
    ],
  },
  {
    slug: "listingreel",
    title: "ListingReel",
    kind: "Full-stack SaaS, solo-built",
    summary:
      "Turns a real estate listing into a vertical video with an AI script and voiceover. Live, with real payments.",
    problem: [
      "Real estate agents need short vertical videos for every listing, and producing them by hand takes hours of scripting, recording and editing.",
    ],
    built: [
      "The whole product, alone: landing page, auth, dashboard, video pipeline and billing.",
      "A pipeline where an LLM writes the script, a voice model narrates it, and FFmpeg assembles the listing photos into a captioned vertical video.",
      "Paid plans through Razorpay, live in production.",
    ],
    architecture: [
      { name: "Next.js frontend", detail: "Listing form, dashboard and video library." },
      {
        name: "FastAPI backend",
        detail: "Authenticated API that queues and tracks each video job.",
      },
      { name: "Groq", detail: "Writes the voiceover script for the listing." },
      { name: "ElevenLabs", detail: "Records the narration." },
      { name: "FFmpeg", detail: "Animates photos, syncs audio, burns in captions." },
      { name: "Supabase and Razorpay", detail: "Data, storage, and paid subscriptions." },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Supabase",
      "Groq",
      "ElevenLabs",
      "FFmpeg",
      "Razorpay",
    ],
    outcome: ["Live in production with real payments."],
    links: [
      { label: "Live app", href: "https://listing-reel.vercel.app/dashboard" },
      { label: "Source on GitHub", href: "https://github.com/ashish6123/ListingReel" },
    ],
  },
  {
    slug: "trustreview",
    title: "TrustReview",
    kind: "Fake review detection",
    summary: "Flags fake product reviews using a fine-tuned DistilBERT model, served as an API.",
    problem: [
      "Fake reviews distort what shoppers see, and they are hard to spot by reading one review at a time.",
    ],
    built: [
      "A fine-tuned DistilBERT classifier for fake review detection.",
      "A FastAPI service for single and batch predictions, deployed on Hugging Face Spaces.",
      "A test suite of more than 60 unit tests.",
    ],
    architecture: [
      { name: "Data preparation", detail: "Cleaning and preprocessing of labelled reviews." },
      { name: "Model", detail: "DistilBERT fine-tuned for fake or genuine classification." },
      { name: "API", detail: "FastAPI endpoints for one review or a batch." },
      { name: "Hosting", detail: "Hugging Face Spaces." },
    ],
    stack: ["Python", "DistilBERT", "scikit-learn", "Hugging Face", "FastAPI"],
    outcome: ["90.88% accuracy.", "60+ unit tests."],
    links: [
      { label: "Live app", href: "https://huggingface.co/spaces/rudra05/trust-review" },
      { label: "Source on GitHub", href: "https://github.com/ashish6123/Trust-Review" },
    ],
  },
  {
    slug: "stadiumsentinel",
    title: "StadiumSentinel",
    kind: "Multi-agent crowd safety system",
    summary:
      "Specialist AI agents that help a stadium operations team watch the crowd and act before a surge turns dangerous.",
    context: "Google Cloud Agentic Premier League",
    status: "Demo offline",
    problem: [
      "During a gate surge, sudden rain or a security incident, a stadium operations team hears from many channels at once and has to decide by hand, often too late.",
    ],
    built: [
      "A command interface where one query is routed to specialist agents for crowd flow, weather, security and emergency procedures.",
      "A background monitor that checks live data on its own and raises alerts without waiting for a question.",
    ],
    architecture: [
      { name: "Query router", detail: "Sends each question to one or more specialist agents." },
      {
        name: "Specialist agents",
        detail: "Crowd flow, weather, security and emergency, built on Google ADK.",
      },
      { name: "Retrieval", detail: "Emergency procedures retrieved with Vertex AI Search." },
      {
        name: "Response",
        detail: "Gemini combines agent answers and streams them to the dashboard.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Google ADK",
      "Gemini",
      "Vertex AI Search",
      "Firestore",
      "Cloud Run",
    ],
    outcome: [
      "Top 80 of 3,000+ teams in the Google Cloud Agentic Premier League.",
      "The live demo is offline because the hackathon cloud credits expired.",
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/ashish6123/Stadium-Sentinel" }],
  },
  {
    slug: "aion-benchmark-harness",
    title: "AION benchmark harness",
    kind: "Benchmarking tooling for an LLM gateway",
    summary: "Tooling to measure how an enterprise LLM gateway behaves under realistic workloads.",
    context: "Infivector, private company repository",
    status: "Private",
    problem: [
      "Before a customer pilot, the team needs repeatable evidence of how the gateway routes and serves requests, not impressions from manual testing.",
    ],
    built: [
      "A harness that runs a fixed set of task families through the gateway and records how each request was handled.",
      "Runs that can be repeated on a new build, so changes can be compared against a known baseline.",
    ],
    architecture: [
      { name: "Task sets", detail: "Representative workloads grouped into task families." },
      { name: "Runner", detail: "Sends tasks through the gateway under controlled settings." },
      { name: "Recorder", detail: "Captures routing and response behaviour for every request." },
      { name: "Report", detail: "Compares a run against previous runs." },
    ],
    stack: ["Go", "Python", "LLM gateway"],
    outcome: [
      "Used to support acceptance testing for customer pilots. Code and results are private.",
    ],
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
