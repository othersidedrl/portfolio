"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "~lib/axios";
import ProjectCards from "./ProjectCard";
import { ProjectItemResponse, ProjectPageResponse } from "./types";

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
                    <h1 className="text-[36px] font-semibold text-[var(--text-strong)]">{pageData?.title || 'Projects'}</h1>
                    <div className="h-[2px] w-[80px] rounded-full bg-[var(--border-color)]" />
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="h-6 w-64 bg-[var(--background-muted)] rounded" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-[400px] w-full bg-[var(--background-muted)] rounded-2xl animate-pulse" />
                    ))}
                </div>
            </section>
        );
    }

    if (projectsData) {
        return (
            <section className="w-full text-[var(--text-normal)] py-12">
                <div className="mx-auto flex flex-col items-center gap-6 text-center mb-12">
                    <h1 className="text-[36px] font-semibold text-[var(--text-strong)]">{pageData?.title || 'Projects'}</h1>
                    <div className="h-[2px] w-[80px] rounded-full bg-[var(--border-color)]" />
                    <p className="w-[80%] text-[20px] text-[var(--text-muted)]">
                        {pageData?.description || 'From backend systems to full-stack applications, these are the projects where I delivered real-world impact through code.'}
                    </p>
                </div>

                {projectsData && <ProjectCards projects={projectsData} />}
                {/* <ProjectCards projects={PROJECT_ITEMS.projects} /> */}
            </section>
        );
    }
    return null;
}
