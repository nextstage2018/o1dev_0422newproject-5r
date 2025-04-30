"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, ChevronLeftIcon } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

export default function NewCampaignPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // フォームデータの取得
      const formData = new FormData(e.currentTarget)
      const campaignData = {
        name: formData.get("name") as string,
        client: formData.get("client") as string,
        project: formData.get("project") as string,
        status: formData.get("status") as string,
        budget: formData.get("budget") as string,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        description: formData.get("description") as string,
      }

      // ここでAPIを呼び出してキャンペーンを作成
      // 実際の実装では、APIエンドポイントを呼び出す
      console.log("Creating campaign:", campaignData)

      // 成功メッセージを表示
      toast({
        title: "キャンペーンを作成しました",
        description: `${campaignData.name}が正常に作成されました。`,
      })

      // キャンペーン一覧ページにリダイレクト
      router.push("/campaigns")
    } catch (error) {
      console.error("Error creating campaign:", error)
      toast({
        title: "エラーが発生しました",
        description: "キャンペーンの作成中にエラーが発生しました。もう一度お試しください。",
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
        <h1 className="text-2xl font-bold">新規キャンペーン作成</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>キャンペーン情報</CardTitle>
            <CardDescription>新しいキャンペーンの基本情報を入力してください。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">キャンペーン名 *</Label>
                <Input id="name" name="name" required placeholder="キャンペーン名を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">クライアント *</Label>
                <Select name="client" required>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="クライアントを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client1">株式会社ABC</SelectItem>
                    <SelectItem value="client2">XYZ株式会社</SelectItem>
                    <SelectItem value="client3">123株式会社</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">プロジェクト *</Label>
                <Select name="project" required>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="プロジェクトを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project1">2024年春キャンペーン</SelectItem>
                    <SelectItem value="project2">新商品プロモーション</SelectItem>
                    <SelectItem value="project3">ブランド認知向上</SelectItem>
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

              <div className="space-y-2">
                <Label htmlFor="budget">予算（円）</Label>
                <Input id="budget" name="budget" type="number" placeholder="予算を入力" />
              </div>

              <div className="space-y-2">
                <Label>期間</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "yyyy年MM月dd日", { locale: ja }) : <span>開始日を選択</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "yyyy年MM月dd日", { locale: ja }) : <span>終了日を選択</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) => (startDate ? date < startDate : false)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea id="description" name="description" placeholder="キャンペーンの説明を入力" rows={4} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "作成中..." : "キャンペーンを作成"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
