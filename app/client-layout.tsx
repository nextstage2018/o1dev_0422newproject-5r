"use client"

import type { ReactNode } from "react"
import { Toaster } from "@/components/toaster"
import { AuthProvider } from "@/lib/auth/auth-context"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function ClientLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage =
    pathname?.startsWith("/(auth)") ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password"

  return (
    <AuthProvider>
      {isAuthPage ? (
        children
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
          </div>
        </div>
      )}
      <Toaster />
    </AuthProvider>
  )
}
