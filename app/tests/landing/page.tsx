"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccountContext } from "@/components/account-context-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 検証項目の型定義
interface TestItem {
  id: string
  name: string
  enabled: boolean
  inputType: "fixed" | "custom"
  value: string
  options?: string[]
}

// 検証要素の型定義
interface TestCategory {
  id: string
  name: string
  items: TestItem[]
}

// アカウントごとの設定データの型定義
interface AccountSettings {
  [accountId: string]: TestCategory[]
}

// 初期データ
const initialTestCategories: TestCategory[] = [
  {
    id: "page-structure",
    name: "ページ構造",
    items: [
      { id: "header", name: "ヘッダー", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "footer", name: "フッター", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      {
        id: "navigation",
        name: "ナビゲーション",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "breadcrumb",
        name: "パンくずリスト",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
    ],
  },
  {
    id: "content",
    name: "コンテンツ",
    items: [
      {
        id: "hero-section",
        name: "ヒーローセクション",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      { id: "product-info", name: "商品情報", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      {
        id: "benefits",
        name: "ベネフィット説明",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "testimonials",
        name: "お客様の声",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      { id: "faq", name: "よくある質問", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
    ],
  },
  {
    id: "conversion",
    name: "コンバージョン要素",
    items: [
      { id: "cta-button", name: "CTAボタン", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "form", name: "フォーム", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      {
        id: "contact-info",
        name: "問い合わせ情報",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
    ],
  },
  {
    id: "technical",
    name: "技術要素",
    items: [
      { id: "loading-speed", name: "読み込み速度", enabled: true, inputType: "custom", value: "" },
      {
        id: "mobile-responsive",
        name: "モバイル対応",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["対応", "非対応"],
      },
      { id: "ssl", name: "SSL証明書", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
    ],
  },
  {
    id: "tracking",
    name: "トラッキング",
    items: [
      {
        id: "analytics",
        name: "アナリティクス",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "conversion-tracking",
        name: "コンバージョントラッキング",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "event-tracking",
        name: "イベントトラッキング",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
    ],
  },
]

// アカウントごとの設定データのサンプル
const sampleAccountSettings: AccountSettings = {
  acc001: JSON.parse(JSON.stringify(initialTestCategories)),
  acc002: JSON.parse(JSON.stringify(initialTestCategories)),
  acc003: JSON.parse(JSON.stringify(initialTestCategories)),
  acc004: JSON.parse(JSON.stringify(initialTestCategories)),
  acc005: JSON.parse(JSON.stringify(initialTestCategories)),
}

export default function LandingTestPage() {
  const { selectedAccounts, getSelectedAccountsInfo } = useAccountContext()
  const [accountSettings, setAccountSettings] = useState<AccountSettings>(sampleAccountSettings)
  const [testCategories, setTestCategories] = useState<TestCategory[]>(initialTestCategories)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // 選択されているアカウント情報を取得
  const selectedAccountsInfo = getSelectedAccountsInfo()
  const currentAccount = selectedAccountsInfo.length > 0 ? selectedAccountsInfo[0] : null

  // 選択されたアカウントが変更されたときに設定を読み込む
  useEffect(() => {
    if (currentAccount) {
      // 実際の実装ではAPIからデータを取得する
      // const fetchSettings = async () => {
      //   const response = await fetch(`/api/tests/landing?accountId=${currentAccount.id}`);
      //   const data = await response.json();
      //   setTestCategories(data);
      // };
      // fetchSettings();

      // サンプルデータを使用
      setTestCategories(accountSettings[currentAccount.id] || initialTestCategories)
    } else {
      setTestCategories(initialTestCategories)
    }
  }, [currentAccount, accountSettings])

  // 検証項目の有効/無効を切り替える
  const toggleItemEnabled = (categoryId: string, itemId: string) => {
    const updatedCategories = testCategories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map((item) => {
            if (item.id === itemId) {
              return { ...item, enabled: !item.enabled }
            }
            return item
          }),
        }
      }
      return category
    })

    setTestCategories(updatedCategories)

    // 現在のアカウントの設定を更新
    if (currentAccount) {
      setAccountSettings({
        ...accountSettings,
        [currentAccount.id]: updatedCategories,
      })
    }
  }

  // 検証項目の値を更新する
  const updateItemValue = (categoryId: string, itemId: string, value: string) => {
    const updatedCategories = testCategories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map((item) => {
            if (item.id === itemId) {
              return { ...item, value }
            }
            return item
          }),
        }
      }
      return category
    })

    setTestCategories(updatedCategories)

    // 現在のアカウントの設定を更新
    if (currentAccount) {
      setAccountSettings({
        ...accountSettings,
        [currentAccount.id]: updatedCategories,
      })
    }
  }

  // 新しい検証項目を追加する
  const addNewItem = (categoryId: string) => {
    const newItemId = `new-item-${Date.now()}`
    const updatedCategories = testCategories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: [
            ...category.items,
            {
              id: newItemId,
              name: "新しい検証項目",
              enabled: true,
              inputType: "fixed",
              value: "",
              options: ["あり", "なし"],
            },
          ],
        }
      }
      return category
    })

    setTestCategories(updatedCategories)

    // 現在のアカウントの設定を更新
    if (currentAccount) {
      setAccountSettings({
        ...accountSettings,
        [currentAccount.id]: updatedCategories,
      })
    }
  }

  // 検証項目を削除する
  const deleteItem = (categoryId: string, itemId: string) => {
    const updatedCategories = testCategories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.filter((item) => item.id !== itemId),
        }
      }
      return category
    })

    setTestCategories(updatedCategories)

    // 現在のアカウントの設定を更新
    if (currentAccount) {
      setAccountSettings({
        ...accountSettings,
        [currentAccount.id]: updatedCategories,
      })
    }
  }

  // 検証項目の名前を更新する
  const updateItemName = (categoryId: string, itemId: string, name: string) => {
    const updatedCategories = testCategories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map((item) => {
            if (item.id === itemId) {
              return { ...item, name }
            }
            return item
          }),
        }
      }
      return category
    })

    setTestCategories(updatedCategories)

    // 現在のアカウントの設定を更新
    if (currentAccount) {
      setAccountSettings({
        ...accountSettings,
        [currentAccount.id]: updatedCategories,
      })
    }
  }

  // 検証項目の入力タイプを更新する
  const updateItemInputType = (categoryId: string, itemId: string, inputType: "fixed" | "custom") => {
    const updatedCategories = testCategories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map((item) => {
            if (item.id === itemId) {
              return { ...item, inputType, value: "" }
            }
            return item
          }),
        }
      }
      return category
    })

    setTestCategories(updatedCategories)

    // 現在のアカウントの設定を更新
    if (currentAccount) {
      setAccountSettings({
        ...accountSettings,
        [currentAccount.id]: updatedCategories,
      })
    }
  }

  // 設定を保存する
  const saveSettings = async () => {
    if (!currentAccount) {
      toast({
        title: "エラー",
        description: "広告アカウントが選択されていません。",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // 実際の実装では、APIを呼び出して設定を保存する
      // await fetch(`/api/tests/landing?accountId=${currentAccount.id}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(testCategories),
      // })

      // 成功メッセージを表示
      toast({
        title: "設定を保存しました",
        description: `${currentAccount.name}の遷移先検証設定が正常に保存されました。`,
      })
    } catch (error) {
      console.error("設定の保存に失敗しました:", error)
      toast({
        title: "エラーが発生しました",
        description: "設定の保存に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // フィルタリングされたカテゴリを取得
  const filteredCategories =
    activeTab === "all" ? testCategories : testCategories.filter((category) => category.id === activeTab)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/tests">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">遷移先検証設定</h1>
        </div>
        <Button onClick={saveSettings} disabled={isLoading || !currentAccount}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "保存中..." : "設定を保存"}
        </Button>
      </div>

      {!currentAccount && (
        <Alert variant="warning" className="mb-4">
          <AlertDescription>
            広告アカウントが選択されていません。ヘッダーから広告アカウントを選択してください。
          </AlertDescription>
        </Alert>
      )}

      {currentAccount && (
        <Card>
          <CardHeader>
            <CardTitle>検証項目の設定</CardTitle>
            <CardDescription>
              {currentAccount.name}（{currentAccount.platform}
              ）の遷移先検証に使用する項目を設定します。各項目のON/OFF切り替えや入力値の設定が可能です。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="all">すべて</TabsTrigger>
                {testCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                {filteredCategories.map((category) => (
                  <Accordion key={category.id} type="single" collapsible className="w-full border rounded-md">
                    <AccordionItem value={category.id}>
                      <AccordionTrigger className="px-4 py-2 hover:bg-gray-50">
                        <div className="flex items-center">
                          <span className="font-medium">{category.name}</span>
                          <span className="ml-2 text-xs text-gray-500">({category.items.length}項目)</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-500 border-b pb-2">
                            <div className="col-span-1">有効</div>
                            <div className="col-span-3">検証項目</div>
                            <div className="col-span-2">入力タイプ</div>
                            <div className="col-span-5">入力値</div>
                            <div className="col-span-1">操作</div>
                          </div>

                          {category.items.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                              <div className="col-span-1">
                                <Switch
                                  checked={item.enabled}
                                  onCheckedChange={() => toggleItemEnabled(category.id, item.id)}
                                />
                              </div>
                              <div className="col-span-3">
                                <Input
                                  value={item.name}
                                  onChange={(e) => updateItemName(category.id, item.id, e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="col-span-2">
                                <Select
                                  value={item.inputType}
                                  onValueChange={(value: "fixed" | "custom") =>
                                    updateItemInputType(category.id, item.id, value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="fixed">固定(選択型)</SelectItem>
                                    <SelectItem value="custom">都度記入</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-5">
                                {item.inputType === "fixed" ? (
                                  <Select
                                    value={item.value}
                                    onValueChange={(value) => updateItemValue(category.id, item.id, value)}
                                    disabled={!item.enabled}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="選択してください" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {item.options?.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input
                                    value={item.value}
                                    onChange={(e) => updateItemValue(category.id, item.id, e.target.value)}
                                    placeholder="入力値を記入"
                                    disabled={!item.enabled}
                                  />
                                )}
                              </div>
                              <div className="col-span-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => deleteItem(category.id, item.id)}
                                >
                                  削除
                                </Button>
                              </div>
                            </div>
                          ))}

                          <Button variant="outline" size="sm" className="mt-4" onClick={() => addNewItem(category.id)}>
                            <Plus className="h-4 w-4 mr-2" />
                            検証項目を追加
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
