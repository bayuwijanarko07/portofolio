import { defineStore } from 'pinia'
import type {
  WakaStatsData,
  WakaAllTimeData,
  WakaCombinedResult,
} from '@/types/wakatime'

export const useWakatimeStore = defineStore('wakatime', {
  state: () => ({
    stats: null as WakaStatsData | null,
    allTime: null as WakaAllTimeData | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    // tanggal
    startDate: (s) => s.stats?.start_date ?? '-',
    endDate: (s) => s.stats?.end_date ?? '-',

    // waktu
    dailyAverage: (s) =>
      s.stats?.human_readable_daily_average ?? '-',

    totalThisWeek: (s) =>
      s.stats?.human_readable_total ?? '-',

    totalAllTime: (s) =>
      s.allTime?.text ?? '-',

    // best day
    bestDayText: (s) =>
      s.stats?.best_day?.text ?? '-',

    // bahasa teratas
    topLanguages: (s) =>
      s.stats?.languages ?? [],
  },

  actions: {
    async fetchWakatime() {
      this.loading = true
      this.error = null

      try {
        const res = await $fetch<WakaCombinedResult>('/api/wakatime')

        this.stats = res.stats
        this.allTime = res.all_time
      } catch (e: any) {
        this.error =
          e?.message ?? 'Failed to fetch WakaTime data'
      } finally {
        this.loading = false
      }
    },
  },
})
