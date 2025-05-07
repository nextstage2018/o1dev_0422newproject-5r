import { redirect } from "next/navigation"

export default function Home() {
  // ルートページにアクセスした場合、ダッシュボードにリダイレクト
  redirect("/dashboard")
}
