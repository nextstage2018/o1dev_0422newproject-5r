"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

// ユーザータイプの定義
export type UserType = "internal" | "external" | "client"

// ユーザー情報の型定義
export interface User {
  id: string
  name: string
  email: string
  type: UserType
}

// 認証コンテキストの型定義
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}

// 認証コンテキストの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 固定のログイン情報
const FIXED_EMAIL = "abc@abc.com"
const FIXED_PASSWORD = "1234"

// 認証プロバイダーコンポーネント
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // 初期化時に認証状態を確認
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ローカルストレージからユーザー情報を取得
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("認証状態の確認に失敗しました:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // 認証状態に基づいてリダイレクト
  useEffect(() => {
    if (!isLoading) {
      const authRoutes = ["/login", "/forgot-password", "/reset-password"]
      const isAuthRoute = authRoutes.some((route) => pathname?.startsWith(route))

      if (!user && !isAuthRoute && pathname !== "/") {
        // 未認証かつ認証が必要なルートの場合、ログインページにリダイレクト
        router.push("/login")
      } else if (user && isAuthRoute) {
        // 認証済みかつ認証ルートの場合、ダッシュボードにリダイレクト
        router.push("/")
      }
    }
  }, [user, isLoading, pathname, router])

  // ログイン処理
  const login = async (email: string, password: string, remember = false) => {
    setIsLoading(true)
    try {
      // 固定のログイン情報と比較
      if (email !== FIXED_EMAIL || password !== FIXED_PASSWORD) {
        throw new Error("メールアドレスまたはパスワードが正しくありません。")
      }

      // デモ用のモックユーザー
      const mockUser: User = {
        id: "1",
        name: "テストユーザー",
        email,
        type: "internal",
      }

      // ユーザー情報を保存
      setUser(mockUser)
      if (remember) {
        localStorage.setItem("user", JSON.stringify(mockUser))
      } else {
        sessionStorage.setItem("user", JSON.stringify(mockUser))
      }

      // ダッシュボードにリダイレクト
      router.push("/")
    } catch (error) {
      console.error("ログインに失敗しました:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // ログアウト処理
  const logout = async () => {
    setIsLoading(true)
    try {
      // ユーザー情報をクリア
      setUser(null)
      localStorage.removeItem("user")
      sessionStorage.removeItem("user")

      // ログインページにリダイレクト
      router.push("/login")
    } catch (error) {
      console.error("ログアウトに失敗しました:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // パスワードリセットリクエスト
  const forgotPassword = async (email: string) => {
    try {
      // テスト環境では、固定のメールアドレスのみ許可
      if (email !== FIXED_EMAIL) {
        throw new Error("登録されていないメールアドレスです。")
      }

      // デモ用に成功を返す
      return Promise.resolve()
    } catch (error) {
      console.error("パスワードリセットリクエストに失敗しました:", error)
      throw error
    }
  }

  // パスワードリセット
  const resetPassword = async (token: string, password: string) => {
    try {
      // テスト環境では常に成功
      return Promise.resolve()
    } catch (error) {
      console.error("パスワードリセットに失敗しました:", error)
      throw error
    }
  }

  // コンテキスト値
  const value = {
    user,
    isLoading,
    login,
    logout,
    forgotPassword,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 認証コンテキストを使用するためのフック
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
