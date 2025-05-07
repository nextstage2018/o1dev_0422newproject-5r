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

export default function Dashboard() {
  // アカウント別パフォーマンスデータ
  const accountPerformance = [
    {
      name: "Google広告アカウント",
      id: "google-123456",
      spend: 1250000,
      impressions: 2500000,
      clicks: 75000,
      conversions: 1500,
      cpa: 833,
      roas: 320,
      trend: "up",
    },
    {
      name: "Meta広告アカウント",
      id: "meta-789012",
      spend: 980000,
      impressions: 3200000,
      clicks: 48000,
      conversions: 960,
      cpa: 1021,
      roas: 280,
      trend: "down",
    },
    {
      name: "Yahoo広告アカウント",
      id: "yahoo-345678",
      spend: 750000,
      impressions: 1800000,
      clicks: 36000,
      conversions: 720,
      cpa: 1042,
      roas: 250,
      trend: "up",
    },
    {
      name: "TikTok広告アカウント",
      id: "tiktok-901234",
      spend: 500000,
      impressions: 4500000,
      clicks: 22500,
      conversions: 450,
      cpa: 1111,
      roas: 220,
      trend: "up",
    },
  ]

  // キャンペーン別パフォーマンスデータ
  const campaignPerformance = [
    {
      name: "夏季プロモーション",
      account: "Google広告",
      spend: 450000,
      impressions: 900000,
      clicks: 27000,
      conversions: 540,
      cpa: 833,
      roas: 350,
      trend: "up",
    },
    {
      name: "新商品告知",
      account: "Meta広告",
      spend: 380000,
      impressions: 1200000,
      clicks: 18000,
      conversions: 360,
      cpa: 1056,
      roas: 290,
      trend: "down",
    },
    {
      name: "リターゲティング",
      account: "Google広告",
      spend: 250000,
      impressions: 500000,
      clicks: 15000,
      conversions: 300,
      cpa: 833,
      roas: 380,
      trend: "up",
    },
    {
      name: "ブランド認知",
      account: "TikTok広告",
      spend: 320000,
      impressions: 2800000,
      clicks: 14000,
      conversions: 280,
      cpa: 1143,
      roas: 210,
      trend: "up",
    },
  ]

  // 予定されているミーティングデータ
  const upcomingMeetings = [
    {
      title: "クライアントミーティング",
      date: "2023-05-08",
      time: "10:00",
      participants: ["田中太郎", "鈴木花子", "佐藤次郎"],
      client: "株式会社ABC",
    },
    {
      title: "キャンペーン振り返りMTG",
      date: "2023-05-12",
      time: "14:00-15:30",
      participants: ["田中太郎", "山田健太", "高橋恵子"],
      client: "株式会社XYZ",
    },
    {
      title: "新規プロジェクト打ち合わせ",
      date: "2023-05-15",
      time: "13:00-14:00",
      participants: ["鈴木花子", "佐藤次郎"],
      client: "株式会社DEF",
    },
  ]

  // タスクデータ
  const tasks = [
    {
      name: "夏季キャンペーンの提案資料作成",
      dueDate: "2023-05-15",
      assignee: "田中太郎",
      status: "in-progress",
      priority: "high",
    },
    {
      name: "Meta広告アカウントの最適化",
      dueDate: "2023-05-12",
      assignee: "鈴木花子",
      status: "in-progress",
      priority: "medium",
    },
    {
      name: "新規クライアントの提案資料レビュー",
      dueDate: "2023-05-11",
      assignee: "佐藤次郎",
      status: "planned",
      priority: "high",
    },
    {
      name: "月次レポートの作成",
      dueDate: "2023-05-20",
      assignee: "山田健太",
      status: "planned",
      priority: "medium",
    },
  ]

  // 最近のアクティビティ
  const recentActivities = [
    {
      user: {
        name: "山田太郎",
        initial: "山",
      },
      action: "新しいキャンペーンを作成しました",
      time: "1時間前",
    },
    {
      user: {
        name: "佐藤花子",
        initial: "佐",
      },
      action: "広告セットを更新しました",
      time: "3時間前",
    },
    {
      user: {
        name: "鈴木一郎",
        initial: "鈴",
      },
      action: "タスクを完了しました",
      time: "5時間前",
    },
    {
      user: {
        name: "高橋真理",
        initial: "高",
      },
      action: "新しいクライアントを追加しました",
      time: "昨日",
    },
    {
      user: {
        name: "伊藤健太",
        initial: "伊",
      },
      action: "プロジェクトのステータスを更新しました",
      time: "昨日",
    },
  ]

  // 改善案データ
  const improvements = [
    {
      title: "P-MAX キャンペーンを作成する",
      description:
        "Google のあらゆる広告枠をフル活用して、オンライン販売、見込み顧客発掘、店舗目標、複数の目標のパフォーマンスを最大化できます",
      details:
        "推奨理由: P-MAX をご利用の広告主様では、ご利用前と同程度のコンバージョン単価で、コンバージョン数が平均18% 以上増加しています。出典: Google データ, グローバル, Google 広告, 2022 年 11 月～12 月",
      impact: "+9.6%",
      platform: "Google",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Meta広告のオーディエンス拡張",
      description: "類似オーディエンスを活用して、現在のコンバージョン率を維持しながらリーチを拡大します。",
      details:
        "現在のコンバージョン率を維持しながら、新規顧客獲得のためのリーチを拡大することができます。類似度1%から始めて徐々に拡大することをお勧めします。",
      impact: "+7.2%",
      platform: "Meta",
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "入札単価の最適化",
      description: "時間帯別・曜日別のパフォーマンスに基づいて入札単価を調整し、ROASを向上させます。",
      details:
        "過去30日間のデータ分析によると、平日の13時〜18時にコンバージョン率が最も高くなっています。この時間帯の入札単価を15%引き上げることで、ROASの向上が見込めます。",
      impact: "+5.8%",
      platform: "Google",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "クリエイティブのA/Bテスト",
      description: "新しいクリエイティブバリエーションを追加し、CTRとコンバージョン率の向上を図ります。",
      details:
        "現在のクリエイティブは3ヶ月以上更新されていません。新しいビジュアルと異なるコピーを使用したA/Bテストを実施することで、広告の効果を高めることができます。",
      impact: "+4.3%",
      platform: "TikTok",
      icon: <Lightbulb className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "ランディングページの最適化",
      description: "現在のランディングページのコンバージョン率を分析し、改善ポイントを特定します。",
      details:
        "ヒートマップ分析によると、CTAボタンの視認性が低く、ユーザーがスクロールせずにページを離脱する傾向があります。CTAの位置と色を変更することで、コンバージョン率の向上が期待できます。",
      impact: "+6.5%",
      platform: "全プラットフォーム",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "予算配分の見直し",
      description: "ROASに基づいて各キャンペーンの予算配分を最適化し、全体のパフォーマンスを向上させます。",
      details:
        "現在、ROASの低いキャンペーンに予算が多く配分されています。高パフォーマンスのキャンペーンに予算を再配分することで、全体のROASを向上させることができます。",
      impact: "+8.2%",
      platform: "全プラットフォーム",
      icon: <BarChart4 className="h-5 w-5 text-blue-500" />,
    },
  ]

  // 分析データ
  const analyticsData = {
    weeklyTrends: {
      labels: ["5/1", "5/2", "5/3", "5/4", "5/5", "5/6", "5/7"],
      datasets: [
        {
          name: "インプレッション",
          data: [120000, 135000, 125000, 140000, 160000, 170000, 155000],
        },
        {
          name: "クリック",
          data: [6000, 6750, 6250, 7000, 8000, 8500, 7750],
        },
        {
          name: "コンバージョン",
          data: [120, 135, 125, 140, 160, 170, 155],
        },
      ],
    },
    deviceBreakdown: {
      mobile: 65,
      desktop: 30,
      tablet: 5,
    },
    demographicData: {
      age: {
        "18-24": 15,
        "25-34": 35,
        "35-44": 25,
        "45-54": 15,
        "55+": 10,
      },
      gender: {
        male: 45,
        female: 55,
      },
    },
  }

  // 開発状況データ
  const developmentStatus = {
    overall: 85, // 全体の進捗率（%）
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
        status: "completed",
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
      {
        date: "2023-07-15",
        version: "1.5.0",
        description: "ファイル構造の最適化",
        changes: ["ルーティング構造の改善", "ダッシュボード機能の強化", "修正履歴表示機能の追加"],
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
                {/* DashboardChartsコンポーネントをコメントアウトして、エラーを回避 */}
                {/* <DashboardCharts /> */}
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
                  <div className="mr-4 flex-shrink-0">{improvement.icon}</div>
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
