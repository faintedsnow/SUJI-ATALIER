import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ACCENT = "#8A0303";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

const LINKS = {
  soundcloudProfile: "https://soundcloud.com/suji_lament",
  spotifyArtist:
    "https://open.spotify.com/artist/4Vsj7kMT96ERwjEwonlGAn?si=vZ8qsW2eTJqHTr21y2dvxw",
  collabTracks: [
    "https://open.spotify.com/track/0xtK0T3aFtdn3rznYLPV3x?si=3e82be16962d4328",
    "https://open.spotify.com/track/62mTbNTMTGwrLv5zRqqCIY?si=d1a3bf1832624e18",
    "https://open.spotify.com/track/2TpoynnKEI2HU0gGZJWLJL?si=e5b0b1d7462e43b5",
    "https://open.spotify.com/track/5UoAo83Vq04Gs1GVJjxum9?si=64b60ab5acb24f3e",
  ],
  youtubeFilm: "https://www.youtube.com/watch?v=44kk_Hfv00Y",
  youtubeMixing:
    "https://www.youtube.com/watch?v=aeHOki9x-gY&list=PLh22YfAPcJpR7JURN0c5M6rQfiRoPu143",
  youtubeChannel: "https://www.youtube.com/@suji_lament",
};

/** ====== UTILS ====== **/
function getSpotifyId(url, kind /* "track" | "artist" */) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/");
    const i = parts.findIndex((p) => p === kind);
    return i !== -1 && parts[i + 1] ? parts[i + 1] : null;
  } catch {
    return null;
  }
}
function spotifyTrackEmbed(url) {
  const id = getSpotifyId(url, "track");
  return id ? `https://open.spotify.com/embed/track/${id}` : null;
}
function spotifyArtistEmbed(url) {
  const id = getSpotifyId(url, "artist");
  return id ? `https://open.spotify.com/embed/artist/${id}` : null;
}

