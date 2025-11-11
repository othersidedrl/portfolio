import { useMemo, useState } from "react";
import type { FC, KeyboardEvent, ReactNode } from "react";

type LevelStyle = {
  background: string;
  color: string;
};

type Stat = {
  label: string;
  value: string;
};

export type TechnicalSkillsCardProps = {
  name: string;
  description: string;
  level: string;
  levelStyle: LevelStyle;
  icon?: ReactNode;
  stats?: Stat[];
  specialities?: string[];
};

const TechnicalSkillsCard: FC<TechnicalSkillsCardProps> = ({
  name,
  description,
  level,
  levelStyle,
  icon,
  stats,
  specialities,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasDetails =
    (stats && stats.length > 0) || (specialities && specialities.length > 0);
  const detailMaxHeight = useMemo(
    () =>
      (stats?.length ?? 0) * 120 + (specialities?.length ?? 0) * 16 + 120 + "px",
    [stats, specialities]
  );

  const toggleExpanded = () => setExpanded((prev) => !prev);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  };

  const articleLayout = expanded
    ? "items-start text-left gap-4 justify-start"
    : "items-center text-center gap-3 justify-center";
  const summaryLayout = expanded
    ? "items-start text-left gap-3"
    : "items-center text-center gap-2";

  return (
    <article
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
      className={`group flex cursor-pointer flex-col ${articleLayout} rounded-[20px] border bg-[var(--bg-mid)] px-6 py-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-primary)]/35 hover:bg-[var(--bg-light)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2`}
      style={{
        borderColor: "var(--border-color)",
        boxShadow: "0 16px 28px var(--shadow-color)",
      }}
    >
      <div
        className={`flex w-full flex-col ${summaryLayout}`}
      >
        <div
          className={`flex w-full flex-wrap items-center gap-2 text-[var(--text-normal)] ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-2 text-[var(--text-normal)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
            {icon && (
              <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                {icon}
              </span>
            )}
            <h4 className="text-lg font-semibold">{name}</h4>
          </div>

          {expanded && (
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition-all duration-300 group-hover:shadow-md"
              style={{
                backgroundColor: levelStyle.background,
                color: levelStyle.color,
              }}
            >
              {level}
            </span>
          )}
        </div>

        <p className="text-sm text-[var(--text-muted)]">{description}</p>

        {!expanded && (
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition-all duration-300 group-hover:shadow-md"
            style={{
              backgroundColor: levelStyle.background,
              color: levelStyle.color,
            }}
          >
            {level}
          </span>
        )}
      </div>

      {hasDetails && (
        <div
          className={`w-full overflow-hidden transition-[max-height] duration-400 ease-in-out ${
            expanded ? "mt-1 opacity-100" : "-mt-2 max-h-0 opacity-0"
          }`}
          style={{ maxHeight: expanded ? detailMaxHeight : 0 }}
          aria-hidden={!expanded}
        >
          <div
            className={`flex w-full flex-col gap-4 pt-2 transition-opacity duration-300 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            {stats && stats.length > 0 && (
              <div className="flex w-full justify-around gap-6 text-[var(--text-normal)]">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center gap-1 text-center"
                  >
                    <p className="text-2xl font-semibold text-[var(--text-strong)]">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {specialities && specialities.length > 0 && (
              <div className="flex w-full flex-col gap-3">
                <hr className="w-full border-t border-[var(--border-color)]/60" />
                <p className="text-sm font-semibold text-[var(--text-normal)]">
                  Key Specialities
                </p>
                <div className="flex flex-wrap gap-2">
                  {specialities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border bg-[var(--bg-light)]/60 px-3 py-1 text-xs font-medium text-[var(--text-normal)]"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default TechnicalSkillsCard;
