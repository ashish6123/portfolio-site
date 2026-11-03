import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Instrument_Sans, JetBrains_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/data/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "block",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "block",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "block",
  // A real monospace fallback keeps label widths, so nothing rewraps when the font lands.
  adjustFontFallback: false,
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
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
    { media: "(prefers-color-scheme: dark)", color: "#15120f" },
    { media: "(prefers-color-scheme: light)", color: "#d8cdbb" },
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${instrument.variable} ${jetbrains.variable}`}
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
        <div className="shell">
          <header className="flex items-center justify-between gap-4 py-3 min-[861px]:py-4">
            <Link href="/" className="text-ink font-serif text-lg font-medium tracking-tight">
              {site.name}
            </Link>
            <ThemeToggle />
          </header>
          <main id="main" className="min-w-0">
            {children}
          </main>
          <footer className="text-muted flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-5 font-mono text-xs max-[860px]:hidden">
            <span>© 2026 {site.name}</span>
            <a
              className="hover:text-ink"
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="hover:text-ink"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
