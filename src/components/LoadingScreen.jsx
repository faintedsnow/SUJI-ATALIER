import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const PHRASES = [
  "gathering spiritual energy...",
  "forming the core...",
  "aligning meridians...",
  "condensing Qi...",
  "opening the gates...",
  "breaching the void...",
];

const FINAL_MESSAGE = "the seal is broken";

const PARALLAX_IMAGES = [
  ...Array.from({ length: 11 }, (_, i) => `/artEclipse/${i}.png`),
  ...Array.from({ length: 5 }, (_, i) => `/artFaintLyune/${i}.png`),
];

function preloadImages(srcs) {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => resolve(src);
          img.src = src;
        }),
    ),
  );
}

function CultivationSigil({ isLoaded }) {
  return (
    <div className="relative w-64 h-64 mb-16 flex items-center justify-center">
      {/* Outer Bagua-style Octagon Ring */}
      <motion.div
        className="absolute inset-0 border-[1px] border-neutral-300 dark:border-neutral-700 opacity-50"
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
        animate={{ rotate: isLoaded ? 360 : 180 }}
        transition={{
          duration: isLoaded ? 4 : 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Reverse Rotating Inner Octagon */}
      <motion.div
        className="absolute inset-3 border-[1px] border-neutral-400 dark:border-neutral-500 opacity-40"
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
        animate={{ rotate: isLoaded ? -360 : -180 }}
        transition={{
          duration: isLoaded ? 3 : 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Pulsing Core Ring */}
      <motion.div
        className="absolute inset-10 border-[1px] border-dashed border-neutral-900 dark:border-neutral-100 rounded-full"
        animate={{
          scale: isLoaded ? [1, 1.2, 1] : [1, 1.05, 1],
          opacity: isLoaded ? [0.8, 1, 0.8] : [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: isLoaded ? 1 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Intricate Magic Circle SVG */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full text-black dark:text-white"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        {/* Six-Pointed Star (Hexagram) */}
        <motion.path
          d="M50 15 L80 75 L20 75 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M50 85 L20 25 L80 25 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Inner Core Symbol */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: isLoaded ? 1.5 : 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          strokeDasharray="2,2"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "center" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Outer Runes/Nodes — placed at exact hexagram vertices */}
        {[
          [50, 15],
          [80, 25],
          [80, 75],
          [50, 85],
          [20, 75],
          [20, 25],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? [1, 0.5, 1] : 0.8 }}
            transition={{ delay: 2 + i * 0.2, duration: 2, repeat: Infinity }}
          />
        ))}
      </motion.svg>

      {/* Burst Effect Overlay when loaded */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            className="absolute inset-0 bg-black dark:bg-white rounded-full mix-blend-overlay"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LoadingScreen({ onFinished }) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [exit, setExit] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(() =>
    Math.floor(Math.random() * PHRASES.length),
  );

  const intervalRef = useRef(null);

  useEffect(() => {
    preloadImages(PARALLAX_IMAGES).then(() => setImagesLoaded(true));
  }, []);

  useEffect(() => {
    if (imagesLoaded) return;
    intervalRef.current = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 1500);
    return () => clearInterval(intervalRef.current);
  }, [imagesLoaded]);

  useEffect(() => {
    if (!imagesLoaded) return;
    clearInterval(intervalRef.current);
    const finalTimer = setTimeout(() => setShowFinal(true), 800);
    const exitTimer = setTimeout(() => setExit(true), 3500);
    return () => {
      clearTimeout(finalTimer);
      clearTimeout(exitTimer);
    };
  }, [imagesLoaded]);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {!exit && (
        <motion.div
          key="loader-root"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black text-black dark:text-white"
          initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col items-center max-w-2xl px-8 w-full">
            <CultivationSigil isLoaded={imagesLoaded} />

            {/* Typography */}
            <div className="h-24 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!showFinal ? (
                  <motion.h1
                    key={PHRASES[phraseIndex]}
                    className="text-xl md:text-2xl font-light tracking-[0.4em] uppercase text-center"
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    {PHRASES[phraseIndex]}
                  </motion.h1>
                ) : (
                  <motion.h1
                    key="final-msg"
                    className="text-2xl md:text-3xl font-thin tracking-[0.6em] uppercase text-center"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {FINAL_MESSAGE}
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
