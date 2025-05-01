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
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function NewClientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // フォームの状態
  const [formData, setFormData] = useState({
    company_name: "",
    industry: "IT",
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
    notes: "",
  })

  // 入力値の変更を処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // セレクトの変更を処理
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 必須フィールドの検証
      if (!formData.company_name || !formData.name || !formData.email) {
        toast({
          title: "入力エラー",
          description: "必須項目をすべて入力してください",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // ここでAPIを呼び出してクライアントを作成
      console.log("Creating client:", formData)

      // 成功メッセージを表示
      toast({
        title: "クライアントを作成しました",
        description: `${formData.company_name}が正常に作成されました。`,
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/clients">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">新規クライアント作成</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クライアント情報</CardTitle>
          <CardDescription>新しいクライアントの基本情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="client-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company_name">
                  会社名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  placeholder="会社名を入力"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">
                  業種 <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="industry"
                  value={formData.industry}
                  onValueChange={(value) => handleSelectChange("industry", value)}
                >
                  <SelectTrigger>
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
                <Label htmlFor="name">
                  担当者名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="担当者名を入力"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  メールアドレス <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="メールアドレスを入力"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="電話番号を入力"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  ステータス <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">有効</SelectItem>
                    <SelectItem value="inactive">無効</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">住所</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="住所を入力"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">備考</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="備考を入力"
                rows={4}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.push("/clients")}>
            キャンセル
          </Button>
          <Button type="submit" form="client-form" disabled={isSubmitting}>
            {isSubmitting ? "作成中..." : "クライアントを作成"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
