import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "広告管理システム",
  description: "広告キャンペーン管理システム",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
