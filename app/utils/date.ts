import { format, formatDistanceToNowStrict } from 'date-fns'
import { id } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'

const JAKARTA_TZ = 'Asia/Jakarta'

export const formatRelativeJakarta = (date: string | Date) => {
  const zonedDate = toZonedTime(
    typeof date === 'string' ? new Date(date) : date,
    JAKARTA_TZ
  )

  return formatDistanceToNowStrict(zonedDate, {
    addSuffix: true,
    locale: id,
  })
}

export const formatDateID = (
  date?: string | Date | null,
  formatStr = 'dd MMMM yyyy'
) => {
  if (!date) return '-'

  const zonedDate = toZonedTime(
    typeof date === 'string' ? new Date(date) : date,
    JAKARTA_TZ
  )

  return format(zonedDate, formatStr, {
    locale: id,
  })
}

export type Locale = 'id' | 'en'

export const parseYearMonth = (
  value?: string | null
): { year: number; month: number } | null => {
  if (!value) return null

  const match = value.match(/^(\d{4})-(\d{1,2})$/)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])

  if (month < 1 || month > 12) return null

  return { year, month }
}

export const formatMonthYear = (
  value?: string | null,
  locale: Locale = 'id'
): string | null => {
  const parsed = parseYearMonth(value)
  if (!parsed) return null

  const date = new Date(parsed.year, parsed.month - 1, 1)

  return date.toLocaleDateString(
    locale === 'id' ? 'id-ID' : 'en-US',
    {
      month: 'short',
      year: 'numeric',
    }
  )
}

export const diffInMonths = (
  start?: string | null,
  end?: string | null
): number => {
  const s = parseYearMonth(start)
  if (!s) return 0

  const e =
    parseYearMonth(end) ??
    (() => {
      const now = new Date()
      return {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      }
    })()

  return (e.year - s.year) * 12 + (e.month - s.month)
}

export const formatDurationFromMonths = (
  totalMonths: number,
  t: (key: string) => string
): string => {
  if (totalMonths <= 0) {
    return `0 ${t('ProfilPage.duration.months')}`
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const parts: string[] = []

  if (years > 0) {
    parts.push(
      `${years} ${
        years > 1 ? t('ProfilPage.duration.years') : t('ProfilPage.duration.year')
      }`
    )
  }

  if (months > 0) {
    parts.push(
      `${months} ${
        months > 1 ? t('ProfilPage.duration.months') : t('ProfilPage.duration.month')
      }`
    )
  }

  return parts.join(' ')
}