"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, ChevronLeftIcon } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export default function NewAdSetPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isAdvancedTargeting, setIsAdvancedTargeting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // フォームデータの取得
      const formData = new FormData(e.currentTarget)
      const adSetData = {
        name: formData.get("name") as string,
        campaign: formData.get("campaign") as string,
        status: formData.get("status") as string,
        budget: formData.get("budget") as string,
        bidStrategy: formData.get("bidStrategy") as string,
        platform: formData.get("platform") as string,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        targetingAge: Array.from(formData.getAll("targetingAge")),
        targetingGender: formData.get("targetingGender") as string,
        description: formData.get("description") as string,
      }

      // ここでAPIを呼び出して広告セットを作成
      console.log("Creating ad set:", adSetData)

      // 成功メッセージを表示
      toast({
        title: "広告セットを作成しました",
        description: `${adSetData.name}が正常に作成されました。`,
      })

      // 広告セット一覧ページにリダイレクト
      setTimeout(() => {
        router.push("/adsets")
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
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          戻る
        </Button>
        <h1 className="text-2xl font-bold">新規広告セット作成</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="mb-6">
          <TabsList>
            <TabsTrigger value="basic">基本情報</TabsTrigger>
            <TabsTrigger value="targeting">ターゲティング</TabsTrigger>
            <TabsTrigger value="budget">予算と入札</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>基本情報</CardTitle>
                <CardDescription>広告セットの基本情報を入力してください。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">広告セット名 *</Label>
                    <Input id="name" name="name" required placeholder="広告セット名を入力" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaign">キャンペーン *</Label>
                    <Select name="campaign" required>
                      <SelectTrigger id="campaign">
                        <SelectValue placeholder="キャンペーンを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="campaign1">2024年春キャンペーン</SelectItem>
                        <SelectItem value="campaign2">新商品プロモーション</SelectItem>
                        <SelectItem value="campaign3">ブランド認知向上</SelectItem>
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
                    <Label htmlFor="platform">プラットフォーム *</Label>
                    <Select name="platform" required>
                      <SelectTrigger id="platform">
                        <SelectValue placeholder="プラットフォームを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="line">LINE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>期間</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? (
                                format(startDate, "yyyy年MM月dd日", { locale: ja })
                              ) : (
                                <span>開始日を選択</span>
                              )}
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
                  <Textarea id="description" name="description" placeholder="広告セットの説明を入力" rows={4} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="targeting">
            <Card>
              <CardHeader>
                <CardTitle>ターゲティング設定</CardTitle>
                <CardDescription>広告セットのターゲティング情報を設定してください。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="advanced-targeting"
                    checked={isAdvancedTargeting}
                    onCheckedChange={setIsAdvancedTargeting}
                  />
                  <Label htmlFor="advanced-targeting">詳細なターゲティングを使用する</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="targetingGender">性別</Label>
                    <Select name="targetingGender" defaultValue="all">
                      <SelectTrigger id="targetingGender">
                        <SelectValue placeholder="性別を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="male">男性</SelectItem>
                        <SelectItem value="female">女性</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>年齢層</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="age-18-24" name="targetingAge" value="18-24" className="rounded" />
                        <Label htmlFor="age-18-24">18-24歳</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="age-25-34" name="targetingAge" value="25-34" className="rounded" />
                        <Label htmlFor="age-25-34">25-34歳</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="age-35-44" name="targetingAge" value="35-44" className="rounded" />
                        <Label htmlFor="age-35-44">35-44歳</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="age-45-54" name="targetingAge" value="45-54" className="rounded" />
                        <Label htmlFor="age-45-54">45-54歳</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="age-55-64" name="targetingAge" value="55-64" className="rounded" />
                        <Label htmlFor="age-55-64">55-64歳</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="age-65plus" name="targetingAge" value="65plus" className="rounded" />
                        <Label htmlFor="age-65plus">65歳以上</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {isAdvancedTargeting && (
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="text-md font-medium">詳細なターゲティング</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location">地域</Label>
                        <Select name="location">
                          <SelectTrigger id="location">
                            <SelectValue placeholder="地域を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="japan">日本全国</SelectItem>
                            <SelectItem value="tokyo">東京都</SelectItem>
                            <SelectItem value="osaka">大阪府</SelectItem>
                            <SelectItem value="nagoya">愛知県</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interests">興味・関心</Label>
                        <Select name="interests">
                          <SelectTrigger id="interests">
                            <SelectValue placeholder="興味・関心を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fashion">ファッション</SelectItem>
                            <SelectItem value="technology">テクノロジー</SelectItem>
                            <SelectItem value="food">食品・グルメ</SelectItem>
                            <SelectItem value="travel">旅行</SelectItem>
                            <SelectItem value="fitness">フィットネス</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>予算と入札設定</CardTitle>
                <CardDescription>広告セットの予算と入札戦略を設定してください。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">予算（円/日）*</Label>
                    <Input id="budget" name="budget" type="number" required placeholder="日予算を入力" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bidStrategy">入札戦略 *</Label>
                    <Select name="bidStrategy" required defaultValue="auto">
                      <SelectTrigger id="bidStrategy">
                        <SelectValue placeholder="入札戦略を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">自動入札</SelectItem>
                        <SelectItem value="manual">手動入札</SelectItem>
                        <SelectItem value="target_cpa">ターゲットCPA</SelectItem>
                        <SelectItem value="target_roas">ターゲットROAS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            キャンセル
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "作成中..." : "広告セットを作成"}
          </Button>
        </div>
      </form>
    </div>
  )
}
