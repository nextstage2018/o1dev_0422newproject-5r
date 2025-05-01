"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function NewClientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // フォームデータの取得
      const formData = new FormData(e.currentTarget)
      const clientData = {
        name: formData.get("name") as string,
        industry: formData.get("industry") as string,
        contactPerson: formData.get("contactPerson") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        status: formData.get("status") as string,
        address: formData.get("address") as string,
        notes: formData.get("notes") as string,
      }

      // ここでAPIを呼び出してクライアントを作成
      console.log("Creating client:", clientData)

      // 成功メッセージを表示
      toast({
        title: "クライアントを作成しました",
        description: `${clientData.name}が正常に作成されました。`,
      })

      // クライアント一覧ページにリダイレクト
      setTimeout(() => {
        router.push("/clients")
      }, 1000)
    } catch (error) {
      console.error("Error creating client:", error)
      toast({
        title: "エラーが発生しました",
        description: "クライアントの作成中にエラーが発生しました。もう一度お試しください。",
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
        <h1 className="text-2xl font-bold">新規クライアント作成</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>クライアント情報</CardTitle>
            <CardDescription>新しいクライアントの基本情報を入力してください。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">クライアント名 *</Label>
                <Input id="name" name="name" required placeholder="クライアント名を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">業種 *</Label>
                <Select name="industry" required>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="業種を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="小売">小売</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="製造">製造</SelectItem>
                    <SelectItem value="サービス">サービス</SelectItem>
                    <SelectItem value="商社">商社</SelectItem>
                    <SelectItem value="金融">金融</SelectItem>
                    <SelectItem value="その他">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">担当者名 *</Label>
                <Input id="contactPerson" name="contactPerson" required placeholder="担当者名を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス *</Label>
                <Input id="email" name="email" type="email" required placeholder="メールアドレスを入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input id="phone" name="phone" placeholder="電話番号を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">ステータス *</Label>
                <Select name="status" required defaultValue="active">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">有効</SelectItem>
                    <SelectItem value="inactive">無効</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">住所</Label>
              <Input id="address" name="address" placeholder="住所を入力" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">備考</Label>
              <Textarea id="notes" name="notes" placeholder="備考を入力" rows={4} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "作成中..." : "クライアントを作成"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
