import { memo } from 'react'
import { Skeleton } from './Skeleton'

export const SkeletonResult = memo(() => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-4 w-40" />
  </div>
))

SkeletonResult.displayName = 'SkeletonResult'
