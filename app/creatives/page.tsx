import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, ImageIcon, Video, FileText } from "lucide-react"

// サンプルデータ
const creatives = [
  {
    id: "cr00001",
    name: "夏季商品メインビジュアル",
    type: "image",
    media_id: "md00001",
    headline: "この夏、新しい自分に出会う",
    body_text: "期間限定の夏季コレクションで、あなたのスタイルをアップデート。今だけの特別価格でお届けします。",
    folder_id: "fd00001",
    created_at: "2023-05-20",
  },
  {
    id: "cr00002",
    name: "夏季商品サブビジュアル",
    type: "image",
    media_id: "md00002",
    headline: "夏のアウトドアを楽しもう",
    body_text: "アウトドアシーンで活躍する夏季限定アイテムが勢揃い。耐久性と快適さを兼ね備えた高品質製品です。",
    folder_id: "fd00001",
    created_at: "2023-05-21",
  },
  {
    id: "cr00003",
    name: "夏季商品ファミリービジュアル",
    type: "image",
    media_id: "md00003",
    headline: "家族で楽しむ夏のひととき",
    body_text: "ご家族でのお出かけに最適な商品ラインナップ。思い出に残る夏をサポートします。",
    folder_id: "fd00001",
    created_at: "2023-05-22",
  },
  {
    id: "cr00004",
    name: "新商品スペック紹介",
    type: "video",
    media_id: "md00004",
    headline: "革新的な新商品、ついに登場",
    body_text: "業界最高水準のスペックを誇る新商品。あなたのビジネスを次のレベルへ引き上げます。",
    folder_id: "fd00002",
    created_at: "2023-06-01",
  },
  {
    id: "cr00005",
    name: "新ブランドロゴ紹介",
    type: "image",
    media_id: "md00005",
    headline: "新しいブランドアイデンティティ",
    body_text: "私たちの新しいロゴには、革新と伝統の融合という企業理念が込められています。",
    folder_id: "fd00003",
    created_at: "2023-07-01",
  },
]

export default function CreativesPage() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4 text-blue-500" />
      case "video":
        return <Video className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const truncateText = (text: string, maxLength = 50) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">クリエイティブ一覧</h1>
        <Link href="/creatives/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規クリエイティブ
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クリエイティブ</CardTitle>
          <CardDescription>登録されているクリエイティブの一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>クリエイティブ名</TableHead>
                <TableHead>タイプ</TableHead>
                <TableHead>見出し</TableHead>
                <TableHead>本文</TableHead>
                <TableHead>作成日</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creatives.map((creative) => (
                <TableRow key={creative.id}>
                  <TableCell className="font-medium">{creative.id}</TableCell>
                  <TableCell>
                    <Link href={`/creatives/${creative.id}`} className="text-blue-600 hover:underline">
                      {creative.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(creative.type)}
                      <span>{creative.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{truncateText(creative.headline, 30)}</TableCell>
                  <TableCell>{truncateText(creative.body_text, 40)}</TableCell>
                  <TableCell>{creative.created_at}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/creatives/${creative.id}/edit`}>
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
