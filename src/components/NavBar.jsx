import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { LuMoon, LuPause, LuPlay, LuSun } from "react-icons/lu";

const LINKS = [
  { label: "Studio + Archive", to: "/studio" },
  { label: "Lore", to: "/lore" },
  { label: "Tools", to: "/plugin/eclipse" },
  { label: "Signal", to: "/contact" },
  { label: "Links", to: "/link" },
];

function HeaderSigil() {
  return (
    <svg
      className="site-header-sigil-mark h-6 w-9 overflow-visible fill-none stroke-current stroke-[2.1]"
      viewBox="0 0 54 38"
      aria-hidden="true"
    >
      <path
        d="M27 2v14M7 6l13 12M47 6 34 18M3 27l17-5M51 27l-17-5M27 24v12"
        strokeLinecap="square"
      />
    </svg>
  );
}

function normalize(pathname) {
  if (!pathname) return "/";
  return pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;
}

function isActive(pathname, target) {
  if (
    target === "/studio" &&
    ["/paramor", "/works"].includes(normalize(pathname))
  ) {
    return true;
  }
  return normalize(pathname) === normalize(target);
}

export function NavBar({
  dark,
  setDark,
  audioSrc = "/music/glass piano pad.wav",
  targetVolume = 0.12,
}) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeRaf = useRef(null);
  const triedAutoplay = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  const cancelFade = () => {
    if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
    fadeRaf.current = null;
  };

  const fadeTo = (target, duration = 700) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelFade();
    const initialVolume = audio.volume;
    const startedAt = performance.now();

    const tick = (time) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      audio.volume = initialVolume + (target - initialVolume) * progress;
      if (progress < 1) fadeRaf.current = requestAnimationFrame(tick);
    };

    fadeRaf.current = requestAnimationFrame(tick);
  };

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused && !audio.ended) {
      setPlaying(true);
      return;
    }

    try {
      audio.muted = true;
      audio.volume = 0;
      await audio.play();
      audio.muted = false;
      setPlaying(true);
      fadeTo(targetVolume, 700);
    } catch {
      setPlaying(false);
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, 220);
    window.setTimeout(() => {
      audio.pause();
      setPlaying(false);
    }, 230);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else pause();
  };

  useEffect(() => {
    if (!audioSrc) return undefined;
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      audio.playsInline = true;
    }

    const isCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
    const tryAutoplay = () => {
      if (triedAutoplay.current) return;
      triedAutoplay.current = true;
      if (!isCoarsePointer) play();
    };

    tryAutoplay();
    window.addEventListener("pointerdown", tryAutoplay, { once: true });
    window.addEventListener("keydown", tryAutoplay, { once: true });

    return () => {
      window.removeEventListener("pointerdown", tryAutoplay);
      window.removeEventListener("keydown", tryAutoplay);
      cancelFade();
    };
  }, [audioSrc]);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={[
        "site-header fixed inset-x-0 top-0 z-[9999] border-b transition-colors duration-300",
        open ? "!border-transparent" : "",
      ].join(" ")}
    >
      {audioSrc && <audio ref={audioRef} src={audioSrc} />}

      <div className="site-header-inner relative z-[10000] flex h-[var(--header-h)] items-center px-4 sm:px-6">
        <Link
          to="/"
          className="site-header-brand group flex min-w-0 items-baseline text-current no-underline"
          aria-label="Faint at PurgatorialGarden, home"
        >
          <span className="site-header-brand-name text-[14px] font-medium tracking-[-0.045em] sm:text-[16px]">
            Faint
          </span>
          <span className="ml-2 hidden font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--site-muted)] sm:inline">
            / PurgatorialGarden
          </span>
          <span className="relative -top-1 ml-0.5 text-[7px] text-[var(--site-faint)]">
            ©
          </span>
        </Link>

        <Link
          to="/studio"
          className="site-header-sigil absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors hover:text-[var(--site-ink)] focus-visible:text-[var(--site-ink)]"
          aria-label="Open studio"
        >
          <HeaderSigil />
        </Link>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <nav className="site-header-nav flex items-center gap-2 font-mono text-[9px] font-medium uppercase tracking-[0.13em]">
            {LINKS.map((link, index) => (
              <span key={link.to} className="flex items-center gap-2">
                <Link
                  to={link.to}
                  className={[
                    "relative py-2 transition-colors",
                    isActive(location.pathname, link.to)
                      ? "text-[var(--site-ink)]"
                      : "text-[var(--site-muted)] hover:text-[var(--site-ink)]",
                  ].join(" ")}
                >
                  {link.label}
                  {isActive(location.pathname, link.to) && (
                    <motion.span
                      layoutId="global-nav-active"
                      className="absolute inset-x-0 bottom-0 h-px bg-[var(--site-ink)]"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </Link>
                {index < LINKS.length - 1 && (
                  <span className="text-[var(--site-line-strong)]" aria-hidden="true">
                    /
                  </span>
                )}
              </span>
            ))}
          </nav>

          <span className="h-4 w-px bg-[var(--site-line)]" />

          {audioSrc && (
            <button
              type="button"
              onClick={togglePlay}
              className="grid h-7 w-7 place-items-center text-[var(--site-muted)] transition-colors hover:text-[var(--site-ink)]"
              aria-label={playing ? "Pause ambient audio" : "Play ambient audio"}
            >
              {playing ? <LuPause size={13} /> : <LuPlay size={13} />}
            </button>
          )}

          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            className="grid h-7 w-7 place-items-center text-[var(--site-muted)] transition-colors hover:text-[var(--site-ink)]"
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? <LuSun size={14} /> : <LuMoon size={14} />}
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            className="grid h-8 w-8 place-items-center text-[var(--site-muted)]"
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? <LuSun size={15} /> : <LuMoon size={15} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="relative grid h-8 w-8 place-items-center"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className="absolute h-px w-4 bg-current transition-transform duration-200"
              style={{
                transform: open
                  ? "translateY(0) rotate(45deg)"
                  : "translateY(-3px) rotate(0deg)",
              }}
            />
            <span
              className="absolute h-px w-4 bg-current transition-transform duration-200"
              style={{
                transform: open
                  ? "translateY(0) rotate(-45deg)"
                  : "translateY(3px) rotate(0deg)",
              }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="global-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9998] flex h-[100dvh] w-screen flex-col bg-[var(--site-bg)] px-6 pb-7 pt-20 text-[var(--site-ink)] lg:hidden"
          >
            <ul className="my-auto flex flex-col gap-3 font-redaction text-[clamp(2.6rem,10vw,4.4rem)] leading-[0.95] tracking-[-0.045em]">
              {LINKS.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + index * 0.035, duration: 0.35 }}
                >
                  <Link
                    to={link.to}
                    className={
                      isActive(location.pathname, link.to)
                        ? "text-[var(--site-ink)]"
                        : "text-[var(--site-muted)]"
                    }
                  >
                    <span className="mr-3 align-middle font-mono text-[8px] tracking-[0.16em] text-[var(--site-faint)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-[var(--site-line)] pt-4 font-mono text-[9px] uppercase tracking-[0.16em]">
              <span className="text-[var(--site-faint)]">PurgatorialGarden</span>
              {audioSrc && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex items-center gap-2"
                >
                  {playing ? <LuPause size={12} /> : <LuPlay size={12} />}
                  {playing ? "Pause sound" : "Play sound"}
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default NavBar;
