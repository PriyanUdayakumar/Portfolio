import { motion } from "framer-motion";
import { about, profile } from "@/lib/resume-data";
import { Section, reveal } from "@/components/experience/Section";

export function About() {
  return (
    <Section id="about" label="About Me" index="01" title={<>The mind behind the machine</>}>
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {about.map((p, i) => (
            <motion.p
              key={i}
              {...reveal}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-pretty text-lg leading-relaxed font-semibold text-slate-800 drop-shadow-sm dark:text-slate-300"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div {...reveal} transition={{ duration: 0.7 }} className="glass relative overflow-hidden rounded-2xl p-1">
          <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="relative rounded-xl bg-surface/60 p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  loading="lazy"
                  className="h-16 w-16 rounded-full border border-primary/40 object-cover"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-surface bg-primary" />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-foreground">{profile.name}</div>
                <div className="font-mono text-xs text-primary">{profile.role}</div>
              </div>
            </div>
            <dl className="mt-6 space-y-3 font-mono text-xs">
              {[
                ["LOCATION", profile.location],
                ["FOCUS", "AI · Vision · Full-Stack"],
                ["STATUS", "Open to opportunities"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
