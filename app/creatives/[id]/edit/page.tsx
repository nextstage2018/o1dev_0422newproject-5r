"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// クリエイティブフィールドの定義
const creativeFields = [
  {
    id: "creative_id",
    name: "クリエイティブID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "creative_name",
    name: "クリエイティブ名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "creative_type",
    name: "クリエイティブ形式",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
    options: [
      { value: "image", label: "画像" },
      { value: "video", label: "動画" },
      { value: "carousel", label: "カルーセル" },
      { value: "collection", label: "コレクション" },
      { value: "slideshow", label: "スライドショー" },
    ],
  },
  {
    id: "folder_id",
    name: "フォルダ",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
    options: [
      { value: "fd00001", label: "夏季キャンペーン素材" },
      { value: "fd00002", label: "新商品発表素材" },
      { value: "fd00003", label: "ブランドリニューアル素材" },
      { value: "fd00004", label: "年末セール素材" },
    ],
  },
  {
    id: "media_id",
    name: "メディアID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "media_url",
    name: "メディアURL",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "headline",
    name: "見出し",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "body_text",
    name: "本文",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "description",
    name: "クリエイティブ説明",
    type: "string",
    required: false,
    visible: true,
    table: "dim_creative",
  },
]

// サンプルデータ - 実際の実装ではAPIから取得
const creativesData = {
  cr00001: {
    creative_id: "cr00001",
    creative_name: "夏季商品メインビジュアル",
    creative_type: "image",
    folder_id: "fd00001",
    media_id: "md00001",
    media_url: "https://via.placeholder.com/800x600?text=Summer+Campaign+Visual",
    headline: "この夏、新しい自分に出会う",
    body_text: "期間限定の夏季コレクションで、あなたのスタイルをアップデート。今だけの特別価格でお届けします。",
    description: "夏季キャンペーンのメインビジュアル。若年層向けに明るく爽やかなイメージで作成。",
  },
  cr00002: {
    creative_id: "cr00002",
    creative_name: "夏季商品サブビジュアル",
    creative_type: "image",
    folder_id: "fd00001",
    media_id: "md00002",
    media_url: "https://via.placeholder.com/800x600?text=Summer+Sub+Visual",
    headline: "夏のアウトドアを楽しもう",
    body_text: "アウトドアシーンで活躍する夏季限定アイテムが勢揃い。耐久性と快適さを兼ね備えた高品質製品です。",
    description: "夏季キャンペーンのサブビジュアル。アウトドア好きな若年層向けに作成。",
  },
  cr00003: {
    creative_id: "cr00003",
    creative_name: "夏季商品ファミリービジュアル",
    creative_type: "image",
    folder_id: "fd00001",
    media_id: "md00003",
    media_url: "https://via.placeholder.com/800x600?text=Summer+Family+Visual",
    headline: "家族で楽しむ夏のひととき",
    body_text: "ご家族でのお出かけに最適な商品ラインナップ。思い出に残る夏をサポートします。",
    description: "夏季キャンペーンのファミリー向けビジュアル。主婦層向けに作成。",
  },
}

export default function EditCreativePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const creativeId = params.id || "cr00001" // デフォルト値を設定
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(creativeFields)
  const [creativeData, setCreativeData] = useState<Record<string, any> | null>(null)

  // 実際の実装では、APIからクリエイティブ情報とフィールド設定を取得
  useEffect(() => {
    const fetchCreativeData = async () => {
      try {
        // 実際の実装ではAPIからデータを取得
        // const response = await fetch(`/api/creatives/${creativeId}`);
        // const data = await response.json();
        // setCreativeData(data);

        // ここではモックデータを使用
        setTimeout(() => {
          const data = creativesData[creativeId as keyof typeof creativesData]
          if (data) {
            setCreativeData(data)
          } else {
            toast({
              title: "エラー",
              description: "クリエイティブ情報が見つかりませんでした",
              variant: "destructive",
            })
            router.push("/creatives")
          }
          setFields(creativeFields)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("データ取得エラー:", error)
        toast({
          title: "エラーが発生しました",
          description: "クリエイティブ情報の取得に失敗しました",
          variant: "destructive",
        })
        router.push("/creatives")
      }
    }

    fetchCreativeData()
  }, [creativeId, router])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      // 例: await fetch(`/api/creatives/${creativeId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      console.log("更新データ:", values)

      // 成功メッセージを表示
      toast({
        title: "クリエイティブ情報を更新しました",
        description: `${values.creative_name}の情報を更新しました`,
      })

      // 更新完了後、クリエイティブ詳細ページに戻る
      setTimeout(() => {
        router.push(`/creatives/${creativeId}`)
      }, 1000)
    } catch (error) {
      console.error("更新エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "クリエイティブ情報の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/creatives/${creativeId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">クリエイティブ編集</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クリエイティブ情報</CardTitle>
          <CardDescription>クリエイティブの情報を編集してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || !creativeData ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <DynamicForm
              fields={fields}
              initialValues={creativeData}
              onSubmit={handleSubmit}
              submitLabel="更新"
              cancelLabel="キャンセル"
              onCancel={() => router.push(`/creatives/${creativeId}`)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
