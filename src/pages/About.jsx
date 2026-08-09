// src/pages/About.jsx
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "motion/react";

const SKETCH_SRC = "/aboutpage/image_sketch_by_lunaminiss.png";
const SPECTRUM_BARS = [0.62, 0.95, 0.48, 0.78, 0.38, 0.88, 0.56, 0.72, 0.44];
const CONSTELLATION_NODES = [
  ["11%", "18%", "0s"],
  ["21%", "78%", "1.4s"],
  ["39%", "13%", "2.1s"],
  ["52%", "49%", "0.7s"],
  ["67%", "23%", "2.9s"],
  ["82%", "68%", "1.8s"],
  ["92%", "36%", "3.3s"],
];
const SCROLL_STAGES = ["INDEX", "TRACE", "SIGNAL", "BLOOM"];

/* Inline redaction: censor bar fitting the hidden word exactly, wiping
   left→right on hover. Stays inline so the line box never jumps. */
function RedactionText({ children, label, bold = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`about-redaction ${bold ? "about-redaction-bold" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={label}
    >
      <span className="invisible select-none" style={{ gridArea: "1/1" }}>{children}</span>
      <span className="pointer-events-none" style={{ gridArea: "1/1", width: 0, minWidth: 0, whiteSpace: "nowrap", overflow: "visible" }}>
        <Scramble text={children} active={isHovered} />
      </span>
    </span>
  );
}

/* Artifact wordmark: inlined so it can be recoloured (red) and animated. */
const ARTIFACT_GLYPH =
  "M1653.54,472.441C1653.54,472.441 2359.49,464.75 1440.94,1181.1C522.397,1897.45 519.685,1889.76 519.685,1889.76C519.685,1889.76 1777.92,1234.55 1771.65,1228.35C1765.38,1222.15 1204.72,944.882 1204.72,944.882C1204.72,944.882 1749.6,1239.52 2173.23,944.882C2596.86,650.247 2503.94,708.661 2503.94,708.661C2503.94,708.661 1431.1,1338.08 2125.98,708.661L2125.98,472.441L1653.54,472.441Z";

function ArtifactLogo({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="260 764 1713 947"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Artifact"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
    >
      <g transform="matrix(0.564455,0,0,0.564455,16.8995,584.843)">
        <g transform="matrix(0.569348,0,0,0.569348,294.67,813.829)">
          <path d={ARTIFACT_GLYPH} />
        </g>
        <g transform="matrix(-0.741381,0,0,-0.741381,3219.93,1824.84)">
          <path d={ARTIFACT_GLYPH} />
        </g>
      </g>
      <g transform="matrix(11.2715,9.36941e-19,0,10.4789,-17522.6,-11454.7)">
        <g>
          <path
            d="M1655.2,1215.41L1657.26,1215.41L1657.26,1217.65C1657.43,1217.21 1657.85,1216.68 1658.51,1216.06C1659.17,1215.43 1659.93,1215.12 1660.79,1215.12C1660.83,1215.12 1660.9,1215.13 1661,1215.13C1661.09,1215.14 1661.26,1215.16 1661.49,1215.18L1661.49,1217.48C1661.36,1217.45 1661.24,1217.44 1661.13,1217.43C1661.03,1217.42 1660.91,1217.42 1660.78,1217.42C1659.68,1217.42 1658.84,1217.77 1658.25,1218.47C1657.66,1219.18 1657.37,1219.99 1657.37,1220.91L1657.37,1228.35L1655.2,1228.35L1655.2,1215.41Z"
            style={{ fillRule: "nonzero" }}
          />
          <path
            d="M1663.81,1211.8L1666.01,1211.8L1666.01,1215.41L1668.07,1215.41L1668.07,1217.19L1666.01,1217.19L1666.01,1225.63C1666.01,1226.08 1666.16,1226.38 1666.47,1226.54C1666.63,1226.62 1666.92,1226.67 1667.31,1226.67C1667.41,1226.67 1667.53,1226.67 1667.65,1226.66C1667.77,1226.66 1667.91,1226.65 1668.07,1226.63L1668.07,1228.35L1667.31,1228.37L1666.47,1228.37C1665.45,1228.37 1664.71,1228.29 1664.35,1227.77C1663.99,1227.25 1663.81,1226.58 1663.81,1225.75L1663.81,1217.19L1662.06,1217.19L1662.06,1215.41L1663.81,1215.41L1663.81,1211.8Z"
            style={{ fillRule: "nonzero" }}
          />
          <path
            d="M1670.25,1215.47L1672.45,1215.47L1672.45,1228.35L1670.25,1228.35L1670.25,1215.47ZM1670.25,1210.61L1672.45,1210.61L1672.45,1213.07L1670.25,1213.07L1670.25,1210.61Z"
            style={{ fillRule: "nonzero" }}
          />
          <rect
            x="1675.17"
            y="1220.34"
            width="6.063"
            height="2.234"
            style={{ fillRule: "nonzero" }}
          />
          <path
            d="M1684.52,1213.44C1684.55,1212.54 1684.71,1211.88 1684.99,1211.46C1685.5,1210.72 1686.48,1210.35 1687.93,1210.35C1688.06,1210.35 1688.2,1210.36 1688.35,1210.36C1688.49,1210.37 1688.66,1210.38 1688.84,1210.4L1688.84,1212.38C1688.62,1212.37 1688.45,1212.36 1688.35,1212.35C1688.25,1212.35 1688.16,1212.35 1688.07,1212.35C1687.41,1212.35 1687.02,1212.52 1686.89,1212.86C1686.76,1213.2 1686.69,1214.07 1686.69,1215.47L1688.84,1215.47L1688.84,1217.19L1686.67,1217.19L1686.67,1228.35L1684.52,1228.35L1684.52,1217.19L1682.72,1217.19L1682.72,1215.47L1684.52,1215.47L1684.52,1213.44Z"
            style={{ fillRule: "nonzero" }}
          />
          <path
            d="M1692.52,1224.9C1692.52,1225.53 1692.74,1226.03 1693.2,1226.39C1693.66,1226.75 1694.21,1226.93 1694.83,1226.93C1695.6,1226.93 1696.34,1226.76 1697.06,1226.4C1698.26,1225.81 1698.87,1224.85 1698.87,1223.52L1698.87,1221.77C1698.6,1221.93 1698.26,1222.08 1697.84,1222.19C1697.42,1222.3 1697.01,1222.38 1696.61,1222.43L1695.29,1222.6C1694.5,1222.7 1693.91,1222.87 1693.52,1223.09C1692.85,1223.47 1692.52,1224.08 1692.52,1224.9ZM1697.78,1220.51C1698.28,1220.44 1698.61,1220.24 1698.78,1219.88C1698.88,1219.69 1698.93,1219.41 1698.93,1219.05C1698.93,1218.31 1698.66,1217.77 1698.14,1217.43C1697.61,1217.1 1696.85,1216.93 1695.87,1216.93C1694.74,1216.93 1693.93,1217.24 1693.46,1217.85C1693.19,1218.19 1693.02,1218.69 1692.94,1219.36L1690.91,1219.36C1690.95,1217.77 1691.47,1216.66 1692.46,1216.03C1693.45,1215.41 1694.61,1215.1 1695.92,1215.1C1697.44,1215.1 1698.68,1215.39 1699.63,1215.97C1700.57,1216.55 1701.04,1217.45 1701.04,1218.67L1701.04,1226.12C1701.04,1226.35 1701.09,1226.53 1701.18,1226.67C1701.27,1226.81 1701.47,1226.87 1701.77,1226.87C1701.86,1226.87 1701.97,1226.87 1702.09,1226.86C1702.21,1226.84 1702.34,1226.83 1702.48,1226.8L1702.48,1228.41C1702.14,1228.5 1701.88,1228.56 1701.7,1228.59C1701.53,1228.61 1701.29,1228.62 1700.98,1228.62C1700.23,1228.62 1699.69,1228.36 1699.35,1227.83C1699.17,1227.55 1699.05,1227.15 1698.98,1226.63C1698.53,1227.21 1697.9,1227.71 1697.07,1228.14C1696.24,1228.57 1695.33,1228.78 1694.33,1228.78C1693.13,1228.78 1692.15,1228.42 1691.39,1227.69C1690.62,1226.96 1690.24,1226.05 1690.24,1224.95C1690.24,1223.75 1690.62,1222.82 1691.37,1222.16C1692.12,1221.5 1693.1,1221.1 1694.31,1220.94L1697.78,1220.51ZM1695.98,1215.1"
            style={{ fillRule: "nonzero" }}
          />
          <path
            d="M1709.59,1215.04C1711.05,1215.04 1712.23,1215.39 1713.15,1216.1C1714.06,1216.81 1714.61,1218.03 1714.8,1219.76L1712.68,1219.76C1712.55,1218.96 1712.26,1218.3 1711.8,1217.77C1711.34,1217.25 1710.61,1216.98 1709.59,1216.98C1708.21,1216.98 1707.22,1217.66 1706.62,1219.01C1706.23,1219.89 1706.04,1220.97 1706.04,1222.26C1706.04,1223.56 1706.32,1224.65 1706.86,1225.53C1707.41,1226.42 1708.27,1226.86 1709.45,1226.86C1710.35,1226.86 1711.06,1226.59 1711.59,1226.03C1712.12,1225.48 1712.48,1224.73 1712.68,1223.77L1714.8,1223.77C1714.56,1225.48 1713.95,1226.74 1712.99,1227.53C1712.02,1228.32 1710.78,1228.72 1709.28,1228.72C1707.59,1228.72 1706.24,1228.1 1705.23,1226.87C1704.23,1225.63 1703.72,1224.09 1703.72,1222.24C1703.72,1219.96 1704.27,1218.2 1705.38,1216.93C1706.48,1215.67 1707.88,1215.04 1709.59,1215.04ZM1709.25,1215.1"
            style={{ fillRule: "nonzero" }}
          />
          <path
            d="M1717.4,1211.8L1719.6,1211.8L1719.6,1215.41L1721.67,1215.41L1721.67,1217.19L1719.6,1217.19L1719.6,1225.63C1719.6,1226.08 1719.76,1226.38 1720.06,1226.54C1720.23,1226.62 1720.51,1226.67 1720.91,1226.67C1721.01,1226.67 1721.12,1226.67 1721.25,1226.66C1721.37,1226.66 1721.51,1226.65 1721.67,1226.63L1721.67,1228.35L1720.9,1228.37L1719.96,1228.37C1718.94,1228.37 1718.31,1228.29 1717.95,1227.77C1717.59,1227.25 1717.4,1226.58 1717.4,1225.75L1717.4,1217.19L1715.65,1217.19L1715.65,1215.41L1717.4,1215.41L1717.4,1211.8Z"
            style={{ fillRule: "nonzero" }}
          />
        </g>
      </g>
    </svg>
  );
}

/* Scramble pool limited to single-width characters to prevent page stuttering during decode. */
const SCRAMBLE_POOL = (
  "ABCDEFGHKLMNRSTUVWXZ0123456789#%&@/\\|<>*+"
).split("");

function randGlyph() {
  return SCRAMBLE_POOL[(Math.random() * SCRAMBLE_POOL.length) | 0];
}

function scrambleString(text) {
  return text
    .split("")
    .map((c) => (/\s/.test(c) ? c : randGlyph()))
    .join("");
}

/* While `active` is false the text stays scrambled; once active it decodes
   left→right, cycling random glyphs on the unresolved tail. */
function useScramble(text, active, { delay = 0, duration = 1100 } = {}) {
  const [value, setValue] = useState(() => scrambleString(text));

  useEffect(() => {
    if (!active) {
      setValue(scrambleString(text));
      return undefined;
    }
    let raf;
    const startAt = performance.now() + delay * 1000;
    const step = (now) => {
      if (now < startAt) {
        setValue(scrambleString(text));
        raf = requestAnimationFrame(step);
        return;
      }
      const p = Math.min(1, (now - startAt) / duration);
      const revealed = p * text.length;
      setValue(
        text
          .split("")
          .map((c, i) => (/\s/.test(c) || i < revealed ? c : randGlyph()))
          .join(""),
      );
      if (p < 1) raf = requestAnimationFrame(step);
      else setValue(text);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, active, delay, duration]);

  return value;
}

function Scramble({ text, active, delay = 0, duration = 1100, className = "" }) {
  const value = useScramble(text, active, { delay, duration });
  return (
    <span className={`about-scramble ${className}`} aria-label={text}>
      {value}
    </span>
  );
}

/* Vertical / rotated label. Revealed by a scroll-driven `inView` flag. */
function VLabel({ children, className = "", delay = 0, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-15%" });
  return (
    <motion.span
      ref={ref}
      className={`about-vlabel ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {typeof children === "function" ? children(inView) : children}
    </motion.span>
  );
}

