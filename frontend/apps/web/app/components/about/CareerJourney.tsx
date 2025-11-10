'use client';

import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CareerJourneyCard from "./_components/CareerJourneyCard";

type CareerJourneyItem = {
  title: string;
  affiliation: string;
  description: string;
  location: string;
  type: string;
  startedAt: string;
  endedAt: string;
};

const JOURNEY: CareerJourneyItem[] = [
  {
    title: "Software Engineer",
    affiliation: "Zellify",
    description: "Developing frontend and backend using NestJS and Next.js.",
    location: "Remote, Sweden",
    type: "Job",
    startedAt: "2024-08-04",
    endedAt: "Present",
  },
  {
    title: "Software Engineer Intern",
    affiliation: "Ministry of Public Works",
    description:
      "Delivered microservices in Go, Next.js dashboards, and automated deployments on GCP.",
    location: "Jakarta, Indonesia",
    type: "Job",
    startedAt: "2023-03-01",
    endedAt: "2023-08-31",
  },
  {
    title: "Computer Science Student",
    affiliation: "Universitas Gunadarma",
    description:
      "Focused on backend engineering, competitive programming, and distributed systems.",
    location: "Depok, Indonesia",
    type: "Education",
    startedAt: "2022-09-23",
    endedAt: "2026-06-22",
  },
  {
    title: "Freelance Developer",
    affiliation: "Self-employed",
    description:
      "Built marketing websites and lightweight dashboards for startups using Next.js.",
    location: "Remote",
    type: "Job",
    startedAt: "2021-01-01",
    endedAt: "2022-07-01",
  },
  {
    title: "Programming Mentor",
    affiliation: "Local Community",
    description: "Mentored junior engineers on algorithms and clean architecture.",
    location: "Jakarta, Indonesia",
    type: "Job",
    startedAt: "2020-06-01",
    endedAt: "2020-12-01",
  },
];

const HIGHLIGHT_SIZE = 3;
const LIST_HEIGHT_PADDING = 12;

export const CareerJourney = () => {
  const sortedJourney = useMemo(
    () =>
      [...JOURNEY].sort(
        (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
      ),
    []
  );

  const listRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const highlightRef = useRef<HTMLSpanElement | null>(null);
  const activeStartRef = useRef(0);
  const [activeStart, setActiveStart] = useState(0);
  const [listHeight, setListHeight] = useState<number | null>(null);

  const maxStart = Math.max(0, sortedJourney.length - HIGHLIGHT_SIZE);

  const updateActiveStart = useCallback((value: number) => {
    activeStartRef.current = value;
    setActiveStart(value);
  }, []);

  const scrollToCard = useCallback((idx: number) => {
    const target = cardRefs.current[idx];
    const container = listRef.current;
    if (!target || !container) return;

    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const offset = targetRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({ top: offset, behavior: "smooth" });
  }, []);

  const goToStart = useCallback(
    (nextStart: number, { snapOnly = false }: { snapOnly?: boolean } = {}) => {
      const clamped = Math.max(0, Math.min(nextStart, maxStart));
      if (clamped === activeStartRef.current) return;
      updateActiveStart(clamped);
      if (!snapOnly) scrollToCard(clamped);
    },
    [maxStart, scrollToCard, updateActiveStart]
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
  }, [activeStart, listHeight, sortedJourney.length, updateHighlight]);

  const computeListHeight = useCallback(() => {
    const nodes = cardRefs.current.filter(
      (node): node is HTMLDivElement => Boolean(node)
    );

    if (!nodes.length) {
      setListHeight(null);
      return;
    }

    const windowSize = Math.min(HIGHLIGHT_SIZE, nodes.length);
    let maxHeight = 0;

    for (let i = 0; i <= nodes.length - windowSize; i += 1) {
      const startNode = nodes[i];
      const endNode = nodes[i + windowSize - 1];
      const blockHeight =
        endNode.offsetTop + endNode.offsetHeight - startNode.offsetTop;
      if (blockHeight > maxHeight) {
        maxHeight = blockHeight;
      }
    }

    setListHeight(maxHeight || null);
  }, [sortedJourney.length]);

  useEffect(() => {
    computeListHeight();
    const handleResize = () => {
      computeListHeight();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [computeListHeight]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    container.addEventListener("wheel", preventScroll, { passive: false });
    container.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      container.removeEventListener("wheel", preventScroll);
      container.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  const canGoUp = activeStart > 0;
  const canGoDown = activeStart < maxStart;

  return (
    <section className="flex gap-6">
      <div
        ref={listRef}
        className="timeline-scroll flex-1 space-y-6 overflow-y-auto pr-4 md:pr-6"
        style={
          listHeight
            ? { maxHeight: `${listHeight + LIST_HEIGHT_PADDING}px` }
            : undefined
        }
      >
        {sortedJourney.map((item, index) => (
          <div
            key={`${item.title}-${item.startedAt}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
          >
            <CareerJourneyCard
              {...item}
              isLast={index === sortedJourney.length - 1}
            />
          </div>
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
          {/* Highlight bar behind active window */}
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
                className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300 ${
                  inWindow
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--text-muted)]"
                }`}
                aria-label={`Go to ${item.title}`}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full border border-current transition-colors duration-300 ease-out ${
                    inWindow ? "bg-current" : "bg-transparent"
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
