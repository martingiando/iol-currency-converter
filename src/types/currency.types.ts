export interface Currency {
  code: string
  name: string
  symbol: string
}

export interface CurrenciesResponse {
  [code: string]: { name: string; symbol: string }
}

export interface RatesResponse {
  date: string
  base: string
  rates: Record<string, number>
}

export interface ConversionState {
  amount: number
  fromCurrency: string
  toCurrency: string
}
