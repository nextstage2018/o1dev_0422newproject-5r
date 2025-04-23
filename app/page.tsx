"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, BarChart2, FileText, User } from "lucide-react"
import { DashboardCharts } from "@/components/dashboard-charts"
import { useAccountContext } from "@/components/account-context-provider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Home() {
  const { selectedAccountsData, isLoading } = useAccountContext()
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    campaigns: 0,
    ads: 0,
  })

  useEffect(() => {
    // 実際の実装ではAPIからデータを取得
    // 選択されたアカウントに基づいてデータを取得
    const fetchDashboardData = async () => {
      try {
        // サンプルデータ - 実際の実装ではAPIから取得
        // 選択されたアカウントの数に応じてデータを変更
        setStats({
          clients: 12 * selectedAccountsData.length,
          projects: 24 * selectedAccountsData.length,
          campaigns: 48 * selectedAccountsData.length,
          ads: 120 * selectedAccountsData.length,
        })
      } catch (error) {
        console.error("ダッシュボードデータの取得に失敗しました", error)
      }
    }

    if (selectedAccountsData.length > 0) {
      fetchDashboardData()
    } else {
      setStats({
        clients: 0,
        projects: 0,
        campaigns: 0,
        ads: 0,
      })
    }
  }, [selectedAccountsData])

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">ダッシュボード</h1>
        {selectedAccountsData.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedAccountsData.map((account) => (
              <Badge key={account.id} className={cn("text-xs", getPlatformColor(account.platform))}>
                {account.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            アカウントが選択されていません。ヘッダーからアカウントを選択してください。
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>読み込み中...</p>
        </div>
      ) : selectedAccountsData.length > 0 ? (
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

          <DashboardCharts />

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
      ) : (
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <div className="text-center">
            <p className="text-gray-500 mb-2">アカウントが選択されていません</p>
            <p className="text-sm text-gray-400">ヘッダーからアカウントを選択してデータを表示します</p>
          </div>
        </div>
      )}
    </div>
  )
}
