import { WAKATIME_ACCOUNT } from '@/common/constants/wakatime'
import type { WakaCombinedResult, WakaRawResponse } from '@/types/wakatime'

export default cachedEventHandler(
  async (): Promise<WakaCombinedResult> => {
    try {
      const headers = wakaAuthHeader()
      const base = `${WAKATIME_ACCOUNT.base_url}/users/current`

      const [statsRes, allTimeRes] = await Promise.all([
        $fetch<WakaRawResponse>(`${base}/stats/last_7_days`, { headers }),
        $fetch<WakaRawResponse>(`${base}/all_time_since_today`, { headers }),
      ])

      const stats = statsRes?.data
      const allTime = allTimeRes?.data

      return {
        status: 200,
        stats: {
          start_date: stats?.start,
          end_date: stats?.end,
          last_update: stats?.modified_at,

          best_day: stats?.best_day
            ? {
                date: stats.best_day.date,
                text: stats.best_day.text,
              }
            : undefined,

          human_readable_daily_average:
            stats?.human_readable_daily_average_including_other_language,

          human_readable_total:
            stats?.human_readable_total_including_other_language,

          languages: stats?.languages ?? [],
          editors: stats?.editors ?? [],
        },

        all_time: {
          text: allTime?.text,
          total_seconds: allTime?.total_seconds,
        },
      }
    } catch (error: any) {
      return {
        status: error?.statusCode ?? 500,
        stats: null,
        all_time: null,
      }
    }
  },
  {
    maxAge: 60 * 10,
    name: 'wakatime-overview-cache',
  }
)
