"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// プロジェクトフィールドの定義
const projectFields = [
  {
    id: "project_id",
    name: "プロジェクトID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "client_id",
    name: "クライアント",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
    options: [
      { value: "cl00001", label: "株式会社ABC" },
      { value: "cl00002", label: "DEF株式会社" },
      { value: "cl00003", label: "GHI工業" },
      { value: "cl00004", label: "JKLサービス" },
      { value: "cl00005", label: "MNO商事" },
    ],
  },
  {
    id: "project_name",
    name: "プロジェクト名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "start_date",
    name: "開始日",
    type: "date",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "end_date",
    name: "終了日",
    type: "date",
    required: false,
    visible: true,
    table: "dim_project",
  },
  {
    id: "budget",
    name: "予算",
    type: "integer",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "adaccount_id",
    name: "広告アカウントID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
    options: [
      { value: "acc001", label: "Meta広告アカウント" },
      { value: "acc002", label: "Google広告アカウント" },
      { value: "acc003", label: "Yahoo!広告アカウント" },
      { value: "acc004", label: "Twitter広告アカウント" },
      { value: "acc005", label: "TikTok広告アカウント" },
    ],
  },
  {
    id: "commission_type",
    name: "報酬形態",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
    options: [
      { value: "fee", label: "変動手数料" },
      { value: "fixed", label: "固定報酬" },
      { value: "hybrid", label: "ハイブリッド" },
      { value: "revshare", label: "成果報酬" },
    ],
  },
  {
    id: "commission_feerate",
    name: "手数料率(%)",
    type: "float",
    required: false,
    visible: true,
    table: "dim_project",
  },
  {
    id: "status",
    name: "ステータス",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
    options: [
      { value: "active", label: "進行中" },
      { value: "draft", label: "準備中" },
      { value: "planning", label: "計画中" },
      { value: "completed", label: "完了" },
    ],
  },
  {
    id: "description",
    name: "プロジェクト説明",
    type: "string",
    required: false,
    visible: true,
    table: "dim_project",
  },
]

export default function NewProjectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const clientId = searchParams.get("client_id")

  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(projectFields)
  const [initialValues, setInitialValues] = useState<Record<string, any>>({})

  // 実際の実装では、APIからフィールド設定を取得
  useEffect(() => {
    // フィールド設定をAPIから取得する処理
    // 例: fetch('/api/settings/project-fields')
    //     .then(res => res.json())
    //     .then(data => setFields(data))

    // URLパラメータからクライアントIDが渡された場合、初期値として設定
    if (clientId) {
      setInitialValues({
        client_id: clientId,
        // 現在の日付を開始日の初期値として設定
        start_date: new Date().toISOString().split("T")[0],
      })
    } else {
      setInitialValues({
        // 現在の日付を開始日の初期値として設定
        start_date: new Date().toISOString().split("T")[0],
      })
    }

    // ここではモックデータを使用
    setTimeout(() => {
      setFields(projectFields)
      setIsLoading(false)
    }, 500)
  }, [clientId])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      console.log("送信データ:", values)

      // 成功メッセージを表示
      toast({
        title: "プロジェクトを登録しました",
        description: `${values.project_name}を登録しました`,
      })

      // 送信完了後、プロジェクト一覧ページに戻る
      setTimeout(() => {
        router.push("/projects")
      }, 1000)
    } catch (error) {
      console.error("登録エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "プロジェクトの登録に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/projects">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">新規プロジェクト登録</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>プロジェクト情報</CardTitle>
          <CardDescription>新しいプロジェクトの情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <DynamicForm
              fields={fields}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              submitLabel="登録"
              cancelLabel="キャンセル"
              onCancel={() => router.push("/projects")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
