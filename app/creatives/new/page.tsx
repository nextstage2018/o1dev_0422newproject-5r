"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon, X, ImageIcon, FileVideo } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function NewCreativePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [creativeType, setCreativeType] = useState<"image" | "video">("image")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ファイルサイズチェック (10MB以下)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "ファイルサイズが大きすぎます",
        description: "10MB以下のファイルをアップロードしてください。",
        variant: "destructive",
      })
      return
    }

    // ファイルタイプチェック
    if (creativeType === "image" && !file.type.startsWith("image/")) {
      toast({
        title: "無効なファイル形式です",
        description: "画像ファイル（JPG、PNG、GIF）をアップロードしてください。",
        variant: "destructive",
      })
      return
    }

    if (creativeType === "video" && !file.type.startsWith("video/")) {
      toast({
        title: "無効なファイル形式です",
        description: "動画ファイル（MP4、MOV、AVI）をアップロードしてください。",
        variant: "destructive",
      })
      return
    }

    setUploadedFile(file)

    // プレビューURLを作成
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }

  const clearUploadedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setUploadedFile(null)
    setPreviewUrl(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // フォームデータの取得
      const formData = new FormData(e.currentTarget)
      formData.append("type", creativeType)
      if (uploadedFile) {
        formData.append("file", uploadedFile)
      }

      const creativeData = {
        name: formData.get("name") as string,
        type: creativeType,
        format: formData.get("format") as string,
        status: formData.get("status") as string,
        description: formData.get("description") as string,
        fileName: uploadedFile?.name || "",
      }

      // ここでAPIを呼び出してクリエイティブを作成
      // 実際の実装では、APIエンドポイントを呼び出す
      console.log("Creating creative:", creativeData)

      // 成功メッセージを表示
      toast({
        title: "クリエイティブを作成しました",
        description: `${creativeData.name}が正常に作成されました。`,
      })

      // クリエイティブ一覧ページにリダイレクト
      router.push("/creatives")
    } catch (error) {
      console.error("Error creating creative:", error)
      toast({
        title: "エラーが発生しました",
        description: "クリエイティブの作成中にエラーが発生しました。もう一度お試しください。",
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
        <h1 className="text-2xl font-bold">新規クリエイティブ作成</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="mb-6">
          <TabsList>
            <TabsTrigger value="basic">基本情報</TabsTrigger>
            <TabsTrigger value="upload">アップロード</TabsTrigger>
            <TabsTrigger value="preview">プレビュー</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>基本情報</CardTitle>
                <CardDescription>クリエイティブの基本情報を入力してください。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">クリエイティブ名 *</Label>
                    <Input id="name" name="name" required placeholder="クリエイティブ名を入力" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creativeType">タイプ *</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="type-image"
                          name="creativeType"
                          value="image"
                          checked={creativeType === "image"}
                          onChange={() => setCreativeType("image")}
                          className="mr-2"
                        />
                        <Label htmlFor="type-image">画像</Label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="type-video"
                          name="creativeType"
                          value="video"
                          checked={creativeType === "video"}
                          onChange={() => setCreativeType("video")}
                          className="mr-2"
                        />
                        <Label htmlFor="type-video">動画</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">フォーマット *</Label>
                    <Select name="format" required>
                      <SelectTrigger id="format">
                        <SelectValue placeholder="フォーマットを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {creativeType === "image" ? (
                          <>
                            <SelectItem value="banner">バナー広告</SelectItem>
                            <SelectItem value="square">正方形広告</SelectItem>
                            <SelectItem value="story">ストーリー広告</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="instream">インストリーム広告</SelectItem>
                            <SelectItem value="outstream">アウトストリーム広告</SelectItem>
                            <SelectItem value="story">ストーリー広告</SelectItem>
                          </>
                        )}
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
                        <SelectItem value="active">アクティブ</SelectItem>
                        <SelectItem value="paused">一時停止</SelectItem>
                        <SelectItem value="archived">アーカイブ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">説明</Label>
                  <Textarea id="description" name="description" placeholder="クリエイティブの説明を入力" rows={3} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>ファイルアップロード</CardTitle>
                <CardDescription>
                  {creativeType === "image"
                    ? "画像ファイル（JPG、PNG、GIF）をアップロードしてください。"
                    : "動画ファイル（MP4、MOV、AVI）をアップロードしてください。"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept={creativeType === "image" ? "image/*" : "video/*"}
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                      <div className="rounded-full bg-primary/10 p-4 mb-4">
                        {creativeType === "image" ? (
                          <ImageIcon className="h-8 w-8 text-primary" />
                        ) : (
                          <FileVideo className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      <p className="text-lg font-medium mb-1">クリックしてファイルを選択</p>
                      <p className="text-sm text-muted-foreground">または、ファイルをここにドラッグ＆ドロップ</p>
                      <p className="text-xs text-muted-foreground mt-2">最大ファイルサイズ: 10MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {creativeType === "image" ? (
                          <Image className="h-5 w-5 mr-2 text-primary" />
                        ) : (
                          <FileVideo className="h-5 w-5 mr-2 text-primary" />
                        )}
                        <span className="font-medium">{uploadedFile.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearUploadedFile}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>ファイルサイズ: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <p>ファイルタイプ: {uploadedFile.type}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>プレビュー</CardTitle>
                <CardDescription>アップロードしたクリエイティブのプレビューを確認してください。</CardDescription>
              </CardHeader>
              <CardContent>
                {previewUrl ? (
                  <div className="flex justify-center">
                    {creativeType === "image" ? (
                      <div className="border rounded-lg overflow-hidden max-w-md">
                        <img src={previewUrl || "/placeholder.svg"} alt="プレビュー" className="max-w-full h-auto" />
                      </div>
                    ) : (
                      <div className="border rounded-lg overflow-hidden max-w-md">
                        <video src={previewUrl} controls className="max-w-full h-auto" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>ファイルをアップロードするとプレビューが表示されます</p>
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
          <Button type="submit" disabled={isSubmitting || !uploadedFile}>
            {isSubmitting ? "作成中..." : "クリエイティブを作成"}
          </Button>
        </div>
      </form>
    </div>
  )
}
