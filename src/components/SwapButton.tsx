import { memo } from 'react'
import { HiArrowsRightLeft } from 'react-icons/hi2'

interface SwapButtonProps {
  onSwap: () => void
  ariaLabel?: string
}

export const SwapButton = memo(({ onSwap, ariaLabel = 'Swap currencies' }: SwapButtonProps) => (
  <button
    type="button"
    onClick={onSwap}
    aria-label={ariaLabel}
    className="flex shrink-0 items-center justify-center rounded-full border-2 border-primary-icon bg-surface p-2.5 text-primary-icon transition-colors hover:bg-primary-light "
  >
    <HiArrowsRightLeft className="h-5 w-5 text-primary-icon" aria-hidden />
  </button>
))

SwapButton.displayName = 'SwapButton'
