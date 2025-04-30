"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Plus, Search, Filter, MoreHorizontal, ArrowUpDown, ImageIcon, Video, Layers } from "lucide-react"

// サンプルデータ
const creativesData = [
  {
    id: "cr00001",
    name: "夏季商品メインビジュアル",
    type: "image",
    media_url: "https://via.placeholder.com/800x600?text=Summer+Campaign+Visual",
    folder_id: "fd00001",
    folder_name: "夏季キャンペーン素材",
    created_at: "2023-05-20",
  },
  {
    id: "cr00002",
    name: "夏季商品サブビジュアル",
    type: "image",
    media_url: "https://via.placeholder.com/800x600?text=Summer+Sub+Visual",
    folder_id: "fd00001",
    folder_name: "夏季キャンペーン素材",
    created_at: "2023-05-21",
  },
  {
    id: "cr00003",
    name: "夏季商品ファミリービジュアル",
    type: "image",
    media_url: "https://via.placeholder.com/800x600?text=Summer+Family+Visual",
    folder_id: "fd00001",
    folder_name: "夏季キャンペーン素材",
    created_at: "2023-05-22",
  },
  {
    id: "cr00004",
    name: "新商品スペック紹介",
    type: "image",
    media_url: "https://via.placeholder.com/800x600?text=New+Product+Specs",
    folder_id: "fd00002",
    folder_name: "新商品発表素材",
    created_at: "2023-06-10",
  },
  {
    id: "cr00005",
    name: "年末セールメインビジュアル",
    type: "image",
    media_url: "https://via.placeholder.com/800x600?text=Year+End+Sale",
    folder_id: "fd00004",
    folder_name: "年末セール素材",
    created_at: "2023-06-15",
  },
  {
    id: "cr00006",
    name: "新ブランドロゴ紹介",
    type: "video",
    media_url: "https://example.com/videos/brand-logo.mp4",
    folder_id: "fd00003",
    folder_name: "ブランドリニューアル素材",
    created_at: "2023-06-20",
  },
  {
    id: "cr00007",
    name: "商品紹介カルーセル",
    type: "carousel",
    media_url: "https://example.com/carousels/product-intro",
    folder_id: "fd00002",
    folder_name: "新商品発表素材",
    created_at: "2023-06-25",
  },
]

export default function CreativesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [folderFilter, setFolderFilter] = useState("all")
  const [sortField, setSortField] = useState("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // クリエイティブタイプに応じたアイコンを取得する関数
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4 text-blue-500" />
      case "video":
        return <Video className="h-4 w-4 text-red-500" />
      case "carousel":
        return <Layers className="h-4 w-4 text-green-500" />
      default:
        return <ImageIcon className="h-4 w-4 text-gray-500" />
    }
  }

  // フォルダの一覧（重複を除去）
  const folders = Array.from(new Set(creativesData.map((creative) => creative.folder_id))).map((folderId) => {
    const creative = creativesData.find((creative) => creative.folder_id === folderId)
    return {
      id: folderId,
      name: creative ? creative.folder_name : "",
    }
  })

  // フィルタリングとソートを適用したデータを取得
  const filteredCreatives = creativesData
    .filter((creative) => {
      // 検索クエリでフィルタリング
      const matchesSearch =
        searchQuery === "" ||
        creative.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creative.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creative.folder_name.toLowerCase().includes(searchQuery.toLowerCase())

      // タイプでフィルタリング
      const matchesType = typeFilter === "all" || creative.type === typeFilter

      // フォルダでフィルタリング
      const matchesFolder = folderFilter === "all" || creative.folder_id === folderFilter

      return matchesSearch && matchesType && matchesFolder
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
        <h1 className="text-2xl font-bold tracking-tight">クリエイティブ一覧</h1>
        <Link href="/creatives/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規クリエイティブ
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クリエイティブ検索</CardTitle>
          <CardDescription>クリエイティブ名、ID、フォルダ名で検索できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="クリエイティブ名、ID、フォルダ名で検索..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="w-full sm:w-40">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="タイプ" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのタイプ</SelectItem>
                    <SelectItem value="image">画像</SelectItem>
                    <SelectItem value="video">動画</SelectItem>
                    <SelectItem value="carousel">カルーセル</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={folderFilter} onValueChange={setFolderFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="フォルダ" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのフォルダ</SelectItem>
                    {folders.map((folder) => (
                      <SelectItem key={folder.id} value={folder.id}>
                        {folder.name}
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
          <CardTitle>クリエイティブ一覧</CardTitle>
          <CardDescription>{filteredCreatives.length}件のクリエイティブが見つかりました</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
                      クリエイティブ名
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>タイプ</TableHead>
                  <TableHead>フォルダ</TableHead>
                  <TableHead>作成日</TableHead>
                  <TableHead>プレビュー</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCreatives.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      該当するクリエイティブがありません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCreatives.map((creative) => (
                    <TableRow key={creative.id}>
                      <TableCell className="font-medium">{creative.id}</TableCell>
                      <TableCell>
                        <Link
                          href={`/creatives/${creative.id}`}
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {getTypeIcon(creative.type)}
                          <span className="ml-2">{creative.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>{creative.type}</TableCell>
                      <TableCell>{creative.folder_name}</TableCell>
                      <TableCell>{creative.created_at}</TableCell>
                      <TableCell>
                        {creative.type === "image" && (
                          <img
                            src={creative.media_url || "/placeholder.svg"}
                            alt={creative.name}
                            className="h-10 w-16 object-cover rounded"
                            onError={(e) => {
                              // エラー時にプレースホルダー画像を表示
                              const target = e.target as HTMLImageElement
                              target.onerror = null // 無限ループ防止
                              target.src = "/abstract-creative-explosion.png"
                            }}
                          />
                        )}
                        {creative.type === "video" && (
                          <div className="h-10 w-16 bg-gray-100 flex items-center justify-center rounded">
                            <Video className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                        {creative.type === "carousel" && (
                          <div className="h-10 w-16 bg-gray-100 flex items-center justify-center rounded">
                            <Layers className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(creative.id)}>
                              IDをコピー
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={`/creatives/${creative.id}`} className="flex w-full">
                                詳細を表示
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/creatives/${creative.id}/edit`} className="flex w-full">
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
