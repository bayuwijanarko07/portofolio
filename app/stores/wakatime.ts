import { defineStore } from 'pinia'
import type { WakaCombinedResult } from '@/types/wakatime'

export const useWakatimeStore = defineStore('wakatime', {
    state: () => ({
        data: null as WakaCombinedResult | null,
        pending: false,
        error: null as any,
    }),

    getters: {
        stats: (state) => state.data?.stats ?? null,
        allTime: (state) => state.data?.all_time ?? null,

        languages: (state) =>
            state.data?.stats?.languages ?? [],

        editors: (state) =>
            state.data?.stats?.editors ?? [],

        bestDay: (state) =>
            state.data?.stats?.best_day ?? null,

        lastUpdate: (state) =>
            state.data?.stats?.last_update ?? null,

        dateRange: (state) => {
            const s = state.data?.stats
            if (!s) return null

            return {
            start: s.start_date,
            end: s.end_date,
            }
        },

        totalAllTimeSeconds: (state) =>
            state.data?.all_time?.total_seconds ?? 0,

        totalAllTimeText: (state) =>
            state.data?.all_time?.text ?? '-',

        languageChartData: (state) =>
            (state.data?.stats?.languages ?? []).map(l => ({
                name: l.name,
                value: l.total_seconds,
                label: l.text,
        })),
    },

    actions: {
        async fetch() {
            this.pending = true
            this.error = null

            try {
                this.data = await $fetch<WakaCombinedResult>('/api/wakatime')
            } catch (e) {
                this.error = e
            } finally {
                this.pending = false
            }
        },
    },
})
