# Currency Converter

## How to Run

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Features

- **Initial state:** On first load, amount is 1.00 and conversion is USD (US Dollar) to EUR (Euro).
- **Live conversion:** Changing the amount or currencies recalculates the result automatically. Amount is clamped to non-negative values.
- **Swap:** One-click swap between "From" and "To" currencies.
- **Pixel-accurate UI:** Header, violet banner, white card, amount input with dynamic currency symbol, dropdowns, swap icon button, conversion result (6 decimals), inverse rate, disclaimer box, and last-updated line.
- **Debounced input:** 300 ms debounce on amount input to optimize performance while typing.
- **Smart caching:** Currencies cached permanently; rates cached for 5 minutes.
- **Error handling:** If the API fails (currencies or exchange rates), the app shows a clear error message and a "Try again" button that calls React Query's `refetch()` without reloading the page.
- **Skeleton loaders:** While data is loading, skeleton placeholders mimic the final layout (banner, inputs, swap button, result) instead of plain text.

## Tech Stack

### Core Technologies

- **React 18** — UI library
- **TypeScript** — Strict typing (no `any` allowed)
- **Vite** — Fast build tool and dev server
- **TailwindCSS** — Utility-first CSS with centralized theme
- **@tanstack/react-query** — Server state management, data fetching and caching
- **react-icons** — Icon library (using HeroIcons v2)

### Why These Technologies?

**React + TypeScript:**  
Ensures type safety and prevents runtime errors. All components, hooks, and API responses are fully typed with interfaces and proper generics.

**TailwindCSS with Centralized Theme:**  
Instead of scattered inline colors, all design tokens (primary colors, header, surface, text) are defined in `tailwind.config.js`. This makes the app maintainable and ensures design consistency. If you need to change the purple color, you only update one place.

**React Query:**  
Handles all API calls with automatic caching, background refetching, and error handling. Key benefits:
- Currencies are fetched once and cached infinitely (they don't change often)
- Exchange rates are cached for 5 minutes
- Changing the "To" currency doesn't trigger a new API call (uses cached rates)
- Automatic retry logic on failures
- Exposed `refetch` in hooks so the UI can offer a "Try again" button on API errors

## Technical Decisions

### 1. Architecture: Separation of Concerns

The app follows a clean architecture with strict separation between UI and business logic:

```
Components (Presentation) → Custom Hooks (Business Logic) → Services (API Calls)
```

- **Components** are purely presentational. They receive props and render UI. No API calls or complex logic.
- **Custom Hooks** (`useCurrencies`, `useExchangeRates`, `useCurrencyConverter`) contain all business logic: state management, calculations, side effects.
- **Services** handle raw API calls. They return typed responses that React Query manages.

### 2. Performance Optimizations

- **`React.memo`** on all components to prevent unnecessary re-renders
- **`useMemo`** for expensive calculations (currency conversion, inverse rate)
- **`useCallback`** for event handlers passed to child components
- **Debounced input** (300 ms) to limit conversion recalculations while typing
- **React Query caching** to avoid redundant API calls

### 3. Dynamic Currency Symbol

The amount input shows a currency symbol based on the "From" currency (e.g., "$" for USD, "€" for EUR). Common symbols are mapped in `utils/currencySymbol.ts`, with fallback to the currency code for less common currencies.

### 4. Smart Caching Strategy

- **Currencies:** `staleTime: Infinity` — Fetched once, never refetched (currency names don't change)
- **Exchange Rates:** `staleTime: 5 minutes` — Cached for 5 min, refetched in background after expiry
- **Query Key:** `['rates', baseCurrency]` — Only the base currency is in the key. Changing "To" currency uses the same cached rates object (since the API returns rates for all currencies)

### 5. Validation and UX

- Amount input accepts only numbers and one decimal point (max 6 decimals)
- Amount is always ≥ 0 (negative values are clamped to 0)
- On blur, amount is formatted to 2 decimals for consistency
- Converted result shows up to 6 decimals for precision
- Inverse rate displayed to help users understand the exchange rate both ways

### 6. Error Handling and Refetch

When the API fails (currencies or exchange rates), the app does not crash. Instead:

- **Currencies error:** The card shows an `ErrorAlert` with a message and a "Try again" button. The button calls `refetch()` from `useCurrencies`, which React Query exposes. No page reload.
- **Rates error:** Only the conversion result area shows an `ErrorAlert` with "Try again"; the rest of the form (amount, dropdowns, swap) stays usable. The button calls `refetch()` from `useExchangeRates` (exposed as `retryRates` by `useCurrencyConverter`).

Both hooks (`useCurrencies`, `useExchangeRates`) return `refetch` so the UI can trigger a retry on demand. Error states are derived from React Query's `isError` and rendered via the reusable `ErrorAlert` component (title, message, optional `onRetry`).

### 7. Skeleton Loaders

While data is loading, the app shows skeleton placeholders instead of "Loading…" text:

- **CurrencyCardSkeleton:** Full loading state when currencies are being fetched (banner + card with skeleton inputs and result). Used as a separate component so `CurrencyCard` stays simple.
- **SkeletonResult:** Used inside `ConversionResult` when rates are loading (replaces the conversion result block).
- **Skeleton** and **SkeletonInput:** Base building blocks (animated with Tailwind's `animate-pulse`).

This improves perceived performance and keeps the layout stable during loading.

### 8. Constants for Default Values

Instead of hardcoding `'USD'` and `'EUR'` throughout the codebase, default currencies are defined in `src/constants/currency.ts`:

```typescript
export const DEFAULT_FROM_CURRENCY = 'USD'
export const DEFAULT_TO_CURRENCY = 'EUR'
```

## Project Structure

```
src/
  components/        Presentational UI components
    Header.tsx
    CurrencyCard.tsx
    CurrencyCardSkeleton.tsx
    AmountInput.tsx
    CurrencySelect.tsx
    SwapButton.tsx
    ConversionResult.tsx
    ErrorAlert.tsx
    InfoBox.tsx
    Skeleton.tsx
    SkeletonInput.tsx
    SkeletonResult.tsx
  hooks/             Custom hooks with business logic
    useCurrencies.ts
    useExchangeRates.ts
    useCurrencyConverter.ts
  services/          API client functions
    api.ts
  types/             TypeScript interfaces and types
    currency.types.ts
  utils/             Pure utility functions
    formatters.ts
    debounce.ts
    currencySymbol.ts
  constants/         App-wide constants
    currency.ts
  App.tsx
  main.tsx
```

### Component Responsibilities

- **Header:** Static app title
- **CurrencyCard:** Main container; orchestrates all sub-components; shows `CurrencyCardSkeleton` when currencies load, `ErrorAlert` on API errors, or the form and result
- **CurrencyCardSkeleton:** Full loading state (banner + card with skeleton inputs and result) while currencies are fetched
- **AmountInput:** Controlled input with debounce, validation, and dynamic symbol
- **CurrencySelect:** Dropdown for selecting currencies
- **SwapButton:** Button to swap "From" and "To" currencies
- **ConversionResult:** Displays conversion result and inverse rate; shows `SkeletonResult` while rates load
- **ErrorAlert:** Reusable error message with optional "Try again" button (uses centralized `.btn-error` in CSS)
- **InfoBox:** Disclaimer about mid-market rates
- **Skeleton, SkeletonInput, SkeletonResult:** Reusable skeleton placeholders for loading states