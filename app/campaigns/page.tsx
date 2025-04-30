import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// サンプルデータ
const campaigns = [
  {
    id: "cp00001",
    name: "夏季キャンペーン2023",
    project_id: "pr00001",
    project_name: "株式会社ABC 夏季プロモーション",
    objective: "認知拡大",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    budget_total: 1000000,
    status: "active",
  },
  {
    id: "cp00002",
    name: "新商品発表キャンペーン",
    project_id: "pr00001",
    project_name: "株式会社ABC 夏季プロモーション",
    objective: "コンバージョン",
    start_date: "2023-09-01",
    end_date: "2023-10-31",
    budget_total: 800000,
    status: "draft",
  },
  {
    id: "cp00003",
    name: "年末セールキャンペーン",
    project_id: "pr00002",
    project_name: "DEF株式会社 年末プロモーション",
    objective: "コンバージョン",
    start_date: "2023-11-01",
    end_date: "2023-12-31",
    budget_total: 1200000,
    status: "draft",
  },
  {
    id: "cp00004",
    name: "ブランドリニューアルキャンペーン",
    project_id: "pr00003",
    project_name: "GHI工業 ブランディング",
    objective: "認知拡大",
    start_date: "2023-07-01",
    end_date: "2023-09-30",
    budget_total: 1500000,
    status: "active",
  },
  {
    id: "cp00005",
    name: "新規顧客獲得キャンペーン",
    project_id: "pr00004",
    project_name: "JKLサービス 顧客獲得",
    objective: "リード獲得",
    start_date: "2023-08-01",
    end_date: "2023-10-31",
    budget_total: 900000,
    status: "active",
  },
]

export default function CampaignsPage() {
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
        return <Badge className="bg-green-100 text-green-800">配信中</Badge>
      case "draft":
        return <Badge className="bg-blue-100 text-blue-800">下書き</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">停止中</Badge>
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">アーカイブ</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">キャンペーン一覧</h1>
        <Link href="/campaigns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規キャンペーン
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>キャンペーン</CardTitle>
          <CardDescription>登録されているキャンペーンの一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>キャンペーン名</TableHead>
                <TableHead>プロジェクト</TableHead>
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
                  <TableCell>
                    <Link href={`/projects/${campaign.project_id}`} className="text-blue-600 hover:underline">
                      {campaign.project_name}
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
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
