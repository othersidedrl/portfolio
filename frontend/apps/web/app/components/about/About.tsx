"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "~lib/axios";
import Card from "./Card";
import { CareerJourney } from "./CareerJourney";
import { Stats } from "./Stats";
import { TechnicalSkills } from "./TechnicalSkills";
import type { AboutResponse } from "./types";

export default function AboutSection() {
  const { data: AboutData } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await axios.get("/about");
      return response.data as AboutResponse;
    },
  });

  return (
    <section id="about" className="w-full text-[var(--text-normal)] px-4 md:px-6 lg:px-12 xl:px-[130px]">
      <div className="mx-auto flex flex-col items-center gap-6 text-center">
        <h1 className="text-[36px] font-semibold text-[var(--text-strong)]">About</h1>
        <div className="h-[2px] w-[80px] rounded-full bg-[var(--border-color)]" />
        <p className="w-[80%] text-[20px] text-[var(--text-muted)]">
          {AboutData?.description || ""}
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mx-auto max-w-6xl">
        {AboutData?.cards[0].title && (
          <Card
            title={AboutData?.cards[0].title || ""}
            description={AboutData?.cards[0].description || ""}
          />
        )}
        {AboutData?.cards[1].title && (
          <Card
            title={AboutData?.cards[1].title || ""}
            description={AboutData?.cards[1].description || ""}
          />
        )}
        {AboutData?.cards[2].title && (
          <Card
            title={AboutData?.cards[2].title || ""}
            description={AboutData?.cards[2].description || ""}
          />
        )}
        {AboutData?.cards[3].title && (
          <Card
            title={AboutData?.cards[3].title || ""}
            description={AboutData?.cards[3].description || ""}
          />
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mt-12 mx-auto">
        <div>
          <h1 className="mb-4 text-[27px] font-bold text-[var(--text-strong)]">Technical Skills</h1>
          <TechnicalSkills />
        </div>
        <div>
          <h1 className="mb-4 text-[27px] font-bold text-[var(--text-strong)]">Career Journey</h1>
          <CareerJourney />
        </div>
      </div>
      <Stats
        linkedin={AboutData?.linkedin_link}
        github={AboutData?.github_link}
        available={AboutData?.available}
      />
    </section>
  );
}
