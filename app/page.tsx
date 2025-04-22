import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Users, Briefcase, BarChart2, FileText, User } from "lucide-react"

// サンプルデータ
const performanceData = [
  { name: "1月", 広告費: 4000, ROAS: 240 },
  { name: "2月", 広告費: 3000, ROAS: 198 },
  { name: "3月", 広告費: 2000, ROAS: 280 },
  { name: "4月", 広告費: 2780, ROAS: 308 },
  { name: "5月", 広告費: 1890, ROAS: 320 },
  { name: "6月", 広告費: 2390, ROAS: 380 },
]

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">ダッシュボード</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">クライアント数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">先月比 +2 (20%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">プロジェクト数</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">先月比 +5 (26%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">キャンペーン数</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">先月比 +12 (33%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">広告数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">先月比 +22 (22%)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>月別広告費</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="広告費" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>月別ROAS</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ROAS" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近のアクティビティ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "田中太郎", action: "新しいクライアント「株式会社ABC」を追加しました", time: "1時間前" },
              { user: "鈴木花子", action: "キャンペーン「夏季セール2023」を更新しました", time: "3時間前" },
              { user: "佐藤次郎", action: "広告セット「若年層ターゲット」のステータスを変更しました", time: "5時間前" },
              { user: "山田健太", action: "プロジェクト「新商品発表」を作成しました", time: "昨日" },
              { user: "伊藤美咲", action: "タスク「クリエイティブ検証」を完了しました", time: "昨日" },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-gray-100 rounded-full p-2">
                  <User className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.user}</p>
                  <p className="text-sm text-gray-500">{item.action}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
