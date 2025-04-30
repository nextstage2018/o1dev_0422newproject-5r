import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"

// サンプルデータ
const projects = [
  {
    id: "pr00001",
    name: "夏季キャンペーン",
    client: "株式会社ABC",
    client_id: "cl00001",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    status: "active",
  },
  {
    id: "pr00002",
    name: "新商品発表",
    client: "株式会社ABC",
    client_id: "cl00001",
    start_date: "2023-09-01",
    end_date: "2023-10-31",
    status: "draft",
  },
  {
    id: "pr00003",
    name: "年末セール",
    client: "DEF株式会社",
    client_id: "cl00002",
    start_date: "2023-11-01",
    end_date: "2023-12-31",
    status: "draft",
  },
  {
    id: "pr00004",
    name: "ブランドリニューアル",
    client: "GHI工業",
    client_id: "cl00003",
    start_date: "2023-07-01",
    end_date: "2023-09-30",
    status: "active",
  },
  {
    id: "pr00005",
    name: "新規顧客獲得",
    client: "JKLサービス",
    client_id: "cl00004",
    start_date: "2023-08-01",
    end_date: "2023-10-31",
    status: "active",
  },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">プロジェクト一覧</h1>
        <Link href="/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規プロジェクト
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>プロジェクト</CardTitle>
          <CardDescription>登録されているプロジェクトの一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>プロジェクト名</TableHead>
                <TableHead>クライアント</TableHead>
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
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.start_date}</TableCell>
                  <TableCell>{project.end_date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        project.status === "active"
                          ? "bg-green-100 text-green-800"
                          : project.status === "draft"
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "計画中"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {project.status === "active" ? "進行中" : project.status === "draft" ? "準備中" : "計画中"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/projects/${project.id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
