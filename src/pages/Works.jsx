import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ACCENT = "#8A0303";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const LINKS = {
  soundcloudProfile: "https://soundcloud.com/suji_lament",
  spotifyArtist: "https://open.spotify.com/artist/4Vsj7kMT96ERwjEwonlGAn?si=vZ8qsW2eTJqHTr21y2dvxw",
  collabTracks: [
    "https://open.spotify.com/track/0xtK0T3aFtdn3rznYLPV3x?si=3e82be16962d4328",
    "https://open.spotify.com/track/62mTbNTMTGwrLv5zRqqCIY?si=d1a3bf1832624e18",
    "https://open.spotify.com/track/2TpoynnKEI2HU0gGZJWLJL?si=e5b0b1d7462e43b5",
  ],
  youtubeFilm: "https://www.youtube.com/watch?v=44kk_Hfv00Y",
  youtubeMixing: "https://www.youtube.com/watch?v=jxWMFXi4LSo&list=PLh22YfAPcJpQFMMY537fpNEl71DxvGSLC",
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
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 3h7v7M21 3l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 14v5a2 2 0 0 1-2 2h-5M3 10V5a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
    </svg>
  );
}

/** ====== SHARED UI ====== **/
function SectionHeader({ title, note }) {
  return (
    <div className="mb-8 border-b border-black/10 dark:border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
      <h3 className="text-xl sm:text-2xl font-serif font-light tracking-[0.2em] text-black dark:text-white uppercase">
        {title}
      </h3>
      {note && (
        <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
          {note}
        </span>
      )}
    </div>
  );
}

function Panel({ children }) {
  return (
    <div className="relative p-1.5 bg-[#e5e5e3] dark:bg-[#030303] transition-colors duration-1000 border border-black/5 dark:border-white/5 shadow-xl">
      <div className="relative overflow-hidden bg-black/5 dark:bg-white/5">
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
        src={"https://w.soundcloud.com/player/?url=" + encodeURIComponent(url) + "&color=%238A0303&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false"}
        loading="lazy"
        className="block filter grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
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
        className="block filter grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
      />
    </Panel>
  );
}

function SpotifyTrack({ url }) {
  const src = useMemo(() => spotifyTrackEmbed(url), [url]);
  if (!src) return null;
  return (
    <Panel>
      <iframe
        title="Spotify Track"
        src={`${src}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block filter grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
        <a href={url} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/80 text-white font-mono text-[9px] tracking-widest flex items-center justify-center">
          <ExternalIcon />
        </a>
      </div>
    </Panel>
  );
}

function YouTubeEmbed({ url, title }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    try {
      const u = new URL(url);
      const list = u.searchParams.get("list");
      const v = u.searchParams.get("v");
      if (list && v) setSrc(`https://www.youtube.com/embed/${v}?list=${list}`);
      else if (list) setSrc(`https://www.youtube.com/embed/videoseries?list=${list}`);
      else if (v) setSrc(`https://www.youtube.com/embed/${v}`);
    } catch {
      setSrc(null);
    }
  }, [url]);

  if (!src) return null;

  return (
    <Panel>
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full block filter grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="absolute top-0 right-0 p-3 flex items-center justify-end pointer-events-none">
         <a href={url} target="_blank" rel="noopener noreferrer" className="pointer-events-auto bg-[#8A0303] text-white p-2 text-[10px] font-mono hover:bg-black transition-colors shadow-lg">
           WATCH <ExternalIcon className="inline ml-1 w-3 h-3" />
         </a>
      </div>
    </Panel>
  );
}

/** ====== MAIN ====== **/
export default function Works() {
  return (
    <main
      className="relative min-h-screen px-4 pt-24 pb-32 sm:px-6 font-libre text-neutral-800 dark:text-neutral-200 bg-[#F5F5F3] dark:bg-[#090909] transition-colors duration-1000"
      style={{ "--accent": ACCENT }}
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        
        {/* ---- Hero ---- */}
        <section className="flex flex-col items-center justify-center text-center pt-6 pb-20">
          <motion.div {...fade()} className="text-center mb-6 relative">
            <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[var(--accent)]/5 dark:from-[var(--accent)]/10 to-transparent blur-2xl opacity-100 pointer-events-none" />
            <h2 className="text-3xl sm:text-5xl font-thin tracking-[0.2em] uppercase text-neutral-900 dark:text-white drop-shadow-sm flex items-center justify-center gap-6">
              <span>DISCOGRAPHY</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[1px] bg-[var(--accent)] mx-auto mt-6 opacity-70"
            />
          </motion.div>
          <motion.p {...fade(0.15)} className="mt-2 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500">
            Audio Archive & Projects
          </motion.p>
        </section>

        {/* ---- Content ---- */}
        <div className="space-y-24">

          {/* 1) SoundCloud */}
          <motion.section {...fade()}>
            <SectionHeader title="SoundCloud" note="STREAM / WAVEFORM" />
            <SoundCloudProfile url={LINKS.soundcloudProfile} />
          </motion.section>

          {/* 2) Spotify Artist */}
          <motion.section {...fade()}>
            <SectionHeader title="Spotify" note="ARTIST · RELEASES" />
            <SpotifyArtist url={LINKS.spotifyArtist} />
          </motion.section>

          {/* 3) Collaborations */}
          <motion.section {...fade()}>
            <SectionHeader title="Collaborations" note="SPOTIFY TRACK EMBEDS" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {LINKS.collabTracks.map((u, i) => (
                <SpotifyTrack key={`collab-${i}`} url={u} />
              ))}
            </div>
          </motion.section>

          {/* 4) Film / Shorts */}
          <motion.section {...fade()}>
            <SectionHeader title="Film / Shorts" note="ORIGINAL SCORE" />
            <YouTubeEmbed url={LINKS.youtubeFilm} title="Short film — music (contrib.)" />
          </motion.section>

          {/* 5) Mixing / Services */}
          <motion.section {...fade()}>
            <SectionHeader title="Mixing & Post" note="YOUTUBE PLAYLIST" />
            <YouTubeEmbed url={LINKS.youtubeMixing} title="Mixing playlist — YouTube" />
          </motion.section>

          {/* 6) Game / OST */}
          <motion.section {...fade()}>
            <SectionHeader title="Game / OST" note="NDA — IN PROGRESS" />
            <div className="p-6 sm:p-10 text-center border border-black/10 dark:border-white/10 relative bg-black/5 dark:bg-white/5">
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--accent)]" />
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--accent)]" />
               <p className="text-[14px] leading-[2.2] font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-widest font-mono">
                  [ Restricting Access ]
               </p>
               <p className="mt-4 text-[14px] leading-[2] font-serif italic text-neutral-500 max-w-xl mx-auto">
                  I am currently scoring and sound-designing for unannounced game studios. 
                  Titles and cues will be documented here once declassified. 
               </p>
               <div className="mt-8">
                  <a href="/contact" className="inline-block text-[11px] font-mono tracking-[0.2em] border-b border-[var(--accent)] text-[var(--accent)] hover:text-black dark:hover:text-white transition-colors pb-1">
                    INQUIRE FOR WORLD BUILDING
                  </a>
               </div>
            </div>
          </motion.section>

        </div>

        {/* ---- Outro ---- */}
        <motion.div {...fade()} className="mt-24 pt-16 border-t border-black/10 dark:border-white/10 text-center">
          <p className="text-[14px] font-serif italic text-neutral-500">
            “The sound fades, but the feeling stays.”
          </p>
        </motion.div>

      </div>
    </main>
  );
}
