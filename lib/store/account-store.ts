import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface AccountState {
  selectedAccounts: string[]
  toggleAccount: (accountId: string) => void
  setAccounts: (accountIds: string[]) => void
  clearAccounts: () => void
}

// クライアントサイドでのみlocalStorageを使用するためのカスタムストレージ
const createClientSideStorage = () => {
  if (typeof window === "undefined") {
    // サーバーサイドではダミーのストレージを返す
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    }
  }
  return localStorage
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      selectedAccounts: [],
      toggleAccount: (accountId) =>
        set((state) => ({
          selectedAccounts: state.selectedAccounts.includes(accountId)
            ? state.selectedAccounts.filter((id) => id !== accountId)
            : [...state.selectedAccounts, accountId],
        })),
      setAccounts: (accountIds) => set({ selectedAccounts: accountIds }),
      clearAccounts: () => set({ selectedAccounts: [] }),
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => createClientSideStorage()),
    },
  ),
)
