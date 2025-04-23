"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

interface Field {
  id: string
  name: string
  type: string
  required: boolean
  visible: boolean
  table: string
}

interface FieldSettingsTableProps {
  fields: Field[]
}

export function FieldSettingsTable({ fields: initialFields }: FieldSettingsTableProps) {
  const [fields, setFields] = useState<Field[]>(initialFields)
  const [isEditing, setIsEditing] = useState(false)

  const handleVisibilityChange = (id: string, visible: boolean) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, visible } : field)))
  }

  const handleRequiredChange = (id: string, required: boolean) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, required } : field)))
  }

  const handleNameChange = (id: string, name: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, name } : field)))
  }

  const handleTypeChange = (id: string, type: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, type } : field)))
  }

  const saveChanges = () => {
    // ここでAPIを呼び出して設定を保存
    console.log("保存する設定:", fields)
    setIsEditing(false)
    // 実際の実装では、APIリクエストを送信して設定を保存します
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">フィールド設定</h3>
        <div className="space-x-2">
          {isEditing ? (
            <Button onClick={saveChanges}>
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>編集</Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">表示</TableHead>
            <TableHead className="w-[50px]">必須</TableHead>
            <TableHead>フィールドID</TableHead>
            <TableHead>表示名</TableHead>
            <TableHead>データ型</TableHead>
            <TableHead>テーブル</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id}>
              <TableCell>
                <Checkbox
                  checked={field.visible}
                  onCheckedChange={(checked) => handleVisibilityChange(field.id, checked === true)}
                  disabled={!isEditing}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={field.required}
                  onCheckedChange={(checked) => handleRequiredChange(field.id, checked === true)}
                  disabled={!isEditing}
                />
              </TableCell>
              <TableCell className="font-medium">{field.id}</TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={field.name}
                    onChange={(e) => handleNameChange(field.id, e.target.value)}
                    className="w-full"
                  />
                ) : (
                  field.name
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Select value={field.type} onValueChange={(value) => handleTypeChange(field.id, value)}>
                    <SelectTrigger className="w-[180px]">
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
              <TableCell>{field.table}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
