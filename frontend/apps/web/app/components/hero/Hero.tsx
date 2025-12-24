'use client';

import { useQuery } from "@tanstack/react-query";
import Extras from "./Extras";
import ImageGrid from "./ImageGrid";
import Information from "./Information";
import axios from "~lib/axios";

type HeroResponse = {
  name: string;
  rank: string;
  title: string;
  subtitle: string;
  resume_link: string;
  contact_link: string;
  image_url_1: string;
  image_url_2: string;
  image_url_3: string;
  image_url_4: string;
  hobbies: string[];
};

export default function HeroSection() {

  const { data: HeroData } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const response = await axios.get("/hero");
      return response.data as HeroResponse;
    },
  });

  return (
    <section
      className="w-full bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/hero-bg.svg')",
        backgroundSize: "100% 95vh",
      }}
    >
      <div className="flex flex-col py-16 space-y-12">
        {/* Centered Responsive Grid */}
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start w-full px-4">
            {/* Left (Info) */}
            <div className="col-span-1 lg:col-span-2">
              <Information
                name={HeroData?.name}
                rank={HeroData?.rank}
                title={HeroData?.title}
                subtitle={HeroData?.subtitle}
                resume_link={HeroData?.resume_link}
                contact_link={HeroData?.contact_link}
              />
            </div>

            {/* Right (Image Grid) */}
            <div className="col-span-1 lg:col-span-3 py-12">
              <ImageGrid
                TopLeft={HeroData?.image_url_1}
                TopRight={HeroData?.image_url_2}
                BottomLeft={HeroData?.image_url_3}
                BottomRight={HeroData?.image_url_4}
              />
            </div>
          </div>
        </div>

        {/* Centered Extras */}
        <div className="flex justify-center w-full px-4">
          <Extras hobbies={HeroData?.hobbies} />
        </div>
      </div>
    </section>
  );
}
