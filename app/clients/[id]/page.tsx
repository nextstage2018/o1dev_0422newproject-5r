import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// サンプルデータ
const client = {
  id: "cl00001",
  name: "株式会社ABC",
  industry: "小売",
  contact: "田中太郎",
  email: "tanaka@abc.co.jp",
  phone: "03-1234-5678",
  address: "東京都渋谷区渋谷1-1-1",
  created_at: "2023-01-15",
}

const projects = [
  { id: "pr00001", name: "夏季キャンペーン", start_date: "2023-06-01", end_date: "2023-08-31", status: "進行中" },
  { id: "pr00002", name: "新商品発表", start_date: "2023-09-01", end_date: "2023-10-31", status: "準備中" },
]

export default function ClientDetailPage({ params }: { params: { id: string } }) {
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
          <CardTitle>{client.name}</CardTitle>
          <CardDescription>ID: {client.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">業種</h3>
              <p>{client.industry}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">担当者</h3>
              <p>{client.contact}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">メールアドレス</h3>
              <p>{client.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">電話番号</h3>
              <p>{client.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">住所</h3>
              <p>{client.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">登録日</h3>
              <p>{client.created_at}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">プロジェクト</TabsTrigger>
          <TabsTrigger value="campaigns">キャンペーン</TabsTrigger>
          <TabsTrigger value="tasks">タスク</TabsTrigger>
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
                        <TableCell>{project.end_date}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              project.status === "進行中"
                                ? "bg-green-100 text-green-800"
                                : project.status === "準備中"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Link href={`/projects/${project.id}/edit`}>
                              <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
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
        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>関連キャンペーン</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4 text-gray-500">関連するキャンペーンはありません</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>関連タスク</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4 text-gray-500">関連するタスクはありません</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
