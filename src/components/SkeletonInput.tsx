import { memo } from 'react'
import { Skeleton } from './Skeleton'

export const SkeletonInput = memo(() => (
  <div className="flex flex-col gap-1">
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
))

SkeletonInput.displayName = 'SkeletonInput'
