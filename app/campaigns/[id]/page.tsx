import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// サンプルデータ
const campaign = {
  id: "cp00001",
  name: "夏季キャンペーン2023",
  project_id: "pr00001",
  project_name: "株式会社ABC 夏季プロモーション",
  objective: "認知拡大",
  start_date: "2023-06-01",
  end_date: "2023-08-31",
  budget_total: 1000000,
  budget_daily: 10000,
  status: "active",
  created_at: "2023-05-15",
  updated_at: "2023-05-20",
  description: "夏季商品のプロモーションキャンペーン。SNSとディスプレイ広告を中心に展開。",
}

const adSets = [
  {
    id: "as00001",
    name: "若年層ターゲット",
    placement: "Instagram,Facebook",
    targeting_segment: "18-24歳,学生",
    daily_budget: 5000,
    status: "active",
  },
  {
    id: "as00002",
    name: "主婦層ターゲット",
    placement: "Facebook,Display",
    targeting_segment: "30-45歳,女性,子育て",
    daily_budget: 5000,
    status: "active",
  },
]

const ads = [
  {
    id: "ad00001",
    name: "夏季キャンペーン広告1",
    adset_id: "as00001",
    adset_name: "若年層ターゲット",
    creative_id: "cr00001",
    status: "active",
  },
  {
    id: "ad00002",
    name: "夏季キャンペーン広告2",
    adset_id: "as00001",
    adset_name: "若年層ターゲット",
    creative_id: "cr00002",
    status: "active",
  },
  {
    id: "ad00003",
    name: "夏季キャンペーン広告3",
    adset_id: "as00002",
    adset_name: "主婦層ターゲット",
    creative_id: "cr00003",
    status: "active",
  },
]

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
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
          <Link href="/campaigns">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">キャンペーン詳細</h1>
        </div>
        <Link href={`/campaigns/${params.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            編集
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{campaign.name}</CardTitle>
          <CardDescription>ID: {campaign.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">プロジェクト</h3>
              <p>
                <Link href={`/projects/${campaign.project_id}`} className="text-blue-600 hover:underline">
                  {campaign.project_name}
                </Link>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">広告目的</h3>
              <p>{campaign.objective}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">開始日</h3>
              <p>{campaign.start_date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">終了日</h3>
              <p>{campaign.end_date || "-"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">総予算</h3>
              <p>{formatCurrency(campaign.budget_total)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">日予算</h3>
              <p>{formatCurrency(campaign.budget_daily)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ステータス</h3>
              <p>{getStatusBadge(campaign.status)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">作成日</h3>
              <p>{campaign.created_at}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">説明</h3>
            <p className="mt-1">{campaign.description}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="adsets">
        <TabsList>
          <TabsTrigger value="adsets">広告セット</TabsTrigger>
          <TabsTrigger value="ads">広告</TabsTrigger>
          <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
        </TabsList>
        <TabsContent value="adsets" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>関連広告セット</CardTitle>
                <Link href={`/adsets/new?campaign_id=${params.id}`}>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    新規広告セット
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {adSets.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>広告セット名</TableHead>
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
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-gray-500">関連する広告セットはありません</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ads" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>関連広告</CardTitle>
                <Link href={`/ads/new?campaign_id=${params.id}`}>
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
                      <TableHead>広告セット</TableHead>
                      <TableHead>クリエイティブID</TableHead>
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
                          <Link href={`/adsets/${ad.adset_id}`} className="text-blue-600 hover:underline">
                            {ad.adset_name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/creatives/${ad.creative_id}`} className="text-blue-600 hover:underline">
                            {ad.creative_id}
                          </Link>
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
