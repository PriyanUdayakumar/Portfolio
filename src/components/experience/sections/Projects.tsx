import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, profile } from "@/lib/resume-data";
import { Section } from "@/components/experience/Section";
import { useSound } from "@/hooks/use-sound";

function TiltCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const { play } = useSound();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 16, gx: px * 100, gy: py * 100 });
  };
  const reset = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const repoUrl = `${profile.github}/${p.repo}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
      style={{ perspective: 1200 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onMouseEnter={() => play("hover")}
        className="glass group relative h-full overflow-hidden rounded-2xl p-7"
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${t.gx}% ${t.gy}%, rgba(0,245,255,0.14), transparent 45%)`,
          }}
        />
        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
          <span className="rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 font-mono text-[10px] tracking-widest text-foreground">
            {p.highlight.toUpperCase()}
          </span>
          <span className="font-display text-3xl font-black text-muted-foreground/20">
            0{index + 1}
          </span>
        </div>

        <h3 className="relative mt-6 font-display text-2xl font-bold text-foreground" style={{ transform: "translateZ(30px)" }}>
          {p.name}
        </h3>
        <p className="relative mt-1 text-sm text-primary" style={{ transform: "translateZ(28px)" }}>
          {p.subtitle}
        </p>
        <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground" style={{ transform: "translateZ(20px)" }}>
          {p.description}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2" style={{ transform: "translateZ(24px)" }}>
          {p.tech.map((tech) => (
            <span key={tech} className="rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        <div className="relative mt-6 flex items-center gap-4" style={{ transform: "translateZ(30px)" }}>
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => play("click")}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <Github className="h-4 w-4" /> Source
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <Section id="projects" label="Projects" index="05" title={<>Systems in orbit</>}>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <TiltCard key={p.name} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
