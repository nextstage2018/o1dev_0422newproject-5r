"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"

// 実際の実装ではAPIから取得
const clientFields = [
  {
    id: "client_id",
    name: "会社ID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_client",
  },
  {
    id: "client_name",
    name: "会社名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_client",
  },
  {
    id: "industry",
    name: "業種",
    type: "string",
    required: true,
    visible: true,
    table: "dim_client",
    options: [
      { value: "小売", label: "小売" },
      { value: "IT", label: "IT" },
      { value: "製造", label: "製造" },
      { value: "サービス", label: "サービス" },
      { value: "商社", label: "商社" },
      { value: "金融", label: "金融" },
      { value: "不動産", label: "不動産" },
      { value: "その他", label: "その他" },
    ],
  },
  {
    id: "contact",
    name: "担当者名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_client",
  },
  {
    id: "email",
    name: "メールアドレス",
    type: "string",
    required: true,
    visible: true,
    table: "dim_client",
  },
  {
    id: "phone",
    name: "電話番号",
    type: "string",
    required: true,
    visible: true,
    table: "dim_client",
  },
  {
    id: "address",
    name: "住所",
    type: "string",
    required: false,
    visible: true,
    table: "dim_client",
  },
  {
    id: "delivery_status",
    name: "配信ステータス",
    type: "string",
    required: true,
    visible: true,
    table: "dim_client",
    options: [
      { value: "active", label: "有効" },
      { value: "inactive", label: "無効" },
      { value: "pending", label: "保留中" },
    ],
  },
]

export default function NewClientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(clientFields)

  // 実際の実装では、APIからフィールド設定を取得
  useEffect(() => {
    // フィールド設定をAPIから取得する処理
    // 例: fetch('/api/settings/client-fields')
    //     .then(res => res.json())
    //     .then(data => setFields(data))

    // ここではモックデータを使用
    setTimeout(() => {
      setFields(clientFields)
      setIsLoading(false)
    }, 500)
  }, [])

  const handleSubmit = async (values: Record<string, any>) => {
    // ここでAPIリクエストを送信する
    console.log("送信データ:", values)

    // 送信完了後、クライアント一覧ページに戻る
    setTimeout(() => {
      router.push("/clients")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">新規クライアント登録</h1>

      <Card>
        <CardHeader>
          <CardTitle>クライアント情報</CardTitle>
          <CardDescription>新しいクライアント企業の情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              submitLabel="登録"
              cancelLabel="キャンセル"
              onCancel={() => router.push("/clients")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
