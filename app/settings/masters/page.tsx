import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { MasterDataTable } from "@/components/master-data-table"

// サンプルデータ - 実際の実装ではAPIから取得
const deliveryStatusData = [
  { code: "active", label: "配信中", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "paused", label: "停止", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "archived", label: "アーカイブ", is_active: false, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "draft", label: "下書き", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "test", label: "テスト", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
]

const jobStatusData = [
  { code: "pending", label: "待機中", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "running", label: "実行中", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "success", label: "成功", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "failure", label: "失敗", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "cancelled", label: "取消", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
]

const operationStatusData = [
  { code: "pending", label: "保留", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "in_review", label: "審査中", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "executing", label: "実行中", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "done", label: "完了", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "error", label: "エラー", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
]

const commissionTypeData = [
  { code: "fee", label: "変動手数料", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "fixed", label: "固定報酬", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "hybrid", label: "ハイブリッド", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "revshare", label: "成果報酬", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
]

const roleData = [
  { code: "admin", label: "管理者", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "operator", label: "運用者", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "viewer", label: "閲覧者", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "client", label: "クライアント", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
  { code: "system", label: "システム", is_active: true, created_at: "2023-04-01T00:00:00Z", updated_at: null },
]

export default function MasterDataPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/settings">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">マスターデータ管理</h1>
        </div>
      </div>

      <Tabs defaultValue="delivery_status">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="delivery_status">配信ステータス</TabsTrigger>
          <TabsTrigger value="job_status">ジョブステータス</TabsTrigger>
          <TabsTrigger value="operation_status">操作ステータス</TabsTrigger>
          <TabsTrigger value="commission_type">報酬形態</TabsTrigger>
          <TabsTrigger value="role">ユーザー役割</TabsTrigger>
        </TabsList>

        <TabsContent value="delivery_status" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>配信ステータス管理</CardTitle>
              <CardDescription>配信ステータスのマスターデータを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterDataTable data={deliveryStatusData} tableName="mst_delivery_status" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="job_status" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ジョブステータス管理</CardTitle>
              <CardDescription>ジョブステータスのマスターデータを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterDataTable data={jobStatusData} tableName="mst_job_status" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operation_status" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>操作ステータス管理</CardTitle>
              <CardDescription>操作ステータスのマスターデータを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterDataTable data={operationStatusData} tableName="mst_operation_status" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission_type" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>報酬形態管理</CardTitle>
              <CardDescription>報酬形態のマスターデータを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterDataTable data={commissionTypeData} tableName="mst_commission_type" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="role" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ユーザー役割管理</CardTitle>
              <CardDescription>ユーザー役割のマスターデータを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterDataTable data={roleData} tableName="mst_role" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
