'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '~/hooks/useUser'
import LoadingScreen from '~/components/LoadingScreen'
import Sidebar from '~/components/Sidebar'
import DashboardHeader from '~/components/DashboardHeader'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: user, isLoading, isError } = useUser()

  useEffect(() => {
    if (isError) {
      router.replace('/login')
    }
  }, [isError, router])

  if (isLoading || isError || !user) return <LoadingScreen />

  return (
    <div className="flex min-h-screen bg-[var(--bg-dark)] text-[var(--text-strong)] font-[family-name:var(--font-poppins)]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}
