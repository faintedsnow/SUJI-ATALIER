import { motion, useReducedMotion } from "motion/react";

const ACCENT = "#8A0303";

const fade = (delay = 0, y = 14) => ({
  initial: { opacity: 0, y, filter: "blur(5px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-72px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});
const FEATURES = [
  "Pitch transformation",
  "Stereo morphing",
];

function EclipseSigil() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="mx-auto mb-5 h-12 w-12 text-black/45 transition-colors duration-700 dark:text-white/45 sm:h-14 sm:w-14"
      fill="none"
      aria-hidden="true"
      animate={reduceMotion ? undefined : { opacity: [0.38, 0.58, 0.38] }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <motion.circle
        cx="50"
        cy="50"
        r="35"
        stroke="currentColor"
        strokeWidth="0.7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M50 18 L74 50 L50 82 L26 50 Z"
        stroke="currentColor"
        strokeWidth="0.7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <circle cx="50" cy="50" r="1.8" fill="var(--accent)" opacity="0.65" />
    </motion.svg>
  );
}

export default function Eclipse() {
  const reduceMotion = useReducedMotion();

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#f7f7f4] px-5 pb-10 pt-16 font-libre text-neutral-950 transition-colors duration-700 dark:bg-black dark:text-white sm:px-8 sm:pt-20"
      style={{ "--accent": ACCENT }}
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <section className="mx-auto flex min-h-[54vh] max-w-3xl flex-col items-center justify-center py-8 text-center sm:min-h-[58vh] sm:py-12">
          <motion.div {...fade()}>
            <EclipseSigil />

            <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-black/62 transition-colors duration-700 dark:text-white/62 sm:text-[10px]">
              Spectral effects plugin
            </p>

            <h1 className="mt-4 flex h-[clamp(7.6rem,24vw,13.5rem)] justify-center overflow-visible sm:mt-5">
              <span className="sr-only">Eclipse</span>
              <img
                src="/eclipsePlugin/eclipseLOGO.svg"
                alt=""
                aria-hidden="true"
                className="h-auto w-[min(190vw,78rem)] max-w-none -translate-y-[29%] invert opacity-95 transition duration-700 dark:invert-0"
              />
            </h1>

            <p className="mx-auto mt-8 max-w-lg text-sm font-light leading-7 text-black/76 transition-colors duration-700 dark:text-white/76 sm:text-base sm:leading-8">
              A real-time spectral processor for strange harmonics, ghosted
              motion, and cinematic texture.
            </p>

            <a
              href="https://purgatorialgarden.gumroad.com/l/eclipse"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center justify-center border border-black/45 px-7 font-mono text-[10px] uppercase tracking-[0.2em] text-black/86 transition duration-500 hover:border-black hover:bg-black hover:text-white dark:border-white/45 dark:text-white/86 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
            >
              Get Eclipse
            </a>
          </motion.div>
        </section>

        <motion.section
          {...fade(0.08, 16)}
          className="-mt-3 pb-14 sm:-mt-6 sm:pb-16"
        >
          <motion.img
            src="/eclipsePlugin/eclipseplugin1.webp"
            alt="Eclipse spectral effects plugin interface"
            className="mx-auto block h-auto w-full max-w-4xl grayscale contrast-[1.04] drop-shadow-[0_2rem_4rem_rgba(0,0,0,0.16)] transition-[filter] duration-700 dark:drop-shadow-[0_2rem_4rem_rgba(255,255,255,0.07)]"
            animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.section>

        <motion.section
          {...fade(0.12, 18)}
          className="mx-auto max-w-4xl pb-14 sm:pb-16"
        >
          <div className="overflow-hidden border border-black/[0.08] bg-black/[0.02] shadow-[0_2rem_4rem_rgba(0,0,0,0.16)] transition-colors duration-700 dark:border-white/[0.08] dark:bg-white/[0.02] dark:shadow-[0_2rem_4rem_rgba(0,0,0,0.42)]">
            <iframe
              className="block aspect-video w-full"
              src="https://www.youtube-nocookie.com/embed/MDpkPblxYYQ"
              title="Eclipse promotional video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </motion.section>

        <section className="mx-auto max-w-3xl py-10 text-center sm:py-14">
          <motion.p
            {...fade()}
            className="text-base font-light leading-8 text-black/76 transition-colors duration-700 dark:text-white/76 sm:text-lg sm:leading-9"
          >
            Eclipse reshapes incoming audio in the frequency domain, turning
            simple sounds into blurred harmonics, unstable textures, and
            spectral motion.
          </motion.p>

          <motion.ul
            {...fade(0.08)}
            className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2"
          >
            {FEATURES.map((feature, index) => (
              <motion.li
                key={feature}
                className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-black/56 transition-colors duration-700 dark:text-white/52 sm:text-[10px]"
                animate={
                  reduceMotion
                    ? undefined
                    : { opacity: [0.52, 0.72, 0.52] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 5,
                        delay: index * 0.35,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                <span className="h-px w-8 bg-black/[0.12] transition-colors duration-700 dark:bg-white/[0.12]" />
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        </section>

        <motion.footer
          {...fade()}
          className="flex flex-col items-center justify-between gap-4 border-t border-black/[0.08] pt-7 text-center transition-colors duration-700 dark:border-white/[0.06] sm:flex-row"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/52 transition-colors duration-700 dark:text-white/48">
            VST3 / AU
          </span>
          <span
            className="hidden h-1 w-1 rounded-full bg-[var(--accent)] opacity-60 sm:block"
            aria-hidden="true"
          />
          <a
            href="mailto:purgatorialgarden@gmail.com"
            className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/52 transition hover:text-black/78 dark:text-white/48 dark:hover:text-white/78"
          >
            purgatorialgarden@gmail.com
          </a>
        </motion.footer>
      </div>
    </main>
  );
}
