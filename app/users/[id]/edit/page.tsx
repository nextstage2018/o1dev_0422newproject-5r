"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Edit, UserCog, Users, Building } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { User, UserType } from "@/types/user"

// サンプルデータ
const sampleUsers: Record<string, User> = {
  user1: {
    id: "user1",
    name: "山田太郎",
    email: "yamada@example.com",
    type: "internal",
    department: "マーケティング部",
    permissions: [
      { accountId: "acc1", roles: ["admin"] },
      { accountId: "acc2", roles: ["project_manager"] },
    ],
    createdAt: "2023-01-15",
    updatedAt: "2023-04-20",
  },
  user2: {
    id: "user2",
    name: "佐藤花子",
    email: "sato@example.com",
    type: "external",
    company: "株式会社メディア",
    permissions: [
      { accountId: "acc1", roles: ["ad_operator"] },
      { accountId: "acc3", roles: ["sales_rep"] },
    ],
    createdAt: "2023-02-10",
    updatedAt: "2023-05-15",
  },
  user3: {
    id: "user3",
    name: "鈴木一郎",
    email: "suzuki@example.com",
    type: "client",
    company: "株式会社クライアント",
    permissions: [{ accountId: "acc2", roles: ["client"] }],
    createdAt: "2023-03-05",
    updatedAt: "2023-03-05",
  },
}

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    type: "" as UserType,
    department: "",
    company: "",
  })
  const [originalType, setOriginalType] = useState<UserType>("internal")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // 実際の実装ではAPIからユーザー情報を取得
    const fetchUser = async () => {
      setLoading(true)
      try {
        // サンプルデータを使用
        const userData = sampleUsers[params.id]
        if (userData) {
          setFormData({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            type: userData.type,
            department: userData.department || "",
            company: userData.company || "",
          })
          setOriginalType(userData.type)
        } else {
          toast({
            title: "エラー",
            description: "ユーザーが見つかりませんでした",
            variant: "destructive",
          })
          router.push("/users")
        }
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました", error)
        toast({
          title: "エラー",
          description: "ユーザー情報の取得に失敗しました",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id, router])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 実際の実装ではAPIを呼び出してユーザーを更新
      console.log("ユーザー更新:", formData)

      // 成功メッセージを表示
      toast({
        title: "ユーザーを更新しました",
        description: `${formData.name} (${formData.email}) を更新しました`,
      })

      // ユーザー詳細ページにリダイレクト
      router.push(`/users/${params.id}`)
    } catch (error) {
      console.error("ユーザーの更新に失敗しました", error)
      toast({
        title: "エラー",
        description: "ユーザーの更新に失敗しました",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href={`/users/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">ユーザー編集</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Edit className="h-5 w-5 text-gray-500" />
            <CardTitle>ユーザー情報の編集</CardTitle>
          </div>
          <CardDescription>ユーザーの基本情報を編集します</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="user-type">
                    ユーザータイプ <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange("type", value as UserType)}
                    required
                  >
                    <SelectTrigger id="user-type">
                      <SelectValue placeholder="ユーザータイプを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">
                        <div className="flex items-center">
                          <UserCog className="h-4 w-4 mr-2" />
                          <span>社内メンバー</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="external">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>外部メンバー</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="client">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          <span>クライアント</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {originalType !== formData.type && (
                    <p className="text-amber-500 text-sm mt-1">
                      ユーザータイプを変更すると、既存の権限設定に影響する可能性があります
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    名前 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    メールアドレス <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              {formData.type === "internal" && (
                <div className="space-y-2">
                  <Label htmlFor="department">部署</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                  />
                </div>
              )}

              {(formData.type === "external" || formData.type === "client") && (
                <div className="space-y-2">
                  <Label htmlFor="company">会社名</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Link href={`/users/${params.id}`}>
                <Button variant="outline" type="button">
                  キャンセル
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "更新中..." : "更新する"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
