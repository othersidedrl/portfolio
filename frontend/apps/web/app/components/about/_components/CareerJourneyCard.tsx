import { GraduationCap, Laptop } from "lucide-react";
import type { FC } from "react";
import type { Careers } from "../types";

interface CareerJourneyCardProps extends Careers {
  isLast?: boolean;
}

const formatDate = (value: string) => {
  if (!value) return "";
  const lower = value.toLowerCase();
  if (lower === "present" || lower === "current") return "Present";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${month} ${year}`;
};

const CareerJourneyCard: FC<CareerJourneyCardProps> = ({
  title,
  affiliation,
  description,
  location,
  type,
  started_at,
  ended_at,
  isLast = false,
}) => {
  const Icon = type === "Education" ? GraduationCap : Laptop;

  return (
    <article className="group flex gap-4 transition-all duration-500">
      {/* Timeline Section */}
      <div className="flex flex-col items-center">
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-mid)]/60 text-[var(--text-strong)] shadow-sm backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-[var(--color-primary)]/50 group-hover:text-[var(--color-primary)]"
        >
          <div className="absolute inset-0 rounded-xl bg-[var(--color-primary)]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <Icon size={18} className="relative z-10 transition-transform duration-500 group-hover:scale-110" />
        </div>

        {!isLast && (
          <div className="mt-3 flex-1 w-px bg-gradient-to-b from-[var(--border-color)]/60 via-[var(--border-color)]/20 to-transparent" />
        )}
      </div>

      {/* Card Content */}
      <div
        className="relative flex-1 flex flex-col gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-mid)]/40 p-4 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--bg-mid)]/70 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        {/* Shine Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        {/* Header: Date & Location */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)]">
            {formatDate(started_at)} — {formatDate(ended_at)}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] opacity-60">
            {location}
          </span>
        </div>

        {/* Body: Title & Affiliation */}
        <div className="space-y-0.5">
          <h3 className="text-base font-black tracking-tight text-[var(--text-strong)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs font-bold text-[var(--text-muted)] tracking-wide">
            {affiliation}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs font-medium leading-relaxed text-[var(--text-normal)] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
      </div>
    </article>
  );
};

export default CareerJourneyCard;
