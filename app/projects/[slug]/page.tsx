import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "@/components/ExternalLink";
import { getProject, projects, type Project } from "@/data/projects";

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
    <div className="flex flex-wrap gap-3">
      {project.links.map((l, i) => (
        <ExternalLink key={l.href} href={l.href} className={i === 0 ? "btn btn-primary" : "btn"}>
          {l.label} <span aria-hidden="true">↗</span>
        </ExternalLink>
      ))}
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-line grid gap-4 border-t py-10 md:grid-cols-[200px_1fr] md:gap-12 md:py-14">
      <h2 className="eyebrow md:pt-2">{title}</h2>
      <div className="flex min-w-0 flex-col gap-4 md:text-lg">{children}</div>
    </section>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="shell pt-10 pb-16 md:pt-16">
      <header className="flex flex-col gap-6 pb-12 md:pb-16">
        <Link href="/#work" className="text-muted hover:text-ink self-start font-mono text-xs">
          <span aria-hidden="true">←</span> All work
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">{project.kind}</p>
          {project.status ? <span className="badge">{project.status}</span> : null}
        </div>
        <h1 className="display rise text-[clamp(48px,9vw,112px)]">{project.title}</h1>
        <p className="text-muted max-w-2xl text-xl md:text-2xl">{project.summary}</p>
        {project.context ? (
          <p className="text-muted font-mono text-[13px]">{project.context}</p>
        ) : null}
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <Links project={project} />
      </header>

      <Block title="Problem">
        {project.problem.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Block>

      <Block title="What I built">
        <ul className="flex flex-col">
          {project.built.map((b) => (
            <li key={b} className="border-line border-t py-4 first:border-t-0 first:pt-0">
              {b}
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Architecture">
        <ol className="card flex flex-col p-2">
          {project.architecture.map((step, i) => (
            <li
              key={step.name}
              className="border-line grid grid-cols-[32px_1fr] gap-x-2 border-t px-3 py-4 first:border-t-0"
            >
              <span className="text-accent-text pt-1 font-mono text-xs" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <h3 className="text-base font-medium">{step.name}</h3>
                <p className="text-muted text-[15px] leading-snug">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Outcome">
        <ul className="flex flex-col gap-3">
          {project.outcome.map((o) => (
            <li key={o} className="border-accent-text border-l-2 pl-4">
              {o}
            </li>
          ))}
        </ul>
      </Block>

      <Link
        href={`/projects/${next.slug}`}
        className="card card-hover mt-4 flex items-center justify-between gap-6 p-6 md:p-10"
      >
        <span className="flex min-w-0 flex-col gap-2">
          <span className="eyebrow">Next project</span>
          <span className="display text-4xl md:text-6xl">{next.title}</span>
        </span>
        <span aria-hidden="true" className="text-accent-text text-3xl">
          →
        </span>
      </Link>
    </article>
  );
}
