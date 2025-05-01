import type React from "react"
import type { Metadata } from "next"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "広告管理システム",
  description: "広告キャンペーン管理システム",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
