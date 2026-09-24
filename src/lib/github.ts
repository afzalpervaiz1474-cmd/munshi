import { siteConfig } from "@/config/site";

export type Repo = { name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; updated_at: string; fork: boolean };

/** Server-only: fetches public repos. Token (optional) is read from server env and never sent to the client. */
export async function getRepos(): Promise<Repo[] | null> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "portfolio" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=12`, {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Repo[];
    return data.filter((r) => !r.fork).slice(0, 6);
  } catch {
    return null;
  }
}
