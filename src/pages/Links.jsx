// src/pages/Links.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaSpotify,
  FaInstagram,
  FaSoundcloud,
  FaYoutube,
  FaTwitter,
  FaDiscord,
  FaEnvelope,
} from "react-icons/fa";

/** ====== CONFIG ====== **/
const LINKS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/4Vsj7kMT96ERwjEwonlGAn",
    Icon: FaSpotify,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/faintedsnow_/",
    Icon: FaInstagram,
  },
  {
    label: "SoundCloud",
    href: "https://soundcloud.com/faintedsnow",
    Icon: FaSoundcloud,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@faintedsnow",
    Icon: FaYoutube,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/faintedsnow",
    Icon: FaTwitter,
  },
  {
    label: "Email",
    href: "mailto:purgatorialgarden@gmail.com",
    Icon: FaEnvelope,
  },
  {
    label: "Discord Server",
    href: "https://discord.gg/mXj6dhk54K",
    Icon: FaDiscord,
  },
];

/** ====== MOTION VARIANTS ====== **/
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
};
const item = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Links() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setReveal(true),
      {
        threshold: 0.2,
      },
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText("faintedsnow.");
      setCopied(true);
      setTimeout(() => setCopied(false), 1300);
    } catch {
      /* no-op */
    }
  };

  return (
    <main
      className="site-page relative min-h-screen px-4 pb-24 pt-[calc(var(--header-h)+2rem)] font-libre sm:px-6"
      style={{ ["--accent"]: "var(--site-accent)" }}
    >
      {/* subtle fog (same as other pages) */}
      <div
        className="pointer-events-none absolute inset-0 top-0 h-[40vh] bg-gradient-to-b from-[var(--site-surface)]/70 to-transparent"
        aria-hidden="true"
      />

      <section
        ref={sectionRef}
        className={`relative mx-auto w-full max-w-xl text-center transition-all duration-700 ${
          reveal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {/* Title */}
        <h2 className="mb-2 text-3xl sm:text-4xl font-normal tracking-wide">
          Links
        </h2>
        <div
          className="mx-auto mb-6 h-px w-24"
          style={{ backgroundColor: "var(--accent)", opacity: 0.65 }}
        />

        {/* Subtitle + Discord copy */}
        <p className="text-sm text-[var(--site-muted)]">
          official links · minimal &amp; clean
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={copyDiscord}
            className="site-surface inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur transition-colors hover:bg-[var(--site-surface-strong)]"
            aria-label="Copy Discord handle"
          >
            <FaDiscord className="text-[12px]" aria-hidden />
            {copied ? "copied ✓" : "discord: faintedsnow."}
          </button>
        </div>

        {/* Link list */}
        <motion.nav
          variants={container}
          initial="hidden"
          animate={reveal ? "show" : "hidden"}
          className="mt-8 space-y-3 text-left"
        >
          {LINKS.map(({ href, label, Icon }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              variants={item}
              className="site-surface group flex items-center justify-between gap-3 rounded-xl border px-4 py-4 backdrop-blur transition-colors hover:bg-[var(--site-surface-strong)] sm:px-5"
              aria-label={`${label} (opens in new tab)`}
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-8 place-items-center rounded-full border border-[var(--site-line)]"
                >
                  <Icon className="text-[14px]" />
                </span>
                <span className="text-sm sm:text-base">{label}</span>
              </span>

              <span className="relative text-xs opacity-60">
                <span className="inline-block">↗</span>
                <span
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-1 mx-auto h-px w-0 bg-current transition-all duration-200 group-hover:w-4"
                />
              </span>
            </motion.a>
          ))}
        </motion.nav>

        {/* Tiny outro (optional, matches tone) */}
        <p className="mt-10 text-sm italic text-[var(--site-faint)]">
          “Find me where the echoes live.”
        </p>
      </section>
    </main>
  );
}