/** ====== ICONS ====== **/
function ExternalIcon({ className = "h-3 w-3" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 3h7v7M21 3l-9 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14v5a2 2 0 0 1-2 2h-5M3 10V5a2 2 0 0 1 2-2h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** ====== SHARED UI ====== **/
function SectionHeader({ title, note, number }) {
  return (
    <div className="mb-12 flex flex-col items-center text-center">
      <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[var(--accent)]/80 mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-[var(--accent)]/40 after:content-[''] after:w-8 after:h-[1px] after:bg-[var(--accent)]/40">
        CHAPTER {number}
      </span>
      <h3 className="text-3xl sm:text-5xl font-light tracking-[0.1em] text-neutral-900 dark:text-neutral-100 uppercase mb-3">
        {title}
      </h3>
      {note && (
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-neutral-500 uppercase max-w-sm">
          {note}
        </span>
      )}
    </div>
  );
}

function Panel({ children }) {
  return (
    <div className="relative group p-[1px] overflow-hidden rounded-xl bg-gradient-to-b from-black/10 to-transparent dark:from-white/10 shadow-2xl transition-all duration-700 hover:shadow-[0_0_40px_-10px_rgba(138,3,3,0.3)] hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl z-0" />
      <div className="relative bg-[#fafaf8] dark:bg-[#060606] rounded-xl overflow-hidden z-10 box-border border-b border-black/5 dark:border-white/5 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}

/** ====== EMBEDS ====== **/
function SoundCloudProfile({ url }) {
  return (
    <Panel>
      <iframe
        title="SoundCloud"
        width="100%"
        height="400"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={
          "https://w.soundcloud.com/player/?url=" +
          encodeURIComponent(url) +
          "&color=%238A0303&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false"
        }
        loading="lazy"
        className="block w-full filter brightness-95 contrast-125 dark:brightness-75 hover:brightness-100 dark:hover:brightness-90 transition-all duration-700 mix-blend-multiply dark:mix-blend-screen opacity-90 hover:opacity-100"
      />
    </Panel>
  );
}

function SpotifyArtist({ url }) {
  const src = useMemo(() => spotifyArtistEmbed(url), [url]);
  if (!src) return null;
  return (
    <Panel>
      <iframe
        title="Spotify Artist"
        src={src}
        width="100%"
        height="380"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block filter grayscale-[0.3] hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
      />
    </Panel>
  );
}

function SpotifyTrack({ url }) {
  const src = useMemo(() => spotifyTrackEmbed(url), [url]);
  if (!src) return null;
  return (
    <Panel>
      <div className="relative">
        <iframe
          title="Spotify Track"
          src={`${src}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="block filter grayscale-[0.3] hover:grayscale-0 transition-all duration-700 z-10 relative opacity-90 hover:opacity-100"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/80 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-[var(--accent)] transition-colors"
          >
            <ExternalIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Panel>
  );
}

function YouTubeEmbed({ url, title }) {
  let src = null;
  try {
    const u = new URL(url);
    const list = u.searchParams.get("list");
    const v = u.searchParams.get("v");
    if (list && v) src = `https://www.youtube.com/embed/${v}?list=${list}`;
    else if (list)
      src = `https://www.youtube.com/embed/videoseries?list=${list}`;
    else if (v) src = `https://www.youtube.com/embed/${v}`;
  } catch (err) {}

  if (!src) return null;

  return (
    <Panel>
      <div
        className="relative w-full overflow-hidden group/yt"
        style={{ paddingTop: "56.25%" }}
      >
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 animate-pulse z-0" />
        <iframe
          className="absolute inset-0 h-full w-full block filter grayscale hover:grayscale-0 transition-all duration-1000 z-10"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 z-20 pointer-events-none rounded-t-xl" />
      </div>
      <div className="flex items-center justify-between px-5 py-4 bg-white/50 dark:bg-black/40 backdrop-blur-md border-t border-black/5 dark:border-white/5 relative z-10">
        <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase truncate pr-4">
          {title}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors whitespace-nowrap group/link"
        >
          Watch{" "}
          <ExternalIcon className="h-3 w-3 group-hover/link:-mt-1 group-hover/link:-mr-1 transition-all" />
        </a>
      </div>
    </Panel>
  );
}

/** ====== MAIN ====== **/
export default function Works() {
  return (
    <main
      className="relative min-h-screen px-4 pt-24 pb-32 sm:px-6 sm:pt-32 font-libre text-neutral-800 dark:text-neutral-200 bg-[#F2F2F0] dark:bg-[#040404] transition-colors duration-1000 overflow-hidden"
      style={{ "--accent": ACCENT }}
    >
      {/* Background Ornaments */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--accent)]/3 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ---- Hero ---- */}
        <section className="flex flex-col items-center justify-center text-center pt-10 pb-24 sm:pb-32">
          <motion.div {...fade()} className="mb-8 relative">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-thin tracking-widest uppercase text-neutral-900 dark:text-white drop-shadow-sm leading-none">
              A sonic
              <br />
              <span className="italic font-serif text-[var(--accent)]">
                archive.
              </span>
            </h1>
          </motion.div>
          <motion.div {...fade(0.2)} className="flex flex-col items-center">
            <div className="w-[1px] h-16 sm:h-24 bg-gradient-to-b from-[var(--accent)] to-transparent opacity-50 mb-6" />
            <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-neutral-500 max-w-md leading-relaxed">
              A curated collection of original scores, mixes, and collaborative
              works spanning across mediums.
            </p>
          </motion.div>
        </section>

        {/* ---- Content Grid ---- */}
        <div className="space-y-32 sm:space-y-48">
          {/* 1) SoundCloud */}
          <motion.section {...fade()}>
            <SectionHeader
              number="I"
              title="The Vault"
              note="SoundCloud · Sketches & Promos"
            />
            <div className="max-w-4xl mx-auto">
              <SoundCloudProfile url={LINKS.soundcloudProfile} />
            </div>
          </motion.section>

          {/* 2) Spotify Artist & Collabs (Grid Layout) */}
          <motion.section {...fade()}>
            <SectionHeader
              number="II"
              title="Releases"
              note="Spotify  Discography & Features"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-12 xl:col-span-7">
                <SpotifyArtist url={LINKS.spotifyArtist} />
              </div>
              <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center">
                <h4 className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase mb-6 flex items-center gap-2">
                  <div className="w-4 h-[1px] bg-[var(--accent)]" />
                  Collaborative Works
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                  {LINKS.collabTracks.map((u, i) => (
                    <SpotifyTrack key={`collab-${i}`} url={u} />
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* 3) Video Embeds (2-Col Grid) */}
          <motion.section {...fade()}>
            <SectionHeader
              number="III"
              title="Motion"
              note="Visual Media & Curation"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              <YouTubeEmbed
                url={LINKS.youtubeFilm}
                title="Original Score: Short Film"
              />
              <YouTubeEmbed
                url={LINKS.youtubeMixing}
                title="Mixing & Mastering Playlist"
              />
            </div>
          </motion.section>

          {/* 4) Game / OST */}
          <motion.section {...fade()}>
            <SectionHeader
              number="IV"
              title="Interactive System"
              note="NDA Status"
            />
            <div className="max-w-3xl mx-auto">
              <div className="group relative p-8 sm:p-16 text-center overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 bg-gradient-to-br from-black/[0.02] to-transparent dark:from-white/[0.02]">
                {/* Glowing corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--accent)]/40 rounded-tl-xl transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-[var(--accent)]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--accent)]/40 rounded-br-xl transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-[var(--accent)]" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full border border-[var(--accent)]/30 mx-auto mb-6 flex items-center justify-center bg-[var(--accent)]/5 shadow-[0_0_15px_rgba(138,3,3,0)] group-hover:shadow-[0_0_20px_rgba(138,3,3,0.2)] transition-shadow duration-700">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)]/60 animate-pulse" />
                  </div>
                  <p className="text-[12px] sm:text-[14px] leading-relaxed font-light text-neutral-800 dark:text-neutral-300 uppercase tracking-[0.3em] font-mono mb-6 group-hover:text-[var(--accent)] transition-colors duration-500">
                    [ Restricted Access ]
                  </p>
                  <p className="text-sm sm:text-base leading-[2] font-serif italic text-neutral-500 max-w-lg mx-auto">
                    Currently scoring and sound-designing for unannounced
                    titles. Audio logs and interactive systems will be decrypted
                    upon public declassification.
                  </p>
                </div>

                {/* Subtle noise/texture overlay */}
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>
            </div>
          </motion.section>
        </div>

        {/* ---- Outro ---- */}
        <motion.div
          {...fade()}
          className="mt-32 sm:mt-48 pt-16 sm:pt-24 border-t border-black/5 dark:border-white/5 flex flex-col items-center relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F2F2F0] dark:bg-[#040404] rotate-45 border border-black/10 dark:border-white/10 flex items-center justify-center">
            <div className="w-1 h-1 bg-[var(--accent)] rounded-full opacity-50" />
          </div>
          <p className="text-xl sm:text-3xl font-thin tracking-[0.1em] uppercase text-neutral-800 dark:text-neutral-200 text-center mb-4">
            The sound fades.
          </p>
          <p className="text-[11px] sm:text-sm font-serif italic tracking-wider text-neutral-500 text-center">
            but the feeling stays.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
