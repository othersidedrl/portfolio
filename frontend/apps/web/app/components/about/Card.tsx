import type { FC } from "react";

type CardProps = {
  title?: string;
  description?: string;
};

const Card: FC<CardProps> = ({
  title = "2+",
  description = "Years of Experience",
}) => {
  return (
    <div
      className="flex min-h-[120px] min-w-[180px] shadow-sm flex-col items-center justify-center rounded-[20px] border bg-[var(--background)] px-20 py-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--primary)]/30 hover:bg-white/95 hover:shadow-xl"
      style={{ borderColor: "var(--border-soft)" }}
    >
      <span className="text-[48px] font-semibold leading-none text-[var(--primary)]">
        {title}
      </span>
      <span className="mt-3 text-[16px] font-medium text-[var(--text)] opacity-70">
        {description}
      </span>
    </div>
  );
};

export default Card;
