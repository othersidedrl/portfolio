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
      className="group relative flex w-full flex-col items-center justify-center rounded-3xl border border-[var(--border-color)] bg-[var(--bg-mid)]/40 p-6 text-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:border-[var(--color-primary)]/50 hover:bg-[var(--bg-mid)]/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] backdrop-blur-sm overflow-hidden"
    >
      {/* Subtle background glow on hover */}
      <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-[var(--color-primary)]/5 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />

      <span className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-primary)] transition-transform duration-500 group-hover:scale-110">
        {title}
      </span>

      <span className="mt-2 text-xs md:text-sm font-bold uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-normal)] transition-colors duration-300">
        {description}
      </span>

      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default Card;
