<template>
  <div class="mb-1 grid gap-3 py-2 md:grid-cols-2">
    <Item :label="tWaka('start_date')" :value="formatDateID(data?.startDate) ?? '-'" />
    <Item :label="tWaka('end_date')" :value="formatDateID(data?.endDate) ?? '-'" />
    <Item :label="tWaka('daily_average')" :value="data?.dailyAverage ?? '-'" />
    <Item :label="tWaka('total_this_week')" :value="data?.totalThisWeek ?? '-'" />
    <Item :label="tWaka('all_time_since_joined')" :value="data?.totalAllTime ?? '-'" />
    <Item :label="tWaka('best_day')" :value="data?.bestDayText ?? '-'" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import Item from './Item.vue'
  import { formatDateID } from '@/utils/date'
  import type { WakaCombinedResult } from '@/types/wakatime'
  type Stats = NonNullable<WakaCombinedResult['stats']>
  type AllTime = NonNullable<WakaCombinedResult['all_time']>

  const { t } = useI18n()
  const tWaka = (key: string) => t(`DashboardPage.wakatime.${key}`)

  const props = defineProps<{
    stats: Stats | null
    allTime: AllTime | null
  }>()

  const data = computed(() => {
    if (!props.stats || !props.allTime) return null

    return {
      startDate: props.stats.start_date,
      endDate: props.stats.end_date,
      dailyAverage: props.stats.human_readable_daily_average,
      totalThisWeek: props.stats.human_readable_total,
      totalAllTime: props.allTime.text,
      bestDayText: props.stats.best_day?.text ?? '-',
    }
  })
</script>
