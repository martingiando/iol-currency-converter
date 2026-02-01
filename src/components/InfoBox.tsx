import { memo } from 'react'

const DISCLAIMER =
  'We use the mid-market rate for our Converter. This is for informational purposes only. You won\'t receive this rate when sending money.'

export const InfoBox = memo(() => (
  <div className="rounded-lg bg-primary-light px-4 py-3">
    <p className="text-sm text-text-secondary">{DISCLAIMER}</p>
  </div>
))

InfoBox.displayName = 'InfoBox'
