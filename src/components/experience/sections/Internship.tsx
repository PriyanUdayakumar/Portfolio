import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import { internship } from "@/lib/resume-data";
import { Section, reveal } from "@/components/experience/Section";

export function Internship() {
  return (
    <Section id="internship" label="Internship" index="04" title={<>Field deployment</>}>
      <motion.div {...reveal} transition={{ duration: 0.6 }} className="glass relative overflow-hidden rounded-2xl p-8 md:p-10">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl glass-strong text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">{internship.title}</h3>
              <p className="mt-1 text-primary">{internship.org}</p>
            </div>
          </div>
          <span className="rounded-full border border-primary/40 px-4 py-1 font-mono text-xs text-primary">
            {internship.year}
          </span>
        </div>
        <ul className="relative mt-8 space-y-3">
          {internship.points.map((p, i) => (
            <motion.li
              key={i}
              {...reveal}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-3 text-muted-foreground"
            >
              <ChevronRight className="mt-1 h-4 w-4 flex-none text-secondary" />
              <span>{p}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
