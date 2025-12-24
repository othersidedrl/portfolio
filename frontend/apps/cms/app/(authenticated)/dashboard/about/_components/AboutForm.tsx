"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "~lib/axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { Button } from "~/components/ui/Button";
import { Plus, Trash2, Github, Linkedin, CheckCircle2 } from "lucide-react";

interface AboutCard {
  title: string;
  description: string;
}

interface About {
  description: string;
  cards: AboutCard[];
  linkedin_link: string;
  github_link: string;
  available: boolean;
}

const AboutForm = () => {
  const queryClient = useQueryClient();

  const {
    data: about,
    isLoading,
    isError,
  } = useQuery<About>({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await axios.get("admin/about");
      return response.data;
    },
  });

  const updateAboutMutation = useMutation({
    mutationFn: async (updatedAbout: Partial<About>) => {
      const response = await axios.patch("admin/about", updatedAbout);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success("About section updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error || "Failed to update about section."
      );
    },
  });

  const [form, setForm] = useState<About>({
    description: "",
    linkedin_link: "",
    github_link: "",
    cards: [],
    available: false,
  });

  useEffect(() => {
    if (about) {
      setForm(about);
    }
  }, [about]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    // Checkbox handling
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutMutation.mutate(form);
  };

  if (isLoading) return <div className="h-64 animate-pulse rounded-xl bg-[var(--bg-mid)]" />;

  return (
    <Card className="shadow-lg border-2 border-[var(--color-primary)]/5">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Biography</CardTitle>
          <CardDescription>Manage your personal bio and availability.</CardDescription>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${form.available ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${form.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          {form.available ? 'Available' : 'Unavailable'}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">About Me</label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell the world who you are..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                <Linkedin size={14} className="text-blue-500" /> LinkedIn
              </label>
              <Input
                name="linkedin_link"
                type="url"
                value={form.linkedin_link}
                onChange={handleChange}
                placeholder="https://linkedin.com/..."
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                <Github size={14} className="text-[var(--text-strong)]" /> GitHub
              </label>
              <Input
                name="github_link"
                type="url"
                value={form.github_link}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--bg-light)]/50 border border-[var(--border-color)]/50">
            <input
              type="checkbox"
              id="available-check"
              name="available"
              className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              checked={form.available}
              onChange={handleChange}
            />
            <label htmlFor="available-check" className="text-sm font-bold text-[var(--text-strong)] cursor-pointer select-none">
              Mark as open to new opportunities
            </label>
          </div>

          <div className="space-y-4 pt-4 border-t border-[var(--border-color)]/30">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-strong)]">Highlight Cards</h4>
              {form.cards.length < 4 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setForm(prev => ({ ...prev, cards: [...prev.cards, { title: "", description: "" }] }))}
                >
                  <Plus size={14} className="mr-2" /> Add Card
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {form.cards.map((card, index) => (
                <div key={index} className="group relative flex gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)]/50 transition-all hover:bg-[var(--bg-light)]/30">
                  <div className="flex-1 space-y-3">
                    <Input
                      value={card.title}
                      onChange={(e) => setForm(prev => {
                        const next = [...prev.cards];
                        next[index].title = e.target.value;
                        return { ...prev, cards: next };
                      })}
                      placeholder="Title (e.g. Competitive Programmer)"
                      className="h-8 font-bold"
                    />
                    <Input
                      value={card.description}
                      onChange={(e) => setForm(prev => {
                        const next = [...prev.cards];
                        next[index].description = e.target.value;
                        return { ...prev, cards: next };
                      })}
                      placeholder="Description"
                      className="h-8 text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, cards: prev.cards.filter((_, i) => i !== index) }))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={updateAboutMutation.isPending}>
            {updateAboutMutation.isPending ? "Saving..." : "Update Biography"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AboutForm;
