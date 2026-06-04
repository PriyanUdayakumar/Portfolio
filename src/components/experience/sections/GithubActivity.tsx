import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Activity, GitFork, Star, Users, Boxes, Radio } from "lucide-react";
import { getGithubStats } from "@/lib/github.functions";
import { profile } from "@/lib/resume-data";
import { Section } from "@/components/experience/Section";

const langColor: Record<string, string> = {
  JavaScript: "#f5d76e",
  TypeScript: "#D4AF37",
  Python: "#8b5cf6",
  "C++": "#D4AF37",
  CSS: "#8b5cf6",
  HTML: "#f5d76e",
};

const fallbackDescriptions: Record<string, string> = {
  "Programmer": "A smart Public Distribution System with AI-based face authentication and inventory monitoring.",
  "Traffic-Management-System": "AI industrial safety monitoring — YOLOv8 helmet detection on live camera feeds.",
  "Chemical-Equipment-Visualizer": "Interactive visualizer for chemical engineering equipment and processes.",
  "QuickNote-application-zeroday": "Open-source contribution to a collaborative JavaScript note-taking application.",
  "Portfolio": "Interactive 3D digital universe and portfolio built with React, Three.js, and Framer Motion.",
  "MobileApp": "Cross-platform mobile application focusing on performance, fluid UI, and user engagement.",
  "Forage": "Virtual experience program simulations and technical tasks showcasing practical problem-solving.",
};

function eventLabel(type: string) {
  return type.replace("Event", "").replace(/([A-Z])/g, " $1").trim();
}

export function GithubActivity() {
  const fetchStats = useServerFn(getGithubStats);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-stats"],
    queryFn: () => fetchStats(),
    staleTime: 1000 * 60 * 10,
  });

  const metrics = [
    { icon: Boxes, label: "Repositories", value: data?.publicRepos },
    { icon: Star, label: "Total Stars", value: data?.totalStars },
    { icon: Users, label: "Followers", value: data?.followers },
    { icon: Activity, label: "Languages", value: data?.languages.length },
  ];

  const maxLang = Math.max(1, ...(data?.languages.map((l) => l.count) ?? [1]));

  return (
    <Section id="github" label="GitHub Activity" index="09" title={<>Live coding dashboard</>}>
      <div className="mb-6 flex items-center gap-2 font-mono text-xs text-primary">
        <Radio className="h-3.5 w-3.5 animate-pulse" />
        REAL-TIME UPLINK · @{profile.githubUser}
      </div>

      {isError && (
        <div className="glass rounded-xl p-6 text-sm text-muted-foreground">
          Uplink temporarily unavailable. Visit{" "}
          <a href={profile.github} className="text-primary underline" target="_blank" rel="noreferrer">
            github.com/{profile.githubUser}
          </a>
          .
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5"
          >
            <m.icon className="mb-3 h-5 w-5 text-primary" />
            <div className="font-display text-3xl font-bold text-foreground">
              {isLoading ? <span className="text-muted-foreground">··</span> : (m.value ?? 0)}
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground">
              {m.label.toUpperCase()}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h3 className="mb-5 font-display text-sm font-semibold tracking-wide text-foreground">
            LANGUAGE DISTRIBUTION
          </h3>
          <div className="space-y-4">
            {(data?.languages ?? []).map((l, i) => (
              <div key={l.name}>
                <div className="mb-1.5 flex justify-between font-mono text-xs">
                  <span className="text-foreground">{l.name}</span>
                  <span className="text-muted-foreground">{l.count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(l.count / maxLang) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: langColor[l.name] ?? "var(--cyan)" }}
                  />
                </div>
              </div>
            ))}
            {isLoading && <div className="font-mono text-xs text-muted-foreground">syncing repositories…</div>}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="mb-5 font-display text-sm font-semibold tracking-wide text-foreground">
            RECENT ACTIVITY
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {(data?.events ?? []).slice(0, 7).map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 border-b border-border pb-2"
              >
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                <span className="text-secondary">{eventLabel(e.type)}</span>
                <span className="truncate text-muted-foreground">{e.repo.split("/")[1] ?? e.repo}</span>
              </motion.div>
            ))}
            {!isLoading && (data?.events?.length ?? 0) === 0 && (
              <div className="text-muted-foreground">No recent public events.</div>
            )}
            {isLoading && <div className="text-muted-foreground">fetching event stream…</div>}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(data?.repos ?? []).slice(0, 6).map((r, i) => (
          <motion.a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.08 }}
            className="glass group rounded-xl p-4 transition-all hover:-translate-y-1 hover:glow-cyan"
          >
            <div className="flex items-center justify-between">
              <span className="truncate font-mono text-sm text-foreground group-hover:text-primary">
                {r.name}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 h-8 text-xs text-muted-foreground">
              {r.description || fallbackDescriptions[r.name] || "No description"}
            </p>
            <div className="mt-3 flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
              {r.language && (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full" style={{ background: langColor[r.language] ?? "var(--cyan)" }} />
                  {r.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" /> {r.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3 w-3" /> {r.forks}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
