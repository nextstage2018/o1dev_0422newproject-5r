"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function NewAdPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCreatives, setSelectedCreatives] = useState<string[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // サンプルのクリエイティブデータ
  const sampleCreatives = [
    { id: "creative1", name: "バナー広告A", type: "image", url: "/celebratory-banner.png" },
    { id: "creative2", name: "バナー広告B", type: "image", url: "/abstract-geometric-banner.png" },
    { id: "creative3", name: "動画広告A", type: "video", url: "/video-thumbnail.png" },
  ]

  const handleCreativeSelect = (creativeId: string) => {
    if (selectedCreatives.includes(creativeId)) {
      setSelectedCreatives(selectedCreatives.filter((id) => id !== creativeId))
      setPreviewUrl(null)
    } else {
      setSelectedCreatives([...selectedCreatives, creativeId])
      const creative = sampleCreatives.find((c) => c.id === creativeId)
      if (creative) {
        setPreviewUrl(creative.url)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // フォームデータの取得
      const formData = new FormData(e.currentTarget)
      const adData = {
        name: formData.get("name") as string,
        adSet: formData.get("adSet") as string,
        status: formData.get("status") as string,
        headline: formData.get("headline") as string,
        description: formData.get("description") as string,
        destinationUrl: formData.get("destinationUrl") as string,
        creatives: selectedCreatives,
      }

      // ここでAPIを呼び出して広告を作成
      // 実際の実装では、APIエンドポイントを呼び出す
      console.log("Creating ad:", adData)

      // 成功メッセージを表示
      toast({
        title: "広告を作成しました",
        description: `${adData.name}が正常に作成されました。`,
      })

      // 広告一覧ページにリダイレクト
      router.push("/ads")
    } catch (error) {
      console.error("Error creating ad:", error)
      toast({
        title: "エラーが発生しました",
        description: "広告の作成中にエラーが発生しました。もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          戻る
        </Button>
        <h1 className="text-2xl font-bold">新規広告作成</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="mb-6">
          <TabsList>
            <TabsTrigger value="basic">基本情報</TabsTrigger>
            <TabsTrigger value="creative">クリエイティブ</TabsTrigger>
            <TabsTrigger value="preview">プレビュー</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>基本情報</CardTitle>
                <CardDescription>広告の基本情報を入力してください。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">広告名 *</Label>
                    <Input id="name" name="name" required placeholder="広告名を入力" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adSet">広告セット *</Label>
                    <Select name="adSet" required>
                      <SelectTrigger id="adSet">
                        <SelectValue placeholder="広告セットを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adset1">春キャンペーン - 若年層向け</SelectItem>
                        <SelectItem value="adset2">春キャンペーン - 中年層向け</SelectItem>
                        <SelectItem value="adset3">新商品プロモーション - 全国</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">ステータス *</Label>
                    <Select name="status" required defaultValue="draft">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="ステータスを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">下書き</SelectItem>
                        <SelectItem value="planned">計画中</SelectItem>
                        <SelectItem value="active">アクティブ</SelectItem>
                        <SelectItem value="paused">一時停止</SelectItem>
                        <SelectItem value="completed">完了</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">見出し *</Label>
                  <Input id="headline" name="headline" required placeholder="広告の見出しを入力" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">説明文 *</Label>
                  <Textarea id="description" name="description" required placeholder="広告の説明文を入力" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destinationUrl">リンク先URL *</Label>
                  <Input
                    id="destinationUrl"
                    name="destinationUrl"
                    required
                    placeholder="https://example.com/landing-page"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creative">
            <Card>
              <CardHeader>
                <CardTitle>クリエイティブ選択</CardTitle>
                <CardDescription>広告に使用するクリエイティブを選択してください。</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sampleCreatives.map((creative) => (
                    <div
                      key={creative.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedCreatives.includes(creative.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleCreativeSelect(creative.id)}
                    >
                      <div className="aspect-video mb-2 bg-muted rounded-md overflow-hidden">
                        <img
                          src={creative.url || "/placeholder.svg"}
                          alt={creative.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{creative.name}</p>
                          <p className="text-sm text-muted-foreground">{creative.type}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedCreatives.includes(creative.id)}
                          onChange={() => {}}
                          className="h-4 w-4 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <Button type="button" variant="outline" onClick={() => router.push("/creatives/new")}>
                    新規クリエイティブを作成
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>広告プレビュー</CardTitle>
                <CardDescription>作成される広告のプレビューを確認してください。</CardDescription>
              </CardHeader>
              <CardContent>
                {previewUrl ? (
                  <div className="border rounded-lg p-6">
                    <div className="max-w-md mx-auto">
                      <div className="aspect-video mb-4 bg-muted rounded-md overflow-hidden">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="広告プレビュー"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">サンプル見出し</h3>
                        <p className="text-sm text-muted-foreground">
                          これは広告の説明文のサンプルです。実際の広告では、入力した内容が表示されます。
                        </p>
                        <p className="text-xs text-blue-600">www.example.com</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>クリエイティブを選択するとプレビューが表示されます</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            キャンセル
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "作成中..." : "広告を作成"}
          </Button>
        </div>
      </form>
    </div>
  )
}
