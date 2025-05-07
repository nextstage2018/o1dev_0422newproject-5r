"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldSettingsTable } from "@/components/field-settings-table"
import { FieldManagementTable } from "@/components/field-management-table"
import { toast } from "@/components/ui/use-toast"
import { Save, Database, Shield, Bell, Layout, Users, SettingsIcon } from "lucide-react"

// サンプルデータ
const sampleFields = [
  {
    id: "client_name",
    name: "クライアント名",
    type: "string",
    required: true,
    visible: true,
    table: "clients",
  },
  {
    id: "client_id",
    name: "クライアントID",
    type: "string",
    required: true,
    visible: true,
    table: "clients",
  },
  {
    id: "contact_person",
    name: "担当者名",
    type: "string",
    required: false,
    visible: true,
    table: "clients",
  },
  {
    id: "email",
    name: "メールアドレス",
    type: "string",
    required: false,
    visible: true,
    table: "clients",
  },
  {
    id: "phone",
    name: "電話番号",
    type: "string",
    required: false,
    visible: true,
    table: "clients",
  },
]

const projectFields = [
  {
    id: "project_name",
    name: "プロジェクト名",
    type: "string",
    required: true,
    visible: true,
    table: "projects",
  },
  {
    id: "project_id",
    name: "プロジェクトID",
    type: "string",
    required: true,
    visible: true,
    table: "projects",
  },
  {
    id: "client_id",
    name: "クライアントID",
    type: "string",
    required: true,
    visible: true,
    table: "projects",
  },
  {
    id: "start_date",
    name: "開始日",
    type: "date",
    required: false,
    visible: true,
    table: "projects",
  },
  {
    id: "end_date",
    name: "終了日",
    type: "date",
    required: false,
    visible: true,
    table: "projects",
  },
  {
    id: "budget",
    name: "予算",
    type: "float",
    required: false,
    visible: true,
    table: "projects",
  },
]

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "株式会社サンプル",
    timezone: "Asia/Tokyo",
    language: "ja",
    currency: "JPY",
    darkMode: false,
    emailNotifications: true,
    slackNotifications: false,
    slackWebhook: "",
  })

  const handleGeneralSettingsChange = (key: string, value: any) => {
    setGeneralSettings({
      ...generalSettings,
      [key]: value,
    })
  }

  const saveGeneralSettings = () => {
    // 実際の実装ではAPIを呼び出して設定を保存
    console.log("保存する一般設定:", generalSettings)
    toast({
      title: "設定を保存しました",
      description: "一般設定が正常に保存されました",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">設定</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <SettingsIcon className="mr-2 h-4 w-4" />
            一般
          </TabsTrigger>
          <TabsTrigger value="fields">
            <Database className="mr-2 h-4 w-4" />
            フィールド
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Shield className="mr-2 h-4 w-4" />
            権限
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            通知
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Layout className="mr-2 h-4 w-4" />
            外観
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            ユーザー
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>一般設定</CardTitle>
              <CardDescription>アプリケーションの基本設定を管理します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">会社名</Label>
                  <Input
                    id="company-name"
                    value={generalSettings.companyName}
                    onChange={(e) => handleGeneralSettingsChange("companyName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">タイムゾーン</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => handleGeneralSettingsChange("timezone", value)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="タイムゾーンを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Tokyo">東京 (GMT+9)</SelectItem>
                      <SelectItem value="America/New_York">ニューヨーク (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">ロンドン (GMT+0)</SelectItem>
                      <SelectItem value="Europe/Paris">パリ (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">言語</Label>
                  <Select
                    value={generalSettings.language}
                    onValueChange={(value) => handleGeneralSettingsChange("language", value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="言語を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ko">한국어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">通貨</Label>
                  <Select
                    value={generalSettings.currency}
                    onValueChange={(value) => handleGeneralSettingsChange("currency", value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="通貨を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JPY">日本円 (¥)</SelectItem>
                      <SelectItem value="USD">米ドル ($)</SelectItem>
                      <SelectItem value="EUR">ユーロ (€)</SelectItem>
                      <SelectItem value="GBP">英ポンド (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="dark-mode"
                    checked={generalSettings.darkMode}
                    onCheckedChange={(checked) => handleGeneralSettingsChange("darkMode", checked)}
                  />
                  <Label htmlFor="dark-mode">ダークモード</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveGeneralSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  保存
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fields" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>フィールド設定</CardTitle>
              <CardDescription>データフィールドの表示と必須設定を管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="clients" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="clients">クライアント</TabsTrigger>
                  <TabsTrigger value="projects">プロジェクト</TabsTrigger>
                  <TabsTrigger value="campaigns">キャンペーン</TabsTrigger>
                  <TabsTrigger value="adsets">広告セット</TabsTrigger>
                  <TabsTrigger value="ads">広告</TabsTrigger>
                </TabsList>

                <TabsContent value="clients">
                  <FieldSettingsTable fields={sampleFields} />
                </TabsContent>

                <TabsContent value="projects">
                  <FieldSettingsTable fields={projectFields} />
                </TabsContent>

                <TabsContent value="campaigns">
                  <div className="text-center py-8 text-gray-500">
                    キャンペーンのフィールド設定はまだ実装されていません
                  </div>
                </TabsContent>

                <TabsContent value="adsets">
                  <div className="text-center py-8 text-gray-500">
                    広告セットのフィールド設定はまだ実装されていません
                  </div>
                </TabsContent>

                <TabsContent value="ads">
                  <div className="text-center py-8 text-gray-500">広告のフィールド設定はまだ実装されていません</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>フィールド管理</CardTitle>
              <CardDescription>カスタムフィールドの追加と管理を行います</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="clients" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="clients">クライアント</TabsTrigger>
                  <TabsTrigger value="projects">プロジェクト</TabsTrigger>
                  <TabsTrigger value="campaigns">キャンペーン</TabsTrigger>
                </TabsList>

                <TabsContent value="clients">
                  <FieldManagementTable fields={sampleFields} tableName="clients" />
                </TabsContent>

                <TabsContent value="projects">
                  <FieldManagementTable fields={projectFields} tableName="projects" />
                </TabsContent>

                <TabsContent value="campaigns">
                  <div className="text-center py-8 text-gray-500">
                    キャンペーンのフィールド管理はまだ実装されていません
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>権限設定</CardTitle>
              <CardDescription>ユーザーロールと権限を管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">権限設定はユーザー詳細ページから管理できます</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>通知の送信方法と頻度を設定します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">メール通知</h4>
                    <p className="text-sm text-gray-500">重要なイベントについてメールで通知を受け取ります</p>
                  </div>
                  <Switch
                    checked={generalSettings.emailNotifications}
                    onCheckedChange={(checked) => handleGeneralSettingsChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Slack通知</h4>
                    <p className="text-sm text-gray-500">重要なイベントについてSlackで通知を受け取ります</p>
                  </div>
                  <Switch
                    checked={generalSettings.slackNotifications}
                    onCheckedChange={(checked) => handleGeneralSettingsChange("slackNotifications", checked)}
                  />
                </div>

                {generalSettings.slackNotifications && (
                  <div className="space-y-2">
                    <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                    <Input
                      id="slack-webhook"
                      value={generalSettings.slackWebhook}
                      onChange={(e) => handleGeneralSettingsChange("slackWebhook", e.target.value)}
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={saveGeneralSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  保存
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>外観設定</CardTitle>
              <CardDescription>アプリケーションの見た目をカスタマイズします</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">外観設定はまだ実装されていません</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ユーザー管理</CardTitle>
              <CardDescription>ユーザーアカウントを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">ユーザー管理はユーザー一覧ページから行えます</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
