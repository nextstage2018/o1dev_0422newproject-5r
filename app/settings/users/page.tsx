"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
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

// サンプルデータ - 実際の実装ではAPIから取得
const initialUsers = [
  {
    id: "us00001",
    name: "山田太郎",
    email: "yamada@example.com",
    role: "admin",
    department: "マーケティング部",
    created_at: "2023-01-15",
  },
  {
    id: "us00002",
    name: "佐藤花子",
    email: "sato@example.com",
    role: "operator",
    department: "営業部",
    created_at: "2023-02-20",
  },
  {
    id: "us00003",
    name: "鈴木一郎",
    email: "suzuki@example.com",
    role: "viewer",
    department: "経営企画部",
    created_at: "2023-03-10",
  },
]

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  created_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState<Omit<User, "id" | "created_at">>({
    name: "",
    email: "",
    role: "viewer",
    department: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user })
  }

  const handleSaveEdit = () => {
    if (!editingUser) return

    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)))
    setEditingUser(null)

    // 実際の実装ではAPIを呼び出してユーザーを更新
    toast({
      title: "ユーザーを更新しました",
      description: `${editingUser.name} (${editingUser.email}) を更新しました`,
    })
  }

  const handleCancelEdit = () => {
    setEditingUser(null)
  }

  const handleAddUser = () => {
    // IDを生成（実際の実装ではバックエンドで生成）
    const id = `user${Date.now()}`
    const created_at = new Date().toISOString().split("T")[0]

    const newUserWithId: User = {
      id,
      ...newUser,
      created_at,
    }

    setUsers([...users, newUserWithId])
    setNewUser({
      name: "",
      email: "",
      role: "viewer",
      department: "",
    })
    setIsAddDialogOpen(false)

    // 実際の実装ではAPIを呼び出してユーザーを追加
    toast({
      title: "ユーザーを追加しました",
      description: `${newUserWithId.name} (${newUserWithId.email}) を追加しました`,
    })
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))

    // 実際の実装ではAPIを呼び出してユーザーを削除
    toast({
      title: "ユーザーを削除しました",
      description: `ID: ${id} のユーザーを削除しました`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/settings">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">ユーザー設定</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規ユーザー
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規ユーザーの追加</DialogTitle>
              <DialogDescription>新しいユーザーの情報を入力してください。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  名前
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  メールアドレス
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  権限
                </Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger id="role" className="col-span-3">
                    <SelectValue placeholder="権限を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">管理者</SelectItem>
                    <SelectItem value="operator">運用者</SelectItem>
                    <SelectItem value="viewer">閲覧者</SelectItem>
                    <SelectItem value="client">クライアント</SelectItem>
                    <SelectItem value="system">システム</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  部署
                </Label>
                <Input
                  id="department"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={handleAddUser} disabled={!newUser.name || !newUser.email}>
                追加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ユーザー一覧</CardTitle>
          <CardDescription>システムを利用するユーザーを管理します</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>権限</TableHead>
                <TableHead>部署</TableHead>
                <TableHead>登録日</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {editingUser?.id === user.id ? (
                      <Input
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser?.id === user.id ? (
                      <Input
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser?.id === user.id ? (
                      <Select
                        value={editingUser.role}
                        onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="権限を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">管理者</SelectItem>
                          <SelectItem value="operator">運用者</SelectItem>
                          <SelectItem value="viewer">閲覧者</SelectItem>
                          <SelectItem value="client">クライアント</SelectItem>
                          <SelectItem value="system">システム</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-800"
                            : user.role === "operator"
                              ? "bg-green-100 text-green-800"
                              : user.role === "client"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "system"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role === "admin"
                          ? "管理者"
                          : user.role === "operator"
                            ? "運用者"
                            : user.role === "viewer"
                              ? "閲覧者"
                              : user.role === "client"
                                ? "クライアント"
                                : "システム"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser?.id === user.id ? (
                      <Input
                        value={editingUser.department}
                        onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                      />
                    ) : (
                      user.department
                    )}
                  </TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell className="text-right">
                    {editingUser?.id === user.id ? (
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" onClick={handleCancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="icon" onClick={handleSaveEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon" className="text-red-500">
                              <Trash2 className="h-4 w-4" />
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
                              <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-red-600">
                                削除
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
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
