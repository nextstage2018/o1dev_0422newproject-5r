"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { forgotPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await forgotPassword(email)
      setIsSubmitted(true)
    } catch (err) {
      setError("パスワードリセットリクエストに失敗しました。メールアドレスを確認してください。")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Alert>
          <AlertDescription>
            パスワードリセットのリンクを{email}に送信しました。メールをご確認ください。
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/login">ログインページに戻る</Link>
          </Button>
        </div>
        <div className="text-sm text-center text-gray-600 mt-4">
          <p>テスト環境では、abc@abc.comのみ有効です。</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">メールアドレス</Label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full"
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              送信中...
            </>
          ) : (
            "パスワードリセットリンクを送信"
          )}
        </Button>
      </div>

      <div className="text-center">
        <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
          ログインページに戻る
        </Link>
      </div>

      <div className="text-sm text-center text-gray-600 mt-4">
        <p>テスト環境では、abc@abc.comのみ有効です。</p>
      </div>
    </form>
  )
}
