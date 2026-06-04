import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useSound } from "@/hooks/use-sound";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { play } = useSound();

  return (
    <button
      data-magnetic
      onClick={() => {
        toggle();
        play("click");
      }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="glass-strong group flex h-11 w-11 items-center justify-center rounded-full text-primary transition-all hover:glow-cyan"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 transition-transform group-hover:scale-110" />
      ) : (
        <Sun className="h-4 w-4 transition-transform group-hover:scale-110" />
      )}
    </button>
  );
}
