import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { FieldSettingsTable } from "@/components/field-settings-table"

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
  {
    id: "commission_feerate",
    name: "手数料率",
    type: "numeric",
    required: false,
    visible: true,
    table: "dim_project",
  },
  {
    id: "delivery_status",
    name: "配信ステータス",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "created_at",
    name: "作成日時",
    type: "timestamp",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "updated_at",
    name: "更新日時",
    type: "timestamp",
    required: false,
    visible: false,
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
  { id: "budget_total", name: "総予算", type: "numeric", required: false, visible: true, table: "dim_campaign" },
  { id: "status", name: "ステータス", type: "string", required: true, visible: true, table: "dim_campaign" },
  { id: "created_at", name: "作成日時", type: "timestamp", required: true, visible: true, table: "dim_campaign" },
  { id: "updated_at", name: "更新日時", type: "timestamp", required: false, visible: false, table: "dim_campaign" },
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
  { id: "daily_budget", name: "日予算", type: "numeric", required: false, visible: true, table: "dim_ad_set" },
  { id: "status", name: "ステータス", type: "string", required: true, visible: true, table: "dim_ad_set" },
  { id: "created_at", name: "作成日時", type: "timestamp", required: true, visible: true, table: "dim_ad_set" },
  { id: "updated_at", name: "更新日時", type: "timestamp", required: false, visible: false, table: "dim_ad_set" },
]

const adFields = [
  { id: "ad_id", name: "広告ID", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "adset_id", name: "広告セットID", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "ad_name", name: "広告名", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "creative_id", name: "クリエイティブID", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "landing_page_url", name: "リンク先URL", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "status", name: "ステータス", type: "string", required: true, visible: true, table: "dim_ad" },
  { id: "created_at", name: "作成日時", type: "timestamp", required: true, visible: true, table: "dim_ad" },
  { id: "updated_at", name: "更新日時", type: "timestamp", required: false, visible: false, table: "dim_ad" },
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
    id: "folder_id",
    name: "フォルダID",
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
  {
    id: "creative_publication_type",
    name: "掲載面種別",
    type: "string",
    required: false,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "creative_main_image_url",
    name: "メイン画像URL",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "headline",
    name: "見出し",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "body_text",
    name: "本文",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "media_id",
    name: "メディアID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "created_at",
    name: "作成日時",
    type: "timestamp",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "updated_at",
    name: "更新日時",
    type: "timestamp",
    required: false,
    visible: false,
    table: "dim_creative",
  },
]

const mediaFields = [
  { id: "media_id", name: "メディアID", type: "string", required: true, visible: true, table: "dim_media" },
  { id: "file_name", name: "ファイル名", type: "string", required: true, visible: true, table: "dim_media" },
  { id: "file_type", name: "ファイルタイプ", type: "string", required: true, visible: true, table: "dim_media" },
  { id: "file_url", name: "ファイルURL", type: "string", required: true, visible: true, table: "dim_media" },
  { id: "size_bytes", name: "サイズ(バイト)", type: "int64", required: false, visible: true, table: "dim_media" },
  { id: "created_at", name: "作成日時", type: "timestamp", required: true, visible: true, table: "dim_media" },
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
    id: "adset_id",
    name: "広告セットID(外部)",
    type: "string",
    required: false,
    visible: true,
    table: "dim_id_mapping",
  },
  { id: "ad_id", name: "広告ID(外部)", type: "string", required: false, visible: true, table: "dim_id_mapping" },
  {
    id: "campaign_id_int",
    name: "キャンペーンID(内部)",
    type: "string",
    required: false,
    visible: true,
    table: "dim_id_mapping",
  },
  {
    id: "adset_id_int",
    name: "広告セットID(内部)",
    type: "string",
    required: false,
    visible: true,
    table: "dim_id_mapping",
  },
  {
    id: "ad_id_int",
    name: "広告ID(内部)",
    type: "string",
    required: false,
    visible: true,
    table: "dim_id_mapping",
  },
  { id: "created_at", name: "作成日時", type: "timestamp", required: true, visible: true, table: "dim_id_mapping" },
]

