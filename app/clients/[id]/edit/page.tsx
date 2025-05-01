"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useClientStore } from "@/lib/store/client-store"

// クライアントフィールドの定義（クライアントIDを除く）
const clientFields = [
  {
    id: "client_name",
    name: "クライアント名",
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
      { value: "その他", label: "その他" },
    ],
  },
  {
    id: "contact_person",
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
    required: false,
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
    id: "status",
    name: "ステータス",
    type: "string",
    required: true,
    visible: true,
    table: "dim_client",
    options: [
      { value: "active", label: "有効" },
      { value: "inactive", label: "無効" },
    ],
  },
  {
    id: "notes",
    name: "備考",
    type: "string",
    required: false,
    visible: true,
    table: "dim_client",
  },
]

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const clientId = params.id
  const { getClient, updateClient } = useClientStore()
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(clientFields)
  const [clientData, setClientData] = useState<Record<string, any> | null>(null)

  // ストアからクライアント情報を取得
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setIsLoading(true)
        const data = getClient(clientId)

        if (data) {
          setClientData(data)
          setIsLoading(false)
        } else {
          // エラーメッセージを表示して一覧ページにリダイレクト
          toast({
            title: "エラー",
            description: `クライアント情報が見つかりませんでした (ID: ${clientId})`,
            variant: "destructive",
          })
          // 少し遅延させてからリダイレクト
          setTimeout(() => {
            router.push("/clients")
          }, 1500)
        }
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
  }, [clientId, router, getClient])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // クライアントIDは変更不可
      const updatedValues = {
        ...values,
        client_id: clientId, // 元のIDを強制的に使用
      }

      // ストアを使用してクライアント情報を更新
      updateClient(clientId, updatedValues)

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
          <CardDescription>クライアントの情報を編集してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || !clientData ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* クライアントIDを別途表示（編集不可） */}
              <div className="space-y-2">
                <Label htmlFor="client_id">クライアントID</Label>
                <Input id="client_id" value={clientData.client_id} disabled readOnly className="bg-gray-100" />
              </div>

              {/* 他のフィールドはDynamicFormで表示 */}
              <DynamicForm
                fields={fields}
                initialValues={clientData}
                onSubmit={handleSubmit}
                submitLabel="更新"
                cancelLabel="キャンセル"
                onCancel={() => router.push(`/clients/${clientId}`)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
