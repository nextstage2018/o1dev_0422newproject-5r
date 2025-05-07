"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  BarChart4,
  Lightbulb,
  FileText,
} from "lucide-react"

// ダッシュボードデータの型定義
type DashboardData = {
  accountPerformance: any[]
  campaignPerformance: any[]
  upcomingMeetings: any[]
  tasks: any[]
  recentActivities: any[]
  improvements: any[]
  analyticsData: any
  developmentStatus: any
}

export function DashboardClient({ data }: { data: DashboardData }) {
  const {
    accountPerformance,
    campaignPerformance,
    upcomingMeetings,
    tasks,
    recentActivities,
    improvements,
    analyticsData,
    developmentStatus,
  } = data

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

  // トレンドに応じたアイコンを取得する関数
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  // 数値のフォーマット関数
  const formatNumber = (num: number) => {
    return num.toLocaleString("ja-JP")
  }

  // 金額のフォーマット関数
  const formatCurrency = (num: number) => {
    return num.toLocaleString("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 })
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
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">レポート</Button>
          <Button>新規作成</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="analysis">分析</TabsTrigger>
          <TabsTrigger value="improvements">改善案</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
        </TabsList>

        {/* 概要タブ - メインビュー */}
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総クライアント数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">先月比 +2.5%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">アクティブプロジェクト</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">先月比 +1</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">実行中キャンペーン</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">先月比 -1</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">完了タスク</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">今週 8件完了</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {/* 最近のアクティビティ */}
            <Card>
              <CardHeader>
                <CardTitle>最近のアクティビティ</CardTitle>
                <CardDescription>チーム全体の最近のアクティビティ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                        <span className="text-sm font-medium">{activity.user.initial}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{activity.user.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 今後の予定 */}
            <Card>
              <CardHeader>
                <CardTitle>今後の予定</CardTitle>
                <CardDescription>今後のタスクとミーティング</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{meeting.title}</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <span className="text-xs">詳細</span>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {meeting.date} {meeting.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* アカウント別パフォーマンス */}
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>アカウント別パフォーマンス</CardTitle>
                <CardDescription>各広告アカウントのパフォーマンス概要</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">アカウント名</th>
                        <th className="pb-2 text-right font-medium">広告費</th>
                        <th className="pb-2 text-right font-medium">インプレッション</th>
                        <th className="pb-2 text-right font-medium">クリック</th>
                        <th className="pb-2 text-right font-medium">コンバージョン</th>
                        <th className="pb-2 text-right font-medium">CPA</th>
                        <th className="pb-2 text-right font-medium">ROAS</th>
                        <th className="pb-2 text-center font-medium">トレンド</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {accountPerformance.map((account, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 pr-4">{account.name}</td>
                          <td className="py-3 pr-4 text-right">{formatCurrency(account.spend)}</td>
                          <td className="py-3 pr-4 text-right">{formatNumber(account.impressions)}</td>
                          <td className="py-3 pr-4 text-right">{formatNumber(account.clicks)}</td>
                          <td className="py-3 pr-4 text-right">{formatNumber(account.conversions)}</td>
                          <td className="py-3 pr-4 text-right">{formatCurrency(account.cpa)}</td>
                          <td className="py-3 pr-4 text-right">{account.roas}%</td>
                          <td className="py-3 text-center">{getTrendIcon(account.trend)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* キャンペーン別パフォーマンス */}
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>キャンペーン別パフォーマンス</CardTitle>
                <CardDescription>主要キャンペーンのパフォーマンス概要</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">キャンペーン名</th>
                        <th className="pb-2 text-left font-medium">アカウント</th>
                        <th className="pb-2 text-right font-medium">広告費</th>
                        <th className="pb-2 text-right font-medium">コンバージョン</th>
                        <th className="pb-2 text-right font-medium">CPA</th>
                        <th className="pb-2 text-right font-medium">ROAS</th>
                        <th className="pb-2 text-center font-medium">トレンド</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {campaignPerformance.map((campaign, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 pr-4">{campaign.name}</td>
                          <td className="py-3 pr-4">{campaign.account}</td>
                          <td className="py-3 pr-4 text-right">{formatCurrency(campaign.spend)}</td>
                          <td className="py-3 pr-4 text-right">{formatNumber(campaign.conversions)}</td>
                          <td className="py-3 pr-4 text-right">{formatCurrency(campaign.cpa)}</td>
                          <td className="py-3 pr-4 text-right">{campaign.roas}%</td>
                          <td className="py-3 text-center">{getTrendIcon(campaign.trend)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 分析タブ */}
        <TabsContent value="analysis">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>パフォーマンス分析</CardTitle>
                  <CardDescription>広告パフォーマンスの詳細分析</CardDescription>
                </div>
                <BarChart4 className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pl-2">
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
                  <p className="text-muted-foreground">チャートデータを読み込み中...</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>デバイス別分析</CardTitle>
                  <CardDescription>ユーザーデバイスの内訳</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">モバイル</span>
                        <span className="text-sm text-muted-foreground">{analyticsData.deviceBreakdown.mobile}%</span>
                      </div>
                      <Progress value={analyticsData.deviceBreakdown.mobile} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">デスクトップ</span>
                        <span className="text-sm text-muted-foreground">{analyticsData.deviceBreakdown.desktop}%</span>
                      </div>
                      <Progress value={analyticsData.deviceBreakdown.desktop} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">タブレット</span>
                        <span className="text-sm text-muted-foreground">{analyticsData.deviceBreakdown.tablet}%</span>
                      </div>
                      <Progress value={analyticsData.deviceBreakdown.tablet} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ユーザー属性分析</CardTitle>
                  <CardDescription>年齢・性別の内訳</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-sm font-medium">年齢層</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(analyticsData.demographicData.age).map(([age, percentage], index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div className="relative h-24 w-full">
                              <div
                                className="absolute bottom-0 w-full rounded-t-sm bg-blue-500"
                                style={{ height: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="mt-1 text-xs">{age}</span>
                            <span className="text-xs text-muted-foreground">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium">性別</h3>
                      <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="bg-blue-500"
                          style={{ width: `${analyticsData.demographicData.gender.male}%` }}
                        ></div>
                        <div
                          className="bg-pink-500"
                          style={{ width: `${analyticsData.demographicData.gender.female}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex items-center">
                          <div className="mr-1 h-3 w-3 rounded-full bg-blue-500"></div>
                          <span className="text-xs">男性 {analyticsData.demographicData.gender.male}%</span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-1 h-3 w-3 rounded-full bg-pink-500"></div>
                          <span className="text-xs">女性 {analyticsData.demographicData.gender.female}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 改善案タブ */}
        <TabsContent value="improvements">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {improvements.map((improvement, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="flex items-start p-6">
                  <div className="mr-4 flex-shrink-0">
                    {index % 2 === 0 ? (
                      <FileText className="h-5 w-5 text-blue-500" />
                    ) : index % 3 === 0 ? (
                      <Lightbulb className="h-5 w-5 text-blue-500" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{improvement.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800">{improvement.impact}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{improvement.description}</p>
                    <p className="mt-2 text-xs text-gray-500">{improvement.details}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="outline">{improvement.platform}</Badge>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <span className="text-xs">表示</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 通知タブ */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>通知</CardTitle>
              <CardDescription>システムからの通知とアラート</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <div className="flex items-start">
                    <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
                    <div>
                      <h3 className="font-medium text-yellow-800">予算アラート</h3>
                      <p className="text-sm text-yellow-700">
                        「夏季プロモーション」キャンペーンの予算が90%消化されました。予算の増額を検討してください。
                      </p>
                      <p className="mt-1 text-xs text-yellow-600">2時間前</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-medium text-green-800">パフォーマンス向上</h3>
                      <p className="text-sm text-green-700">
                        「新商品告知」広告のコンバージョン率が先週比で15%向上しました。
                      </p>
                      <p className="mt-1 text-xs text-green-600">1日前</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-blue-800">リマインダー</h3>
                      <p className="text-sm text-blue-700">
                        明日10:00から「クライアントミーティング」が予定されています。
                      </p>
                      <p className="mt-1 text-xs text-blue-600">3時間前</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-start">
                    <FileText className="mr-2 h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">システム更新</h3>
                      <p className="text-sm text-gray-700">
                        システムがバージョン1.5.0に更新されました。新機能の詳細については、ドキュメントをご確認ください。
                      </p>
                      <p className="mt-1 text-xs text-gray-600">2日前</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
