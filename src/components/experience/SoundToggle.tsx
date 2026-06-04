import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

export function SoundToggle() {
  const { enabled, toggle, play } = useSound();
  return (
    <button
      data-magnetic
      onClick={() => {
        toggle();
        play("click");
      }}
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      className="glass-strong group flex h-11 w-11 items-center justify-center rounded-full text-primary transition-all hover:glow-cyan"
    >
      {enabled ? (
        <Volume2 className="h-4 w-4 transition-transform group-hover:scale-110" />
      ) : (
        <VolumeX className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-110" />
      )}
      {enabled && (
        <span className="absolute inline-flex h-11 w-11 animate-pulse-ring rounded-full border border-primary/40" />
      )}
    </button>
  );
}
