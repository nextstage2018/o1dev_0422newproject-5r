"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function NewAdPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const campaignId = searchParams.get("campaign_id")
  const adsetId = searchParams.get("adset_id")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // フォームデータの取得
      const formData = new FormData(e.currentTarget)
      const adData = {
        name: formData.get("name") as string,
        adset_id: formData.get("adset_id") as string,
        creative_id: formData.get("creative_id") as string,
        status: formData.get("status") as string,
        description: formData.get("description") as string,
      }

      // ここでAPIを呼び出して広告を作成
      console.log("Creating ad:", adData)

      // 成功メッセージを表示
      toast({
        title: "広告を作成しました",
        description: `${adData.name}が正常に作成されました。`,
      })

      // リダイレクト先を決定
      setTimeout(() => {
        if (adsetId) {
          router.push(`/adsets/${adsetId}`)
        } else if (campaignId) {
          router.push(`/campaigns/${campaignId}`)
        } else {
          router.push("/ads")
        }
      }, 1000)
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
        <Link href={adsetId ? `/adsets/${adsetId}` : campaignId ? `/campaigns/${campaignId}` : "/ads"}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            戻る
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">新規広告作成</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告情報</CardTitle>
          <CardDescription>新しい広告の基本情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="ad-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">広告名 *</Label>
                <Input id="name" name="name" required placeholder="広告名を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adset_id">広告セット *</Label>
                <Select name="adset_id" required defaultValue={adsetId || ""}>
                  <SelectTrigger id="adset_id">
                    <SelectValue placeholder="広告セットを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="as00001">若年層ターゲット</SelectItem>
                    <SelectItem value="as00002">主婦層ターゲット</SelectItem>
                    <SelectItem value="as00003">ビジネスパーソンターゲット</SelectItem>
                    <SelectItem value="as00004">シニア層ターゲット</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="creative_id">クリエイティブ *</Label>
                <Select name="creative_id" required>
                  <SelectTrigger id="creative_id">
                    <SelectValue placeholder="クリエイティブを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cr00001">夏季バナー1</SelectItem>
                    <SelectItem value="cr00002">夏季バナー2</SelectItem>
                    <SelectItem value="cr00003">商品紹介動画</SelectItem>
                    <SelectItem value="cr00004">ブランドイメージ</SelectItem>
                    <SelectItem value="cr00005">特典案内</SelectItem>
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
                    <SelectItem value="active">配信中</SelectItem>
                    <SelectItem value="paused">停止中</SelectItem>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="archived">アーカイブ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea id="description" name="description" placeholder="広告の説明を入力" rows={4} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              router.push(adsetId ? `/adsets/${adsetId}` : campaignId ? `/campaigns/${campaignId}` : "/ads")
            }
          >
            キャンセル
          </Button>
          <Button type="submit" form="ad-form" disabled={isSubmitting}>
            {isSubmitting ? "作成中..." : "広告を作成"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
