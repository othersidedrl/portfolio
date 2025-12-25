"use client";

import * as Ariakit from "@ariakit/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  ImageIcon,
  Package,
  Pencil,
  Plus,
  Smartphone,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";
import Dropdown from "~/components/ui/Dropdown";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { cn } from "~/lib/utils";
import axios from "~lib/axios";

interface ProjectItem {
  id: number;
  name: string;
  imageUrls: string[];
  description: string;
  techStack: string[];
  githubLink: string;
  type: "Web" | "Mobile" | "Machine Learning";
  contribution: "Personal" | "Team";
  projectLink: string;
}

interface TechnicalSkill {
  id: string;
  name: string;
  description: string;
  specialities: string[];
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: "Backend" | "Frontend" | "Other";
}

interface SkillResponse {
  data: TechnicalSkill[];
  length: number;
}
interface ProjectItemsResponse {
  data: ProjectItem[];
  length: number;
}

const ProjectItems = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: projectItems, isLoading } = useQuery<ProjectItemsResponse>({
    queryKey: ["project-items"],
    queryFn: async () => {
      const res = await axios.get("/admin/project/items");
      return res.data;
    },
  });

  const [form, setForm] = useState<ProjectItem>({
    id: 0,
    name: "",
    imageUrls: [""],
    description: "",
    techStack: [],
    githubLink: "",
    type: "Web",
    contribution: "Personal",
    projectLink: "",
  });

  const { data: skillsData } = useQuery<SkillResponse>({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await axios.get("admin/about/skills");
      return res.data;
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/admin/project/items/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      setForm((prev) => ({ ...prev, imageUrls: [data.url] }));
      toast.success("Project image uploaded!");
    },
    onError: () => toast.error("Failed to upload image."),
  });

  const createMutation = useMutation({
    mutationFn: async (payload: ProjectItem) => {
      const res = await axios.post("/admin/project/items", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Project created successfully!");
      queryClient.invalidateQueries({ queryKey: ["project-items"] });
      setOpen(false);
      resetForm();
    },
    onError: () => toast.error("Failed to create project."),
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: ProjectItem) => {
      const res = await axios.patch(`/admin/project/items/${payload.id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Project updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["project-items"] });
      setOpen(false);
      resetForm();
    },
    onError: () => toast.error("Failed to update project."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => axios.delete(`/admin/project/items/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-items"] });
      toast.success("Project deleted.");
    },
    onError: () => toast.error("Failed to delete project."),
  });

  const resetForm = () => {
    setForm({
      id: 0,
      name: "",
      imageUrls: [""],
      description: "",
      techStack: [],
      githubLink: "",
      type: "Web",
      contribution: "Personal",
      projectLink: "",
    });
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImageMutation.mutate(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTech = (skill: string) => {
    setForm((prev) => {
      const current = prev.techStack;
      return current.includes(skill)
        ? { ...prev, techStack: current.filter((s) => s !== skill) }
        : { ...prev, techStack: [...current, skill] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateMutation.mutate(form);
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (item: ProjectItem) => {
    setForm(item);
    setIsEditing(true);
    setOpen(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Web":
        return <Globe size={14} />;
      case "Mobile":
        return <Smartphone size={14} />;
      case "Machine Learning":
        return <Cpu size={14} />;
      default:
        return <Package size={14} />;
    }
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-[var(--bg-mid)]" />
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-mid)] border border-[var(--border-color)] text-[var(--color-primary)]">
            <Package size={20} />
          </div>
          <h2 className="text-xl font-black text-[var(--text-strong)] uppercase tracking-tight">
            Project Items
          </h2>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="font-bold"
        >
          <Plus size={18} className="mr-2" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectItems?.data?.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden border-2 border-transparent hover:border-[var(--color-primary)]/20 transition-all duration-300 shadow-md"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[var(--bg-dark)]">
              {item.imageUrls[0] ? (
                <Image
                  src={item.imageUrls[0]}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)] opacity-20">
                  <ImageIcon size={48} />
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9 backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="danger"
                  size="icon"
                  className="h-9 w-9 bg-red-600/80 backdrop-blur-md border-red-400/20 text-white"
                  onClick={() => deleteMutation.mutate(item.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest text-[var(--color-on-primary)] shadow-lg">
                  {getTypeIcon(item.type)} {item.type}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                  {item.contribution}
                </span>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <div>
                <CardTitle className="text-lg group-hover:text-[var(--color-primary)] transition-colors">
                  {item.name}
                </CardTitle>
                <p className="text-xs font-medium text-[var(--text-muted)] line-clamp-2 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.techStack.map((tech, i) => (
                  <span
                    // biome-ignore lint: false positive
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[var(--bg-light)] text-[9px] font-bold text-[var(--text-muted)] border border-[var(--border-color)] group-hover:border-[var(--color-primary)]/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-color)]/20">
                {item.githubLink && (
                  <a
                    href={item.githubLink}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-colors"
                  >
                    <Github size={14} /> GitHub
                  </a>
                )}
                {item.projectLink && (
                  <a
                    href={item.projectLink}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Ariakit.Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all"
      >
        <Card className="w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
          <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
            <div>
              <CardTitle>{isEditing ? "Edit Project" : "Add Project"}</CardTitle>
              <CardDescription>
                Fill in the project details and upload creative assets.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
            >
              <X size={20} />
            </Button>
          </CardHeader>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Core Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    Project Name
                  </span>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What did you build?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    Description
                  </span>
                  <Textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Explain the project scope and challenges..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Dropdown
                      label="Platform/Type"
                      value={form.type}
                      options={["Web", "Mobile", "Machine Learning"]}
                      // biome-ignore lint: any
                      onChange={(v) => setForm((p) => ({ ...p, type: v as any }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Dropdown
                      label="Contribution"
                      value={form.contribution}
                      options={["Personal", "Team"]}
                      // biome-ignore lint: any
                      onChange={(v) => setForm((p) => ({ ...p, contribution: v as any }))}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[var(--border-color)]/30">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                      <Github size={14} /> Repository URL
                    </span>
                    <Input
                      name="githubLink"
                      value={form.githubLink}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                      <ExternalLink size={14} /> Live Deployment
                    </span>
                    <Input
                      name="projectLink"
                      value={form.projectLink}
                      onChange={handleChange}
                      placeholder="https://project.com"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Imagery & Tech */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    Visual Assets
                  </span>
                  <div className="group relative h-48 w-full border-2 border-dashed border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--color-primary)] transition-all">
                    {form.imageUrls[0] ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={form.imageUrls[0]}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, imageUrls: [""] }))}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-6 text-[var(--text-muted)]">
                        <Upload size={32} className="mb-2 opacity-20" />
                        <p className="text-sm font-bold">Standard Preview</p>
                        <p className="text-[10px] uppercase opacity-40">16:9 Image Recommended</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                    <Code2 size={14} /> Tech Stack Integration
                  </span>
                  <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-[var(--bg-light)]/40 border border-[var(--border-color)] max-h-[160px] overflow-y-auto custom-scrollbar">
                    {skillsData?.data?.map((skill) => (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleTech(skill.name)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all",
                          form.techStack.includes(skill.name)
                            ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] border-transparent shadow-md"
                            : "bg-[var(--bg-mid)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--color-primary)]",
                        )}
                      >
                        {skill.name}
                      </button>
                    ))}
                    {!skillsData?.data?.length && (
                      <p className="text-[10px] text-center w-full py-4 text-[var(--text-muted)] italic">
                        Populate skills first to tag them here.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-6 border-t border-[var(--border-color)]/30 bg-[var(--bg-light)]/20 animate-in slide-in-from-bottom-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="flex-1 font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 font-bold"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Processing..."
                  : isEditing
                    ? "Update Project"
                    : "Launch Project"}
              </Button>
            </div>
          </form>
        </Card>
      </Ariakit.Dialog>
    </div>
  );
};

export default ProjectItems;
