import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider, themeScript } from "@/components/layout/theme";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { LoadingScreen } from "@/components/layout/loading-screen";


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.role}`, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: `${siteConfig.name} — ${siteConfig.role}`, description: siteConfig.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#07080b" }, { media: "(prefers-color-scheme: light)", color: "#f4f5f8" }],
  colorScheme: "dark light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: siteConfig.url,
      sameAs: [siteConfig.github.url, siteConfig.socials.linkedin, siteConfig.socials.twitter].filter(Boolean),
      knowsAbout: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Full-Stack Development"],
    },
    { "@type": "WebSite", name: `${siteConfig.name} Portfolio`, url: siteConfig.url },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="grain min-h-screen overflow-x-hidden">
        <ThemeProvider>
          <LoadingScreen />
          <SmoothScroll />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
