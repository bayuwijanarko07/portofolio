export type Locale = 'id' | 'en'

export interface AppLocale {
  code: Locale
  name: string
  iso?: string
  file?: string
  dir?: string
  domain?: string
}

export interface LocaleSwitcherItem {
  value: Locale
  label: string
  flag?: string
}