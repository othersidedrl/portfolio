import { Quote, Sparkles, Star } from "lucide-react";
import { Testimonial } from "./types"
import { FC } from "react";

interface TestimonyCardProps extends Testimonial { }

export const TestimonyCard: FC<TestimonyCardProps> = ({
    name,
    profile_url,
    affiliation,
    rating,
    description,
    ai_summary
}) => {
    return (
        <div className="relative bg-[var(--bg-mid)] rounded-2xl shadow-[var(--shadow)] p-8 md:p-12 mb-8 border border-[var(--border-soft)] transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Left Side: Avatar & Info */}
                <div className="flex flex-col items-center justify-center shrink-0 md:border-r border-[var(--border-color)] md:pr-12">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[var(--bg-light)] shadow-sm">
                        <img src={profile_url} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-strong)] text-center">{name}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-3 text-center">{affiliation}</p>
                    <div className="flex gap-1 text-yellow-500">
                        {[...Array(rating)].map((_, i) => (
                            <Star key={i} fill="currentColor" size={16} />
                        ))}
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 flex flex-col justify-center">
                    <Quote className="text-[var(--text-muted)] opacity-50 mb-4" size={32} />
                    <p className="text-[var(--text-normal)] text-lg italic mb-6 leading-relaxed">
                        {description}
                    </p>

                    {/* AI Summary Box */}
                    <div className="bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <div className="p-2 bg-white/20 rounded-lg shrink-0">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-medium opacity-90 uppercase tracking-wider">AI-Generated Summary</p>
                            <p className="text-sm font-semibold">{ai_summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}