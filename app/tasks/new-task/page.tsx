"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { toast } from "@/components/ui/use-toast"

export default function NewTaskPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project_id")
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
        project_id: formData.get("project_id") as string,
        assigned_to: formData.get("assigned_to") as string,
        priority: formData.get("priority") as string,
        status: formData.get("status") as string,
        due_date: dueDate?.toISOString(),
        description: formData.get("description") as string,
      }

      // ここでAPIを呼び出してタスクを作成
      console.log("Creating task:", taskData)

      // 成功メッセージを表示
      toast({
        title: "タスクを作成しました",
        description: `${taskData.title}が正常に作成されました。`,
      })

      // タスク一覧ページまたはプロジェクト詳細ページにリダイレクト
      setTimeout(() => {
        if (projectId) {
          router.push(`/projects/${projectId}`)
        } else {
          router.push("/tasks")
        }
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
        <Link href={projectId ? `/projects/${projectId}` : "/tasks"}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            戻る
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">新規タスク作成</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>タスク情報</CardTitle>
          <CardDescription>新しいタスクの基本情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="task-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">タスク名 *</Label>
                <Input id="title" name="title" required placeholder="タスク名を入力" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_id">プロジェクト *</Label>
                <Select name="project_id" required defaultValue={projectId || ""}>
                  <SelectTrigger id="project_id">
                    <SelectValue placeholder="プロジェクトを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pr00001">株式会社ABC 夏季プロモーション</SelectItem>
                    <SelectItem value="pr00002">DEF株式会社 年末プロモーション</SelectItem>
                    <SelectItem value="pr00003">GHI工業 ブランディング</SelectItem>
                    <SelectItem value="pr00004">JKLサービス 顧客獲得</SelectItem>
                    <SelectItem value="pr00005">MNO商事 認知拡大</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assigned_to">担当者 *</Label>
                <Select name="assigned_to" required>
                  <SelectTrigger id="assigned_to">
                    <SelectValue placeholder="担当者を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user001">山田太郎</SelectItem>
                    <SelectItem value="user002">佐藤花子</SelectItem>
                    <SelectItem value="user003">鈴木一郎</SelectItem>
                    <SelectItem value="user004">田中美咲</SelectItem>
                    <SelectItem value="user005">高橋健太</SelectItem>
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
                <Select name="status" required defaultValue="not_started">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_started">未着手</SelectItem>
                    <SelectItem value="in_progress">進行中</SelectItem>
                    <SelectItem value="review">レビュー中</SelectItem>
                    <SelectItem value="completed">完了</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>期限日</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" type="button">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "yyyy年MM月dd日", { locale: ja }) : <span>期限日を選択</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">タスク説明</Label>
              <Textarea id="description" name="description" placeholder="タスクの説明を入力" rows={4} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push(projectId ? `/projects/${projectId}` : "/tasks")}
          >
            キャンセル
          </Button>
          <Button type="submit" form="task-form" disabled={isSubmitting}>
            {isSubmitting ? "作成中..." : "タスクを作成"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
