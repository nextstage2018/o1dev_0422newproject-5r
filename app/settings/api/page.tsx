"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, RefreshCw, Trash2, Copy, Eye, EyeOff } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
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

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string | null
  status: "active" | "expired" | "revoked"
}

export default function ApiSettingsPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "key1",
      name: "開発環境用API",
      key: "sk_dev_a1b2c3d4e5f6g7h8i9j0",
      createdAt: "2023-04-15",
      lastUsed: "2023-05-10",
      status: "active",
    },
    {
      id: "key2",
      name: "本番環境用API",
      key: "sk_prod_z9y8x7w6v5u4t3s2r1q0",
      createdAt: "2023-03-20",
      lastUsed: "2023-05-15",
      status: "active",
    },
    {
      id: "key3",
      name: "テスト用API",
      key: "sk_test_p0o9i8u7y6t5r4e3w2q1",
      createdAt: "2023-01-10",
      lastUsed: null,
      status: "revoked",
    },
  ])

  const [newKeyName, setNewKeyName] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const toggleKeyVisibility = (id: string) => {
    setShowKeys({
      ...showKeys,
      [id]: !showKeys[id],
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "APIキーをコピーしました",
      description: "クリップボードにAPIキーがコピーされました",
    })
  }

  const createNewKey = () => {
    if (!newKeyName) return

    // 実際の実装ではAPIを呼び出して新しいキーを生成
    const newKey: ApiKey = {
      id: `key${Date.now()}`,
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: null,
      status: "active",
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setIsAddDialogOpen(false)

    toast({
      title: "新しいAPIキーを作成しました",
      description: "新しいAPIキーが正常に作成されました",
    })
  }

  const revokeKey = (id: string) => {
    // 実際の実装ではAPIを呼び出してキーを無効化
    setApiKeys(apiKeys.map((key) => (key.id === id ? { ...key, status: "revoked" as const } : key)))

    toast({
      title: "APIキーを無効化しました",
      description: "APIキーが正常に無効化されました",
    })
  }

  const formatKey = (key: string) => {
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`
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
          <h1 className="text-2xl font-bold tracking-tight">API設定</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規APIキー
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規APIキーの作成</DialogTitle>
              <DialogDescription>
                新しいAPIキーの名前を入力してください。キーは作成後に一度だけ表示されます。
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="key-name" className="text-right">
                  キー名
                </Label>
                <Input
                  id="key-name"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="開発環境用API"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={createNewKey} disabled={!newKeyName}>
                作成
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>APIキー管理</CardTitle>
          <CardDescription>APIキーの作成、表示、無効化を行います</CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border rounded-md">
              APIキーがありません。「新規APIキー」ボタンをクリックして作成してください。
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名前</TableHead>
                  <TableHead>キー</TableHead>
                  <TableHead>作成日</TableHead>
                  <TableHead>最終使用日</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {showKeys[apiKey.id] ? apiKey.key : formatKey(apiKey.key)}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          disabled={apiKey.status !== "active"}
                        >
                          {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(apiKey.key)}
                          disabled={apiKey.status !== "active"}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{apiKey.createdAt}</TableCell>
                    <TableCell>{apiKey.lastUsed || "未使用"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          apiKey.status === "active"
                            ? "default"
                            : apiKey.status === "expired"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {apiKey.status === "active" ? "有効" : apiKey.status === "expired" ? "期限切れ" : "無効"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(apiKey.key)}
                          disabled={apiKey.status !== "active"}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-500"
                              disabled={apiKey.status !== "active"}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>APIキーの無効化</AlertDialogTitle>
                              <AlertDialogDescription>
                                本当に「{apiKey.name}」を無効化しますか？この操作は元に戻せません。
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>キャンセル</AlertDialogCancel>
                              <AlertDialogAction onClick={() => revokeKey(apiKey.id)} className="bg-red-600">
                                無効化
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API使用状況</CardTitle>
          <CardDescription>APIの使用状況と制限を確認します</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <div className="text-sm text-gray-500">今月のリクエスト数</div>
                <div className="text-2xl font-bold">12,345</div>
                <div className="text-sm text-gray-500">制限: 50,000</div>
              </div>

              <div className="border rounded-md p-4">
                <div className="text-sm text-gray-500">平均レスポンス時間</div>
                <div className="text-2xl font-bold">245ms</div>
                <div className="text-sm text-gray-500">過去30日間</div>
              </div>

              <div className="border rounded-md p-4">
                <div className="text-sm text-gray-500">エラー率</div>
                <div className="text-2xl font-bold">0.5%</div>
                <div className="text-sm text-gray-500">過去30日間</div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                更新
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
