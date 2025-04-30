"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Briefcase, BarChart2, Layers, FileText, CheckSquare, Settings, LogOut, Home } from "lucide-react"
import { UserCog } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("ログアウトに失敗しました:", error)
    }
  }

  const navItems = [
    { name: "ダッシュボード", href: "/", icon: Home },
    { name: "クライアント", href: "/clients", icon: Users },
    { name: "プロジェクト", href: "/projects", icon: Briefcase },
    { name: "キャンペーン", href: "/campaigns", icon: BarChart2 },
    { name: "広告セット", href: "/adsets", icon: Layers },
    { name: "広告", href: "/ads", icon: FileText },
    { name: "タスク", href: "/tasks", icon: CheckSquare },
    { name: "検証設計", href: "/tests", icon: CheckSquare },
    { name: "ユーザー", href: "/users", icon: UserCog },
    { name: "設定", href: "/settings", icon: Settings },
  ]

  return (
    <div className="bg-white w-64 shadow-md flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">広告管理システム</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm ${
                    isActive(item.href) ? "bg-gray-100 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center text-sm text-gray-700 hover:text-gray-900 w-full" onClick={handleLogout}>
          <LogOut className="h-5 w-5 mr-3" />
          ログアウト
        </button>
      </div>
    </div>
  )
}
