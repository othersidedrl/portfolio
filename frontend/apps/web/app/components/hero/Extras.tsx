import Image from "next/image";
import { useState, useEffect, FC } from "react";

const MusicPlayer = () => {
  const currentTime = 11; // favorite part starts at 0:11
  const duration = 289; // full song length in seconds
  const progressPercent = (currentTime / duration) * 100;

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-2 w-full max-w-[240px] group/music cursor-default">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-[var(--text-strong)] group-hover/music:text-[var(--color-primary)] transition-colors">Iris</p>
          <p className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wider">The Goo Goo Dolls</p>
        </div>
        <div className="flex gap-[2px] items-end h-3 mb-1 ml-4">
          {[0.6, 0.8, 0.4, 1, 0.7].map((h, i) => (
            <div
              key={i}
              className="w-[2px] bg-[var(--color-primary)] animate-pulse"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full h-1.5 rounded-full bg-[var(--bg-mid)] overflow-hidden shadow-inner">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] font-medium text-[var(--text-muted)] tabular-nums">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

interface ExtrasProps {
  hobbies?: string[];
}

const Extras: FC<ExtrasProps> = ({ hobbies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (hobbies.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % hobbies.length);
        setIsTransitioning(false);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, [hobbies.length]);

  return (
    <div className="mx-auto p-5 flex flex-col md:flex-row border border-[var(--border-color)] bg-[var(--bg-mid)]/30 rounded-2xl w-full max-w-3xl backdrop-blur-xl shadow-xl gap-6 items-center">
      {/* Left section: Music */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-shrink-0 group/cover">
          <Image
            src="/iris.jpg"
            alt="iris cover"
            width={64}
            height={64}
            className="rounded-xl shadow-lg transition-transform duration-500 group-hover/cover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/50 border-t-white animate-spin" />
          </div>
        </div>
        <MusicPlayer />
      </div>

      {/* Vertical Divider */}
      <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-[var(--border-color)] to-transparent" />

      {/* Right section: Hobbies */}
      <div className="flex-1 flex items-center w-full overflow-hidden min-h-[44px]">
        <div className="flex items-center gap-3 text-base md:text-lg font-medium text-[var(--text-normal)] ">
          <span className="whitespace-nowrap text-[var(--text-muted)]">I'm into:</span>

          <div className="relative h-8 flex-1 min-w-[200px]">
            {hobbies.length > 0 && (
              <div
                key={currentIndex}
                className={`absolute inset-0 flex items-center animate-in fade-in duration-500 ${isTransitioning ? "slide-out-to-top-4 fade-out" : "slide-in-from-bottom-4"
                  }`}
              >
                <span className="px-3 py-1 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold text-sm md:text-base tracking-tight whitespace-nowrap shadow-sm">
                  {hobbies[currentIndex]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extras;
