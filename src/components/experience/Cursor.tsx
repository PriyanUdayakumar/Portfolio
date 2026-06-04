import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    const trail = Array.from({ length: 8 }, () => ({ x: mx, y: my }));

    let hovering = false;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      hovering = !!t.closest("a, button, [data-magnetic], input, textarea, .cursor-target");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const scale = hovering ? 1.8 : 1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${scale})`;
        ringRef.current.style.opacity = hovering ? "1" : "0.6";
      }
      // energy trail
      let px = mx;
      let py = my;
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.x += (px - p.x) * 0.35;
        p.y += (py - p.y) * 0.35;
        const el = trailRefs.current[i];
        if (el) {
          const s = (1 - i / trail.length) * 1;
          el.style.transform = `translate3d(${p.x - 3}px, ${p.y - 3}px, 0) scale(${s})`;
          el.style.opacity = `${(1 - i / trail.length) * 0.5}`;
        }
        px = p.x;
        py = p.y;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full"
          style={{
            background: i % 2 === 0 ? "var(--cyan)" : "var(--violet)",
            boxShadow: "0 0 8px var(--cyan)",
            willChange: "transform",
          }}
        />
      ))}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary"
        style={{ boxShadow: "0 0 12px var(--cyan)", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-primary/70"
        style={{ transition: "opacity 0.2s", willChange: "transform" }}
      />
    </div>
  );
}
