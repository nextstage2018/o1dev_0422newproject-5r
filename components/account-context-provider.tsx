"use client"

import type React from "react"

import { useEffect } from "react"
import { create } from "zustand"

interface Account {
  id: string
  name: string
}

interface AccountState {
  accounts: Account[]
  currentAccount: Account | null
  setAccounts: (accounts: Account[]) => void
  setCurrentAccount: (account: Account) => void
}

export const useAccountStore = create<AccountState>((set) => ({
  accounts: [],
  currentAccount: null,
  setAccounts: (accounts) => set({ accounts }),
  setCurrentAccount: (account) => set({ currentAccount: account }),
}))

// サンプルアカウントデータ
const sampleAccounts = [
  { id: "acc1", name: "株式会社ABC広告アカウント" },
  { id: "acc2", name: "XYZ株式会社広告アカウント" },
  { id: "acc3", name: "123株式会社広告アカウント" },
]

interface AccountContextProps {
  children: React.ReactNode
}

export function AccountContextProvider({ children }: AccountContextProps) {
  const { accounts, setAccounts, currentAccount, setCurrentAccount } = useAccountStore()

  // 初期化
  useEffect(() => {
    if (accounts.length === 0) {
      setAccounts(sampleAccounts)
      if (!currentAccount) {
        setCurrentAccount(sampleAccounts[0])
      }
    }
  }, [accounts, currentAccount, setAccounts, setCurrentAccount])

  const getSelectedAccountsInfo = () => {
    return accounts.filter((account) => account.id === currentAccount?.id)
  }

  return (
    <AccountContext.Provider
      value={{ selectedAccounts: accounts, getSelectedAccountsInfo, currentAccount, setCurrentAccount }}
    >
      {children}
    </AccountContext.Provider>
  )
}

import { createContext, useContext } from "react"

interface AccountContextType {
  selectedAccounts: Account[]
  getSelectedAccountsInfo: () => Account[]
  currentAccount: Account | null
  setCurrentAccount: (account: Account) => void
}

const AccountContext = createContext<AccountContextType>({
  selectedAccounts: [],
  getSelectedAccountsInfo: () => [],
  currentAccount: null,
  setCurrentAccount: () => {},
})

export const useAccountContext = () => useContext(AccountContext)
