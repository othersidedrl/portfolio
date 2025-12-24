import { ChevronUp, Code2, ExternalLink, Github, Monitor, Smartphone } from "lucide-react";
import Image from "next/image";
import React from "react";
import type { ProjectItemResponse } from "./types";

interface ProjectCardProps {
  project: ProjectItemResponse;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [showTechStack, setShowTechStack] = React.useState(false);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--background-secondary)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Top Image Section */}
      <div className="relative h-[240px] w-full overflow-hidden bg-[var(--background-muted)]">
        {/* Background Image */}
        {project.imageUrls?.[0] && (
          <Image
            src={project.imageUrls[0]}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium transition-transform hover:scale-105"
          >
            <Github size={20} />
            Code
          </a>
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white text-black rounded-lg transition-transform hover:scale-105"
          >
            <ExternalLink size={20} />
          </a>
        </div>

        {/* Status indicator dot top-left */}
        <div className="absolute top-4 left-4">
          <div className="w-3 h-3 rounded-full bg-[#1AD321] shadow-[0px_0px_8px_0px_#1AD321] animate-pulse" />
        </div>

        {/* Type Badge top-right */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-black rounded-lg text-sm font-medium border border-[var(--border-color)]">
          {project.type.toLowerCase().includes("mobile") ? (
            <Smartphone size={16} />
          ) : (
            <Monitor size={16} />
          )}
          {project.type}
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-[var(--text-strong)]">{project.name}</h3>
            <div className="w-2.5 h-2.5 rounded-full bg-[#1AD321]" />
          </div>

          <button
            type="button"
            onClick={() => setShowTechStack(!showTechStack)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] text-sm font-medium text-[var(--text-normal)] hover:bg-[var(--background-muted)] transition-all active:scale-95"
          >
            <Code2 size={16} />
            Tech Stack
            <ChevronUp
              size={16}
              className={`ml-1 transition-transform duration-300 ${showTechStack ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        <p className="text-[var(--text-muted)] line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Expanded */}
        {showTechStack && (
          <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-[var(--background-muted)] text-[var(--text-normal)] rounded-full border border-[var(--border-color)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ProjectCardsProps {
  projects: ProjectItemResponse[];
}

export default function ProjectCards({ projects }: ProjectCardsProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)]">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
