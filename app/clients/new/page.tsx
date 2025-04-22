"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewClientPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    contact: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIndustryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, industry: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // ここでAPIリクエストを送信する
    // 実際の実装では、APIエンドポイントにPOSTリクエストを送信します
    console.log("送信データ:", formData)

    // 送信完了後、クライアント一覧ページに戻る
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/clients")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">新規クライアント登録</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>クライアント情報</CardTitle>
            <CardDescription>新しいクライアント企業の情報を入力してください。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">企業名</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">業種</Label>
              <Select value={formData.industry} onValueChange={handleIndustryChange} required>
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
                  <SelectItem value="不動産">不動産</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">担当者名</Label>
              <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">電話番号</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/clients")}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "登録中..." : "登録"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
