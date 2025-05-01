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
const adsData = [
  {
    id: "ad00001",
    name: "夏季キャンペーン広告1",
    adset_id: "as00001",
    adset_name: "若年層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    creative_id: "cr00001",
    creative_name: "夏季商品メインビジュアル",
    status: "active",
    created_at: "2023-05-25",
  },
  {
    id: "ad00002",
    name: "夏季キャンペーン広告2",
    adset_id: "as00001",
    adset_name: "若年層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    creative_id: "cr00002",
    creative_name: "夏季商品サブビジュアル",
    status: "active",
    created_at: "2023-05-26",
  },
  {
    id: "ad00003",
    name: "夏季キャンペーン広告3",
    adset_id: "as00002",
    adset_name: "主婦層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    creative_id: "cr00003",
    creative_name: "夏季商品ファミリービジュアル",
    status: "active",
    created_at: "2023-05-27",
  },
  {
    id: "ad00004",
    name: "新商品発表広告1",
    adset_id: "as00003",
    adset_name: "ビジネスパーソンターゲット",
    campaign_id: "cp00002",
    campaign_name: "新商品発表キャンペーン",
    creative_id: "cr00004",
    creative_name: "新商品スペック紹介",
    status: "draft",
    created_at: "2023-06-13",
  },
  {
    id: "ad00005",
    name: "年末セール広告1",
    adset_id: "as00004",
    adset_name: "年末セール一般ターゲット",
    campaign_id: "cp00003",
    campaign_name: "年末セールキャンペーン",
    creative_id: "cr00005",
    creative_name: "年末セールメインビジュアル",
    status: "draft",
    created_at: "2023-06-17",
  },
  {
    id: "ad00006",
    name: "ブランドリニューアル広告1",
    adset_id: "as00005",
    adset_name: "ブランド認知拡大セット",
    campaign_id: "cp00004",
    campaign_name: "ブランドリニューアルキャンペーン",
    creative_id: "cr00006",
    creative_name: "新ブランドロゴ紹介",
    status: "paused",
    created_at: "2023-06-22",
  },
]

export default function AdsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [campaignFilter, setCampaignFilter] = useState("all")
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

  // キャンペーンの一覧（重複を除去）
  const campaigns = Array.from(new Set(adsData.map((ad) => ad.campaign_id))).map((campaignId) => {
    const ad = adsData.find((ad) => ad.campaign_id === campaignId)
    return {
      id: campaignId,
      name: ad ? ad.campaign_name : "",
    }
  })

  // フィルタリングとソートを適用したデータを取得
  const filteredAds = adsData
    .filter((ad) => {
      // 検索クエリでフィルタリング
      const matchesSearch =
        searchQuery === "" ||
        ad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.campaign_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.adset_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.creative_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.id.toLowerCase().includes(searchQuery.toLowerCase())

      // ステータスでフィルタリング
      const matchesStatus = statusFilter === "all" || ad.status === statusFilter

      // キャンペーンでフィルタリング
      const matchesCampaign = campaignFilter === "all" || ad.campaign_id === campaignFilter

      return matchesSearch && matchesStatus && matchesCampaign
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
        <h1 className="text-2xl font-bold tracking-tight">広告一覧</h1>
        <Link href="/ads/new-ad">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規広告
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告検索</CardTitle>
          <CardDescription>広告名、キャンペーン名、広告セット名、クリエイティブ名、IDで検索できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="広告名、キャンペーン名、広告セット名、クリエイティブ名、IDで検索..."
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
                <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="キャンペーン" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのキャンペーン</SelectItem>
                    {campaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
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
          <CardTitle>広告一覧</CardTitle>
          <CardDescription>{filteredAds.length}件の広告が見つかりました</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
                      広告名
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>キャンペーン</TableHead>
                  <TableHead>広告セット</TableHead>
                  <TableHead>クリエイティブ</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAds.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      該当する広告がありません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAds.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell className="font-medium">{ad.id}</TableCell>
                      <TableCell>
                        <Link href={`/ads/${ad.id}`} className="text-blue-600 hover:underline">
                          {ad.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/campaigns/${ad.campaign_id}`} className="text-blue-600 hover:underline">
                          {ad.campaign_name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/adsets/${ad.adset_id}`} className="text-blue-600 hover:underline">
                          {ad.adset_name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/creatives/${ad.creative_id}`} className="text-blue-600 hover:underline">
                          {ad.creative_name}
                        </Link>
                      </TableCell>
                      <TableCell>{getStatusBadge(ad.status)}</TableCell>
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(ad.id)}>
                              IDをコピー
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={`/ads/${ad.id}`} className="flex w-full">
                                詳細を表示
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/ads/${ad.id}/edit`} className="flex w-full">
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
