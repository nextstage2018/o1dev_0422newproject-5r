"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Mail, Building, UserCog, Users, Calendar, Shield } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import type { User, UserType, Account } from "@/types/user"
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
const sampleAccounts: Record<string, Account> = {
  acc1: {
    id: "acc1",
    name: "Google広告アカウント1",
    platform: "Google Ads",
    clientId: "client1",
    clientName: "株式会社A",
  },
  acc2: {
    id: "acc2",
    name: "Facebook広告アカウント1",
    platform: "Facebook Ads",
    clientId: "client1",
    clientName: "株式会社A",
  },
  acc3: {
    id: "acc3",
    name: "Google広告アカウント2",
    platform: "Google Ads",
    clientId: "client2",
    clientName: "株式会社B",
  },
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

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

  const handleDeleteUser = async () => {
    try {
      // 実際の実装ではAPIを呼び出してユーザーを削除
      console.log(`ユーザー削除: ${params.id}`)
      toast({
        title: "ユーザーを削除しました",
        description: `${user?.name} を削除しました`,
      })
      router.push("/users")
    } catch (error) {
      console.error("ユーザーの削除に失敗しました", error)
      toast({
        title: "エラー",
        description: "ユーザーの削除に失敗しました",
        variant: "destructive",
      })
    }
  }

  // ユーザータイプに基づいてバッジの色を取得
  const getUserTypeBadge = (type: UserType) => {
    switch (type) {
      case "internal":
        return <Badge className="bg-blue-500">社内メンバー</Badge>
      case "external":
        return <Badge className="bg-green-500">外部メンバー</Badge>
      case "client":
        return <Badge className="bg-purple-500">クライアント</Badge>
    }
  }

  // ユーザータイプに基づいてアイコンを取得
  const getUserTypeIcon = (type: UserType) => {
    switch (type) {
      case "internal":
        return <UserCog className="h-5 w-5" />
      case "external":
        return <Users className="h-5 w-5" />
      case "client":
        return <Building className="h-5 w-5" />
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
          <Link href="/users">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
          {getUserTypeBadge(user.type)}
        </div>
        <div className="flex space-x-2">
          <Link href={`/users/${user.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                <Trash2 className="mr-2 h-4 w-4" />
                削除
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>ユーザーの削除</AlertDialogTitle>
                <AlertDialogDescription>
                  本当に「{user.name}」を削除しますか？この操作は元に戻せません。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600">
                  削除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>ユーザー情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-full p-6">{getUserTypeIcon(user.type)}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">メールアドレス</p>
                    <p>{user.email}</p>
                  </div>
                </div>

                {(user.department || user.company) && (
                  <div className="flex items-start">
                    <Building className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">{user.type === "internal" ? "部署" : "会社"}</p>
                      <p>{user.department || user.company}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <Calendar className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">登録日</p>
                    <p>{user.createdAt}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Shield className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">権限</p>
                    <p>{user.permissions.length}つの広告アカウントに権限あり</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>権限設定</CardTitle>
            <CardDescription>このユーザーに付与されている広告アカウント別の権限</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="permissions">
              <TabsList className="mb-4">
                <TabsTrigger value="permissions">権限一覧</TabsTrigger>
                <TabsTrigger value="activity">活動履歴</TabsTrigger>
              </TabsList>
              <TabsContent value="permissions">
                <UserPermissionsTable
                  permissions={user.permissions}
                  accounts={Object.values(sampleAccounts)}
                  userType={user.type}
                />
              </TabsContent>
              <TabsContent value="activity">
                <div className="text-center py-8 text-gray-500">活動履歴は現在実装中です</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
