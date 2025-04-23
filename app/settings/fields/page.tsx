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
]

const analysisFields = [
  { id: "analysis_id", name: "検証ID", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "analysis_date", name: "検証日", type: "date", required: true, visible: true, table: "dim_analysis" },
  { id: "appeal_target", name: "訴求対象者", type: "string", required: true, visible: true, table: "dim_analysis" },
  { id: "emphasis_theme", name: "強調テーマ", type: "string", required: true, visible: true, table: "dim_analysis" },
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients">クライアントフィールド</TabsTrigger>
          <TabsTrigger value="projects">プロジェクトフィールド</TabsTrigger>
          <TabsTrigger value="creatives">クリエイティブフィールド</TabsTrigger>
          <TabsTrigger value="analysis">検証設計フィールド</TabsTrigger>
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

        <TabsContent value="analysis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>検証設計フィールド管理</CardTitle>
              <CardDescription>検証設計テーブルのフィールドを管理します</CardDescription>
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
