"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, User, Key, Bell, Shield } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function AccountSettingsPage() {
  const [profileData, setProfileData] = useState({
    name: "山田太郎",
    email: "yamada@example.com",
    phone: "03-1234-5678",
    department: "マーケティング部",
    position: "マネージャー",
    bio: "マーケティング部でデジタル広告の運用を担当しています。",
    avatarUrl: "",
  })

  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: false,
    lastLogin: "2023-05-15 14:30:45",
    lastPasswordChange: "2023-03-10",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    slackNotifications: false,
    browserNotifications: true,
    dailyDigest: true,
    weeklyReport: true,
    taskAssignments: true,
    taskComments: true,
    projectUpdates: true,
  })

  const handleProfileChange = (key: string, value: string) => {
    setProfileData({
      ...profileData,
      [key]: value,
    })
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    })
  }

  const saveProfile = () => {
    // 実際の実装ではAPIを呼び出してプロフィールを保存
    console.log("保存するプロフィール:", profileData)
    toast({
      title: "プロフィールを保存しました",
      description: "プロフィール情報が正常に更新されました",
    })
  }

  const saveNotifications = () => {
    // 実際の実装ではAPIを呼び出して通知設定を保存
    console.log("保存する通知設定:", notificationSettings)
    toast({
      title: "通知設定を保存しました",
      description: "通知設定が正常に更新されました",
    })
  }

  const changePassword = () => {
    // 実際の実装ではパスワード変更フローを開始
    toast({
      title: "パスワード変更メールを送信しました",
      description: "メールに記載されたリンクからパスワードを変更してください",
    })
  }

  const toggleTwoFactor = () => {
    // 実際の実装では2要素認証の設定フローを開始
    const newValue = !securityData.twoFactorEnabled
    setSecurityData({
      ...securityData,
      twoFactorEnabled: newValue,
    })
    toast({
      title: newValue ? "2要素認証を有効にしました" : "2要素認証を無効にしました",
      description: newValue
        ? "次回ログイン時から2要素認証が必要になります"
        : "2要素認証が無効になりました。セキュリティのため、再度有効にすることをお勧めします",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/settings">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">アカウント設定</h1>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            プロフィール
          </TabsTrigger>
          <TabsTrigger value="security">
            <Key className="mr-2 h-4 w-4" />
            セキュリティ
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            通知
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Shield className="mr-2 h-4 w-4" />
            権限
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>プロフィール情報</CardTitle>
              <CardDescription>あなたの個人情報を管理します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">氏名</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">部署</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => handleProfileChange("department", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">役職</Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    onChange={(e) => handleProfileChange("position", e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <Input
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  保存
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>セキュリティ設定</CardTitle>
              <CardDescription>アカウントのセキュリティを管理します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">パスワード</h3>
                  <p className="text-sm text-gray-500 mb-2">最終変更日: {securityData.lastPasswordChange}</p>
                  <Button onClick={changePassword}>パスワードを変更</Button>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">2要素認証</h3>
                      <p className="text-sm text-gray-500">
                        2要素認証を有効にすると、ログイン時に追加の確認が必要になります
                      </p>
                    </div>
                    <Switch checked={securityData.twoFactorEnabled} onCheckedChange={toggleTwoFactor} />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium">ログイン履歴</h3>
                  <p className="text-sm text-gray-500">最終ログイン: {securityData.lastLogin}</p>
                  <Button variant="outline" className="mt-2">
                    ログイン履歴を表示
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>通知の受信方法と頻度を設定します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">通知チャネル</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications">メール通知</Label>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="slack-notifications">Slack通知</Label>
                      <Switch
                        id="slack-notifications"
                        checked={notificationSettings.slackNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("slackNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="browser-notifications">ブラウザ通知</Label>
                      <Switch
                        id="browser-notifications"
                        checked={notificationSettings.browserNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("browserNotifications", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <h3 className="text-lg font-medium">通知タイプ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="daily-digest">デイリーダイジェスト</Label>
                      <Switch
                        id="daily-digest"
                        checked={notificationSettings.dailyDigest}
                        onCheckedChange={(checked) => handleNotificationChange("dailyDigest", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="weekly-report">週次レポート</Label>
                      <Switch
                        id="weekly-report"
                        checked={notificationSettings.weeklyReport}
                        onCheckedChange={(checked) => handleNotificationChange("weeklyReport", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="task-assignments">タスクの割り当て</Label>
                      <Switch
                        id="task-assignments"
                        checked={notificationSettings.taskAssignments}
                        onCheckedChange={(checked) => handleNotificationChange("taskAssignments", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="task-comments">タスクへのコメント</Label>
                      <Switch
                        id="task-comments"
                        checked={notificationSettings.taskComments}
                        onCheckedChange={(checked) => handleNotificationChange("taskComments", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="project-updates">プロジェクトの更新</Label>
                      <Switch
                        id="project-updates"
                        checked={notificationSettings.projectUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("projectUpdates", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveNotifications}>
                  <Save className="mr-2 h-4 w-4" />
                  保存
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>権限設定</CardTitle>
              <CardDescription>アカウントの権限を確認します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  権限設定は管理者によって管理されています。変更が必要な場合は管理者にお問い合わせください。
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
