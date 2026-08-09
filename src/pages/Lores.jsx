// src/pages/Lores.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Ultra-minimal background
 */
function StorybookBackground() {
  return (
    <div className="lore-cinema-background" aria-hidden="true">
      <i />
      <span />
    </div>
  );
}

/**
 * Storybook Reading Layout - The First Silence
 */
function StorybookPrologue() {
  const loreLines = [
    "The wind swept across the lonely peak, cold and mint-pure air threading through the hair of the two youths who stood above the peaceful village.",
    "Snow drifted from the sky, each flake glimmering like a thought unspoken. The mountain breathed slowly beneath them, calm and gentle. unbeknown that it would soon meet its demise.",
    "In that mellow moment, the world shuddered.",
    "A sound unlike any thunder erupted from the sky. a crying ring so vast it seemed as if the heavens themselves were being torn apart. The firmament split open, bleeding red. A single beam of crimson fell like divine punishment, piercing the valley below.",
    "The ground erupted, and the air trembled.",
    "The villagers were flung aside, their voices drowned beneath the dreadful roar.",
    "Within the light, the boy saw his friend being swallowed by the light; she tried to reach for him but ended in dust.",
    "Then it ended.",
    "The sky sealed itself.",
    "but the remainder was the loudest silence.",
    "the kind that rings at the soul.",
    "No winds, no birds, just pure silence. as the boy lay dying on the ground with half of his rib devoured. He saw a white figure and a soft glowing hand. Then he fainted.",
    "the loudest silence. the first of it all.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(5px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(5px)" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full flex flex-col justify-center"
    >
      <div className="text-center mb-24">
        <h2 className="mb-4 font-serif text-2xl font-light tracking-[0.2em] text-[var(--site-ink)] transition-colors duration-1000 md:text-3xl">
          The First Silence
        </h2>
        <div className="mx-auto h-px w-12 bg-[var(--site-line-strong)] transition-colors duration-1000"></div>
      </div>

      <div className="space-y-10 text-justify mb-20">
        {loreLines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.05 }}
            className={`font-serif text-[15px] font-light leading-[2.4] text-[var(--site-muted)] transition-colors duration-1000 md:text-[16px] ${index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px] first-letter:text-5xl first-letter:font-normal first-letter:text-[var(--site-ink)]" : ""}`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex justify-center"
      >
        <Link
          to="/lore/the-first-silence"
          className="inline-flex items-center gap-4 border border-[var(--site-line-strong)] px-8 py-4 font-serif text-sm uppercase tracking-[0.2em] transition-all duration-700 hover:border-[var(--site-ink)] hover:bg-[var(--site-ink)] hover:text-[var(--site-bg)]"
        >
          <span>Read Manga Chapter</span>
          <span className="font-mono text-xs">→</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/**
 * Super Subtle Esoteric Sigil Background for Characters
 */
function CenterSigils({ charKey }) {
  const isLyune = charKey === "lyune";
  return (
    <div className="lore-character-orbit" aria-hidden="true">
      <motion.div
        className="lore-character-orbit-ring is-inner"
        animate={{ rotate: isLyune ? 360 : -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="lore-character-orbit-ring is-outer"
        animate={{ rotate: isLyune ? -360 : 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      />
      <span>{isLyune ? "☽" : "◇"}</span>
    </div>
  );
}

/**
 * Storybook Spread - Left Column Text Component
 */
function StorybookCharacterText({ data, onHoverStart, onHoverEnd }) {
  return (
    <article className="lore-character-copy">
      <div
        className="lore-character-watermark"
        style={{ writingMode: "vertical-rl" }}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        aria-hidden="true"
      >
        {data.id === "lyune" ? "白䌷" : "黑肋"}
      </div>

      <header className="lore-character-heading">
        <span>Entity record / {data.record}</span>
        <h1>{data.name}</h1>
        <p>
          <span>{data.alias}</span>
          <i />
          <span>{data.title2}</span>
        </p>
      </header>

      <div className="lore-character-narrative">
        <p>{data.text1}</p>
        <p>{data.text2}</p>
      </div>

      <footer className="lore-character-details">
        <section>
          <span>Motifs</span>
          <ul>
            {data.motifs.map((motif) => (
              <li key={motif}>{motif}</li>
            ))}
          </ul>
        </section>

        <section>
          <span>Authority / {data.auth}</span>
          <p>{data.authDesc}</p>
        </section>
      </footer>
    </article>
  );
}

/**
 * Storybook Spread - Right Column Absolute Image Component
 */
function StorybookCharacterImage({ data, isHovered }) {
  return (
    <motion.figure
      initial={{ opacity: 0, filter: "blur(16px)", scale: 0.985 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(16px)", scale: 1.01 }}
      transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      className="lore-character-visual"
    >
      <CenterSigils charKey={data.id} />

      <div
        className="lore-character-window"
        style={{
          WebkitMaskImage: data.mask,
          maskImage: data.mask,
        }}
      >
        <img
          src={data.image}
          alt={data.name}
          className={`lore-character-art ${isHovered && data.hoverImage ? "is-hidden" : "is-visible"}`}
        />
        {data.hoverImage && (
          <img
            src={data.hoverImage}
            alt={`${data.name} alternate portrait`}
            className={`lore-character-art ${isHovered ? "is-visible" : "is-hidden"}`}
          />
        )}
      </div>

      <figcaption className="lore-character-image-meta">
        <span>Entity / {data.record}</span>
        <span>Character portrait</span>
      </figcaption>
    </motion.figure>
  );
}

/**
 * Fan Art Gallery Component
 */
function CommunityAsciiField({ className = "" }) {
  const particles = [
    { char: ".", x: "8%", delay: "-1s", duration: "8s" },
    { char: "+", x: "24%", delay: "-5s", duration: "11s" },
    { char: ".", x: "43%", delay: "-8s", duration: "10s" },
    { char: "*", x: "62%", delay: "-3s", duration: "12s" },
    { char: ".", x: "79%", delay: "-7s", duration: "9s" },
    { char: "/", x: "93%", delay: "-4s", duration: "13s" },
  ];

  return (
    <div className={`lore-community-ascii-field ${className}`} aria-hidden="true">
      {particles.map((particle, index) => (
        <i
          key={`${particle.char}-${index}`}
          style={{
            "--ascii-x": particle.x,
            "--ascii-delay": particle.delay,
            "--ascii-duration": particle.duration,
          }}
        >
          {particle.char}
        </i>
      ))}
    </div>
  );
}

function LoreParticleField({ variant, className = "" }) {
  const particles = [
    { x: "7%", delay: "-2s", duration: "11s", drift: "1.1rem" },
    { x: "18%", delay: "-7s", duration: "14s", drift: "-0.8rem" },
    { x: "31%", delay: "-4s", duration: "12s", drift: "1.6rem" },
    { x: "46%", delay: "-10s", duration: "16s", drift: "-1.2rem" },
    { x: "59%", delay: "-5s", duration: "13s", drift: "0.7rem" },
    { x: "72%", delay: "-9s", duration: "15s", drift: "-1.7rem" },
    { x: "84%", delay: "-1s", duration: "12s", drift: "1rem" },
    { x: "94%", delay: "-6s", duration: "17s", drift: "-0.6rem" },
  ];
  const characters = {
    frost: [".", "*", "+", "."],
    ash: ["|", "/", ".", "#"],
    silk: ["/", "\\", ".", "~"],
  };

  return (
    <div
      className={`lore-particle-field is-${variant} ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <span
          key={`${variant}-${index}`}
          style={{
            "--particle-x": particle.x,
            "--particle-delay": particle.delay,
            "--particle-duration": particle.duration,
            "--particle-drift": particle.drift,
          }}
        >
          {characters[variant][index % characters[variant].length]}
        </span>
      ))}
    </div>
  );
}

function CommunityMark({ variant, className = "" }) {
  if (variant === "origin") {
    return (
      <svg
        className={`lore-community-mark is-origin ${className}`}
        viewBox="0 0 42 42"
        fill="none"
        aria-hidden="true"
      >
        <path d="M21 38V11" />
        <path d="M21 22C14 22 9 18 8 11C15 11 20 15 21 22Z" />
        <path d="M21 29C28 29 33 25 34 18C27 18 22 22 21 29Z" />
        <circle cx="21" cy="38" r="1.6" />
      </svg>
    );
  }

  return (
    <svg
      className={`lore-community-mark is-spark ${className}`}
      viewBox="0 0 54 38"
      fill="none"
      aria-hidden="true"
    >
      <path d="M27 2v14M7 6l13 12M47 6 34 18M3 27l17-5M51 27l-17-5M27 24v12" />
    </svg>
  );
}

function FanArtGallery() {
  const artworks = [
    {
      src: "/aboutpage/OC1_Front_by_UrsprungNull_0.png",
      artist: "UrsprungNull",
      title: "Lyune, Front",
      ratio: "1 / 1",
    },
    {
      src: "/aboutpage/OC1_sideprofile_by_UrsprungNull_0.PNG",
      artist: "UrsprungNull",
      title: "Lyune, Profile",
      ratio: "1 / 1",
    },
    {
      src: "/aboutpage/OC_by_Jtlr4hj_.jpg",
      artist: "Jtlr4hj_",
      title: "Lyune Illustration",
      ratio: "2 / 3",
      glyph: "{ + }",
    },
    {
      src: "/aboutpage/Oc_Reference_Sheet_by_hehehahaartowo.png",
      artist: "hehehahaartowo",
      title: "Character Reference",
      ratio: "16 / 9",
    },
    {
      src: "/aboutpage/image_sketch_by_lunaminiss.png",
      artist: "lunaminiss",
      title: "Lyune Sketch",
      ratio: "1.27 / 1",
    },
    {
      src: "/aboutpage/by_UrsprungNull_0.png",
      artist: "UrsprungNull",
      title: "Moonlit Portrait",
      ratio: "1 / 1",
      glyph: "F / G",
    },
    {
      src: "/aboutpage/lyune_by_UrsprungNull_0.png",
      artist: "UrsprungNull",
      title: "Lyune Portrait",
      ratio: "1 / 1",
    },
    {
      src: "/aboutpage/Lyune_by_asterio_mono.jpg",
      artist: "Asterio Mono",
      title: "Lantern Night",
      ratio: "4 / 5",
    },
    {
      src: "/aboutpage/faint_by_hehehahaartowo.png",
      artist: "hehehahaartowo",
      title: "Faint Illustration",
      ratio: "601 / 860",
      glyph: "[ * ]",
    },
    {
      src: "/aboutpage/faint_by_NemuNova.jpg",
      artist: "NemuNova",
      title: "Faint Portrait",
      ratio: "9 / 16",
    },
    {
      src: "/aboutpage/faint_olddesign_by_hhehehahaartowo.png",
      artist: "hehehahaartowo",
      title: "Faint, Early Design",
      ratio: "1 / 1",
    },
  ];

  return (
    <section id="community-art" className="lore-community">
      <motion.header
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="lore-community-heading"
      >
        <div className="lore-community-kicker">
          <span>Appendix / 01</span>
          <span>Fourteen collected works</span>
        </div>
        <h2>Community art</h2>
        <div className="lore-community-heading-note">
          <p>
            Artwork and interpretations from artists around the
            PurgatorialGarden world.
          </p>
          <CommunityMark variant="spark" className="is-heading" />
          <CommunityAsciiField className="is-heading" />
        </div>
      </motion.header>

      <motion.figure
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        className="lore-community-feature"
      >
        <CommunityMark variant="origin" className="is-feature" />
        <LoreParticleField variant="silk" className="is-feature" />

        <div className="lore-community-feature-rail" aria-hidden="true">
          <span>Featured portrait / 12</span>
          <span>PurgatorialGarden</span>
        </div>

        <figcaption>
          <span>Community portrait / 12</span>
          <strong>Lyune, seated</strong>
          <small>Art by hehehahaartowo</small>
        </figcaption>

        <motion.img
          initial={{ opacity: 0, x: 22, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 1.3, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          src="/aboutpage/lyune_by_hehehahaartowo.png"
          alt="Lyune seated character artwork by hehehahaartowo"
          loading="lazy"
          decoding="async"
        />
      </motion.figure>

      <div className="lore-community-collection-heading">
        <span>Selected records / 01 to 11</span>
        <div className="lore-community-ascii-track" aria-hidden="true">
          <span>{"F . A . I . N . T / G . A . R . D . E . N + "}</span>
          <span>{"F . A . I . N . T / G . A . R . D . E . N + "}</span>
        </div>
        <span>Illustrations, portraits and reference work</span>
      </div>

      <div className="lore-community-grid" aria-label="Community artwork archive">
        {artworks.map((art, index) => (
          <motion.figure
            key={art.src}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{
              duration: 0.9,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`lore-community-card lore-community-card--${index + 1}`}
          >
            <div className="lore-community-hover-particles" aria-hidden="true">
              {[".", "+", "*", "/"].map((particle) => (
                <span key={`${art.src}-${particle}`}>{particle}</span>
              ))}
            </div>
            <div
              className="lore-community-image"
              style={{ aspectRatio: art.ratio }}
            >
              <img
                src={art.src}
                alt={art.title}
                loading="lazy"
                decoding="async"
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
              {art.glyph && (
                <small className="lore-community-image-glyph" aria-hidden="true">
                  {art.glyph}
                </small>
              )}
            </div>
            <figcaption>
              <strong>{art.title}</strong>
              <span>Art by {art.artist}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <LoreCommunityPortraits />

      <footer className="lore-community-endmark">
        <span>End of appendix / 01</span>
        <span className="lore-community-ascii-pulse" aria-hidden="true">
          [ . + . ]
        </span>
        <span>Community archive</span>
      </footer>
    </section>
  );
}

function LoreCommunityPortraits() {
  const [activePortrait, setActivePortrait] = useState(null);
  const portraits = [
    {
      record: "13",
      src: "/aboutpage/lyune_by_lunaminiss.png",
      artist: "lunaminiss",
      className: "is-lunaminiss",
      width: 5800,
      height: 2900,
    },
    {
      record: "14",
      src: "/aboutpage/lyune_by_suni_vt.png",
      artist: "suni_vt",
      className: "is-suni",
      width: 3840,
      height: 2160,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="lore-community-portraits"
      aria-labelledby="lore-community-portraits-title"
    >
      <header>
        <span>Paired portraits / 13 + 14</span>
        <h3 id="lore-community-portraits-title">Two visions of Lyune</h3>
        <p>Two interpretations sharing one archive plate.</p>
      </header>

      <div
        className={`lore-community-dual-stage ${activePortrait ? `is-${activePortrait}` : ""}`}
      >
        {portraits.map((portrait, index) => (
          <motion.img
            key={portrait.src}
            initial={{ opacity: 0, x: index === 0 ? -24 : 24, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              duration: 1.3,
              delay: index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`lore-community-dual-image ${portrait.className}`}
            src={portrait.src}
            alt={`Lyune character artwork by ${portrait.artist}`}
            loading="lazy"
            decoding="async"
            width={portrait.width}
            height={portrait.height}
          />
        ))}

        <div className="lore-community-dual-axis" aria-hidden="true">
          <span>13</span>
          <i />
          <span>14</span>
        </div>

        <div className="lore-community-dual-controls">
          {portraits.map((portrait, index) => (
            <button
              key={portrait.record}
              type="button"
              className={index === 0 ? "is-left" : "is-right"}
              onMouseEnter={() => setActivePortrait(portrait.className.slice(3))}
              onMouseLeave={() => setActivePortrait(null)}
              onFocus={() => setActivePortrait(portrait.className.slice(3))}
              onBlur={() => setActivePortrait(null)}
              onClick={() =>
                setActivePortrait((current) =>
                  current === portrait.className.slice(3)
                    ? null
                    : portrait.className.slice(3),
                )
              }
              aria-pressed={activePortrait === portrait.className.slice(3)}
              aria-label={`Focus artwork by ${portrait.artist}`}
            >
              <span>Community record / {portrait.record}</span>
              <span>Art by {portrait.artist}</span>
            </button>
          ))}
        </div>

        <div className="lore-community-dual-hint" aria-hidden="true">
          <span>[ focus ]</span>
          <span>hover or tap</span>
        </div>
      </div>
    </motion.section>
  );
}

export default function Lores() {
  const [activeTab, setActiveTab] = useState("lyune");
  const [isWatermarkHovered, setIsWatermarkHovered] = useState(false);

  const database = {
    lyune: {
      type: "entity",
      id: "lyune",
      record: "01",
      chapter: "",
      label: "Lyune",
      name: "Lyune",
      alias: "The White Silk",
      title2: "Wandering Witch",
      image: "/OC/OClyune.png",
      hoverImage: "/OC/OClyune1.png",
      mask: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      motifs: ["Moon", "Silk", "Frost", "Skulls"],
      auth: "The Silent Crown",
      text1:
        "A witch bound by divine curse to awaken in every dying world. Each rebirth erases parts of her memories, leaving only fragments of a forgotten song.",
      text2:
        "When she found Faint among the ruins of the First Silence, she broke her vow and saved him using the Rib of the Giant. Now she seeks to end the cycle, even if doing so means erasing herself completely.",
      authDesc:
        "Through the Skull of the Giant, she commands pale skulls to guide lost spirits. Yet every use bleeds her memory: names first, then faces, until only the silence remains.",
    },
    faint: {
      type: "entity",
      id: "faint",
      record: "02",
      chapter: "",
      label: "Faint",
      name: "Faint",
      alias: "The Black Rib",
      title2: "Mourning Beast",
      image: "/OC/OCfaint.png",
      mask: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
      motifs: ["Bone", "Ash", "Lily", "Dust"],
      auth: "The Hollow Frame",
      text1:
        "A nameless wanderer left dying during the First Silence, when a divine catastrophe shattered the sky. Lyune saved him by embedding the Rib of the Giant inside his chest.",
      text2:
        "It fused with his heartbeat, granting him power over resonant bone. Refusing to worship fate, he carves his own path through the ash, seeking to prove that life touched by ruin can still create meaning.",
      authDesc:
        "Summoning skeletal constructs of living bone. Yet, the power slowly devours his life force, calcifying his flesh into the fossil of an ancient guardian.",
    },
    prologue: {
      type: "event",
      id: "prologue",
      record: "00",
      chapter: "PROLOGUE",
      label: "The First Silence",
    },
  };

  const currentRecord = database[activeTab];
  const isEntity = currentRecord.type === "entity";

  return (
    <main className="lore-classic-page site-page">
      <StorybookBackground />

      <section className="lore-cinema-stage">
        <nav className="lore-cinema-nav" aria-label="Lore records">
          <div className="lore-cinema-nav-meta">
            <span>Character records</span>
            <span>Volume / 01</span>
          </div>

          <div className="lore-cinema-nav-items">
            {Object.keys(database).map((key) => {
              const item = database[key];
              const isActive = activeTab === key;
              const content = (
                <>
                  <span>{item.record}</span>
                  <strong>{item.label}</strong>
                  <i className={isActive ? "is-active" : ""} />
                </>
              );

              if (key === "prologue") {
                return (
                  <Link
                    to="/lore/the-first-silence"
                    key={key}
                    className="lore-cinema-tab"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className="lore-cinema-tab"
                  aria-pressed={isActive}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="lore-cinema-spread">
          <div className="lore-cinema-copy-panel">
            <AnimatePresence
              mode="wait"
              onExitComplete={() => setIsWatermarkHovered(false)}
            >
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12, filter: "blur(7px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(7px)" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                {isEntity ? (
                  <StorybookCharacterText
                    data={currentRecord}
                    onHoverStart={() => setIsWatermarkHovered(true)}
                    onHoverEnd={() => setIsWatermarkHovered(false)}
                  />
                ) : (
                  <StorybookPrologue />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {isEntity && (
            <div className="lore-cinema-visual-panel">
              <LoreParticleField
                key={`${activeTab}-particles`}
                variant={activeTab === "lyune" ? "frost" : "ash"}
                className="is-character"
              />
              <AnimatePresence mode="wait">
                <StorybookCharacterImage
                  key={activeTab}
                  data={currentRecord}
                  isHovered={isWatermarkHovered}
                />
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <FanArtGallery />
    </main>
  );
}
