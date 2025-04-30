"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // パスワード一致チェック
    if (password !== confirmPassword) {
      setError("パスワードが一致しません。")
      return
    }

    // パスワード強度チェック
    if (password.length < 8) {
      setError("パスワードは8文字以上である必要があります。")
      return
    }

    setIsLoading(true)

    try {
      // ここで実際のパスワードリセット処理を行います
      // 例: await resetPassword(token, password)

      // デモ用に遅延を追加
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 成功状態に変更
      setIsSuccess(true)
    } catch (err) {
      console.error("パスワードリセットエラー:", err)
      setError("パスワードのリセットに失敗しました。リンクが無効か期限切れの可能性があります。")
    } finally {
      setIsLoading(false)
    }
  }

  // トークンがない場合はエラーを表示
  if (!token && !isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">無効なリクエスト</CardTitle>
            <CardDescription>パスワードリセットリンクが無効です。</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                有効なパスワードリセットリンクが必要です。パスワードリセットを再度リクエストしてください。
              </AlertDescription>
            </Alert>
            <Button asChild className="mt-4 w-full">
              <Link href="/forgot-password">パスワードリセットを再リクエスト</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
            {isSuccess ? "パスワードを変更しました" : "新しいパスワードを設定"}
          </CardTitle>
          <CardDescription>
            {isSuccess ? "新しいパスワードでログインできるようになりました" : "安全なパスワードを入力してください"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                パスワードが正常に変更されました。新しいパスワードでログインしてください。
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/login">ログインページに進む</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="password">新しいパスワード</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="pr-10"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  パスワードは8文字以上で、英字、数字、記号を含めることをお勧めします。
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">パスワードの確認</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="pr-10"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "パスワードを変更中..." : "パスワードを変更"}
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
