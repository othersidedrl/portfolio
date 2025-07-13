"use client";

import Image from "next/image";
import ThemeToggle from "./ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["Home", "About", "Testimonials", "Project"];

  return (
    <header className="relative z-50">
      <div className="h-[80px] flex items-center justify-between shadow-[var(--shadow)] bg-[var(--background)] text-[var(--text)] font-poppins transition-shadow duration-300 mx-auto px-4 sm:px-6 lg:px-12 xl:px-[130px]">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <Image src="/icons/logo.svg" alt="Darel Logo" width={40} height={40} />
          <span className="text-[20px] font-bold leading-none tracking-[3px] transition-all duration-300 [text-shadow:0px_2px_4px_rgba(0,0,0,0.25)] dark:[text-shadow:0px_2px_4px_rgba(255,255,255,0.1)]">
            DAREL
          </span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-[20px] font-[400]">
          {navItems.map((text) => (
            <li
              key={text}
              className="hover:text-[var(--secondary)] hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer"
            >
              {text}
            </li>
          ))}
        </ul>

        {/* Right Side: Theme Toggle + Hamburger */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Hamburger (Mobile only) */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <ul className="md:hidden absolute top-[80px] left-0 w-full bg-[var(--background)] px-6 py-4 flex flex-col gap-4 text-[18px] font-medium shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_8px_rgba(255,255,255,0.05)]">
          {navItems.map((text) => (
            <li
              key={text}
              className="hover:text-[var(--secondary)] transition-colors cursor-pointer"
              onClick={() => setMenuOpen(false)} // close on click
            >
              {text}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
