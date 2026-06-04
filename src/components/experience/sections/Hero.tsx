import { motion } from "framer-motion";
import { ArrowDown, Github, Mail } from "lucide-react";
import { profile } from "@/lib/resume-data";
import { Magnetic } from "@/components/experience/Magnetic";
import { useSound } from "@/hooks/use-sound";
import { ProfileIdentity } from "@/components/experience/sections/ProfileIdentity";

const stats = [
  { v: "900+", l: "Problems Solved" },
  { v: "8.3", l: "CGPA" },
  { v: "4+", l: "Awards" },
];

export function Hero() {
  const { play } = useSound();
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="glass mb-2 flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.3em] text-foreground md:text-xs"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        SYSTEM ONLINE · {profile.location.toUpperCase()}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProfileIdentity />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl md:text-8xl drop-shadow-lg"
      >
        <span className="text-slate-900 dark:text-foreground">PRIYAN</span>
        <span className="text-gradient text-glow-cyan">.U</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-5 max-w-xl text-balance text-base font-semibold text-slate-800 drop-shadow-sm dark:text-slate-200 md:text-lg"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <Magnetic>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => play("click")}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-shadow hover:glow-cyan"
          >
            <Github className="h-4 w-4" /> Explore GitHub
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="#contact"
            onClick={() => play("click")}
            className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground"
          >
            <Mail className="h-4 w-4 text-primary" /> Open Terminal
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16"
      >
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-2xl font-bold text-gradient md:text-4xl">{s.v}</div>
            <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground">
              {s.l.toUpperCase()}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <ArrowDown className="h-4 w-4 text-primary" />
      </motion.a>
    </section>
  );
}
