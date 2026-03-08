// src/pages/Lores.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Ultra-minimal background
 */
function StorybookBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#F5F5F3] dark:bg-[#090909] transition-colors duration-1000">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] transition-colors duration-1000" />
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
    "the loudest silence. the first of it all."
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
         <h2 className="text-2xl md:text-3xl font-serif font-light text-black dark:text-white tracking-[0.2em] mb-4 transition-colors duration-1000">
           The First Silence
         </h2>
         <div className="w-12 h-[1px] bg-black/20 dark:bg-white/20 mx-auto transition-colors duration-1000"></div>
       </div>

       <div className="space-y-10 text-justify">
          {loreLines.map((line, index) => (
             <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.05 }}
                className={`text-[15px] md:text-[16px] font-serif font-light text-neutral-600 dark:text-neutral-400 transition-colors duration-1000 leading-[2.4] ${index === 0 ? 'first-letter:text-5xl first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-black dark:first-letter:text-white first-letter:mt-[-4px]' : ''}`}
             >
               {line}
             </motion.p>
          ))}
       </div>
    </motion.div>
  );
}

/**
 * Super Subtle Esoteric Sigil Background for Characters
 */
function CenterSigils({ charKey }) {
  const isLyune = charKey === 'lyune';
  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 aspect-square flex items-center justify-center pointer-events-none opacity-[0.2] dark:opacity-[0.15] scale-[1.2]">
      
      {/* Inner Rotating Ring */}
      <motion.div 
        className="absolute w-[80%] aspect-square border-l border-r border-t border-b border-black dark:border-white border-dashed rounded-full transition-colors duration-1000"
        animate={{ rotate: isLyune ? 360 : -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Outer Dotted Ring */}
      <motion.div 
        className="absolute w-[100%] aspect-square border-[1px] border-black/80 dark:border-white/80 rounded-full border-dotted transition-colors duration-1000"
        animate={{ rotate: isLyune ? -360 : 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Character Specific Glyph */}
      {isLyune ? (
        <div className="absolute text-black/10 dark:text-white/10 transition-colors duration-1000 text-[200px] font-serif font-light blur-[1px] select-none -translate-y-4">☽</div>
      ) : (
        <motion.div 
          className="absolute w-[120%] aspect-square flex items-center justify-center"
        >
           <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="w-full h-full border border-black/20 dark:border-white/20 transition-colors duration-1000 rotate-45" />
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute w-[90%] h-[90%] border border-black/30 dark:border-white/30 transition-colors duration-1000 rotate-12" />
        </motion.div>
      )}
    </div>
  );
}

/**
 * Storybook Spread - Left Column Text Component
 */
function StorybookCharacterText({ data, onHoverStart, onHoverEnd }) {
   return (
      <div className="w-full max-w-[500px] flex flex-col justify-center relative z-10">
         
         {/* Massive Chinese Character Watermark */}
         <div 
           className="absolute -left-20 xl:-left-32 top-10 text-[160px] leading-none font-serif text-black/[0.04] dark:text-white/[0.02] select-none z-[-1] transition-colors duration-1000 tracking-widest cursor-crosshair"
           style={{ writingMode: 'vertical-rl' }}
           onMouseEnter={onHoverStart}
           onMouseLeave={onHoverEnd}
         >
            {data.id === 'lyune' ? '白䌷' : '黑肋'}
         </div>

         <div className="mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-light text-black dark:text-white transition-colors duration-1000 tracking-[0.2em] mb-4">
              {data.name}
            </h1>
            <div className="flex items-center gap-4 text-[11px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
               <span>{data.alias}</span>
               <span className="w-4 h-[1px] bg-black/20 dark:bg-white/20 transition-colors duration-1000"></span>
               <span>{data.title2}</span>
            </div>
         </div>

         <div className="space-y-8 text-[15px] leading-[2.4] text-neutral-600 dark:text-neutral-400 transition-colors duration-1000 font-light font-serif text-justify mb-16">
            <p>{data.text1}</p>
            <p>{data.text2}</p>
         </div>

         {/* Elegant Motif/Authority Footer */}
         <div className="border-t border-black/10 dark:border-white/10 transition-colors duration-1000 pt-8 mt-auto">
            <div className="flex flex-col gap-6">
               <div>
                  <div className="text-[9px] font-mono tracking-[0.3em] text-neutral-400 dark:text-neutral-600 transition-colors duration-1000 uppercase mb-3">MOTIFS</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 font-serif text-[13px] text-neutral-700 dark:text-neutral-300 transition-colors duration-1000 italic">
                     {data.motifs.map((m, i) => (
                        <span key={i}>{m}</span>
                     ))}
                  </div>
               </div>
               
               <div>
                  <div className="text-[9px] font-mono tracking-[0.3em] text-neutral-400 dark:text-neutral-600 transition-colors duration-1000 uppercase mb-3">AUTHORITY : {data.auth}</div>
                  <p className="text-[14px] text-neutral-500 leading-relaxed font-serif text-justify">
                    {data.authDesc}
                  </p>
               </div>
            </div>
         </div>

      </div>
   );
}

/**
 * Storybook Spread - Right Column Absolute Image Component
 */
function StorybookCharacterImage({ data, isHovered }) {
   return (
     <motion.div 
       initial={{ opacity: 0, filter: "blur(5px)" }}
       animate={{ opacity: 1, filter: "blur(0px)" }}
       exit={{ opacity: 0, filter: "blur(5px)" }}
       transition={{ duration: 1.2, ease: "easeOut" }}
       className="w-full h-full relative flex items-center justify-center pointer-events-none"
     >
       
       {/* Esoteric ASCII Background Accent */}
       <div className="absolute top-[10%] -right-[15%] font-mono text-[9px] leading-[14px] text-neutral-400 dark:text-neutral-800 transition-colors duration-1000 opacity-[0.8] dark:opacity-50 whitespace-pre text-right hidden lg:block select-none z-0">
{`
.  *  .  . *       *    .
 .   *   .    * .   *   .
  *    *   .     .    *  
.  *  .  . *       *    .
   ☶ ☵ ☴
   ☳ ☯ ☲
   ☱ ☶ ☵
   ||| ||
   ||| ||
`}
       </div>

       {/* Esoteric Subtle Sigils */}
       <div className="absolute inset-0 flex items-center justify-center z-0">
          <CenterSigils charKey={data.id} />
       </div>

       {/* The Masked Artwork Window */}
       <div className="w-full h-full relative flex items-center justify-center z-10" style={{
           WebkitMaskImage: data.mask,
           maskImage: data.mask
       }}>
         {/* mix-blend-normal in light mode lets the black edge frame the image like a printed cut-out. In dark mode, mix-blend-lighten fades the black into the dark bg. */}
         <img 
           src={data.image} 
           alt={data.name} 
           className={`absolute w-full h-full grayscale mix-blend-normal dark:mix-blend-lighten object-cover object-top transition-opacity duration-1000 ease-in-out ${isHovered && data.hoverImage ? 'opacity-0' : 'opacity-[0.95] dark:opacity-[0.85]'}`}
         />
         {data.hoverImage && (
           <img 
             src={data.hoverImage} 
             alt={`${data.name} Alternate`} 
             className={`absolute w-full h-full grayscale mix-blend-normal dark:mix-blend-lighten object-cover object-top transition-opacity duration-1000 ease-in-out ${isHovered ? 'opacity-[0.95] dark:opacity-[0.85]' : 'opacity-0'}`}
           />
         )}
       </div>

     </motion.div>
   );
 }

/**
 * Fan Art Gallery Component
 */
function FanArtGallery() {
  const artworks = [
    { src: "/aboutpage/OC1_Front_by_UrsprungNull_0.png", artist: "UrsprungNull", title: "OC Front View" },
    { src: "/aboutpage/OC1_sideprofile_by_UrsprungNull_0.PNG", artist: "UrsprungNull", title: "OC Side Profile" },
    { src: "/aboutpage/OC_by_Jtlr4hj_.jpg", artist: "Jtlr4hj_", title: "OC Illustration" },
    { src: "/aboutpage/Oc_Reference_Sheet_by_hehehahaartowo.png", artist: "hehehahaartowo", title: "Reference Sheet" },
    { src: "/aboutpage/image_sketch_by_lunaminiss.png", artist: "lunaminiss", title: "Rough Sketch" }
  ];

  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-4 lg:px-12 py-32 border-t border-black/5 dark:border-white/5 transition-colors duration-1000">
      
      {/* Gallery Header */}
      <div className="flex flex-col items-center justify-center text-center mb-20">
        <div className="font-mono text-[10px] tracking-[0.6em] text-neutral-400 dark:text-neutral-600 transition-colors duration-1000 uppercase mb-4">APPENDIX</div>
        <h2 className="text-3xl font-serif font-light text-black dark:text-neutral-300 transition-colors duration-1000 tracking-[0.2em]">Community Archives</h2>
        <div className="mt-6 w-12 h-[1px] bg-black/10 dark:bg-white/10 transition-colors duration-1000"></div>
      </div>

      {/* Minimal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {artworks.map((art, index) => (
          <motion.div 
             key={index}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.8, delay: index * 0.1 }}
             className="group relative flex flex-col"
          >
            {/* Image Container */}
            <div className="w-full aspect-square overflow-hidden bg-[#e5e5e3] dark:bg-[#030303] transition-colors duration-1000 border border-black/5 dark:border-white/5 mb-4 relative">
              <img 
                src={art.src} 
                alt={art.title} 
                className="w-full h-full object-cover grayscale opacity-80 dark:opacity-70 group-hover:opacity-100 dark:group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle inner shadow/border overlay */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 dark:ring-white/5 transition-colors duration-1000" />
            </div>

            {/* Meta tags */}
            <div className="flex flex-col px-1">
               <span className="font-mono text-[8px] text-neutral-500 dark:text-neutral-600 transition-colors duration-1000 uppercase tracking-[0.2em] mb-1">{art.artist}</span>
               <span className="font-serif text-[13px] text-neutral-600 dark:text-neutral-400 transition-colors duration-1000 italic">{art.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default function Lores() {
  const [activeTab, setActiveTab] = useState("lyune");
  const [isWatermarkHovered, setIsWatermarkHovered] = useState(false);

  const database = {
    lyune: {
      type: "entity",
      id: "lyune",
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
      text1: "A witch bound by divine curse to awaken in every dying world. Each rebirth erases parts of her memories, leaving only fragments of a forgotten song.",
      text2: "When she found Faint among the ruins of the First Silence, she broke her vow and saved him using the Rib of the Giant. Now she seeks to end the cycle, even if doing so means erasing herself completely.",
      authDesc: "Through the Skull of the Giant, she commands pale skulls to guide lost spirits. Yet every use bleeds her memory—names first, then faces, until only the silence remains."
    },
    faint: {
      type: "entity",
      id: "faint",
      chapter: "",
      label: "Faint",
      name: "Faint",
      alias: "The Black Rib",
      title2: "Mourning Beast",
      image: "/OC/OCfaint.png",
      mask: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
      motifs: ["Bone", "Ash", "Lily", "Dust"],
      auth: "The Hollow Frame",
      text1: "A nameless wanderer left dying during the First Silence, when a divine catastrophe shattered the sky. Lyune saved him by embedding the Rib of the Giant inside his chest.",
      text2: "It fused with his heartbeat, granting him power over resonant bone. Refusing to worship fate, he carves his own path through the ash, seeking to prove that life touched by ruin can still create meaning.",
      authDesc: "Summoning skeletal constructs of living bone. Yet, the power slowly devours his life force, calcifying his flesh into the fossil of an ancient guardian."
    },
    prologue: {
      type: "event",
      id: "prologue",
      chapter: "PROLOGUE",
      label: "The First Silence",
    }
  };

  const currentRecord = database[activeTab];
  const isEntity = currentRecord.type === "entity";

  return (
    <main className="relative min-h-screen w-full bg-[#F5F5F3] dark:bg-[#090909] text-neutral-600 dark:text-neutral-400 transition-colors duration-1000 font-sans flex flex-col pt-14 selection:bg-black/10 selection:text-black dark:selection:bg-white/10 dark:selection:text-white">
      <StorybookBackground />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 lg:px-12 flex flex-col flex-1 min-h-[calc(100vh-56px)]">
        
        {/* Absolute Right Side: Massive Image Layer overlaying the flex span */}
        {isEntity && (
           <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[55%] xl:w-[60%] items-center justify-center -z-0">
             <AnimatePresence mode="wait">
                 <StorybookCharacterImage key={activeTab} data={currentRecord} isHovered={isWatermarkHovered} />
             </AnimatePresence>
           </div>
        )}

        {/* Relative Left Side: Navigation & Text Layer */}
        <div className={`w-full ${isEntity ? 'lg:w-[45%] xl:w-[40%]' : 'max-w-3xl mx-auto'} flex flex-col py-12 lg:py-20 z-10 h-full`}>
           
           <nav className={`w-full flex ${isEntity ? 'justify-start' : 'justify-center'} mb-16 lg:mb-24`}>
             <div className="flex flex-wrap gap-8 md:gap-16">
                {Object.keys(database).map((key) => {
                   const item = database[key];
                   const isActive = activeTab === key;
                   return (
                     <button
                       key={key}
                       onClick={() => setActiveTab(key)}
                       className="group flex flex-col items-center gap-2 relative"
                     >
                       {item.chapter && (
                         <div className={`font-mono text-[9px] tracking-[0.2em] transition-colors duration-500 ${isActive ? 'text-neutral-500 dark:text-neutral-400' : 'text-neutral-400 dark:text-neutral-700 group-hover:text-neutral-600 dark:group-hover:text-neutral-500'}`}>
                           {item.chapter}
                         </div>
                       )}
                       <div className={`font-serif text-sm md:text-base tracking-[0.1em] transition-colors duration-500 ${isActive ? 'text-black dark:text-white' : 'text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300'}`}>
                         {item.label}
                       </div>
                       {/* Minimal indicator dot */}
                       <div className={`w-1 h-1 rounded-full transition-all duration-500 ${item.chapter ? 'mt-2' : 'mt-1'} ${isActive ? 'bg-black dark:bg-white opacity-100' : 'bg-transparent opacity-0'}`} />
                     </button>
                   )
                })}
             </div>
           </nav>

           <div className="w-full flex flex-col">
             <AnimatePresence mode="wait" onExitComplete={() => setIsWatermarkHovered(false)}>
               <motion.div 
                 key={activeTab}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.8, ease: "easeInOut" }}
                 className="w-full h-full"
               >
                  {isEntity ? (
                    <StorybookCharacterText data={currentRecord} onHoverStart={() => setIsWatermarkHovered(true)} onHoverEnd={() => setIsWatermarkHovered(false)} />
                  ) : (
                    <StorybookPrologue />
                  )}
               </motion.div>
             </AnimatePresence>
           </div>

        </div>

      </div>

      {/* The Fan Art Section appended below the absolute flex layout */}
      <FanArtGallery />

    </main>
  );
}
