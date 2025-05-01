"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// キャンペーンフィールドの定義
const campaignFields = [
  {
    id: "campaign_id",
    name: "キャンペーンID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_campaign",
  },
  {
    id: "project_id",
    name: "プロジェクト",
    type: "string",
    required: true,
    visible: true,
    table: "dim_campaign",
    options: [
      { value: "pr00001", label: "株式会社ABC 夏季プロモーション" },
      { value: "pr00002", label: "DEF株式会社 年末プロモーション" },
      { value: "pr00003", label: "GHI工業 ブランディング" },
      { value: "pr00004", label: "JKLサービス 顧客獲得" },
      { value: "pr00005", label: "MNO商事 認知拡大" },
    ],
  },
  {
    id: "campaign_name",
    name: "キャンペーン名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_campaign",
  },
  {
    id: "objective",
    name: "広告目的",
    type: "string",
    required: true,
    visible: true,
    table: "dim_campaign",
    options: [
      { value: "認知拡大", label: "認知拡大" },
      { value: "リーチ", label: "リーチ" },
      { value: "トラフィック", label: "トラフィック" },
      { value: "エンゲージメント", label: "エンゲージメント" },
      { value: "アプリインストール", label: "アプリインストール" },
      { value: "動画再生", label: "動画再生" },
      { value: "リード獲得", label: "リード獲得" },
      { value: "メッセージ", label: "メッセージ" },
      { value: "コンバージョン", label: "コンバージョン" },
      { value: "カタログ販売", label: "カタログ販売" },
      { value: "来店", label: "来店" },
    ],
  },
  {
    id: "start_date",
    name: "開始日",
    type: "date",
    required: true,
    visible: true,
    table: "dim_campaign",
  },
  {
    id: "end_date",
    name: "終了日",
    type: "date",
    required: false,
    visible: true,
    table: "dim_campaign",
  },
  {
    id: "budget_total",
    name: "総予算",
    type: "integer",
    required: false,
    visible: true,
    table: "dim_campaign",
  },
  {
    id: "budget_daily",
    name: "日予算",
    type: "integer",
    required: true,
    visible: true,
    table: "dim_campaign",
  },
  {
    id: "status",
    name: "ステータス",
    type: "string",
    required: true,
    visible: true,
    table: "dim_campaign",
    options: [
      { value: "active", label: "配信中" },
      { value: "paused", label: "停止中" },
      { value: "draft", label: "下書き" },
      { value: "archived", label: "アーカイブ" },
    ],
  },
  {
    id: "description",
    name: "キャンペーン説明",
    type: "string",
    required: false,
    visible: true,
    table: "dim_campaign",
  },
]

// サンプルデータ - 実際の実装ではAPIから取得
const campaignsData = {
  cp00001: {
    campaign_id: "cp00001",
    project_id: "pr00001",
    campaign_name: "夏季キャンペーン2023",
    objective: "認知拡大",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    budget_total: 1000000,
    budget_daily: 10000,
    status: "active",
    description: "夏季商品のプロモーションキャンペーン。SNSとディスプレイ広告を中心に展開。",
  },
  cp00002: {
    campaign_id: "cp00002",
    project_id: "pr00001",
    campaign_name: "新商品発表キャンペーン",
    objective: "コンバージョン",
    start_date: "2023-09-01",
    end_date: "2023-10-31",
    budget_total: 800000,
    budget_daily: 15000,
    status: "draft",
    description: "新商品発表のためのプロモーションキャンペーン。",
  },
  cp00003: {
    campaign_id: "cp00003",
    project_id: "pr00002",
    campaign_name: "年末セールキャンペーン",
    objective: "コンバージョン",
    start_date: "2023-11-01",
    end_date: "2023-12-31",
    budget_total: 1200000,
    budget_daily: 20000,
    status: "draft",
    description: "年末セールのプロモーション。",
  },
}

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const campaignId = params.id || "cp00001" // デフォルト値を設定
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(campaignFields)
  const [campaignData, setCampaignData] = useState<Record<string, any> | null>(null)

  // 実際の実装では、APIからキャンペーン情報とフィールド設定を取得
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        // 実際の実装ではAPIからデータを取得
        // const response = await fetch(`/api/campaigns/${campaignId}`);
        // const data = await response.json();
        // setCampaignData(data);

        // ここではモックデータを使用
        setTimeout(() => {
          const data = campaignsData[campaignId as keyof typeof campaignsData]
          // データが見つからない場合のエラーハンドリングを改善
          if (data) {
            // 日付文字列をDate型に変換
            const formattedData = {
              ...data,
              start_date: data.start_date ? new Date(data.start_date) : undefined,
              end_date: data.end_date ? new Date(data.end_date) : undefined,
            }
            setCampaignData(formattedData)
            setFields(campaignFields)
            setIsLoading(false)
          } else {
            // エラーメッセージを表示して一覧ページにリダイレクト
            toast({
              title: "エラー",
              description: "キャンペーン情報が見つかりませんでした",
              variant: "destructive",
            })
            // 少し遅延させてからリダイレクト
            setTimeout(() => {
              router.push("/campaigns")
            }, 1500)
          }
        }, 500)
      } catch (error) {
        console.error("データ取得エラー:", error)
        toast({
          title: "エラーが発生しました",
          description: "キャンペーン情報の取得に失敗しました",
          variant: "destructive",
        })
        router.push("/campaigns")
      }
    }

    fetchCampaignData()
  }, [campaignId, router])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      // 例: await fetch(`/api/campaigns/${campaignId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      console.log("更新データ:", values)

      // 成功メッセージを表示
      toast({
        title: "キャンペーン情報を更新しました",
        description: `${values.campaign_name}の情報を更新しました`,
      })

      // 更新完了後、キャンペーン詳細ページに戻る
      setTimeout(() => {
        router.push(`/campaigns/${campaignId}`)
      }, 1000)
    } catch (error) {
      console.error("更新エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "キャンペーン情報の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/campaigns/${campaignId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">キャンペーン編集</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>キャンペーン情報</CardTitle>
          <CardDescription>キャンペーンの情報を編集してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || !campaignData ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <DynamicForm
              fields={fields}
              initialValues={campaignData}
              onSubmit={handleSubmit}
              submitLabel="更新"
              cancelLabel="キャンセル"
              onCancel={() => router.push(`/campaigns/${campaignId}`)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
