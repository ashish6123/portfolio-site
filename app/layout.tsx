import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ExternalLink } from "@/components/ExternalLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/data/site";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const description = `${site.positioning} Final-year at IIT Patna, based in ${site.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}, ${site.title}`, template: `%s | ${site.name}` },
  description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}, ${site.title}`,
    description,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, ${site.title}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0b" },
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
  ],
};

// Runs before paint: a saved choice wins, then the system setting, else dark.
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.title,
  description: site.positioning,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Patna" },
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: [site.github, site.linkedin],
};

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#open-source", label: "Open source" },
  { href: "/#contact", label: "Contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${code.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="bg-accent text-accent-ink sr-only rounded px-3 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>
        <header className="topbar sticky top-0 z-40">
          <div className="shell flex h-16 items-center justify-between gap-4">
            <Link href="/" className="font-serif text-2xl leading-none tracking-tight">
              {site.name}
            </Link>
            <nav aria-label="Sections" className="text-muted hidden gap-7 text-sm md:flex">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-ink transition-colors">
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a
                href={site.resume}
                download={site.resumeFilename}
                className="btn btn-primary btn-sm"
              >
                Resume <span aria-hidden="true">↓</span>
                <span className="sr-only"> (PDF)</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main id="main" className="min-w-0">
          {children}
        </main>
        <footer className="border-line border-t">
          <div className="shell text-muted flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-8 font-mono text-xs">
            <span>
              © 2026 {site.name}. {site.location}.
            </span>
            <span className="flex gap-5">
              <ExternalLink className="hover:text-ink" href={site.github}>
                GitHub
              </ExternalLink>
              <ExternalLink className="hover:text-ink" href={site.linkedin}>
                LinkedIn
              </ExternalLink>
              <a className="hover:text-ink" href={`mailto:${site.email}`}>
                Email
              </a>
            </span>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
