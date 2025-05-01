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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function NewAdSetPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const campaignId = searchParams.get("campaign_id")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([])

  const handlePlacementChange = (placement: string) => {
    setSelectedPlacements((current) => {
      if (current.includes(placement)) {
        return current.filter((p) => p !== placement)
      } else {
        return [...current, placement]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // フォームデータの取得
      const formData = new FormData(e.currentTarget)
      const adSetData = {
        name: formData.get("name") as string,
        campaign_id: formData.get("campaign_id") as string,
        placements: selectedPlacements,
        targeting_segment: formData.get("targeting_segment") as string,
        daily_budget: formData.get("daily_budget") as string,
        status: formData.get("status") as string,
        description: formData.get("description") as string,
      }

      // ここでAPIを呼び出して広告セットを作成
      console.log("Creating ad set:", adSetData)

      // 成功メッセージを表示
      toast({
        title: "広告セットを作成しました",
        description: `${adSetData.name}が正常に作成されました。`,
      })

      // 広告セット一覧ページまたはキャンペーン詳細ページにリダイレクト
      setTimeout(() => {
        if (campaignId) {
          router.push(`/campaigns/${campaignId}`)
        } else {
          router.push("/adsets")
        }
      }, 1000)
    } catch (error) {
      console.error("Error creating ad set:", error)
      toast({
        title: "エラーが発生しました",
        description: "広告セットの作成中にエラーが発生しました。もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link href={campaignId ? `/campaigns/${campaignId}` : "/adsets"}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            戻る
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">新規広告セット作成</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告セット情報</CardTitle>
          <CardDescription>新しい広告セットの基本情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="adset-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">広告セット名 *</Label>
                <Input id="name" name="name" required placeholder="広告セット名を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign_id">キャンペーン *</Label>
                <Select name="campaign_id" required defaultValue={campaignId || ""}>
                  <SelectTrigger id="campaign_id">
                    <SelectValue placeholder="キャンペーンを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cp00001">夏季キャンペーン2023</SelectItem>
                    <SelectItem value="cp00002">新商品発表キャンペーン</SelectItem>
                    <SelectItem value="cp00003">年末セールキャンペーン</SelectItem>
                    <SelectItem value="cp00004">ブランドリニューアルキャンペーン</SelectItem>
                    <SelectItem value="cp00005">新規顧客獲得キャンペーン</SelectItem>
                    <SelectItem value="cp00006">認知拡大キャンペーン</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label>配置 *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="placement-facebook"
                      checked={selectedPlacements.includes("Facebook")}
                      onCheckedChange={() => handlePlacementChange("Facebook")}
                    />
                    <Label htmlFor="placement-facebook" className="font-normal">
                      Facebook
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="placement-instagram"
                      checked={selectedPlacements.includes("Instagram")}
                      onCheckedChange={() => handlePlacementChange("Instagram")}
                    />
                    <Label htmlFor="placement-instagram" className="font-normal">
                      Instagram
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="placement-display"
                      checked={selectedPlacements.includes("Display")}
                      onCheckedChange={() => handlePlacementChange("Display")}
                    />
                    <Label htmlFor="placement-display" className="font-normal">
                      ディスプレイ
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="placement-search"
                      checked={selectedPlacements.includes("Search")}
                      onCheckedChange={() => handlePlacementChange("Search")}
                    />
                    <Label htmlFor="placement-search" className="font-normal">
                      検索
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="placement-youtube"
                      checked={selectedPlacements.includes("YouTube")}
                      onCheckedChange={() => handlePlacementChange("YouTube")}
                    />
                    <Label htmlFor="placement-youtube" className="font-normal">
                      YouTube
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="placement-twitter"
                      checked={selectedPlacements.includes("Twitter")}
                      onCheckedChange={() => handlePlacementChange("Twitter")}
                    />
                    <Label htmlFor="placement-twitter" className="font-normal">
                      Twitter
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targeting_segment">ターゲティングセグメント *</Label>
                <Input id="targeting_segment" name="targeting_segment" required placeholder="例: 18-24歳,学生" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="daily_budget">日予算（円） *</Label>
                <Input id="daily_budget" name="daily_budget" type="number" required placeholder="日予算を入力" />
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
              <Textarea id="description" name="description" placeholder="広告セットの説明を入力" rows={4} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push(campaignId ? `/campaigns/${campaignId}` : "/adsets")}
          >
            キャンセル
          </Button>
          <Button type="submit" form="adset-form" disabled={isSubmitting}>
            {isSubmitting ? "作成中..." : "広告セットを作成"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
