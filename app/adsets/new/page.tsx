"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// 広告セットフィールドの定義
const adSetFields = [
  {
    id: "adset_id",
    name: "広告セットID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad_set",
  },
  {
    id: "campaign_id",
    name: "キャンペーン",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad_set",
    options: [
      { value: "cp00001", label: "夏季キャンペーン2023" },
      { value: "cp00002", label: "新商品発表キャンペーン" },
      { value: "cp00003", label: "年末セールキャンペーン" },
      { value: "cp00004", label: "ブランドリニューアルキャンペーン" },
      { value: "cp00005", label: "新規顧客獲得キャンペーン" },
    ],
  },
  {
    id: "adset_name",
    name: "広告セット名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad_set",
  },
  {
    id: "placement",
    name: "配置",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad_set",
    options: [
      { value: "Facebook", label: "Facebook" },
      { value: "Instagram", label: "Instagram" },
      { value: "Facebook,Instagram", label: "Facebook,Instagram" },
      { value: "Display", label: "Display" },
      { value: "YouTube", label: "YouTube" },
      { value: "Twitter", label: "Twitter" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "TikTok", label: "TikTok" },
    ],
  },
  {
    id: "targeting_segment",
    name: "ターゲティングセグメント",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad_set",
  },
  {
    id: "daily_budget",
    name: "日予算",
    type: "integer",
    required: true,
    visible: true,
    table: "dim_ad_set",
  },
  {
    id: "status",
    name: "ステータス",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad_set",
    options: [
      { value: "active", label: "配信中" },
      { value: "paused", label: "停止中" },
      { value: "draft", label: "下書き" },
      { value: "archived", label: "アーカイブ" },
    ],
  },
  {
    id: "description",
    name: "広告セット説明",
    type: "string",
    required: false,
    visible: true,
    table: "dim_ad_set",
  },
]

export default function NewAdSetPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const campaignId = searchParams.get("campaign_id")

  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(adSetFields)
  const [initialValues, setInitialValues] = useState<Record<string, any>>({})

  // 実際の実装では、APIからフィールド設定を取得
  useEffect(() => {
    // フィールド設定をAPIから取得する処理
    // 例: fetch('/api/settings/adset-fields')
    //     .then(res => res.json())
    //     .then(data => setFields(data))

    // URLパラメータからキャンペーンIDが渡された場合、初期値として設定
    if (campaignId) {
      setInitialValues({
        campaign_id: campaignId,
        status: "draft",
      })
    } else {
      setInitialValues({
        status: "draft",
      })
    }

    // ここではモックデータを使用
    setTimeout(() => {
      setFields(adSetFields)
      setIsLoading(false)
    }, 500)
  }, [campaignId])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      console.log("送信データ:", values)

      // 成功メッセージを表示
      toast({
        title: "広告セットを登録しました",
        description: `${values.adset_name}を登録しました`,
      })

      // 送信完了後、広告セット一覧ページに戻る
      setTimeout(() => {
        if (campaignId) {
          router.push(`/campaigns/${campaignId}`)
        } else {
          router.push("/adsets")
        }
      }, 1000)
    } catch (error) {
      console.error("登録エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "広告セットの登録に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={campaignId ? `/campaigns/${campaignId}` : "/adsets"}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">新規広告セット登録</h1>
        </div>
      </div>

      <Card className="border-2 border-dashed border-gray-200">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-gray-500" />
            <CardTitle>新規広告セット情報</CardTitle>
          </div>
          <CardDescription>新しい広告セットの情報を入力してください。</CardDescription>
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
              onCancel={() => router.push(campaignId ? `/campaigns/${campaignId}` : "/adsets")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
