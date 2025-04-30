import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { FieldManagementTable } from "@/components/field-management-table"

// サンプルデータ - 実際の実装ではAPIから取得
const clientFields = [
  { id: "client_id", name: "会社ID", type: "string", required: true, visible: true, table: "dim_client" },
  { id: "client_name", name: "会社名", type: "string", required: true, visible: true, table: "dim_client" },
  { id: "industry", name: "業種", type: "string", required: true, visible: true, table: "dim_client" },
  { id: "contact", name: "担当者", type: "string", required: true, visible: true, table: "dim_client" },
  { id: "email", name: "メールアドレス", type: "string", required: true, visible: true, table: "dim_client" },
  { id: "phone", name: "電話番号", type: "string", required: true, visible: true, table: "dim_client" },
  { id: "address", name: "住所", type: "string", required: false, visible: true, table: "dim_client" },
  { id: "created_at", name: "作成日時", type: "timestamp", required: true, visible: true, table: "dim_client" },
  { id: "updated_at", name: "更新日時", type: "timestamp", required: true, visible: false, table: "dim_client" },
  { id: "delivery_status", name: "配信ステータス", type: "string", required: true, visible: true, table: "dim_client" },
]

const projectFields = [
  { id: "project_id", name: "プロジェクトID", type: "string", required: true, visible: true, table: "dim_project" },
  { id: "client_id", name: "会社ID", type: "string", required: true, visible: true, table: "dim_project" },
  {
    id: "internal_project_name",
    name: "プロジェクト名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "adaccount_id",
    name: "広告アカウントID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "media_id",
    name: "メディアID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "commission_type",
    name: "報酬形態",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
]

const campaignFields = [
  { id: "campaign_id", name: "キャンペーンID", type: "string", required: true, visible: true, table: "dim_campaign" },
  { id: "project_id", name: "プロジェクトID", type: "string", required: true, visible: true, table: "dim_campaign" },
  { id: "campaign_name", name: "キャンペーン名", type: "string", required: true, visible: true, table: "dim_campaign" },
  { id: "objective", name: "広告目的", type: "string", required: true, visible: true, table: "dim_campaign" },
  { id: "start_date", name: "開始日", type: "date", required: true, visible: true, table: "dim_campaign" },
  { id: "end_date", name: "終了日", type: "date", required: false, visible: true, table: "dim_campaign" },
]

const adSetFields = [
  { id: "adset_id", name: "広告セットID", type: "string", required: true, visible: true, table: "dim_ad_set" },
  { id: "campaign_id", name: "キャンペーンID", type: "string", required: true, visible: true, table: "dim_ad_set" },
  { id: "adset_name", name: "広告セット名", type: "string", required: true, visible: true, table: "dim_ad_set" },
  { id: "placement", name: "配置", type: "string", required: true, visible: true, table: "dim_ad_set" },
  {
    id: "targeting_segment",
    name: "ターゲティングセグメント",
    type: "string",
    required: true,
    visible: true,
    table: "dim_ad_set",
  },
]

const adFields = [
  { id: "ad_id", name: "広告ID", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "adset_id", name: "広告セットID", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "ad_name", name: "広告名", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "creative_id", name: "クリエイティブID", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "landing_page_url", name: "リンク先URL", type: "string", required: true, visible: true, table: "dim_ad" },
]

const creativeFields = [
  {
    id: "creative_id",
    name: "クリエイティブID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "ad_id",
    name: "広告ID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "creative_type",
    name: "クリエイティブ形式",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
]

const mediaFields = [
  { id: "media_id", name: "メディアID", type: "string", required: true, visible: true, table: "dim_media" },
  { id: "file_name", name: "ファイル名", type: "string", required: true, visible: true, table: "dim_media" },
  { id: "file_type", name: "ファイルタイプ", type: "string", required: true, visible: true, table: "dim_media" },
]

const idMappingFields = [
  {
    id: "adaccount_id",
    name: "広告アカウントID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_id_mapping",
  },
  {
    id: "campaign_id",
    name: "キャンペーンID(外部)",
    type: "string",
    required: false,
    visible: true,
    table: "dim_id_mapping",
  },
  {
    id: "campaign_id_int",
    name: "キャンペーンID(内部)",
    type: "string",
    required: false,
    visible: true,
    table: "dim_id_mapping",
  },
]

const jobFields = [
  { id: "job_id", name: "ジョブID", type: "string", required: true, visible: true, table: "dim_job" },
  { id: "project_id", name: "プロジェクトID", type: "string", required: true, visible: true, table: "dim_job" },
  { id: "job_type", name: "ジョブタイプ", type: "string", required: true, visible: true, table: "dim_job" },
  { id: "job_status", name: "ジョブステータス", type: "string", required: true, visible: true, table: "dim_job" },
]

const operationFields = [
  { id: "change_id", name: "変更ID", type: "string", required: true, visible: true, table: "dim_operation" },
  {
    id: "operation_type",
    name: "操作タイプ",
    type: "string",
    required: true,
    visible: true,
    table: "dim_operation",
  },
  {
    id: "operation_status",
    name: "操作ステータス",
    type: "string",
    required: true,
    visible: true,
    table: "dim_operation",
  },
]

const driveFoldersFields = [
  { id: "folder_id", name: "フォルダID", type: "string", required: true, visible: true, table: "dim_drive_folders" },
  {
    id: "parent_folder_id",
    name: "親フォルダID",
    type: "string",
    required: false,
    visible: true,
    table: "dim_drive_folders",
  },
  {
    id: "project_id",
    name: "プロジェクトID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_drive_folders",
  },
]

const driveItemsFields = [
  { id: "item_id", name: "アイテムID", type: "string", required: true, visible: true, table: "dim_drive_items" },
  {
    id: "folder_id",
    name: "フォルダID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_drive_items",
  },
  {
    id: "file_name",
    name: "ファイル名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_drive_items",
  },
]

const timeFields = [
  { id: "date_id", name: "日付ID", type: "date", required: true, visible: true, table: "dim_time" },
  { id: "year", name: "年", type: "int64", required: true, visible: true, table: "dim_time" },
  { id: "month", name: "月", type: "int64", required: true, visible: true, table: "dim_time" },
  { id: "day", name: "日", type: "int64", required: true, visible: true, table: "dim_time" },
]

const userFields = [
  { id: "user_id", name: "ユーザーID", type: "string", required: true, visible: true, table: "dim_user" },
  { id: "user_name", name: "ユーザー名", type: "string", required: true, visible: true, table: "dim_user" },
  { id: "email", name: "メールアドレス", type: "string", required: true, visible: true, table: "dim_user" },
  { id: "role", name: "役割", type: "string", required: true, visible: true, table: "dim_user" },
]

const analysisFields = [
  { id: "analysis_id", name: "分析ID", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "project_id", name: "プロジェクトID", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "metric_name", name: "指標名", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "metric_value", name: "指標値", type: "float64", required: true, visible: true, table: "dim_analysis" },
]

export default function FieldManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/settings">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">フィールド管理</h1>
        </div>
      </div>

      <Tabs defaultValue="clients">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="clients">クライアント</TabsTrigger>
          <TabsTrigger value="projects">プロジェクト</TabsTrigger>
          <TabsTrigger value="campaigns">キャンペーン</TabsTrigger>
          <TabsTrigger value="adsets">広告セット</TabsTrigger>
          <TabsTrigger value="ads">広告</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>クライアントフィールド管理</CardTitle>
              <CardDescription>クライアントテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={clientFields} tableName="dim_client" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>プロジェクトフィールド管理</CardTitle>
              <CardDescription>プロジェクトテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={projectFields} tableName="dim_project" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>キャンペーンフィールド管理</CardTitle>
              <CardDescription>キャンペーンテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={campaignFields} tableName="dim_campaign" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adsets" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>広告セットフィールド管理</CardTitle>
              <CardDescription>広告セットテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={adSetFields} tableName="dim_ad_set" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>広告フィールド管理</CardTitle>
              <CardDescription>広告テーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={adFields} tableName="dim_ad" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="creatives">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="creatives">クリエイティブ</TabsTrigger>
          <TabsTrigger value="media">メディア</TabsTrigger>
          <TabsTrigger value="idmapping">ID連携</TabsTrigger>
          <TabsTrigger value="jobs">ジョブ</TabsTrigger>
          <TabsTrigger value="operations">操作履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="creatives" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>クリエイティブフィールド管理</CardTitle>
              <CardDescription>クリエイティブテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={creativeFields} tableName="dim_creative" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>メディアフィールド管理</CardTitle>
              <CardDescription>メディアテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={mediaFields} tableName="dim_media" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="idmapping" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ID連携フィールド管理</CardTitle>
              <CardDescription>ID連携テーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={idMappingFields} tableName="dim_id_mapping" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ジョブフィールド管理</CardTitle>
              <CardDescription>ジョブテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={jobFields} tableName="dim_job" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>操作履歴フィールド管理</CardTitle>
              <CardDescription>操作履歴テーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={operationFields} tableName="dim_operation" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="drivefolders">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="drivefolders">Driveフォルダ</TabsTrigger>
          <TabsTrigger value="driveitems">Driveアイテム</TabsTrigger>
          <TabsTrigger value="time">時間</TabsTrigger>
          <TabsTrigger value="users">ユーザー</TabsTrigger>
          <TabsTrigger value="analysis">分析</TabsTrigger>
        </TabsList>

        <TabsContent value="drivefolders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Driveフォルダフィールド管理</CardTitle>
              <CardDescription>Driveフォルダテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={driveFoldersFields} tableName="dim_drive_folders" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="driveitems" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Driveアイテムフィールド管理</CardTitle>
              <CardDescription>Driveアイテムテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={driveItemsFields} tableName="dim_drive_items" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>時間フィールド管理</CardTitle>
              <CardDescription>時間テーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={timeFields} tableName="dim_time" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ユーザーフィールド管理</CardTitle>
              <CardDescription>ユーザーテーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={userFields} tableName="dim_user" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>分析フィールド管理</CardTitle>
              <CardDescription>分析テーブルのフィールドを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldManagementTable fields={analysisFields} tableName="dim_analysis" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
