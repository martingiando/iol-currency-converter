export function formatAmount(value: number, maxDecimals = 6): string {
  if (value < 0 || !Number.isFinite(value)) return '0.000000'
  const fixed = value.toFixed(maxDecimals)
  return fixed
}

export function formatLastUpdated(isoDate: string): string {
  try {
    const normalized = isoDate.includes('T') ? isoDate : `${isoDate}T00:00:00Z`
    const date = new Date(normalized)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short',
    })
  } catch {
    return isoDate
  }
}
