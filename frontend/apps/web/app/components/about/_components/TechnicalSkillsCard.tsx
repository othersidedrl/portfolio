import { useState } from "react";
import type { FC, KeyboardEvent, ReactNode } from "react";

type LevelStyle = {
  background: string;
  color: string;
};

export type TechnicalSkillsCardProps = {
  name: string;
  description: string;
  level: string;
  levelStyle: LevelStyle;
  icon?: ReactNode;
  yearOfExperience?: number;
  specialities?: string[];
};

const TechnicalSkillsCard: FC<TechnicalSkillsCardProps> = ({
  name,
  description,
  level,
  levelStyle,
  icon,
  yearOfExperience,
  specialities,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = (yearOfExperience && yearOfExperience > 0) || (specialities && specialities.length > 0);

  const toggleExpanded = () => setExpanded((prev) => !prev);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-mid)]/40 p-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:border-[var(--color-primary)]/50 hover:bg-[var(--bg-mid)]/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] backdrop-blur-sm`}
    >
      {/* Background Glow */}
      <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-[var(--color-primary)]/5 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />

      {/* Main Content */}
      <div className={`flex flex-col gap-3 transition-all duration-500 ${expanded ? "items-start text-left" : "items-center text-center"}`}>
        <div className={`flex w-full items-center gap-3 ${expanded ? "justify-between" : "justify-center"}`}>
          <div className="flex items-center gap-2.5 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
            {icon && (
              <span className="text-xl transition-transform duration-500 group-hover:scale-110">
                {icon}
              </span>
            )}
            <h4 className="text-lg font-black tracking-tight">{name}</h4>
          </div>

          {expanded && (
            <span
              className="rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-bold shadow-sm transition-all duration-300 ring-1 ring-inset"
              style={{
                backgroundColor: `${levelStyle.background}20`,
                color: levelStyle.color,
                boxShadow: `inset 0 0 10px ${levelStyle.background}40`,
                border: `1px solid ${levelStyle.background}40`
              }}
            >
              {level}
            </span>
          )}
        </div>

        <p className="text-sm font-medium leading-relaxed text-[var(--text-muted)] max-w-[280px]">
          {description}
        </p>

        {!expanded && (
          <span
            className="mt-1 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-bold shadow-sm transition-all duration-300"
            style={{
              backgroundColor: `${levelStyle.background}20`,
              color: levelStyle.color,
              border: `1px solid ${levelStyle.background}40`
            }}
          >
            {level}
          </span>
        )}
      </div>

      {/* Expandable Details */}
      {hasDetails && (
        <div
          className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${expanded ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-5 pt-2">
              {/* Stats Section */}
              {yearOfExperience && yearOfExperience > 0 && (
                <div className="flex gap-8 border-t border-[var(--border-color)]/30 pt-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-2xl font-black text-[var(--text-strong)] leading-none">
                      {yearOfExperience}+
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)]">
                      Years Exp.
                    </p>
                  </div>
                </div>
              )}

              {/* Specialities Section with Horizontal Slider */}
              {specialities && specialities.length > 0 && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)]">
                      Key Specialities
                    </p>
                    <span className="text-[10px] text-[var(--text-muted)] opacity-40 animate-pulse">Scroll →</span>
                  </div>

                  <div className="group/slider relative">
                    <div className="no-scrollbar mask-fade-right flex w-full gap-2 overflow-x-auto pb-2 focus:outline-none">
                      {specialities.map((item) => (
                        <span
                          key={item}
                          className="flex-shrink-0 rounded-xl border border-[var(--border-color)] bg-[var(--bg-mid)] px-4 py-2 text-xs font-bold text-[var(--text-normal)] transition-colors hover:border-[var(--color-primary)]/40 hover:bg-[var(--bg-light)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shine Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </article>
  );
};

export default TechnicalSkillsCard;
