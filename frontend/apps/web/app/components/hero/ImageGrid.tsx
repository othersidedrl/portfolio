import Image from "next/image";

const ImageGrid = () => {
  return (
    <div className="relative w-full max-w-[960px] aspect-[960/533] mx-auto">
      {/* Top-left image */}
      <div className="absolute top-0 left-[15%] w-[25%] h-[25.5%]">
        <Image
          src="/temp.jpeg"
          alt="Top Left"
          fill
          className="object-cover rounded-[15px]"
          style={{ boxShadow: "var(--shadow)" }}
        />
      </div>

      {/* Top-right image */}
      <div className="absolute top-[7.5%] right-0 w-[52.8%] h-[52.5%]">
        <Image
          src="/temp.jpeg"
          alt="Top Right"
          fill
          className="object-cover rounded-[15px]"
          style={{ boxShadow: "var(--shadow)" }}
        />
      </div>

      {/* Bottom-left image */}
      <div className="absolute bottom-[7.5%] left-0 w-[52.8%] h-[52.5%]">
        <Image
          src="/temp.jpeg"
          alt="Bottom Left"
          fill
          className="object-cover rounded-[15px]"
          style={{ boxShadow: "var(--shadow)" }}
        />
      </div>

      {/* Bottom-right image */}
      <div className="absolute bottom-0 right-[15%] w-[25%] h-[25.5%]">
        <Image
          src="/temp.jpeg"
          alt="Bottom Right"
          fill
          className="object-cover rounded-[15px]"
          style={{ boxShadow: "var(--shadow)" }}
        />
      </div>
    </div>
  );
};

export default ImageGrid;
