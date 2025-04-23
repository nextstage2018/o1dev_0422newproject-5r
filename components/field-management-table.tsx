"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface Field {
  id: string
  name: string
  type: string
  required: boolean
  visible: boolean
  table: string
}

interface FieldManagementTableProps {
  fields: Field[]
  tableName: string
}

export function FieldManagementTable({ fields: initialFields, tableName }: FieldManagementTableProps) {
  const [fields, setFields] = useState<Field[]>(initialFields)
  const [editingField, setEditingField] = useState<Field | null>(null)
  const [newField, setNewField] = useState<Omit<Field, "id">>({
    name: "",
    type: "string",
    required: false,
    visible: true,
    table: tableName,
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleEditField = (field: Field) => {
    setEditingField({ ...field })
  }

  const handleSaveEdit = () => {
    if (!editingField) return

    setFields(fields.map((field) => (field.id === editingField.id ? editingField : field)))
    setEditingField(null)

    // 実際の実装ではAPIを呼び出してフィールドを更新
    toast({
      title: "フィールドを更新しました",
      description: `${editingField.name} (${editingField.id}) を更新しました`,
    })
  }

  const handleCancelEdit = () => {
    setEditingField(null)
  }

  const handleAddField = () => {
    // IDを生成（実際の実装ではバックエンドで生成）
    const id = `${tableName.split("_")[1]}_${Date.now()}`

    const newFieldWithId: Field = {
      id,
      ...newField,
    }

    setFields([...fields, newFieldWithId])
    setNewField({
      name: "",
      type: "string",
      required: false,
      visible: true,
      table: tableName,
    })
    setIsAddDialogOpen(false)

    // 実際の実装ではAPIを呼び出してフィールドを追加
    toast({
      title: "フィールドを追加しました",
      description: `${newFieldWithId.name} (${newFieldWithId.id}) を追加しました`,
    })
  }

  const handleDeleteField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))

    // 実際の実装ではAPIを呼び出してフィールドを削除
    toast({
      title: "フィールドを削除しました",
      description: `ID: ${id} のフィールドを削除しました`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">フィールド一覧</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規フィールド
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規フィールドの追加</DialogTitle>
              <DialogDescription>新しいフィールドの情報を入力してください。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  フィールド名
                </Label>
                <Input
                  id="name"
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  データ型
                </Label>
                <Select value={newField.type} onValueChange={(value) => setNewField({ ...newField, type: value })}>
                  <SelectTrigger id="type" className="col-span-3">
                    <SelectValue placeholder="データ型を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="string">文字列</SelectItem>
                    <SelectItem value="integer">整数</SelectItem>
                    <SelectItem value="float">小数</SelectItem>
                    <SelectItem value="boolean">真偽値</SelectItem>
                    <SelectItem value="date">日付</SelectItem>
                    <SelectItem value="timestamp">タイムスタンプ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">必須</Label>
                <div className="col-span-3">
                  <Checkbox
                    checked={newField.required}
                    onCheckedChange={(checked) => setNewField({ ...newField, required: checked === true })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">表示</Label>
                <div className="col-span-3">
                  <Checkbox
                    checked={newField.visible}
                    onCheckedChange={(checked) => setNewField({ ...newField, visible: checked === true })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={handleAddField} disabled={!newField.name}>
                追加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>フィールドID</TableHead>
            <TableHead>表示名</TableHead>
            <TableHead>データ型</TableHead>
            <TableHead className="w-[100px]">必須</TableHead>
            <TableHead className="w-[100px]">表示</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id}>
              <TableCell className="font-medium">
                {editingField?.id === field.id ? (
                  <Input
                    value={editingField.id}
                    onChange={(e) => setEditingField({ ...editingField, id: e.target.value })}
                    disabled
                  />
                ) : (
                  field.id
                )}
              </TableCell>
              <TableCell>
                {editingField?.id === field.id ? (
                  <Input
                    value={editingField.name}
                    onChange={(e) => setEditingField({ ...editingField, name: e.target.value })}
                  />
                ) : (
                  field.name
                )}
              </TableCell>
              <TableCell>
                {editingField?.id === field.id ? (
                  <Select
                    value={editingField.type}
                    onValueChange={(value) => setEditingField({ ...editingField, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="データ型を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="string">文字列</SelectItem>
                      <SelectItem value="integer">整数</SelectItem>
                      <SelectItem value="float">小数</SelectItem>
                      <SelectItem value="boolean">真偽値</SelectItem>
                      <SelectItem value="date">日付</SelectItem>
                      <SelectItem value="timestamp">タイムスタンプ</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  field.type
                )}
              </TableCell>
              <TableCell>
                {editingField?.id === field.id ? (
                  <Checkbox
                    checked={editingField.required}
                    onCheckedChange={(checked) => setEditingField({ ...editingField, required: checked === true })}
                  />
                ) : (
                  <Checkbox checked={field.required} disabled />
                )}
              </TableCell>
              <TableCell>
                {editingField?.id === field.id ? (
                  <Checkbox
                    checked={editingField.visible}
                    onCheckedChange={(checked) => setEditingField({ ...editingField, visible: checked === true })}
                  />
                ) : (
                  <Checkbox checked={field.visible} disabled />
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingField?.id === field.id ? (
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
                    <Button variant="outline" size="icon" onClick={() => handleEditField(field)}>
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
                          <AlertDialogTitle>フィールドの削除</AlertDialogTitle>
                          <AlertDialogDescription>
                            本当に「{field.name}」フィールドを削除しますか？この操作は元に戻せません。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>キャンセル</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteField(field.id)} className="bg-red-600">
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
