"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAccountStore } from "@/lib/store/account-store"

// サンプルデータ - 実際の実装ではAPIから取得
const adAccounts = [
  { id: "acc001", name: "Meta広告アカウント", platform: "Meta", project_id: "pr00001" },
  { id: "acc002", name: "Google広告アカウント", platform: "Google", project_id: "pr00002" },
  { id: "acc003", name: "Yahoo!広告アカウント", platform: "Yahoo", project_id: "pr00003" },
  { id: "acc004", name: "Twitter広告アカウント", platform: "Twitter", project_id: "pr00004" },
  { id: "acc005", name: "TikTok広告アカウント", platform: "TikTok", project_id: "pr00005" },
]

interface AccountContextType {
  selectedAccounts: string[]
  toggleAccount: (accountId: string) => void
  getSelectedAccountsInfo: () => { id: string; name: string; platform: string; project_id: string }[]
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
