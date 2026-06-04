import { createServerFn } from "@tanstack/react-start";

export type GithubStats = {
  login: string;
  name: string | null;
  avatar: string;
  followers: number;
  publicRepos: number;
  repos: {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    url: string;
    updatedAt: string;
  }[];
  totalStars: number;
  languages: { name: string; count: number }[];
  events: { type: string; repo: string; createdAt: string }[];
};

const USER = "PriyanUdayakumar";

async function gh(path: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "priyan-portfolio",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub ${path} -> ${res.status}`);
  return res.json();
}

export const getGithubStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<GithubStats> => {
    const [user, repos, events] = await Promise.all([
      gh(`/users/${USER}`),
      gh(`/users/${USER}/repos?per_page=100&sort=updated`),
      gh(`/users/${USER}/events/public?per_page=30`).catch(() => []),
    ]);

    const mappedRepos = (repos as any[]).map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      updatedAt: r.updated_at,
    }));

    const totalStars = mappedRepos.reduce((s, r) => s + r.stars, 0);

    const langCount = new Map<string, number>();
    for (const r of mappedRepos) {
      if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
    }
    const languages = [...langCount.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const mappedEvents = (events as any[]).slice(0, 12).map((e) => ({
      type: e.type,
      repo: e.repo?.name ?? "",
      createdAt: e.created_at,
    }));

    return {
      login: user.login,
      name: user.name,
      avatar: user.avatar_url,
      followers: user.followers,
      publicRepos: user.public_repos,
      repos: mappedRepos,
      totalStars,
      languages,
      events: mappedEvents,
    };
  },
);
