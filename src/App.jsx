// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";

import Home from "./pages/Home";
import Works from "./pages/Works";
import About from "./pages/About";
import Lores from "./pages/Lores";
import Contact from "./pages/Contact";
import Links from "./pages/Links"; // ✅ renamed import

export default function App() {
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
    <div
      className={
        (dark
          ? "dark bg-neutral-950 text-neutral-100"
          : "bg-neutral-50 text-neutral-900") + " min-h-dvh flex flex-col"
      }
    >
      <NavBar dark={dark} setDark={setDark} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home dark={dark} />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/lore" element={<Lores />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/link" element={<Links />} /> {/* ✅ wired */}
        </Routes>
      </div>

      <footer className="border-t border-black/5 dark:border-white/5 py-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} suji. All rights reserved.
      </footer>
    </div>
  );
}
