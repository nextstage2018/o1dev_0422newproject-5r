import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// サンプルデータ
const project = {
  id: "pr00001",
  name: "夏季キャンペーン",
  client_id: "cl00001",
  client_name: "株式会社ABC",
  start_date: "2023-06-01",
  end_date: "2023-08-31",
  budget: 1000000,
  adaccount_id: "acc001",
  adaccount_name: "Meta広告アカウント",
  commission_type: "fee",
  commission_feerate: 10,
  status: "active",
  created_at: "2023-05-15",
  updated_at: "2023-05-20",
  description: "夏季商品のプロモーションキャンペーン。SNSとディスプレイ広告を中心に展開。",
}

const campaigns = [
  {
    id: "cp00001",
    name: "夏季キャンペーン2023",
    objective: "認知拡大",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    budget_total: 500000,
    status: "active",
  },
  {
    id: "cp00002",
    name: "新商品発表キャンペーン",
    objective: "コンバージョン",
    start_date: "2023-07-01",
    end_date: "2023-08-15",
    budget_total: 300000,
    status: "draft",
  },
]

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">進行中</Badge>
      case "draft":
        return <Badge className="bg-blue-100 text-blue-800">準備中</Badge>
      case "planning":
        return <Badge className="bg-yellow-100 text-yellow-800">計画中</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">完了</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
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
          <h1 className="text-2xl font-bold tracking-tight">プロジェクト詳細</h1>
        </div>
        <Link href={`/projects/${params.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            編集
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>ID: {project.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">クライアント</h3>
              <p>
                <Link href={`/clients/${project.client_id}`} className="text-blue-600 hover:underline">
                  {project.client_name}
                </Link>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">広告アカウント</h3>
              <p>{project.adaccount_name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">開始日</h3>
              <p>{project.start_date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">終了日</h3>
              <p>{project.end_date || "-"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">予算</h3>
              <p>{formatCurrency(project.budget)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">報酬形態</h3>
              <p>
                {project.commission_type === "fee"
                  ? `変動手数料 (${project.commission_feerate}%)`
                  : project.commission_type === "fixed"
                    ? "固定報酬"
                    : project.commission_type === "hybrid"
                      ? `ハイブリッド (${project.commission_feerate}%)`
                      : "成果報酬"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ステータス</h3>
              <p>{getStatusBadge(project.status)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">作成日</h3>
              <p>{project.created_at}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">説明</h3>
            <p className="mt-1">{project.description}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">キャンペーン</TabsTrigger>
          <TabsTrigger value="tasks">タスク</TabsTrigger>
          <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>関連キャンペーン</CardTitle>
                <Link href={`/campaigns/new?project_id=${params.id}`}>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    新規キャンペーン
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {campaigns.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>キャンペーン名</TableHead>
                      <TableHead>広告目的</TableHead>
                      <TableHead>開始日</TableHead>
                      <TableHead>終了日</TableHead>
                      <TableHead>予算</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.id}</TableCell>
                        <TableCell>
                          <Link href={`/campaigns/${campaign.id}`} className="text-blue-600 hover:underline">
                            {campaign.name}
                          </Link>
                        </TableCell>
                        <TableCell>{campaign.objective}</TableCell>
                        <TableCell>{campaign.start_date}</TableCell>
                        <TableCell>{campaign.end_date || "-"}</TableCell>
                        <TableCell>{formatCurrency(campaign.budget_total)}</TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Link href={`/campaigns/${campaign.id}/edit`}>
                              <Button variant="outline" size="sm">
                                編集
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-gray-500">関連するキャンペーンはありません</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>関連タスク</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4 text-gray-500">関連するタスクはありません</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>パフォーマンス</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4 text-gray-500">パフォーマンスデータは現在利用できません</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
