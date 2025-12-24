'use client';

import { ChevronDown, ChevronUp, Rocket } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CareerJourneyCard from "./_components/CareerJourneyCard";
import { useQuery } from "@tanstack/react-query";
import axios from "~lib/axios";
import { CareersRepsonse } from "./types";

const HIGHLIGHT_SIZE = 3;

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
  const highlightRef = useRef<HTMLSpanElement | null>(null);
  const [activeStart, setActiveStart] = useState(0);

  const maxStart = Math.max(0, sortedJourney.length - HIGHLIGHT_SIZE);

  const goToStart = useCallback(
    (nextStart: number) => {
      setActiveStart((prev) => {
        const clamped = Math.max(0, Math.min(nextStart, maxStart));
        return clamped === prev ? prev : clamped;
      });
    },
    [maxStart]
  );

  const updateHighlight = useCallback(
    (startValue: number) => {
      const highlight = highlightRef.current;
      if (!highlight) return;

      const startIdx = startValue;
      const endIdx = Math.min(
        startValue + HIGHLIGHT_SIZE - 1,
        sortedJourney.length - 1
      );

      const startBtn = dotRefs.current[startIdx];
      const endBtn = dotRefs.current[endIdx];

      if (!startBtn || !endBtn) return;

      const top = startBtn.offsetTop;
      const bottom = endBtn.offsetTop + endBtn.offsetHeight;

      highlight.style.top = `${top - 4}px`;
      highlight.style.height = `${bottom - top + 8}px`;
      highlight.style.opacity = "1";
    },
    [sortedJourney.length]
  );

  useEffect(() => {
    updateHighlight(activeStart);
  }, [activeStart, updateHighlight]);

  const visibleJourney = sortedJourney.slice(
    activeStart,
    activeStart + HIGHLIGHT_SIZE
  );

  const canGoUp = activeStart > 0;
  const canGoDown = activeStart < maxStart;

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
    <section className="flex gap-6">
      <div
        key={activeStart}
        className="career-journey-fade flex-1 space-y-6 pr-4 md:pr-6"
      >
        {visibleJourney.map((item, index) => (
          <CareerJourneyCard
            key={`${item.title}-${item.started_at}`}
            {...item}
            isLast={activeStart + index === sortedJourney.length - 1}
          />
        ))}
      </div>

      <div className="hidden flex-col items-center gap-4 md:flex">
        <button
          type="button"
          onClick={() => goToStart(activeStart - 1)}
          disabled={!canGoUp}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-normal)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[var(--bg-light)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Show previous experiences"
        >
          <ChevronUp size={18} />
        </button>
        <div className="relative flex flex-col items-center gap-3">
          <span
            ref={highlightRef}
            className="pointer-events-none absolute left-1/2 w-10 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/12 opacity-0 transition-all duration-300 ease-out"
          />
          {sortedJourney.map((item, idx) => {
            const inWindow =
              idx >= activeStart &&
              idx <= Math.min(
                activeStart + HIGHLIGHT_SIZE - 1,
                sortedJourney.length - 1
              );
            return (
              <button
                key={`${item.title}-${idx}-dot`}
                type="button"
                ref={(el) => {
                  dotRefs.current[idx] = el;
                }}
                onClick={() => goToStart(idx)}
                className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300 ${inWindow
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--text-muted)]"
                  }`}
                aria-label={`Go to ${item.title}`}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full border border-current transition-colors duration-300 ease-out ${inWindow ? "bg-current" : "bg-transparent"
                    }`}
                />
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => goToStart(activeStart + 1)}
          disabled={!canGoDown}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-normal)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[var(--bg-light)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Show next experiences"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </section>
  );
};
