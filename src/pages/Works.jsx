import { useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const ACCENT = "var(--site-ink)";

const minimalFade = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

const LINKS = {
  soundcloudProfile: "https://soundcloud.com/faintedsnow",
  spotifyArtist: "https://open.spotify.com/artist/4Vsj7kMT96ERwjEwonlGAn?si=vZ8qsW2eTJqHTr21y2dvxw",
  collabTracks: [
    "https://open.spotify.com/track/0xtK0T3aFtdn3rznYLPV3x?si=3e82be16962d4328",
    "https://open.spotify.com/track/62mTbNTMTGwrLv5zRqqCIY?si=d1a3bf1832624e18",
    "https://open.spotify.com/track/2TpoynnKEI2HU0gGZJWLJL?si=e5b0b1d7462e43b5",
    "https://open.spotify.com/track/5UoAo83Vq04Gs1GVJjxum9?si=64b60ab5acb24f3e",
  ],
  youtubeFilm: "https://www.youtube.com/watch?v=44kk_Hfv00Y",
  youtubeMixing: "https://www.youtube.com/watch?v=aeHOki9x-gY&list=PLh22YfAPcJpR7JURN0c5M6rQfiRoPu143",
  youtubeChannel: "https://www.youtube.com/@faintedsnow",
  lilyFantasia: "https://x.com/faintedsnow/status/2055228182681592250?s=20",
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

const TYPEFACE_STUDIES = [
  {
    src: "/typefacedesign/typeface%201.jpeg",
    title: "Type Explorations",
    alt: "A collection of five experimental angular wordmarks",
  },
  {
    src: "/typefacedesign/typeface%202.jpeg",
    title: "Erose / Seraph / Yokai / Gin",
    alt: "Four experimental typeface and wordmark studies",
  },
  {
    src: "/typefacedesign/typeface%203.png",
    title: "Suji / Kou / Dart",
    alt: "Three geometric custom typeface studies",
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

/** ====== SHARED UI ====== **/
function SectionHeader({ title, note, number, align = "left" }) {
  const alignmentClass = 
    align === "right" ? "items-end text-right" : 
    align === "center" ? "items-center text-center" : 
    "items-start text-left";
    
  return (
    <div className={`archive-section-header relative mb-10 flex flex-col ${alignmentClass}`}>
      <span className="relative z-10 mb-3 flex items-center justify-center gap-3 font-mono text-[9px] tracking-[0.32em] text-[var(--site-faint)] sm:text-[10px]">
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
      <h3 className="relative z-10 mb-4 text-4xl font-light uppercase tracking-[0.05em] text-[var(--site-ink)] sm:text-5xl">
        {title}
      </h3>
      {note && (
        <span className={`relative z-10 max-w-sm font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--site-muted)] sm:text-[10px] ${align === 'center' ? 'border-t border-[var(--site-line)] pt-4' : 'ml-2 border-l border-[var(--site-line)] pl-4'}`}>
          {note}
        </span>
      )}
    </div>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={`group relative h-full ${className}`}>
      <div className="archive-panel-surface relative z-10 box-border h-full overflow-hidden border border-[var(--site-line)] bg-[var(--site-surface)] transition-colors duration-300 group-hover:border-[var(--site-line-strong)]">
        {children}
      </div>
    </div>
  );
}

function FirmamentEventTrace({ y }) {
  const grow = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 1.25, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <motion.svg
      className="archive-event-trace"
      viewBox="0 0 520 620"
      fill="none"
      aria-hidden="true"
      style={{ y }}
    >
      <defs>
        <path
          id="archive-crying-ring"
          d="M58 111 C120 37 398 37 462 111 C401 169 122 169 58 111 Z"
        />
      </defs>

      <motion.path
        className="archive-event-ring"
        d="M58 111 C120 37 398 37 462 111 C401 169 122 169 58 111 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="3 8"
        {...grow(0.05)}
      />
      <motion.text
        className="archive-event-ring-copy"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55, duration: 1.2 }}
      >
        <textPath href="#archive-crying-ring" startOffset="6%">
          A CRYING RING / THE HEAVENS TORN APART / EVENT 001 /
        </textPath>
      </motion.text>

      <motion.path
        className="archive-firmament-split"
        d="M249 18 L270 54 L255 81 L286 108 L267 137 L285 169"
        strokeWidth="1.5"
        {...grow(0.38)}
      />
      <motion.path
        className="archive-firmament-split archive-firmament-split--minor"
        d="M255 81 L220 99 L195 91 M286 108 L319 91 L349 98 M270 54 L300 35"
        strokeWidth="0.9"
        {...grow(0.52)}
      />

      <motion.path
        className="archive-event-beam-fill"
        d="M267 137 L296 137 L350 510 L215 510 Z"
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "283px 137px" }}
      />
      <motion.path
        className="archive-event-beam-core"
        d="M281 137 L282 510"
        strokeWidth="0.8"
        {...grow(0.78)}
      />

      <motion.path
        className="archive-event-mountain"
        d="M18 499 L76 454 L122 431 L168 376 L209 348 L242 364 L273 407 L318 433 L363 468 L417 448 L502 505"
        stroke="currentColor"
        strokeWidth="1"
        {...grow(0.18)}
      />
      <motion.path
        className="archive-event-snowline"
        d="M18 499 C86 487 144 504 211 494 C282 482 358 510 502 505"
        stroke="currentColor"
        strokeWidth="0.7"
        {...grow(0.28)}
      />

      <motion.g
        className="archive-event-village"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <path d="M92 458 L105 446 L118 458 V477 H92 Z M96 458 H114" />
        <path d="M128 449 L142 435 L157 449 V477 H128 Z M132 449 H153" />
        <path d="M373 480 L386 467 L400 480 V498 H373 Z M377 480 H396" />
        <path d="M411 470 L426 454 L443 470 V498 H411 Z M415 470 H439" />
        <path d="M79 478 H169 M359 499 H453" />
      </motion.g>

      <motion.g
        className="archive-event-youth archive-event-youth--left"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.52, duration: 0.9 }}
      >
        <circle cx="194" cy="317" r="6" />
        <path d="M194 323 L192 343 L183 361 M192 343 L203 359 M192 330 L208 335 L221 330" />
      </motion.g>
      <motion.g
        className="archive-event-youth archive-event-youth--friend"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.62, duration: 0.9 }}
      >
        <circle cx="253" cy="321" r="6" />
        <path d="M253 327 L255 346 L248 363 M255 346 L264 361 M255 333 L243 337 L229 331" />
      </motion.g>
      <motion.path
        className="archive-reach-gap"
        d="M221 330 L229 331"
        strokeWidth="1.2"
        strokeDasharray="1 3"
        {...grow(0.92)}
      />

      {[
        [247, 354, 2.1, -8],
        [259, 369, 1.4, 9],
        [238, 384, 1.7, -12],
        [268, 400, 1.2, 7],
        [251, 418, 1.5, -5],
      ].map(([cx, cy, radius, drift], index) => (
        <motion.circle
          key={`dust-${index}`}
          className="archive-event-dust"
          cx={cx}
          cy={cy}
          r={radius}
          animate={{ cx: [cx, cx + drift], cy: [cy, cy + 36], opacity: [0.75, 0] }}
          transition={{ duration: 2.8 + index * 0.25, delay: 1 + index * 0.18, repeat: Infinity }}
        />
      ))}

      <motion.g
        className="archive-event-fallen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.08, duration: 1.2 }}
      >
        <circle cx="230" cy="500" r="5" />
        <path d="M235 502 L260 510 L282 505 M249 507 L238 519 M260 510 L274 522" />
      </motion.g>
      <motion.g
        className="archive-event-white-figure"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.35, duration: 1.5 }}
      >
        <circle cx="326" cy="467" r="7" />
        <path d="M326 474 C314 487 312 510 309 536 H346 C342 510 340 486 326 474 Z" />
        <path d="M315 490 L292 505" />
        <circle className="archive-event-hand" cx="290" cy="506" r="4" />
      </motion.g>

      {[
        [42, 36, 1.5, 18, 5.2],
        [96, 173, 1.2, -15, 6.1],
        [158, 67, 1.8, 12, 5.7],
        [354, 159, 1.3, -17, 6.4],
        [413, 48, 1.7, 14, 5.5],
        [479, 213, 1.2, -12, 6.8],
        [65, 292, 1.1, 15, 6.2],
        [426, 336, 1.4, -10, 5.9],
      ].map(([cx, cy, radius, drift, duration], index) => (
        <motion.circle
          key={`snow-${index}`}
          cx={cx}
          cy={cy}
          r={radius}
          className="archive-event-snow"
          animate={{
            cx: [cx, cx + drift, cx],
            cy: [cy, cy + 64],
            opacity: [0, 0.64, 0],
          }}
          transition={{
            duration,
            delay: index * 0.32,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <text className="archive-event-caption" x="18" y="586">NO WIND / NO BIRDS / PURE SILENCE</text>
      <text className="archive-event-caption archive-event-caption--end" x="502" y="586">THE FIRST OF IT ALL</text>
    </motion.svg>
  );
}

function ArchiveEventIndex() {
  const phases = [
    { code: "00", title: "Before", copy: "Mint air. Falling snow. Two figures above a sleeping village." },
    { code: "01", title: "Rupture", copy: "A crying ring. The firmament opens. One hand cannot reach the other." },
    { code: "02", title: "After", copy: "No wind. No birds. A white figure moves through the loudest silence." },
  ];

  return (
    <motion.div {...minimalFade(0.15)} className="archive-event-index" aria-label="The first rupture">
      {phases.map((phase, index) => (
        <div className={`archive-event-phase ${index === 1 ? "is-rupture" : ""}`} key={phase.code}>
          <span>{phase.code}</span>
          <div>
            <strong>{phase.title}</strong>
            <p>{phase.copy}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function StudioArchiveHero() {
  return (
    <section className="archive-studio-hero archive-studio-hero--original">
      <motion.div {...minimalFade()} className="archive-studio-copy">
        <p className="archive-studio-kicker">
          <span>Studio + Archive</span>
          <i />
          <span>Selected sound works</span>
        </p>
        <h1>
          <span>A sonic</span>
          <span>archive<i>.</i></span>
        </h1>
        <p className="archive-studio-description">
          A curated collection of original scores, mixes and collaborative
          works spanning across mediums.
        </p>
      </motion.div>
    </section>
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
function MediaHeader({ type, code, compact = false }) {
  return (
    <div className={`archive-media-header ${compact ? "is-compact" : ""}`}>
      <span>{type}</span>
      <span>{code}</span>
    </div>
  );
}

function SoundCloudProfile({ url }) {
  return (
    <Panel>
      <div className="archive-media-card">
        <MediaHeader type="SoundCloud" code="SC / 01" />
        <div className="archive-media-window archive-media-window--sound">
          <iframe
            title="SoundCloud"
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={
              "https://w.soundcloud.com/player/?url=" +
              encodeURIComponent(url) +
              "&color=%235F6663&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false&buying=false&download=false&sharing=false"
            }
            loading="lazy"
            className="archive-media-embed block w-full"
          />
        </div>
        <div className="archive-media-footer">
          <span className="truncate pr-4">
            SoundCloud / sketches & promos
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
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
      <div className="archive-media-card">
        <MediaHeader type="Spotify" code="Artist" />
        <div className="archive-media-window archive-media-window--spotify">
          <iframe
            title="Spotify Artist"
            src={`${src}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="archive-media-embed archive-spotify-embed block w-full"
          />
        </div>
        <div className="archive-media-footer">
          <span>Spotify / artist catalog</span>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open <ExternalIcon />
          </a>
        </div>
      </div>
    </Panel>
  );
}

function SpotifyTrack({ url, index }) {
  const src = useMemo(() => spotifyTrackEmbed(url), [url]);
  if (!src) return null;
  return (
    <Panel>
      <div className="archive-media-card">
        <MediaHeader
          type="Spotify"
          code={`Track ${String(index + 1).padStart(2, "0")}`}
          compact
        />
        <div className="archive-media-window archive-media-window--spotify relative">
          <iframe
            title={`Spotify collaboration ${index + 1}`}
            src={`${src}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="archive-media-embed archive-spotify-embed block w-full"
          />
        </div>
      </div>
    </Panel>
  );
}

/** ====== YOUTUBE EMBEDS ====== **/
function YouTubeEmbed({ url, title, code = "YT / 001" }) {
  let src = null;
  try {
    const u = new URL(url);
    const list = u.searchParams.get("list");
    const v = u.searchParams.get("v");
    if (list && v) src = `https://www.youtube.com/embed/${v}?list=${list}`;
    else if (list) src = `https://www.youtube.com/embed/videoseries?list=${list}`;
    else if (v) src = `https://www.youtube.com/embed/${v}`;
  } catch {}
  if (src) src += `${src.includes("?") ? "&" : "?"}rel=0&modestbranding=1`;

  if (!src) return null;

  return (
    <Panel>
      <MediaHeader type="YouTube" code={code.replace(" / ", " ")} />
      <div className="archive-media-window relative w-full overflow-hidden group/yt" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="archive-media-embed absolute inset-0 z-10 block h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="archive-media-footer">
        <span className="truncate pr-4">
          {title}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link"
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

function EclipseProject() {
  return (
    <Panel>
      <article className="archive-tool-project">
        <div className="archive-tool-copy">
          <div>
            <p className="archive-tool-kicker">Spectral effects plugin / VST3 + AU</p>
            <div className="archive-tool-logo">
              <img src="/eclipsePlugin/eclipseLOGO.svg" alt="Eclipse" />
            </div>
            <p className="archive-tool-description">
              A real-time spectral processor for shaping strange harmonics,
              ghosted movement, and cinematic texture.
            </p>
          </div>

          <Link to="/plugin/eclipse" className="archive-tool-link">
            View Eclipse <ExternalIcon />
          </Link>
        </div>

        <div className="archive-tool-visual">
          <img
            src="/eclipsePlugin/eclipseplugin.png"
            alt="Eclipse spectral effects plugin interface"
            loading="lazy"
          />
        </div>
      </article>
    </Panel>
  );
}

function TypefaceDesignGallery() {
  return (
    <div className="archive-typeface-grid">
      {TYPEFACE_STUDIES.map((study, index) => (
        <figure className="archive-typeface-card" key={study.src}>
          <div className="archive-typeface-image">
            <img src={study.src} alt={study.alt} loading="lazy" />
          </div>
          <figcaption>
            <span>{`// ${study.title}`}</span>
            <span>{`[ ${String(index + 1).padStart(2, "0")} / 03 ]`}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** ====== MAIN ====== **/
export default function Works({ embedded = false }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const Root = embedded ? "section" : "main";

  return (
    <Root
      id={embedded ? "archive" : undefined}
      className={`relative min-h-screen overflow-hidden bg-[var(--site-bg)] px-4 pb-32 text-[var(--site-ink)] transition-colors duration-1000 sm:px-6 ${
        embedded ? "archive-page--studio font-sans" : "font-libre"
      } ${
        embedded ? "pt-12 sm:pt-20" : "pt-[calc(var(--header-h)+3rem)] sm:pt-[calc(var(--header-h)+5rem)]"
      }`}
      style={{ "--accent": ACCENT }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[9999] h-px origin-left bg-[var(--site-ink)] opacity-30"
        style={{ scaleX }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* ---- Hero ---- */}
        {embedded ? (
          <StudioArchiveHero />
        ) : (
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
        )}

        {/* ---- Content Grid ---- */}
        <div className={`flex w-full flex-col ${embedded ? "space-y-20 sm:space-y-28" : "space-y-28 sm:space-y-36"}`}>
          
          {/* 1) The Vault */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader number="I" title="The Vault" note="SoundCloud / Sketches & Promos" />
            <div className="w-full">
              <SoundCloudProfile url={LINKS.soundcloudProfile} />
            </div>
          </motion.section>

          {/* 2) Releases */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader number="II" title="Releases" note="Spotify Discography & Features" />
            <div className="flex w-full flex-col gap-6 sm:gap-8">
              <div className="w-full">
                <SpotifyArtist url={LINKS.spotifyArtist} />
              </div>
              <div className="flex w-full flex-col gap-4">
                <h4 className="archive-media-subhead">
                  Collaborative works <span />
                </h4>
                <div className="archive-track-grid grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  {LINKS.collabTracks.map((u, i) => (
                    <SpotifyTrack key={i} url={u} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* 3) Motion & Youtube Channel */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader number="III" title="Motion" note="Visual Media & Curation" />
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <YouTubeEmbed url={LINKS.youtubeFilm} title="Original Score: Short Film" code="YT / 001" />
              <YouTubeEmbed url={LINKS.youtubeMixing} title="Mixing & Mastering Playlist" code="YT / 002" />
              <a href={LINKS.youtubeChannel} target="_blank" rel="noopener noreferrer" className="archive-channel-card archive-channel-strip group md:col-span-2">
                <span>Official YouTube channel</span>
                <strong>@faintedsnow</strong>
                <span className="archive-channel-action">
                  Open channel <ExternalIcon className="h-3 w-3" />
                </span>
              </a>
            </div>
          </motion.section>

          {/* 4) Game / OST */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader number="IV" title="Game Music" note="Lily Fantasia / Rotaeno" />
            
            <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2">
              <div className="w-full">
                <YouTubeEmbed url={LINKS.everlightReborn} title='Rotaeno Update: "Everlight Reborn"' code="YT / 003" />
              </div>
              <div className="relative flex w-full flex-col gap-6 text-left">
                {GAME_WORKS.map((work) => (
                  <GameCreditCard key={work.title} work={work} />
                ))}
              </div>
            </div>
          </motion.section>

          {/* 5) Audio tools */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader
              number="V"
              title="Audio Tools"
              note="Design / Development / Spectral Processing"
            />
            <EclipseProject />
          </motion.section>

          {/* 6) Typeface design */}
          <motion.section {...minimalFade(0.1)} className="relative z-10 w-full">
            <SectionHeader
              number="VI"
              title="Design"
              note="Typeface Design :: Letterform Studies"
            />
            <TypefaceDesignGallery />
          </motion.section>
        </div>

        {/* ---- Outro ---- */}
        <motion.div
          {...minimalFade(0.2)}
          className="mt-32 sm:mt-48 pt-16 sm:pt-24 border-t border-black/5 dark:border-white/5 flex flex-col items-center relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--site-bg)] rotate-45 border border-[var(--site-line)] flex items-center justify-center">
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
    </Root>
  );
}
