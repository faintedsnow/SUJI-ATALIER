import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import ParallaxHero from "../sections/ParallaxHero";

/**
 * MouseTrail Component
 * Creates a glowing trail following the cursor
 */
/**
 * MouseTrail Component
 * Creates a glowing trail following the cursor
 */
function MouseTrail() {
  const [trail, setTrail] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      // Only visible if inside .parallax-hero
      const isInsideHero = e.target.closest('.parallax-hero');
      setIsVisible(!!isInsideHero);

      if (!isInsideHero) return;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Add particle
      const id = Date.now();
      setTrail((prev) => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY }]);
      
      // Cleanup
      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== id));
      }, 500);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {trail.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute w-4 h-4 rounded-full bg-white/30 blur-md"
          style={{ left: p.x - 8, top: p.y - 8 }}
        />
      ))}
      <motion.div 
        className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{ left: mouseX, top: mouseY }}
      />
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + (0.1 * i), ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Home({ dark }) {
  // ⌘K / Ctrl+K → open link
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-link"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="pt-14 min-h-[calc(100dvh-56px)]">
      <MouseTrail />
      
      <ParallaxHero forceMotion dark={dark}>
        {/* Hero content removed as requested - keeping only the Parallax artwork */}
      </ParallaxHero>
    </main>
  );
}
