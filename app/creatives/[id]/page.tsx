import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// サンプルデータ
const creative = {
  id: "cr00001",
  name: "夏季商品メインビジュアル",
  type: "image",
  media_id: "md00001",
  media_url: "https://via.placeholder.com/800x600?text=Summer+Campaign+Visual",
  headline: "この夏、新しい自分に出会う",
  body_text: "期間限定の夏季コレクションで、あなたのスタイルをアップデート。今だけの特別価格でお届けします。",
  folder_id: "fd00001",
  folder_name: "夏季キャンペーン素材",
  created_at: "2023-05-20",
  updated_at: "2023-05-25",
  description: "夏季キャンペーンのメインビジュアル。若年層向けに明るく爽やかなイメージで作成。",
}

const ads = [
  {
    id: "ad00001",
    name: "夏季キャンペーン広告1",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    adset_id: "as00001",
    adset_name: "若年層ターゲット",
    status: "active",
  },
  {
    id: "ad00006",
    name: "夏季キャンペーン広告6",
    campaign_id: "cp00001",
    campaign_name: "夏季キャンペーン2023",
    adset_id: "as00002",
    adset_name: "主婦層ターゲット",
    status: "draft",
  },
]

export default function CreativeDetailPage({ params }: { params: { id: string } }) {
  // プレースホルダー画像URL
  const placeholderImage = "/cosmic-dance.png"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/creatives">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">クリエイティブ詳細</h1>
        </div>
        <Link href={`/creatives/${params.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            編集
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{creative.name}</CardTitle>
          <CardDescription>ID: {creative.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* 画像URLが無効な場合のフォールバック処理 */}
              <img
                src={creative.media_url || placeholderImage}
                alt={creative.name}
                className="w-full h-auto rounded-lg shadow-md"
                onError={(e) => {
                  // エラー時にプレースホルダー画像を表示
                  const target = e.target as HTMLImageElement
                  target.onerror = null // 無限ループ防止
                  target.src = placeholderImage
                }}
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">タイプ</h3>
                <p>{creative.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">見出し</h3>
                <p className="text-lg font-bold">{creative.headline}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">本文</h3>
                <p>{creative.body_text}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">フォルダ</h3>
                <p>
                  {creative.folder_name} ({creative.folder_id})
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">作成日</h3>
                <p>{creative.created_at}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">説明</h3>
            <p className="mt-1">{creative.description}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ads">
        <TabsList>
          <TabsTrigger value="ads">使用中の広告</TabsTrigger>
        </TabsList>
        <TabsContent value="ads" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>このクリエイティブを使用している広告</CardTitle>
            </CardHeader>
            <CardContent>
              {ads.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>広告名</TableHead>
                      <TableHead>キャンペーン</TableHead>
                      <TableHead>広告セット</TableHead>
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
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              ad.status === "active"
                                ? "bg-green-100 text-green-800"
                                : ad.status === "draft"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {ad.status === "active" ? "配信中" : ad.status === "draft" ? "下書き" : ad.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/ads/${ad.id}`}>
                            <Button variant="outline" size="sm">
                              詳細
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-gray-500">このクリエイティブを使用している広告はありません</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
