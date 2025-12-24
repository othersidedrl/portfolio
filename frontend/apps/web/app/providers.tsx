"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { getQueryClient } from "./get-query-client";

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
