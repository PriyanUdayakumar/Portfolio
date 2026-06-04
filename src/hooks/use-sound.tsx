import { createContext, useContext, useEffect, useRef, useState } from "react";

type SoundCtx = { enabled: boolean; toggle: () => void; play: (type: "hover" | "click" | "boot") => void };
const Ctx = createContext<SoundCtx>({ enabled: false, toggle: () => {}, play: () => {} });

export function useSound() {
  return useContext(Ctx);
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  const ensure = () => {
    if (typeof window === "undefined") return null;
    if (!audioRef.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (AC) audioRef.current = new AC();
    }
    return audioRef.current;
  };

  const play = (type: "hover" | "click" | "boot") => {
    if (!enabled) return;
    const ac = ensure();
    if (!ac) return;
    if (ac.state === "suspended") ac.resume();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g);
    g.connect(ac.destination);
    const now = ac.currentTime;
    const map = {
      hover: { f: 880, t: 0.06, v: 0.2 },
      click: { f: 520, t: 0.12, v: 0.4 },
      boot: { f: 1200, t: 0.5, v: 0.3 },
    } as const;
    const { f, t, v } = map[type];
    o.type = "sine";
    o.frequency.setValueAtTime(f, now);
    o.frequency.exponentialRampToValueAtTime(f * 0.6, now + t);
    g.gain.setValueAtTime(v, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + t);
    o.start(now);
    o.stop(now + t);
  };

  const toggle = () => {
    setEnabled((e) => {
      const next = !e;
      if (next) {
        const ac = ensure();
        if (ac?.state === "suspended") ac.resume();
      }
      return next;
    });
  };

  useEffect(() => {
    return () => {
      audioRef.current?.close().catch(() => {});
    };
  }, []);

  return <Ctx.Provider value={{ enabled, toggle, play }}>{children}</Ctx.Provider>;
}
