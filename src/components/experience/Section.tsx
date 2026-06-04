import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  label,
  index,
  title,
  children,
  className = "",
}: {
  id: string;
  label?: string;
  index?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-[1800px] scroll-mt-24 px-6 md:px-12 lg:px-20 py-24 md:py-32 ${className}`}
    >
      {(label || title) && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {label && (
            <div className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.35em] text-primary">
              {index && <span className="text-muted-foreground">{index}</span>}
              <span className="h-px w-8 bg-primary/60" />
              {label.toUpperCase()}
            </div>
          )}
          {title && (
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {title}
            </h2>
          )}
        </motion.div>
      )}
      {children}
    </section>
  );
}

export const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};
