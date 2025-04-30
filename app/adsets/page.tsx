import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// サンプルデータ
const adSets = [
  {
    id: "as00001",
    name: "若年層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    placement: "Instagram,Facebook",
    targeting_segment: "18-24歳,学生",
    daily_budget: 5000,
    status: "active",
  },
  {
    id: "as00002",
    name: "主婦層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    placement: "Facebook,Display",
    targeting_segment: "30-45歳,女性,子育て",
    daily_budget: 5000,
    status: "active",
  },
  {
    id: "as00003",
    name: "ビジネスパーソンターゲット",
    campaign_id: "cp00002",
    campaign_name: "新商品発表キャンペーン",
    placement: "LinkedIn,Display",
    targeting_segment: "25-45歳,ビジネス,IT業界",
    daily_budget: 8000,
    status: "draft",
  },
  {
    id: "as00004",
    name: "年末セール一般ターゲット",
    campaign_id: "cp00003",
    campaign_name: "年末セールキャンペーン",
    placement: "Display,YouTube",
    targeting_segment: "全年齢,買い物好き",
    daily_budget: 10000,
    status: "draft",
  },
  {
    id: "as00005",
    name: "ブランド認知拡大セット",
    campaign_id: "cp00004",
    campaign_name: "ブランドリニューアルキャンペーン",
    placement: "YouTube,Display,Facebook",
    targeting_segment: "全年齢,興味ベース",
    daily_budget: 15000,
    status: "active",
  },
]

export default function AdSetsPage() {
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
        <h1 className="text-2xl font-bold tracking-tight">広告セット一覧</h1>
        <Link href="/adsets/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規広告セット
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告セット</CardTitle>
          <CardDescription>登録されている広告セットの一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>広告セット名</TableHead>
                <TableHead>キャンペーン</TableHead>
                <TableHead>配置</TableHead>
                <TableHead>ターゲティング</TableHead>
                <TableHead>日予算</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adSets.map((adSet) => (
                <TableRow key={adSet.id}>
                  <TableCell className="font-medium">{adSet.id}</TableCell>
                  <TableCell>
                    <Link href={`/adsets/${adSet.id}`} className="text-blue-600 hover:underline">
                      {adSet.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/campaigns/${adSet.campaign_id}`} className="text-blue-600 hover:underline">
                      {adSet.campaign_name}
                    </Link>
                  </TableCell>
                  <TableCell>{adSet.placement}</TableCell>
                  <TableCell>{adSet.targeting_segment}</TableCell>
                  <TableCell>{formatCurrency(adSet.daily_budget)}</TableCell>
                  <TableCell>{getStatusBadge(adSet.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/adsets/${adSet.id}/edit`}>
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
