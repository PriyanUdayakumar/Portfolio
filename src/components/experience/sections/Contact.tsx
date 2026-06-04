import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Copy, Check } from "lucide-react";
import { profile } from "@/lib/resume-data";
import { Section } from "@/components/experience/Section";
import { useSound } from "@/hooks/use-sound";

type Line = { t: "in" | "out" | "sys"; text: string };

const intro: Line[] = [
  { t: "sys", text: "PRIYAN.U terminal v2.0 — type 'help' to list commands" },
  { t: "out", text: "Welcome, operator. The channel is open." },
];

function respond(cmd: string): Line[] {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "help":
      return [{ t: "out", text: "commands: about · email · phone · github · linkedin · skills · clear" }];
    case "about":
      return [{ t: "out", text: `${profile.name} — ${profile.role}, ${profile.location}` }];
    case "email":
      return [{ t: "out", text: profile.email }];
    case "phone":
      return [{ t: "out", text: profile.phone }];
    case "github":
      window.open(profile.github, "_blank");
      return [{ t: "out", text: `opening ${profile.github}` }];
    case "linkedin":
      window.open(profile.linkedin, "_blank");
      return [{ t: "out", text: `opening LinkedIn…` }];
    case "skills":
      return [{ t: "out", text: "C · C++ · Java · Python · Django · React · YOLOv8 · OpenCV · ML" }];
    case "clear":
      return [];
    case "":
      return [];
    default:
      return [{ t: "out", text: `command not found: ${c}. try 'help'.` }];
  }
}

export function Contact() {
  const [lines, setLines] = useState<Line[]>(intro);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    play("click");
    const res = respond(input);
    if (input.trim().toLowerCase() === "clear") {
      setLines([]);
    } else {
      setLines((l) => [...l, { t: "in", text: input }, ...res]);
    }
    setInput("");
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    play("click");
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Section id="contact" label="Contact Terminal" index="10" title={<>Establish connection</>}>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/80" />
            <span className="h-3 w-3 rounded-full" style={{ background: "var(--gold)" }} />
            <span className="h-3 w-3 rounded-full bg-primary/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">priyan@os: ~/contact</span>
          </div>
          <div ref={bodyRef} className="h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed md:text-sm">
            {lines.map((l, i) => (
              <div key={i} className={l.t === "in" ? "text-foreground" : l.t === "sys" ? "text-secondary" : "text-muted-foreground"}>
                {l.t === "in" && <span className="text-primary">➜ </span>}
                {l.text}
              </div>
            ))}
            <form onSubmit={submit} className="mt-1 flex items-center gap-2">
              <span className="text-primary">➜</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command input"
                className="flex-1 bg-transparent font-mono text-foreground outline-none placeholder:text-muted-foreground/60"
                placeholder="type a command…"
              />
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={copyEmail}
            data-magnetic
            className="glass group flex items-center justify-between rounded-xl p-4 text-left transition-all hover:glow-cyan"
          >
            <span className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="truncate text-sm text-foreground">{profile.email}</span>
            </span>
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
          </button>

          {[
            { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
            { icon: Github, label: "GitHub", href: profile.github },
            { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-magnetic
              onClick={() => play("hover")}
              className="glass group flex items-center gap-3 rounded-xl p-4 transition-all hover:glow-cyan"
            >
              <c.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              <span className="text-sm text-foreground">{c.label}</span>
            </a>
          ))}
        </motion.div>
      </div>

      <p className="mt-16 text-center font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
        DESIGNED & ENGINEERED BY PRIYAN.U · {new Date().getFullYear()}
      </p>
    </Section>
  );
}
