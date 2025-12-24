"use client";

import { Briefcase, LayoutDashboard, LogOut, MessageCircle, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbExternalLink, TbRocket } from "react-icons/tb";
import { cn } from "~/lib/utils";

const navItems = [
  { label: "Hero", href: "/dashboard/hero", icon: TbRocket },
  { label: "About", href: "/dashboard/about", icon: User },
  { label: "Testimonials", href: "/dashboard/testimonials", icon: MessageCircle },
  { label: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { label: "Portfolio+", href: "/dashboard/portfolio-plus", icon: PlusCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 h-screen fixed px-4 py-8 flex flex-col justify-between border-r border-[var(--border-color)] bg-[var(--bg-mid)] shadow-lg z-40">
      <div className="space-y-8">
        <div className="px-4">
          <Link href="/dashboard" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-lg transition-transform group-hover:scale-105">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-[var(--text-strong)] leading-none">
                CMS
              </h2>
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-1">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        <nav className="space-y-1.5 px-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300",
                  isActive
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-light)] hover:text-[var(--text-strong)]",
                )}
              >
                <Icon size={18} className={cn(isActive && "animate-pulse")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-2">
        <div className="mb-4 px-4 py-3 rounded-xl bg-[var(--bg-light)]/50 border border-[var(--border-color)]/50">
          <a
            href="/"
            target="_blank"
            className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors"
            rel="noopener"
          >
            View Portfolio
            <TbExternalLink size={14} />
          </a>
        </div>

        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 px-4 py-2.5 text-sm font-bold rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>
    </aside>
  );
}
