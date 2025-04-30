"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { User, Account } from "@/types/user"
import { UserPermissionsTable } from "@/components/user-permissions-table"

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

// サンプルアカウントデータ
const sampleAccounts: Account[] = [
  {
    id: "acc1",
    name: "Google広告アカウント1",
    platform: "Google Ads",
    clientId: "client1",
    clientName: "株式会社A",
  },
  {
    id: "acc2",
    name: "Facebook広告アカウント1",
    platform: "Facebook Ads",
    clientId: "client1",
    clientName: "株式会社A",
  },
  {
    id: "acc3",
    name: "Google広告アカウント2",
    platform: "Google Ads",
    clientId: "client2",
    clientName: "株式会社B",
  },
  {
    id: "acc4",
    name: "Twitter広告アカウント1",
    platform: "Twitter Ads",
    clientId: "client3",
    clientName: "株式会社C",
  },
]

export default function UserPermissionsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // 実際の実装ではAPIからユーザー情報を取得
    const fetchUser = async () => {
      setLoading(true)
      try {
        // サンプルデータを使用
        const userData = sampleUsers[params.id]
        if (userData) {
          setUser(userData)
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

  const handleUpdatePermissions = async (updatedPermissions) => {
    if (!user) return

    setIsSaving(true)
    try {
      // 実際の実装ではAPIを呼び出して権限を更新
      console.log("権限更新:", updatedPermissions)

      // ユーザー情報を更新
      setUser({
        ...user,
        permissions: updatedPermissions,
      })

      toast({
        title: "権限を更新しました",
        description: `${user.name}の権限を更新しました`,
      })
    } catch (error) {
      console.error("権限の更新に失敗しました", error)
      toast({
        title: "エラー",
        description: "権限の更新に失敗しました",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
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

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/users/${params.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{user.name}の権限管理</h1>
        </div>
        <Button onClick={() => router.push(`/users/${params.id}`)} variant="outline">
          ユーザー詳細に戻る
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-gray-500" />
            <CardTitle>アカウント権限設定</CardTitle>
          </div>
          <CardDescription>このユーザーに付与する広告アカウントごとの権限を管理します</CardDescription>
        </CardHeader>
        <CardContent>
          <UserPermissionsTable
            permissions={user.permissions}
            accounts={sampleAccounts}
            userType={user.type}
            onUpdate={handleUpdatePermissions}
          />
        </CardContent>
      </Card>
    </div>
  )
}
