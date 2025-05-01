"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
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
        project_id: formData.get("project_id") as string,
        objective: formData.get("objective") as string,
        status: formData.get("status") as string,
        budget_total: formData.get("budget_total") as string,
        budget_daily: formData.get("budget_daily") as string,
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
        description: formData.get("description") as string,
      }

      // ここでAPIを呼び出してキャンペーンを作成
      console.log("Creating campaign:", campaignData)

      // 成功メッセージを表示
      toast({
        title: "キャンペーンを作成しました",
        description: `${campaignData.name}が正常に作成されました。`,
      })

      // キャンペーン一覧ページにリダイレクト
      setTimeout(() => {
        router.push("/campaigns")
      }, 1000)
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
        <Link href="/campaigns">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            戻る
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">新規キャンペーン作成</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>キャンペーン情報</CardTitle>
          <CardDescription>新しいキャンペーンの基本情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="campaign-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">キャンペーン名 *</Label>
                <Input id="name" name="name" required placeholder="キャンペーン名を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_id">プロジェクト *</Label>
                <Select name="project_id" required>
                  <SelectTrigger id="project_id">
                    <SelectValue placeholder="プロジェクトを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pr00001">株式会社ABC 夏季プロモーション</SelectItem>
                    <SelectItem value="pr00002">DEF株式会社 年末プロモーション</SelectItem>
                    <SelectItem value="pr00003">GHI工業 ブランディング</SelectItem>
                    <SelectItem value="pr00004">JKLサービス 顧客獲得</SelectItem>
                    <SelectItem value="pr00005">MNO商事 認知拡大</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">広告目的 *</Label>
                <Select name="objective" required>
                  <SelectTrigger id="objective">
                    <SelectValue placeholder="広告目的を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="認知拡大">認知拡大</SelectItem>
                    <SelectItem value="リーチ">リーチ</SelectItem>
                    <SelectItem value="トラフィック">トラフィック</SelectItem>
                    <SelectItem value="エンゲージメント">エンゲージメント</SelectItem>
                    <SelectItem value="アプリインストール">アプリインストール</SelectItem>
                    <SelectItem value="動画再生">動画再生</SelectItem>
                    <SelectItem value="リード獲得">リード獲得</SelectItem>
                    <SelectItem value="メッセージ">メッセージ</SelectItem>
                    <SelectItem value="コンバージョン">コンバージョン</SelectItem>
                    <SelectItem value="カタログ販売">カタログ販売</SelectItem>
                    <SelectItem value="来店">来店</SelectItem>
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

              <div className="space-y-2">
                <Label htmlFor="budget_total">総予算（円）</Label>
                <Input id="budget_total" name="budget_total" type="number" placeholder="総予算を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget_daily">日予算（円） *</Label>
                <Input id="budget_daily" name="budget_daily" type="number" required placeholder="日予算を入力" />
              </div>

              <div className="space-y-2">
                <Label>開始日 *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" type="button">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "yyyy年MM月dd日", { locale: ja }) : <span>開始日を選択</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>終了日</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" type="button">
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

            <div className="space-y-2">
              <Label htmlFor="description">キャンペーン説明</Label>
              <Textarea id="description" name="description" placeholder="キャンペーンの説明を入力" rows={4} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.push("/campaigns")}>
            キャンセル
          </Button>
          <Button type="submit" form="campaign-form" disabled={isSubmitting}>
            {isSubmitting ? "作成中..." : "キャンペーンを作成"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
