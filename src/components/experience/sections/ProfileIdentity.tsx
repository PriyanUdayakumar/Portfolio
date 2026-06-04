import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { profile } from "@/lib/resume-data";
import React from "react";

export function ProfileIdentity() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Silver orbit particles
  const particles = Array.from({ length: 6 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
      transition={{
        duration: 15 + i * 2,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div 
        className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(192,192,192,0.8)]"
        style={{
          transform: `translateY(-${130 + (i % 3) * 15}px)`
        }}
      />
    </motion.div>
  ));

  return (
    <div
      className="group relative mb-8 mt-12 flex items-center justify-center sm:mt-16"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72"
      >
        {/* Rotating Gold Rings */}
        <motion.div
          className="absolute inset-0 rounded-full border border-primary border-t-transparent border-b-transparent opacity-80 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border border-primary border-l-transparent border-r-transparent opacity-50"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Silver Particles */}
        <div className="absolute inset-0 z-0">
           {particles}
        </div>

        {/* Profile Image */}
        <div 
          className="absolute inset-4 z-10 overflow-hidden rounded-full border-[6px] border-white bg-surface shadow-xl transition-shadow duration-500 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
          style={{ transform: "translateZ(40px)" }}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </motion.div>
    </div>
  );
}
