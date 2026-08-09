import { useEffect, useRef } from "react";

const LETTERS = "FAINTGARDEN";
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function hash(value) {
  const x = Math.sin(value * 91.713) * 43758.5453;
  return x - Math.floor(x);
}

function gaussian(value, center, spread) {
  const distance = (value - center) / spread;
  return Math.exp(-(distance * distance));
}

export function TypeMarkCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    let frame = 0;
    let points = [];
    let width = 0;
    let height = 0;
    let pointer = { x: -1000, y: -1000 };
    let smoothPointer = { ...pointer };
    let needsFrame = true;

    const createMark = () => {
      points = [];
      const shortestSide = Math.min(width, height);
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const step = clamp(shortestSide * 0.011, 8.5, 13.5);
      const rayLength = Math.hypot(width, height) * 0.67;
      const angles = [
        -Math.PI / 2,
        -Math.PI / 6,
        Math.PI / 6,
        Math.PI / 2,
        (Math.PI * 5) / 6,
        (Math.PI * 7) / 6,
      ];

      angles.forEach((angle, armIndex) => {
        const directionX = Math.cos(angle);
        const directionY = Math.sin(angle);
        const normalX = -directionY;
        const normalY = directionX;

        for (let distance = 0; distance < rayLength; distance += step) {
          const progress = distance / rayLength;
          const firstBody = gaussian(
            progress,
            0.2 + (armIndex % 2) * 0.035,
            0.12,
          );
          const secondBody = gaussian(
            progress,
            0.43 + ((armIndex + 1) % 3) * 0.025,
            0.1,
          );
          const halfWidth = step * (0.4 + firstBody * 8.2 + secondBody * 3.2);
          const rowCount = Math.max(1, Math.floor(halfWidth / step));

          for (let row = -rowCount; row <= rowCount; row += 1) {
            const seed =
              armIndex * 100000 + Math.floor(distance / step) * 101 + row * 17;
            const edge = Math.abs(row) / Math.max(rowCount, 1);
            if (hash(seed) <= edge * 0.36 + progress * 0.05) continue;

            const drift = (hash(seed + 4) - 0.5) * step * 0.48;
            points.push({
              x:
                centerX +
                directionX * distance +
                normalX * (row * step + drift),
              y:
                centerY +
                directionY * distance +
                normalY * (row * step + drift),
              alpha: clamp(
                0.05 + firstBody * 0.23 + secondBody * 0.14 - edge * 0.08,
                0.025,
                0.32,
              ),
              letter: LETTERS[Math.floor(hash(seed + 8) * LETTERS.length)],
              phase: hash(seed + 12) * Math.PI * 2,
            });
          }
        }
      });
    };

    const draw = (time = 0) => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.08;
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.08;
      const fontSize = clamp(Math.min(width, height) * 0.012, 9, 15);
      context.font = `500 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      points.forEach((point) => {
        const dx = point.x - smoothPointer.x;
        const dy = point.y - smoothPointer.y;
        const distance = Math.hypot(dx, dy);
        const glow = clamp(1 - distance / 240, 0, 1);
        const float = Math.sin(time * 0.00055 + point.phase) * 0.45;
        context.fillStyle = `rgba(24, 24, 23, ${point.alpha + glow * 0.2})`;
        context.fillText(
          point.letter,
          point.x + float + glow * dx * 0.012,
          point.y + float + glow * dy * 0.012,
        );
      });

      if (
        needsFrame ||
        Math.abs(pointer.x - smoothPointer.x) > 0.5 ||
        Math.abs(pointer.y - smoothPointer.y) > 0.5
      ) {
        needsFrame = false;
        frame = window.requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createMark();
      needsFrame = true;
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const handlePointerLeave = () => {
      pointer = { x: -1000, y: -1000 };
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    resize();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`paramor-type-canvas ${className}`}
      aria-hidden="true"
    />
  );
}

function SparkMark({ compact = false }) {
  return (
    <svg
      className={compact ? "paramor-spark paramor-spark--compact" : "paramor-spark"}
      viewBox="0 0 54 38"
      aria-hidden="true"
    >
      <path d="M27 2v14M7 6l13 12M47 6 34 18M3 27l17-5M51 27l-17-5M27 24v12" />
    </svg>
  );
}

function GardenOriginMark() {
  return (
    <svg
      className="paramor-origin-mark"
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

export default function ParamorLanding() {
  return (
    <section className="paramor-page" aria-label="Faint studio introduction">
      <TypeMarkCanvas />

      <section className="paramor-intro" aria-labelledby="paramor-title">
        <div className="paramor-lockup" aria-label="Faint">
          <GardenOriginMark />
          <span className="paramor-arrow" aria-hidden="true" />
          <span className="paramor-name">Faint</span>
          <SparkMark compact />
        </div>

        <h1 id="paramor-title">
          <span>Sound, story & digital art</span>
          <span>from PurgatorialGarden</span>
        </h1>

      </section>

      <a className="paramor-scroll-cue" href="#archive">
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>

    </section>
  );
}