const jobFields = [
  { id: "job_id", name: "ジョブID", type: "string", required: true, visible: true, table: "dim_job" },
  { id: "project_id", name: "プロジェクトID", type: "string", required: true, visible: true, table: "dim_job" },
  { id: "job_type", name: "ジョブタイプ", type: "string", required: true, visible: true, table: "dim_job" },
  { id: "job_status", name: "ジョブステータス", type: "string", required: true, visible: true, table: "dim_job" },
  { id: "job_progress", name: "進捗率", type: "numeric", required: true, visible: true, table: "dim_job" },
  {
    id: "job_error_message",
    name: "エラーメッセージ",
    type: "string",
    required: false,
    visible: true,
    table: "dim_job",
  },
  {
    id: "job_started_at",
    name: "開始日時",
    type: "timestamp",
    required: false,
    visible: true,
    table: "dim_job",
  },
  {
    id: "job_finished_at",
    name: "終了日時",
    type: "timestamp",
    required: false,
    visible: true,
    table: "dim_job",
  },
  {
    id: "adaccount_id",
    name: "広告アカウントID",
    type: "string",
    required: false,
    visible: true,
    table: "dim_job",
  },
  {
    id: "campaign_id",
    name: "キャンペーンID",
    type: "string",
    required: false,
    visible: true,
    table: "dim_job",
  },
  {
    id: "adset_id",
    name: "広告セットID",
    type: "string",
    required: false,
    visible: true,
    table: "dim_job",
  },
  { id: "ad_id", name: "広告ID", type: "string", required: false, visible: true, table: "dim_job" },
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
  {
    id: "operation_message",
    name: "操作メッセージ",
    type: "string",
    required: false,
    visible: true,
    table: "dim_operation",
  },
  {
    id: "executed_by",
    name: "実行者",
    type: "string",
    required: true,
    visible: true,
    table: "dim_operation",
  },
  {
    id: "operation_timestamp",
    name: "操作日時",
    type: "timestamp",
    required: true,
    visible: true,
    table: "dim_operation",
  },
  {
    id: "error_code",
    name: "エラーコード",
    type: "string",
    required: false,
    visible: true,
    table: "dim_operation",
  },
  {
    id: "error_details",
    name: "エラー詳細",
    type: "string",
    required: false,
    visible: true,
    table: "dim_operation",
  },
  {
    id: "adaccount_id",
    name: "広告アカウントID",
    type: "string",
    required: false,
    visible: true,
    table: "dim_operation",
  },
  {
    id: "campaign_id",
    name: "キャンペーンID",
    type: "string",
    required: false,
    visible: true,
    table: "dim_operation",
  },
  {
    id: "adset_id",
    name: "広告セットID",
    type: "string",
    required: false,
    visible: true,
    table: "dim_operation",
  },
  { id: "ad_id", name: "広告ID", type: "string", required: false, visible: true, table: "dim_operation" },
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
  {
    id: "folder_url",
    name: "フォルダURL",
    type: "string",
    required: true,
    visible: true,
    table: "dim_drive_folders",
  },
  {
    id: "created_at",
    name: "作成日時",
    type: "timestamp",
    required: true,
    visible: true,
    table: "dim_drive_folders",
  },
  {
    id: "updated_at",
    name: "更新日時",
    type: "timestamp",
    required: false,
    visible: false,
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
  {
    id: "file_type",
    name: "ファイルタイプ",
    type: "string",
    required: true,
    visible: true,
    table: "dim_drive_items",
  },
  {
    id: "file_url",
    name: "ファイルURL",
    type: "string",
    required: true,
    visible: true,
    table: "dim_drive_items",
  },
  {
    id: "created_at",
    name: "作成日時",
    type: "timestamp",
    required: true,
    visible: true,
    table: "dim_drive_items",
  },
]

const timeFields = [
  { id: "date_id", name: "日付ID", type: "date", required: true, visible: true, table: "dim_time" },
  { id: "year", name: "年", type: "int64", required: true, visible: true, table: "dim_time" },
  { id: "quarter", name: "四半期", type: "int64", required: true, visible: true, table: "dim_time" },
  { id: "month", name: "月", type: "int64", required: true, visible: true, table: "dim_time" },
  { id: "week_of_year", name: "年週", type: "int64", required: true, visible: true, table: "dim_time" },
  { id: "day", name: "日", type: "int64", required: true, visible: true, table: "dim_time" },
  { id: "day_of_week", name: "曜日番号", type: "int64", required: true, visible: true, table: "dim_time" },
  { id: "day_of_week_name", name: "曜日名", type: "string", required: true, visible: true, table: "dim_time" },
  { id: "month_name", name: "月名", type: "string", required: true, visible: true, table: "dim_time" },
  { id: "is_weekend", name: "週末フラグ", type: "bool", required: true, visible: true, table: "dim_time" },
]

const userFields = [
  { id: "user_id", name: "ユーザーID", type: "string", required: true, visible: true, table: "dim_user" },
  { id: "user_name", name: "ユーザー名", type: "string", required: true, visible: true, table: "dim_user" },
  { id: "email", name: "メールアドレス", type: "string", required: true, visible: true, table: "dim_user" },
  { id: "role", name: "役割", type: "string", required: true, visible: true, table: "dim_user" },
  { id: "created_at", name: "作成日時", type: "timestamp", required: true, visible: true, table: "dim_user" },
]

const analysisFields = [
  { id: "analysis_id", name: "分析ID", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "project_id", name: "プロジェクトID", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "metric_name", name: "指標名", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "metric_value", name: "指標値", type: "float64", required: true, visible: true, table: "dim_analysis" },
  { id: "captured_at", name: "取得日時", type: "timestamp", required: true, visible: true, table: "dim_analysis" },
  { id: "note", name: "メモ", type: "string", required: false, visible: true, table: "dim_analysis" },
]

export default function FieldDisplaySettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/settings">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">フィールド表示設定</h1>
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
              <CardTitle>クライアント画面フィールド設定</CardTitle>
              <CardDescription>クライアント画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={clientFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>プロジェクト画面フィールド設定</CardTitle>
              <CardDescription>プロジェクト画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={projectFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>キャンペーン画面フィールド設定</CardTitle>
              <CardDescription>キャンペーン画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={campaignFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adsets" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>広告セット画面フィールド設定</CardTitle>
              <CardDescription>広告セット画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={adSetFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>広告画面フィールド設定</CardTitle>
              <CardDescription>広告画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={adFields} />
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
              <CardTitle>クリエイティブ画面フィールド設定</CardTitle>
              <CardDescription>クリエイティブ画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={creativeFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>メディア画面フィールド設定</CardTitle>
              <CardDescription>メディア画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={mediaFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="idmapping" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ID連携画面フィールド設定</CardTitle>
              <CardDescription>ID連携画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={idMappingFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ジョブ画面フィールド設定</CardTitle>
              <CardDescription>ジョブ画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={jobFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>操作履歴画面フィールド設定</CardTitle>
              <CardDescription>操作履歴画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={operationFields} />
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
              <CardTitle>Driveフォルダ画面フィールド設定</CardTitle>
              <CardDescription>Driveフォルダ画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={driveFoldersFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="driveitems" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Driveアイテム画面フィールド設定</CardTitle>
              <CardDescription>Driveアイテム画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={driveItemsFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>時間画面フィールド設定</CardTitle>
              <CardDescription>時間画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={timeFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ユーザー画面フィールド設定</CardTitle>
              <CardDescription>ユーザー画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={userFields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>分析画面フィールド設定</CardTitle>
              <CardDescription>分析画面に表示するフィールドと入力要件を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSettingsTable fields={analysisFields} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
