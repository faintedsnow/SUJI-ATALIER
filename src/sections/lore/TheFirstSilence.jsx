import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";

const PANELS = [
  {
    id: 1,
    src: "/story/thefirstsilence/1panel.webp",
    alt: "OC and his friend looking at the light striking the village",
    text: [
      "The wind swept across the lonely peak, cold and mint-pure air threading through the hair of the two youths who stood above the peaceful village.",
      "Snow drifted from the sky, each flake glimmering like a thought unspoken. The mountain breathed slowly beneath them, calm and gentle. Unbeknown that it would soon meet its demise.",
      "A sound unlike any thunder erupted from the sky... a crying ring so vast it seemed as if the heavens themselves were being torn apart.",
      "The firmament split open, bleeding red. A single beam of crimson fell like divine punishment, piercing the valley below.",
    ],
  },
  {
    id: 2,
    src: "/story/thefirstsilence/2panel.webp",
    alt: "OC reaching for his friend's hand",
    text: [
      "The ground erupted, and the air trembled.",
      "The villagers were flung aside, their voices drowned beneath the dreadful roar.",
      "Within the light, the boy saw his friend being swallowed by the beam...",
      "She tried to reach for him...",
      "But ended in dust.",
    ],
  },
  {
    id: 3,
    src: "/story/thefirstsilence/3panel.webp",
    alt: "OC seeing the white figure and dying in the snow",
    text: [
      "No winds. No birds. Just pure silence.",
      "As the boy lay dying on the ground with half of his ribs devoured, he saw a white figure and a soft glowing hand...",
      "Then he fainted.",
      "The loudest silence.",
      "The first of it all.",
    ],
  },
];

export default function TheFirstSilence() {
  const { scrollYProgress } = useScroll();
  const progressBarBackground = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"],
  );

  return (
    <div className="bg-[#050505] min-h-screen font-serif text-neutral-300 relative selection:bg-white/20 selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          scaleX: scrollYProgress,
          backgroundColor: progressBarBackground,
        }}
      />

      {/* Navigation Return */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          to="/lore"
          className="text-xs font-mono tracking-widest uppercase text-neutral-500 hover:text-white transition-colors flex items-center gap-2"
        >
          <span>?</span> Back to Chronicles
        </Link>
      </div>

      {/* Title Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <div className="font-mono text-[10px] tracking-[0.6em] text-neutral-500 uppercase mb-6">
            prologue
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.15em] uppercase mb-8">
            The First Silence
          </h1>
          <div className="w-[1px] h-24 bg-gradient-to-b from-neutral-500 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 pb-40 flex flex-col gap-32 lg:gap-48">
        {/* Panel 1: Image Left, Text Right */}
        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full lg:w-[55%] relative group"
          >
            <div className="absolute -inset-4 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl" />
            <img
              src={PANELS[0].src}
              alt={PANELS[0].alt}
              className="w-full h-auto aspect-[16/9] object-cover border border-white/10 shadow-2xl relative z-10"
            />
          </motion.div>

          <div className="w-full lg:w-[45%] flex flex-col justify-center gap-8 text-lg lg:text-xl leading-relaxed text-justify">
            {PANELS[0].text.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className={
                  paragraph.includes("divine punishment")
                    ? "text-red-50/80 italic font-light"
                    : "text-neutral-400"
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </section>

        {/* Panel 2: Text Left, Image Right */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-[40%] flex flex-col justify-center gap-8 text-lg lg:text-xl leading-relaxed text-justify">
            {PANELS[1].text.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className={
                  paragraph.includes("dust")
                    ? "text-2xl lg:text-3xl text-white my-4 font-light tracking-wide"
                    : "text-neutral-400"
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full lg:w-[60%] relative group"
          >
            <div className="absolute -inset-4 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl" />
            <img
              src={PANELS[1].src}
              alt={PANELS[1].alt}
              className="w-full h-auto aspect-[4/3] object-cover border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-[2s] relative z-10"
            />
          </motion.div>
        </section>

        {/* Panel 3: Center Massive Image + Climax Text below */}
        <section className="flex flex-col items-center gap-16 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full lg:w-[80%] xl:w-[70%] relative"
          >
            <img
              src={PANELS[2].src}
              alt={PANELS[2].alt}
              className="w-full h-auto object-cover border border-white/10 shadow-2xl relative z-10"
            />
          </motion.div>

          <div className="w-full max-w-3xl flex flex-col items-center text-center gap-10 text-xl lg:text-2xl leading-relaxed mt-8">
            {PANELS[2].text.map((paragraph, i) => {
              const isClimax = i >= PANELS[2].text.length - 2;

              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: i * 0.2 }}
                  className={`
                    ${isClimax ? "text-4xl md:text-5xl lg:text-6xl text-white font-thin tracking-widest uppercase mt-8" : "text-neutral-400"}
                  `}
                >
                  {paragraph}
                </motion.p>
              );
            })}
          </div>
        </section>
      </div>

      {/* Outro Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="w-full flex flex-col items-center justify-center pb-20 gap-8"
      >
        <div className="w-2 h-2 rounded-full bg-white/30" />
        <div className="text-[11px] font-mono tracking-[0.3em] text-neutral-600 uppercase">
          Art by{" "}
          <a
            href="https://twitter.com/hehehahaartowo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            @hehehahaartowo
          </a>
        </div>
      </motion.div>
    </div>
  );
}
