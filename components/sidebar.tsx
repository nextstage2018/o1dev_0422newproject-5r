"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  Layers,
  LayoutGrid,
  Settings,
  Users,
  ImageIcon,
  Megaphone,
  Target,
  CheckSquare,
  Building2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 w-56", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">ダッシュボード</h2>
          <div className="space-y-1">
            <Button variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                ホーム
              </Link>
            </Button>
            <Button
              variant={pathname === "/analytics" ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                分析
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">プロジェクト管理</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/clients" || pathname?.startsWith("/clients/") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/clients">
                <Building2 className="mr-2 h-4 w-4" />
                クライアント
              </Link>
            </Button>
            <Button
              variant={pathname === "/projects" || pathname?.startsWith("/projects/") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/projects">
                <Layers className="mr-2 h-4 w-4" />
                プロジェクト
              </Link>
            </Button>
            <Button
              variant={pathname === "/tasks" || pathname?.startsWith("/tasks/") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/tasks">
                <CheckSquare className="mr-2 h-4 w-4" />
                タスク
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">広告管理</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/campaigns" || pathname?.startsWith("/campaigns/") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/campaigns">
                <Megaphone className="mr-2 h-4 w-4" />
                キャンペーン
              </Link>
            </Button>
            <Button
              variant={pathname === "/adsets" || pathname?.startsWith("/adsets/") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/adsets">
                <Target className="mr-2 h-4 w-4" />
                広告セット
              </Link>
            </Button>
            <Button
              variant={pathname === "/ads" || pathname?.startsWith("/ads/") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/ads">
                <FileText className="mr-2 h-4 w-4" />
                広告
              </Link>
            </Button>
            <Button
              variant={pathname === "/creatives" || pathname?.startsWith("/creatives/") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/creatives">
                <ImageIcon className="mr-2 h-4 w-4" />
                クリエイティブ
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">テスト</h2>
          <div className="space-y-1">
            <Button variant={pathname === "/tests" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/tests">
                <LayoutGrid className="mr-2 h-4 w-4" />
                テスト一覧
              </Link>
            </Button>
            <Button
              variant={pathname === "/tests/creative" ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/tests/creative">
                <ImageIcon className="mr-2 h-4 w-4" />
                クリエイティブテスト
              </Link>
            </Button>
            <Button
              variant={pathname === "/tests/landing" ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/tests/landing">
                <FileText className="mr-2 h-4 w-4" />
                ランディングページテスト
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">管理</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/users" || pathname?.startsWith("/users/") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/users">
                <Users className="mr-2 h-4 w-4" />
                ユーザー
              </Link>
            </Button>
            <Button
              variant={pathname === "/settings" || pathname?.startsWith("/settings/") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                設定
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
