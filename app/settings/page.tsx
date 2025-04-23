import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Database, Users, Eye, Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">システム設定</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/settings/display" className="block">
          <Card className="h-full hover:bg-gray-50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <CardTitle>フィールド表示設定</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                各画面に表示するフィールドと入力要件を設定します。フィールドの表示/非表示や必須/任意の設定が可能です。
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/settings/fields" className="block">
          <Card className="h-full hover:bg-gray-50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-600" />
                <CardTitle>フィールド管理</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                データベースのフィールドを管理します。フィールドの追加、編集、削除が可能です。
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/settings/users" className="block">
          <Card className="h-full hover:bg-gray-50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <CardTitle>ユーザー設定</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                システムを利用するユーザーを管理します。ユーザーの追加、編集、権限設定が可能です。
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/settings/system" className="block">
          <Card className="h-full hover:bg-gray-50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-600" />
                <CardTitle>システム設定</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                システム全体の設定を管理します。APIキーの設定、バックアップ設定、通知設定などが可能です。
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
