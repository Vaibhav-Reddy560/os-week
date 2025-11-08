"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// --- IMPORTANT ---
// This date MUST match the EVENT_START_ISO in app/layout.tsx
const EVENT_START = new Date("2025-11-20T09:00:00"); // <- edit this

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function HeroCountdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, EVENT_START.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const isStarted = diff <= 0;

  return (
    // --- I REMOVED THE 'bg-gradient-...' CLASSES FROM THIS LINE ---
    <section id="home" className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="max-w-6xl w-full px-6 py-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="mx-auto md:mx-0 max-w-lg">
            <Image 
              src="/title.png" 
              alt="Open Source Week" 
              width={720} 
              height={180} 
              className="mx-auto md:mx-0"
              priority // Load this image first
            />
            <p className="mt-4 text-lg text-green-200">Starts in</p>

            {isStarted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-2xl md:text-4xl text-white font-semibold"
              >
                It’s happening now 🚀
              </motion.div>
            ) : (
              <div className="mt-4 flex gap-3 justify-center md:justify-start">
                {[
                  { label: "Days", value: days },
                  { label: "Hours", value: hours },
                  { label: "Minutes", value: minutes },
                  { label: "Seconds", value: seconds },
                ].map((seg, i) => (
                  <motion.div
                    key={seg.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-neutral-900/50 border border-green-900/30 backdrop-blur-sm px-4 py-2 rounded-lg text-center min-w-[72px] sm:min-w-[84px] flex flex-col items-center"
                    aria-label={`${seg.value} ${seg.label}`}
                    suppressHydrationWarning={true}
                  >
                    <div 
                      className="font-mono text-2xl md:text-3xl text-green-300" 
                      aria-hidden="true"
                      suppressHydrationWarning={true}
                    >
                      {pad(seg.value)}
                    </div>
                    <div className="text-xs text-neutral-400" aria-hidden="true">{seg.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-8 flex gap-3 justify-center md:justify-start">
              <a 
                href="#register" 
                className="px-5 py-3 rounded-md bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold shadow-lg hover:scale-[1.02] transition-transform animate-neon-glow"
              >
                Register Now
              </a>
              <a 
                href="#highlights" 
                className="px-5 py-3 rounded-md border border-green-700 text-green-200 hover:bg-green-900/30 transition-colors"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          {/* This card can keep its background, it will look good */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full h-64 md:h-80 rounded-xl border border-green-800/30 bg-gradient-to-br from-black/30 to-green-950/20 p-6 flex flex-col justify-between"
          >
            <div className="text-lg font-semibold text-white">Open Source Week</div>
            <div className="text-right">
                <div className="text-sm sm:text-base text-neutral-300">Workshops • Industry visit</div>
                <div className="text-sm sm:text-base text-neutral-300">Contribution sprint</div>
                <div className="text-sm sm:text-base text-neutral-300">RepoGenesis Hackathon</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
