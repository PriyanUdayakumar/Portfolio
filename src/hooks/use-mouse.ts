import { useEffect, useState } from "react";

type Listener = (x: number, y: number) => void;

class MouseStore {
  // normalized -1..1
  nx = 0;
  ny = 0;
  // pixel
  px = 0;
  py = 0;
  private listeners = new Set<Listener>();
  private started = false;

  start() {
    if (this.started || typeof window === "undefined") return;
    this.started = true;
    const handle = (e: PointerEvent) => {
      this.px = e.clientX;
      this.py = e.clientY;
      this.nx = (e.clientX / window.innerWidth) * 2 - 1;
      this.ny = -((e.clientY / window.innerHeight) * 2 - 1);
      this.listeners.forEach((l) => l(this.nx, this.ny));
    };
    window.addEventListener("pointermove", handle, { passive: true });
  }

  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => {
      this.listeners.delete(l);
    };
  }
}

export const mouse = new MouseStore();

export function useMouseStarter() {
  useEffect(() => {
    mouse.start();
  }, []);
}

export function useReactiveBackground() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    mouse.start();
    return mouse.subscribe((nx, ny) => {
      setPos({ x: (nx + 1) * 50, y: (1 - ny) * 50 });
    });
  }, []);
  return pos;
}
