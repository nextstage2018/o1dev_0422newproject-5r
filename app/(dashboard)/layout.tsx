import type { ReactNode } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { AccountContextProvider } from "@/components/account-context-provider"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AccountContextProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">{children}</main>
        </div>
      </div>
    </AccountContextProvider>
  )
}
