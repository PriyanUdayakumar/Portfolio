import { useRef } from "react";
import { useSound } from "@/hooks/use-sound";

export function Magnetic({
  children,
  strength = 0.4,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { play } = useSound();
  const Tag = as as any;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <Tag
      ref={ref}
      data-magnetic
      onMouseMove={onMove}
      onMouseEnter={() => play("hover")}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
    >
      {children}
    </Tag>
  );
}
