"use client";

import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

interface TestimonyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TestimonyModal({ isOpen, onClose }: TestimonyModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation
            document.body.style.overflow = "unset";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={onClose}
        >
            <div 
                className={`w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 ${
                    isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <h2 className="text-xl font-bold text-center text-black mb-6">Send a Testimony</h2>

                {/* Form */}
                <form className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-black">Name</label>
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-black">Where are you from</label>
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                        />
                    </div>

                    {/* Testimony */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-black">Testimony</label>
                        <textarea 
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors resize-none"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="relative group cursor-pointer">
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full h-32 bg-[#D0E0E6] rounded-xl flex flex-col items-center justify-center text-[#5A7A85] border-2 border-transparent group-hover:border-[#5A7A85]/50 transition-colors">
                            <Upload size={32} strokeWidth={1.5} className="mb-2" />
                            <p className="text-sm font-medium">Choose a file <span className="font-normal opacity-75">or drag it here.</span></p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg border border-black text-black font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-2.5 rounded-lg bg-black text-white font-bold hover:bg-gray-900 transition-colors cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
