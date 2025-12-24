"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import axios from "~lib/axios";

interface ProjectPage {
  title: string;
  description: string;
}

const ProjectForm = () => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<ProjectPage>({
    title: "",
    description: "",
  });

  const { data: project, isLoading } = useQuery<ProjectPage>({
    queryKey: ["project"],
    queryFn: async () => {
      const res = await axios.get("/admin/project");
      return res.data;
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async (updated: ProjectPage) => {
      const res = await axios.patch("/admin/project", updated);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Project settings updated!");
    },
    onError: () => toast.error("Failed to update project settings."),
  });

  useEffect(() => {
    if (project) {
      setForm(project);
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjectMutation.mutate(form);
  };

  if (isLoading) return <div className="h-48 animate-pulse rounded-xl bg-[var(--bg-mid)]" />;

  return (
    <Card className="shadow-lg border-2 border-[var(--color-primary)]/5">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          <Settings size={20} />
        </div>
        <div>
          <CardTitle>Page Metadata</CardTitle>
          <CardDescription>Section title and global description.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Section Title
            </label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Featured Projects"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Section Description
            </label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what your projects represent..."
              className="min-h-[100px]"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={updateProjectMutation.isPending}>
            {updateProjectMutation.isPending ? "Saving..." : "Update Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
