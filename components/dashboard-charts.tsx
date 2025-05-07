"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DashboardCharts() {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="weekly">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="weekly">週間</TabsTrigger>
              <TabsTrigger value="monthly">月間</TabsTrigger>
              <TabsTrigger value="quarterly">四半期</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="weekly" className="mt-4">
            <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">週間データを読み込み中...</p>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4">
            <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">月間データを読み込み中...</p>
            </div>
          </TabsContent>
          <TabsContent value="quarterly" className="mt-4">
            <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">四半期データを読み込み中...</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
