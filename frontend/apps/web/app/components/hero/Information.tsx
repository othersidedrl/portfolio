import { Paperclip, Send } from "lucide-react";
import type { FC } from "react";
import StatusChip from "../ui/StatusChip";
import CodeSnippet from "./CodeSnippet";

interface InformationProps {
  name?: string;
  rank?: string;
  title?: string;
  subtitle?: string;
  resume_link?: string;
  contact_link?: string;
}

const Information: FC<InformationProps> = ({
  name = "Darel",
  rank = "Junior",
  title = "Software Engineer",
  subtitle = "Darel's Portfolio",
  resume_link = "",
  contact_link = "",
}) => {
  return (
    <div className="flex flex-col text-[var(--text)] font-poppins relative">
      {/* Availability Badge */}
      <div className="mb-6 animate-in fade-in duration-1000">
        <StatusChip />
      </div>

      <div className="space-y-2">
        <h1
          className="text-5xl md:text-6xl font-black leading-tight m-0 animate-in fade-in duration-700 delay-100"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "var(--color-primary)",
            textShadow: "0 0 20px var(--color-primary-light)/20",
          }}
        >
          Hello, I'm <span className="text-[var(--text-strong)] stroke-none">{name}</span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold leading-tight flex items-center gap-3 animate-in fade-in duration-700 delay-200">
          <span className="text-[var(--text-normal)] opacity-80">{rank}</span>
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-purple-500 bg-clip-text text-transparent animate-gradient-x">
            {title}
          </span>
        </h2>

        <h3 className="text-base md:text-lg font-medium text-[var(--text-muted)] max-w-lg leading-relaxed animate-in fade-in duration-700 delay-300">
          {subtitle}
        </h3>
      </div>

      {/* Button Group */}
      <div className="flex flex-wrap gap-4 mt-8 animate-in fade-in duration-1000 delay-500">
        {/* Resume Button */}
        <a
          href={resume_link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-2.5 bg-[var(--bg-mid)]/40 hover:bg-[var(--bg-mid)]/60 text-[var(--text-strong)] py-3 px-6 rounded-2xl border border-[var(--border-color)] font-semibold text-sm transition-all duration-300 backdrop-blur-md shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <Paperclip
            size={18}
            className="text-[var(--color-primary)] transition-transform group-hover:-rotate-12"
          />
          <span>View Resume</span>
        </a>

        {/* Contact Button */}
        <a
          href={contact_link}
          className="group relative flex items-center justify-center gap-2.5 bg-[var(--color-primary)] text-white py-3 px-8 rounded-2xl font-bold text-sm shadow-[0_10px_20px_rgba(var(--color-primary-rgb),0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(var(--color-primary-rgb),0.4)] overflow-hidden"
        >
          {/* Shine Effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />

          <span>Contact Me</span>
          <Send
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <div className="mt-10 w-full max-w-md animate-in fade-in duration-1000 delay-700">
        <div className="p-1 rounded-3xl bg-gradient-to-br from-[var(--border-color)] to-transparent">
          <div className="rounded-[calc(1.5rem-1px)] overflow-hidden bg-[var(--bg-mid)]/50 backdrop-blur-sm">
            <CodeSnippet />
          </div>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};

export default Information;
