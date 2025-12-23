"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "~lib/axios";
import Navbar from "./components/Navbar";
import HeroSection from "./components/hero/Hero";
import AboutSection from "./components/about/About";
import TestimonySection from "./components/testimony/Testimony";
// import AboutSection from "./components/about/About";

type Testimony = {
  name: string;
  profile_url: string;
  affiliation: string;
  rating: number;
  description: string;
  ai_summary: string;
};

type TestimonyItemsResponse = {
  data: Testimony[];
  length: number;
};

type TestimonyRepsonse = {
  title: string;
  description: string;
};

type Project = {
  name: string;
  imageUrls: string[];
  description: string;
  techStack: string[];
  githubLink: string;
  type: string;
  contribution: string;
  projectLink: string;
};

type ProjectItemsResponse = {
  data: Project[];
  length: number;
};

type ProjectResponse = {
  title: string;
  description: string;
};

export default function Portfolio() {

  const { data: TestimonyData } = useQuery({
    queryKey: ["testimony"],
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

  const { data: ProjectData } = useQuery({
    queryKey: ["project"],
    queryFn: async () => {
      const response = await axios.get("/testimony");
      return response.data as ProjectResponse;
    },
  });

  const { data: ProjectItems } = useQuery({
    queryKey: ["project-items"],
    queryFn: async () => {
      const response = await axios.get("/project/items");
      return response.data as ProjectItemsResponse;
    },
  });

  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <div className="mt-12">
        <TestimonySection />
      </div>
    </main>
  );
}
