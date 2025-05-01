import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-20 mr-2" />
        <Skeleton className="h-8 w-64" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  )
}
