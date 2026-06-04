import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { profile } from "@/lib/resume-data";
import { SoundProvider } from "@/hooks/use-sound";
import { Cursor } from "@/components/experience/Cursor";
import { SceneBackground } from "@/components/experience/SceneBackground";
import { BootLoader } from "@/components/experience/BootLoader";
import { SoundToggle } from "@/components/experience/SoundToggle";
import { ThemeToggle } from "@/components/experience/ThemeToggle";
import { Nav } from "@/components/experience/Nav";
import { Hero } from "@/components/experience/sections/Hero";
import { About } from "@/components/experience/sections/About";
import { Education } from "@/components/experience/sections/Education";
import { Skills } from "@/components/experience/sections/Skills";
import { Internship } from "@/components/experience/sections/Internship";
import { Projects } from "@/components/experience/sections/Projects";
import { Certifications } from "@/components/experience/sections/Certifications";
import { Achievements } from "@/components/experience/sections/Achievements";
import { CodingProfiles } from "@/components/experience/sections/CodingProfiles";
import { GithubActivity } from "@/components/experience/sections/GithubActivity";
import { Contact } from "@/components/experience/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Priyan Udayakumar — AI & Full-Stack Engineer" },
      {
        name: "description",
        content:
          "Interactive digital universe of Priyan Udayakumar — AI, computer vision and full-stack engineer. Explore projects, skills and live GitHub activity in a futuristic 3D experience.",
      },
      { property: "og:title", content: "Priyan Udayakumar — Digital Universe" },
      {
        property: "og:description",
        content: "An award-style interactive 3D portfolio experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: profile.avatar },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (!booted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [booted]);

  return (
    <SoundProvider>
      <BootLoader onDone={() => setBooted(true)} />
      <Cursor />
      <SceneBackground />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_55%)]" aria-hidden />

      <Nav />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <ThemeToggle />
        <SoundToggle />
      </div>

      <main className="relative">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Internship />
        <Projects />
        <Certifications />
        <Achievements />
        <CodingProfiles />
        <GithubActivity />
        <Contact />
      </main>
    </SoundProvider>
  );
}
