import { memo } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import type { Currency } from '@/types/currency.types'

interface CurrencySelectProps {
  id: string
  label: string
  currencies: Currency[]
  value: string
  onChange: (code: string) => void
  disabled?: boolean
}

export const CurrencySelect = memo(({
  id,
  label,
  currencies,
  value,
  onChange,
  disabled,
}: CurrencySelectProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium text-text-secondary">
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full appearance-none rounded-lg border border-gray-300 bg-surface px-3 py-2 pr-9 text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
        aria-label={label}
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
        <HiChevronDown className="h-5 w-5" aria-hidden />
      </span>
    </div>
  </div>
))

CurrencySelect.displayName = 'CurrencySelect'
