// src/App.jsx
import { useEffect, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "motion/react";
import { NavBar } from "./components/NavBar";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";

import Home from "./pages/Home";
import Works from "./pages/Works";
import About from "./pages/About";
import Lores from "./pages/Lores";
import TheFirstSilence from "./sections/lore/TheFirstSilence";
import Eclipse from "./pages/Eclipse";
import Contact from "./pages/Contact";
import Links from "./pages/Links"; // ✅ renamed import
import Studio from "./pages/Studio";

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoadFinished = useCallback(() => setLoading(false), []);
  const [dark, setDark] = useState(() => {
    // initialize from system preference
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
  }, [dark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDark(e.matches);

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onFinished={handleLoadFinished} />}
      <motion.div
        className={`${dark ? "dark" : ""} site-shell min-h-dvh flex flex-col cursor-auto md:cursor-none`}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <CustomCursor />
        <NavBar dark={dark} setDark={setDark} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home dark={dark} />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/paramor" element={<Studio />} />
            <Route path="/works" element={<Works />} />
            <Route path="/about" element={<About />} />
            <Route path="/lore" element={<Lores />} />
            <Route
              path="/lore/the-first-silence"
              element={<TheFirstSilence />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plugin/eclipse" element={<Eclipse />} />
            <Route path="/link" element={<Links />} /> {/* ✅ wired */}
          </Routes>
        </div>

        <footer className="site-footer border-t py-7 text-center font-pixel text-xs">
          © {new Date().getFullYear()} PurgatorialGarden. All rights reserved.
        </footer>
      </motion.div>
    </>
  );
}
