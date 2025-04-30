"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardCharts } from "@/components/dashboard-charts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, AlertCircle, ArrowRight, Circle } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // 開発状況データ
  const developmentStatus = {
    overall: 65, // 全体の進捗率（%）
    features: [
      {
        name: "ユーザー認証",
        description: "ログイン、パスワードリセット機能",
        status: "completed",
        progress: 100,
        link: "/settings/users",
      },
      {
        name: "クライアント管理",
        description: "クライアント情報の登録・編集",
        status: "completed",
        progress: 100,
        link: "/clients",
      },
      {
        name: "プロジェクト管理",
        description: "プロジェクトの作成・編集・管理",
        status: "completed",
        progress: 100,
        link: "/projects",
      },
      {
        name: "キャンペーン管理",
        description: "広告キャンペーンの作成・編集",
        status: "completed",
        progress: 100,
        link: "/campaigns",
      },
      {
        name: "広告セット管理",
        description: "広告セットの作成・編集",
        status: "completed",
        progress: 100,
        link: "/adsets",
      },
      {
        name: "広告管理",
        description: "広告の作成・編集",
        status: "completed",
        progress: 100,
        link: "/ads",
      },
      {
        name: "クリエイティブ管理",
        description: "クリエイティブの作成・編集",
        status: "completed",
        progress: 100,
        link: "/creatives",
      },
      {
        name: "タスク管理",
        description: "タスクの作成・編集・管理",
        status: "completed",
        progress: 100,
        link: "/tasks",
      },
      {
        name: "レポート機能",
        description: "パフォーマンスレポートの生成",
        status: "in-progress",
        progress: 60,
        link: "/reports",
      },
      {
        name: "API連携",
        description: "外部広告プラットフォームとの連携",
        status: "in-progress",
        progress: 40,
        link: "/settings/integrations",
      },
      {
        name: "自動最適化",
        description: "広告パフォーマンスの自動最適化",
        status: "planned",
        progress: 0,
        link: "/settings/optimization",
      },
      {
        name: "高度な分析",
        description: "AIを活用した広告分析",
        status: "planned",
        progress: 0,
        link: "/analytics",
      },
    ],
    tasks: [
      {
        name: "キャンペーン作成フォームの改善",
        assignee: "田中太郎",
        dueDate: "2023-05-15",
        status: "in-progress",
      },
      {
        name: "広告セットのバッチ編集機能",
        assignee: "鈴木花子",
        dueDate: "2023-05-20",
        status: "in-progress",
      },
      {
        name: "クリエイティブプレビュー機能",
        assignee: "佐藤次郎",
        dueDate: "2023-05-18",
        status: "completed",
      },
      {
        name: "ユーザー権限設定の拡張",
        assignee: "山田健太",
        dueDate: "2023-05-25",
        status: "planned",
      },
      {
        name: "レポートエクスポート機能",
        assignee: "高橋恵子",
        dueDate: "2023-05-22",
        status: "planned",
      },
    ],
    history: [
      {
        date: "2023-05-01",
        version: "1.0.0",
        description: "初期リリース",
        changes: ["ユーザー認証機能", "クライアント管理機能", "プロジェクト管理機能"],
      },
      {
        date: "2023-05-15",
        version: "1.1.0",
        description: "キャンペーン管理機能追加",
        changes: ["キャンペーン作成・編集機能", "キャンペーン一覧表示機能", "キャンペーン詳細表示機能"],
      },
      {
        date: "2023-06-01",
        version: "1.2.0",
        description: "広告セット・広告管理機能追加",
        changes: ["広告セット作成・編集機能", "広告作成・編集機能", "クリエイティブ管理機能"],
      },
      {
        date: "2023-06-15",
        version: "1.3.0",
        description: "タスク管理機能追加",
        changes: ["タスク作成・編集機能", "タスク一覧表示機能", "タスク詳細表示機能"],
      },
      {
        date: "2023-07-01",
        version: "1.4.0",
        description: "レポート機能追加（一部）",
        changes: ["基本的なレポート生成機能", "レポート表示機能", "レポートエクスポート機能（一部）"],
      },
    ],
  }

  // ステータスに応じたバッジの色とアイコンを取得する関数
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "bg-green-100 text-green-800", icon: <CheckCircle2 className="h-4 w-4 mr-1" /> }
      case "in-progress":
        return { color: "bg-blue-100 text-blue-800", icon: <Clock className="h-4 w-4 mr-1" /> }
      case "planned":
        return { color: "bg-gray-100 text-gray-800", icon: <Circle className="h-4 w-4 mr-1" /> }
      default:
        return { color: "bg-gray-100 text-gray-800", icon: <AlertCircle className="h-4 w-4 mr-1" /> }
    }
  }

  // タスクステータスに応じたバッジの色を取得する関数
  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "planned":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="development">開発状況</TabsTrigger>
          <TabsTrigger value="tasks">タスク</TabsTrigger>
          <TabsTrigger value="history">修正履歴</TabsTrigger>
        </TabsList>

        {/* 概要タブ - 既存のダッシュボード内容 */}
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">クライアント数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">前月比 +2.5%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">プロジェクト数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">前月比 +10%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">キャンペーン数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">前月比 +15%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">広告数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
                <p className="text-xs text-muted-foreground">前月比 +12%</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>パフォーマンス概要</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardCharts />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>最近のアクティビティ</CardTitle>
                <CardDescription>過去7日間のアクティビティ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        新規キャンペーン「夏季プロモーション」が作成されました
                      </p>
                      <p className="text-sm text-muted-foreground">2時間前</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        広告「新商品告知」のパフォーマンスが15%向上しました
                      </p>
                      <p className="text-sm text-muted-foreground">5時間前</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        新規クライアント「株式会社ABC」が追加されました
                      </p>
                      <p className="text-sm text-muted-foreground">1日前</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        プロジェクト「ブランドリニューアル」が完了しました
                      </p>
                      <p className="text-sm text-muted-foreground">2日前</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        広告セット「モバイルターゲティング」が最適化されました
                      </p>
                      <p className="text-sm text-muted-foreground">3日前</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 開発状況タブ - 新しく追加 */}
        <TabsContent value="development">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>開発進捗状況</CardTitle>
                <CardDescription>システム全体の開発進捗</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">全体進捗: {developmentStatus.overall}%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="flex h-full">
                    <div
                      className="bg-green-500"
                      style={{ width: `${Math.min(developmentStatus.overall, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">完了</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">進行中</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-gray-300"></div>
                    <span className="text-xs">予定</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>機能開発状況</CardTitle>
                <CardDescription>各機能の開発状況</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">機能名</th>
                        <th className="pb-2 text-left font-medium">説明</th>
                        <th className="pb-2 text-left font-medium">ステータス</th>
                        <th className="pb-2 text-left font-medium">進捗</th>
                        <th className="pb-2 text-left font-medium"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {developmentStatus.features.map((feature, index) => {
                        const { color, icon } = getStatusBadge(feature.status)
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 pr-4">{feature.name}</td>
                            <td className="py-3 pr-4">{feature.description}</td>
                            <td className="py-3 pr-4">
                              <div
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
                              >
                                {icon}
                                {feature.status === "completed"
                                  ? "完了"
                                  : feature.status === "in-progress"
                                    ? "進行中"
                                    : "予定"}
                              </div>
                            </td>
                            <td className="py-3 pr-4 w-32">
                              <div className="flex items-center">
                                <Progress value={feature.progress} className="h-2 w-full" />
                                <span className="ml-2 text-xs">{feature.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={feature.link}>
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* タスクタブ - 新しく追加 */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>最近のタスク</CardTitle>
              <CardDescription>開発関連のタスク一覧</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">タスク名</th>
                      <th className="pb-2 text-left font-medium">担当者</th>
                      <th className="pb-2 text-left font-medium">期限</th>
                      <th className="pb-2 text-left font-medium">ステータス</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {developmentStatus.tasks.map((task, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 pr-4">{task.name}</td>
                        <td className="py-3 pr-4">{task.assignee}</td>
                        <td className="py-3 pr-4">{task.dueDate}</td>
                        <td className="py-3 pr-4">
                          <Badge className={getTaskStatusBadge(task.status)}>
                            {task.status === "completed" ? "完了" : task.status === "in-progress" ? "進行中" : "予定"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 修正履歴タブ - 新しく追加 */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>システム修正履歴</CardTitle>
              <CardDescription>バージョン別の修正履歴</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* 左側の時間軸ライン */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div className="space-y-8 pl-6">
                  {developmentStatus.history.map((item, index) => (
                    <div key={index} className="relative">
                      {/* 時間軸上の丸いマーカー */}
                      <div className="absolute -left-6 mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow"></div>

                      <div className="mb-2 flex items-center">
                        <Badge className="mr-2 bg-blue-100 text-blue-800">v{item.version}</Badge>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>

                      <h3 className="text-lg font-medium">{item.description}</h3>

                      <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                        {item.changes.map((change, changeIndex) => (
                          <li key={changeIndex}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
