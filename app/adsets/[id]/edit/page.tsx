"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft } from "lucide-react"
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

// サンプルデータ - 実際の実装ではAPIから取得
const adSetsData = {
  as00001: {
    adset_id: "as00001",
    campaign_id: "cp00001",
    adset_name: "若年層ターゲット",
    placement: "Instagram,Facebook",
    targeting_segment: "18-24歳,学生",
    daily_budget: 5000,
    status: "active",
    description: "若年層向けの広告セット。InstagramとFacebookを中心に配信。",
  },
  as00002: {
    adset_id: "as00002",
    campaign_id: "cp00001",
    adset_name: "主婦層ターゲット",
    placement: "Facebook,Display",
    targeting_segment: "30-45歳,女性,子育て",
    daily_budget: 5000,
    status: "active",
    description: "主婦層向けの広告セット。FacebookとDisplay広告を中心に配信。",
  },
  as00003: {
    adset_id: "as00003",
    campaign_id: "cp00002",
    adset_name: "ビジネスパーソンターゲット",
    placement: "LinkedIn,Display",
    targeting_segment: "25-45歳,ビジネス,IT業界",
    daily_budget: 8000,
    status: "draft",
    description: "ビジネスパーソン向けの広告セット。LinkedInとDisplay広告を中心に配信。",
  },
}

export default function EditAdSetPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const adSetId = params.id || "as00001" // デフォルト値を設定
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(adSetFields)
  const [adSetData, setAdSetData] = useState<Record<string, any> | null>(null)

  // 実際の実装では、APIから広告セット情報とフィールド設定を取得
  useEffect(() => {
    const fetchAdSetData = async () => {
      try {
        // 実際の実装ではAPIからデータを取得
        // const response = await fetch(`/api/adsets/${adSetId}`);
        // const data = await response.json();
        // setAdSetData(data);

        // ここではモックデータを使用
        setTimeout(() => {
          const data = adSetsData[adSetId as keyof typeof adSetsData]
          if (data) {
            setAdSetData(data)
          } else {
            toast({
              title: "エラー",
              description: "広告セット情報が見つかりませんでした",
              variant: "destructive",
            })
            router.push("/adsets")
          }
          setFields(adSetFields)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("データ取得エラー:", error)
        toast({
          title: "エラーが発生しました",
          description: "広告セット情報の取得に失敗しました",
          variant: "destructive",
        })
        router.push("/adsets")
      }
    }

    fetchAdSetData()
  }, [adSetId, router])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      // 例: await fetch(`/api/adsets/${adSetId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      console.log("更新データ:", values)

      // 成功メッセージを表示
      toast({
        title: "広告セット情報を更新しました",
        description: `${values.adset_name}の情報を更新しました`,
      })

      // 更新完了後、広告セット詳細ページに戻る
      setTimeout(() => {
        router.push(`/adsets/${adSetId}`)
      }, 1000)
    } catch (error) {
      console.error("更新エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "広告セット情報の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/adsets/${adSetId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">広告セット編集</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告セット情報</CardTitle>
          <CardDescription>広告セットの情報を編集してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || !adSetData ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <DynamicForm
              fields={fields}
              initialValues={adSetData}
              onSubmit={handleSubmit}
              submitLabel="更新"
              cancelLabel="キャンセル"
              onCancel={() => router.push(`/adsets/${adSetId}`)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
