"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "~/components/shared/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { type Project } from "~/lib/data";

type ProjectCardProps = {
  project: Project;
  index?: number;
  className?: string;
};

export function ProjectCard({
  project,
  index = 0,
  className,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "group flex flex-col hover:border-border/80 transition-colors duration-200",
        className,
      )}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors duration-200">
            {project.name}
          </CardTitle>
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label={`${project.name} GitHub`}
              >
                <GithubIcon size={13} />
              </a>
            ) : (
              <span className="text-text-muted opacity-30 cursor-not-allowed">
                <GithubIcon size={13} />
              </span>
            )}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label={`${project.name} live site`}
              >
                <ExternalLink size={13} />
              </a>
            ) : (
              <span className="text-text-muted opacity-30 cursor-not-allowed">
                <ExternalLink size={13} />
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 px-4 pb-4 pt-0">
        <p className="text-xs leading-relaxed text-text-secondary mb-4 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono text-text-secondary border border-border rounded px-1.5 py-0.5"
            >
              {tech}
            </span>
          ))}
          {/* {project.tech.length > 5 && (
            <span className="text-[10px] font-mono text-text-muted border border-border rounded px-1.5 py-0.5">
              +{project.tech.length - 5}
            </span>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
