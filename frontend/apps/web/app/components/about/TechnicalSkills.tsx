import { useEffect, useMemo, useState } from "react";
import {
  LayersIcon,
  MonitorSmartphoneIcon,
  ServerIcon,
  SettingsIcon,
} from "lucide-react";
import TechnicalSkillsCard from "./_components/TechnicalSkillsCard";

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
  Beginner: { background: "#D6F4E0", color: "#0F5C2A" },
  Intermediate: { background: "#FFF3BF", color: "#8A6D00" },
  Advanced: { background: "#F2F2F2", color: "#525252" },
  Expert: { background: "#D6E4FF", color: "#0D3F91" },
};

const SKILLS: Skill[] = [
  {
    id: 1,
    name: "Golang",
    description: "Building server-side APIs & services.",
    level: "Expert",
    category: "backend",
    stats: [
      { label: "Years", value: "2+" },
      { label: "Projects", value: "7" },
    ],
    specialities: ["Authentication", "APIs", "Goroutines"],
  },
  {
    id: 2,
    name: "Node.js",
    description: "Event-driven backends and queue workers.",
    level: "Advanced",
    category: "backend",
    stats: [
      { label: "Years", value: "3+" },
      { label: "Projects", value: "10" },
    ],
    specialities: ["Sockets", "Queues", "Workers"],
  },
  {
    id: 3,
    name: "NestJS",
    description: "Opinionated framework on top of Node.",
    level: "Advanced",
    category: "backend",
    stats: [
      { label: "Years", value: "2+" },
      { label: "Projects", value: "6" },
    ],
    specialities: ["DI", "GraphQL", "Microservices"],
  },
  {
    id: 4,
    name: "Rust",
    description: "Systems programming with fearless concurrency.",
    level: "Intermediate",
    category: "backend",
    stats: [
      { label: "Years", value: "1+" },
      { label: "Projects", value: "3" },
    ],
    specialities: ["Actix", "Tokio", "Wasm"],
  },
  {
    id: 5,
    name: "React",
    description: "Interactive user interfaces.",
    level: "Intermediate",
    category: "frontend",
    stats: [
      { label: "Years", value: "2+" },
      { label: "Projects", value: "8" },
    ],
    specialities: ["Hooks", "Testing", "State Mgmt"],
  },
  {
    id: 6,
    name: "Next.js",
    description: "Server-first React applications.",
    level: "Advanced",
    category: "frontend",
    stats: [
      { label: "Years", value: "2+" },
      { label: "Projects", value: "7" },
    ],
    specialities: ["SSR", "ISR", "Routing"],
  },
  {
    id: 7,
    name: "TypeScript",
    description: "Typed DX for scalable apps.",
    level: "Advanced",
    category: "frontend",
    stats: [
      { label: "Years", value: "3+" },
      { label: "Projects", value: "12" },
    ],
    specialities: ["Generics", "Tooling", "Monorepo"],
  },
  {
    id: 8,
    name: "Tailwind CSS",
    description: "Utility-first styling systems.",
    level: "Advanced",
    category: "frontend",
    stats: [
      { label: "Years", value: "2+" },
      { label: "Projects", value: "9" },
    ],
    specialities: ["Design Systems", "Dark Mode", "Theming"],
  },
  {
    id: 9,
    name: "Redis",
    description: "Caching, pub/sub, & queues.",
    level: "Advanced",
    category: "other",
    stats: [
      { label: "Years", value: "2+" },
      { label: "Projects", value: "6" },
    ],
    specialities: ["Caching", "Streams", "Locks"],
  },
  {
    id: 10,
    name: "Docker",
    description: "Containerized development workflows.",
    level: "Intermediate",
    category: "other",
    stats: [
      { label: "Years", value: "3+" },
      { label: "Projects", value: "11" },
    ],
    specialities: ["Compose", "Images", "Registries"],
  },
  {
    id: 11,
    name: "PostgreSQL",
    description: "Relational database design & ops.",
    level: "Advanced",
    category: "other",
    stats: [
      { label: "Years", value: "4+" },
      { label: "Projects", value: "12" },
    ],
    specialities: ["Indexes", "PL/pgSQL", "Replication"],
  },
  {
    id: 12,
    name: "AWS",
    description: "Cloud infrastructure & automation.",
    level: "Intermediate",
    category: "other",
    stats: [
      { label: "Years", value: "3+" },
      { label: "Projects", value: "8" },
    ],
    specialities: ["Lambda", "S3", "CloudWatch"],
  },
];

export const TechnicalSkills = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [page, setPage] = useState(0);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return SKILLS;
    return SKILLS.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredSkills.length / PAGE_SIZE));

  useEffect(() => {
    setPage(0);
  }, [activeCategory]);

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(Math.max(0, totalPages - 1));
    }
  }, [page, totalPages]);

  const sliceStart = page * PAGE_SIZE;
  const visibleSkills = filteredSkills.slice(
    sliceStart,
    sliceStart + PAGE_SIZE
  );

  const hasNext = page < totalPages - 1;
  const hasPrev = page > 0;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex w-full flex-wrap items-center gap-2 rounded-[10px] border border-[var(--border-soft)] p-2 shadow-sm">
        {categories.map(({ id, label, icon: Icon }) => {
          const isActive = activeCategory === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveCategory(id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-[5px] border px-5 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-transparent text-[var(--text)] hover:border-[var(--border-soft)]"
              }`}
              aria-pressed={isActive}
            >
              <Icon
                size={18}
                className={
                  isActive
                    ? "text-white transition-colors"
                    : "text-[var(--text)] transition-colors"
                }
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visibleSkills.map((skill) => (
          <TechnicalSkillsCard
            key={skill.id}
            name={skill.name}
            description={skill.description}
            level={skill.level}
            levelStyle={LevelColors[skill.level]}
            stats={skill.stats}
            specialities={skill.specialities}
          />
        ))}
      </div>

      {filteredSkills.length > PAGE_SIZE && (
        <div className="mt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={!hasPrev}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              hasPrev
                ? "border-[var(--border-soft)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                : "cursor-not-allowed border-transparent text-[var(--text)]/40"
            }`}
          >
            Previous
          </button>
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text)]/60">
            Page {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={!hasNext}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              hasNext
                ? "border-[var(--primary)] bg-[var(--primary)] text-white hover:brightness-95"
                : "cursor-not-allowed border-transparent bg-[var(--text)]/10 text-white/60"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};
