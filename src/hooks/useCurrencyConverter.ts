import { useState, useCallback, useMemo } from 'react'
import { DEFAULT_FROM_CURRENCY, DEFAULT_TO_CURRENCY } from '@/constants/currency'
import { useExchangeRates } from './useExchangeRates'
import { formatAmount } from '@/utils/formatters'

const DEFAULT_AMOUNT = 1
const MIN_AMOUNT = 0

export function useCurrencyConverter(
  defaultFrom = DEFAULT_FROM_CURRENCY,
  defaultTo = DEFAULT_TO_CURRENCY
) {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT)
  const [fromCurrency, setFromCurrency] = useState<string>(defaultFrom)
  const [toCurrency, setToCurrency] = useState<string>(defaultTo)

  const { data: ratesData, isError, refetch } = useExchangeRates(fromCurrency)

  const rate = useMemo(() => {
    if (!ratesData?.rates || !(toCurrency in ratesData.rates)) return null
    return ratesData.rates[toCurrency]
  }, [ratesData, toCurrency])

  const convertedAmount = useMemo(() => {
    if (rate === null) return null
    const value = amount * rate
    return value < 0 ? 0 : value
  }, [amount, rate])

  const inverseRate = useMemo(() => {
    if (rate === null || rate === 0) return null
    return 1 / rate
  }, [rate])

  const setAmountSafe = useCallback((value: number) => {
    const clamped = value < MIN_AMOUNT ? MIN_AMOUNT : value
    setAmount(clamped)
  }, [])

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }, [fromCurrency, toCurrency])

  const formattedConverted = convertedAmount !== null ? formatAmount(convertedAmount) : null
  const formattedInverseRate = inverseRate !== null ? formatAmount(inverseRate) : null

  return {
    amount,
    setAmount: setAmountSafe,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    swapCurrencies,
    rate,
    convertedAmount,
    formattedConverted,
    inverseRate,
    formattedInverseRate,
    ratesDate: ratesData?.date ?? null,
    isLoading: !ratesData,
    isError,
    retryRates: refetch,
  }
}
