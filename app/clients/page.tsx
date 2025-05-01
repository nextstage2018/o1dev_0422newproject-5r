"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// サンプルデータ
const clientsData = [
  {
    id: "cl00001",
    name: "株式会社ABC",
    industry: "小売",
    contact_person: "山田太郎",
    email: "yamada@abc.co.jp",
    phone: "03-1234-5678",
    status: "active",
    created_at: "2023-04-01",
  },
  {
    id: "cl00002",
    name: "DEF株式会社",
    industry: "IT",
    contact_person: "佐藤花子",
    email: "sato@def.co.jp",
    phone: "03-2345-6789",
    status: "active",
    created_at: "2023-04-15",
  },
  {
    id: "cl00003",
    name: "GHI工業",
    industry: "製造",
    contact_person: "鈴木一郎",
    email: "suzuki@ghi.co.jp",
    phone: "03-3456-7890",
    status: "inactive",
    created_at: "2023-05-01",
  },
  {
    id: "cl00004",
    name: "JKLサービス",
    industry: "サービス",
    contact_person: "高橋次郎",
    email: "takahashi@jkl.co.jp",
    phone: "03-4567-8901",
    status: "active",
    created_at: "2023-05-15",
  },
  {
    id: "cl00005",
    name: "MNO商事",
    industry: "商社",
    contact_person: "田中三郎",
    email: "tanaka@mno.co.jp",
    phone: "03-5678-9012",
    status: "inactive",
    created_at: "2023-06-01",
  },
]

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [sortField, setSortField] = useState("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [clients, setClients] = useState(clientsData)

  // ステータスに応じたバッジの色を取得する関数
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">有効</Badge>
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-800">無効</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  // 削除機能の実装
  const handleDelete = (id: string) => {
    // 実際の実装ではAPIを呼び出して削除
    console.log(`クライアントID: ${id}を削除します`)
    // フロントエンドでの削除処理
    setClients(clients.filter((client) => client.id !== id))
    toast({
      title: "クライアントを削除しました",
      description: `クライアントID: ${id}を削除しました`,
    })
  }

  // 業種の一覧（重複を除去）
  const industries = Array.from(new Set(clients.map((client) => client.industry)))

  // フィルタリングとソートを適用したデータを取得
  const filteredClients = clients
    .filter((client) => {
      // 検索クエリでフィルタリング
      const matchesSearch =
        searchQuery === "" ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.contact_person.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.id.toLowerCase().includes(searchQuery.toLowerCase())

      // ステータスでフィルタリング
      const matchesStatus = statusFilter === "all" || client.status === statusFilter

      // 業種でフィルタリング
      const matchesIndustry = industryFilter === "all" || client.industry === industryFilter

      return matchesSearch && matchesStatus && matchesIndustry
    })
    .sort((a, b) => {
      // ソートを適用
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else {
        // デフォルトは作成日でソート
        return sortDirection === "asc"
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

  // ソートの切り替え
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">クライアント一覧</h1>
        <Link href="/clients/new" passHref>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規クライアント
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クライアント検索</CardTitle>
          <CardDescription>クライアント名、担当者名、IDで検索できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="クライアント名、担当者名、IDで検索..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="w-full sm:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="ステータス" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのステータス</SelectItem>
                    <SelectItem value="active">有効</SelectItem>
                    <SelectItem value="inactive">無効</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="業種" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての業種</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>クライアント一覧</CardTitle>
          <CardDescription>{filteredClients.length}件のクライアントが見つかりました</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
                      クライアント名
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>業種</TableHead>
                  <TableHead>担当者</TableHead>
                  <TableHead>連絡先</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      該当するクライアントがありません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.id}</TableCell>
                      <TableCell>
                        <Link href={`/clients/${client.id}`} className="text-blue-600 hover:underline">
                          {client.name}
                        </Link>
                      </TableCell>
                      <TableCell>{client.industry}</TableCell>
                      <TableCell>{client.contact_person}</TableCell>
                      <TableCell>
                        <div>{client.email}</div>
                        <div>{client.phone}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(client.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">メニューを開く</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>アクション</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(client.id)}>
                              IDをコピー
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={`/clients/${client.id}`} className="flex w-full">
                                詳細を表示
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/clients/${client.id}/edit`} className="flex w-full">
                                編集する
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(client.id)}>
                              削除する
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
