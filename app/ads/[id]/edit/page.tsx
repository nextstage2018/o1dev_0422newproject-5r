"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft } from "lucide-react"
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

// サンプルデータ - 実際の実装ではAPIから取得
const adsData = {
  ad00001: {
    ad_id: "ad00001",
    adset_id: "as00001",
    ad_name: "夏季キャンペーン広告1",
    creative_id: "cr00001",
    landing_page_url: "https://example.com/summer-campaign",
    status: "active",
    description: "夏季キャンペーンのメイン広告。若年層向けにInstagramとFacebookで配信。",
  },
  ad00002: {
    ad_id: "ad00002",
    adset_id: "as00001",
    ad_name: "夏季キャンペーン広告2",
    creative_id: "cr00002",
    landing_page_url: "https://example.com/summer-campaign/products",
    status: "active",
    description: "夏季キャンペーンのサブ広告。若年層向けにInstagramとFacebookで配信。",
  },
  ad00003: {
    ad_id: "ad00003",
    adset_id: "as00002",
    ad_name: "夏季キャンペーン広告3",
    creative_id: "cr00003",
    landing_page_url: "https://example.com/summer-campaign/family",
    status: "active",
    description: "夏季キャンペーンのファミリー向け広告。主婦層向けにFacebookとDisplayで配信。",
  },
}

export default function EditAdPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const adId = params.id || "ad00001" // デフォルト値を設定
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(adFields)
  const [adData, setAdData] = useState<Record<string, any> | null>(null)

  // 実際の実装では、APIから広告情報とフィールド設定を取得
  useEffect(() => {
    const fetchAdData = async () => {
      try {
        // 実際の実装ではAPIからデータを取得
        // const response = await fetch(`/api/ads/${adId}`);
        // const data = await response.json();
        // setAdData(data);

        // ここではモックデータを使用
        setTimeout(() => {
          const data = adsData[adId as keyof typeof adsData]
          if (data) {
            setAdData(data)
          } else {
            toast({
              title: "エラー",
              description: "広告情報が見つかりませんでした",
              variant: "destructive",
            })
            router.push("/ads")
          }
          setFields(adFields)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("データ取得エラー:", error)
        toast({
          title: "エラーが発生しました",
          description: "広告情報の取得に失敗しました",
          variant: "destructive",
        })
        router.push("/ads")
      }
    }

    fetchAdData()
  }, [adId, router])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      // 例: await fetch(`/api/ads/${adId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      console.log("更新データ:", values)

      // 成功メッセージを表示
      toast({
        title: "広告情報を更新しました",
        description: `${values.ad_name}の情報を更新しました`,
      })

      // 更新完了後、広告詳細ページに戻る
      setTimeout(() => {
        router.push(`/ads/${adId}`)
      }, 1000)
    } catch (error) {
      console.error("更新エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "広告情報の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/ads/${adId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">広告編集</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告情報</CardTitle>
          <CardDescription>広告の情報を編集してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || !adData ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <DynamicForm
              fields={fields}
              initialValues={adData}
              onSubmit={handleSubmit}
              submitLabel="更新"
              cancelLabel="キャンセル"
              onCancel={() => router.push(`/ads/${adId}`)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
