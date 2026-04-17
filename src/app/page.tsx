"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "~/components/shared/Icons";
import { Button } from "~/components/ui/button";
import { ProjectCard } from "~/components/shared/ProjectCard";
import { profile, featuredProjects, skills } from "~/lib/data";

const categoryColors: Record<
  string,
  { color: string; bg: string; border: string }
> = {
  "Programming Languages": {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.22)",
  },
  Frontend: {
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.22)",
  },
  "Backend & APIs": {
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.22)",
  },
  Databases: {
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.22)",
  },
  "AI / ML": {
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.08)",
    border: "rgba(244,63,94,0.22)",
  },
  "DevOps & Tools": {
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.22)",
  },
};

export default function HomePage() {
  const taggedSkills = skills.flatMap((cat) =>
    cat.items.map((item) => ({ item, colors: categoryColors[cat.category] })),
  );

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pt-28 pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-start justify-between gap-6">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2 mb-5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-text-muted">
                  Open to opportunities
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="text-2xl font-bold tracking-tight sm:text-3xl mb-1"
              >
                {profile.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="text-sm text-text-muted mb-5"
              >
                {profile.title} &middot; {profile.location}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="text-sm leading-relaxed text-text-secondary mb-7 max-w-lg"
              >
                Building AI-powered products and scalable web applications with
                2+ years of experience. Proficient in React, Next.js, Node.js,
                and LLM integrations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
              >
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors"
                >
                  <GithubIcon size={14} />
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors"
                >
                  <LinkedinIcon size={14} />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors"
                >
                  <Mail size={14} />
                  Email
                </a>
              </motion.div>
            </div>

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="shrink-0"
            >
              <div className="relative h-18 w-18 sm:h-20 sm:w-20 rounded-full overflow-hidden ring-1 ring-border">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-6 text-sm"
          >
            <div>
              <span className="font-semibold text-text-primary">
                2+
              </span>
              <span className="text-text-muted ml-1.5">
                years experience
              </span>
            </div>
            <div>
              <span className="font-semibold text-text-primary">
                8+
              </span>
              <span className="text-text-muted ml-1.5">
                projects built
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="text-text-muted">
                Currently at
              </span>
              <span className="text-text-secondary ml-1.5 font-medium">
                {profile.company}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SELECTED WORK ===== */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Selected work
            </h2>
            <Link
              href="/projects"
              className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
            >
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== STACK ===== */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {taggedSkills.slice(0, 24).map(({ item, colors }) => (
              <span
                key={item}
                className="text-[11px] font-medium rounded-md px-2.5 py-1 transition-opacity hover:opacity-80"
                style={
                  colors
                    ? {
                        color: colors.color,
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                      }
                    : {
                        color: "var(--color-text-muted)",
                        border: "1px solid var(--color-border)",
                      }
                }
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-base font-semibold mb-2">Get in touch</h2>
          <p className="text-sm text-text-secondary mb-5 max-w-md leading-relaxed">
            I&apos;m open to full-time roles and freelance opportunities. If you
            have something interesting, let&apos;s talk.
          </p>
          <div className="flex items-center gap-3">
            <Button size="sm" asChild>
              <Link href="/contact">
                <Mail size={14} />
                Contact me
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={14} />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
