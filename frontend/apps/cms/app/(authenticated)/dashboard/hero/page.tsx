"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "~lib/axios";
import { useState, useEffect } from "react";
import {
  Loader2,
  Plus,
  Upload,
  X,
  User,
  Trophy,
  FileText,
  Mail,
  Sparkles,
  ImageIcon,
  Save
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { cn } from "~/lib/utils";

type HeroData = {
  name: string;
  rank: string;
  title: string;
  subtitle: string;
  resume_link: string;
  contact_link: string;
  image_url_1: string;
  image_url_2: string;
  image_url_3: string;
  image_url_4: string;
  hobbies: string[];
};

export default function HeroForm() {
  const queryClient = useQueryClient();

  const { data, isLoading: isQueryLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const response = await axios.get("/admin/hero");
      return response.data as HeroData;
    },
  });

  const [form, setForm] = useState({
    name: "",
    rank: "",
    title: "",
    subtitle: "",
    resumeLink: "",
    contactLink: "",
    imageUrls: ["", "", "", ""],
    hobbies: [""],
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        rank: data.rank || "",
        title: data.title || "",
        subtitle: data.subtitle || "",
        resumeLink: data.resume_link || "",
        contactLink: data.contact_link || "",
        imageUrls: [
          data.image_url_1 || "",
          data.image_url_2 || "",
          data.image_url_3 || "",
          data.image_url_4 || "",
        ],
        hobbies: data.hobbies && data.hobbies.length > 0 ? data.hobbies : [""],
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: "imageUrls" | "hobbies", index: number, value: string) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  const uploadImageMutation = useMutation({
    mutationFn: async ({ file, index }: { file: File; index: number }) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/admin/hero/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { url: res.data.url, index };
    },
    onSuccess: (data) => {
      const updated = [...form.imageUrls];
      updated[data.index] = data.url;
      setForm((prev) => ({ ...prev, imageUrls: updated }));
      toast.success(`Image ${data.index + 1} updated!`);
    },
    onError: () => toast.error("Failed to upload image."),
  });

  const savePageMutation = useMutation({
    mutationFn: async (formData: typeof form) => {
      const payload: HeroData = {
        name: formData.name,
        rank: formData.rank,
        title: formData.title,
        subtitle: formData.subtitle,
        resume_link: formData.resumeLink,
        contact_link: formData.contactLink,
        image_url_1: formData.imageUrls[0] || "",
        image_url_2: formData.imageUrls[1] || "",
        image_url_3: formData.imageUrls[2] || "",
        image_url_4: formData.imageUrls[3] || "",
        hobbies: formData.hobbies.filter((h) => h),
      };
      return (await axios.patch("/admin/hero", payload)).data;
    },
    onSuccess: () => {
      toast.success("Hero section updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["hero"] });
    },
    onError: () => toast.error("Failed to update hero section."),
  });

  if (isQueryLoading) return <div className="h-96 animate-pulse rounded-2xl bg-[var(--bg-mid)]" />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-strong)]">Hero Section</h1>
          <p className="text-[var(--text-muted)] font-medium mt-1">Configure your entry point, branding, and hero showcase.</p>
        </div>
        <Button
          size="lg"
          onClick={() => savePageMutation.mutate(form)}
          disabled={savePageMutation.isPending}
          className="shadow-xl shadow-[var(--color-primary)]/20"
        >
          {savePageMutation.isPending ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" size={18} />}
          {savePageMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Information */}
        <div className="xl:col-span-7 space-y-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <User size={20} />
              </div>
              <div>
                <CardTitle>Branding & Identity</CardTitle>
                <CardDescription>How you present yourself at first glance.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Full Name</label>
                  <Input name="name" value={form.name} onChange={handleChange} placeholder="Darel Panel" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2"><Trophy size={14} /> Rank/Status</label>
                  <Input name="rank" value={form.rank} onChange={handleChange} placeholder="e.g. #1 Ranked Developer" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Headline Title</label>
                <Input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Fullstack Engineer" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Short Bio / Subtitle</label>
                <Textarea name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="A punchy one-liner about you..." className="min-h-[100px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]/30">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2"><FileText size={14} /> Resume URL</label>
                  <Input name="resumeLink" value={form.resumeLink} onChange={handleChange} placeholder="https://drive.google.com/..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2"><Mail size={14} /> Contact Link</label>
                  <Input name="contactLink" value={form.contactLink} onChange={handleChange} placeholder="mailto:you@example.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Sparkles size={20} />
                </div>
                <div>
                  <CardTitle>Hobbies & Interests</CardTitle>
                  <CardDescription>Personal touches to your profile.</CardDescription>
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setForm(prev => ({ ...prev, hobbies: [...prev.hobbies, ""] }))}>
                <Plus size={14} className="mr-2" /> Add Hobby
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {form.hobbies.map((hobby, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--bg-light)] text-[10px] font-black text-[var(--text-muted)] border border-[var(--border-color)]">
                      {i + 1}
                    </div>
                    <Input
                      value={hobby}
                      onChange={(e) => handleArrayChange("hobbies", i, e.target.value)}
                      placeholder="e.g. Traveling"
                      className="h-9 flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, hobbies: prev.hobbies.filter((_, j) => j !== i) }))}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Visual Showcase */}
        <div className="xl:col-span-5 space-y-8">
          <Card className="shadow-lg border-2 border-[var(--color-primary)]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ImageIcon size={20} className="text-[var(--color-primary)]" />
                Visual Showcase
              </CardTitle>
              <CardDescription>Upload up to 4 images for your hero carousel.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => {
                const url = form.imageUrls[i];
                const isPending = uploadImageMutation.isPending && uploadImageMutation.variables?.index === i;

                return (
                  <div key={i} className="group relative aspect-square rounded-2xl border-2 border-dashed border-[var(--border-color)] overflow-hidden hover:border-[var(--color-primary)] transition-all">
                    {url ? (
                      <div className="relative h-full w-full">
                        <img src={url} alt={`Showcase ${i + 1}`} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label className="cursor-pointer p-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors">
                            <Upload size={14} />
                            <input type="file" accept="image/*" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadImageMutation.mutate({ file, index: i });
                            }} className="hidden" />
                          </label>
                          <button type="button" onClick={() => handleArrayChange("imageUrls", i, "")} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4 text-[var(--text-muted)] cursor-pointer hover:bg-[var(--bg-light)]/40 transition-colors relative">
                        {isPending ? <Loader2 size={24} className="animate-spin text-[var(--color-primary)]" /> : (
                          <>
                            <Plus size={24} className="mb-2 opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Image {i + 1}</p>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadImageMutation.mutate({ file, index: i });
                        }} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    )}
                    {url && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-green-500 text-white text-[8px] font-black uppercase tracking-widest">
                        Active
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/10">
            <h4 className="flex items-center gap-2 text-sm font-black text-[var(--text-strong)] uppercase tracking-tight">
              <Sparkles size={16} className="text-amber-500" /> Professional Tip
            </h4>
            <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
              Use high-quality PNGs with transparent backgrounds or consistent studio lighting for the best visual impact on your landing page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
