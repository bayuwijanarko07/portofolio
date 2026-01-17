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
