"use client";

import * as Ariakit from "@ariakit/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Code2, Pencil, Plus, Sparkles, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";
import Dropdown from "~/components/ui/Dropdown";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { cn } from "~/lib/utils";
import axios from "~lib/axios";

interface TechnicalSkill {
  id: string;
  name: string;
  description: string;
  specialities: string[];
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: "Backend" | "Frontend" | "Other";
  year_of_experience: number;
}

interface SkillResponse {
  data: TechnicalSkill[];
  length: number;
}

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;
const categories = ["All", "Backend", "Frontend", "Other"] as const;

const SkillsForm = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<TechnicalSkill, "id">>({
    name: "",
    description: "",
    specialities: [],
    level: "Beginner",
    category: "Backend",
    year_of_experience: 0,
  });

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      specialities: [],
      level: "Beginner",
      category: "Backend",
      year_of_experience: 0,
    });
    setEditId(null);
    setOpen(false);
  };

  const { data: skills, isLoading } = useQuery<SkillResponse>({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await axios.get("admin/about/skills");
      return res.data;
    },
  });

  const createSkillMutation = useMutation({
    mutationFn: async (newSkill: Omit<TechnicalSkill, "id">) => {
      const res = await axios.post("admin/about/skills", newSkill);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill added successfully!");
      resetForm();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to add skill.");
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: async ({ id, updated }: { id: string; updated: Omit<TechnicalSkill, "id"> }) => {
      const res = await axios.patch(`admin/about/skills/${id}`, updated);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill updated successfully!");
      resetForm();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to update skill.");
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`admin/about/skills/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill deleted.");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to delete skill.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateSkillMutation.mutate({ id: editId, updated: form });
    } else {
      createSkillMutation.mutate(form);
    }
  };

  const filteredSkills = skills?.data?.filter((s) =>
    activeCategory === "All" ? true : s.category === activeCategory,
  );

  if (isLoading) return <div className="h-64 animate-pulse rounded-xl bg-[var(--bg-mid)]" />;

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Technical Skills</CardTitle>
          <CardDescription>Manage your stack and expertise levels.</CardDescription>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          size="sm"
          className="font-bold"
        >
          <Plus size={16} className="mr-2" /> Add Skill
        </Button>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-[var(--bg-light)]/40 border border-[var(--border-color)]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex-1 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                  isActive
                    ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md translate-y-[-1px]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-[var(--bg-light)]",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredSkills && filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="group relative flex flex-col gap-3 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-dark)]/40 transition-all hover:bg-[var(--bg-mid)] hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-light)] border border-[var(--border-color)] text-[var(--color-primary)] shadow-sm">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[var(--text-strong)] group-hover:text-[var(--color-primary)] transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                        {skill.level} • {skill.year_of_experience}y Exp
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => {
                        setEditId(skill.id);
                        setForm({
                          name: skill.name,
                          description: skill.description,
                          specialities: [...skill.specialities],
                          level: skill.level,
                          category: skill.category,
                          year_of_experience: skill.year_of_experience,
                        });
                        setOpen(true);
                      }}
                    >
                      <Pencil size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      onClick={() => deleteSkillMutation.mutate(skill.id)}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>

                <p className="text-xs font-medium text-[var(--text-muted)] line-clamp-2">
                  {skill.description}
                </p>

                {skill.specialities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-[var(--border-color)]/20">
                    {skill.specialities.map((spec, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 rounded-md bg-[var(--bg-light)] text-[9px] font-bold text-[var(--text-muted)] border border-[var(--border-color)]/50"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full flex h-32 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-light)]/20 text-[var(--text-muted)] text-center px-6">
              <p className="text-sm font-bold">No skills found in this category.</p>
              <p className="text-xs">Click 'Add Skill' to populate your library.</p>
            </div>
          )}
        </div>
      </CardContent>

      <Ariakit.Dialog
        open={open}
        onClose={resetForm}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in transition-all"
      >
        <Card className="w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{editId ? "Edit Skill" : "Add Skill"}</CardTitle>
              <CardDescription>Define the technical expertise details.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X size={20} />
            </Button>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  Skill Name
                </label>
                <Input
                  placeholder="e.g. Golang, React, Docker"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  Description
                </label>
                <Textarea
                  placeholder="What makes you proficient in this skill?"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Dropdown
                    label="Skill Level"
                    value={form.level}
                    onChange={(val) => setForm({ ...form, level: val as TechnicalSkill["level"] })}
                    options={[...levels]}
                    placeholder="Select level"
                  />
                </div>
                <div className="space-y-2">
                  <Dropdown
                    label="Category"
                    value={form.category}
                    onChange={(val) =>
                      setForm({ ...form, category: val as TechnicalSkill["category"] })
                    }
                    options={["Backend", "Frontend", "Other"]}
                    placeholder="Select category"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  Years of Experience
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={form.year_of_experience}
                    onChange={(e) =>
                      setForm({ ...form, year_of_experience: parseInt(e.target.value, 10) || 0 })
                    }
                    className="max-w-[120px]"
                    required
                  />
                  <div className="flex-1 h-2 rounded-full bg-[var(--bg-light)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-primary)] transition-all duration-500"
                      style={{ width: `${Math.min((form.year_of_experience / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[var(--border-color)]/30">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                    <Sparkles size={14} /> Specialties
                  </label>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, specialities: [...prev.specialities, ""] }))
                    }
                  >
                    <Plus size={14} className="mr-2" /> Add Specialty
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {form.specialities.map((spec, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-2 animate-in slide-in-from-left-2 duration-200"
                    >
                      <Input
                        value={spec}
                        onChange={(e) => {
                          const updated = [...form.specialities];
                          updated[i] = e.target.value;
                          setForm({ ...form, specialities: updated });
                        }}
                        placeholder={`Specialty #${i + 1}`}
                        className="flex-1 h-9 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            specialities: prev.specialities.filter((_, j) => j !== i),
                          }))
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-red-500 opacity-40 hover:opacity-100 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {form.specialities.length === 0 && (
                    <p className="text-[10px] text-center text-[var(--text-muted)] italic py-2">
                      No specialties added. These help define your niche.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>

            <div className="flex gap-3 p-6 border-t border-[var(--border-color)]/30 bg-[var(--bg-light)]/20">
              <Button
                type="button"
                variant="secondary"
                onClick={resetForm}
                className="flex-1 font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 font-bold"
                disabled={createSkillMutation.isPending || updateSkillMutation.isPending}
              >
                {editId ? "Update Skill" : "Save Skill"}
              </Button>
            </div>
          </form>
        </Card>
      </Ariakit.Dialog>
    </Card>
  );
};

export default SkillsForm;
