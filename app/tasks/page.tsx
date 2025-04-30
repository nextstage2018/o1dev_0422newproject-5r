import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// サンプルデータ
const tasks = [
  {
    id: "jb00001",
    project_id: "pr00001",
    project_name: "株式会社ABC 夏季プロモーション",
    job_type: "campaign_creation",
    job_type_label: "キャンペーン作成",
    job_status: "success",
    job_progress: 100,
    job_started_at: "2023-05-15T10:00:00Z",
    job_finished_at: "2023-05-15T10:05:30Z",
    adaccount_id: "acc001",
  },
  {
    id: "jb00002",
    project_id: "pr00001",
    project_name: "株式会社ABC 夏季プロモーション",
    job_type: "ad_creation",
    job_type_label: "広告作成",
    job_status: "success",
    job_progress: 100,
    job_started_at: "2023-05-16T09:30:00Z",
    job_finished_at: "2023-05-16T09:32:45Z",
    adaccount_id: "acc001",
    campaign_id: "cp00001",
  },
  {
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
  },
  {
    id: "jb00004",
    project_id: "pr00003",
    project_name: "GHI工業 ブランディング",
    job_type: "data_import",
    job_type_label: "データインポート",
    job_status: "failure",
    job_progress: 30,
    job_started_at: "2023-06-02T11:00:00Z",
    job_finished_at: "2023-06-02T11:02:15Z",
    job_error_message: "インポートファイルの形式が不正です",
    adaccount_id: "acc003",
  },
  {
    id: "jb00005",
    project_id: "pr00004",
    project_name: "JKLサービス 顧客獲得",
    job_type: "report_generation",
    job_type_label: "レポート生成",
    job_status: "pending",
    job_progress: 0,
    job_started_at: null,
    job_finished_at: null,
    adaccount_id: "acc004",
  },
]

export default function TasksPage() {
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
        <h1 className="text-2xl font-bold tracking-tight">タスク一覧</h1>
        <Link href="/tasks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規タスク
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>タスク</CardTitle>
          <CardDescription>実行されたタスクの一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>プロジェクト</TableHead>
                  <TableHead>タスクタイプ</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>進捗</TableHead>
                  <TableHead>開始日時</TableHead>
                  <TableHead>終了日時</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.id}</TableCell>
                    <TableCell>
                      <Link href={`/projects/${task.project_id}`} className="text-blue-600 hover:underline">
                        {task.project_name}
                      </Link>
                    </TableCell>
                    <TableCell>{task.job_type_label}</TableCell>
                    <TableCell>{getStatusBadge(task.job_status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={task.job_progress} className="w-[60px]" />
                        <span className="text-sm">{task.job_progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDateTime(task.job_started_at)}</TableCell>
                    <TableCell>{formatDateTime(task.job_finished_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/tasks/${task.id}`}>
                          <Button variant="outline" size="sm">
                            詳細
                          </Button>
                        </Link>
                        {task.job_status === "pending" && (
                          <Button variant="outline" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
