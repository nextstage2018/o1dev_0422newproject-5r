import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Client = {
  client_id: string
  client_name: string
  industry: string
  contact_person: string
  email: string
  phone: string
  address: string
  status: string
  notes: string
}

// 初期データ
const initialClients: Client[] = [
  {
    client_id: "cl00001",
    client_name: "株式会社ABC",
    industry: "小売",
    contact_person: "山田太郎",
    email: "yamada@abc.co.jp",
    phone: "03-1234-5678",
    address: "東京都渋谷区渋谷1-1-1",
    status: "active",
    notes: "大手小売チェーン。季節ごとのキャンペーンを実施。",
  },
  {
    client_id: "cl00002",
    client_name: "DEF株式会社",
    industry: "IT",
    contact_person: "佐藤花子",
    email: "sato@def.co.jp",
    phone: "03-2345-6789",
    address: "東京都新宿区新宿2-2-2",
    status: "active",
    notes: "ITサービス企業。ウェブマーケティングに注力。",
  },
  {
    client_id: "cl00003",
    client_name: "GHI工業",
    industry: "製造",
    contact_person: "鈴木一郎",
    email: "suzuki@ghi.co.jp",
    phone: "03-3456-7890",
    address: "大阪府大阪市中央区3-3-3",
    status: "inactive",
    notes: "製造業。現在は取引休止中。",
  },
  {
    client_id: "cl00004",
    client_name: "JKLサービス",
    industry: "サービス",
    contact_person: "高橋次郎",
    email: "takahashi@jkl.co.jp",
    phone: "03-4567-8901",
    address: "東京都品川区4-4-4",
    status: "active",
    notes: "サービス業。顧客満足度向上に注力。",
  },
  {
    client_id: "cl00005",
    client_name: "MNO商事",
    industry: "商社",
    contact_person: "田中三郎",
    email: "tanaka@mno.co.jp",
    phone: "03-5678-9012",
    address: "大阪府大阪市北区5-5-5",
    status: "inactive",
    notes: "商社。海外展開を検討中。",
  },
]

type ClientStore = {
  clients: Client[]
  getAllClients: () => Client[]
  getClient: (id: string) => Client | undefined
  addClient: (client: Client) => void
  updateClient: (id: string, client: Partial<Client>) => void
  deleteClient: (id: string) => void
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      clients: initialClients,

      getAllClients: () => get().clients,

      getClient: (id) => get().clients.find((client) => client.client_id === id),

      addClient: (client) => {
        set((state) => ({
          clients: [...state.clients, client],
        }))
      },

      updateClient: (id, updatedClient) => {
        set((state) => ({
          clients: state.clients.map((client) => (client.client_id === id ? { ...client, ...updatedClient } : client)),
        }))
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((client) => client.client_id !== id),
        }))
      },
    }),
    {
      name: "client-store",
    },
  ),
)