/* Poetic fragment that drifts in from a chosen direction when revealed. */
function Frag({
  children,
  className = "",
  delay = 0,
  from = { y: 10 },
  style,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-15%" });
  return (
    <motion.p
      ref={ref}
      className={`about-frag ${className}`}
      style={style}
      initial={{ opacity: 0, ...from }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...from }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {typeof children === "function" ? children(inView) : children}
    </motion.p>
  );
}

function ScrollProgressRail({ progress }) {
  return (
    <div className="about-scroll-rail" aria-hidden="true">
      <motion.span className="about-scroll-rail-fill" style={{ scaleY: progress }} />
      {SCROLL_STAGES.map((stage, index) => (
        <span
          key={stage}
          className="about-scroll-stage"
          style={{ "--stage-top": `${(index / (SCROLL_STAGES.length - 1)) * 100}%` }}
        >
          <i />
          <b>{stage}</b>
        </span>
      ))}
    </div>
  );
}

function SpectrumBars({ active }) {
  return (
    <div className="about-spectrum" aria-hidden="true">
      {SPECTRUM_BARS.map((height, index) => (
        <motion.span
          key={index}
          style={{ "--bar-height": height }}
          initial={{ opacity: 0, scaleY: 0.25 }}
          animate={
            active
              ? { opacity: 1, scaleY: [0.35, height, 0.52, height * 0.82] }
              : { opacity: 0, scaleY: 0.25 }
          }
          transition={{
            delay: 0.4 + index * 0.035,
            duration: 1.8 + index * 0.12,
            repeat: active ? Infinity : 0,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AmbientConstellation({ active }) {
  return (
    <motion.div
      className="about-constellation"
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-hidden="true"
    >
      <span className="about-constellation-line ax-a" />
      <span className="about-constellation-line ax-b" />
      <span className="about-constellation-line ax-c" />
      {CONSTELLATION_NODES.map(([left, top, delay], index) => (
        <span
          key={index}
          className="about-constellation-node"
          style={{ left, top, animationDelay: delay }}
        />
      ))}
    </motion.div>
  );
}

function FlowerMandala() {
  return (
    <div className="absolute inset-[-25%] pointer-events-none flex items-center justify-center opacity-30">
      <svg viewBox="0 0 100 100" className="w-full h-full about-mandala-esoteric">
        <g stroke="var(--about-ink)" fill="none" strokeLinejoin="round" strokeMiterlimit="10">
          
          {/* Layer 1: Outer Metatron Base (Spins slowly CW) */}
          <g className="mandala-layer-cw">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" strokeWidth="0.3" />
            <polygon points="50,10 85,70 15,70" strokeWidth="0.4" />
            <polygon points="50,90 85,30 15,30" strokeWidth="0.4" />
            <path d="M 15 30 L 85 70 M 15 70 L 85 30 M 50 10 L 50 90" strokeWidth="0.2" />
            
            {/* Abstract glyph markers at vertices */}
            <circle cx="50" cy="10" r="1.5" fill="var(--about-ink)" stroke="none" />
            <circle cx="85" cy="30" r="1.5" fill="var(--about-ink)" stroke="none" />
            <circle cx="85" cy="70" r="1.5" fill="var(--about-ink)" stroke="none" />
            <circle cx="50" cy="90" r="1.5" fill="var(--about-ink)" stroke="none" />
            <circle cx="15" cy="70" r="1.5" fill="var(--about-ink)" stroke="none" />
            <circle cx="15" cy="30" r="1.5" fill="var(--about-ink)" stroke="none" />
          </g>

          {/* Layer 2: Inner Hexagon & Tracks (Spins slowly CCW) */}
          <g className="mandala-layer-ccw">
            <polygon points="50,25 72,38 72,62 50,75 28,62 28,38" strokeWidth="0.2" strokeDasharray="1 3" />
            <circle cx="50" cy="50" r="42" strokeWidth="0.1" strokeDasharray="2 6" />
          </g>

          {/* Layer 3: Esoteric tech rings / astrolabe tracks (Static relative to breathing container) */}
          <g opacity="0.7">
            <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(30 50 50)" strokeWidth="0.15" />
            <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(-30 50 50)" strokeWidth="0.15" />
            <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(90 50 50)" strokeWidth="0.15" />
          </g>

          {/* Layer 4: Inner Eye & Core (Pulsing and spinning fast CCW) */}
          <g className="mandala-layer-fast-ccw">
            <polygon points="50,42 58,50 50,58 42,50" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="12" strokeWidth="0.15" strokeDasharray="1 2" />
          </g>

          <g className="mandala-core-pulse">
            <circle cx="50" cy="50" r="2.5" fill="var(--about-ink)" stroke="none" />
          </g>

          {/* Layer 5: Sparse orbital tracking lines (Static) */}
          <path d="M 50 0 V 100 M 0 50 H 100" strokeWidth="0.1" strokeDasharray="2 6" />
        </g>
      </svg>
    </div>
  );
}

/* Letter-scramble for the metadata line. Runs once on reveal and, when `loop`
   is set, re-scrambles itself at random intervals for a glitchy archive feel. */
function ScrambleText({ active, text, delay = 0, loop = false }) {
  const [value, setValue] = useState(text);

  useEffect(() => {
    if (!active) return undefined;

    const timers = new Set();

    const run = () => {
      let frame = 0;
      const timer = window.setInterval(() => {
        frame += 1;
        const revealed = Math.floor((frame / 18) * text.length);
        setValue(
          text
            .split("")
            .map((char, index) =>
              char === " " || index < revealed ? char : randGlyph(),
            )
            .join(""),
        );
        if (frame >= 18) {
          window.clearInterval(timer);
          timers.delete(timer);
          setValue(text);
          if (loop) {
            const next = window.setTimeout(run, 4000 + Math.random() * 5000);
            timers.add(next);
          }
        }
      }, 34);
      timers.add(timer);
    };

    const starter = window.setTimeout(run, delay * 1000);
    timers.add(starter);

    return () => {
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
    };
  }, [active, delay, text, loop]);

  return value;
}

/* Red sigil / diagram system: an emotional-cartography scan locked to the
   artwork. A few marks use negative-x coordinates to reach left into the gap
   (overflow is visible), tying the drawing to the text. */
function RedSigil({ active }) {
  const draw = (delay, opacity, duration = 0.9) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: active
      ? { pathLength: 1, opacity }
      : { pathLength: 0, opacity: 0 },
    transition: { delay, duration, ease: "easeInOut" },
  });
  const dot = (delay) => ({
    initial: { opacity: 0 },
    animate: active ? { opacity: 0.85 } : { opacity: 0 },
    transition: { delay, duration: 0.4 },
  });

  return (
    <svg
      className="about-sigil"
      viewBox="0 0 1065 836"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* measurement line bridging gap → chest, with end ticks (dashed guide) */}
      <motion.path
        d="M 300 470 H -96 M 300 460 V 480 M -96 460 V 480"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="7 9"
        pathLength="1"
        {...draw(0.16, 0.7, 1.0)}
      />

      {/* custom faint sigil anchoring the line in the centre gap */}
      <motion.g
        className="about-faint-sigil"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle
          cx="-120"
          cy="470"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M -120 442 V 498 M -141 488 L -99 451"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <circle cx="-150" cy="452" r="2.6" fill="currentColor" />
        <circle cx="-90" cy="452" r="2.6" fill="currentColor" />
        <circle cx="-120" cy="512" r="2.6" fill="currentColor" />
      </motion.g>

      {/* forehead / hairline circle + crosshair, kept clear of the eyes */}
      <motion.circle
        cx="332"
        cy="120"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        pathLength="1"
        {...draw(0.3, 0.9, 0.55)}
      />
      <motion.path
        d="M 306 120 H 358 M 332 94 V 146"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        pathLength="1"
        {...draw(0.34, 0.85, 0.55)}
      />

      {/* partial ellipse around the chest / torso */}
      <motion.path
        d="M 300 558 A 168 124 0 1 1 600 516"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        pathLength="1"
        {...draw(0.4, 0.82, 1.1)}
      />

      {/* one diagonal motion line following the pose (shoulder → hand) */}
      <motion.path
        d="M 430 358 L 592 648"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.05"
        pathLength="1"
        {...draw(0.5, 0.7, 0.9)}
      />

      {/* corner-bracket frame around the hand / emotional centre */}
      <motion.path
        d="M 512 612 V 584 H 542 M 612 584 H 642 V 612 M 512 676 V 704 H 542 M 612 704 H 642 V 676"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        pathLength="1"
        {...draw(0.56, 0.85, 0.8)}
      />

      {/* small bracket near the upper arm */}
      <motion.path
        d="M 372 470 H 348 V 520 M 372 470"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        pathLength="1"
        {...draw(0.62, 0.8, 0.6)}
      />

      {/* red diamond + triangle marks */}
      <motion.path
        d="M 904 296 l 14 16 l -14 16 l -14 -16 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        pathLength="1"
        {...draw(0.66, 0.85, 0.55)}
      />
      <motion.path
        d="M 250 430 l 16 26 h -32 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        pathLength="1"
        {...draw(0.7, 0.8, 0.55)}
      />

      {/* coordinate dots following hair + body motion (appear after the lines) */}
      <motion.g {...dot(0.86)}>
        <circle cx="386" cy="182" r="2.8" fill="currentColor" />
        <circle cx="540" cy="150" r="2.8" fill="currentColor" />
        <circle cx="704" cy="166" r="2.8" fill="currentColor" />
        <circle cx="862" cy="228" r="2.8" fill="currentColor" />
        <circle cx="470" cy="430" r="2.8" fill="currentColor" />
        <circle cx="544" cy="560" r="2.8" fill="currentColor" />
        <circle cx="582" cy="650" r="2.8" fill="currentColor" />
      </motion.g>
    </svg>
  );
}

export function AboutSection() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 46, damping: 20, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 46, damping: 20, mass: 0.35 });
  const imageX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const imageY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const cursorXPct = useTransform(smoothX, [-1, 1], ["16%", "84%"]);
  const cursorYPct = useTransform(smoothY, [-1, 1], ["18%", "82%"]);
  const scanTilt = useTransform(smoothX, [-1, 1], ["-5deg", "5deg"]);

  // Scroll-linked parallax across the section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const artDriftY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const scrollSweepY = useTransform(scrollYProgress, [0, 1], ["8%", "92%"]);
  const scrollSweepX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const metaScrollY = useTransform(scrollYProgress, [0, 0.45, 1], [32, 0, -44]);
  const copyScrollY = useTransform(scrollYProgress, [0, 0.5, 1], [68, 0, -34]);
  const anchorScrollY = useTransform(scrollYProgress, [0, 0.55, 1], [110, 8, -60]);
  const chineseScrollY = useTransform(scrollYProgress, [0, 0.62, 1], [150, 18, -22]);
  const labelScrollY = useTransform(scrollYProgress, [0, 1], [42, -52]);
  const fragScrollY = useTransform(scrollYProgress, [0, 1], [26, -34]);
  const artScrollX = useTransform(scrollYProgress, [0, 0.5, 1], [42, 0, -34]);
  const artScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.93, 1.03, 0.98]);
  const artRotate = useTransform(scrollYProgress, [0, 0.5, 1], ["-2.5deg", "0deg", "2deg"]);
  const sectionWash = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const figureY = useTransform([imageY, artDriftY], ([m, s]) => m + s);
  const figureX = useTransform([imageX, artScrollX], ([m, s]) => m + s);

  const lowerRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Localized scroll reveal hooks
  const topVis = useInView(sectionRef, { margin: "-10%" });
  const metaRef = useRef(null);
  const metaInView = useInView(metaRef, { margin: "-15%" });
  const copyRef = useRef(null);
  const copyInView = useInView(copyRef, { margin: "-15%" });
  const anchorRef = useRef(null);
  const anchorInView = useInView(anchorRef, { margin: "-15%" });
  const chineseRef = useRef(null);
  const chineseInView = useInView(chineseRef, { margin: "-15%" });
  const sketchRef = useRef(null);
  const sketchInView = useInView(sketchRef, { margin: "-15%" });

  useEffect(() => {
    setReady(true);
  }, []);

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    mouseY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  return (
    <motion.section
      ref={sectionRef}
      className="about-archive"
      id="about"
      style={{
        "--about-cursor-x": cursorXPct,
        "--about-cursor-y": cursorYPct,
        "--about-scan-tilt": scanTilt,
        "--about-scroll-y": scrollSweepY,
        "--about-scroll-x": scrollSweepX,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.span
        className="about-scroll-wash"
        style={{ opacity: sectionWash }}
        aria-hidden="true"
      />
      <ScrollProgressRail progress={scrollYProgress} />
      <div className="about-ambient" aria-hidden="true">
        <span className="about-ambient-orb ax-one" />
        <span className="about-ambient-orb ax-two" />
        <span className="about-ambient-orb ax-three" />
        <span className="about-scan" />
        <span className="about-scroll-sweep" />
        <AmbientConstellation active={topVis} />
      </div>
      <div className="about-dossier">
        {/* ===== LEFT ZONE ===== */}
        <motion.div
          ref={metaRef}
          className="about-meta"
          style={{ y: metaScrollY }}
          initial={{ opacity: 0 }}
          animate={metaInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            <Scramble text="ABOUT / FAINT" active={metaInView} delay={0.05} duration={900} />
          </p>
          <span>
            <Scramble
              text="composer • sound designer • developer"
              active={metaInView}
              delay={0.2}
            />
          </span>
          <span className="about-meta-mono about-glitch">
            <ScrambleText
              active={metaInView}
              text="Purgatorial Garden"
              delay={0.34}
              loop
            />
          </span>
          <SpectrumBars active={metaInView} />
        </motion.div>

        <motion.article
          ref={copyRef}
          className="about-copy font-serif text-xl sm:text-2xl"
          style={{ y: copyScrollY }}
          initial={{ opacity: 0 }}
          animate={copyInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.14, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="about-lede">
            faint is a composer, sound designer, and developer, building quiet little
            worlds <RedactionText label="out of cinematic fragments and strange tools">out of cinematic fragments and strange tools</RedactionText>.
          </p>
          <p className="about-copy-second">
            His work sits between softness and silence<RedactionText label=", often bleeding into ruin">, often bleeding into ruin</RedactionText>. 
            Fragile melodies and textured atmospheres <RedactionText label="hold fading memories that">hold fading memories that</RedactionText> feel like they came from a dream <RedactionText label="or somewhere else entirely." bold>or somewhere else entirely.</RedactionText>
          </p>
        </motion.article>

        <motion.div ref={anchorRef} className="about-anchor" style={{ y: anchorScrollY }}>
          <motion.div
            className="about-logo"
            initial={{ opacity: 0, y: 20, skewX: -10, filter: "blur(10px)" }}
            animate={
              anchorInView
                ? { opacity: 1, y: 0, skewX: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 20, skewX: -10, filter: "blur(10px)" }
            }
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <FlowerMandala />
            <ArtifactLogo className="about-logo-svg relative z-10" />
          </motion.div>
          <Frag
            delay={0.12}
            from={{ y: 8 }}
            className="about-frag-left"
          >
            {(inView) => (
              <Scramble
                text="built from texture, ache, and small lights"
                active={inView}
                delay={0.4}
              />
            )}
          </Frag>
        </motion.div>

        <motion.div
          ref={chineseRef}
          className="about-chinese"
          style={{ y: chineseScrollY }}
          initial={{ opacity: 0 }}
          animate={chineseInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            <Scramble
              text={"我在声音与废墟之间建造小世界。"}
              active={chineseInView}
              delay={0.45}
              duration={1300}
            />
          </p>
          <p>
            <Scramble
              text={"记忆不是过去，而是残留的光。"}
              active={chineseInView}
              delay={0.6}
              duration={1300}
            />
          </p>
        </motion.div>

        {/* ===== ARTWORK + RED SIGIL ===== */}
        <motion.figure
          ref={sketchRef}
          className="about-sketch"
          style={{ x: figureX, y: figureY, scale: artScale, rotate: artRotate }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: ready && sketchInView ? 1 : 0,
          }}
          transition={{ delay: 0.15, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={SKETCH_SRC} alt="Hand-drawn character sketch" />
        </motion.figure>

        {/* ===== CENTRE GAP ===== */}
        <VLabel
          delay={0.32}
          className="ax-cartography"
          style={{ "--about-float-y": labelScrollY }}
        >
          {(inView) => <Scramble text="emotional cartography" active={inView} delay={0.38} />}
        </VLabel>
        <Frag
          delay={0.46}
          from={{ x: -12 }}
          className="ax-prayer"
          style={{ "--about-float-y": fragScrollY }}
        >
          {(inView) => (
            <Scramble
              text={"fragments arranged\nlike prayer"}
              active={inView}
              delay={0.5}
            />
          )}
        </Frag>
        <VLabel
          delay={0.4}
          className="ax-memory ax-box-black about-glitch"
          style={{ "--about-float-y": labelScrollY }}
        >
          {(inView) => <Scramble text="MEMORY SYSTEM" active={inView} delay={0.46} />}
        </VLabel>
        <VLabel
          delay={0.54}
          className="ax-fold ax-cjk"
          style={{ "--about-float-y": labelScrollY }}
        >
          {(inView) => <Scramble text={"把沉默折成形状"} active={inView} delay={0.6} />}
        </VLabel>

        {/* ===== AROUND ARTWORK ===== */}
        <VLabel
          delay={0.34}
          className="ax-index ax-mono about-glitch"
          style={{ "--about-float-y": labelScrollY }}
        >
          {(inView) => <Scramble text="soft ruin index" active={inView} delay={0.4} />}
        </VLabel>
        <VLabel
          delay={0.5}
          className="ax-canguang ax-cjk about-glitch"
          style={{ "--about-float-y": labelScrollY }}
        >
          {(inView) => <Scramble text={"残光"} active={inView} delay={0.56} />}
        </VLabel>
        <VLabel
          delay={0.42}
          className="ax-weiwancheng ax-box-red ax-cjk"
          style={{ "--about-float-y": labelScrollY }}
        >
          {(inView) => <Scramble text={"未完成"} active={inView} delay={0.48} />}
        </VLabel>
        <Frag
          delay={0.58}
          from={{ y: 12 }}
          className="ax-bloom-frag"
          style={{ "--about-float-y": fragScrollY }}
        >
          {(inView) => (
            <>
              <Scramble
                text={"where silence\nlearns to bloom"}
                active={inView}
                delay={0.64}
              />
              <i className="about-glyph">✦</i>
            </>
          )}
        </Frag>
        <Frag
          delay={0.64}
          from={{ x: 14 }}
          className="ax-wound"
          style={{ "--about-float-y": fragScrollY }}
        >
          {(inView) => (
            <>
              <i className="about-glyph">+</i>{" "}
              <Scramble text="sound left in the wound" active={inView} delay={0.7} />
            </>
          )}
        </Frag>
        <VLabel
          delay={0.6}
          className="ax-solitude ax-mono about-glitch"
          style={{ "--about-float-y": labelScrollY }}
        >
          {(inView) => <Scramble text="solitude / loneliness" active={inView} delay={0.66} />}
        </VLabel>
        <VLabel
          delay={0.7}
          className="ax-signal ax-mono"
          style={{ "--about-float-y": labelScrollY }}
        >
          {(inView) => <Scramble text="signal / silence / bloom" active={inView} delay={0.76} />}
        </VLabel>

        {/* ===== LOWER-RIGHT / LOWER-MIDDLE (reveal on deeper scroll) ===== */}
        <span
          ref={lowerRef}
          className="about-lower-sentinel"
          aria-hidden="true"
        />
        <Frag
          delay={0.05}
          from={{ y: 16 }}
          className="ax-breath ax-cjk"
          style={{ "--about-float-y": fragScrollY }}
        >
          {(inView) => <Scramble text={"声音替废墟呼吸。"} active={inView} delay={0.1} duration={1200} />}
        </Frag>
        <Frag
          delay={0.16}
          from={{ y: 16 }}
          className="ax-map"
          style={{ "--about-float-y": fragScrollY }}
        >
          {(inView) => (
            <Scramble
              text="a map for things that almost disappeared"
              active={inView}
              delay={0.2}
            />
          )}
        </Frag>
      </div>
    </motion.section>
  );
}

export default function About() {
  return (
    <main className="about-page">
      <AboutSection />
    </main>
  );
}
