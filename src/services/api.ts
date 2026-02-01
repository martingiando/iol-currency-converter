import type { CurrenciesResponse, RatesResponse } from '@/types/currency.types'

const BASE_URL = 'https://api.vatcomply.com'

export async function fetchCurrencies(): Promise<CurrenciesResponse> {
  const res = await fetch(`${BASE_URL}/currencies`)
  if (!res.ok) {
    throw new Error('Failed to fetch currencies')
  }
  return res.json()
}

export async function fetchRates(base: string): Promise<RatesResponse> {
  const res = await fetch(`${BASE_URL}/rates?base=${encodeURIComponent(base)}`)
  if (!res.ok) {
    throw new Error('Failed to fetch exchange rates')
  }
  return res.json()
}
