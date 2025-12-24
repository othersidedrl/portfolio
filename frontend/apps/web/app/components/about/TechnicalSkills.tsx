import { useEffect, useMemo, useState } from "react";
import {
  LayersIcon,
  MonitorSmartphoneIcon,
  ServerIcon,
  SettingsIcon,
} from "lucide-react";
import TechnicalSkillsCard from "./_components/TechnicalSkillsCard";
import axios from "~lib/axios";
import { useQuery } from "@tanstack/react-query";
import { SkillsResponse } from "./types";

type CategoryId = "all" | "backend" | "frontend" | "other";
type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";
type Skill = {
  id: number;
  name: string;
  description: string;
  level: SkillLevel;
  category: CategoryId;
  stats: { label: string; value: string }[];
  specialities: string[];
};

const PAGE_SIZE = 6;

const categories: {
  id: CategoryId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconSize?: number;
}[] = [
    { id: "all", label: "All", icon: LayersIcon, iconSize: 18 },
    { id: "backend", label: "Backend", icon: ServerIcon, iconSize: 18 },
    { id: "frontend", label: "Frontend", icon: MonitorSmartphoneIcon, iconSize: 18 },
    { id: "other", label: "Other Technologies", icon: SettingsIcon, iconSize: 18 },
  ];

const LevelColors: Record<SkillLevel, { background: string; color: string }> = {
  Beginner: {
    background: "var(--level-beginner-bg)",
    color: "var(--level-beginner-text)",
  },
  Intermediate: {
    background: "var(--level-intermediate-bg)",
    color: "var(--level-intermediate-text)",
  },
  Advanced: {
    background: "var(--level-advanced-bg)",
    color: "var(--level-advanced-text)",
  },
  Expert: {
    background: "var(--level-expert-bg)",
    color: "var(--level-expert-text)",
  },
};

export const TechnicalSkills = () => {
  const { data: SkillsData } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await axios.get("/about/skills");
      return response.data as SkillsResponse;
    },
  });

  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [page, setPage] = useState(0);

  const filteredSkills = useMemo(() => {
    if (!SkillsData?.data) return [];
    if (activeCategory === "all") return SkillsData.data;
    return SkillsData.data.filter((skill) => skill.category.toLowerCase() === activeCategory);
  }, [activeCategory, SkillsData]);

  const totalPages = Math.max(1, Math.ceil((filteredSkills.length || 0) / PAGE_SIZE));

  useEffect(() => {
    setPage(0);
  }, [activeCategory]);

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(Math.max(0, totalPages - 1));
    }
  }, [page, totalPages]);

  const sliceStart = page * PAGE_SIZE;
  const visibleSkills = filteredSkills?.slice(
    sliceStart,
    sliceStart + PAGE_SIZE
  );

  const hasNext = page < totalPages - 1;
  const hasPrev = page > 0;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex w-full flex-wrap items-center gap-2 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-mid)]/60 p-2 shadow-[0_12px_24px_var(--shadow-color)]">
        {categories.map(({ id, label, icon: Icon }) => {
          const isActive = activeCategory === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveCategory(id)}
              className={`group/tab relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] border px-5 py-2 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 whitespace-nowrap ${isActive
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm"
                : "border-transparent text-[var(--text-normal)] hover:border-[var(--color-primary)]/35 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
                }`}
              aria-pressed={isActive}
            >
              <Icon
                size={18}
                className={`transition-all duration-200 ${isActive
                  ? "text-[var(--color-on-primary)] scale-105"
                  : "text-[var(--text-normal)] group-hover/tab:scale-110 group-hover/tab:text-[var(--color-primary)]"
                  }`}
              />
              <span
                className={`transition-colors duration-200 ${isActive
                  ? "text-[var(--color-on-primary)]"
                  : "text-[var(--text-normal)] group-hover/tab:text-[var(--color-primary)]"
                  }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visibleSkills && visibleSkills.length > 0 ? (
          visibleSkills.map((skill) => (
            <TechnicalSkillsCard
              key={skill.id}
              name={skill.name}
              description={skill.description}
              level={skill.level}
              levelStyle={LevelColors[skill.level as SkillLevel]}
              yearOfExperience={skill.year_of_experience}
              specialities={skill.specialities}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-8 rounded-3xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-mid)]/30 backdrop-blur-sm group transition-all duration-500">
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative animate-[spin_4s_linear_infinite]">
                <SettingsIcon size={48} className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-2">Downloading Knowledge...</h3>
            <p className="text-[var(--text-muted)] text-center max-w-sm leading-relaxed">
              {"My brain is currently downloading more technical skills. Check back soon to see the latest tools in my arsenal!"}
            </p>
          </div>
        )}
      </div>

      {filteredSkills && filteredSkills.length > PAGE_SIZE && (
        <div className="mt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={!hasPrev}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 ${hasPrev
              ? "cursor-pointer border-[var(--border-color)] text-[var(--text-normal)] hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] hover:shadow-md"
              : "cursor-not-allowed border-transparent text-[var(--text-muted)]"
              }`}
          >
            Previous
          </button>
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            Page {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={!hasNext}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 ${hasNext
              ? "cursor-pointer border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105"
              : "cursor-not-allowed border-transparent bg-[var(--bg-mid)] text-[var(--text-muted)]"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};
