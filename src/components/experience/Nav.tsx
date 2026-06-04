import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { navItems, profile } from "@/lib/resume-data";
import { useSound } from "@/hooks/use-sound";

export function Nav() {
  const [active, setActive] = useState("hero");
  const { play } = useSound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    play("click");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setHasScrolled(latest > 50);
  });

  return (
    <>
      <motion.header 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${hasScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : ""}`}
      >
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 md:px-12 lg:px-20 py-5">
          <button
            data-magnetic
            onClick={() => go("hero")}
            className="font-display text-sm font-bold tracking-[0.15em] text-foreground transition-all hover:opacity-80"
          >
            Priyan <span className="text-primary">U</span>
          </button>
          {/* Desktop Top Navigation Bar */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`font-mono text-[11px] tracking-widest transition-all duration-300 ${
                  active === n.id 
                    ? "text-primary font-bold shadow-primary drop-shadow-md scale-105" 
                    : "text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
              >
                {n.label.toUpperCase()}
              </button>
            ))}
          </nav>

          <span className="hidden font-mono text-[10px] tracking-[0.3em] text-muted-foreground sm:block lg:hidden">
            {profile.role.toUpperCase()}
          </span>
        </div>
      </motion.header>
      {/* Mobile Bottom Navigation */}
      <motion.nav 
        variants={{ visible: { y: 0, x: "-50%" }, hidden: { y: 150, x: "-50%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        aria-label="Mobile navigation" 
        className="fixed bottom-6 left-1/2 z-50 flex items-center gap-6 overflow-x-auto rounded-full bg-surface/80 px-6 py-4 shadow-xl backdrop-blur-md lg:hidden max-w-[90vw]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => go(n.id)}
            className={`whitespace-nowrap font-mono text-[10px] tracking-widest transition-all ${
              active === n.id 
                ? "text-primary font-bold shadow-primary drop-shadow-md scale-105" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {n.label.toUpperCase()}
          </button>
        ))}
      </motion.nav>
    </>
  );
}
