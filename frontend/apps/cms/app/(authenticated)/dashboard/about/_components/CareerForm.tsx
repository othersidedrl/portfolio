"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "~lib/axios";
import { toast } from "sonner";
import { useState } from "react";
import * as Ariakit from "@ariakit/react";
import {
  Trash2,
  Pencil,
  Plus,
  X,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  ChevronRight
} from "lucide-react";
import Dropdown from "~/components/ui/Dropdown";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { cn } from "~/lib/utils";

interface CareerItem {
  id: number;
  started_at: string;
  ended_at: string;
  title: string;
  affiliation: string;
  description: string;
  location: string;
  type: "Education" | "Job";
}

const CareerForm = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isPresent, setIsPresent] = useState(false);

  const [form, setForm] = useState<Omit<CareerItem, "id">>({
    started_at: "",
    ended_at: "",
    title: "",
    affiliation: "",
    description: "",
    location: "",
    type: "Education",
  });

  const resetForm = () => {
    setForm({
      started_at: "",
      ended_at: "",
      title: "",
      affiliation: "",
      description: "",
      location: "",
      type: "Education",
    });
    setIsPresent(false);
    setEditId(null);
    setOpen(false);
  };

  const { data: career, isLoading } = useQuery({
    queryKey: ["career"],
    queryFn: async () => {
      const res = await axios.get("admin/about/careers");
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newCareer: Omit<CareerItem, "id">) =>
      (await axios.post("admin/about/careers", newCareer)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career"] });
      toast.success("Career entry added!");
      resetForm();
    },
    onError: (e: any) =>
      toast.error(e?.response?.data?.error || "Failed to create entry."),
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updated,
    }: {
      id: number;
      updated: Omit<CareerItem, "id">;
    }) => (await axios.patch(`admin/about/careers/${id}`, updated)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career"] });
      toast.success("Career entry updated!");
      resetForm();
    },
    onError: (e: any) =>
      toast.error(e?.response?.data?.error || "Failed to update entry."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) =>
      (await axios.delete(`admin/about/careers/${id}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career"] });
      toast.success("Career entry removed.");
    },
    onError: (e: any) =>
      toast.error(e?.response?.data?.error || "Failed to delete entry."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      ended_at: isPresent ? "Present" : form.ended_at,
    };
    if (editId) {
      updateMutation.mutate({ id: editId, updated: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (item: CareerItem) => {
    setForm({
      started_at: item.started_at,
      ended_at: item.ended_at === "Present" ? "" : item.ended_at,
      title: item.title,
      affiliation: item.affiliation,
      description: item.description,
      location: item.location,
      type: item.type,
    });
    setIsPresent(item.ended_at === "Present");
    setEditId(item.id);
    setOpen(true);
  };

  if (isLoading) return <div className="h-64 animate-pulse rounded-xl bg-[var(--bg-mid)]" />;

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Career Journey</CardTitle>
          <CardDescription>Manage your professional and educational history.</CardDescription>
        </div>
        <Button onClick={() => { resetForm(); setOpen(true); }} size="sm" className="font-bold">
          <Plus size={16} className="mr-2" /> Add Entry
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {career?.data?.length > 0 ? (
            career.data.map((item: CareerItem) => (
              <div
                key={item.id}
                className="group relative flex gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-dark)]/40 transition-all hover:bg-[var(--bg-mid)] hover:shadow-md"
              >
                <div className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-light)] shadow-sm group-hover:bg-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)] transition-colors",
                  item.type === "Education" ? "text-blue-500" : "text-amber-500"
                )}>
                  {item.type === "Education" ? <GraduationCap size={20} /> : <Briefcase size={20} />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-[var(--text-strong)] group-hover:text-[var(--color-primary)] transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(item)}>
                        <Pencil size={12} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => deleteMutation.mutate(item.id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[10px] opacity-40">At:</span> {item.affiliation}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="opacity-40" /> {item.started_at} — {item.ended_at}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="opacity-40" /> {item.location}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-medium leading-relaxed text-[var(--text-muted)] mt-2 line-clamp-2 italic">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-32 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-light)]/20 text-[var(--text-muted)]">
              <p className="text-sm font-bold">No career entries yet.</p>
              <p className="text-xs">Click 'Add Entry' to start building your timeline.</p>
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
              <CardTitle>{editId ? "Edit Career" : "Add Career"}</CardTitle>
              <CardDescription>Fill in the details for your journey.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X size={20} />
            </Button>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Start Date</label>
                  <Input
                    type="date"
                    value={form.started_at}
                    onChange={(e) => setForm({ ...form, started_at: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">End Date</label>
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPresent}
                        onChange={(e) => setIsPresent(e.target.checked)}
                        className="h-3 w-3 rounded accent-[var(--color-primary)]"
                      />
                      Is Present
                    </label>
                  </div>
                  <Input
                    type={isPresent ? "text" : "date"}
                    disabled={isPresent}
                    value={isPresent ? "Present" : form.ended_at}
                    onChange={(e) => !isPresent && setForm({ ...form, ended_at: e.target.value })}
                    className={cn(isPresent && "italic opacity-60")}
                    required={!isPresent}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Title</label>
                  <Input
                    placeholder="e.g. Software Engineer"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Affiliation</label>
                  <Input
                    placeholder="e.g. Google"
                    value={form.affiliation}
                    onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Location</label>
                  <Input
                    placeholder="e.g. Jakarta, Indonesia"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Dropdown
                    label="Type"
                    value={form.type}
                    onChange={(val) => setForm({ ...form, type: val as CareerItem["type"] })}
                    options={["Education", "Job"]}
                    placeholder="Select type"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Description</label>
                <Textarea
                  placeholder="Describe your role or studies..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </CardContent>

            <div className="flex gap-3 p-6 border-t border-[var(--border-color)]/30 bg-[var(--bg-light)]/20">
              <Button type="button" variant="secondary" onClick={resetForm} className="flex-1 font-bold">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 font-bold" disabled={createMutation.isPending || updateMutation.isPending}>
                {editId ? "Update Entry" : "Save Entry"}
              </Button>
            </div>
          </form>
        </Card>
      </Ariakit.Dialog>
    </Card>
  );
};

export default CareerForm;
