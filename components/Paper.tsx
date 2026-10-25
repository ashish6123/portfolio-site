import type { ReactNode } from "react";

// One printed page: running head, body, folio.
export function Paper({
  head,
  folio,
  children,
}: {
  head: [string, string];
  folio: number;
  children: ReactNode;
}) {
  return (
    <div className="page">
      <div className="running-head" aria-hidden="true">
        <span>{head[0]}</span>
        <span>{head[1]}</span>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
      <p className="folio" aria-hidden="true">
        {folio}
      </p>
    </div>
  );
}

const NUMERALS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

// A chapter opener for the left-hand page of a desktop spread, in the manner
// of an old novel: a numeral, a title, and a line on what happens inside.
export function Opener({
  chapter,
  title,
  argument,
}: {
  chapter: number;
  title: string;
  argument: string;
}) {
  return (
    <div className="page items-center justify-center text-center">
      <div className="my-auto flex max-w-[22em] flex-col items-center gap-6">
        <p className="eyebrow">Chapter {NUMERALS[chapter] ?? chapter}</p>
        <p className="text-accent font-serif text-[clamp(56px,7vw,92px)] leading-none font-normal">
          {NUMERALS[chapter] ?? chapter}
        </p>
        <p className="font-serif text-3xl font-medium">{title}</p>
        <span className="bg-rule h-px w-16" />
        <p className="text-muted font-serif text-lg italic">{argument}</p>
      </div>
    </div>
  );
}
