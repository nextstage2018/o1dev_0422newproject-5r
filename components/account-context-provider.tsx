"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAccountStore } from "@/lib/store/account-store"

// サンプルデータ - 実際の実装ではAPIから取得
const adAccounts = [
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

interface AccountContextType {
  selectedAccounts: string[]
  toggleAccount: (accountId: string) => void
  getSelectedAccountsInfo: () => {
    id: string
    name: string
    account_id: string
    project_id: string
    project_name: string
  }[]
  isMounted: boolean
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

export function AccountContextProvider({ children }: { children: ReactNode }) {
  const { selectedAccounts, toggleAccount } = useAccountStore()
  const [isMounted, setIsMounted] = useState(false)

  // クライアントサイドでのみ実行されるようにする
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 選択されたアカウントの情報を取得する関数
  const getSelectedAccountsInfo = () => {
    if (!isMounted) return []
    return adAccounts.filter((account) => selectedAccounts.includes(account.id))
  }

  return (
    <AccountContext.Provider
      value={{
        selectedAccounts,
        toggleAccount,
        getSelectedAccountsInfo,
        isMounted,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export function useAccountContext() {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error("useAccountContext must be used within an AccountContextProvider")
  }
  return context
}
