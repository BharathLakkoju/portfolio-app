import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Building2, Calendar } from "lucide-react";
import {
  AnimatedSection,
  StaggerChildren,
} from "~/components/shared/AnimatedSection";
import { SkillCard } from "~/components/shared/SkillCard";
import { profile, skills, experience, education } from "~/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${profile.name} — Full Stack Developer and AI Engineer.`,
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-14">
        {/* ── Intro ── */}
        <AnimatedSection>
          <div className="flex items-start gap-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-1">{profile.name}</h1>
              <p className="text-sm text-text-secondary mb-3">
                {profile.title}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 size={11} />
                  {profile.company}
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Bio ── */}
        <AnimatedSection delay={0.05}>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed border-t border-border pt-10">
            <p>
              Full Stack Developer and AI Engineer currently at{" "}
              <span className="text-text-primary">
                UST Global
              </span>{" "}
              in Hyderabad. I specialise in building production-grade web
              applications using the modern JavaScript ecosystem.
            </p>
            <p>
              My work spans microservices architectures, SaaS platforms, and
              AI-integrated tools. I care about performance, developer
              experience, and shipping things that work at scale.
            </p>
            <p>
              Open-source side projects:{" "}
              <span className="text-text-primary">
                GitProfolio
              </span>
              ,{" "}
              <span className="text-text-primary">
                SwiftMedia
              </span>
              , and{" "}
              <span className="text-text-primary">
                ATS Precision
              </span>
              .
            </p>
          </div>
        </AnimatedSection>

        {/* ── Skills ── */}
        <AnimatedSection delay={0.05}>
          <div className="border-t border-border pt-10">
            <p className="text-[10px] uppercase tracking-widest text-text-muted mb-6">
              Stack
            </p>
            <StaggerChildren
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              staggerDelay={0.06}
            >
              {skills.map((cat) => (
                <SkillCard key={cat.category} cat={cat} />
              ))}
            </StaggerChildren>
          </div>
        </AnimatedSection>

        {/* ── Experience ── */}
        <AnimatedSection delay={0.05}>
          <div className="border-t border-border pt-10">
            <p className="text-[10px] uppercase tracking-widest text-text-muted mb-6">
              Experience
            </p>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="rounded-lg border border-border bg-surface p-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">
                          {exp.title}
                        </p>
                        <p className="text-xs text-accent">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col gap-0.5 text-[10px] text-text-muted sm:text-right">
                        <span className="flex items-center gap-1 sm:justify-end">
                          <Calendar size={10} />
                          {exp.dates}
                        </span>
                        <span className="flex items-center gap-1 sm:justify-end">
                          <MapPin size={10} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-xs text-text-secondary leading-relaxed"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Education ── */}
        <AnimatedSection delay={0.05}>
          <div className="border-t border-border pt-10 pb-4">
            <p className="text-[10px] uppercase tracking-widest text-text-muted mb-6">
              Education
            </p>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="rounded-lg border border-border bg-surface p-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-accent">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="text-[10px] text-text-muted sm:text-right">
                        <div>{edu.year}</div>
                        <div className="font-medium text-text-primary">
                          GPA: {edu.gpa}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
