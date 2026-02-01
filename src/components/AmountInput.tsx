import { memo, useState, useCallback, useEffect, useRef } from 'react'
import { getCurrencyDisplaySymbol } from '@/utils/currencySymbol'
import { debounce } from '@/utils/debounce'
import { formatAmount } from '@/utils/formatters'

const INPUT_DEBOUNCE_MS = 300

interface AmountInputProps {
  amount: number
  onAmountChange: (value: number) => void
  currencyCode: string
  disabled?: boolean
}

export const AmountInput = memo(({ amount, onAmountChange, currencyCode, disabled }: AmountInputProps) => {
  const [inputValue, setInputValue] = useState(formatAmount(amount, 2))
  const isControlled = useRef(false)

  const debouncedOnChange = useRef(debounce((value: number) => onAmountChange(value), INPUT_DEBOUNCE_MS)).current

  useEffect(() => {
    if (!isControlled.current) {
      setInputValue(formatAmount(amount, 2))
    }
  }, [amount])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, '')
      const parts = raw.split('.')
      const decimalPart = parts[1] ?? ''
      const validDecimal = decimalPart.slice(0, 6)
      const normalized = parts.length > 1 ? `${parts[0]}.${validDecimal}` : parts[0] || '0'
      setInputValue(normalized || '0')
      isControlled.current = true
      const num = parseFloat(normalized)
      if (!Number.isNaN(num)) {
        debouncedOnChange(num < 0 ? 0 : num)
      }
    },
    [debouncedOnChange]
  )

  const handleBlur = useCallback(() => {
    isControlled.current = false
    const num = parseFloat(inputValue)
    const safe = Number.isNaN(num) || num < 0 ? 0 : num
    setInputValue(formatAmount(safe, 2))
    onAmountChange(safe)
  }, [inputValue, onAmountChange])

  const symbol = getCurrencyDisplaySymbol(currencyCode)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="amount" className="text-sm font-medium text-text-secondary">
        Amount
      </label>
      <div className="flex items-center rounded-lg border border-gray-300 bg-surface px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <span className="text-text-primary mr-2 select-none">{symbol}</span>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent text-text-primary outline-none placeholder:text-gray-400"
          aria-label="Amount to convert"
        />
      </div>
    </div>
  )
})

AmountInput.displayName = 'AmountInput'
