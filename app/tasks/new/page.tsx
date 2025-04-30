"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm } from "@/components/dynamic-form"
import { ArrowLeft, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// タスクフィールドの定義
const taskFields = [
  {
    id: "job_type",
    name: "タスクタイプ",
    type: "string",
    required: true,
    visible: true,
    table: "dim_job",
    options: [
      { value: "campaign_creation", label: "キャンペーン作成" },
      { value: "campaign_update", label: "キャンペーン更新" },
      { value: "ad_creation", label: "広告作成" },
      { value: "ad_update", label: "広告更新" },
      { value: "data_import", label: "データインポート" },
      { value: "report_generation", label: "レポート生成" },
    ],
  },
  {
    id: "project_id",
    name: "プロジェクト",
    type: "string",
    required: true,
    visible: true,
    table: "dim_job",
    options: [
      { value: "pr00001", label: "株式会社ABC 夏季プロモーション" },
      { value: "pr00002", label: "DEF株式会社 年末プロモーション" },
      { value: "pr00003", label: "GHI工業 ブランディング" },
      { value: "pr00004", label: "JKLサービス 顧客獲得" },
      { value: "pr00005", label: "MNO商事 認知拡大" },
    ],
  },
  {
    id: "adaccount_id",
    name: "広告アカウント",
    type: "string",
    required: true,
    visible: true,
    table: "dim_job",
    options: [
      { value: "acc001", label: "Meta広告アカウント" },
      { value: "acc002", label: "Google広告アカウント" },
      { value: "acc003", label: "Yahoo!広告アカウント" },
      { value: "acc004", label: "Twitter広告アカウント" },
      { value: "acc005", label: "TikTok広告アカウント" },
    ],
  },
  {
    id: "campaign_id",
    name: "キャンペーン",
    type: "string",
    required: false,
    visible: true,
    table: "dim_job",
    options: [
      { value: "cp00001", label: "夏季キャンペーン2023" },
      { value: "cp00002", label: "新商品発表キャンペーン" },
      { value: "cp00003", label: "年末セールキャンペーン" },
      { value: "cp00004", label: "ブランドリニューアルキャンペーン" },
      { value: "cp00005", label: "新規顧客獲得キャンペーン" },
    ],
  },
  {
    id: "description",
    name: "タスク説明",
    type: "string",
    required: false,
    visible: true,
    table: "dim_job",
  },
]

export default function NewTaskPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project_id")

  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(taskFields)
  const [initialValues, setInitialValues] = useState<Record<string, any>>({})

  // 実際の実装では、APIからフィールド設定を取得
  useEffect(() => {
    // フィールド設定をAPIから取得する処理
    // 例: fetch('/api/settings/task-fields')
    //     .then(res => res.json())
    //     .then(data => setFields(data))

    // URLパラメータからプロジェクトIDが渡された場合、初期値として設定
    if (projectId) {
      setInitialValues({
        project_id: projectId,
        job_type: "report_generation",
      })
    } else {
      setInitialValues({
        job_type: "report_generation",
      })
    }

    // ここではモックデータを使用
    setTimeout(() => {
      setFields(taskFields)
      setIsLoading(false)
    }, 500)
  }, [projectId])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      console.log("送信データ:", values)

      // 成功メッセージを表示
      toast({
        title: "タスクを作成しました",
        description: `${values.job_type}タスクを作成しました`,
      })

      // 送信完了後、タスク一覧ページに戻る
      setTimeout(() => {
        router.push("/tasks")
      }, 1000)
    } catch (error) {
      console.error("作成エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "タスクの作成に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/tasks">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">新規タスク作成</h1>
        </div>
      </div>

      <Card className="border-2 border-dashed border-gray-200">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-gray-500" />
            <CardTitle>新規タスク情報</CardTitle>
          </div>
          <CardDescription>新しいタスクの情報を入力してください。</CardDescription>
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
              submitLabel="作成する"
              cancelLabel="キャンセル"
              onCancel={() => router.push("/tasks")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
