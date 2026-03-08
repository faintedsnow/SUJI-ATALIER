// src/pages/About.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** ====== CONFIG ====== **/
const ACCENT = "#6C7AA8"; // brand color

// Featured image
const FEATURED = {
  src: "/aboutpage/image_sketch_by_lunaminiss.png",
  cap: "OC sketch: stray lines, wind in the hair, and a half-smile that knows.",
};



/** ====== COMPONENTS ====== **/

function BlurImage({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ 
          opacity: loaded ? 1 : 0, 
          filter: loaded ? "blur(0px)" : "blur(10px)" 
        }}
        transition={{ duration: 0.7 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function FogBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <motion.div
        initial={{ x: "-10%" }}
        animate={{ x: "10%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 20,
          ease: "easeInOut",
        }}
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-30 dark:opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0), rgba(108, 122, 168, 0.1) 40%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.6 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 5,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-100/20 to-neutral-100/80 dark:via-neutral-900/20 dark:to-neutral-900/80"
      />
    </div>
  );
}

const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVar = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  /** Lightbox Logic **/
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <main
      className="relative min-h-screen px-4 pt-24 pb-32 sm:px-6 font-libre text-neutral-800 dark:text-neutral-200 overflow-hidden"
      style={{ "--accent": ACCENT }}
    >
      <FogBackground />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl font-thin tracking-[0.2em] uppercase text-neutral-900 dark:text-white drop-shadow-sm">
            About
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-[1px] bg-current mx-auto mt-4 opacity-50"
          />
        </motion.div>

        {/* Intro Section */}
        <motion.section
          variants={containerVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
        >
          <motion.div variants={itemVar} className="order-2 md:order-1">
             <div className="space-y-6 text-lg leading-loose text-justify font-light">
               <p>
                <span className="text-4xl float-left mr-2 mt-[-6px] font-serif text-[var(--accent)]">I</span>
                ’m <strong>Suji</strong>, a producer and sound designer. I make music that lives somewhere between orchestral textures and fractured electronics.
               </p>
               <p>
                Most of my work begins with atmosphere — slow harmonies, distant melodies, and sound design that feels half-memory, half-dream.
               </p>
               <p>
                I’m interested in quiet tension, fading spaces, and sounds that feel like they belong to another place.
               </p>
             </div>
          </motion.div>

          <motion.div variants={itemVar} className="order-1 md:order-2 flex justify-center">
             <div 
                className="relative group cursor-pointer"
                onClick={() => openLightbox()}
             >
                <div className="absolute -inset-2 bg-[var(--accent)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <BlurImage
                  src={FEATURED.src}
                  alt="OC Sketch"
                  className="w-64 h-64 sm:w-80 sm:h-80 object-contain invert-0 dark:invert drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
             </div>
          </motion.div>
        </motion.section>



        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center text-neutral-400 text-sm italic"
        >
          “Maybe the silence between notes is where the truth hides.”
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={FEATURED.src}
              className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-0 right-0 text-center text-white/50 text-sm">
              {FEATURED.cap}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
