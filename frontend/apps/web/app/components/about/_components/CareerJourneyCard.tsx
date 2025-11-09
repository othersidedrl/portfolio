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
    <article className="group flex min-h-[150px] cursor-pointer gap-4">
      <div className="flex flex-col items-center">
        <div className="flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-light)] text-[var(--text-strong)] transition-all duration-300 ease-out group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] group-hover:translate-y-2">
          <Icon size={20} />
        </div>
        {!isLast && (
          <div className="mt-2 h-full w-px bg-gradient-to-b from-[var(--border-color)]/70 via-[var(--border-color)]/30 to-transparent" />
        )}
      </div>

      <div
        className="flex flex-1 flex-col gap-3 rounded-2xl border bg-[var(--bg-mid)] px-5 py-4 shadow-[0_14px_28px_var(--shadow-color)] backdrop-blur transition-all duration-300 ease-out hover:border-[var(--color-primary)]/35 hover:bg-[var(--bg-light)] hover:shadow-[0_18px_36px_var(--shadow-color-strong)]"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="flex flex-wrap items-center justify-between text-sm text-[var(--text-normal)]">
          <p className="text-sm font-semibold">
            {formatDate(startedAt)} - {formatDate(endedAt)}
          </p>
          <p className="text-sm text-[var(--text-muted)]">{location}</p>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                {title}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">{affiliation}</p>
            </div>

            <div className="group/tooltip relative flex items-center justify-end">
              <button
                type="button"
                className="rounded-full border border-[var(--border-color)] bg-[var(--bg-light)]/70 p-2 text-[var(--text-normal)]/70 transition hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                aria-label="Show role details"
              >
                <Info size={16} />
              </button>
              <div className="pointer-events-none absolute right-full top-1/2 z-10 w-64 -translate-y-1/2 translate-x-3 opacity-0 transition-all duration-200 ease-out group-hover/tooltip:-translate-x-1 group-hover/tooltip:opacity-100 group-focus-within/tooltip:-translate-x-2 group-focus-within/tooltip:opacity-100">
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-light)] p-4 text-xs text-[var(--text-normal)] shadow-[0_10px_25px_var(--shadow-color)] backdrop-blur">
                  {description}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-2 max-h-[72px] overflow-hidden text-sm text-[var(--text-muted)]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CareerJourneyCard;
