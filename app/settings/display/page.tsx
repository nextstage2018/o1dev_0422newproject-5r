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
  { id: "created_at", name: "作成日時", type: "string", required: true, visible: true, table: "dim_client" },
  { id: "updated_at", name: "更新日時", type: "string", required: true, visible: false, table: "dim_client" },
  { id: "delivery_status", name: "配信ステータス", type: "string", required: true, visible: true, table: "dim_client" },
]

const projectFields = [
  { id: "company_id", name: "会社ID", type: "string", required: true, visible: true, table: "dim_project" },
  { id: "company_name", name: "会社名", type: "string", required: true, visible: true, table: "dim_project" },
  {
    id: "internal_project_id",
    name: "プロジェクトID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "internal_project_name",
    name: "プロジェクト名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "industry_main_category",
    name: "業界カテゴリ（大）",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "industry_sub_category",
    name: "業界カテゴリ（中）",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "industry_detail_tag",
    name: "業界カテゴリ（小）",
    type: "string",
    required: false,
    visible: true,
    table: "dim_project",
  },
  {
    id: "admanage_name",
    name: "広告ビジネスアカウント名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  {
    id: "admanage_id",
    name: "広告ビジネスアカウントID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  { id: "adaccount_id", name: "広告アカウントID", type: "string", required: true, visible: true, table: "dim_project" },
  {
    id: "adaccount_name",
    name: "広告アカウント名",
    type: "string",
    required: true,
    visible: true,
    table: "dim_project",
  },
  { id: "commission_type", name: "報酬形態", type: "string", required: true, visible: true, table: "dim_project" },
  { id: "commission_feerate", name: "手数料率", type: "string", required: false, visible: true, table: "dim_project" },
  {
    id: "chatwork_room_id",
    name: "ChatworkルームID",
    type: "string",
    required: false,
    visible: true,
    table: "dim_project",
  },
  {
    id: "chatwork_member",
    name: "Chatworkメンバー",
    type: "string",
    required: false,
    visible: true,
    table: "dim_project",
  },
  {
    id: "client_member",
    name: "クライアント担当者",
    type: "string",
    required: false,
    visible: true,
    table: "dim_project",
  },
  {
    id: "client_member_email",
    name: "クライアント担当者メール",
    type: "string",
    required: false,
    visible: true,
    table: "dim_project",
  },
  { id: "media_type", name: "メディアタイプ", type: "string", required: true, visible: true, table: "dim_project" },
  { id: "media_name", name: "メディア名", type: "string", required: true, visible: true, table: "dim_project" },
  { id: "media_id", name: "メディアID", type: "string", required: true, visible: true, table: "dim_project" },
]

const creativeFields = [
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
    id: "creative_group_id",
    name: "クリエイティブグループID",
    type: "string",
    required: false,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "creative_item_name",
    name: "クリエイティブ名称",
    type: "string",
    required: false,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "creative_item_id",
    name: "クリエイティブアイテムID",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "creative_main_image",
    name: "メイン画像",
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
    id: "creative_main_text_1",
    name: "メインテキスト1",
    type: "string",
    required: false,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "creative_heading_text_1",
    name: "見出し1",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
  {
    id: "creative_detail_text_1",
    name: "説明文1",
    type: "string",
    required: true,
    visible: true,
    table: "dim_creative",
  },
]

const analysisFields = [
  { id: "analysis_id", name: "検証ID", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "analysis_date", name: "検証日", type: "date", required: true, visible: true, table: "dim_analysis" },
  { id: "appeal_target", name: "訴求対象者", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "emphasis_theme", name: "強調テーマ", type: "string", required: true, visible: true, table: "dim_analysis" },
  {
    id: "appeal_content",
    name: "訴求コンテンツ",
    type: "string",
    required: true,
    visible: true,
    table: "dim_analysis",
  },
  {
    id: "design_structure",
    name: "デザイン構成",
    type: "string",
    required: true,
    visible: true,
    table: "dim_analysis",
  },
  { id: "target_date", name: "対象日", type: "date", required: true, visible: true, table: "dim_analysis" },
  { id: "goal_event", name: "目標イベント", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "goal_value", name: "目標値", type: "float", required: true, visible: true, table: "dim_analysis" },
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients">クライアント設定</TabsTrigger>
          <TabsTrigger value="projects">プロジェクト設定</TabsTrigger>
          <TabsTrigger value="creatives">クリエイティブ設定</TabsTrigger>
          <TabsTrigger value="analysis">検証設計設定</TabsTrigger>
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

        <TabsContent value="analysis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>検証設計画面フィールド設定</CardTitle>
              <CardDescription>検証設計画面に表示するフィールドと入力要件を設定します</CardDescription>
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
