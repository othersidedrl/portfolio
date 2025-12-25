import { Quote, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import type { Testimonial } from "./types";

interface TestimonyCardProps extends Testimonial { }

const cleanSummary = (text: string) => {
  if (!text) return "";
  // Removes <s>, </s> and any other variations of these tokens globally
  return text.replace(/<\/?[sS]>/g, "").trim();
};

export const TestimonyCard: FC<TestimonyCardProps> = ({
  name,
  profile_url,
  affiliation,
  rating,
  description,
  ai_summary,
}) => {
  const sanitizedSummary = cleanSummary(ai_summary);

  return (
    <div className="group relative bg-[#111] rounded-[2rem] p-8 md:p-12 mb-12 border border-white/5 transition-all duration-500 hover:border-[var(--color-primary)]/30 hover:shadow-2xl hover:shadow-[var(--color-primary)]/5">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-[var(--color-primary)]/5 blur-[80px] group-hover:bg-[var(--color-primary)]/10 transition-colors" />

      <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-center md:items-stretch">
        {/* Left Side: Identity */}
        <div className="flex flex-col items-center justify-center shrink-0 md:border-r border-white/5 md:pr-14">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl relative z-10">
              <Image
                src={profile_url || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                alt={name}
                fill
                className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Avatar Aura */}
            <div className="absolute inset-0 rounded-full bg-[var(--color-primary)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-white tracking-tight">{name}</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">
              {affiliation}
            </p>
          </div>

          <div className="flex gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                key={`star-rating-${i}`}
                fill={i < rating ? "currentColor" : "none"}
                size={12}
                className={i < rating ? "text-amber-500" : "text-white/10"}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Narrative */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div className="relative">
            <Quote
              className="absolute -top-6 -left-6 text-[var(--color-primary)] opacity-10"
              size={64}
            />
            <p className="text-zinc-200 text-lg md:text-xl font-medium italic leading-relaxed relative z-10 text-center md:text-left">
              “{description}”
            </p>
          </div>

          {/* Premium AI Summary Component */}
          <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 p-5 transition-all group-hover:bg-white/[0.05]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] shrink-0 border border-[var(--color-primary)]/20">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-primary)] block">
                  AI-Powered Digest
                </span>
                <p className="text-sm font-bold text-zinc-100 leading-snug">{sanitizedSummary}</p>
              </div>
            </div>

            {/* Subtle decorative glow */}
            <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-[var(--color-primary)]/10 blur-2xl rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
