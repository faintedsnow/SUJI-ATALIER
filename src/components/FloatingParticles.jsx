import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Floating Particles Component
 * Renders drifting "dust motes" for atmosphere
 * @param {number} count - Number of particles
 * @param {string} color - Tailwind color class or hex (default: bg-white/40)
 */
export default function FloatingParticles({ count = 20, className = "bg-white/40" }) {
  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      blur: Math.random() * 2,
      opacityMax: Math.random() * 0.4 + 0.3,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full transition-colors duration-1000 ${className}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: `blur(${p.blur}px)`,
            boxShadow: p.size > 3 ? "0 0 10px rgba(255,255,255,0.4)" : "none",
          }}
          animate={{
            y: [0, -120 * (p.size / 2), 0],
            x: [0, 40 * (Math.random() - 0.5), 0],
            opacity: [0, p.opacityMax, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
