import type { FC } from "react";

interface StatusChipProps {
  text?: string;
  className?: string;
}

const StatusChip: FC<StatusChipProps> = ({ text = "Available for work", className = "" }) => {
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-mid)]/50 border border-[var(--border-color)] shadow-sm backdrop-blur-sm w-fit ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};

export default StatusChip;
