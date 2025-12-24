'use client'

import { usePathname } from 'next/navigation'
import { ChevronRight, LayoutDashboard, User } from 'lucide-react'
import Link from 'next/link'

export default function DashboardHeader() {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-dark)]/80 px-8 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <nav className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 transition-colors hover:text-[var(--color-primary)]"
                    >
                        <LayoutDashboard size={14} />
                        CMS
                    </Link>
                    {segments.slice(1).map((segment, index) => (
                        <div key={segment} className="flex items-center gap-2">
                            <ChevronRight size={14} className="opacity-40" />
                            <span className="capitalize text-[var(--text-strong)]">
                                {segment.replace('-', ' ')}
                            </span>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-full border border-[var(--border-color)] bg-[var(--bg-mid)] px-3 py-1.5 shadow-sm transition-all hover:bg-[var(--bg-light)]">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <User size={14} />
                    </div>
                    <span className="text-xs font-bold tracking-tight text-[var(--text-strong)]">Darel panel</span>
                </div>
            </div>
        </header>
    )
}
