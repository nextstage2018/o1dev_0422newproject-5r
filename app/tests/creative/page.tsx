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
    id: "main-image",
    name: "メイン画像",
    items: [
      { id: "photo-based", name: "実写主体", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      {
        id: "diagram-based",
        name: "図解主体",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "illustration-based",
        name: "イラスト主体",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "icon-based",
        name: "アイコン主体",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "product-based",
        name: "商品主体",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
    ],
  },
  {
    id: "image-ratio",
    name: "画像比率",
    items: [
      { id: "optimized", name: "最適化", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "16-9", name: "16:9", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "1-1", name: "1:1", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "4-5", name: "4:5", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
    ],
  },
  {
    id: "layout",
    name: "レイアウト",
    items: [
      {
        id: "image-side",
        name: "画像左右寄せ",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      { id: "center-align", name: "中央配置", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      {
        id: "text-overlay-top",
        name: "テキストオーバーレイ位置:上",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "text-overlay-middle",
        name: "テキストオーバーレイ位置:中",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "text-overlay-bottom",
        name: "テキストオーバーレイ位置:下",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "grid-layout",
        name: "グリッド配置",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "free-form",
        name: "フリーフォーム",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
    ],
  },
  {
    id: "typography",
    name: "タイポグラフィ",
    items: [
      { id: "handwritten", name: "手書き風", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      {
        id: "standard-font",
        name: "一般フォント",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
    ],
  },
  {
    id: "headline-tone",
    name: "ヘッドライントーン",
    items: [
      {
        id: "benefit",
        name: "ベネフィット訴求",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      { id: "problem", name: "問題提起", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "fact", name: "事実訴求", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "story", name: "ストーリー訴求", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "question", name: "質問形", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "call", name: "呼びかけ形", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
    ],
  },
  {
    id: "image-text",
    name: "画像内テキスト",
    items: [
      {
        id: "short-copy",
        name: "ショートコピー（～20字）",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "medium-copy",
        name: "ミディアムコピー（20～40字）",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "long-copy",
        name: "ロングコピー（40～60字以上）",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "bullet-points",
        name: "箇条書き",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
    ],
  },
  {
    id: "format",
    name: "形式／動的要素",
    items: [
      { id: "static", name: "静止画", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
      { id: "video", name: "動画（MP4）", enabled: true, inputType: "fixed", value: "", options: ["あり", "なし"] },
    ],
  },
  {
    id: "dco",
    name: "DCO",
    items: [
      {
        id: "text-pattern",
        name: "テキストパターン自動組み合わせ",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "image-pattern",
        name: "画像パターン自動組み合わせ",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
      {
        id: "cta-optimization",
        name: "CTA組み合わせのリアルタイム最適化",
        enabled: true,
        inputType: "fixed",
        value: "",
        options: ["あり", "なし"],
      },
    ],
  },
  {
    id: "offer",
    name: "オファー内容",
    items: [
      { id: "discount", name: "割引", enabled: true, inputType: "custom", value: "" },
      { id: "benefit", name: "特典", enabled: true, inputType: "custom", value: "" },
      { id: "deadline", name: "締切", enabled: true, inputType: "custom", value: "" },
      { id: "limited", name: "限定", enabled: true, inputType: "custom", value: "" },
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

export default function CreativeTestPage() {
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
      //   const response = await fetch(`/api/tests/creative?accountId=${currentAccount.id}`);
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
      // await fetch(`/api/tests/creative?accountId=${currentAccount.id}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(testCategories),
      // })

      // 成功メッセージを表示
      toast({
        title: "設定を保存しました",
        description: `${currentAccount.name}のクリエイティブ検証設定が正常に保存されました。`,
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
          <h1 className="text-2xl font-bold tracking-tight">クリエイティブ検証設定</h1>
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
              ）のクリエイティブ検証に使用する項目を設定します。各項目のON/OFF切り替えや入力値の設定が可能です。
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
