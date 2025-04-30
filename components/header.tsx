"use client"

import { useState } from "react"
import { Bell, Search, User, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth/auth-context"
import { useAccountContext } from "@/components/account-context-provider"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()
  const { selectedAccounts, toggleAccount, getSelectedAccountsInfo, isMounted } = useAccountContext()
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)

  // 選択されているアカウント情報を取得
  const selectedAccountsInfo = getSelectedAccountsInfo()

  // 現在選択されているアカウント（複数選択の場合は最初のもの）
  const currentAccount = selectedAccountsInfo.length > 0 ? selectedAccountsInfo[0] : null

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("ログアウトに失敗しました:", error)
    }
  }

  // Meta広告アカウントのサンプルデータ
  // 実際の実装ではAPIから取得する
  const availableAccounts = [
    {
      id: "acc001",
      name: "Meta広告アカウント",
      account_id: "123456789012345",
      project_id: "pr00001",
      project_name: "夏季キャンペーン",
    },
    {
      id: "acc002",
      name: "Meta広告アカウント",
      account_id: "234567890123456",
      project_id: "pr00002",
      project_name: "年末プロモーション",
    },
    {
      id: "acc003",
      name: "Meta広告アカウント",
      account_id: "345678901234567",
      project_id: "pr00003",
      project_name: "ブランディング",
    },
    {
      id: "acc004",
      name: "Meta広告アカウント",
      account_id: "456789012345678",
      project_id: "pr00004",
      project_name: "新規顧客獲得",
    },
    {
      id: "acc005",
      name: "Meta広告アカウント",
      account_id: "567890123456789",
      project_id: "pr00005",
      project_name: "認知拡大",
    },
  ]

  // アカウントを選択する
  const selectAccount = (accountId: string) => {
    // 現在の選択をクリアして新しいアカウントを選択
    selectedAccounts.forEach((id) => {
      if (id !== accountId) toggleAccount(id)
    })

    if (!selectedAccounts.includes(accountId)) {
      toggleAccount(accountId)
    }

    setIsAccountDropdownOpen(false)
  }

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center w-full max-w-md">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <Input
          type="search"
          placeholder="検索..."
          className="border-none shadow-none focus-visible:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 広告アカウント選択ドロップダウン */}
      <div className="flex-1 flex justify-center">
        <DropdownMenu open={isAccountDropdownOpen} onOpenChange={setIsAccountDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[280px]">
              {currentAccount ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{currentAccount.project_name}</span>
                    <span className="text-xs text-gray-500">
                      アカウントID: {availableAccounts.find((acc) => acc.id === currentAccount.id)?.account_id || "-"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span>プロジェクトを選択</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-[280px]">
            <DropdownMenuLabel>Meta広告アカウント</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableAccounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                onClick={() => selectAccount(account.id)}
                className={selectedAccounts.includes(account.id) ? "bg-gray-100" : ""}
              >
                <div className="flex flex-col w-full py-1">
                  <span className="font-medium">{account.project_name}</span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">アカウントID: {account.account_id}</span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.name || "ユーザー"}</span>
                <span className="text-xs text-gray-500">{user?.email || ""}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>プロフィール</DropdownMenuItem>
            <DropdownMenuItem>設定</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
