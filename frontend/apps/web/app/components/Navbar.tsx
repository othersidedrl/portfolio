"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ThemeToggle from "./ui/ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Project", id: "projects" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 transition-timing-function-[cubic-bezier(0.23,1,0.32,1)] ${scrolled ? "pt-4" : "pt-6"
        }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ease-out border shadow-lg ${scrolled
            ? "max-w-[90%] md:max-w-[1100px] bg-[var(--background)]/80 backdrop-blur-xl border-[var(--border-color)] rounded-2xl py-3 px-6 shadow-xl"
            : "max-w-full md:max-w-[1240px] bg-transparent border-transparent py-4 px-8 shadow-none"
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div
            className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-95"
            onClick={() => scrollToSection("home")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") scrollToSection("home");
            }}
          >
            <div
              className={`relative transition-all duration-500 ${scrolled ? "scale-90" : "scale-100"}`}
            >
              <Image src="/icons/logo.svg" alt="Darel Logo" width={32} height={32} />
              <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span
              className={`font-black tracking-[4px] transition-all duration-500 ${scrolled ? "text-lg" : "text-xl"
                } text-[var(--text-strong)] group-hover:text-[var(--color-primary)]`}
            >
              DAREL<span className="text-[var(--color-primary)]">.</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="relative group/nav py-1 text-sm font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-all duration-300 cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover/nav:w-full shadow-[0_0_8px_var(--color-primary-light)]" />
              </li>
            ))}
          </ul>

          {/* Right Side: Theme Toggle + Hamburger */}
          <div className="flex items-center gap-6">
            <ThemeToggle />

            {/* Hamburger (Mobile only) */}
            <button
              type="button"
              className="md:hidden relative p-2 rounded-xl bg-[var(--bg-mid)] border border-[var(--border-color)] text-[var(--text-strong)] transition-all active:scale-90"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <ul className="flex flex-col gap-2 pb-2">
            {navItems.map((item, i) => (
              <li
                key={item.label}
                style={{ transitionDelay: `${i * 50}ms` }}
                className={`px-4 py-3 rounded-xl hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] font-bold text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  }`}
                onClick={() => scrollToSection(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
