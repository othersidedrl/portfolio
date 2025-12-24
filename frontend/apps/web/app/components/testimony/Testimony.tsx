"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import axios from "~lib/axios";
import { TestimonyCard } from "./TestimonyCard";
import { TestimonyModal } from "./TestimonyModal";
import type { TestimonyItemsResponse, TestimonyRepsonse } from "./types";

export default function TestimonySection() {
  const { data: TestimonyData } = useQuery({
    queryKey: ["testimony-page"],
    queryFn: async () => {
      const response = await axios.get("/testimony");
      return response.data as TestimonyRepsonse;
    },
  });

  const { data: TestimonyItems, isLoading: itemsLoading } = useQuery({
    queryKey: ["testimony-items"],
    queryFn: async () => {
      const response = await axios.get("/testimony/items/approved");
      return response.data as TestimonyItemsResponse;
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    if (!TestimonyItems?.data?.length) return;
    setCurrentIndex((prev) => (prev + 1) % TestimonyItems.data.length);
  };

  const handlePrev = () => {
    if (!TestimonyItems?.data?.length) return;
    setCurrentIndex((prev) => (prev - 1 + TestimonyItems.data.length) % TestimonyItems.data.length);
  };

  return (
    <section className="w-full text-[var(--text-normal)] pt-12">
      <TestimonyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="mx-auto flex flex-col items-center gap-6 text-center mb-12">
        <h1 className="text-[36px] font-semibold text-[var(--text-strong)]">
          {TestimonyData?.title || "Testimonials"}
        </h1>
        <div className="h-[2px] w-[80px] rounded-full bg-[var(--border-color)]" />
        <p className="w-[80%] text-[20px] text-[var(--text-muted)]">
          {TestimonyData?.description || ""}
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {itemsLoading ? (
          <div className="h-[300px] w-full bg-[var(--bg-mid)] border border-[var(--border-color)] rounded-2xl animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Sparkles size={48} className="text-[var(--text-muted)] opacity-20" />
              <div className="h-4 w-48 bg-[var(--border-color)] rounded" />
            </div>
          </div>
        ) : TestimonyItems?.data && TestimonyItems.data.length > 0 ? (
          <>
            {/* Card Container */}
            <TestimonyCard
              id={TestimonyItems.data[currentIndex].id}
              name={TestimonyItems.data[currentIndex].name}
              profile_url={TestimonyItems.data[currentIndex].profile_url}
              affiliation={TestimonyItems.data[currentIndex].affiliation}
              rating={TestimonyItems.data[currentIndex].rating}
              description={TestimonyItems.data[currentIndex].description}
              ai_summary={TestimonyItems.data[currentIndex].ai_summary}
            />
            {/* Navigation & Pagination */}
            <div className="flex items-center justify-between px-4 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 rounded-full bg-[var(--bg-mid)] border border-[var(--border-color)] shadow-sm hover:bg-[var(--bg-light)] transition cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft size={24} className="text-[var(--text-muted)]" />
              </button>

              <div className="flex gap-2">
                {TestimonyItems?.data?.map((_, index) => (
                  <button
                    key={`dot-${TestimonyItems.data[index].id}-${index}`}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentIndex
                        ? "bg-[var(--text-strong)]"
                        : "bg-[var(--border-color)] hover:bg-[var(--text-muted)]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="p-3 rounded-full bg-[var(--bg-mid)] border border-[var(--border-color)] shadow-sm hover:bg-[var(--bg-light)] transition cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight size={24} className="text-[var(--text-muted)]" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8 rounded-3xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-mid)]/50 backdrop-blur-sm group hover:border-[var(--text-muted)] transition-colors duration-500">
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-400/20 to-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
              <Star size={48} className="text-yellow-500 relative animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-2">
              No testimonials yet
            </h3>
            <p className="text-[var(--text-muted)] text-center max-w-md leading-relaxed">
              {"We haven't received a testimony yet. Send one to say how is it working with me!"}
            </p>
          </div>
        )}

        {/* Send Testimony Button */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-[var(--bg-mid)] border border-[var(--border-color)] rounded-lg font-semibold text-[var(--text-strong)] shadow-sm hover:bg-[var(--bg-light)] transition cursor-pointer hover:-translate-y-1 active:translate-y-0"
          >
            Send a Testimony
          </button>
        </div>
      </div>
    </section>
  );
}
