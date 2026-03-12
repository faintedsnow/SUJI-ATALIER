import { motion } from "motion/react";

const ACCENT = "#8A0303";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const DESIGNED_FOR = [
  "Experimental sound design",
  "Harmonic reshaping",
  "Spectral filtering & distortion",
  "Pitch & timing spectral effects",
  "Atmospheric and evolving textures",
];

const STEPS = [
  {
    num: "I",
    title: "Audio -> FFT",
    desc: "The signal is converted into the frequency domain.",
  },
  {
    num: "II",
    title: "Spectral Processing",
    desc: "eclipse applies creative manipulation to the frequency bins.",
  },
  {
    num: "III",
    title: "IFFT Reconstruction",
    desc: "The sound is reconstructed back into audio using overlap-add processing.",
  },
];

export default function Eclipse() {
  return (
    <main 
      className="relative min-h-screen px-4 pt-20 pb-16 sm:px-6 font-libre text-neutral-800 dark:text-neutral-200 bg-[#F5F5F3] dark:bg-[#090909] transition-colors duration-1000"
      style={{ "--accent": ACCENT }}
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        
        {/* ---- Hero ---- */}
        <section className="flex flex-col items-center justify-center text-center pt-6 pb-12 lg:pt-10 lg:pb-16">
          <motion.div {...fade()} className="text-center mb-6 relative">
            <h2 className="text-3xl sm:text-5xl font-thin tracking-[0.2em] uppercase text-neutral-900 dark:text-white drop-shadow-sm flex items-center justify-center gap-6">
              <span>ECLIPSE</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[1px] bg-black/20 dark:bg-white/20 mx-auto mt-6"
            />
          </motion.div>

          <motion.p
            {...fade(0.15)}
            className="mt-2 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-500"
          >
            Creative Spectral Processor&ensp;/&ensp;VST3 / AU
          </motion.p>

          <motion.p
            {...fade(0.3)}
            className="mt-6 max-w-xl text-[14px] md:text-[15px] leading-[2.2] text-justify text-neutral-600 dark:text-neutral-400 font-light"
          >
            <span className="text-4xl float-left mr-3 mt-[-2px] font-serif text-black dark:text-white">E</span>
            clipse is a real-time spectral processor that transforms audio into the frequency domain using FFT, then reshapes it with creative spectral processing.
          </motion.p>
        </section>

        {/* ---- Plugin Image ---- */}
        <section className="flex justify-center pb-16">
          <motion.div
            {...fade(0.1)}
            className="relative w-full max-w-3xl group cursor-crosshair"
          >
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[var(--accent)]/10 dark:from-[var(--accent)]/15 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <div className="relative p-1.5 bg-[#e5e5e3] dark:bg-[#030303] transition-colors duration-1000 border border-black/5 dark:border-white/5 shadow-xl">
              <img
                src="/eclipsePlugin/eclipse_plugin.png"
                alt="eclipse plugin interface"
                className="relative w-full h-auto grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 mix-blend-normal dark:mix-blend-lighten"
              />
            </div>
          </motion.div>
        </section>

        {/* ---- Two Column Layout: Description & Features ---- */}
        <section className="max-w-4xl mx-auto pb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Description */}
          <div className="space-y-6 text-[14px] leading-[2.2] text-justify font-light text-neutral-600 dark:text-neutral-400">
            <motion.div {...fade()} className="mb-6">
              <h3 className="text-xl font-serif font-light tracking-[0.2em] text-black dark:text-white text-left">
                What is eclipse?
              </h3>
              <div className="w-6 h-[1px] bg-black/20 dark:bg-white/20 mt-4" />
            </motion.div>
            <motion.p {...fade(0.1)}>
               Instead of working on the waveform like traditional effects, eclipse manipulates the frequency content of sound directly, allowing you to sculpt textures, harmonics, and motion in ways that normal plugins cannot.
            </motion.p>
          </div>

          {/* Designed For */}
          <div>
            <motion.div {...fade()} className="mb-6">
              <h3 className="text-xl font-serif font-light tracking-[0.2em] text-black dark:text-white text-left">
                Designed For
              </h3>
              <div className="w-6 h-[1px] bg-black/20 dark:bg-white/20 mt-4" />
            </motion.div>
            
            <ul className="flex flex-col gap-3">
              {DESIGNED_FOR.map((item, i) => (
                <motion.li
                  key={i}
                  {...fade(i * 0.08)}
                  className="flex items-start gap-3 pb-2 border-b border-black/5 dark:border-white/5"
                >
                  <span className="font-mono text-[9px] tracking-widest text-[var(--accent)] pt-1.5">*</span>
                  <span className="text-[14px] font-serif font-light text-neutral-600 dark:text-neutral-400 tracking-wide">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- How It Works ---- */}
        <section className="max-w-2xl mx-auto pb-16">
          <motion.div {...fade()} className="mb-10 text-center">
            <h3 className="text-2xl font-serif font-light tracking-[0.2em] text-black dark:text-white">
              How It Works
            </h3>
            <div className="w-6 h-[1px] bg-black/20 dark:bg-white/20 mx-auto mt-4" />
          </motion.div>

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.1)}
                className="flex flex-col sm:flex-row items-baseline gap-4 sm:gap-8"
              >
                <span className="shrink-0 font-serif text-2xl font-thin italic text-neutral-300 dark:text-neutral-700 w-12 text-right">
                  {step.num}.
                </span>
                <div className="flex-1">
                  <h4 className="text-md font-serif tracking-[0.1em] text-black dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[14px] leading-[2.2] font-light text-neutral-600 dark:text-neutral-400 text-left">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---- Key Idea & Buy ---- */}
        <section className="pb-16 flex flex-col items-center">
          <motion.div
            {...fade()}
            className="max-w-xl mx-auto py-10 px-6 relative mb-12"
          >
            <div className="absolute inset-0 border border-black/10 dark:border-white/10" />

            <div className="relative text-center space-y-6 font-serif">
              <p className="text-neutral-500 text-md font-light italic">
                Traditional effects process waveforms.
              </p>
              <p className="text-lg sm:text-xl tracking-[0.15em] uppercase text-black dark:text-white border-y border-black/5 dark:border-white/5 py-4">
                eclipse processes the <span className="text-[var(--accent)] font-normal">spectrum</span> itself.
              </p>
            </div>
          </motion.div>

          <motion.a
            {...fade()}
            href="https://sujilam.gumroad.com/l/eclipse"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex flex-col items-center gap-3 px-10 py-5 border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
          >
            <div className="font-serif tracking-[0.3em] text-[13px] uppercase">Acquire eclipse</div>
            <div className="w-full flex items-center justify-between font-mono text-[9px] text-neutral-400 group-hover:text-neutral-300">
              <span>VST3</span>
              <span>/</span>
              <span>AU</span>
            </div>
          </motion.a>
        </section>

        {/* ---- Support ---- */}
        <section className="max-w-2xl mx-auto pb-6 text-center">
          <motion.div {...fade()} className="space-y-4 flex flex-col items-center">
            <h4 className="text-[9px] font-mono tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-600">
              AUTHORITY / SUPPORT
            </h4>
            <a
              href="mailto:sujilament@gmail.com"
              className="inline-block text-[13px] font-serif font-light text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              sujilament@gmail.com
            </a>
            <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20 mt-4" />
          </motion.div>
        </section>

      </div>
    </main>
  );
}
