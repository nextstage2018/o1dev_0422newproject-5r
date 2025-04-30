"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { UserPermission, UserRole, UserType, Account } from "@/types/user"

interface UserPermissionsTableProps {
  permissions: UserPermission[]
  accounts: Account[]
  userType: UserType
  onUpdate?: (permissions: UserPermission[]) => void
}

export function UserPermissionsTable({ permissions, accounts, userType, onUpdate }: UserPermissionsTableProps) {
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>(permissions)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState<UserPermission | null>(null)
  const [selectedAccountId, setSelectedAccountId] = useState("")
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([])

  // 利用可能なアカウント（すでに権限が付与されているものを除く）
  const availableAccounts = accounts.filter((account) => !userPermissions.some((p) => p.accountId === account.id))

  // ユーザータイプに基づいて利用可能な権限を取得
  const getAvailableRoles = (type: UserType): { value: UserRole; label: string }[] => {
    switch (type) {
      case "internal":
        return [
          { value: "admin", label: "管理者" },
          { value: "project_manager", label: "案件担当者" },
        ]
      case "external":
        return [
          { value: "ad_operator", label: "広告運用者" },
          { value: "sales_rep", label: "営業担当者" },
        ]
      case "client":
        return [{ value: "client", label: "担当者" }]
    }
  }

  // 権限の表示名を取得
  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "管理者"
      case "project_manager":
        return "案件担当者"
      case "ad_operator":
        return "広告運用者"
      case "sales_rep":
        return "営業担当者"
      case "client":
        return "担当者"
      default:
        return role
    }
  }

  // 権限追加ダイアログを開く
  const openAddDialog = () => {
    setSelectedAccountId("")
    setSelectedRoles([])
    setIsAddDialogOpen(true)
  }

  // 権限編集ダイアログを開く
  const openEditDialog = (permission: UserPermission) => {
    setSelectedPermission(permission)
    setSelectedAccountId(permission.accountId)
    setSelectedRoles([...permission.roles])
    setIsEditDialogOpen(true)
  }

  // 権限を追加
  const handleAddPermission = () => {
    if (!selectedAccountId || selectedRoles.length === 0) return

    const newPermission: UserPermission = {
      accountId: selectedAccountId,
      roles: selectedRoles,
    }

    const updatedPermissions = [...userPermissions, newPermission]
    setUserPermissions(updatedPermissions)
    setIsAddDialogOpen(false)

    // 親コンポーネントに更新を通知
    if (onUpdate) {
      onUpdate(updatedPermissions)
    }

    toast({
      title: "権限を追加しました",
      description: `アカウントに新しい権限を追加しました`,
    })
  }

  // 権限を更新
  const handleUpdatePermission = () => {
    if (!selectedPermission || !selectedAccountId || selectedRoles.length === 0) return

    const updatedPermissions = userPermissions.map((p) =>
      p.accountId === selectedPermission.accountId ? { ...p, roles: selectedRoles } : p,
    )

    setUserPermissions(updatedPermissions)
    setIsEditDialogOpen(false)

    // 親コンポーネントに更新を通知
    if (onUpdate) {
      onUpdate(updatedPermissions)
    }

    toast({
      title: "権限を更新しました",
      description: `アカウントの権限を更新しました`,
    })
  }

  // 権限を削除
  const handleDeletePermission = (accountId: string) => {
    const updatedPermissions = userPermissions.filter((p) => p.accountId !== accountId)
    setUserPermissions(updatedPermissions)

    // 親コンポーネントに更新を通知
    if (onUpdate) {
      onUpdate(updatedPermissions)
    }

    toast({
      title: "権限を削除しました",
      description: `アカウントの権限を削除しました`,
    })
  }

  // 権限の選択状態を切り替え
  const toggleRole = (role: UserRole) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      // ユーザータイプに応じて最大選択数を制限
      if (userType === "client" && selectedRoles.length >= 1) {
        // クライアントは1つだけ
        setSelectedRoles([role])
      } else if ((userType === "internal" || userType === "external") && selectedRoles.length >= 2) {
        // 社内/外部メンバーは最大2つまで
        setSelectedRoles([...selectedRoles.slice(1), role])
      } else {
        setSelectedRoles([...selectedRoles, role])
      }
    }
  }

  // アカウント名を取得
  const getAccountName = (accountId: string): string => {
    const account = accounts.find((a) => a.id === accountId)
    return account ? account.name : accountId
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">アカウント権限</h3>
        <Button onClick={openAddDialog} disabled={availableAccounts.length === 0}>
          <Plus className="mr-2 h-4 w-4" />
          権限を追加
        </Button>
      </div>

      {userPermissions.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border rounded-md">このユーザーには権限が設定されていません</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>広告アカウント</TableHead>
              <TableHead>クライアント</TableHead>
              <TableHead>プラットフォーム</TableHead>
              <TableHead>権限</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPermissions.map((permission) => {
              const account = accounts.find((a) => a.id === permission.accountId)
              return (
                <TableRow key={permission.accountId}>
                  <TableCell className="font-medium">{getAccountName(permission.accountId)}</TableCell>
                  <TableCell>{account?.clientName || "-"}</TableCell>
                  <TableCell>{account?.platform || "-"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {permission.roles.map((role) => (
                        <Badge key={role} variant="outline">
                          {getRoleName(role)}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(permission)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleDeletePermission(permission.accountId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}

      {/* 権限追加ダイアログ */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>権限の追加</DialogTitle>
            <DialogDescription>ユーザーに新しい広告アカウントの権限を追加します</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="account-select">広告アカウント</Label>
              <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                <SelectTrigger id="account-select">
                  <SelectValue placeholder="広告アカウントを選択" />
                </SelectTrigger>
                <SelectContent>
                  {availableAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} ({account.clientName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>権限 {userType !== "client" && "(最大2つまで選択可能)"}</Label>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableRoles(userType).map((role) => (
                  <div key={role.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role.value}`}
                      checked={selectedRoles.includes(role.value)}
                      onCheckedChange={() => toggleRole(role.value)}
                    />
                    <Label htmlFor={`role-${role.value}`} className="cursor-pointer">
                      {role.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleAddPermission} disabled={!selectedAccountId || selectedRoles.length === 0}>
              追加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 権限編集ダイアログ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>権限の編集</DialogTitle>
            <DialogDescription>{getAccountName(selectedAccountId)}の権限を編集します</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>権限 {userType !== "client" && "(最大2つまで選択可能)"}</Label>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableRoles(userType).map((role) => (
                  <div key={role.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-role-${role.value}`}
                      checked={selectedRoles.includes(role.value)}
                      onCheckedChange={() => toggleRole(role.value)}
                    />
                    <Label htmlFor={`edit-role-${role.value}`} className="cursor-pointer">
                      {role.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleUpdatePermission} disabled={selectedRoles.length === 0}>
              更新
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
