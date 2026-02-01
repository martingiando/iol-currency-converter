import { memo } from 'react'
import { formatAmount } from '@/utils/formatters'
import type { Currency } from '@/types/currency.types'

interface ConversionResultProps {
  amount: number
  fromCurrency: Currency | undefined
  toCurrency: Currency | undefined
  convertedAmount: string | null
  inverseRate: string | null
  isLoading: boolean
}

export const ConversionResult = memo(({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
  inverseRate,
  isLoading,
}: ConversionResultProps) => {
  const displayAmount = formatAmount(amount, 2)
  const fromName = fromCurrency?.name ?? ''
  const toName = toCurrency?.name ?? ''
  const toCode = toCurrency?.code ?? ''
  const fromCode = fromCurrency?.code ?? ''

  if (isLoading) {
    return (
      <div className="text-text-secondary text-sm">
        Loading rates…
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-3xl font-semibold text-text-primary">
        {displayAmount} {fromName} =
      </p>
      <p className="text-3xl font-semibold text-text-primary">
        {convertedAmount ?? '—'} {toName}
      </p>
      {inverseRate !== null && (
        <p className="text-sm text-text-secondary">
          1 {toCode} = {inverseRate} {fromCode}
        </p>
      )}
    </div>
  )
})

ConversionResult.displayName = 'ConversionResult'
