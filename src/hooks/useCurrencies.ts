import { useQuery } from '@tanstack/react-query'
import { fetchCurrencies } from '@/services/api'
import type { Currency } from '@/types/currency.types'

function transformCurrencies(data: Record<string, { name: string; symbol: string }>): Currency[] {
  return Object.entries(data).map(([code, { name, symbol }]) => ({
    code,
    name,
    symbol,
  }))
}

export function useCurrencies() {
  const query = useQuery({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const currencies: Currency[] = query.data ? transformCurrencies(query.data) : []

  return {
    currencies,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}
