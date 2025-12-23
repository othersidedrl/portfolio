"use client";

import { ChevronLeft, ChevronRight, Quote, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Testimonial, TestimonyItemsResponse, TestimonyRepsonse } from "./types";
import { TestimonyCard } from "./TestimonyCard";
import { TestimonyModal } from "./TestimonyModal";
import { useQuery } from "@tanstack/react-query";
import axios from "~lib/axios";

export default function TestimonySection() {

    const { data: TestimonyData } = useQuery({
        queryKey: ["testimony-page"],
        queryFn: async () => {
            const response = await axios.get("/testimony");
            return response.data as TestimonyRepsonse;
        },
    });

    const { data: TestimonyItems } = useQuery({
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
        <section className="w-full text-[var(--text-normal)] py-12">
            <TestimonyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="mx-auto flex flex-col items-center gap-6 text-center mb-12">
                <h1 className="text-[36px] font-semibold text-[var(--text-strong)]">{TestimonyData?.title || 'Testimonials'}</h1>
                <div className="h-[2px] w-[80px] rounded-full bg-[var(--border-color)]" />
                <p className="w-[80%] text-[20px] text-[var(--text-muted)]">{TestimonyData?.description || ''}</p>
            </div>

            <div className="mx-auto max-w-6xl px-4">
                {/* Card Container */}
                {TestimonyItems?.data && TestimonyItems.data.length > 0 && (
                    <TestimonyCard
                        id={TestimonyItems.data[currentIndex].id}
                        name={TestimonyItems.data[currentIndex].name}
                        profile_url={TestimonyItems.data[currentIndex].profile_url}
                        affiliation={TestimonyItems.data[currentIndex].affiliation}
                        rating={TestimonyItems.data[currentIndex].rating}
                        description={TestimonyItems.data[currentIndex].description}
                        ai_summary={TestimonyItems.data[currentIndex].ai_summary}
                    />
                )}

                {/* Navigation & Pagination */}
                <div className="flex items-center justify-between px-4">
                    <button
                        onClick={handlePrev}
                        className="p-3 rounded-full bg-[var(--bg-mid)] border border-[var(--border-color)] shadow-sm hover:bg-[var(--bg-light)] transition cursor-pointer hover:scale-105 active:scale-95"
                    >
                        <ChevronLeft size={24} className="text-[var(--text-muted)]" />
                    </button>

                    <div className="flex gap-2">
                        {TestimonyItems?.data?.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? "bg-[var(--text-strong)]" : "bg-[var(--border-color)] hover:bg-[var(--text-muted)]"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full bg-[var(--bg-mid)] border border-[var(--border-color)] shadow-sm hover:bg-[var(--bg-light)] transition cursor-pointer hover:scale-105 active:scale-95"
                    >
                        <ChevronRight size={24} className="text-[var(--text-muted)]" />
                    </button>
                </div>

                {/* Send Testimony Button */}
                <div className="mt-12 flex justify-center">
                    <button
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