import { WAKATIME_ACCOUNT } from '@/common/constants/wakatime'
import type {
  WakaCombinedResult,
  WakaRawResponse,
} from '@/types/wakatime'
import { wakaAuthHeader } from '../utils/wakaAuthHeader'

export default defineEventHandler(async (): Promise<WakaCombinedResult> => {
  try {
    const headers = wakaAuthHeader()

    const [statsRes, allTimeRes] = await Promise.all([
      $fetch<WakaRawResponse>(
        `${WAKATIME_ACCOUNT.baseUrl}${WAKATIME_ACCOUNT.stats_endpoint}/last_7_days`,
        { headers }
      ),
      $fetch<WakaRawResponse>(
        `${WAKATIME_ACCOUNT.baseUrl}${WAKATIME_ACCOUNT.all_time_endpoint}`,
        { headers }
      ),
    ])

    const stats = statsRes?.data
    const allTime = allTimeRes?.data

    return {
      status: 200,

      stats: {
        start_date: stats?.start,
        end_date: stats?.end,
        last_update: stats?.modified_at,
        best_day: {
          date: stats?.best_day?.date,
          text: stats?.best_day?.text,
        },
        human_readable_daily_average:
          stats?.human_readable_daily_average_including_other_language,
        human_readable_total:
          stats?.human_readable_total_including_other_language,
        // languages: stats?.languages?.slice(0, 6),
        // editors: stats?.editors,
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
})
