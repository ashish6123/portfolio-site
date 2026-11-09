import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-start justify-center gap-5 py-24">
      <p className="eyebrow">404</p>
      <h1 className="display text-5xl md:text-7xl">This page does not exist.</h1>
      <Link href="/" className="btn btn-primary">
        Back to home
      </Link>
    </div>
  );
}
