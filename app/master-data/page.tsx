"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

// サンプルデータ
const platformsData = [
  { id: "1", name: "Facebook", code: "FB", isActive: true },
  { id: "2", name: "Instagram", code: "IG", isActive: true },
  { id: "3", name: "Twitter", code: "TW", isActive: true },
  { id: "4", name: "Google", code: "GG", isActive: true },
  { id: "5", name: "TikTok", code: "TT", isActive: true },
  { id: "6", name: "LinkedIn", code: "LI", isActive: false },
]

const statusesData = [
  { id: "1", name: "準備中", code: "preparing", color: "blue", isActive: true },
  { id: "2", name: "進行中", code: "in_progress", color: "green", isActive: true },
  { id: "3", name: "完了", code: "completed", color: "gray", isActive: true },
  { id: "4", name: "中止", code: "cancelled", color: "red", isActive: true },
  { id: "5", name: "保留", code: "on_hold", color: "yellow", isActive: true },
]

const categoriesData = [
  { id: "1", name: "認知拡大", code: "awareness", isActive: true },
  { id: "2", name: "集客", code: "traffic", isActive: true },
  { id: "3", name: "コンバージョン", code: "conversion", isActive: true },
  { id: "4", name: "リターゲティング", code: "retargeting", isActive: true },
  { id: "5", name: "ブランディング", code: "branding", isActive: true },
]

interface MasterItem {
  id: string
  name: string
  code: string
  color?: string
  isActive: boolean
}

interface MasterTableProps<T extends MasterItem> {
  items: T[]
  title: string
  description: string
  hasColor?: boolean
}

function MasterTable<T extends MasterItem>({
  items: initialItems,
  title,
  description,
  hasColor = false,
}: MasterTableProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [newItem, setNewItem] = useState<Omit<T, "id">>({ name: "", code: "", isActive: true } as Omit<T, "id">)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleEditItem = (item: T) => {
    setEditingItem({ ...item })
  }

  const handleSaveEdit = () => {
    if (!editingItem) return

    setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)))
    setEditingItem(null)

    toast({
      title: "項目を更新しました",
      description: `${editingItem.name} (${editingItem.code}) を更新しました`,
    })
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
  }

  const handleAddItem = () => {
    // IDを生成（実際の実装ではバックエンドで生成）
    const id = `${Date.now()}`

    const newItemWithId = {
      id,
      ...newItem,
    } as T

    setItems([...items, newItemWithId])
    setNewItem({ name: "", code: "", isActive: true } as Omit<T, "id">)
    setIsAddDialogOpen(false)

    toast({
      title: "項目を追加しました",
      description: `${newItemWithId.name} (${newItemWithId.code}) を追加しました`,
    })
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))

    toast({
      title: "項目を削除しました",
      description: `ID: ${id} の項目を削除しました`,
    })
  }

  const handleToggleActive = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)))

    const item = items.find((item) => item.id === id)
    if (item) {
      toast({
        title: item.isActive ? "項目を無効化しました" : "項目を有効化しました",
        description: `${item.name} (${item.code}) を${item.isActive ? "無効" : "有効"}にしました`,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規追加
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規項目の追加</DialogTitle>
              <DialogDescription>新しい項目の情報を入力してください。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  名前
                </Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  コード
                </Label>
                <Input
                  id="code"
                  value={newItem.code}
                  onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {hasColor && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="color" className="text-right">
                    色
                  </Label>
                  <Input
                    id="color"
                    value={(newItem as any).color || ""}
                    onChange={(e) => setNewItem({ ...newItem, color: e.target.value } as any)}
                    className="col-span-3"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={handleAddItem} disabled={!newItem.name || !newItem.code}>
                追加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名前</TableHead>
            <TableHead>コード</TableHead>
            {hasColor && <TableHead>色</TableHead>}
            <TableHead>ステータス</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {editingItem?.id === item.id ? (
                  <Input
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell>
                {editingItem?.id === item.id ? (
                  <Input
                    value={editingItem.code}
                    onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                  />
                ) : (
                  item.code
                )}
              </TableCell>
              {hasColor && (
                <TableCell>
                  {editingItem?.id === item.id ? (
                    <Input
                      value={(editingItem as any).color || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value } as any)}
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: (item as any).color }}></div>
                  )}
                </TableCell>
              )}
              <TableCell>
                <Button
                  variant={item.isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleActive(item.id)}
                >
                  {item.isActive ? "有効" : "無効"}
                </Button>
              </TableCell>
              <TableCell className="text-right">
                {editingItem?.id === item.id ? (
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
                    <Button variant="outline" size="icon" onClick={() => handleEditItem(item)}>
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
                          <AlertDialogTitle>項目の削除</AlertDialogTitle>
                          <AlertDialogDescription>
                            本当に「{item.name}」を削除しますか？この操作は元に戻せません。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>キャンセル</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteItem(item.id)} className="bg-red-600">
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
    </div>
  )
}

export default function MasterDataPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">マスタデータ</h1>
      </div>

      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="platforms">プラットフォーム</TabsTrigger>
          <TabsTrigger value="statuses">ステータス</TabsTrigger>
          <TabsTrigger value="categories">カテゴリ</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>プラットフォーム管理</CardTitle>
              <CardDescription>広告プラットフォームの管理を行います</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterTable
                items={platformsData}
                title="プラットフォーム一覧"
                description="広告配信に使用するプラットフォームの一覧です"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statuses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ステータス管理</CardTitle>
              <CardDescription>プロジェクトや広告のステータスの管理を行います</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterTable
                items={statusesData}
                title="ステータス一覧"
                description="プロジェクトや広告に設定できるステータスの一覧です"
                hasColor={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>カテゴリ管理</CardTitle>
              <CardDescription>広告カテゴリの管理を行います</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterTable
                items={categoriesData}
                title="カテゴリ一覧"
                description="広告に設定できるカテゴリの一覧です"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
