<template>
  <div class="grid grid-cols-2 gap-3 py-2 sm:grid-cols-4">
    <Item
      :label="tGithub('title_total_contribution')"
      :value="totalContributions"
    />

    <Item
      :label="tGithub('title_total_this_week_contribution')"
      :value="totalThisWeekContribution"
    />

    <Item
      :label="tGithub('title_best_contribution')"
      :value="bestContribution"
    />

    <Item
      :label="tGithub('title_average_contribution')"
      :value="averageContribution"
      :unit="'/' + tGithub('unit')"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import Item from './Item.vue'
  import { useI18n } from '#imports'
  const { t } = useI18n()

  const tGithub = (key: string) => t(`DashboardPage.github.${key}`)

  interface ContributionDay {
    contributionCount: number
  }

  interface Week {
    contributionDays: ContributionDay[]
  }

  interface OverviewData {
    totalContributions?: number
    weeks?: Week[]
  }

  const props = defineProps<{
    data?: OverviewData
  }>()

  const totalContributions = computed(
    () => props.data?.totalContributions ?? 0
  )

  const weeks = computed(
    () => props.data?.weeks ?? []
  )

  const totalThisWeekContribution = computed(() => {
    const lastWeek = weeks.value.at(-1)
    return (
      lastWeek?.contributionDays?.reduce(
        (sum, item) => sum + item.contributionCount,
        0
      ) ?? 0
    )
  })

  const totalContributionList = computed(() =>
    weeks.value.flatMap(week =>
      week.contributionDays.map(day => day.contributionCount)
    )
  )

  const bestContribution = computed(() =>
    totalContributionList.value.length
      ? Math.max(...totalContributionList.value)
      : 0
  )

  const averageContribution = computed(() => {
    const days = totalContributionList.value.length
    return days
      ? Math.round(totalContributions.value / days)
      : 0
  })
</script>