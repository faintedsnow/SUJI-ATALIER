// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Noto Sans JP", "system-ui", "sans-serif"], // ✅ navbar font
        serif: ['"Instrument Serif"', "serif"],
        libre: ['"Libre Baskerville"', "serif"], // for titles/body
        book: ['"Book Antiqua Local"', "serif"],
        redaction: ['"Redaction"', "serif"],
        pixel: ['"PixelMplus12"', "monospace"],
      },
    },
  },
  plugins: [],
};
