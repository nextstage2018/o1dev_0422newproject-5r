"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useAccountContext } from "@/components/account-context-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TestsPage() {
  const { selectedAccounts, getSelectedAccountsInfo } = useAccountContext()

  // 選択されているアカウント情報を取得
  const selectedAccountsInfo = getSelectedAccountsInfo()
  const currentAccount = selectedAccountsInfo.length > 0 ? selectedAccountsInfo[0] : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">検証設計</h1>
      </div>

      {!currentAccount && (
        <Alert variant="warning" className="mb-4">
          <AlertDescription>
            広告アカウントが選択されていません。ヘッダーから広告アカウントを選択してください。
          </AlertDescription>
        </Alert>
      )}

      {currentAccount && (
        <Alert className="mb-4">
          <AlertDescription>
            現在、<strong>{currentAccount.name}</strong>（{currentAccount.platform}）の検証設定を表示しています。
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">概要</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>クリエイティブ検証設定</CardTitle>
                <CardDescription>広告クリエイティブの検証項目を設定します</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  広告クリエイティブの検証要素（メイン画像、画像比率、レイアウトなど）に関する検証項目を設定します。
                  各項目のON/OFF切り替えや入力値の設定が可能です。
                </p>
                <Button asChild disabled={!currentAccount}>
                  <Link href="/tests/creative">
                    設定を管理
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>遷移先検証設定</CardTitle>
                <CardDescription>広告の遷移先に関する検証項目を設定します</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  広告の遷移先（ランディングページなど）に関する検証項目を設定します。
                  各項目のON/OFF切り替えや入力値の設定が可能です。
                </p>
                <Button asChild disabled={!currentAccount}>
                  <Link href="/tests/landing">
                    設定を管理
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
