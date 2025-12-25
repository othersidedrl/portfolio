"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, Loader2, Star, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "~lib/axios";

interface TestimonyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonyModal({ isOpen, onClose }: TestimonyModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const queryClient = useQueryClient();

  // Form State
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const submissionMutation = useMutation({
    mutationFn: async () => {
      let profileUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`;

      // 1. Upload Image (only if selected)
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const uploadRes = await axios.post("/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        profileUrl = uploadRes.data.url;
      }

      // 2. Create Testimony
      return await axios.post("/testimony/items", {
        name,
        profile_url: profileUrl,
        affiliation,
        rating,
        description,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimony-items"] });
      onClose();
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Reset form on close
        setName("");
        setAffiliation("");
        setRating(5);
        setDescription("");
        setSelectedFile(null);
        setPreviewUrl(null);
        submissionMutation.reset();
      }, 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen, submissionMutation.reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submissionMutation.mutate();
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      tabIndex={-1}
    >
      <div
        className={`w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-center text-black mb-6">Send a Testimony</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label htmlFor="testimony-name" className="text-sm font-medium text-black">
              Name
            </label>
            <input
              id="testimony-name"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
            />
          </div>

          {/* Affiliation */}
          <div className="space-y-1">
            <label htmlFor="testimony-affiliation" className="text-sm font-medium text-black">
              Affiliation / Location
            </label>
            <input
              id="testimony-affiliation"
              required
              type="text"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              placeholder="e.g. Tech Company"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col items-center space-y-1">
            <span id="rating-label" className="text-sm font-medium text-black">
              Rating
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none group"
                >
                  <Star
                    size={32}
                    fill={star <= rating ? "gold" : "none"}
                    className={`transition-colors ${star <= rating ? "text-yellow-300" : "text-gray-300 group-hover:text-gray-400"} hover:scale-110`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Testimony */}
          <div className="space-y-1">
            <label htmlFor="testimony-content" className="text-sm font-medium text-black">
              Testimony
            </label>
            <textarea
              id="testimony-content"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us what you think..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors resize-none"
            />
          </div>

          {/* Image Upload */}
          <button
            tabIndex={0}
            type="button"
            className="relative group cursor-pointer w-full block"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div
              className={`w-full h-32 rounded-xl flex flex-col items-center justify-center transition-all border-2 border-dotted ${
                previewUrl
                  ? "border-black/50 bg-gray-50"
                  : "bg-[#D0E0E6] text-[#5A7A85] border-[#5A7A85] hover:border-[#5A7A85] hover:bg-[#D0E0E6]/80"
              }`}
            >
              {previewUrl ? (
                <div className="flex items-center gap-4 px-4 w-full">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">{selectedFile?.name}</p>
                    <p className="text-xs text-center text-gray-500">Click to change</p>
                  </div>
                </div>
              ) : (
                <>
                  <Download size={32} strokeWidth={1.5} className="mb-2" />
                  <p className="text-sm font-medium text-center">
                    Choose a profile picture{" "}
                    <span className="font-normal opacity-75">or drag it here.</span>
                  </p>
                </>
              )}
            </div>
          </button>

          {submissionMutation.error && (
            <p className="text-sm text-red-500 text-center">
              {(submissionMutation.error as Error).message ||
                "Failed to submit testimony. Please try again."}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submissionMutation.isPending}
              className="flex-1 py-2.5 rounded-lg border border-[var(--border-soft)] text-[var(--text-soft)] font-semibold hover:bg-[var(--border-soft)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submissionMutation.isPending}
              className="flex-1 py-2.5 rounded-lg bg-[var(--primary)] text-white font-bold hover:scale-105 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submissionMutation.isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
