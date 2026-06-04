import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/hooks/use-sound";

const lines = [
  "[ OK ]  Initializing PRIYAN.OS kernel v2.0.28",
  "[ OK ]  Mounting neural cortex modules",
  "[ OK ]  Calibrating particle universe",
  "[ OK ]  Loading AI vision subsystems (YOLOv8)",
  "[ OK ]  Establishing GitHub uplink",
  "[ OK ]  Spinning up holographic interface",
  "[ OK ]  Synthesizing digital identity",
];

export function BootLoader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const { play } = useSound();
  const playRef = useRef(play);
  playRef.current = play;

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setVisible((v) => {
        if (v >= lines.length) {
          clearInterval(lineTimer);
          return v;
        }
        playRef.current("boot");
        return v + 1;
      });
    }, 320);

    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 9 + 3));
    }, 110);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progTimer);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && visible >= lines.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 800);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [progress, visible, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.12),transparent_60%)]" />
          <div className="relative w-[min(90vw,640px)] px-6">
            <div className="mb-8 text-center">
              <motion.h1
                className="font-display text-4xl font-black tracking-[0.3em] text-gradient md:text-6xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                PRIYAN.U
              </motion.h1>
              <p className="mt-3 font-mono text-xs tracking-[0.4em] text-muted-foreground">
                BOOTING DIGITAL UNIVERSE
              </p>
            </div>

            <div className="glass rounded-xl p-5 font-mono text-[11px] leading-relaxed text-muted-foreground md:text-sm">
              {lines.slice(0, visible).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2"
                >
                  <span className="text-primary">{l.slice(0, 6)}</span>
                  <span className="text-foreground/80">{l.slice(6)}</span>
                </motion.div>
              ))}
              <span className="inline-block h-3 w-2 animate-pulse bg-primary align-middle" />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
                <span>SYSTEM LOAD</span>
                <span className="text-primary">{Math.floor(progress)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
