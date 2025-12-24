"use client";

import {
  ArrowUpRight,
  BarChart3,
  Clock,
  Layers,
  LayoutDashboard,
  MousePointer2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";

const quickActions = [
  {
    label: "Edit Hero",
    href: "/dashboard/hero",
    icon: LayoutDashboard,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Update Projects",
    href: "/dashboard/projects",
    icon: Layers,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    label: "Manage About",
    href: "/dashboard/about",
    icon: BarChart3,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-[var(--text-strong)]">Overview</h1>
        <p className="text-[var(--text-muted)] font-medium">
          Welcome back! Here's what's happening with your portfolio lately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-[var(--color-primary)]/10 shadow-xl shadow-[var(--color-primary)]/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 font-bold uppercase tracking-widest text-[var(--color-primary)]">
              <MousePointer2 size={12} /> Total Visits
            </CardDescription>
            <CardTitle className="text-4xl">1,284</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs font-bold text-green-500">
              <ArrowUpRight size={14} /> +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 font-bold uppercase tracking-widest text-amber-500">
              <Layers size={12} /> Project Views
            </CardDescription>
            <CardTitle className="text-4xl">842</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs font-bold text-green-500">
              <ArrowUpRight size={14} /> +5% from last week
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 font-bold uppercase tracking-widest text-purple-500">
              <Users size={12} /> Lead Gen
            </CardDescription>
            <CardTitle className="text-4xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)]">
              3 new messages today
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8">
          <Card className="shadow-lg border-2 border-[var(--color-primary)]/5 h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest changes across your modules.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="font-bold text-[var(--color-primary)]">
                View All Logs
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  {
                    action: "Updated Biography",
                    module: "About",
                    time: "2 hours ago",
                    icon: Clock,
                  },
                  {
                    action: "Added 'Nexus API' Project",
                    module: "Projects",
                    time: "5 hours ago",
                    icon: Clock,
                  },
                  {
                    action: "Approved 2 Testimonials",
                    module: "Testimonials",
                    time: "Yesterday",
                    icon: Clock,
                  },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-light)] border border-[var(--border-color)] group-hover:bg-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)] transition-colors">
                        <log.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--text-strong)] group-hover:text-[var(--color-primary)] transition-colors">
                          {log.action}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                          {log.module}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-4 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] px-1">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-mid)] border border-[var(--border-color)] hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.bg} ${action.color}`}
                    >
                      <action.icon size={20} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text-strong)] group-hover:text-[var(--color-primary)] transition-colors">
                      {action.label}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
