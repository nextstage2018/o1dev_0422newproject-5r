"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// 広告フィールドの定義
const adFields = [
  {
    id: "ad_id",
    name: "広告ID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad",
  },
  {
    id: "adset_id",
    name: "広告セット",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad",
    options: [
      { value: "as00001", label: "若年層ターゲット" },
      { value: "as00002", label: "主婦層ターゲット" },
      { value: "as00003", label: "ビジネスパーソンターゲット" },
      { value: "as00004", label: "年末セール一般ターゲット" },
      { value: "as00005", label: "ブランド認知拡大セット" },
    ],
  },
  {
    id: "ad_name",
    name: "広告名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad",
  },
  {
    id: "creative_id",
    name: "クリエイティブ",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad",
    options: [
      { value: "cr00001", label: "夏季商品メインビジュアル" },
      { value: "cr00002", label: "夏季商品サブビジュアル" },
      { value: "cr00003", label: "夏季商品ファミリービジュアル" },
      { value: "cr00004", label: "新商品スペック紹介" },
      { value: "cr00005", label: "新ブランドロゴ紹介" },
    ],
  },
  {
    id: "landing_page_url",
    name: "リンク先URL",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad",
  },
  {
    id: "status",
    name: "ステータス",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad",
    options: [
      { value: "active", label: "配信中" },
      { value: "paused", label: "停止中" },
      { value: "draft", label: "下書き" },
      { value: "archived", label: "アーカイブ" },
    ],
  },
  {
    id: "description",
    name: "広告説明",
    type: "string",
    required: false,
    visible: true,
    table: "dim_ad",
  },
]

export default function NewAdPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const adsetId = searchParams.get("adset_id")
  const campaignId = searchParams.get("campaign_id")

  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(adFields)
  const [initialValues, setInitialValues] = useState<Record<string, any>>({})

  // 実際の実装では、APIからフィールド設定を取得
  useEffect(() => {
    // フィールド設定をAPIから取得する処理
    // 例: fetch('/api/settings/ad-fields')
    //     .then(res => res.json())
    //     .then(data => setFields(data))

    // URLパラメータから広告セットIDが渡された場合、初期値として設定
    if (adsetId) {
      setInitialValues({
        adset_id: adsetId,
        status: "draft",
        landing_page_url: "https://example.com",
      })
    } else {
      setInitialValues({
        status: "draft",
        landing_page_url: "https://example.com",
      })
    }

    // ここではモックデータを使用
    setTimeout(() => {
      setFields(adFields)
      setIsLoading(false)
    }, 500)
  }, [adsetId])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      console.log("送信データ:", values)

      // 成功メッセージを表示
      toast({
        title: "広告を登録しました",
        description: `${values.ad_name}を登録しました`,
      })

      // 送信完了後、適切なページに戻る
      setTimeout(() => {
        if (adsetId) {
          router.push(`/adsets/${adsetId}`)
        } else if (campaignId) {
          router.push(`/campaigns/${campaignId}`)
        } else {
          router.push("/ads")
        }
      }, 1000)
    } catch (error) {
      console.error("登録エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "広告の登録に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={adsetId ? `/adsets/${adsetId}` : campaignId ? `/campaigns/${campaignId}` : "/ads"}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">新規広告登録</h1>
        </div>
      </div>

      <Card className="border-2 border-dashed border-gray-200">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-gray-500" />
            <CardTitle>新規広告情報</CardTitle>
          </div>
          <CardDescription>新しい広告の情報を入力してください。</CardDescription>
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
              onCancel={() =>
                router.push(adsetId ? `/adsets/${adsetId}` : campaignId ? `/campaigns/${campaignId}` : "/ads")
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
