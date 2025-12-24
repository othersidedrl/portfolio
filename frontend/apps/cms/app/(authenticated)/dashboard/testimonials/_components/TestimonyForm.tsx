"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import axios from "~lib/axios";

interface TestimonyPage {
  title: string;
  description: string;
}

const TestimonyForm = () => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<TestimonyPage>({
    title: "",
    description: "",
  });

  const { data: testimony, isLoading } = useQuery<TestimonyPage>({
    queryKey: ["testimony"],
    queryFn: async () => {
      const res = await axios.get("/admin/testimony");
      return res.data;
    },
  });

  const updateTestimonyMutation = useMutation({
    mutationFn: async (updated: TestimonyPage) => {
      const res = await axios.patch("/admin/testimony", updated);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimony"] });
      toast.success("Testimonial settings updated!");
    },
    onError: () => toast.error("Failed to update settings."),
  });

  useEffect(() => {
    if (testimony) {
      setForm(testimony);
    }
  }, [testimony]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTestimonyMutation.mutate(form);
  };

  if (isLoading) return <div className="h-48 animate-pulse rounded-xl bg-[var(--bg-mid)]" />;

  return (
    <Card className="shadow-lg border-2 border-[var(--color-primary)]/5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          <MessageSquareText size={20} />
        </div>
        <div>
          <CardTitle>Page Metadata</CardTitle>
          <CardDescription>Header details for testimonials.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Section Title
            </span>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Client Feedback"
              required
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Section Description
            </span>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What do your clients say about your work?"
              className="min-h-[100px]"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={updateTestimonyMutation.isPending}>
            {updateTestimonyMutation.isPending ? "Saving..." : "Update Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestimonyForm;
