import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { certifications } from "@/lib/resume-data";
import { Section } from "@/components/experience/Section";

export function Certifications() {
  return (
    <Section id="certifications" label="Certifications" index="06" title={<>Verified protocols</>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="glass group relative overflow-hidden rounded-xl p-5 transition-all hover:-translate-y-1 hover:glow-cyan"
          >
            <BadgeCheck className="mb-3 h-5 w-5 text-primary transition-transform group-hover:scale-110" />
            <h3 className="text-sm font-semibold leading-snug text-foreground">{c.name}</h3>
            <div className="mt-3 flex items-center justify-between font-mono text-[11px]">
              <span className="text-secondary">{c.issuer}</span>
              <span className="text-muted-foreground">{c.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
