import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Book, type BookPage } from "@/components/Book";
import { ExternalLink } from "@/components/ExternalLink";
import { Opener, Paper } from "@/components/Paper";
import { getProject, projects, type Project } from "@/data/projects";
import { site } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title}: ${project.kind}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description: project.summary, url: `/projects/${project.slug}` },
    twitter: { title, description: project.summary },
  };
}

function Links({ project }: { project: Project }) {
  if (project.links.length === 0) {
    return <p className="text-muted font-mono text-sm">Private repository. No public links.</p>;
  }
  return (
    <ul className="flex flex-col gap-2 font-mono text-sm">
      {project.links.map((l) => (
        <li key={l.href}>
          <ExternalLink href={l.href} className="ink-link">
            {l.label} <span aria-hidden="true">↗</span>
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

function buildPages(project: Project, index: number): BookPage[] {
  const head = (section: string): [string, string] => [project.title, section];
  const next = projects[(index + 1) % projects.length];

  return [
    {
      id: "title",
      label: "Title",
      recto: (
        <Paper head={[site.name, `Project ${index + 1} of ${projects.length}`]} folio={1}>
          <Link href="/#projects" className="text-muted hover:text-ink font-mono text-xs">
            <span aria-hidden="true">←</span> All projects
          </Link>
          <p className="eyebrow">{project.kind}</p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-[clamp(40px,5.4vw,60px)] leading-none font-medium tracking-tight">
              {project.title}
            </h1>
            {project.status ? <span className="badge">{project.status}</span> : null}
          </div>
          <p className="font-serif text-xl leading-snug italic">{project.summary}</p>
          {project.context ? (
            <p className="text-muted font-mono text-[13px]">{project.context}</p>
          ) : null}
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
          <Links project={project} />
        </Paper>
      ),
    },
    {
      id: "problem",
      label: "Problem",
      verso: <Opener chapter={1} title="The problem" argument="In which something goes wrong." />,
      recto: (
        <Paper head={head("Problem and build")} folio={2}>
          <h2 className="font-serif text-3xl font-medium">Problem</h2>
          {project.problem.map((p, i) => (
            <p key={p} className={i === 0 ? "drop-cap" : undefined}>
              {p}
            </p>
          ))}
          <h2 className="pt-2 font-serif text-3xl font-medium">What I built</h2>
          <ul className="flex flex-col gap-3">
            {project.built.map((b) => (
              <li key={b} className="relative pl-6">
                <span aria-hidden="true" className="text-accent absolute top-0 left-0">
                  ¶
                </span>
                {b}
              </li>
            ))}
          </ul>
        </Paper>
      ),
    },
    {
      id: "architecture",
      label: "Architecture",
      verso: (
        <Opener
          chapter={2}
          title="Architecture"
          argument="In which the pieces are laid out in order."
        />
      ),
      recto: (
        <Paper head={head("Architecture")} folio={3}>
          <h2 className="font-serif text-3xl font-medium">Architecture</h2>
          <ol className="flex flex-col">
            {project.architecture.map((step, i) => (
              <li key={step.name} className="grid grid-cols-[28px_1fr] gap-x-4">
                <div className="flex flex-col items-center" aria-hidden="true">
                  <span className="border-accent text-accent grid size-7 place-items-center rounded-full border font-mono text-xs">
                    {i + 1}
                  </span>
                  {i < project.architecture.length - 1 ? (
                    <span className="bg-rule w-px flex-1" />
                  ) : null}
                </div>
                <div className="flex flex-col gap-0.5 pb-5">
                  <h3 className="font-mono text-sm font-medium">{step.name}</h3>
                  <p className="text-muted text-[15px] leading-snug">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Paper>
      ),
    },
    {
      id: "outcome",
      label: "Outcome",
      verso: <Opener chapter={3} title="Outcome" argument="In which we see how it turned out." />,
      recto: (
        <Paper head={head("Outcome")} folio={4}>
          <h2 className="font-serif text-3xl font-medium">Outcome</h2>
          <ul className="flex flex-col gap-3">
            {project.outcome.map((o) => (
              <li key={o} className="border-accent border-l-2 pl-4">
                {o}
              </li>
            ))}
          </ul>
          <h2 className="pt-2 font-serif text-3xl font-medium">Links</h2>
          <Links project={project} />
          <div className="border-rule mt-6 border-t pt-4">
            <p className="text-muted font-mono text-xs">Next chapter</p>
            <Link href={`/projects/${next.slug}`} className="ink-link font-serif text-xl">
              {next.title} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Paper>
      ),
    },
  ];
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  return <Book key={project.slug} pages={buildPages(project, index)} />;
}
