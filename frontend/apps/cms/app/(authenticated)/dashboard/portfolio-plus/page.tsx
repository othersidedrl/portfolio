"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import {
  PlusCircle,
  Sparkles,
  Zap,
  ShieldCheck,
  Ghost,
  MessageSquarePlus,
  Rocket
} from "lucide-react";

export default function PortfolioPlusPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-[var(--text-strong)]">Portfolio+</h1>
        <p className="text-[var(--text-muted)] font-medium">Elevate your digital presence with premium exclusive features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden border-2 border-[var(--color-primary)] shadow-xl shadow-[var(--color-primary)]/10">
          <div className="absolute top-0 right-0 p-3">
            <span className="px-2 py-1 rounded-lg bg-[var(--color-primary)] text-[8px] font-black uppercase tracking-widest text-[var(--color-on-primary)] shadow-lg animate-pulse">Pro</span>
          </div>
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-4">
              <Zap size={24} strokeWidth={2.5} />
            </div>
            <CardTitle>AI Content Enhancer</CardTitle>
            <CardDescription>Automatically refine your bio and project descriptions using advanced LLMs.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Button className="w-full font-bold">Use Enhancer</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:border-[var(--color-primary)]/20 transition-all group">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-4 group-hover:scale-110 transition-transform">
              <Rocket size={24} strokeWidth={2.5} />
            </div>
            <CardTitle>SEO Accelerator</CardTitle>
            <CardDescription>Optimize your page metadata and social graph for maximum reach.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Button variant="secondary" className="w-full font-bold">Launch Check</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:border-[var(--color-primary)]/20 transition-all group">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <CardTitle>Security Auditor</CardTitle>
            <CardDescription>Scan your portfolio links and assets for broken references and vulnerabilities.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Button variant="secondary" className="w-full font-bold">Start Audit</Button>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-3xl p-12 bg-gradient-to-br from-[var(--bg-mid)] to-[var(--bg-dark)] border border-[var(--border-color)] text-center space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--bg-light)] border-4 border-[var(--bg-dark)] shadow-2xl">
          <Sparkles size={40} className="text-amber-500 animate-bounce" />
        </div>
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-black text-[var(--text-strong)] uppercase tracking-tight">Need a Custom Module?</h2>
          <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed italic">
            Portfolio+ is expandable. If you need a custom tool for your management workflow, let me know and I'll build it for you.
          </p>
        </div>
        <Button variant="secondary" size="lg" className="rounded-2xl font-black uppercase tracking-widest px-8">
          <MessageSquarePlus size={18} className="mr-3" /> Request Feature
        </Button>
      </div>
    </div>
  );
}