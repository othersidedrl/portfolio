import { FC } from "react";
import Image from "next/image";

interface ImageGridProps {
  TopLeft?: string;
  TopRight?: string;
  BottomLeft?: string;
  BottomRight?: string;
}

const GridImage: FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <div className="group relative w-full h-full overflow-hidden rounded-[24px] border border-white/10 bg-[var(--bg-mid)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-white/20">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />

      {/* Glossy Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

      {/* Inner Border for Depth */}
      <div className="absolute inset-0 rounded-[24px] border border-white/5 pointer-events-none" />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] opacity-40 pointer-events-none" />
    </div>
  );
};

const ImageGrid: FC<ImageGridProps> = ({
  TopLeft = "/temp.jpeg",
  TopRight = "/temp.jpeg",
  BottomLeft = "/temp.jpeg",
  BottomRight = "/temp.jpeg",
}) => {
  return (
    <div className="relative w-full max-w-[960px] aspect-[960/533] mx-auto perspective-[1000px]">
      {/* Top-left image */}
      <div className="absolute top-0 left-[15%] w-[25%] h-[25.5%] z-10">
        <GridImage src={TopLeft} alt="Top Left" />
      </div>

      {/* Top-right image */}
      <div className="absolute top-[7.5%] right-0 w-[52.8%] h-[52.5%] z-0">
        <GridImage src={TopRight} alt="Top Right" />
      </div>

      {/* Bottom-left image */}
      <div className="absolute bottom-[7.5%] left-0 w-[52.8%] h-[52.5%] z-0">
        <GridImage src={BottomLeft} alt="Bottom Left" />
      </div>

      {/* Bottom-right image */}
      <div className="absolute bottom-0 right-[15%] w-[25%] h-[25.5%] z-10">
        <GridImage src={BottomRight} alt="Bottom Right" />
      </div>
    </div>
  );
};

export default ImageGrid;
