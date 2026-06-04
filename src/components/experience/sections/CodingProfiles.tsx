import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { codingProfiles } from "@/lib/resume-data";
import { Section } from "@/components/experience/Section";
import { Magnetic } from "@/components/experience/Magnetic";

const accentMap: Record<string, string> = {
  cyan: "var(--cyan)",
  violet: "var(--violet)",
  gold: "var(--gold)",
};

export function CodingProfiles() {
  return (
    <Section id="coding" label="Coding Profiles" index="08" title={<>Algorithmic footprint</>}>
      <div className="grid gap-5 md:grid-cols-3">
        {codingProfiles.map((p, i) => (
          <motion.div
            key={p.platform}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Magnetic strength={0.2}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="glass group relative block overflow-hidden rounded-2xl p-6"
                style={{ borderColor: `color-mix(in srgb, ${accentMap[p.accent]} 30%, transparent)` }}
              >
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-opacity group-hover:opacity-80"
                  style={{ background: accentMap[p.accent], opacity: 0.18 }}
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest text-muted-foreground">
                    {p.platform.toUpperCase()}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <div
                  className="mt-6 font-display text-3xl font-bold"
                  style={{ color: accentMap[p.accent] }}
                >
                  {p.stat}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
