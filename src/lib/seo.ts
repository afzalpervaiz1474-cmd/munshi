import type { Metadata } from "next";
export const pageMeta = (title: string, description: string, path: string): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
  twitter: { title, description },
});
