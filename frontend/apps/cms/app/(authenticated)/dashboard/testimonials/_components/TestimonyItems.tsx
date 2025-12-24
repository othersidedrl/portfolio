"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, MessageCircle, Sparkles, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/Card";
import { cn } from "~/lib/utils";
import axios from "~lib/axios";

interface TestimonyItem {
  id: string;
  name: string;
  profile_url: string;
  affiliation: string;
  rating: number;
  description: string;
  ai_summary: string;
  approved: boolean;
}

interface TestimonyItemsResponse {
  data: TestimonyItem[];
  length: number;
}

const tabs = ["Approved", "Pending"] as const;

const TestimonyItems = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Approved");

  const {
    data: testimonyItems,
    isLoading,
    isError,
  } = useQuery<TestimonyItemsResponse>({
    queryKey: ["testimony-items"],
    queryFn: async () => {
      const res = await axios.get("/admin/testimony/items");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) =>
      axios.patch(`/admin/testimony/items/${id}/approve`, { approved: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimony-items"] });
      toast.success("Testimonial approved!");
    },
    onError: () => toast.error("Failed to approve."),
  });

  const unapproveMutation = useMutation({
    mutationFn: async (id: string) =>
      axios.patch(`/admin/testimony/items/${id}/approve`, { approved: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimony-items"] });
      toast.success("Testimonial unapproved.");
    },
    onError: () => toast.error("Failed to unapprove."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => axios.delete(`/admin/testimony/items/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimony-items"] });
      toast.success("Testimonial deleted.");
    },
    onError: () => toast.error("Failed to delete."),
  });

  const filteredItems = (testimonyItems?.data || []).filter((item) =>
    activeTab === "Approved" ? item.approved : !item.approved,
  );

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl bg-[var(--bg-mid)]" />
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-mid)] border border-[var(--border-color)] text-[var(--color-primary)]">
            <MessageCircle size={20} />
          </div>
          <h2 className="text-xl font-black text-[var(--text-strong)] uppercase tracking-tight">
            User Feedback
          </h2>
        </div>
      </div>

      <div className="flex gap-2 p-1 rounded-xl bg-[var(--bg-light)]/40 border border-[var(--border-color)] w-fit">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                isActive
                  ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md"
                  : "text-[var(--text-muted)] hover:text-[var(--text-strong)]",
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems?.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group relative border-2 border-transparent hover:border-[var(--color-primary)]/10 transition-all duration-300"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <img
                        src={
                          item.profile_url ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`
                        }
                        alt={item.name}
                        className="h-full w-full rounded-full object-cover border-2 border-[var(--border-color)] group-hover:border-[var(--color-primary)] transition-colors"
                      />
                      {item.approved && (
                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white border-2 border-[var(--bg-mid)]">
                          <Check size={10} strokeWidth={4} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-strong)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] truncate">
                        {item.affiliation}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {item.approved ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-500 hover:bg-amber-500/10"
                        title="Unapprove"
                        onClick={() => unapproveMutation.mutate(item.id)}
                      >
                        <ThumbsDown size={14} />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-500 hover:bg-green-500/10"
                        title="Approve"
                        onClick={() => approveMutation.mutate(item.id)}
                      >
                        <ThumbsUp size={14} />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:bg-red-500/10"
                      title="Delete"
                      onClick={() => deleteMutation.mutate(item.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>

                <div className="relative px-4 py-4 rounded-2xl bg-[var(--bg-light)]/40 border border-[var(--border-color)]">
                  <span className="absolute -top-3 left-3 px-2 py-1 rounded bg-[var(--bg-mid)] border border-[var(--border-color)] text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                    Original Quote
                  </span>
                  <p className="text-xs font-medium italic text-[var(--text-normal)] leading-relaxed line-clamp-3">
                    "{item.description}"
                  </p>
                </div>

                <div className="relative px-4 py-4 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={12} className="text-[var(--color-primary)]" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)]">
                      AI Insight
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-[var(--text-strong)] leading-relaxed">
                    {item.ai_summary}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-light)]/20 text-[var(--text-muted)]">
            <MessageCircle size={32} className="mb-2 opacity-20" />
            <p className="text-sm font-bold">No {activeTab.toLowerCase()} testimonials yet.</p>
            <p className="text-xs">Incoming feedback will appear here for review.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonyItems;
