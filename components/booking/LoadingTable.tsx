import { Skeleton } from "../ui/skeleton"

export default function LoadingTable({ rows }: { rows?: number }) {
  const tableRows = Array.from({ length: rows || 5 }, (_, i) => {
    return <div className="mb-4" key={i}>
      <Skeleton className="w-full h-8 rounded" />
    </div>
  })
  return <>{tableRows}</>
}
