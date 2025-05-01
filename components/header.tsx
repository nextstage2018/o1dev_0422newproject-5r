"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth/auth-context"

export default function Header() {
  const pathname = usePathname()
  const { logout } = useAuth()

  // パスからページタイトルを取得
  const getPageTitle = () => {
    if (pathname === "/") return "ダッシュボード"
    if (pathname === "/analytics") return "分析"
    if (pathname === "/clients" || pathname?.startsWith("/clients/")) return "クライアント"
    if (pathname === "/projects" || pathname?.startsWith("/projects/")) return "プロジェクト"
    if (pathname === "/campaigns" || pathname?.startsWith("/campaigns/")) return "キャンペーン"
    if (pathname === "/adsets" || pathname?.startsWith("/adsets/")) return "広告セット"
    if (pathname === "/ads" || pathname?.startsWith("/ads/")) return "広告"
    if (pathname === "/creatives" || pathname?.startsWith("/creatives/")) return "クリエイティブ"
    if (pathname === "/tasks" || pathname?.startsWith("/tasks/")) return "タスク"
    if (pathname === "/tests" || pathname?.startsWith("/tests/")) return "テスト"
    if (pathname === "/users" || pathname?.startsWith("/users/")) return "ユーザー"
    if (pathname === "/settings" || pathname?.startsWith("/settings/")) return "設定"
    return ""
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("ログアウトに失敗しました:", error)
    }
  }

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">広告管理システム</span>
          </Link>
          <span className="text-lg font-medium">{getPageTitle()}</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="検索..." className="pl-8" />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>プロフィール</DropdownMenuItem>
              <DropdownMenuItem>設定</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">アカウント選択</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>アカウント1</DropdownMenuItem>
              <DropdownMenuItem>アカウント2</DropdownMenuItem>
              <DropdownMenuItem>アカウント3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
