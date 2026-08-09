import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const PARALLAX_IMAGES = Array.from(
  { length: 5 },
  (_, index) => `/artFaintLyune/${index}.png`,
);

const MINIMUM_DISPLAY_MS = 1000;
const COMPLETION_PAUSE_MS = 650;

function preloadImages(srcs, onProgress) {
  let completed = 0;

  return Promise.all(
    srcs.map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image();
          const finish = () => {
            completed += 1;
            onProgress(Math.round((completed / srcs.length) * 100));
            resolve(src);
          };

          image.onload = finish;
          image.onerror = finish;
          image.src = src;
        }),
    ),
  );
}

function CultivationSeal({ ready, reduceMotion }) {
  const nodes = [
    [80, 24],
    [126, 40],
    [126, 120],
    [80, 136],
    [34, 120],
    [34, 40],
  ];

  return (
    <motion.svg
      className="h-44 w-44 overflow-visible sm:h-48 sm:w-48"
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0, rotate: -12 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.circle
        cx="80"
        cy="80"
        r="70"
        className="stroke-[var(--site-faint)]"
        strokeWidth="0.8"
        strokeDasharray="1 7"
        style={{ transformOrigin: "80px 80px" }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      <circle
        cx="80"
        cy="80"
        r="54"
        className="stroke-[var(--site-line-strong)]"
        strokeWidth="0.7"
      />

      <motion.path
        d="M80 24 L126 120 L34 120 Z M80 136 L34 40 L126 40 Z"
        className="stroke-[var(--site-ink)]"
        strokeWidth="0.75"
        strokeLinejoin="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: ready ? 0.85 : 0.55 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      />

      {nodes.map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="1.7"
          className="fill-[var(--site-ink)]"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: ready ? 0.9 : 0.38 }}
          transition={{ delay: reduceMotion ? 0 : 0.3 + index * 0.07 }}
        />
      ))}

      <motion.circle
        cx="80"
        cy="80"
        r="8"
        className="stroke-[var(--site-accent)]"
        strokeWidth="0.9"
        initial={reduceMotion ? false : { scale: 0 }}
        animate={{ scale: ready ? 1.18 : 1, opacity: ready ? 0.9 : 0.65 }}
        style={{ transformOrigin: "80px 80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
      <circle
        cx="80"
        cy="80"
        r="2"
        className="fill-[var(--site-accent)]"
      />
    </motion.svg>
  );
}

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [exit, setExit] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let completionTimer;
    const startedAt = performance.now();

    preloadImages(PARALLAX_IMAGES, (nextProgress) => {
      if (!cancelled) setProgress(nextProgress);
    }).then(() => {
      const remaining = Math.max(
        0,
        MINIMUM_DISPLAY_MS - (performance.now() - startedAt),
      );

      completionTimer = window.setTimeout(() => {
        if (cancelled) return;
        setProgress(100);
        setReady(true);
      }, reduceMotion ? 0 : remaining);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(completionTimer);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!ready) return undefined;

    const exitTimer = window.setTimeout(
      () => setExit(true),
      reduceMotion ? 80 : COMPLETION_PAUSE_MS,
    );
    return () => window.clearTimeout(exitTimer);
  }, [ready, reduceMotion]);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {!exit && (
        <motion.div
          key="loader-root"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[var(--site-bg)] text-[var(--site-ink)]"
          initial={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex w-full max-w-xs flex-col items-center px-8 text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <CultivationSeal ready={ready} reduceMotion={reduceMotion} />

            <div className="mt-9 h-4" role="status" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={ready ? "ready" : "loading"}
                  className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--site-muted)]"
                  initial={reduceMotion ? false : { opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  {ready ? "The seal is broken" : "Condensing qi"}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex w-40 items-center gap-3">
              <div className="h-px flex-1 overflow-hidden bg-[var(--site-line)]">
                <motion.span
                  className="block h-full origin-left bg-[var(--site-accent)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="w-6 text-right font-mono text-[8px] tabular-nums text-[var(--site-faint)]">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
