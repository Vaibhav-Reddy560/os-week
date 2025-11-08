"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    // --- BACKGROUND CLASS REMOVED FROM THIS LINE ---
    <section id="about" className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
            About Open Source Week
          </h2>
          <p className="text-lg text-neutral-300 text-center text-balance">
            Open Source Week is a flagship event by BMSCE IEEE Computer Society, dedicated to fostering a culture of collaboration, innovation, and learning.
            We're bringing together students, industry experts, and open-source advocates for a week packed with technical workshops, an exclusive industry visit, a mentored contribution sprint, and the thrilling 24-hour RepoGenesis hackathon.
          </p>
          <p className="text-lg text-neutral-300 text-center text-balance mt-4">
            Whether you're a beginner learning Git or a seasoned developer, Open Source Week has something for everyone. Join us to build, learn, and contribute!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
