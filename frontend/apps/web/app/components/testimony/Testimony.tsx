"use client";

import { ChevronLeft, ChevronRight, Quote, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Testimonial } from "./types";
import { TestimonyCard }from "./TestimonyCard";

const dummyTestimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sweepy Catto",
        role: "Chief of Sleep at Sleep Inc.",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sweepy",
        quote: "Working with this team transformed our digital presence completely. Their attention to detail and innovative approach helped us increase our conversion rates by 45% in just three months. The communication was always clear and they consistently delivered ahead of schedule.",
        aiSummary: "Transformed digital presence with 45% higher conversion rates",
    },
    {
        id: 2,
        name: "Gary Googles",
        role: "Head of Search at FindIt",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Gary",
        quote: "I was blown away by the speed and quality of the delivery. The team understood our requirements perfectly and executed them with precision. Highly recommended for anyone looking for top-tier development work.",
        aiSummary: "High quality delivery with perfect execution",
    },
    {
        id: 3,
        name: "Karen Keyboard",
        role: "CTO at Typist.io",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Karen",
        quote: "The codebase is clean, maintainable, and well-documented. It's rare to find developers who care so much about code quality. A fantastic experience overall.",
        aiSummary: "Clean, maintainable code and well-documented",
    },
];


export default function TestimonySection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % dummyTestimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + dummyTestimonials.length) % dummyTestimonials.length);
    };

    return (
        <section className="w-full text-[var(--text-normal)] py-12">
            <div className="mx-auto flex flex-col items-center gap-6 text-center mb-12">
                <h1 className="text-[36px] font-semibold text-[var(--text-strong)]">Testimonials</h1>
                <div className="h-[2px] w-[80px] rounded-full bg-[var(--border-color)]" />
                <p className="w-[80%] text-[20px] text-[var(--text-muted)]">Don't just take my word for it. Here's what my clients have to say about working with me.</p>
            </div>

            <div className="mx-auto max-w-6xl px-4">
                {/* Card Container */}
                <TestimonyCard data={dummyTestimonials[currentIndex]} />

                {/* Navigation & Pagination */}
                <div className="flex items-center justify-between px-4">
                    <button 
                        onClick={handlePrev}
                        className="p-3 rounded-full bg-[var(--bg-mid)] border border-[var(--border-color)] shadow-sm hover:bg-[var(--bg-light)] transition cursor-pointer hover:scale-105 active:scale-95"
                    >
                        <ChevronLeft size={24} className="text-[var(--text-muted)]" />
                    </button>

                    <div className="flex gap-2">
                        {dummyTestimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                    index === currentIndex ? "bg-[var(--text-strong)]" : "bg-[var(--border-color)] hover:bg-[var(--text-muted)]"
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
                    <button className="px-8 py-3 bg-[var(--bg-mid)] border border-[var(--border-color)] rounded-lg font-semibold text-[var(--text-strong)] shadow-sm hover:bg-[var(--bg-light)] transition cursor-pointer hover:-translate-y-1 active:translate-y-0">
                        Send a Testimony
                    </button>
                </div>
            </div>
        </section>
    );
}