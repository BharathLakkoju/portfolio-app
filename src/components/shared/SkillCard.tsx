"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "~/components/shared/AnimatedSection";
import { type SkillCategory } from "~/lib/data";

type ColorScheme = { accent: string; bg: string; border: string; icon: string };

const categoryColors: Record<string, ColorScheme> = {
  "Programming Languages": {
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    icon: "💻",
  },
  Frontend: {
    accent: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.25)",
    icon: "🎨",
  },
  "Backend & APIs": {
    accent: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    icon: "⚡",
  },
  Databases: {
    accent: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.25)",
    icon: "🗄️",
  },
  "AI / ML": {
    accent: "#f43f5e",
    bg: "rgba(244,63,94,0.08)",
    border: "rgba(244,63,94,0.25)",
    icon: "🧠",
  },
  "DevOps & Tools": {
    accent: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.25)",
    icon: "🔧",
  },
};

const defaultColor: ColorScheme = {
  accent: "#06b6d4",
  bg: "rgba(6,182,212,0.08)",
  border: "rgba(6,182,212,0.25)",
  icon: "⚙️",
};

export function SkillCard({ cat }: { cat: SkillCategory }) {
  const c = categoryColors[cat.category] ?? defaultColor;

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-xl bg-background p-4 transition-all duration-300"
      style={{ border: `1px solid ${c.border}` }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm leading-none">{c.icon}</span>
        <h3
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: c.accent }}
        >
          {cat.category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {cat.items.map((item) => (
          <span
            key={item}
            className="rounded px-2 py-0.5 text-[11px] font-medium"
            style={{
              color: c.accent,
              background: c.bg,
              border: `1px solid ${c.border}`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
