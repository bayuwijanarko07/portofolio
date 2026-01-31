<template>
  <ElementsCardWrapper>
    <div class="w-full overflow-x-auto">
      <table class="border-collapse">
        <thead>
          <tr>
            <!-- kosong untuk label hari -->
            <th class="w-8"></th>

            <!-- label bulan -->
            <th
              v-for="month in months"
              :key="month.firstDay"
              :colspan="month.totalWeeks"
              class="text-xs text-neutral-500 dark:text-neutral-400 text-left px-[2px]"
            >
              {{ month.name }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(day, dayIndex) in dayLabelsFull" :key="dayIndex">
            <!-- label hari -->
            <td class="text-xs text-neutral-500 dark:text-neutral-400 pr-2">
              <span v-if="showDayLabel(dayIndex)">
                {{ day }}
              </span>
            </td>

            <!-- cell kontribusi -->
            <td
              v-for="week in weeks"
              :key="week.firstDay + '-' + dayIndex"
              class="p-[2px]"
            >
              <span
                v-if="week.contributionDays[dayIndex]"
                class="block h-[16px] w-[16px] rounded-sm
                      bg-neutral-100 dark:bg-neutral-800
                      border-[0.1px] border-neutral-300 dark:border-neutral-900
                      transition-all duration-150
                      hover:ring-2 hover:ring-neutral-400 dark:hover:ring-neutral-500"
                :style="
                  week.contributionDays[dayIndex].contributionCount > 0
                    ? { backgroundColor: week.contributionDays[dayIndex].color }
                    : undefined
                "
                @mouseenter="(e) => onHover(e, getDay(week, dayIndex)!)"
                @mouseleave="onLeave"
                @click="(e) => onHover(e, getDay(week, dayIndex)!)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap items-center justify-between gap-2 mt-2">
      <div class="flex items-center gap-2 text-sm">
        <span class="dark:text-neutral-400">
          {{ tGithub('title_less_contribution') }}
        </span>

        <ul class="flex gap-1">
          <li class="h-[15px] w-[15px] rounded-sm bg-neutral-100 dark:bg-neutral-800" />
          <li
            v-for="color in contributionColors"
            :key="color"
            class="h-[15px] w-[15px] rounded-sm"
            :style="{ backgroundColor: color }"
          />
        </ul>

        <span>{{ tGithub('title_more_contribution') }}</span>
      </div>

      <!-- Tooltip -->
      <div
        v-if="tooltip.show"
        class="fixed z-50 max-w-[220px]
              rounded bg-neutral-900 px-2 py-1
              text-xs text-white shadow-lg
              pointer-events-none
              transition-opacity duration-150"
        :style="tooltipStyle"
      >
        <strong>{{ tooltip.count }}</strong>
        {{ locale === 'en' ? 'contributions on' : 'kontribusi pada' }}
        {{ tooltip.date }}
      </div>
    </div>
  </ElementsCardWrapper>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type {
  ContributionCalendar,
  ContributionDay,
  ContributionMonth,
} from '@/types/github'

interface CalendarProps {
  data?: ContributionCalendar
}

interface CalendarMonth extends ContributionMonth {
  contributionsCount: number
  weekIndex: number
}

const { t, locale } = useI18n()
const tGithub = (key: string) => t(`DashboardPage.github.${key}`)

const props = defineProps<CalendarProps>()

const weeks = computed(() => props.data?.weeks ?? [])

const getDay = (week: any, index: number): ContributionDay | null => {
  return week.contributionDays[index] ?? null
}

// ✅ months tetap sama
const months = computed<CalendarMonth[]>(() => {
  if (!weeks.value.length) return []

  const result: CalendarMonth[] = []
  let weekIndex = 0
  const monthMap = new Map<string, CalendarMonth & { _weeks: number }>()

  for (const week of weeks.value) {
    const date = new Date(week.firstDay)
    const key = `${date.getFullYear()}-${date.getMonth()}`

    if (!monthMap.has(key)) {
      monthMap.set(key, {
        name: date.toLocaleString('en-US', { month: 'short' }),
        firstDay: week.firstDay,
        totalWeeks: 0,
        weekIndex,
        contributionsCount: 0,
        _weeks: 0,
      })
    }

    const month = monthMap.get(key)!
    month.totalWeeks++
    month._weeks++

    month.contributionsCount += week.contributionDays.reduce(
      (t, d) => t + d.contributionCount,
      0,
    )

    weekIndex++
  }

  return Array.from(monthMap.values()).map(({ _weeks, ...month }) => month)
})

// ✅ warna kontribusi
const contributionColors = computed<string[]>(() => {
  const set = new Set<string>()

  for (const week of weeks.value) {
    for (const day of week.contributionDays) {
      if (day.color) set.add(day.color)
    }
  }

  const colors = Array.from(set)

  const getBrightness = (hex: string) => {
    const c = hex.replace('#', '')
    const r = parseInt(c.substring(0, 2), 16)
    const g = parseInt(c.substring(2, 4), 16)
    const b = parseInt(c.substring(4, 6), 16)
    return r * 0.299 + g * 0.587 + b * 0.114
  }

  return colors.sort((a, b) => getBrightness(b) - getBrightness(a)).slice(1)
})

// ✅ tooltip
const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  count: 0,
  date: '',
})

const onHover = (e: MouseEvent, contribution: ContributionDay) => {
  tooltip.value = {
    show: true,
    x: e.clientX,
    y: e.clientY,
    count: contribution.contributionCount,
    date: contribution.date,
  }
}

const onLeave = () => {
  tooltip.value.show = false
}

const TOOLTIP_OFFSET = 12
const TOOLTIP_WIDTH = 220
const TOOLTIP_HEIGHT = 40

const hideTooltip = () => {
  tooltip.value.show = false
}

onMounted(() => {
  window.addEventListener('scroll', hideTooltip, true)
})

onUnmounted(() => {
  window.removeEventListener('scroll', hideTooltip, true)
})

const tooltipStyle = computed(() => {
  if (typeof window === 'undefined') return {}

  const vw = window.innerWidth
  const vh = window.innerHeight

  let left = tooltip.value.x + TOOLTIP_OFFSET
  let top = tooltip.value.y + TOOLTIP_OFFSET

  if (left + TOOLTIP_WIDTH > vw) left = vw - TOOLTIP_WIDTH - 8
  if (left < 8) left = 8

  if (top + TOOLTIP_HEIGHT > vh) top = tooltip.value.y - TOOLTIP_HEIGHT - TOOLTIP_OFFSET
  if (top < 8) top = 8

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
})

// ✅ label hari (full untuk table)
const dayLabelsFull = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const showDayLabel = (index: number) => {
  return index === 0 || index === 2 || index === 4
}
</script>

