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

// サンプルデータ
const projectsData = [
  {
    id: "pr00001",
    name: "夏季キャンペーン",
    client_id: "cl00001",
    client_name: "株式会社ABC",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    budget: 1000000,
    adaccount_id: "acc001",
    adaccount_name: "Meta広告アカウント",
    status: "active",
    created_at: "2023-05-15",
  },
  {
    id: "pr00002",
    name: "年末プロモーション",
    client_id: "cl00002",
    client_name: "DEF株式会社",
    start_date: "2023-11-01",
    end_date: "2023-12-31",
    budget: 1200000,
    adaccount_id: "acc002",
    adaccount_name: "Google広告アカウント",
    status: "planning",
    created_at: "2023-05-20",
  },
  {
    id: "pr00003",
    name: "ブランディング",
    client_id: "cl00003",
    client_name: "GHI工業",
    start_date: "2023-08-01",
    end_date: "2023-10-31",
    budget: 800000,
    adaccount_id: "acc003",
    adaccount_name: "Meta広告アカウント",
    status: "active",
    created_at: "2023-05-25",
  },
  {
    id: "pr00004",
    name: "顧客獲得",
    client_id: "cl00004",
    client_name: "JKLサービス",
    start_date: "2023-09-01",
    end_date: "2023-11-30",
    budget: 500000,
    adaccount_id: "acc004",
    adaccount_name: "Twitter広告アカウント",
    status: "active",
    created_at: "2023-05-30",
  },
  {
    id: "pr00005",
    name: "認知拡大",
    client_id: "cl00005",
    client_name: "MNO商事",
    start_date: "2023-10-01",
    end_date: "2023-12-31",
    budget: 600000,
    adaccount_id: "acc005",
    adaccount_name: "TikTok広告アカウント",
    status: "draft",
    created_at: "2023-06-05",
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clientFilter, setClientFilter] = useState("all")
  const [sortField, setSortField] = useState("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // ステータスに応じたバッジの色を取得する関数
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">進行中</Badge>
      case "draft":
        return <Badge className="bg-blue-100 text-blue-800">準備中</Badge>
      case "planning":
        return <Badge className="bg-yellow-100 text-yellow-800">計画中</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">完了</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  // 金額をフォーマットする関数
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // クライアントの一覧（重複を除去）
  const clients = Array.from(new Set(projectsData.map((project) => project.client_id))).map((clientId) => {
    const project = projectsData.find((project) => project.client_id === clientId)
    return {
      id: clientId,
      name: project ? project.client_name : "",
    }
  })

  // フィルタリングとソートを適用したデータを取得
  const filteredProjects = projectsData
    .filter((project) => {
      // 検索クエリでフィルタリング
      const matchesSearch =
        searchQuery === "" ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.id.toLowerCase().includes(searchQuery.toLowerCase())

      // ステータスでフィルタリング
      const matchesStatus = statusFilter === "all" || project.status === statusFilter

      // クライアントでフィルタリング
      const matchesClient = clientFilter === "all" || project.client_id === clientFilter

      return matchesSearch && matchesStatus && matchesClient
    })
    .sort((a, b) => {
      // ソートを適用
      if (sortField === "budget") {
        return sortDirection === "asc" ? a.budget - b.budget : b.budget - a.budget
      } else if (sortField === "start_date") {
        return sortDirection === "asc"
          ? new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
          : new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      } else if (sortField === "name") {
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
        <h1 className="text-2xl font-bold tracking-tight">プロジェクト一覧</h1>
        <Link href="/projects/new-project">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規プロジェクト
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>プロジェクト検索</CardTitle>
          <CardDescription>プロジェクト名、クライアント名、IDで検索できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="プロジェクト名、クライアント名、IDで検索..."
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
                    <SelectItem value="active">進行中</SelectItem>
                    <SelectItem value="planning">計画中</SelectItem>
                    <SelectItem value="draft">準備中</SelectItem>
                    <SelectItem value="completed">完了</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={clientFilter} onValueChange={setClientFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="クライアント" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのクライアント</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
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
          <CardTitle>プロジェクト一覧</CardTitle>
          <CardDescription>{filteredProjects.length}件のプロジェクトが見つかりました</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
                      プロジェクト名
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>クライアント</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("start_date")}>
                      開始日
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>終了日</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("budget")}>
                      予算
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>広告アカウント</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      該当するプロジェクトがありません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.id}</TableCell>
                      <TableCell>
                        <Link href={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                          {project.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/clients/${project.client_id}`} className="text-blue-600 hover:underline">
                          {project.client_name}
                        </Link>
                      </TableCell>
                      <TableCell>{project.start_date}</TableCell>
                      <TableCell>{project.end_date || "-"}</TableCell>
                      <TableCell>{formatCurrency(project.budget)}</TableCell>
                      <TableCell>{project.adaccount_name}</TableCell>
                      <TableCell>{getStatusBadge(project.status)}</TableCell>
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.id)}>
                              IDをコピー
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={`/projects/${project.id}`} className="flex w-full">
                                詳細を表示
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/projects/${project.id}/edit`} className="flex w-full">
                                編集する
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">削除する</DropdownMenuItem>
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
