import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = {
    damping: 34,
    stiffness: 1050,
    mass: 0.16,
    restDelta: 0.001,
  };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const updatePointer = () => setHasFinePointer(pointerQuery.matches);

    updatePointer();

    if (pointerQuery.addEventListener) {
      pointerQuery.addEventListener("change", updatePointer);
    } else {
      pointerQuery.addListener(updatePointer);
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      setIsHovered(Boolean(e.target.closest("a, button, [role='button'], input, textarea, select")));
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", hideCursor);

    return () => {
      if (pointerQuery.removeEventListener) {
        pointerQuery.removeEventListener("change", updatePointer);
      } else {
        pointerQuery.removeListener(updatePointer);
      }

      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY]);

  if (!hasFinePointer) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[10002] hidden h-8 w-8 items-center justify-center mix-blend-difference md:flex"
      style={{ x: cursorXSpring, y: cursorYSpring }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      aria-hidden="true"
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: isHovered ? 30 : 9,
          height: isHovered ? 30 : 9,
          opacity: isHovered ? 0.32 : 1,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </motion.div>
  );
}
