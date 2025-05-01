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
const campaignsData = [
  {
    id: "cp00001",
    name: "夏季キャンペーン2023",
    project_id: "pr00001",
    project_name: "株式会社ABC 夏季プロモーション",
    objective: "認知拡大",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    budget_total: 1000000,
    budget_daily: 10000,
    status: "active",
    created_at: "2023-05-15",
  },
  {
    id: "cp00002",
    name: "新商品発表キャンペーン",
    project_id: "pr00001",
    project_name: "株式会社ABC 夏季プロモーション",
    objective: "コンバージョン",
    start_date: "2023-07-01",
    end_date: "2023-08-15",
    budget_total: 300000,
    budget_daily: 5000,
    status: "draft",
    created_at: "2023-06-10",
  },
  {
    id: "cp00003",
    name: "年末セールキャンペーン",
    project_id: "pr00002",
    project_name: "DEF株式会社 年末プロモーション",
    objective: "コンバージョン",
    start_date: "2023-11-01",
    end_date: "2023-12-31",
    budget_total: 1200000,
    budget_daily: 20000,
    status: "draft",
    created_at: "2023-06-15",
  },
  {
    id: "cp00004",
    name: "ブランドリニューアルキャンペーン",
    project_id: "pr00003",
    project_name: "GHI工業 ブランディング",
    objective: "認知拡大",
    start_date: "2023-08-01",
    end_date: "2023-10-31",
    budget_total: 800000,
    budget_daily: 15000,
    status: "paused",
    created_at: "2023-06-20",
  },
  {
    id: "cp00005",
    name: "新規顧客獲得キャンペーン",
    project_id: "pr00004",
    project_name: "JKLサービス 顧客獲得",
    objective: "リード獲得",
    start_date: "2023-09-01",
    end_date: "2023-11-30",
    budget_total: 500000,
    budget_daily: 8000,
    status: "active",
    created_at: "2023-06-25",
  },
  {
    id: "cp00006",
    name: "認知拡大キャンペーン",
    project_id: "pr00005",
    project_name: "MNO商事 認知拡大",
    objective: "認知拡大",
    start_date: "2023-10-01",
    end_date: "2023-12-31",
    budget_total: 600000,
    budget_daily: 10000,
    status: "active",
    created_at: "2023-06-30",
  },
]

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [objectiveFilter, setObjectiveFilter] = useState("all")
  const [sortField, setSortField] = useState("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [campaigns, setCampaigns] = useState(campaignsData)

  // ステータスに応じたバッジの色を取得する関数
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">配信中</Badge>
      case "draft":
        return <Badge className="bg-blue-100 text-blue-800">下書き</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">停止中</Badge>
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">アーカイブ</Badge>
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

  // 削除機能の実装
  const handleDelete = (id: string) => {
    // 実際の実装ではAPIを呼び出して削除
    console.log(`キャンペーンID: ${id}を削除します`)
    // フロントエンドでの削除処理
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
    toast({
      title: "キャンペーンを削除しました",
      description: `キャンペーンID: ${id}を削除しました`,
    })
  }

  // フィルタリングとソートを適用したデータを取得
  const filteredCampaigns = campaigns
    .filter((campaign) => {
      // 検索クエリでフィルタリング
      const matchesSearch =
        searchQuery === "" ||
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.id.toLowerCase().includes(searchQuery.toLowerCase())

      // ステータスでフィルタリング
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter

      // 広告目的でフィルタリング
      const matchesObjective = objectiveFilter === "all" || campaign.objective === objectiveFilter

      return matchesSearch && matchesStatus && matchesObjective
    })
    .sort((a, b) => {
      // ソートを適用
      if (sortField === "budget_total") {
        return sortDirection === "asc" ? a.budget_total - b.budget_total : b.budget_total - a.budget_total
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

  // 広告目的の一覧（重複を除去）
  const objectives = Array.from(new Set(campaigns.map((campaign) => campaign.objective)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">キャンペーン一覧</h1>
        <Link href="/campaigns/new" passHref>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規キャンペーン
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>キャンペーン検索</CardTitle>
          <CardDescription>キャンペーン名、プロジェクト名、IDで検索できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="キャンペーン名、プロジェクト名、IDで検索..."
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
                    <SelectItem value="active">配信中</SelectItem>
                    <SelectItem value="paused">停止中</SelectItem>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="archived">アーカイブ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={objectiveFilter} onValueChange={setObjectiveFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="広告目的" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての広告目的</SelectItem>
                    {objectives.map((objective) => (
                      <SelectItem key={objective} value={objective}>
                        {objective}
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
          <CardTitle>キャンペーン一覧</CardTitle>
          <CardDescription>{filteredCampaigns.length}件のキャンペーンが見つかりました</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
                      キャンペーン名
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>プロジェクト</TableHead>
                  <TableHead>広告目的</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("start_date")}>
                      開始日
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>終了日</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("budget_total")}>
                      総予算
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      該当するキャンペーンがありません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.id}</TableCell>
                      <TableCell>
                        <Link href={`/campaigns/${campaign.id}`} className="text-blue-600 hover:underline">
                          {campaign.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/projects/${campaign.project_id}`} className="text-blue-600 hover:underline">
                          {campaign.project_name}
                        </Link>
                      </TableCell>
                      <TableCell>{campaign.objective}</TableCell>
                      <TableCell>{campaign.start_date}</TableCell>
                      <TableCell>{campaign.end_date || "-"}</TableCell>
                      <TableCell>{formatCurrency(campaign.budget_total)}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(campaign.id)}>
                              IDをコピー
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={`/campaigns/${campaign.id}`} className="flex w-full">
                                詳細を表示
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/campaigns/${campaign.id}/edit`} className="flex w-full">
                                編集する
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(campaign.id)}>
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
