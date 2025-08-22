import Image from "next/image";
import { useState, useEffect } from "react";

const MusicPlayer = () => {
  const currentTime = 11; // favorite part starts at 0:11
  const duration = 289; // full song length in seconds
  const progressPercent = (currentTime / duration) * 100;

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-2 w-full max-w-[270px] text-[var(--text)]">
      <div>
        <p className="text-sm font-bold">Iris</p>
        <p className="text-xs text-[var(--text-muted)] font-light">
          The Goo Goo Dolls
        </p>
      </div>

      <div className="w-full h-1 rounded-full bg-[var(--secondary)] relative overflow-hidden">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-[var(--text-muted)]">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

const Extras = () => {
  const hobbies = ["Competitive Programming", "Guitar", "Football", "Coding"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % hobbies.length);
        setFade(true);
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, [hobbies.length]);

  return (
    <div className="mx-auto p-6 flex flex-col md:flex-row border border-[var(--secondary)] bg-transparent rounded-[15px] w-full max-w-3xl backdrop-blur-md bg-white/10 gap-6">
      {/* Left section */}
      <div className="flex flex-shrink-0 items-start md:items-center gap-4">
        <Image
          src="/iris.jpg"
          alt="iris cover"
          width={70}
          height={70}
          className="rounded-[15px]"
        />
        <MusicPlayer />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-[var(--secondary)]" />

      {/* Right section */}
      <div className="flex-1 flex items-center">
        <p className="text-[var(--text-muted)] flex items-center gap-2 text-base md:text-[20px] font-light flex-wrap">
          My hobbies are{" "}
          <span className="px-4 py-1 rounded-full bg-[var(--accent)] font-semibold">
            <span
              className={`text-[var(--background)] transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {hobbies[currentIndex]}
            </span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Extras;
