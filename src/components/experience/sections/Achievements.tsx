import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "@/lib/resume-data";
import { Section } from "@/components/experience/Section";

function TunnelItem({ a, i, total }: { a: (typeof achievements)[number]; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const z = useTransform(scrollYProgress, [0, 1], [-260, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const left = i % 2 === 0;

  return (
    <div ref={ref} style={{ perspective: 1000 }} className="relative flex justify-center py-6">
      <motion.div
        style={{ z, opacity, scale, transformStyle: "preserve-3d" }}
        className={`relative w-full max-w-md ${left ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"}`}
      >
        <div className="glass-strong group relative overflow-hidden rounded-2xl p-6 transition-shadow hover:glow-violet">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-gold">
              <Trophy className="h-5 w-5" style={{ color: "var(--gold)" }} />
            </div>
            <span className="font-display text-2xl font-black" style={{ color: "var(--gold)" }}>
              {a.rank}
            </span>
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-foreground">{a.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
          <span className="mt-3 inline-block font-mono text-xs text-primary">{a.year}</span>
        </div>
      </motion.div>
    </div>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" label="Achievements" index="07" title={<>Trophy tunnel</>}>
      <div className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent md:block" />
        {achievements.map((a, i) => (
          <TunnelItem key={a.title} a={a} i={i} total={achievements.length} />
        ))}
      </div>
    </Section>
  );
}
