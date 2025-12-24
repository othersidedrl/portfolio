import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import axios from "~lib/axios";
import HeroSection from "./components/hero/Hero";
import AboutSection from "./components/about/About";
import TestimonySection from "./components/testimony/Testimony";
import { getQueryClient } from "./get-query-client";
import ProjectSection from "./components/project/Project";

export default async function Portfolio() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["hero"],
      queryFn: async () => {
        const response = await axios.get("/hero");
        return response.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["about"],
      queryFn: async () => {
        const response = await axios.get("/about");
        return response.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["testimony-page"],
      queryFn: async () => {
        const response = await axios.get("/testimony");
        return response.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["project-page"],
      queryFn: async () => {
        const response = await axios.get("/project");
        return response.data;
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <div className="mt-12">
          <TestimonySection />
        </div>
        <div className="mt-12">
          <ProjectSection />
        </div>
      </main>
    </HydrationBoundary>
  );
}
