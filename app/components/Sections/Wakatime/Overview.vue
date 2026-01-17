<template>
  <div class="mb-1 grid gap-3 py-2 md:grid-cols-2">
    <Item :label="tWaka('start_date')" :value="formatDateID(data?.startDate) ?? '-'" />
    <Item :label="tWaka('end_date')" :value="formatDateID(data?.endDate) ?? '-'" />
    <Item :label="tWaka('daily_average')" :value="data?.dailyAverage ?? '-'" />
    <Item :label="tWaka('total_this_week')" :value="data?.totalThisWeek ?? '-'" />
    <Item :label="tWaka('all_time_since_joined')" :value="data?.totalAllTime ?? '-'" />
    <Item :label="tWaka('best_day')" :value="data?.bestDayText ?? '-'" />

    <!-- <ul>
      <li v-for="lang in data?.topLanguages ?? []" :key="lang.name">
        {{ lang.name }} - {{ lang.text }}
      </li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Item from './Item.vue'
import type { WakaCombinedResult } from '@/types/wakatime'
import { formatDateID } from '@/utils/date'

const { t } = useI18n()
const tWaka = (key: string) => t(`DashboardPage.wakatime.${key}`)

const props = defineProps<{
  data?: WakaCombinedResult
  pending: boolean
  error: any
}>()

const data = computed(() => {
  const stats = props.data?.stats
  const allTime = props.data?.all_time

  if (!stats || !allTime) return null

  return {
    startDate: stats.start_date ?? '-',
    endDate: stats.end_date ?? '-',
    dailyAverage: stats.human_readable_daily_average ?? '-',
    totalThisWeek: stats.human_readable_total ?? '-',
    totalAllTime: allTime.text ?? '-',
    bestDayText: stats.best_day?.text,
    topLanguages: stats.languages?.map(l => ({
      name: l.name,
      text: l.text,
    })) ?? [],
  }
})

</script>
