"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "~/components/shared/ProjectCard";
import { projects, type Project } from "~/lib/data";
import { cn } from "~/lib/utils";

type FilterKey = "all" | Project["category"];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Full Stack" },
  { key: "ai", label: "AI & ML" },
  { key: "microservices", label: "Microservices" },
  { key: "tools", label: "Dev Tools" },
];

export default function ProjectsPage() {
  const [active, setActive] = useState<FilterKey>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Projects</h1>
          <p className="text-sm text-text-secondary max-w-md leading-relaxed">
            Production-ready applications spanning SaaS platforms, AI tools,
            microservices, and browser-native utilities.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1.5 mb-8 border-b border-border pb-5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150",
                active === f.key
                  ? "bg-surface text-text-primary"
                  : "text-text-muted hover:text-text-primary hover:bg-surface",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-text-muted">
            No projects in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
