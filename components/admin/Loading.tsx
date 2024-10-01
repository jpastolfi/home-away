import { Card, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export default function Loading() {
  return (
    <div>Loading</div>
  )
}

export const StatsLoadingContainer = () => {
  return <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </div>
}

const LoadingCard = () => {
  return <Card>
    <CardHeader>
      <Skeleton className="w-full h-20 rounded" />
    </CardHeader>
  </Card>
}

export const ChartsLoadingContainer = () => {
  return <Skeleton className="mt-16 w-full h-[300px] rounded" />
}

