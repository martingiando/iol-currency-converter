import { memo } from 'react'
import { Skeleton } from './Skeleton'
import { SkeletonInput } from './SkeletonInput'
import { SkeletonResult } from './SkeletonResult'

export const CurrencyCardSkeleton = memo(() => (
  <>
    <section className="bg-primary py-12 pb-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <Skeleton className="mx-auto h-8 w-96" />
      </div>
    </section>
    <main className="mx-auto max-w-4xl px-4 -mt-12">
      <div className="rounded-xl border border-gray-200 bg-surface p-6 shadow-lg">
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto_1fr] sm:items-end">
          <SkeletonInput />
          <SkeletonInput />
          <div className="flex items-end justify-center">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <SkeletonInput />
        </div>
        <div className="mt-8">
          <SkeletonResult />
        </div>
      </div>
    </main>
  </>
))

CurrencyCardSkeleton.displayName = 'CurrencyCardSkeleton'
