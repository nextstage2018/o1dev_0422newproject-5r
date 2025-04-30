"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // ここで実際のパスワードリセットメール送信処理を行います
      // 例: await sendPasswordResetEmail(email)

      // デモ用に遅延を追加
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 送信完了状態に変更
      setIsSubmitted(true)
    } catch (err) {
      console.error("パスワードリセットエラー:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <Image
              src="/abstract-logo.png"
              alt="広告管理ダッシュボード"
              width={64}
              height={64}
              className="h-16 w-auto"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isSubmitted ? "メールを送信しました" : "パスワードをリセット"}
          </CardTitle>
          <CardDescription>
            {isSubmitted
              ? "入力されたメールアドレスにパスワードリセット手順を送信しました"
              : "アカウントに登録されているメールアドレスを入力してください"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                メールに記載されているリンクをクリックして、新しいパスワードを設定してください。
                メールが届かない場合は、迷惑メールフォルダをご確認いただくか、管理者にお問い合わせください。
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  ログインページに戻る
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  autoFocus
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "リセットリンクを送信中..." : "リセットリンクを送信"}
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  ログインページに戻る
                </Link>
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p>
            ご不明な点がある場合は、
            <Link href="/contact" className="underline underline-offset-4 hover:text-primary">
              サポートチーム
            </Link>
            にお問い合わせください。
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
