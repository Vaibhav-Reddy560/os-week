"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Item = {
  id: string;
  title: string;
  time: string;
  desc?: string;
  side: "left" | "right"; // Explicit side
  children?: Omit<Item, 'side' | 'children'>[]; // Sub-items
};

// --- EDIT YOUR SCHEDULE DATA HERE ---
const TIMELINE: Item[] = [
  {
    id: "d1",
    title: "Industry Visit — Red Hat",
    time: "Day 1 — 09:00 AM",
    desc: "Guided tour and interactive sessions (60-70 students).",
    side: "left",
  },
  {
    id: "d2",
    title: "Workshops",
    time: "Day 2 — 10:00 AM",
    desc: "GitHub 101 • Agentic AI Unpacked",
    side: "right",
  },
  {
    id: "d3",
    title: "Contribution Sprint",
    time: "Day 3 — 09:30 AM",
    desc: "Guided open-source contribution sprint (virtual available).",
    side: "left",
  },
  {
    id: "d45",
    title: "RepoGenesis — 24-Hour Hackathon",
    time: "Days 4–5 — Starts 10:00 AM",
    desc: "24-hour open-source hackathon with checkpoints.",
    side: "right",
    children: [
      { id: "rg1", title: "Team Formation & Kickoff", time: "Day 4 - 10:00 AM" },
      { id: "rg2", title: "Checkpoint 1", time: "Day 4 - 04:00 PM" },
      { id: "rg3", title: "Checkpoint 2", time: "Day 5 - 12:00 AM" },
      { id: "rg4", title: "Final Demo & Judging", time: "Day 5 - 11:00 AM" },
    ],
  },
  {
    id: "retro",
    title: "Retro-Tech Exhibit",
    time: "All Week",
    desc: "Vintage languages & hardware.",
    side: "left",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("data-id");
            if (!id) return;
            const idx = TIMELINE.findIndex((t) => t.id === id);
            if (idx >= 0) setActiveIdx(idx);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );

    const refs = Object.values(itemRefs.current);
    refs.forEach((el) => el && obs.observe(el));
    return () => refs.forEach(el => el && obs.disconnect());
  }, []);

  const sliderTop = activeIdx * (100 / Math.max(1, TIMELINE.length - 1));

  return (
    <section id="schedule" ref={containerRef} className="py-16 bg-black overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        <h2 className="text-3xl font-extrabold text-white mb-12 text-center">
          Event Schedule
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-green-900/40 h-full top-0 hidden md:block" aria-hidden="true"></div>
          
          {/* Mobile vertical line */}
          <div className="absolute left-[9px] w-[2px] bg-green-900/40 h-full top-0 md:hidden" aria-hidden="true"></div>


          {/* Animated slider marker (desktop only) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-green-400 shadow-lg border-2 border-green-800 hidden md:block"
            aria-hidden="true"
            initial={false}
            animate={{
              top: `${sliderTop}%`,
            }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}
          />

          <div className="space-y-12">
            {TIMELINE.map((item, idx) => {
              const side = item.side;
              
              const itemVariants = {
                hidden: { opacity: 0, x: shouldReduceMotion ? 0 : (side === 'left' ? -30 : 30) },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
              };
              const mobileItemVariants = {
                hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
              };

              return (
                <div 
                  key={item.id} 
                  // This is the line that was fixed
                  ref={(el) => { itemRefs.current[item.id] = el; }} 
                  data-id={item.id}
                  className="relative md:grid md:grid-cols-2 md:items-start md:gap-8"
                >
                  {/* --- DESKTOP VIEW --- */}
                  {side === 'left' ? (
                    <motion.div 
                      className="hidden md:block"
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      <TimelineCard item={item} />
                    </motion.div>
                  ) : (
                    <div className="hidden md:block"></div> // Spacer
                  )}

                  {side === 'right' ? (
                     <motion.div 
                      className="hidden md:block"
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      <TimelineCard item={item} />
                    </motion.div>
                  ) : (
                    <div className="hidden md:block"></div> // Spacer
                  )}

                  {/* --- MOBILE VIEW --- */}
                  <motion.div 
                    className="md:hidden flex gap-4 items-start"
                    variants={mobileItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-green-400 shadow-lg border-2 border-green-800 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1">
                      <TimelineCard item={item} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper component for the card content
const TimelineCard = ({ item }: { item: Item }) => (
  <div className="bg-neutral-900/40 border border-green-900/30 p-4 rounded-lg shadow-md">
    <div className="text-base font-semibold text-green-300">{item.title}</div>
    <div className="text-xs text-neutral-400 mt-1">{item.time}</div>
    {item.desc && <p className="text-sm text-neutral-300 mt-2">{item.desc}</p>}
  
    {/* nested sub-timeline (RepoGenesis) */}
    {item.children && (
      <div className="mt-4">
        <div className="ml-2 border-l-2 border-green-800/50 pl-4 space-y-3">
          {item.children.map((c) => (
            <div key={c.id} className="text-sm text-neutral-300 relative">
               <div className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-green-600" aria-hidden="true"></div>
              <div className="font-medium text-green-300">{c.title}</div>
              <div className="text-xs text-neutral-400">{c.time}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
