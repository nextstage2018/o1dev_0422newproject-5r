"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useClientStore, type Client } from "@/lib/store/client-store"
import { toast } from "@/components/ui/use-toast"

// サンプルプロジェクトデータ
const projects = [
  {
    id: "pr00001",
    name: "夏季キャンペーン",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    budget: 1000000,
    status: "active",
  },
  {
    id: "pr00002",
    name: "年末プロモーション",
    start_date: "2023-11-01",
    end_date: "2023-12-31",
    budget: 1200000,
    status: "planning",
  },
]

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getClient } = useClientStore()
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClientData = () => {
      setIsLoading(true)
      try {
        const clientData = getClient(params.id)
        if (clientData) {
          setClient(clientData)
        } else {
          toast({
            title: "エラー",
            description: "クライアント情報が見つかりませんでした",
            variant: "destructive",
          })
          setTimeout(() => {
            router.push("/clients")
          }, 1500)
        }
      } catch (error) {
        console.error("データ取得エラー:", error)
        toast({
          title: "エラーが発生しました",
          description: "クライアント情報の取得に失敗しました",
          variant: "destructive",
        })
        router.push("/clients")
      } finally {
        setIsLoading(false)
      }
    }

    fetchClientData()
  }, [params.id, getClient, router])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">有効</Badge>
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-800">無効</Badge>
      case "planning":
        return <Badge className="bg-blue-100 text-blue-800">計画中</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p>読み込み中...</p>
      </div>
    )
  }

  if (!client) {
    return null
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
          <h1 className="text-2xl font-bold tracking-tight">クライアント詳細</h1>
        </div>
        <Link href={`/clients/${params.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            編集
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{client.client_name}</CardTitle>
          <CardDescription>ID: {client.client_id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">業種</h3>
              <p>{client.industry}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">担当者</h3>
              <p>{client.contact_person}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">メールアドレス</h3>
              <p>{client.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">電話番号</h3>
              <p>{client.phone || "未設定"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">住所</h3>
              <p>{client.address || "未設定"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ステータス</h3>
              <p>{getStatusBadge(client.status)}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">備考</h3>
            <p className="mt-1">{client.notes || "備考はありません"}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">プロジェクト</TabsTrigger>
          <TabsTrigger value="history">履歴</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>関連プロジェクト</CardTitle>
                <Link href={`/projects/new?client_id=${params.id}`}>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    新規プロジェクト
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {projects.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>プロジェクト名</TableHead>
                      <TableHead>開始日</TableHead>
                      <TableHead>終了日</TableHead>
                      <TableHead>予算</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.id}</TableCell>
                        <TableCell>
                          <Link href={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                            {project.name}
                          </Link>
                        </TableCell>
                        <TableCell>{project.start_date}</TableCell>
                        <TableCell>{project.end_date || "-"}</TableCell>
                        <TableCell>{formatCurrency(project.budget)}</TableCell>
                        <TableCell>{getStatusBadge(project.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Link href={`/projects/${project.id}/edit`}>
                              <Button variant="outline" size="sm">
                                編集
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-gray-500">関連するプロジェクトはありません</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>履歴</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4 text-gray-500">履歴データは現在利用できません</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
