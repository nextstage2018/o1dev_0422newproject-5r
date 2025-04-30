"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, BarChart2, FileText, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// サンプルデータ - 実際の実装ではAPIから取得
const adAccountsData = [
  {
    id: "acc001",
    name: "Meta広告アカウント",
    platform: "Meta",
    budget: 1000000,
    spent: 750000,
    kpi: "CPA",
    target: 2000,
    current: 1800,
    achievement: 90,
    project_id: "pr00001",
  },
  {
    id: "acc002",
    name: "Google広告アカウント",
    platform: "Google",
    budget: 800000,
    spent: 600000,
    kpi: "ROAS",
    target: 300,
    current: 320,
    achievement: 107,
    project_id: "pr00002",
  },
  {
    id: "acc003",
    name: "Yahoo!広告アカウント",
    platform: "Yahoo",
    budget: 500000,
    spent: 350000,
    kpi: "CPC",
    target: 150,
    current: 130,
    achievement: 115,
    project_id: "pr00003",
  },
  {
    id: "acc004",
    name: "Twitter広告アカウント",
    platform: "Twitter",
    budget: 300000,
    spent: 200000,
    kpi: "CPM",
    target: 800,
    current: 750,
    achievement: 94,
    project_id: "pr00004",
  },
  {
    id: "acc005",
    name: "TikTok広告アカウント",
    platform: "TikTok",
    budget: 400000,
    spent: 250000,
    kpi: "CTR",
    target: 2.5,
    current: 3.1,
    achievement: 124,
    project_id: "pr00005",
  },
]

export default function Home() {
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    campaigns: 0,
    ads: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 実際の実装ではAPIからデータを取得
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // サンプルデータ - 実際の実装ではAPIから取得
        setStats({
          clients: 45,
          projects: 87,
          campaigns: 156,
          ads: 432,
        })
      } catch (error) {
        console.error("ダッシュボードデータの取得に失敗しました", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Meta":
        return "bg-blue-100 text-blue-800"
      case "Google":
        return "bg-red-100 text-red-800"
      case "Yahoo":
        return "bg-purple-100 text-purple-800"
      case "Twitter":
        return "bg-sky-100 text-sky-800"
      case "TikTok":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAchievementColor = (achievement: number) => {
    if (achievement >= 100) return "text-green-600"
    if (achievement >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-sm text-gray-500">全ての広告アカウントの統合データを表示しています</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>読み込み中...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">クライアント数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.clients}</div>
                <p className="text-xs text-muted-foreground">先月比 +{Math.round(stats.clients * 0.2)} (20%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">プロジェクト数</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.projects}</div>
                <p className="text-xs text-muted-foreground">先月比 +{Math.round(stats.projects * 0.26)} (26%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">キャンペーン数</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.campaigns}</div>
                <p className="text-xs text-muted-foreground">先月比 +{Math.round(stats.campaigns * 0.33)} (33%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">広告数</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.ads}</div>
                <p className="text-xs text-muted-foreground">先月比 +{Math.round(stats.ads * 0.22)} (22%)</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>広告アカウント別パフォーマンス</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>広告アカウント</TableHead>
                      <TableHead className="text-right">予算</TableHead>
                      <TableHead className="text-right">消化金額</TableHead>
                      <TableHead>KPI</TableHead>
                      <TableHead className="text-right">目標値</TableHead>
                      <TableHead className="text-right">現在値</TableHead>
                      <TableHead>達成状況</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adAccountsData.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{account.name}</span>
                            <Badge className={cn("text-xs", getPlatformColor(account.platform))}>
                              {account.platform}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(account.budget)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-col items-end">
                            <span>{formatCurrency(account.spent)}</span>
                            <span className="text-xs text-gray-500">
                              {Math.round((account.spent / account.budget) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{account.kpi}</TableCell>
                        <TableCell className="text-right">{account.target.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{account.current.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={account.achievement} className="w-[60px]" />
                            <span className={cn("text-sm font-medium", getAchievementColor(account.achievement))}>
                              {account.achievement}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>最近のアクティビティ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "田中太郎", action: "新しいクライアント「株式会社ABC」を追加しました", time: "1時間前" },
                  { user: "鈴木花子", action: "キャンペーン「夏季セール2023」を更新しました", time: "3時間前" },
                  {
                    user: "佐藤次郎",
                    action: "広告セット「若年層ターゲット」のステータスを変更しました",
                    time: "5時間前",
                  },
                  { user: "山田健太", action: "プロジェクト「新商品発表」を作成しました", time: "昨日" },
                  { user: "伊藤美咲", action: "タスク「クリエイティブ検証」を完了しました", time: "昨日" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gray-100 rounded-full p-2">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-sm text-gray-500">{item.action}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
