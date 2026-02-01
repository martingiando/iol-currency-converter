import { memo } from 'react'

interface SkeletonProps {
  className?: string
}

export const Skeleton = memo(({ className = '' }: SkeletonProps) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
))

Skeleton.displayName = 'Skeleton'
