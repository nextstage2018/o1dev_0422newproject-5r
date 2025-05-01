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
const adsetsData = [
  {
    id: "as00001",
    name: "若年層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    placement: "Instagram,Facebook",
    targeting_segment: "18-24歳,学生",
    daily_budget: 5000,
    status: "active",
    created_at: "2023-05-20",
  },
  {
    id: "as00002",
    name: "主婦層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    placement: "Facebook,Display",
    targeting_segment: "30-45歳,女性,子育て",
    daily_budget: 5000,
    status: "active",
    created_at: "2023-05-21",
  },
  {
    id: "as00003",
    name: "ビジネスパーソンターゲット",
    campaign_id: "cp00002",
    campaign_name: "新商品発表キャンペーン",
    placement: "LinkedIn,Display",
    targeting_segment: "25-45歳,ビジネス,IT業界",
    daily_budget: 8000,
    status: "draft",
    created_at: "2023-06-12",
  },
  {
    id: "as00004",
    name: "年末セール一般ターゲット",
    campaign_id: "cp00003",
    campaign_name: "年末セールキャンペーン",
    placement: "Facebook,Instagram,Display",
    targeting_segment: "全年齢,購買意欲高",
    daily_budget: 10000,
    status: "draft",
    created_at: "2023-06-16",
  },
  {
    id: "as00005",
    name: "ブランド認知拡大セット",
    campaign_id: "cp00004",
    campaign_name: "ブランドリニューアルキャンペーン",
    placement: "YouTube,Display",
    targeting_segment: "全年齢,ブランド認知なし",
    daily_budget: 7500,
    status: "paused",
    created_at: "2023-06-21",
  },
  {
    id: "as00006",
    name: "リード獲得セット",
    campaign_id: "cp00005",
    campaign_name: "新規顧客獲得キャンペーン",
    placement: "Facebook,LinkedIn",
    targeting_segment: "25-55歳,ビジネス,意思決定者",
    daily_budget: 8000,
    status: "active",
    created_at: "2023-06-26",
  },
]

export default function AdsetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [placementFilter, setPlacementFilter] = useState("all")
  const [sortField, setSortField] = useState("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

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

  // 配置の種類を抽出（カンマ区切りの文字列を分割して重複を除去）
  const allPlacements = Array.from(
    new Set(adsetsData.flatMap((adset) => adset.placement.split(",").map((p) => p.trim()))),
  ).sort()

  // フィルタリングとソートを適用したデータを取得
  const filteredAdsets = adsetsData
    .filter((adset) => {
      // 検索クエリでフィルタリング
      const matchesSearch =
        searchQuery === "" ||
        adset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adset.campaign_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adset.targeting_segment.toLowerCase().includes(searchQuery.toLowerCase())

      // ステータスでフィルタリング
      const matchesStatus = statusFilter === "all" || adset.status === statusFilter

      // 配置でフィルタリング
      const matchesPlacement = placementFilter === "all" || adset.placement.includes(placementFilter)

      return matchesSearch && matchesStatus && matchesPlacement
    })
    .sort((a, b) => {
      // ソートを適用
      if (sortField === "daily_budget") {
        return sortDirection === "asc" ? a.daily_budget - b.daily_budget : b.daily_budget - a.daily_budget
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
        <h1 className="text-2xl font-bold tracking-tight">広告セット一覧</h1>
        <Link href="/adsets/new-adset">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規広告セット
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告セット検索</CardTitle>
          <CardDescription>広告セット名、キャンペーン名、ID、ターゲティングで検索できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="広告セット名、キャンペーン名、ID、ターゲティングで検索..."
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
                <Select value={placementFilter} onValueChange={setPlacementFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="配置" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての配置</SelectItem>
                    {allPlacements.map((placement) => (
                      <SelectItem key={placement} value={placement}>
                        {placement}
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
          <CardTitle>広告セット一覧</CardTitle>
          <CardDescription>{filteredAdsets.length}件の広告セットが見つかりました</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
                      広告セット名
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>キャンペーン</TableHead>
                  <TableHead>配置</TableHead>
                  <TableHead>ターゲティング</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("daily_budget")}>
                      日予算
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdsets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      該当する広告セットがありません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAdsets.map((adset) => (
                    <TableRow key={adset.id}>
                      <TableCell className="font-medium">{adset.id}</TableCell>
                      <TableCell>
                        <Link href={`/adsets/${adset.id}`} className="text-blue-600 hover:underline">
                          {adset.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/campaigns/${adset.campaign_id}`} className="text-blue-600 hover:underline">
                          {adset.campaign_name}
                        </Link>
                      </TableCell>
                      <TableCell>{adset.placement}</TableCell>
                      <TableCell>{adset.targeting_segment}</TableCell>
                      <TableCell>{formatCurrency(adset.daily_budget)}</TableCell>
                      <TableCell>{getStatusBadge(adset.status)}</TableCell>
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(adset.id)}>
                              IDをコピー
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={`/adsets/${adset.id}`} className="flex w-full">
                                詳細を表示
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/adsets/${adset.id}/edit`} className="flex w-full">
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
