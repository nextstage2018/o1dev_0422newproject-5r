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
