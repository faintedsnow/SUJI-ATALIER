import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import FloatingParticles from "../components/FloatingParticles";

/**
 * ParallaxLayerGroup
 * Renders a specific set of parallax layers and controls their group opacity
 */
function ParallaxLayerGroup({ base, count, baseScale, tiltMax, depthPx, active, x, y, DISABLE_MOTION, reverseOrder = false }) {
  const layers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const index = i; 
        // If reverseOrder is true, 0 is the foreground (depth 1.0) and max is the background (depth 0.0)
        let depthNorm = count > 1 ? index / (count - 1) : 0;
        if (reverseOrder) {
            depthNorm = 1 - depthNorm;
        }
        
        // Z-Index: If reversed, 0 has the highest Z-index
        const zIndex = reverseOrder ? count - index : index;

        return { src: `${base}${index}.png`, z: zIndex, depthNorm };
      }),
    [base, count, reverseOrder]
  );

  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    
    // 1. Background Priority with Decode
    const imgBg = new Image();
    imgBg.src = layers[0].src;
    
    // Force decode off-main-thread
    imgBg.decode()
      .then(() => {
        if (alive) setReady(true);
      })
      .catch((e) => {
        console.warn("Decode failed, falling back", e);
        if (alive) setReady(true);
      });

    // 2. Preload others silently
    layers.slice(1).forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      alive = false;
    };
  }, [layers]);

  const strengthFor = (depthNorm) => {
    if (depthNorm === 0) return 0;
    const { min, max } = depthPx;
    return min + Math.pow(depthNorm, 1.2) * (max - min);
  };

  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none"
      initial={false}
      animate={{ 
        scale: active ? 1 : 1.05,
      }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: active ? 10 : 0 }}
    >
      {layers.map((layer) => {
        const s = strengthFor(layer.depthNorm);
        const tx = useTransform(x, (v) => (DISABLE_MOTION ? 0 : v * s));
        const ty = useTransform(y, (v) => (DISABLE_MOTION ? 0 : v * s));
        const rX = useTransform(y, (v) =>
          DISABLE_MOTION ? 0 : v * -(tiltMax.x * layer.depthNorm)
        );
        const rY = useTransform(x, (v) =>
          DISABLE_MOTION ? 0 : v * (tiltMax.y * layer.depthNorm)
        );

        return (
          <motion.img
            key={layer.src}
            src={layer.src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none will-change-transform"
            style={{
              translateX: tx,
              translateY: ty,
              rotateX: rX,
              rotateY: rY,
              zIndex: layer.z,
            }}
            initial={{ opacity: 0, scale: baseScale }}
            animate={{ 
              opacity: (ready && active) ? 1 : 0,
              scale: (ready && active) ? baseScale : baseScale * 1.05,
            }}
            transition={{ 
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
              opacity: { 
                duration: 1.2,
                ease: "easeInOut",
                delay: active ? layer.depthNorm * 0.15 : (1 - layer.depthNorm) * 0.1
              }
            }}
          />
        );
      })}
    </motion.div>
  );
}

/**
 * ParallaxHero v5 (Dual Engine)
 * - Cinematic entrance (zoom out)
 * - Floating particles (Subtle)
 * - Mouse parallax
 * - Renders both light and dark artworks concurrently to allow seamless fading
 */
export default function ParallaxHero({
  children,
  height = "h-[calc(100vh-var(--header-h,64px))]",
  forceMotion = true,
  baseScale = 1.05, // reduced to minimize zoom while preserving edges for parallax
  tiltMax = { x: 3, y: 5 }, // slightly reduced tilt to avoid edges
  depthPx = { min: 10, max: 40 }, // reduced depth to prevent exceeding the container bounds at 1.05 scale
  dark = false, // Added dark mode prop
}) {
  const prefersReduced = useReducedMotion();
  const DISABLE_MOTION = !forceMotion && prefersReduced;

  // Mouse Parallax Logic
  const wrapRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 20 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    
    const onMove = (e) => {
      if (DISABLE_MOTION) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      rawX.set(nx);
      rawY.set(ny);
    };

    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [DISABLE_MOTION, rawX, rawY]);

  return (
    <section
      className={`parallax-hero relative w-screen left-1/2 -translate-x-1/2 ${height} overflow-hidden transition-colors duration-1000 ${dark ? "bg-[#0B0B0C]" : "bg-neutral-50"}`}
    >
      <div
        ref={wrapRef}
        className="relative w-full h-full"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* Dark Mode Parallax */}
        <ParallaxLayerGroup 
          base="/artEclipse/" 
          count={11} 
          active={dark}
          baseScale={baseScale}
          tiltMax={tiltMax}
          depthPx={depthPx}
          x={x}
          y={y}
          DISABLE_MOTION={DISABLE_MOTION}
        />
        
        {/* Light Mode Parallax */}
        <ParallaxLayerGroup 
          base="/artFaintLyune/" 
          count={5} 
          active={!dark}
          baseScale={baseScale}
          tiltMax={tiltMax}
          depthPx={depthPx}
          x={x}
          y={y}
          DISABLE_MOTION={DISABLE_MOTION}
        />

        {/* Atmosphere */}
        <FloatingParticles count={60} className={dark ? "bg-white/60" : "bg-black/60"} />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="relative w-full max-w-[1920px] h-full mx-auto flex flex-col pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
