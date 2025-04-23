"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function SystemSettingsPage() {
  const [apiSettings, setApiSettings] = useState({
    bigQueryApiKey: "••••••••••••••••••••••",
    googleDriveApiKey: "••••••••••••••••••••••",
    chatworkApiKey: "••••••••••••••••••••••",
  })

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "03:00",
    retentionPeriod: "30",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    chatworkNotifications: true,
    errorAlerts: true,
    jobCompletionAlerts: true,
    systemUpdates: false,
  })

  const handleSaveApiSettings = () => {
    // 実際の実装ではAPIを呼び出して設定を保存
    toast({
      title: "API設定を保存しました",
      description: "APIキーの設定が更新されました",
    })
  }

  const handleSaveBackupSettings = () => {
    // 実際の実装ではAPIを呼び出して設定を保存
    toast({
      title: "バックアップ設定を保存しました",
      description: "バックアップ設定が更新されました",
    })
  }

  const handleSaveNotificationSettings = () => {
    // 実際の実装ではAPIを呼び出して設定を保存
    toast({
      title: "通知設定を保存しました",
      description: "通知設定が更新されました",
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
          <h1 className="text-2xl font-bold tracking-tight">システム設定</h1>
        </div>
      </div>

      <Tabs defaultValue="api">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="api">API設定</TabsTrigger>
          <TabsTrigger value="backup">バックアップ設定</TabsTrigger>
          <TabsTrigger value="notification">通知設定</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API設定</CardTitle>
              <CardDescription>外部サービスとの連携に必要なAPIキーを設定します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bigQueryApiKey">BigQuery APIキー</Label>
                <Input
                  id="bigQueryApiKey"
                  type="password"
                  value={apiSettings.bigQueryApiKey}
                  onChange={(e) => setApiSettings({ ...apiSettings, bigQueryApiKey: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleDriveApiKey">Google Drive APIキー</Label>
                <Input
                  id="googleDriveApiKey"
                  type="password"
                  value={apiSettings.googleDriveApiKey}
                  onChange={(e) => setApiSettings({ ...apiSettings, googleDriveApiKey: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chatworkApiKey">Chatwork APIキー</Label>
                <Input
                  id="chatworkApiKey"
                  type="password"
                  value={apiSettings.chatworkApiKey}
                  onChange={(e) => setApiSettings({ ...apiSettings, chatworkApiKey: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveApiSettings}>保存</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>バックアップ設定</CardTitle>
              <CardDescription>データのバックアップに関する設定を行います</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoBackup">自動バックアップ</Label>
                <Switch
                  id="autoBackup"
                  checked={backupSettings.autoBackup}
                  onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, autoBackup: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">バックアップ頻度</Label>
                <select
                  id="backupFrequency"
                  className="w-full p-2 border rounded"
                  value={backupSettings.backupFrequency}
                  onChange={(e) => setBackupSettings({ ...backupSettings, backupFrequency: e.target.value })}
                  disabled={!backupSettings.autoBackup}
                >
                  <option value="hourly">毎時</option>
                  <option value="daily">毎日</option>
                  <option value="weekly">毎週</option>
                  <option value="monthly">毎月</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupTime">バックアップ時刻</Label>
                <Input
                  id="backupTime"
                  type="time"
                  value={backupSettings.backupTime}
                  onChange={(e) => setBackupSettings({ ...backupSettings, backupTime: e.target.value })}
                  disabled={!backupSettings.autoBackup || backupSettings.backupFrequency === "hourly"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retentionPeriod">保持期間（日）</Label>
                <Input
                  id="retentionPeriod"
                  type="number"
                  min="1"
                  value={backupSettings.retentionPeriod}
                  onChange={(e) => setBackupSettings({ ...backupSettings, retentionPeriod: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveBackupSettings}>保存</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notification" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>システムからの通知に関する設定を行います</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">メール通知</Label>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="chatworkNotifications">Chatwork通知</Label>
                <Switch
                  id="chatworkNotifications"
                  checked={notificationSettings.chatworkNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, chatworkNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="errorAlerts">エラーアラート</Label>
                <Switch
                  id="errorAlerts"
                  checked={notificationSettings.errorAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, errorAlerts: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="jobCompletionAlerts">ジョブ完了通知</Label>
                <Switch
                  id="jobCompletionAlerts"
                  checked={notificationSettings.jobCompletionAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, jobCompletionAlerts: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="systemUpdates">システム更新通知</Label>
                <Switch
                  id="systemUpdates"
                  checked={notificationSettings.systemUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>保存</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
