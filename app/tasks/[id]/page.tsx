import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// サンプルデータ
const task = {
  id: "jb00003",
  project_id: "pr00002",
  project_name: "DEF株式会社 年末プロモーション",
  job_type: "campaign_update",
  job_type_label: "キャンペーン更新",
  job_status: "running",
  job_progress: 65,
  job_started_at: "2023-06-01T14:20:00Z",
  job_finished_at: null,
  adaccount_id: "acc002",
  campaign_id: "cp00003",
  campaign_name: "年末セールキャンペーン",
  job_details: {
    steps: [
      { name: "キャンペーン情報の取得", status: "completed", timestamp: "2023-06-01T14:20:05Z" },
      { name: "広告セット情報の取得", status: "completed", timestamp: "2023-06-01T14:20:10Z" },
      { name: "広告情報の取得", status: "completed", timestamp: "2023-06-01T14:20:15Z" },
      { name: "キャンペーン設定の更新", status: "completed", timestamp: "2023-06-01T14:20:20Z" },
      { name: "広告セット設定の更新", status: "in_progress", timestamp: "2023-06-01T14:20:25Z" },
      { name: "広告設定の更新", status: "pending", timestamp: null },
      { name: "変更の適用", status: "pending", timestamp: null },
    ],
  },
}

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">成功</Badge>
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">実行中</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">待機中</Badge>
      case "failure":
        return <Badge className="bg-red-100 text-red-800">失敗</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800">取消</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">完了</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">処理中</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const formatDateTime = (dateTimeStr: string | null) => {
    if (!dateTimeStr) return "-"
    const date = new Date(dateTimeStr)
    return date.toLocaleString("ja-JP")
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
          <h1 className="text-2xl font-bold tracking-tight">タスク詳細</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{task.job_type_label}</CardTitle>
          <CardDescription>ID: {task.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">プロジェクト</h3>
              <p>
                <Link href={`/projects/${task.project_id}`} className="text-blue-600 hover:underline">
                  {task.project_name}
                </Link>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ステータス</h3>
              <p>{getStatusBadge(task.job_status)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">進捗</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Progress value={task.job_progress} className="w-[100px]" />
                <span>{task.job_progress}%</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">広告アカウント</h3>
              <p>{task.adaccount_id}</p>
            </div>
            {task.campaign_id && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">キャンペーン</h3>
                <p>
                  <Link href={`/campaigns/${task.campaign_id}`} className="text-blue-600 hover:underline">
                    {task.campaign_name}
                  </Link>
                </p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500">開始日時</h3>
              <p>{formatDateTime(task.job_started_at)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">終了日時</h3>
              <p>{formatDateTime(task.job_finished_at)}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">処理ステップ</h3>
            <div className="space-y-4">
              {task.job_details.steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100">{index + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{step.name}</span>
                      {getStatusBadge(step.status)}
                    </div>
                    {step.timestamp && <p className="text-sm text-gray-500 mt-1">{formatDateTime(step.timestamp)}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
