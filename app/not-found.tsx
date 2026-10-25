import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-24 text-center">
      <p className="eyebrow">Page missing</p>
      <h1 className="font-serif text-4xl font-medium">This page was torn out.</h1>
      <Link href="/" className="ink-link font-mono text-sm">
        Back to the cover
      </Link>
    </div>
  );
}
