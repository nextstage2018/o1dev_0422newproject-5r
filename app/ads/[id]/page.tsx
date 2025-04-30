import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// サンプルデータ
const ad = {
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
  created_at: "2023-05-25",
  updated_at: "2023-05-30",
  description: "夏季キャンペーンのメイン広告。若年層向けにInstagramとFacebookで配信。",
}

// クリエイティブのサンプルデータ
const creative = {
  id: "cr00001",
  name: "夏季商品メインビジュアル",
  type: "image",
  image_url: "https://via.placeholder.com/800x600?text=Summer+Campaign+Visual",
  headline: "この夏、新しい自分に出会う",
  body_text: "期間限定の夏季コレクションで、あなたのスタイルをアップデート。今だけの特別価格でお届けします。",
}

export default function AdDetailPage({ params }: { params: { id: string } }) {
  // プレースホルダー画像URL
  const placeholderImage = "/diverse-team-brainstorm.png"

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
          <Link href="/ads">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">広告詳細</h1>
        </div>
        <Link href={`/ads/${params.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            編集
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ad.name}</CardTitle>
          <CardDescription>ID: {ad.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">キャンペーン</h3>
              <p>
                <Link href={`/campaigns/${ad.campaign_id}`} className="text-blue-600 hover:underline">
                  {ad.campaign_name}
                </Link>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">広告セット</h3>
              <p>
                <Link href={`/adsets/${ad.adset_id}`} className="text-blue-600 hover:underline">
                  {ad.adset_name}
                </Link>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">クリエイティブ</h3>
              <p>
                <Link href={`/creatives/${ad.creative_id}`} className="text-blue-600 hover:underline">
                  {ad.creative_name}
                </Link>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">リンク先URL</h3>
              <p>
                <a
                  href={ad.landing_page_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {ad.landing_page_url}
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ステータス</h3>
              <p>{getStatusBadge(ad.status)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">作成日</h3>
              <p>{ad.created_at}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">説明</h3>
            <p className="mt-1">{ad.description}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">プレビュー</TabsTrigger>
          <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>広告プレビュー</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <img
                    src={creative.image_url || placeholderImage}
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
                <div className="w-full md:w-1/2 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold">{creative.headline}</h3>
                    <p className="text-gray-700 mt-2">{creative.body_text}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">リンク先</h4>
                    <a
                      href={ad.landing_page_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {ad.landing_page_url}
                    </a>
                  </div>
                </div>
              </div>
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
