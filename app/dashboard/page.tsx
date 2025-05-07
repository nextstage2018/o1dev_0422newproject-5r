import { DashboardClient } from "@/components/dashboard-client"

// サーバーコンポーネントとしてダッシュボードを実装
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
    },
    {
      title: "Meta広告のオーディエンス拡張",
      description: "類似オーディエンスを活用して、現在のコンバージョン率を維持しながらリーチを拡大します。",
      details:
        "現在のコンバージョン率を維持しながら、新規顧客獲得のためのリーチを拡大することができます。類似度1%から始めて徐々に拡大することをお勧めします。",
      impact: "+7.2%",
      platform: "Meta",
    },
    {
      title: "入札単価の最適化",
      description: "時間帯別・曜日別のパフォーマンスに基づいて入札単価を調整し、ROASを向上させます。",
      details:
        "過去30日間のデータ分析によると、平日の13時〜18時にコンバージョン率が最も高くなっています。この時間帯の入札単価を15%引き上げることで、ROASの向上が見込めます。",
      impact: "+5.8%",
      platform: "Google",
    },
    {
      title: "クリエイティブのA/Bテスト",
      description: "新しいクリエイティブバリエーションを追加し、CTRとコンバージョン率の向上を図ります。",
      details:
        "現在のクリエイティブは3ヶ月以上更新されていません。新しいビジュアルと異なるコピーを使用したA/Bテストを実施することで、広告の効果を高めることができます。",
      impact: "+4.3%",
      platform: "TikTok",
    },
    {
      title: "ランディングページの最適化",
      description: "現在のランディングページのコンバージョン率を分析し、改善ポイントを特定します。",
      details:
        "ヒートマップ分析によると、CTAボタンの視認性が低く、ユーザーがスクロールせずにページを離脱する傾向があります。CTAの位置と色を変更することで、コンバージョン率の向上が期待できます。",
      impact: "+6.5%",
      platform: "全プラットフォーム",
    },
    {
      title: "予算配分の見直し",
      description: "ROASに基づいて各キャンペーンの予算配分を最適化し、全体のパフォーマンスを向上させます。",
      details:
        "現在、ROASの低いキャンペーンに予算が多く配分されています。高パフォーマンスのキャンペーンに予算を再配分することで、全体のROASを向上させることができます。",
      impact: "+8.2%",
      platform: "全プラットフォーム",
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

  // すべてのデータをクライアントコンポーネントに渡す
  const dashboardData = {
    accountPerformance,
    campaignPerformance,
    upcomingMeetings,
    tasks,
    recentActivities,
    improvements,
    analyticsData,
    developmentStatus,
  }

  return <DashboardClient data={dashboardData} />
}
