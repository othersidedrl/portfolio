'use client';

import { ChevronDown, ChevronUp, Rocket } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CareerJourneyCard from "./_components/CareerJourneyCard";
import { useQuery } from "@tanstack/react-query";
import axios from "~lib/axios";
import { CareersRepsonse } from "./types";

const DEFAULT_HIGHLIGHT_SIZE = 3;

export const CareerJourney = () => {
  const { data: CareerData } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const response = await axios.get("/about/careers");
      return response.data as CareersRepsonse;
    },
  });

  const sortedJourney = useMemo(
    () =>
      [...CareerData?.data || []].sort(
        (a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
      ),
    [CareerData?.data]
  );

  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const [activeStart, setActiveStart] = useState(0);

  // If we have 4 or fewer items, show them all, otherwise show the highlight size
  const highlightSize = sortedJourney.length <= 3 ? sortedJourney.length : DEFAULT_HIGHLIGHT_SIZE;
  const isScrollable = sortedJourney.length > 3;
  const maxStart = Math.max(0, sortedJourney.length - highlightSize);

  const goToStart = useCallback(
    (nextStart: number) => {
      if (!isScrollable) return;
      const clamped = Math.max(0, Math.min(nextStart, maxStart));
      setActiveStart(clamped);
    },
    [maxStart, isScrollable]
  );

  const updateHighlight = useCallback(
    (startValue: number) => {
      if (!isScrollable) return;

      const highlight = highlightRef.current;
      if (!highlight) return;

      const startIdx = startValue;
      const endIdx = Math.min(
        startValue + highlightSize - 1,
        sortedJourney.length - 1
      );

      const startBtn = dotRefs.current[startIdx];
      const endBtn = dotRefs.current[endIdx];

      if (!startBtn || !endBtn) return;

      const top = startBtn.offsetTop;
      const height = (endBtn.offsetTop + endBtn.offsetHeight) - top;

      highlight.style.transform = `translateY(${top - 4}px)`;
      highlight.style.height = `${height + 8}px`;
      highlight.style.opacity = "1";
    },
    [sortedJourney.length, highlightSize, isScrollable]
  );

  useEffect(() => {
    updateHighlight(activeStart);
  }, [activeStart, updateHighlight]);

  const visibleJourney = isScrollable
    ? sortedJourney.slice(activeStart, activeStart + highlightSize)
    : sortedJourney;

  const canGoUp = activeStart > 0;
  const canGoDown = activeStart < maxStart;

  const formatTooltipDate = (value: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return `${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
  };

  if (!sortedJourney || sortedJourney.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 rounded-3xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-mid)]/30 backdrop-blur-sm group transition-all duration-500 w-full mb-12">
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-tr from-orange-400/20 to-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
          <Rocket size={48} className="text-[var(--text-muted)] group-hover:text-orange-500 group-hover:-translate-y-2 transition-all duration-500 ease-out" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-2">The Mission Begins</h3>
        <p className="text-[var(--text-muted)] text-center max-w-sm leading-relaxed">
          {"My professional adventure is just starting! Stay tuned as I launch new chapters and hit exciting milestones."}
        </p>
      </div>
    );
  }

  return (
    <section className="flex gap-8 group/section">
      {/* Cards List */}
      <div
        key={activeStart}
        className="career-journey-fade flex-1 space-y-4 pr-4 md:pr-6"
      >
        {visibleJourney.map((item, index) => (
          <CareerJourneyCard
            key={`${item.title}-${item.started_at}`}
            {...item}
            isLast={isScrollable
              ? (activeStart + index === sortedJourney.length - 1)
              : (index === sortedJourney.length - 1)
            }
          />
        ))}
      </div>

      {/* Premium Vertical Slider - Only show if more than 4 items */}
      {isScrollable && (
        <div className="hidden flex-col items-center gap-6 md:flex pt-2">
          {/* Navigation Up */}
          <button
            type="button"
            onClick={() => goToStart(activeStart - 1)}
            disabled={!canGoUp}
            className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-mid)]/50 text-[var(--text-normal)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--bg-light)] hover:text-[var(--color-primary)] hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.1)] disabled:cursor-not-allowed disabled:opacity-20"
            aria-label="Show previous experiences"
          >
            <ChevronUp size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>

          {/* Track & Dots */}
          <div className="relative flex flex-col items-center py-2 px-1">
            <div className="absolute top-0 bottom-0 w-[2px] bg-[var(--border-color)]/20 rounded-full" />

            {/* Sliding Glass Capsule Highlight */}
            <div
              ref={highlightRef}
              className="absolute left-1/2 w-8 -translate-x-1/2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 opacity-0 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.05)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] backdrop-blur-[2px]"
            />

            {/* Dots */}
            <div className="relative flex flex-col items-center gap-4">
              {sortedJourney.map((item, idx) => {
                const inWindow = idx >= activeStart && idx < activeStart + highlightSize;

                return (
                  <button
                    key={`${item.title}-${idx}-dot`}
                    type="button"
                    ref={(el) => { dotRefs.current[idx] = el; }}
                    onClick={() => goToStart(idx - 1)}
                    className={`group relative flex h-4 w-4 items-center justify-center transition-all duration-500`}
                    aria-label={`Go to ${item.title}`}
                  >
                    <span
                      className={`block h-1.5 w-1.5 rounded-full transition-all duration-500 ease-out shadow-sm ${inWindow
                        ? "bg-[var(--color-primary)] scale-[1.3] ring-4 ring-[var(--color-primary)]/10"
                        : "bg-[var(--text-muted)] opacity-30 group-hover:opacity-100 group-hover:scale-110"
                        }`}
                    />

                    <div className="absolute right-full mr-4 px-2 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-mid)] text-[10px] font-bold text-[var(--text-muted)] whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none uppercase tracking-widest backdrop-blur-md">
                      {formatTooltipDate(item.started_at)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Down */}
          <button
            type="button"
            onClick={() => goToStart(activeStart + 1)}
            disabled={!canGoDown}
            className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-mid)]/50 text-[var(--text-normal)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--bg-light)] hover:text-[var(--color-primary)] hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.1)] disabled:cursor-not-allowed disabled:opacity-20"
            aria-label="Show next experiences"
          >
            <ChevronDown size={20} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>

          <div className="mt-2 text-[10px] font-black tracking-[0.2em] text-[var(--text-muted)] opacity-40 uppercase">
            {Math.min(activeStart + highlightSize, sortedJourney.length)} / {sortedJourney.length}
          </div>
        </div>
      )}
    </section>
  );
};
