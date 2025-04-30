"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft, Plus } from "lucide-react"
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

export default function NewCampaignPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project_id")

  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(campaignFields)
  const [initialValues, setInitialValues] = useState<Record<string, any>>({})

  // 実際の実装では、APIからフィールド設定を取得
  useEffect(() => {
    // フィールド設定をAPIから取得する処理
    // 例: fetch('/api/settings/campaign-fields')
    //     .then(res => res.json())
    //     .then(data => setFields(data))

    // URLパラメータからプロジェクトIDが渡された場合、初期値として設定
    if (projectId) {
      setInitialValues({
        project_id: projectId,
        // 現在の日付を開始日の初期値として設定
        start_date: new Date().toISOString().split("T")[0],
        status: "draft",
      })
    } else {
      setInitialValues({
        // 現在の日付を開始日の初期値として設定
        start_date: new Date().toISOString().split("T")[0],
        status: "draft",
      })
    }

    // ここではモックデータを使用
    setTimeout(() => {
      setFields(campaignFields)
      setIsLoading(false)
    }, 500)
  }, [projectId])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      console.log("送信データ:", values)

      // 成功メッセージを表示
      toast({
        title: "キャンペーンを登録しました",
        description: `${values.campaign_name}を登録しました`,
      })

      // 送信完了後、キャンペーン一覧ページに戻る
      setTimeout(() => {
        router.push("/campaigns")
      }, 1000)
    } catch (error) {
      console.error("登録エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "キャンペーンの登録に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/campaigns">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">新規キャンペーン登録</h1>
        </div>
      </div>

      <Card className="border-2 border-dashed border-gray-200">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-gray-500" />
            <CardTitle>新規キャンペーン情報</CardTitle>
          </div>
          <CardDescription>新しいキャンペーンの情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <DynamicForm
              fields={fields}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              submitLabel="登録する"
              cancelLabel="キャンセル"
              onCancel={() => router.push("/campaigns")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
