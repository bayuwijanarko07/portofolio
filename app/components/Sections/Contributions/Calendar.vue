<template>
  <div class="relative flex flex-col">
    <!-- MONTH LABEL -->
    <ul
      class="flex justify-end gap-[3px] overflow-hidden text-xs dark:text-neutral-400 md:justify-start"
    >
      <li
        v-for="month in months"
        :key="month.firstDay"
        :class="{ invisible: month.totalWeeks < 2 }"
      >
        {{ month.name }}
      </li>
    </ul>

    <!-- CALENDAR GRID -->
    <div class="flex justify-start gap-[2.9px] overflow-hidden">
      <div v-for="week in weeks" :key="week.firstDay">
        <span
          v-for="contribution in week.contributionDays"
          :key="contribution.date"
          class="my-[2px] block h-[12px] w-[12px] rounded-sm bg-neutral-300 dark:bg-neutral-800 transition-colors"
          :style="
            contribution.contributionCount > 0
              ? { backgroundColor: contribution.color }
              : undefined
          "
          @mouseenter="onHover(contribution)"
          @mouseleave="onLeave"
        />
      </div>
    </div>
  </div>

  <!-- LEGEND + TOOLTIP -->
  <div class="flex flex-wrap items-center justify-between gap-2">
    <div class="flex items-center gap-2 text-sm">
      <span class="dark:text-neutral-400">
        {{ t('title_less_contribution') }}
      </span>

      <ul class="flex gap-1">
        <li class="h-[10px] w-[10px] rounded-sm bg-neutral-300 dark:bg-neutral-800" />
        <li
          v-for="color in contributionColors"
          :key="color"
          class="h-[10px] w-[10px] rounded-sm"
          :style="{ backgroundColor: color }"
        />
      </ul>

      <span>{{ t('title_more_contribution') }}</span>
    </div>

    <div
      class="rounded bg-neutral-200 px-2 text-sm transition-opacity dark:bg-neutral-700"
      :class="selectContribution.date ? 'opacity-100' : 'opacity-0'"
    >
      {{ selectContribution.count }}
      {{ locale === 'en' ? 'contributions on' : 'kontribusi pada' }}
      {{ selectContribution.date }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type {
  ContributionCalendar,
  ContributionDay,
  ContributionMonth,
} from '@/types/github'

/* =========================
   PROPS
========================= */
interface CalendarProps {
  data?: ContributionCalendar
}

const props = defineProps<CalendarProps>()

/* =========================
   I18N
========================= */
const { t, locale } = useI18n()

/* =========================
   HOVER STATE
========================= */
const selectContribution = ref<{
  count: number | null
  date: string | null
}>({
  count: null,
  date: null,
})

/* =========================
   UI TYPE (INTERNAL)
========================= */
interface CalendarMonth extends ContributionMonth {
  contributionsCount: number
}

/* =========================
   COMPUTED DATA
========================= */
const weeks = computed(() => props.data?.weeks ?? [])

const months = computed<CalendarMonth[]>(() => {
  if (!props.data?.months) return []

  return props.data.months.map((month) => {
    const contributions = weeks.value
      .filter(
        (week) =>
          week.firstDay.slice(0, 7) === month.firstDay.slice(0, 7),
      )
      .flatMap((week) => week.contributionDays)

    const contributionsCount = contributions.reduce(
      (total, item) => total + item.contributionCount,
      0,
    )

    return {
      ...month,
      contributionsCount,
    }
  })
})

const contributionColors = computed(() => props.data?.colors ?? [])

/* =========================
   EVENTS
========================= */
const onHover = (contribution: ContributionDay) => {
  selectContribution.value = {
    count: contribution.contributionCount,
    date: contribution.date,
  }
}

const onLeave = () => {
  selectContribution.value = { count: null, date: null }
}
</script>
