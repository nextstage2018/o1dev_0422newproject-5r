"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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

// サンプルデータ - 実際の実装ではAPIから取得
const projectsData = {
  pr00001: {
    project_id: "pr00001",
    client_id: "cl00001",
    project_name: "夏季キャンペーン",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    budget: 1000000,
    adaccount_id: "acc001",
    commission_type: "fee",
    commission_feerate: 10,
    status: "active",
    description: "夏季商品のプロモーションキャンペーン。SNSとディスプレイ広告を中心に展開。",
  },
  pr00002: {
    project_id: "pr00002",
    client_id: "cl00001",
    project_name: "新商品発表",
    start_date: "2023-09-01",
    end_date: "2023-10-31",
    budget: 800000,
    adaccount_id: "acc001",
    commission_type: "fixed",
    commission_feerate: null,
    status: "draft",
    description: "新商品発表のためのプロモーションキャンペーン。",
  },
  pr00003: {
    project_id: "pr00003",
    client_id: "cl00002",
    project_name: "年末セール",
    start_date: "2023-11-01",
    end_date: "2023-12-31",
    budget: 1200000,
    adaccount_id: "acc002",
    commission_type: "hybrid",
    commission_feerate: 8,
    status: "draft",
    description: "年末セールのプロモーション。",
  },
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectId = params.id || "pr00001" // デフォルト値を設定
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState(projectFields)
  const [projectData, setProjectData] = useState<Record<string, any> | null>(null)

  // 実際の実装では、APIからプロジェクト情報とフィールド設定を取得
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // 実際の実装ではAPIからデータを取得
        // const response = await fetch(`/api/projects/${projectId}`);
        // const data = await response.json();
        // setProjectData(data);

        // ここではモックデータを使用
        setTimeout(() => {
          const data = projectsData[projectId as keyof typeof projectsData]
          if (data) {
            // 日付文字列をDate型に変換
            const formattedData = {
              ...data,
              start_date: data.start_date ? new Date(data.start_date) : undefined,
              end_date: data.end_date ? new Date(data.end_date) : undefined,
            }
            setProjectData(formattedData)
          } else {
            toast({
              title: "エラー",
              description: "プロジェクト情報が見つかりませんでした",
              variant: "destructive",
            })
            router.push("/projects")
          }
          setFields(projectFields)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("データ取得エラー:", error)
        toast({
          title: "エラーが発生しました",
          description: "プロジェクト情報の取得に失敗しました",
          variant: "destructive",
        })
        router.push("/projects")
      }
    }

    fetchProjectData()
  }, [projectId, router])

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    try {
      // ここでAPIリクエストを送信する
      // 例: await fetch(`/api/projects/${projectId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      console.log("更新データ:", values)

      // 成功メッセージを表示
      toast({
        title: "プロジェクト情報を更新しました",
        description: `${values.project_name}の情報を更新しました`,
      })

      // 更新完了後、プロジェクト詳細ページに戻る
      setTimeout(() => {
        router.push(`/projects/${projectId}`)
      }, 1000)
    } catch (error) {
      console.error("更新エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "プロジェクト情報の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/projects/${projectId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">プロジェクト編集</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>プロジェクト情報</CardTitle>
          <CardDescription>プロジェクトの情報を編集してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || !projectData ? (
            <div className="flex justify-center items-center h-40">
              <p>読み込み中...</p>
            </div>
          ) : (
            <DynamicForm
              fields={fields}
              initialValues={projectData}
              onSubmit={handleSubmit}
              submitLabel="更新"
              cancelLabel="キャンセル"
              onCancel={() => router.push(`/projects/${projectId}`)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
