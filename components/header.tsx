"use client"

import { useState, useEffect } from "react"
import { Bell, Search, User, ChevronDown, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAccountStore } from "@/lib/store/account-store"
import { cn } from "@/lib/utils"

// サンプルデータ - 実際の実装ではAPIから取得
const adAccounts = [
  { id: "acc001", name: "Meta広告アカウント", platform: "Meta", project_id: "pr00001" },
  { id: "acc002", name: "Google広告アカウント", platform: "Google", project_id: "pr00002" },
  { id: "acc003", name: "Yahoo!広告アカウント", platform: "Yahoo", project_id: "pr00003" },
  { id: "acc004", name: "Twitter広告アカウント", platform: "Twitter", project_id: "pr00004" },
  { id: "acc005", name: "TikTok広告アカウント", platform: "TikTok", project_id: "pr00005" },
]

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const { selectedAccounts, toggleAccount } = useAccountStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // クライアントサイドでのみ実行されるようにする
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 実際の実装ではAPIからアカウント情報を取得
  useEffect(() => {
    // アカウント情報の初期化（実際の実装ではAPIから取得）
    if (isMounted && selectedAccounts.length === 0) {
      toggleAccount(adAccounts[0].id) // デフォルトで最初のアカウントを選択
    }
  }, [isMounted, selectedAccounts.length, toggleAccount])

  const getSelectedAccountsText = () => {
    if (!isMounted || selectedAccounts.length === 0) {
      return "アカウントを選択"
    } else if (selectedAccounts.length === 1) {
      const account = adAccounts.find((acc) => acc.id === selectedAccounts[0])
      return account ? account.name : "アカウントを選択"
    } else {
      return `${selectedAccounts.length}個のアカウントを選択中`
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Meta":
        return "bg-blue-100 text-blue-800"
      case "Google":
        return "bg-red-100 text-red-800"
      case "Yahoo":
        return "bg-purple-100 text-purple-800"
      case "Twitter":
        return "bg-sky-100 text-sky-800"
      case "TikTok":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4 w-2/3">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center justify-between min-w-[240px]">
                <span className="truncate">{getSelectedAccountsText()}</span>
                <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[240px]">
              <DropdownMenuLabel>広告アカウント選択</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {adAccounts.map((account) => (
                <DropdownMenuCheckboxItem
                  key={account.id}
                  checked={isMounted && selectedAccounts.includes(account.id)}
                  onCheckedChange={() => toggleAccount(account.id)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span>{account.name}</span>
                    <Badge className={cn("text-xs", getPlatformColor(account.platform))}>{account.platform}</Badge>
                  </div>
                  {isMounted && selectedAccounts.includes(account.id) && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
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
        </div>
      </div>
    </header>
  )
}
