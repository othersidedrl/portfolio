import StatusChip from "../ui/StatusChip";
import Extras from "./Extras";
import ImageGrid from "./ImageGrid";
import Information from "./Information";

export default function HeroSection() {
  return (
    <section
      className="w-full bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/hero-bg.svg')",
        backgroundSize: "100% 95vh",
      }}
    >
      <div className="flex flex-col py-16 space-y-12">
        {/* Top Centered Status Chip */}
        <div className="flex justify-center">
          <StatusChip />
        </div>

        {/* Centered Responsive Grid */}
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start w-full px-4">
            {/* Left (Info) */}
            <div className="col-span-1 lg:col-span-2">
              <Information />
            </div>

            {/* Right (Image Grid) */}
            <div className="col-span-1 lg:col-span-3 py-12">
              <ImageGrid />
            </div>
          </div>
        </div>

        {/* Centered Extras */}
        <div className="flex justify-center w-full px-4">
          <Extras />
        </div>
      </div>
    </section>
  );
}
