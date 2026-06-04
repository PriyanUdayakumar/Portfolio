import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skills, skillGroups, type SkillNode } from "@/lib/resume-data";
import { Section } from "@/components/experience/Section";

const W = 1200;
const H = 850;
const groupOrder: SkillNode["group"][] = ["lang", "framework", "data", "tech", "tool"];
const groupColor: Record<SkillNode["group"], string> = {
  lang: "#D4AF37",
  framework: "#8b5cf6",
  data: "#FFD700",
  tech: "#D4AF37",
  tool: "#8b5cf6",
};

type Placed = { node: SkillNode; x: number; y: number };

export function Skills() {
  const [active, setActive] = useState<string | null>(null);

  const { groupHubs, placed } = useMemo(() => {
    const cx = W / 2;
    const cy = H / 2;
    const groupHubs = groupOrder.map((g, i) => {
      const a = (i / groupOrder.length) * Math.PI * 2 - Math.PI / 2;
      return { group: g, x: cx + Math.cos(a) * 280, y: cy + Math.sin(a) * 230, a };
    });
    const placed: Placed[] = [];
    for (const hub of groupHubs) {
      const members = skills.filter((s) => s.group === hub.group);
      members.forEach((m, j) => {
        const spread = (j - (members.length - 1) / 2) * 0.42;
        const a = hub.a + spread;
        const dist = 120 + (j % 2) * 40;
        placed.push({ node: m, x: hub.x + Math.cos(a) * dist, y: hub.y + Math.sin(a) * dist });
      });
    }
    return { groupHubs, placed };
  }, []);

  return (
    <Section id="skills" label="Skills" index="03" title={<>Neural skill network</>}>
      <p className="-mt-6 mb-8 max-w-lg text-sm text-muted-foreground">
        Hover any node to trace its synapses. A living map of the tools I think with.
      </p>
      <div className="glass overflow-hidden rounded-2xl p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Interactive skill network">
          {/* hub -> core links */}
          {groupHubs.map((h) => (
            <line key={`c-${h.group}`} x1={W / 2} y1={H / 2} x2={h.x} y2={h.y} stroke={groupColor[h.group]} strokeOpacity={0.25} strokeWidth={1.2} />
          ))}
          {/* skill -> hub links */}
          {placed.map((p) => {
            const hub = groupHubs.find((h) => h.group === p.node.group)!;
            const on = active === p.node.name || active === p.node.group;
            return (
              <line
                key={`l-${p.node.name}`}
                x1={hub.x}
                y1={hub.y}
                x2={p.x}
                y2={p.y}
                stroke={groupColor[p.node.group]}
                strokeOpacity={on ? 0.9 : 0.18}
                strokeWidth={on ? 1.8 : 1}
                style={{ transition: "all 0.25s" }}
              />
            );
          })}

          {/* core */}
          <g>
            <circle cx={W / 2} cy={H / 2} r={60} fill="#ffffff" stroke="#D4AF37" strokeWidth={2} />
            <circle cx={W / 2} cy={H / 2} r={72} fill="none" stroke="#D4AF37" strokeOpacity={0.3} className="animate-pulse" />
            <text x={W / 2} y={H / 2 - 2} textAnchor="middle" fill="#0f172a" fontSize={18} fontFamily="Orbitron, sans-serif" fontWeight="700">
              PRIYAN
            </text>
            <text x={W / 2} y={H / 2 + 18} textAnchor="middle" fill="#D4AF37" fontSize={14} fontFamily="JetBrains Mono">
              .core
            </text>
          </g>

          {/* hubs */}
          {groupHubs.map((h) => (
            <g
              key={h.group}
              onMouseEnter={() => setActive(h.group)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={h.x} cy={h.y} r={36} fill="#ffffff" stroke={groupColor[h.group]} strokeWidth={2} />
              <text x={h.x} y={h.y + 4} textAnchor="middle" fill={groupColor[h.group]} fontSize={13} fontFamily="JetBrains Mono" fontWeight="700">
                {skillGroups[h.group].slice(0, 4).toUpperCase()}
              </text>
            </g>
          ))}

          {/* skill nodes */}
          {placed.map((p, i) => {
            const on = active === p.node.name || active === p.node.group;
            return (
              <motion.g
                key={p.node.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                onMouseEnter={() => setActive(p.node.name)}
                onMouseLeave={() => setActive(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={on ? 10 : 7}
                  fill={groupColor[p.node.group]}
                  style={{ transition: "all 0.2s", filter: on ? `drop-shadow(0 0 8px ${groupColor[p.node.group]})` : "none" }}
                />
                <text
                  x={p.x}
                  y={p.y - 15}
                  textAnchor="middle"
                  fill={on ? "#f8fafc" : "#94a3b8"}
                  fontSize={on ? 16 : 13}
                  fontFamily="Space Grotesk, sans-serif"
                  style={{ transition: "all 0.2s" }}
                >
                  {p.node.name}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </Section>
  );
}
