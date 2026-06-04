import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/resume-data";
import { Section, reveal } from "@/components/experience/Section";

export function Education() {
  return (
    <Section id="education" label="Education" index="02" title={<>Knowledge timeline</>}>
      <div className="relative space-y-6 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent">
        {education.map((e, i) => (
          <motion.div
            key={i}
            {...reveal}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative flex gap-6 pl-1"
          >
            <div className="relative z-10 mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full glass-strong text-primary">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div className="glass flex-1 rounded-xl p-5 transition-transform hover:-translate-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-base font-semibold text-foreground">{e.institution}</h3>
                <span className="font-mono text-xs text-primary">{e.year}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{e.degree}</p>
              <span className="mt-3 inline-block rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 font-mono text-xs text-secondary-foreground">
                {e.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
