import { memo } from 'react'

function HeaderComponent() {
  return (
    <header className="bg-header text-white px-6 py-4">
      <h1 className="text-lg font-medium tracking-tight">Currency Converter</h1>
    </header>
  )
}

export const Header = memo(HeaderComponent)
