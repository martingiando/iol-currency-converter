import { useQuery } from '@tanstack/react-query'
import { fetchRates } from '@/services/api'
import type { RatesResponse } from '@/types/currency.types'

const RATES_STALE_TIME_MS = 5 * 60 * 1000

export function useExchangeRates(baseCurrency: string) {
  const query = useQuery({
    queryKey: ['rates', baseCurrency],
    queryFn: () => fetchRates(baseCurrency),
    staleTime: RATES_STALE_TIME_MS,
    enabled: Boolean(baseCurrency),
  })

  return {
    data: query.data as RatesResponse | undefined,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}
