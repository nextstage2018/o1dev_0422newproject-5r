"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// クライアントフィールドの定義
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
      { value: "active", label: "配信中" },
      { value: "paused", label: "停止" },
      { value: "archived", label: "アーカイブ" },
      { value: "draft", label: "下書き" },
      { value: "test", label: "テスト" },
    ],
  },
]

// サンプルデータ - 実際の実装ではAPIから取得
const clientsData = {
  cl00001: {
    client_id: "cl00001",
    client_name: "株式会社ABC",
    industry: "小売",
    contact: "田中太郎",
    email: "tanaka@abc.co.jp",
    phone: "03-1234-5678",
    address: "東京都渋谷区渋谷1-1-1",
    delivery_status: "active",
  },
  cl00002: {
    client_id: "cl00002",
    client_name: "DEF株式会社",
    industry: "IT",
    contact: "鈴木花子",
    email: "suzuki@def.co.jp",
    phone: "03-2345-6789",
    address: "東京都新宿区新宿2-2-2",
    delivery_status: "active",
  },
  cl00003: {
    client_id: "cl00003",
    client_name: "GHI工業",
    industry: "製造",
    contact: "佐藤次郎",
    email: "sato@ghi.co.jp",
    phone: "03-3456-7890",
    address: "大阪府大阪市北区梅田3-3-3",
    delivery_status: "paused",
  },
}

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const clientId = params.id || "cl00001" // デフォルト値を設定
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(clientFields)
  const [clientData, setClientData] = useState<Record<string, any> | null>(null)

  // 実際の実装では、APIからクライアント情報とフィールド設定を取得
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // 実際の実装ではAPIからデータを取得
        // const response = await fetch(`/api/clients/${clientId}`);
        // const data = await response.json();
        // setClientData(data);

        // ここではモックデータを使用
        setTimeout(() => {
          const data = clientsData[clientId as keyof typeof clientsData]
          if (data) {
            setClientData(data)
          } else {
            toast({
              title: "エラー",
              description: "クライアント情報が見つかりませんでした",
              variant: "destructive",
            })
            router.push("/clients")
          }
          setFields(clientFields)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("データ取得エラー:", error)
        toast({
          title: "エラーが発生しました",
          description: "クライアント情報の取得に失敗しました",
          variant: "destructive",
        })
        router.push("/clients")
      }
    }

    fetchClientData()
  }, [clientId, router])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      // 例: await fetch(`/api/clients/${clientId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      console.log("更新データ:", values)

      // 成功メッセージを表示
      toast({
        title: "クライアント情報を更新しました",
        description: `${values.client_name}の情報を更新しました`,
      })

      // 更新完了後、クライアント詳細ページに戻る
      setTimeout(() => {
        router.push(`/clients/${clientId}`)
      }, 1000)
    } catch (error) {
      console.error("更新エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "クライアント情報の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/clients/${clientId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">クライアント編集</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クライアント情報</CardTitle>
          <CardDescription>クライアント企業の情報を編集してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || !clientData ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <DynamicForm
              fields={fields}
              initialValues={clientData}
              onSubmit={handleSubmit}
              submitLabel="更新"
              cancelLabel="キャンセル"
              onCancel={() => router.push(`/clients/${clientId}`)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
