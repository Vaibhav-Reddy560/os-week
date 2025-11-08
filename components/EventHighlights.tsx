"use client";

import React from "react";
import { motion } from "framer-motion";

const highlights = [
  { title: "Industry Visit — Red Hat (Day 1)", desc: "Guided tour and sessions on cloud, DevOps and careers. 60-70 students." },
  { title: "Workshops (Day 2)", desc: "GitHub 101 • Agentic AI Unpacked" },
  { title: "Contribution Sprint (Day 3)", desc: "Mentored sprint to submit issues, fixes and features (virtual available)." },
  { title: "RepoGenesis — 24-Hour Hackathon (Days 4-5)", desc: "Teams build open-source solutions with mentorship & checkpoints." },
  { title: "Retro-Tech Exhibit (All Week)", desc: "Hands-on vintage languages & hardware showcase." },
];

export default function EventHighlights() {
  return (
    // --- BACKGROUND CLASS REMOVED FROM THIS LINE ---
    <section id="highlights" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center md:text-left">
          Event Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <motion.article 
              key={h.title} 
              initial={{ opacity: 0, y: 12 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, ease: "easeOut" }} 
              // --- This card's background is kept ---
              className="p-6 rounded-xl border border-green-900/30 bg-gradient-to-b from-neutral-900/40 to-black/20"
            >
              <h3 className="text-lg font-semibold text-green-300">{h.title}</h3>
              <p className="text-sm text-neutral-300 mt-2">{h.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
