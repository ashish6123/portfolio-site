import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail";
import { ExternalLink } from "@/components/ExternalLink";
import { experience } from "@/data/experience";
import { projects, type Project } from "@/data/projects";
import { education, highlights, openSource, site, skills } from "@/data/site";

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 flex flex-col gap-3 md:mb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display text-4xl md:text-6xl">{title}</h2>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
      <Link href={`/projects/${project.slug}`} className="text-link">
        Case study <span aria-hidden="true">→</span>
      </Link>
      {project.links.map((l) => (
        <ExternalLink key={l.href} href={l.href} className="text-link">
          {l.label} <span aria-hidden="true">↗</span>
        </ExternalLink>
      ))}
    </div>
  );
}

function ProjectMeta({ project, index }: { project: Project; index: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-accent-text font-mono text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="eyebrow">{project.kind}</span>
      {project.status ? <span className="badge">{project.status}</span> : null}
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
      {items.map((s) => (
        <li key={s} className="chip">
          {s}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [featured, ...rest] = projects;

  return (
    <>
      <section className="relative isolate">
        <div className="dotfield" aria-hidden="true" />
        <div className="shell flex flex-col gap-8 pt-14 pb-14 md:gap-10 md:pt-24 md:pb-20">
          <p
            className="rise border-line bg-surface text-muted inline-flex max-w-full items-center gap-3 self-start rounded-full border px-4 py-2 text-[13px] leading-snug"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <span className="pulse-dot" aria-hidden="true" />
            {site.availability}
          </p>
          <h1
            className="display rise max-w-[17ch] text-[clamp(40px,7.4vw,92px)]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            I build AI agents that can act on real systems, and the <em>guardrails</em> that stop
            them doing damage.
          </h1>
          <p
            className="rise text-muted max-w-xl text-lg md:text-xl"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {site.role}
          </p>
          <div className="rise flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <a href={`mailto:${site.email}`} className="btn btn-primary">
              Email me
            </a>
            <a href={site.resume} download={site.resumeFilename} className="btn">
              Resume <span aria-hidden="true">↓</span>
            </a>
            <ExternalLink href={site.github} className="btn">
              GitHub <span aria-hidden="true">↗</span>
            </ExternalLink>
            <ExternalLink href={site.linkedin} className="btn">
              LinkedIn <span aria-hidden="true">↗</span>
            </ExternalLink>
          </div>

          <ul
            className="rise mt-4 grid grid-cols-2 gap-3 md:mt-8 md:gap-4 lg:grid-cols-4"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            {highlights.map((h) => (
              <li key={h.value} className="card flex flex-col gap-2 p-5 md:p-6">
                <span className="font-serif text-4xl leading-none md:text-5xl">{h.value}</span>
                <span className="text-sm font-medium">{h.label}</span>
                <span className="text-muted text-[13px] leading-snug">{h.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="work" className="section">
        <div className="shell">
          <SectionHead eyebrow="Selected work" title="Things I built and shipped" />

          <article className="card card-hover grid gap-8 p-6 md:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <div className="flex min-w-0 flex-col gap-5">
              <ProjectMeta project={featured} index={0} />
              <h3 className="display text-5xl md:text-7xl">
                <Link href={`/projects/${featured.slug}`}>{featured.title}</Link>
              </h3>
              <p className="text-muted max-w-lg text-lg">{featured.summary}</p>
              <Stack items={featured.stack} />
              <div className="mt-auto pt-2">
                <ProjectLinks project={featured} />
              </div>
            </div>
            <ol className="bg-bg border-line flex min-w-0 flex-col self-start rounded-2xl border p-2 font-mono text-[13px]">
              <li className="text-muted px-3 py-2 text-xs">pipeline</li>
              {featured.architecture.map((step, i) => (
                <li
                  key={step.name}
                  className="border-line grid grid-cols-[28px_1fr] gap-x-2 border-t px-3 py-3"
                >
                  <span className="text-accent-text" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-medium">{step.name}</span>
                    <span className="text-muted font-sans text-[13px] leading-snug">
                      {step.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </article>

          <div className="mt-4 grid gap-4 md:mt-5 md:grid-cols-2 md:gap-5">
            {rest.map((p, i) => (
              <article key={p.slug} className="card card-hover flex flex-col gap-4 p-6 md:p-8">
                <ProjectMeta project={p} index={i + 1} />
                <h3 className="display text-4xl md:text-5xl">
                  <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                </h3>
                <p className="text-muted">{p.summary}</p>
                {p.context ? <p className="text-muted font-mono text-xs">{p.context}</p> : null}
                <Stack items={p.stack.slice(0, 5)} />
                <div className="mt-auto pt-3">
                  <ProjectLinks project={p} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="shell">
          <SectionHead eyebrow="Experience" title="Where I work" />
          <div className="flex flex-col gap-10">
            {experience.map((e) => (
              <article key={e.company} className="grid gap-5 md:grid-cols-[1fr_1.6fr] md:gap-12">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <p className="text-lg">{e.company}</p>
                  <p className="text-muted font-mono text-xs">
                    {e.period} · {e.place}
                  </p>
                </div>
                <ul className="flex flex-col">
                  {e.points.map((pt) => (
                    <li
                      key={pt}
                      className="border-line text-muted border-t py-4 first:border-t-0 first:pt-0 md:text-lg"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="open-source" className="section">
        <div className="shell">
          <SectionHead eyebrow="Open source" title="Merged upstream" />
          <ul className="border-line flex flex-col border-b">
            {openSource.map((o) => (
              <li key={o.href} className="border-line border-t">
                <ExternalLink
                  href={o.href}
                  className="group grid gap-x-8 gap-y-1 py-5 md:grid-cols-[220px_1fr_auto] md:items-baseline"
                >
                  <span className="text-muted font-mono text-xs">{o.repo}</span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-lg font-medium">{o.title}</span>
                    <span className="text-muted text-[15px]">{o.detail}</span>
                  </span>
                  <span className="text-accent-text font-mono text-xs">
                    Merged{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="section">
        <div className="shell">
          <SectionHead eyebrow="About" title="Background and toolkit" />
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col gap-4">
              {site.about.map((p) => (
                <p key={p} className="text-muted md:text-lg">
                  {p}
                </p>
              ))}
              <ul className="mt-2 flex flex-col gap-4">
                {education.map((ed) => (
                  <li key={ed.degree} className="border-line border-l-2 pl-4">
                    <p className="font-medium">{ed.degree}</p>
                    <p className="text-muted text-sm">
                      {ed.school}. {ed.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="flex flex-col gap-6">
              {skills.map((g) => (
                <div key={g.name} className="flex flex-col gap-2.5">
                  <dt className="eyebrow">{g.name}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="shell">
          <div className="card flex flex-col gap-6 p-6 md:gap-8 md:p-14">
            <p className="eyebrow">Contact</p>
            <h2 className="display max-w-[16ch] text-5xl md:text-7xl">
              Have a role or a project <em>in mind?</em>
            </h2>
            <p className="text-muted max-w-xl md:text-lg">{site.about[2]}</p>
            <a
              href={`mailto:${site.email}`}
              className="text-link self-start text-lg font-medium [overflow-wrap:anywhere] md:text-2xl"
            >
              {site.email}
            </a>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                Email me
              </a>
              <CopyEmail email={site.email} />
              <ExternalLink href={site.linkedin} className="btn">
                LinkedIn <span aria-hidden="true">↗</span>
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
