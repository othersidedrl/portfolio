"use client";

import ProjectItems from "./_components/ProjectItems";
import ProjectPageForm from "./_components/ProjectPageForm";

const ProjectPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-[var(--text-strong)]">Projects</h1>
        <p className="text-[var(--text-muted)] font-medium mt-1">
          Manage your portfolio projects, their metadata, and featured work.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-4 sticky top-24">
          <ProjectPageForm />
        </div>
        <div className="xl:col-span-8">
          <ProjectItems />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
