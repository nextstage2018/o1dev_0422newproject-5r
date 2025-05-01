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
import { Progress } from "@/components/ui/progress"

// サンプルデータ
const tasksData = [
  {
    id: "jb00001",
    project_id: "pr00001",
    project_name: "株式会社ABC 夏季プロモーション",
    job_type: "campaign_create",
    job_type_label: "キャンペーン作成",
    job_status: "success",
    job_progress: 100,
    job_started_at: "2023-05-25T10:00:00Z",
    job_finished_at: "2023-05-25T10:05:00Z",
    adaccount_id: "acc001",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
  },
  {
    id: "jb00002",
    project_id: "pr00001",
    project_name: "株式会社ABC 夏季プロモーション",
    job_type: "adset_create",
    job_type_label: "広告セット作成",
    job_status: "success",
    job_progress: 100,
    job_started_at: "2023-05-26T11:30:00Z",
    job_finished_at: "2023-05-26T11:35:00Z",
    adaccount_id: "acc001",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
  },
  {
    id: "jb00003",
    project_id: "pr00002",
    project_name: "DEF株式会社 年末プロモーション",
    job_type: "campaign_update",
    job_type_label: "キャンペーン更新",
    job_status: "running",
    job_progress: 65,
    job_started_at: "2023-06-01T14:20:00Z",
    job_finished_at: null,
    adaccount_id: "acc002",
    campaign_id: "cp00003",
    campaign_name: "年末セールキャンペーン",
  },
  {
    id: "jb00004",
    project_id: "pr00003",
    project_name: "GHI工業 ブランディング",
    job_type: "campaign_create",
    job_type_label: "キャンペーン作成",
    job_status: "failure",
    job_progress: 30,
    job_started_at: "2023-06-02T09:15:00Z",
    job_finished_at: "2023-06-02T09:16:30Z",
    adaccount_id: "acc003",
    campaign_id: null,
    campaign_name: null,
  },
  {
    id: "jb00005",
    project_id: "pr00004",
    project_name: "JKLサービス 顧客獲得",
    job_type: "ad_create",
    job_type_label: "広告作成",
    job_status: "pending",
    job_progress: 0,
    job_started_at: null,
    job_finished_at: null,
    adaccount_id: "acc004",
    campaign_id: "cp00005",
    campaign_name: "新規顧客獲得キャンペーン",
  },
]

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortField, setSortField] = useState("job_started_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // ステータスに応じたバッジの色を取得する関数
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">成功</Badge>
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">実行中</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">待機中</Badge>
      case "failure":
        return <Badge className="bg-red-100 text-red-800">失敗</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800">取消</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  // 日時をフォーマットする関数
  const formatDateTime = (dateTimeStr: string | null) => {
    if (!dateTimeStr) return "-"
    const date = new Date(dateTimeStr)
    return date.toLocaleString("ja-JP")
  }

  // タスクタイプの一覧（重複を除去）
  const taskTypes = Array.from(new Set(tasksData.map((task) => task.job_type))).map((type) => {
    const task = tasksData.find((task) => task.job_type === type)
    return {
      id: type,
      name: task ? task.job_type_label : type,
    }
  })

  // フィルタリングとソートを適用したデータを取得
  const filteredTasks = tasksData
    .filter((task) => {
      // 検索クエリでフィルタリング
      const matchesSearch =
        searchQuery === "" ||
        task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.campaign_name && task.campaign_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        task.project_name.toLowerCase().includes(searchQuery.toLowerCase())

      // ステータスでフィルタリング
      const matchesStatus = statusFilter === "all" || task.job_status === statusFilter

      // タイプでフィルタリング
      const matchesType = typeFilter === "all" || task.job_type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      // ソートを適用
      if (sortField === "job_started_at") {
        // nullの場合は最後に表示
        if (!a.job_started_at) return sortDirection === "asc" ? 1 : -1
        if (!b.job_started_at) return sortDirection === "asc" ? -1 : 1
        return sortDirection === "asc"
          ? new Date(a.job_started_at).getTime() - new Date(b.job_started_at).getTime()
          : new Date(b.job_started_at).getTime() - new Date(a.job_started_at).getTime()
      } else if (sortField === "job_progress") {
        return sortDirection === "asc" ? a.job_progress - b.job_progress : b.job_progress - a.job_progress
      } else {
        // デフォルトはID順
        return sortDirection === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
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
        <h1 className="text-2xl font-bold tracking-tight">タスク一覧</h1>
        <Link href="/tasks/new-task">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規タスク
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>タスク検索</CardTitle>
          <CardDescription>タスクID、キャンペーン名、プロジェクト名で検索できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="タスクID、キャンペーン名、プロジェクト名で検索..."
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
                    <SelectItem value="success">成功</SelectItem>
                    <SelectItem value="running">実行中</SelectItem>
                    <SelectItem value="pending">待機中</SelectItem>
                    <SelectItem value="failure">失敗</SelectItem>
                    <SelectItem value="cancelled">取消</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="タスクタイプ" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのタイプ</SelectItem>
                    {taskTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
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
          <CardTitle>タスク一覧</CardTitle>
          <CardDescription>{filteredTasks.length}件のタスクが見つかりました</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>タスクタイプ</TableHead>
                  <TableHead>プロジェクト</TableHead>
                  <TableHead>キャンペーン</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("job_progress")}>
                      進捗
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("job_started_at")}>
                      開始日時
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      該当するタスクがありません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.job_type_label}</TableCell>
                      <TableCell>
                        <Link href={`/projects/${task.project_id}`} className="text-blue-600 hover:underline">
                          {task.project_name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {task.campaign_id ? (
                          <Link href={`/campaigns/${task.campaign_id}`} className="text-blue-600 hover:underline">
                            {task.campaign_name}
                          </Link>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={task.job_progress} className="w-[100px]" />
                          <span>{task.job_progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(task.job_status)}</TableCell>
                      <TableCell>{formatDateTime(task.job_started_at)}</TableCell>
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id)}>
                              IDをコピー
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={`/tasks/${task.id}`} className="flex w-full">
                                詳細を表示
                              </Link>
                            </DropdownMenuItem>
                            {task.job_status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">キャンセル</DropdownMenuItem>
                              </>
                            )}
                            {task.job_status === "failure" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>再実行</DropdownMenuItem>
                              </>
                            )}
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
