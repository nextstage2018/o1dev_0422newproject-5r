"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Save, Trash2, Edit, X } from "lucide-react"
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

interface MasterData {
  code: string
  label: string
  is_active: boolean
  created_at: string
  updated_at: string | null
}

interface MasterDataTableProps {
  data: MasterData[]
  tableName: string
}

export function MasterDataTable({ data: initialData, tableName }: MasterDataTableProps) {
  const [data, setData] = useState<MasterData[]>(initialData)
  const [editingItem, setEditingItem] = useState<MasterData | null>(null)
  const [newItem, setNewItem] = useState<Omit<MasterData, "created_at" | "updated_at">>({
    code: "",
    label: "",
    is_active: true,
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleEditItem = (item: MasterData) => {
    setEditingItem({ ...item })
  }

  const handleSaveEdit = () => {
    if (!editingItem) return

    setData(data.map((item) => (item.code === editingItem.code ? editingItem : item)))
    setEditingItem(null)

    // 実際の実装ではAPIを呼び出してマスターデータを更新
    toast({
      title: "マスターデータを更新しました",
      description: `${editingItem.label} (${editingItem.code}) を更新しました`,
    })
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
  }

  const handleAddItem = () => {
    const now = new Date().toISOString()
    const newItemWithTimestamp: MasterData = {
      ...newItem,
      created_at: now,
      updated_at: null,
    }

    setData([...data, newItemWithTimestamp])
    setNewItem({
      code: "",
      label: "",
      is_active: true,
    })
    setIsAddDialogOpen(false)

    // 実際の実装ではAPIを呼び出してマスターデータを追加
    toast({
      title: "マスターデータを追加しました",
      description: `${newItemWithTimestamp.label} (${newItemWithTimestamp.code}) を追加しました`,
    })
  }

  const handleDeleteItem = (code: string) => {
    setData(data.filter((item) => item.code !== code))

    // 実際の実装ではAPIを呼び出してマスターデータを削除
    toast({
      title: "マスターデータを削除しました",
      description: `コード: ${code} のマスターデータを削除しました`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{tableName}</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規追加
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規マスターデータの追加</DialogTitle>
              <DialogDescription>新しいマスターデータの情報を入力してください。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="label" className="text-right">
                  ラベル
                </Label>
                <Input
                  id="label"
                  value={newItem.label}
                  onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">有効</Label>
                <div className="col-span-3">
                  <Checkbox
                    checked={newItem.is_active}
                    onCheckedChange={(checked) => setNewItem({ ...newItem, is_active: checked === true })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={handleAddItem} disabled={!newItem.code || !newItem.label}>
                追加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>コード</TableHead>
            <TableHead>ラベル</TableHead>
            <TableHead className="w-[100px]">有効</TableHead>
            <TableHead>作成日時</TableHead>
            <TableHead>更新日時</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.code}>
              <TableCell className="font-medium">
                {editingItem?.code === item.code ? (
                  <Input
                    value={editingItem.code}
                    onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                    disabled
                  />
                ) : (
                  item.code
                )}
              </TableCell>
              <TableCell>
                {editingItem?.code === item.code ? (
                  <Input
                    value={editingItem.label}
                    onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  />
                ) : (
                  item.label
                )}
              </TableCell>
              <TableCell>
                {editingItem?.code === item.code ? (
                  <Checkbox
                    checked={editingItem.is_active}
                    onCheckedChange={(checked) => setEditingItem({ ...editingItem, is_active: checked === true })}
                  />
                ) : (
                  <Checkbox checked={item.is_active} disabled />
                )}
              </TableCell>
              <TableCell>{new Date(item.created_at).toLocaleString("ja-JP")}</TableCell>
              <TableCell>{item.updated_at ? new Date(item.updated_at).toLocaleString("ja-JP") : "-"}</TableCell>
              <TableCell className="text-right">
                {editingItem?.code === item.code ? (
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
                          <AlertDialogTitle>マスターデータの削除</AlertDialogTitle>
                          <AlertDialogDescription>
                            本当に「{item.label}」({item.code})を削除しますか？この操作は元に戻せません。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>キャンセル</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteItem(item.code)} className="bg-red-600">
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
