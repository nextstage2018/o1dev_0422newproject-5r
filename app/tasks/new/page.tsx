"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, ChevronLeftIcon } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

export default function NewTaskPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dueDate, setDueDate] = useState<Date>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // フォームデータの取得
      const formData = new FormData(e.currentTarget)
      const taskData = {
        title: formData.get("title") as string,
        project: formData.get("project") as string,
        assignee: formData.get("assignee") as string,
        priority: formData.get("priority") as string,
        status: formData.get("status") as string,
        dueDate: dueDate?.toISOString(),
        description: formData.get("description") as string,
      }

      // ここでAPIを呼び出してタスクを作成
      console.log("Creating task:", taskData)

      // 成功メッセージを表示
      toast({
        title: "タスクを作成しました",
        description: `${taskData.title}が正常に作成されました。`,
      })

      // タスク一覧ページにリダイレクト
      setTimeout(() => {
        router.push("/tasks")
      }, 1000)
    } catch (error) {
      console.error("Error creating task:", error)
      toast({
        title: "エラーが発生しました",
        description: "タスクの作成中にエラーが発生しました。もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          戻る
        </Button>
        <h1 className="text-2xl font-bold">新規タスク作成</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>タスク情報</CardTitle>
            <CardDescription>新しいタスクの基本情報を入力してください。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">タスク名 *</Label>
                <Input id="title" name="title" required placeholder="タスク名を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">プロジェクト *</Label>
                <Select name="project" required>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="プロジェクトを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project1">2024年春キャンペーン</SelectItem>
                    <SelectItem value="project2">新商品プロモーション</SelectItem>
                    <SelectItem value="project3">ブランド認知向上</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignee">担当者 *</Label>
                <Select name="assignee" required>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="担当者を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">山田太郎</SelectItem>
                    <SelectItem value="user2">佐藤花子</SelectItem>
                    <SelectItem value="user3">鈴木一郎</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">優先度 *</Label>
                <Select name="priority" required defaultValue="medium">
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="優先度を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">高</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="low">低</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">ステータス *</Label>
                <Select name="status" required defaultValue="todo">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">未着手</SelectItem>
                    <SelectItem value="inProgress">進行中</SelectItem>
                    <SelectItem value="review">レビュー中</SelectItem>
                    <SelectItem value="done">完了</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">期限</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "yyyy年MM月dd日", { locale: ja }) : <span>期限を選択</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea id="description" name="description" placeholder="タスクの説明を入力" rows={4} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "作成中..." : "タスクを作成"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
