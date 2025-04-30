import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// サンプルデータ
const adSet = {
  id: "as00001",
  name: "若年層ターゲット",
  campaign_id: "cp00001",
  campaign_name: "夏季キャンペーン2023",
  placement: "Instagram,Facebook",
  targeting_segment: "18-24歳,学生",
  daily_budget: 5000,
  status: "active",
  created_at: "2023-05-20",
  updated_at: "2023-05-25",
  description: "若年層向けの広告セット。InstagramとFacebookを中心に配信。",
}

const ads = [
  {
    id: "ad00001",
    name: "夏季キャンペーン広告1",
    creative_id: "cr00001",
    creative_name: "夏季商品メインビジュアル",
    landing_page_url: "https://example.com/summer-campaign",
    status: "active",
  },
  {
    id: "ad00002",
    name: "夏季キャンペーン広告2",
    creative_id: "cr00002",
    creative_name: "夏季商品サブビジュアル",
    landing_page_url: "https://example.com/summer-campaign/products",
    status: "active",
  },
]

export default function AdSetDetailPage({ params }: { params: { id: string } }) {
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
        <div className="flex items-center space-x-4">
          <Link href="/adsets">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">広告セット詳細</h1>
        </div>
        <Link href={`/adsets/${params.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            編集
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{adSet.name}</CardTitle>
          <CardDescription>ID: {adSet.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">キャンペーン</h3>
              <p>
                <Link href={`/campaigns/${adSet.campaign_id}`} className="text-blue-600 hover:underline">
                  {adSet.campaign_name}
                </Link>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">配置</h3>
              <p>{adSet.placement}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ターゲティング</h3>
              <p>{adSet.targeting_segment}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">日予算</h3>
              <p>{formatCurrency(adSet.daily_budget)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ステータス</h3>
              <p>{getStatusBadge(adSet.status)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">作成日</h3>
              <p>{adSet.created_at}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">説明</h3>
            <p className="mt-1">{adSet.description}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ads">
        <TabsList>
          <TabsTrigger value="ads">広告</TabsTrigger>
          <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
        </TabsList>
        <TabsContent value="ads" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>関連広告</CardTitle>
                <Link href={`/ads/new?adset_id=${params.id}`}>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    新規広告
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {ads.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>広告名</TableHead>
                      <TableHead>クリエイティブ</TableHead>
                      <TableHead>リンク先URL</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ads.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.id}</TableCell>
                        <TableCell>
                          <Link href={`/ads/${ad.id}`} className="text-blue-600 hover:underline">
                            {ad.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/creatives/${ad.creative_id}`} className="text-blue-600 hover:underline">
                            {ad.creative_name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <a
                            href={ad.landing_page_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {ad.landing_page_url}
                          </a>
                        </TableCell>
                        <TableCell>{getStatusBadge(ad.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Link href={`/ads/${ad.id}/edit`}>
                              <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-gray-500">関連する広告はありません</div>
              )}
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
