import { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";

const ACCENT = "#8A0303";

const minimalFade = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

const LINKS = {
  soundcloudProfile: "https://soundcloud.com/suji_lament",
  spotifyArtist: "https://open.spotify.com/artist/4Vsj7kMT96ERwjEwonlGAn?si=vZ8qsW2eTJqHTr21y2dvxw",
  collabTracks: [
    "https://open.spotify.com/track/0xtK0T3aFtdn3rznYLPV3x?si=3e82be16962d4328",
    "https://open.spotify.com/track/62mTbNTMTGwrLv5zRqqCIY?si=d1a3bf1832624e18",
    "https://open.spotify.com/track/2TpoynnKEI2HU0gGZJWLJL?si=e5b0b1d7462e43b5",
    "https://open.spotify.com/track/5UoAo83Vq04Gs1GVJjxum9?si=64b60ab5acb24f3e",
  ],
  youtubeFilm: "https://www.youtube.com/watch?v=44kk_Hfv00Y",
  youtubeMixing: "https://www.youtube.com/watch?v=aeHOki9x-gY&list=PLh22YfAPcJpR7JURN0c5M6rQfiRoPu143",
  youtubeChannel: "https://www.youtube.com/@suji_lament",
  lilyFantasia: "https://x.com/suji_lament/status/2055228182681592250?s=20",
  rotaeno: "https://www.youtube.com/watch?v=QSvR5kTYc4Q",
  everlightReborn: "https://www.youtube.com/watch?v=YjzCoEd-qTk",
};

const SPOTIFY_TRACKS = [];
const SOUNDCLOUD_TRACKS = [];

const GAME_WORKS = [
  {
    title: "Lily Fantasia",
    role: "Composer / OST work",
    note: "Music contribution for Lily Fantasia.",
    href: LINKS.lilyFantasia,
    label: "Game Music",
  },
  {
    title: "Rotaeno",
    role: "Composer / featured song",
    note: 'My song appears in "Everlight Reborn", an update for Rotaeno.',
    href: LINKS.rotaeno,
    label: "Rhythm Game",
  },
];

/** ====== ICONS ====== **/
function ExternalIcon({ className = "h-3 w-3" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 3h7v7M21 3l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 14v5a2 2 0 0 1-2 2h-5M3 10V5a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
    </svg>
  );
}



/** ====== CUSTOM CURSOR ====== **/
function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div 
        className="bg-white rounded-full"
        animate={{
          width: isHovered ? 32 : 8,
          height: isHovered ? 32 : 8,
          opacity: isHovered ? 0.3 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

/** ====== SHARED UI ====== **/
function SectionHeader({ title, note, number, align = "left" }) {
  const alignmentClass = 
    align === "right" ? "items-end text-right" : 
    align === "center" ? "items-center text-center" : 
    "items-start text-left";
    
  return (
    <div className={`mb-16 relative flex flex-col ${alignmentClass}`}>
      <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-[var(--accent)] mb-4 flex items-center justify-center gap-4 relative z-10">
        {align === "right" ? (
          <>
            <div className="w-12 h-[1px] bg-[var(--accent)] opacity-40" /> CHAPTER {number}
          </>
        ) : align === "center" ? (
          <>
            <div className="w-8 h-[1px] bg-[var(--accent)] opacity-40" /> CHAPTER {number} <div className="w-8 h-[1px] bg-[var(--accent)] opacity-40" />
          </>
        ) : (
          <>
            CHAPTER {number} <div className="w-12 h-[1px] bg-[var(--accent)] opacity-40" />
          </>
        )}
      </span>
      <h3 className="text-4xl sm:text-5xl font-light tracking-[0.05em] text-neutral-900 dark:text-neutral-100 uppercase mb-4 relative z-10">
        {title}
      </h3>
      {note && (
        <span className={`font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-neutral-500 uppercase max-w-sm relative z-10 ${align === 'center' ? 'border-t border-black/10 dark:border-white/10 pt-4' : 'ml-2 border-l border-black/10 dark:border-white/10 pl-4'}`}>
          {note}
        </span>
      )}
    </div>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="relative bg-[#fafaf8] dark:bg-[#060606] z-10 box-border border border-black/5 dark:border-white/5 transition-all duration-700 group-hover:border-black/20 dark:group-hover:border-white/20 overflow-hidden">
        {children}
      </div>
    </div>
  );
}



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

/** ====== EMBEDS ====== **/
function SoundCloudProfile({ url }) {
  return (
    <Panel>
      <div className="bg-white dark:bg-[#060606]">
        <iframe
          title="SoundCloud"
          width="100%"
          height="420"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={
            "https://w.soundcloud.com/player/?url=" +
            encodeURIComponent(url) +
            "&color=%238A0303&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false&buying=false&download=false&sharing=false"
          }
          loading="lazy"
          className="block w-full opacity-95 transition-opacity duration-700 hover:opacity-100"
        />
        <div className="flex items-center justify-between border-t border-black/5 bg-white/50 px-5 py-4 backdrop-blur-md dark:border-white/5 dark:bg-black/40">
          <span className="truncate pr-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            SoundCloud / sketches & promos
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-neutral-800 transition-colors hover:text-[var(--accent)] dark:text-neutral-200 dark:hover:text-[var(--accent)]"
          >
            Open <ExternalIcon />
          </a>
        </div>
      </div>
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
        className="block filter grayscale-[0.5] hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
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
          className="block filter grayscale-[0.5] hover:grayscale-0 transition-all duration-700 z-10 relative opacity-90 hover:opacity-100"
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

/** ====== YOUTUBE EMBEDS ====== **/
function YouTubeEmbed({ url, title }) {
  let src = null;
  try {
    const u = new URL(url);
    const list = u.searchParams.get("list");
    const v = u.searchParams.get("v");
    if (list && v) src = `https://www.youtube.com/embed/${v}?list=${list}`;
    else if (list) src = `https://www.youtube.com/embed/videoseries?list=${list}`;
    else if (v) src = `https://www.youtube.com/embed/${v}`;
  } catch (err) {}

  if (!src) return null;

  return (
    <Panel>
      <div className="relative w-full overflow-hidden group/yt" style={{ paddingTop: "56.25%" }}>
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 animate-pulse z-0" />
        <iframe
          className="absolute inset-0 h-full w-full block filter grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 z-10"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
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
          Watch <ExternalIcon className="h-3 w-3 group-hover/link:-mt-1 group-hover/link:-mr-1 transition-all" />
        </a>
      </div>
    </Panel>
  );
}

function GameCreditCard({ work }) {
  return (
    <Panel>
      <div className="flex h-full flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
              {work.label}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              {work.role}
            </span>
          </div>
          <h4 className="font-book text-2xl sm:text-3xl font-light tracking-[0.05em] text-neutral-900 dark:text-neutral-100">
            {work.title}
          </h4>
          <p className="mt-3 font-book text-sm leading-7 text-neutral-500 dark:text-neutral-400">
            {work.note}
          </p>
        </div>
        <a
          href={work.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[var(--accent)] pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-800 transition-colors hover:text-[var(--accent)] dark:text-neutral-200"
        >
          Open reference <ExternalIcon />
        </a>
      </div>
    </Panel>
  );
}

/** ====== MAIN ====== **/
export default function Works() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main
      className="relative min-h-screen px-4 pt-24 pb-32 sm:px-6 sm:pt-32 font-libre text-neutral-800 dark:text-neutral-200 bg-[#F2F2F0] dark:bg-[#040404] transition-colors duration-1000 overflow-hidden cursor-auto md:cursor-none"
      style={{ "--accent": ACCENT }}
    >
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left z-[9999]"
        style={{ scaleX }}
      />

      {/* Background Ornaments */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden mix-blend-multiply dark:mix-blend-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--accent)] opacity-[0.02] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* ---- Hero ---- */}
        <section className="relative flex flex-col items-center justify-center text-center pt-20 pb-32 sm:pb-48 min-h-[60vh]">
          <motion.div {...minimalFade()} className="mb-12 relative z-10">
            <h1 className="text-5xl sm:text-[7rem] md:text-[9rem] font-thin tracking-widest uppercase text-neutral-900 dark:text-white leading-[0.9]">
              <span className="block sm:-ml-12">A sonic</span>
              <span className="block sm:ml-12 italic font-serif text-[var(--accent)]">archive.</span>
            </h1>
          </motion.div>
          
          <motion.div {...minimalFade(0.2)} className="flex flex-col items-center relative z-10 mt-8">
            <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--accent)] to-transparent opacity-40 mb-8" />
            <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-neutral-500 max-w-md leading-relaxed px-4">
              A curated collection of original scores, mixes, and collaborative works spanning across mediums.
            </p>
          </motion.div>
        </section>

        {/* ---- Content Grid ---- */}
        <div className="flex flex-col w-full space-y-32 sm:space-y-48">
          
          {/* 1) The Vault */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader number="I" title="The Vault" note="SoundCloud · Sketches & Promos" />
            <div className="max-w-4xl">
              <SoundCloudProfile url={LINKS.soundcloudProfile} />
            </div>
          </motion.section>

          {/* 2) Releases */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader number="II" title="Releases" note="Spotify Discography & Features" align="right" />
            <div className="w-full flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-start mt-8">
              <div className="w-full md:w-3/5">
                <SpotifyArtist url={LINKS.spotifyArtist} />
              </div>
              <div className="w-full md:w-2/5 flex flex-col gap-6 relative">
                <h4 className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase flex items-center gap-4">
                  Collaborative Works <div className="w-full h-[1px] bg-black/10 dark:bg-white/10" />
                </h4>
                <div className="flex flex-col gap-4 w-full">
                  {LINKS.collabTracks.map((u, i) => (
                    <SpotifyTrack key={i} url={u} />
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* 3) Motion & Youtube Channel */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader number="III" title="Motion" note="Visual Media & Curation" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
              <div className="flex flex-col gap-8 md:gap-12">
                <YouTubeEmbed url={LINKS.youtubeFilm} title="Original Score: Short Film" />
                <YouTubeEmbed url={LINKS.youtubeMixing} title="Mixing & Mastering Playlist" />
              </div>
              
              <div className="flex flex-col justify-center">
                {/* YOUTUBE CHANNEL LINK */}
                <a href={LINKS.youtubeChannel} target="_blank" rel="noopener noreferrer" className="group relative block p-8 sm:p-12 border border-black/5 dark:border-white/5 bg-[#fafaf8] dark:bg-[#060606] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-500 overflow-hidden">
                   <h4 className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] group-hover:text-white/80 mb-8 flex items-center gap-4 transition-colors">
                     <div className="w-8 h-[1px] bg-current" /> OFFICIAL CHANNEL
                   </h4>
                   <p className="text-3xl sm:text-4xl font-light text-neutral-900 dark:text-white group-hover:text-white transition-colors relative z-10">
                     @suji_lament
                   </p>
                   <div className="mt-12 flex justify-start relative z-10">
                     <span className="font-mono text-xs tracking-widest text-[var(--accent)] group-hover:text-white transition-colors flex items-center gap-2 border-b border-[var(--accent)] group-hover:border-white pb-1">
                       SUBSCRIBE <ExternalIcon className="h-3 w-3" />
                     </span>
                   </div>
                </a>
              </div>
            </div>
          </motion.section>

          {/* 4) Game / OST */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader number="IV" title="Game Music" note="Lily Fantasia · Rotaeno" align="center" />
            
            <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="w-full">
                <YouTubeEmbed url={LINKS.everlightReborn} title='Rotaeno Update: "Everlight Reborn"' />
              </div>
              <div className="w-full flex flex-col gap-6 text-left relative mt-8 md:mt-0">
                {GAME_WORKS.map((work, idx) => (
                  <GameCreditCard key={work.title} work={work} />
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* ---- Outro ---- */}
        <motion.div
          {...minimalFade(0.2)}
          className="mt-32 sm:mt-48 pt-16 sm:pt-24 border-t border-black/5 dark:border-white/5 flex flex-col items-center relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F2F2F0] dark:bg-[#040404] rotate-45 border border-black/10 dark:border-white/10 flex items-center justify-center">
            <div className="w-1 h-1 bg-[var(--accent)] rounded-full opacity-50" />
          </div>
          <p className="text-xl sm:text-2xl font-thin tracking-[0.1em] uppercase text-neutral-800 dark:text-neutral-200 text-center mb-4">
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
