"use client"

import { createContext, useContext, type ReactNode, useEffect, useState } from "react"
import { useAccountStore } from "@/lib/store/account-store"

// サンプルデータ - 実際の実装ではAPIから取得
const adAccounts = [
  { id: "acc001", name: "Meta広告アカウント", platform: "Meta" },
  { id: "acc002", name: "Google広告アカウント", platform: "Google" },
  { id: "acc003", name: "Yahoo!広告アカウント", platform: "Yahoo" },
  { id: "acc004", name: "Twitter広告アカウント", platform: "Twitter" },
  { id: "acc005", name: "TikTok広告アカウント", platform: "TikTok" },
]

interface AccountContextType {
  selectedAccounts: string[]
  selectedAccountsData: Array<{
    id: string
    name: string
    platform: string
  }>
  isLoading: boolean
}

const AccountContext = createContext<AccountContextType>({
  selectedAccounts: [],
  selectedAccountsData: [],
  isLoading: true,
})

export function useAccountContext() {
  return useContext(AccountContext)
}

export function AccountContextProvider({ children }: { children: ReactNode }) {
  const { selectedAccounts } = useAccountStore()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAccountsData, setSelectedAccountsData] = useState<
    Array<{
      id: string
      name: string
      platform: string
    }>
  >([])

  useEffect(() => {
    // 実際の実装ではAPIからアカウント情報を取得
    const fetchAccountData = async () => {
      setIsLoading(true)
      try {
        // APIリクエストの代わりにサンプルデータをフィルタリング
        const filteredAccounts = adAccounts.filter((account) => selectedAccounts.includes(account.id))
        setSelectedAccountsData(filteredAccounts)
      } catch (error) {
        console.error("アカウント情報の取得に失敗しました", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccountData()
  }, [selectedAccounts])

  return (
    <AccountContext.Provider value={{ selectedAccounts, selectedAccountsData, isLoading }}>
      {children}
    </AccountContext.Provider>
  )
}
