"use client";

import { useQuery } from "@tanstack/react-query";
import { Code2 } from "lucide-react";
import axios from "~lib/axios";
import ProjectCards from "./ProjectCard";
import type { ProjectItemResponse, ProjectPageResponse } from "./types";

export default function ProjectSection() {
  const { data: pageData } = useQuery<ProjectPageResponse>({
    queryKey: ["project-page"],
    queryFn: async () => {
      const response = await axios.get("/project");
      return response.data;
    },
  });

  const { data: projectsData, isLoading: itemsLoading } = useQuery({
    queryKey: ["project-items"],
    queryFn: async () => {
      const response = await axios.get("/project/items");
      return response.data.data as ProjectItemResponse[];
    },
  });

  if (itemsLoading) {
    return (
      <section className="w-full text-[var(--text-normal)] py-12">
        <div className="mx-auto flex flex-col items-center gap-6 text-center mb-12">
          <h1 className="text-[36px] font-semibold text-[var(--text-strong)]">
            {pageData?.title || "Projects"}
          </h1>
          <div className="h-[2px] w-[80px] rounded-full bg-[var(--border-color)]" />
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-6 w-64 bg-[var(--background-muted)] rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-[400px] w-full bg-[var(--background-muted)] rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full text-[var(--text-normal)] py-12">
      <div className="mx-auto flex flex-col items-center gap-6 text-center mb-12">
        <h1 className="text-[36px] font-semibold text-[var(--text-strong)]">
          {pageData?.title || "Projects"}
        </h1>
        <div className="h-[2px] w-[80px] rounded-full bg-[var(--border-color)]" />
        <p className="w-[80%] text-[20px] text-[var(--text-muted)]">
          {pageData?.description ||
            "From backend systems to full-stack applications, these are the projects where I delivered real-world impact through code."}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {projectsData && projectsData.length > 0 ? (
          <ProjectCards projects={projectsData} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-8 rounded-3xl border-2 border-dashed border-[var(--border-color)] bg-[var(--background-secondary)]/50 backdrop-blur-sm group hover:border-[var(--text-muted)] transition-colors duration-500 max-w-4xl mx-auto">
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
              <Code2 size={48} className="text-[var(--text-strong)] relative" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-2">No projects found</h3>
            <p className="text-[var(--text-muted)] text-center max-w-md leading-relaxed">
              {
                "I'm currently working on some exciting projects. Stay tuned for more updates as I continue to build and deploy new applications!"
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
