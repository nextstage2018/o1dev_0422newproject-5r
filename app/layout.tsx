import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { AuthProvider } from "@/lib/auth/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "広告管理ダッシュボード",
  description: "広告代理店向けの管理ダッシュボード",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
