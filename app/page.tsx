import Link from "next/link";
import { Book, type BookPage } from "@/components/Book";
import { Opener, Paper } from "@/components/Paper";
import { ExternalLink } from "@/components/ExternalLink";
import { education, site } from "@/data/site";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

function Cover() {
  return (
    <div className="flex min-h-full flex-col px-[clamp(24px,5vw,52px)] py-[clamp(28px,5vw,56px)]">
      <span
        aria-hidden="true"
        className="bg-accent absolute top-0 right-10 h-24 w-5 [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]"
      />
      <p className="font-mono text-xs tracking-[0.14em] uppercase opacity-80">
        A portfolio in five chapters
      </p>
      <div className="my-auto flex flex-col gap-6 py-10">
        <h1 className="font-serif text-[clamp(44px,6.4vw,76px)] leading-[0.95] font-medium tracking-tight">
          {site.name}
        </h1>
        <span className="bg-cloth-ink h-px w-20 opacity-50" />
        <p className="max-w-[24em] font-serif text-[clamp(19px,2vw,23px)] leading-snug italic">
          {site.positioning}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#projects"
            className="bg-cloth-ink text-cloth rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-opacity hover:opacity-90"
          >
            View work
          </a>
          <a
            href="#contact"
            className="border-cloth-ink hover:bg-cloth-ink/10 rounded-full border px-5 py-2.5 font-sans text-sm font-semibold transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px]">
        <li>
          <ExternalLink href={site.github} className="underline-offset-4 hover:underline">
            GitHub
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={site.linkedin} className="underline-offset-4 hover:underline">
            LinkedIn
          </ExternalLink>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
            Email
          </a>
        </li>
        <li>
          <a
            href={site.resume}
            download={site.resumeFilename}
            className="underline-offset-4 hover:underline"
          >
            Resume (PDF)
          </a>
        </li>
      </ul>
      <p className="mt-4 font-mono text-[11px] tracking-[0.1em] uppercase opacity-70">
        {site.location}
      </p>
    </div>
  );
}

const head = (section: string): [string, string] => [site.name, section];

const pages: BookPage[] = [
  { id: "cover", label: "Cover", recto: <Cover /> },
  {
    id: "about",
    label: "About",
    verso: (
      <Opener
        chapter={1}
        title="About"
        argument="In which I say who I am, and what kind of team I want to join."
      />
    ),
    recto: (
      <Paper head={head("About")} folio={1}>
        <p className="eyebrow">Chapter I</p>
        <h2 className="font-serif text-4xl font-medium">About</h2>
        <p className="drop-cap">{site.about[0]}</p>
        <p>{site.about[1]}</p>
        <p className="border-accent border-l-2 pl-4 italic">{site.about[2]}</p>
      </Paper>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    verso: (
      <Opener
        chapter={2}
        title="Experience"
        argument="In which I work on an LLM gateway and a desktop app, on a team of two."
      />
    ),
    recto: (
      <Paper head={head("Experience")} folio={2}>
        <p className="eyebrow">Chapter II</p>
        <h2 className="font-serif text-4xl font-medium">Experience</h2>
        {experience.map((job) => (
          <article key={job.company} className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-serif text-2xl font-medium">{job.role}</h3>
              <p className="text-muted font-mono text-[13px]">
                {job.company} · {job.place} · {job.period}
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {job.points.map((point) => (
                <li key={point} className="relative pl-6">
                  <span aria-hidden="true" className="text-accent absolute top-0 left-0">
                    ¶
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Paper>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    verso: (
      <Opener
        chapter={3}
        title="Projects"
        argument="In which five things get built, and each has a chapter of its own."
      />
    ),
    recto: (
      <Paper head={head("Projects")} folio={3}>
        <p className="eyebrow">Chapter III</p>
        <h2 className="font-serif text-4xl font-medium">Projects</h2>
        <ol className="flex flex-col">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-rule border-t first:border-t-0">
              <Link
                href={`/projects/${p.slug}`}
                className="group grid grid-cols-[2.2em_1fr] gap-x-3 py-3.5"
              >
                <span className="text-muted pt-1 font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="decoration-accent font-serif text-xl font-medium decoration-[1.5px] underline-offset-4 group-hover:underline">
                      {p.title}
                    </h3>
                    {p.status ? <span className="badge">{p.status}</span> : null}
                  </div>
                  <span className="text-muted font-mono text-xs">{p.kind}</span>
                  <span className="text-[15px] leading-snug">{p.summary}</span>
                  <span className="text-accent font-mono text-xs">
                    Read the chapter <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Paper>
    ),
  },
  {
    id: "education",
    label: "Education",
    verso: (
      <Opener
        chapter={4}
        title="Education"
        argument="In which I study computer science and data analytics at IIT Patna."
      />
    ),
    recto: (
      <Paper head={head("Education")} folio={4}>
        <p className="eyebrow">Chapter IV</p>
        <h2 className="font-serif text-4xl font-medium">Education</h2>
        {education.map((e) => (
          <article key={e.degree} className="border-rule flex flex-col gap-1 border-t pt-4">
            <h3 className="font-serif text-xl font-medium">{e.degree}</h3>
            <p className="text-muted">{e.school}</p>
            <p className="font-mono text-[13px]">{e.detail}</p>
          </article>
        ))}
      </Paper>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    verso: (
      <Opener chapter={5} title="Contact" argument="In which you write to me, and I write back." />
    ),
    recto: (
      <Paper head={head("Contact")} folio={5}>
        <p className="eyebrow">Chapter V</p>
        <h2 className="font-serif text-4xl font-medium">Contact</h2>
        <p>
          Looking for remote AI product or integration work, or hiring for a Forward Deployed
          Engineer or AI engineering role? Email is the fastest way to reach me.
        </p>
        <p>
          <a
            href={`mailto:${site.email}`}
            className="ink-link font-serif text-[clamp(19px,2.2vw,24px)] break-all"
          >
            {site.email}
          </a>
        </p>
        <ul className="flex flex-col gap-2 font-mono text-sm">
          <li>
            <ExternalLink href={site.github} className="ink-link">
              github.com/ashish6123
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={site.linkedin} className="ink-link">
              linkedin.com/in/ashish-ranjan6
            </ExternalLink>
          </li>
          <li>
            <a href={site.resume} download={site.resumeFilename} className="ink-link">
              Download resume (PDF)
            </a>
          </li>
        </ul>
        <p className="text-muted">{site.location}.</p>
        <div className="border-rule text-muted mt-6 border-t pt-4 text-center font-mono text-[11px] leading-relaxed">
          <p className="tracking-[0.12em] uppercase">Colophon</p>
          <p>Set in Newsreader, Instrument Sans and JetBrains Mono.</p>
          <p>Built with Next.js and Tailwind CSS. Turn back with ← or swipe.</p>
        </div>
      </Paper>
    ),
  },
];

export default function Home() {
  return (
    <Book
      pages={pages}
      endpaper={
        <div className="text-muted flex h-full items-end justify-center p-8 font-mono text-[11px] tracking-[0.12em] uppercase">
          Ex libris · {site.name}
        </div>
      }
    />
  );
}
