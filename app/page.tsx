"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, Briefcase, Megaphone, CheckSquare } from "lucide-react"

// ダッシュボードの概要カード
function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: { title: string; value: string; description: string; icon: any }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// 最近のアクティビティ
function RecentActivity() {
  const activities = [
    { id: 1, user: "山田太郎", action: "新しいキャンペーンを作成しました", time: "1時間前" },
    { id: 2, user: "佐藤花子", action: "広告セットを更新しました", time: "3時間前" },
    { id: 3, user: "鈴木一郎", action: "タスクを完了しました", time: "5時間前" },
    { id: 4, user: "高橋真理", action: "新しいクライアントを追加しました", time: "昨日" },
    { id: 5, user: "伊藤健太", action: "プロジェクトのステータスを更新しました", time: "昨日" },
  ]

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>最近のアクティビティ</CardTitle>
        <CardDescription>チーム全体の最近のアクティビティ</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-xs text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// 今後の予定
function UpcomingTasks() {
  const tasks = [
    { id: 1, title: "クライアントミーティング", date: "2023-05-08", time: "10:00" },
    { id: 2, title: "キャンペーン企画書作成", date: "2023-05-09", time: "13:00" },
    { id: 3, title: "広告素材レビュー", date: "2023-05-10", time: "15:00" },
    { id: 4, title: "月次レポート作成", date: "2023-05-12", time: "11:00" },
  ]

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>今後の予定</CardTitle>
        <CardDescription>今後のタスクとミーティング</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{task.title}</p>
                <p className="text-xs text-muted-foreground">
                  {task.date} {task.time}
                </p>
              </div>
              <Button variant="outline" size="sm">
                詳細
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">ダッシュボード</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">レポート</Button>
            <Button>新規作成</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="analytics">分析</TabsTrigger>
            <TabsTrigger value="reports">レポート</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <SummaryCard title="総クライアント数" value="24" description="先月比 +2.5%" icon={Users} />
              <SummaryCard title="アクティブプロジェクト" value="12" description="先月比 +1" icon={Briefcase} />
              <SummaryCard title="実行中キャンペーン" value="7" description="先月比 -1" icon={Megaphone} />
              <SummaryCard title="完了タスク" value="32" description="今週 8件完了" icon={CheckSquare} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <RecentActivity />
              <div className="lg:col-span-4 space-y-4">
                <UpcomingTasks />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>分析データ</CardTitle>
                <CardDescription>詳細な分析データはこちらに表示されます</CardDescription>
              </CardHeader>
              <CardContent>
                <p>分析データの詳細コンテンツ</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>レポート</CardTitle>
                <CardDescription>レポート一覧</CardDescription>
              </CardHeader>
              <CardContent>
                <p>レポートの詳細コンテンツ</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知</CardTitle>
                <CardDescription>最新の通知</CardDescription>
              </CardHeader>
              <CardContent>
                <p>通知の詳細コンテンツ</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
