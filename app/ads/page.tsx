import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// サンプルデータ
const ads = [
  {
    id: "ad00001",
    name: "夏季キャンペーン広告1",
    adset_id: "as00001",
    adset_name: "若年層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    creative_id: "cr00001",
    creative_name: "夏季商品メインビジュアル",
    landing_page_url: "https://example.com/summer-campaign",
    status: "active",
  },
  {
    id: "ad00002",
    name: "夏季キャンペーン広告2",
    adset_id: "as00001",
    adset_name: "若年層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    creative_id: "cr00002",
    creative_name: "夏季商品サブビジュアル",
    landing_page_url: "https://example.com/summer-campaign/products",
    status: "active",
  },
  {
    id: "ad00003",
    name: "夏季キャンペーン広告3",
    adset_id: "as00002",
    adset_name: "主婦層ターゲット",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    creative_id: "cr00003",
    creative_name: "夏季商品ファミリービジュアル",
    landing_page_url: "https://example.com/summer-campaign/family",
    status: "active",
  },
  {
    id: "ad00004",
    name: "新商品発表広告1",
    adset_id: "as00003",
    adset_name: "ビジネスパーソンターゲット",
    campaign_id: "cp00002",
    campaign_name: "新商品発表キャンペーン",
    creative_id: "cr00004",
    creative_name: "新商品スペック紹介",
    landing_page_url: "https://example.com/new-product",
    status: "draft",
  },
  {
    id: "ad00005",
    name: "ブランドリニューアル広告",
    adset_id: "as00005",
    adset_name: "ブランド認知拡大セット",
    campaign_id: "cp00004",
    campaign_name: "ブランドリニューアルキャンペーン",
    creative_id: "cr00005",
    creative_name: "新ブランドロゴ紹介",
    landing_page_url: "https://example.com/brand-renewal",
    status: "active",
  },
]

export default function AdsPage() {
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
        <h1 className="text-2xl font-bold tracking-tight">広告一覧</h1>
        <Link href="/ads/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規広告
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告</CardTitle>
          <CardDescription>登録されている広告の一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>広告名</TableHead>
                  <TableHead>キャンペーン</TableHead>
                  <TableHead>広告セット</TableHead>
                  <TableHead>クリエイティブ</TableHead>
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
                      <Link href={`/campaigns/${ad.campaign_id}`} className="text-blue-600 hover:underline">
                        {ad.campaign_name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/adsets/${ad.adset_id}`} className="text-blue-600 hover:underline">
                        {ad.adset_name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/creatives/${ad.creative_id}`} className="text-blue-600 hover:underline">
                        {ad.creative_name}
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
                        <Button variant="outline" size="icon" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
