import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"

// サンプルデータを更新
const clients = [
  {
    id: "cl00001",
    name: "株式会社ABC",
    industry: "小売",
    contact: "田中太郎",
    email: "tanaka@abc.co.jp",
    phone: "03-1234-5678",
    delivery_status: "active",
  },
  {
    id: "cl00002",
    name: "DEF株式会社",
    industry: "IT",
    contact: "鈴木花子",
    email: "suzuki@def.co.jp",
    phone: "03-2345-6789",
    delivery_status: "active",
  },
  {
    id: "cl00003",
    name: "GHI工業",
    industry: "製造",
    contact: "佐藤次郎",
    email: "sato@ghi.co.jp",
    phone: "03-3456-7890",
    delivery_status: "paused",
  },
  {
    id: "cl00004",
    name: "JKLサービス",
    industry: "サービス",
    contact: "山田健太",
    email: "yamada@jkl.co.jp",
    phone: "03-4567-8901",
    delivery_status: "active",
  },
  {
    id: "cl00005",
    name: "MNO商事",
    industry: "商社",
    contact: "伊藤美咲",
    email: "ito@mno.co.jp",
    phone: "03-5678-9012",
    delivery_status: "draft",
  },
]

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">クライアント一覧</h1>
        <Link href="/clients/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規クライアント
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クライアント</CardTitle>
          <CardDescription>登録されているクライアント企業の一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>企業名</TableHead>
                <TableHead>業種</TableHead>
                <TableHead>担当者</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>電話番号</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.id}</TableCell>
                  <TableCell>
                    <Link href={`/clients/${client.id}`} className="text-blue-600 hover:underline">
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell>{client.industry}</TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/clients/${client.id}/edit`}>
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
