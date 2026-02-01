import { memo } from 'react'
import { AmountInput } from '@/components/AmountInput'
import { CurrencySelect } from './CurrencySelect'
import { SwapButton } from '@/components/SwapButton'
import { ConversionResult } from '@/components/ConversionResult'
import { InfoBox } from '@/components/InfoBox'
import { DEFAULT_FROM_CURRENCY, DEFAULT_TO_CURRENCY } from '@/constants/currency'
import { useCurrencies } from '@/hooks/useCurrencies'
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter'
import { formatLastUpdated } from '@/utils/formatters'

function CurrencyCardComponent() {
  const { currencies, isLoading: currenciesLoading } = useCurrencies()
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    swapCurrencies,
    formattedConverted,
    formattedInverseRate,
    ratesDate,
    isLoading: ratesLoading,
  } = useCurrencyConverter(DEFAULT_FROM_CURRENCY, DEFAULT_TO_CURRENCY)

  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency)
  const toCurrencyData = currencies.find((c) => c.code === toCurrency)

  const bannerTitle = `${amount.toFixed(2)} ${fromCurrency} to ${toCurrency} - Convert ${fromCurrencyData?.name ?? fromCurrency} to ${toCurrencyData?.name ?? toCurrency}`
  const lastUpdatedText =
    ratesDate &&
    fromCurrencyData &&
    toCurrencyData
      ? `${fromCurrencyData.name} to ${toCurrencyData.name} conversion — Last updated ${formatLastUpdated(ratesDate)}`
      : null

  return (
    <>
      <section className="bg-primary py-12 pb-24">
        <h2 className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold text-white">
          {bannerTitle}
        </h2>
      </section>

      <main className="mx-auto max-w-4xl px-4 -mt-16">
        <div className="rounded-xl border border-gray-200 bg-surface p-6 shadow-lg">
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto_1fr] sm:items-end">
            <AmountInput
              amount={amount}
              onAmountChange={setAmount}
              currencyCode={fromCurrency}
              disabled={currenciesLoading}
            />
            <CurrencySelect
              id="from"
              label="From"
              currencies={currencies}
              value={fromCurrency}
              onChange={setFromCurrency}
              disabled={currenciesLoading}
            />
            <div className="flex items-end justify-center pt-2 sm:items-end sm:justify-end sm:pt-2">
              <SwapButton onSwap={swapCurrencies} />
            </div>
            <CurrencySelect
              id="to"
              label="to"
              currencies={currencies}
              value={toCurrency}
              onChange={setToCurrency}
              disabled={currenciesLoading}
            />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <ConversionResult
              amount={amount}
              fromCurrency={fromCurrencyData}
              toCurrency={toCurrencyData}
              convertedAmount={formattedConverted}
              inverseRate={formattedInverseRate}
              isLoading={ratesLoading}
            />
            <div className="flex flex-col gap-4">
              <InfoBox />
              {lastUpdatedText && (
                <p className="text-right text-xs text-text-secondary">{lastUpdatedText}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const CurrencyCard = memo(CurrencyCardComponent)
