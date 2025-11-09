import { GraduationCap, Info, Laptop } from "lucide-react";
import type { FC } from "react";

interface CareerJourneyCardProps {
  title: string;
  affiliation: string;
  description: string;
  location: string;
  type: string;
  startedAt: string;
  endedAt: string;
  isLast?: boolean;
}

const getOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDate = (value: string) => {
  if (!value) return "";
  const lower = value.toLowerCase();
  if (lower === "present" || lower === "current") return "Present";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

const CareerJourneyCard: FC<CareerJourneyCardProps> = ({
  title,
  affiliation,
  description,
  location,
  type,
  startedAt,
  endedAt,
  isLast = false,
}) => {
  const Icon = type === "Education" ? GraduationCap : Laptop;

  return (
    <article className="group flex min-h-[150px] gap-4">
      <div className="flex flex-col items-center">
        <div className="flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-[var(--secondary)] bg-white text-[var(--accent)] shadow-sm transition-all duration-300 ease-out hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-lg">
          <Icon size={20} />
        </div>
        {!isLast && (
          <div className="mt-2 h-full w-px bg-gradient-to-b from-[var(--secondary)]/70 via-[var(--secondary)]/30 to-transparent" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--background)]/80 px-5 py-4 shadow-sm backdrop-blur transition-all duration-300 ease-out  hover:border-[var(--primary)]/30 hover:bg-white/90 hover:shadow-lg">
        <div className="flex flex-wrap items-center justify-between text-sm text-[var(--text)]">
          <p className="text-sm font-semibold">
            {formatDate(startedAt)} — {formatDate(endedAt)}
          </p>
          <p className="text-sm text-[var(--text)]/70">{location}</p>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary)]">
                {title}
              </h3>
              <p className="text-sm text-[var(--accent)]">{affiliation}</p>
            </div>

            <div className="group/tooltip relative flex items-center justify-end">
              <button
                type="button"
                className="rounded-full border border-[var(--border-soft)] p-2 text-[var(--text)]/60 transition hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                aria-label="Show role details"
              >
                <Info size={16} />
              </button>
              <div className="pointer-events-none absolute right-full top-1/2 z-10 w-64 -translate-y-1/2 translate-x-3 opacity-0 transition-all duration-200 ease-out group-hover/tooltip:-translate-x-1 group-hover/tooltip:opacity-100 group-focus-within/tooltip:-translate-x-2 group-focus-within/tooltip:opacity-100">
                <div className="rounded-2xl border border-[var(--border-soft)] bg-white/95 p-4 text-xs text-[var(--text)] shadow-xl backdrop-blur">
                  {description}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-2 max-h-[72px] overflow-hidden text-sm text-[var(--text)]/75">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CareerJourneyCard;
