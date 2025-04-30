"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Search, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useAccountStore } from "@/lib/store/account-store"

export default function Header() {
  const pathname = usePathname()
  const { currentAccount, accounts, setCurrentAccount } = useAccountStore()

  // パスに基づいてページタイトルを取得
  const getPageTitle = () => {
    const pathSegments = pathname?.split("/").filter(Boolean) || []
    const mainPath = pathSegments[0] || "dashboard"

    const titles: Record<string, string> = {
      dashboard: "ダッシュボード",
      analytics: "分析",
      clients: "クライアント",
      projects: "プロジェクト",
      campaigns: "キャンペーン",
      adsets: "広告セット",
      ads: "広告",
      creatives: "クリエイティブ",
      tasks: "タスク",
      tests: "テスト",
      users: "ユーザー",
      settings: "設定",
    }

    return titles[mainPath] || "ダッシュボード"
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/" className="hidden items-center gap-2 md:flex">
        <span className="text-xl font-bold">広告管理システム</span>
      </Link>
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <form className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="検索..." className="w-64 rounded-lg bg-background pl-8 md:w-80" />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600" />
          <span className="sr-only">通知</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">ユーザーメニュー</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>プロフィール</DropdownMenuItem>
            <DropdownMenuItem>設定</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>ログアウト</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden md:flex">
              {currentAccount?.name || "アカウント選択"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>アカウント切替</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {accounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                className={cn("cursor-pointer", currentAccount?.id === account.id && "bg-muted font-medium")}
                onClick={() => setCurrentAccount(account)}
              >
                {account.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
