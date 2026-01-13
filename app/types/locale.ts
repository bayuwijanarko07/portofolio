// types/locale.ts
export type Locale = 'id' | 'en'

// Type untuk i18n locales
export interface AppLocale {
  code: Locale
  name: string
  iso?: string
  file?: string
  dir?: string
  domain?: string
}

// Type untuk dropdown items
export interface LocaleSwitcherItem {
  value: Locale
  label: string
  flag?: string
}