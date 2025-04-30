"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft, Plus } from "lucide-react"
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

export default function NewCreativePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(creativeFields)
  const [initialValues, setInitialValues] = useState<Record<string, any>>({})

  // 実際の実装では、APIからフィールド設定を取得
  useEffect(() => {
    // フィールド設定をAPIから取得する処理
    // 例: fetch('/api/settings/creative-fields')
    //     .then(res => res.json())
    //     .then(data => setFields(data))

    // 初期値を設定
    setInitialValues({
      creative_type: "image",
      media_url: "https://via.placeholder.com/800x600?text=New+Creative",
      headline: "新しいクリエイティブ",
      body_text: "ここに本文を入力してください",
    })

    // ここではモックデータを使用
    setTimeout(() => {
      setFields(creativeFields)
      setIsLoading(false)
    }, 500)
  }, [])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      console.log("送信データ:", values)

      // 成功メッセージを表示
      toast({
        title: "クリエイティブを登録しました",
        description: `${values.creative_name}を登録しました`,
      })

      // 送信完了後、クリエイティブ一覧ページに戻る
      setTimeout(() => {
        router.push("/creatives")
      }, 1000)
    } catch (error) {
      console.error("登録エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "クリエイティブの登録に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/creatives">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">新規クリエイティブ登録</h1>
        </div>
      </div>

      <Card className="border-2 border-dashed border-gray-200">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-gray-500" />
            <CardTitle>新規クリエイティブ情報</CardTitle>
          </div>
          <CardDescription>新しいクリエイティブの情報を入力してください。</CardDescription>
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
              onCancel={() => router.push("/creatives")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
