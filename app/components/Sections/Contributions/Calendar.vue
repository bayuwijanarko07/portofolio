<template>
  <div class="flex flex-col">
    <ul class="relative mb-1 h-5">
        <li
            v-for="month in months"
            :key="month.firstDay"
            class="absolute text-xs text-neutral-500 dark:text-neutral-400"
            :class="{ invisible: month.totalWeeks < 2 }"
            :style="{
                left: `${month.weekIndex * WEEK_WIDTH}px`
            }"
        >
            {{ month.name }}
        </li>
    </ul>

    <div class="flex justify-start gap-[2.9px] overflow-hidden">
      <div v-for="week in weeks" :key="week.firstDay">
        <span
            v-for="contribution in week.contributionDays"
            :key="contribution.date"
            class="my-[2px] block h-[12px] w-[12px] rounded-sm
                    bg-white dark:bg-neutral-800
                    transition-all duration-150
                    border-[0.1px] border-neutral-300
                    dark:border-neutral-900
                    hover:ring-2 hover:ring-neutral-400
                    dark:hover:ring-neutral-500"
            :style="
                contribution.contributionCount > 0
                ? { backgroundColor: contribution.color }
                : undefined
            "
            @mouseenter="(e) => onHover(e, contribution)"
            @mouseleave="onLeave"
            />
      </div>
    </div>
  </div>

  <div class="flex flex-wrap items-center justify-between gap-2">
    <div class="flex items-center gap-2 text-sm">
      <span class="dark:text-neutral-400">
        {{ tGithub('title_less_contribution') }}
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

      <span>{{ tGithub('title_more_contribution') }}</span>
    </div>

    <div
        v-if="tooltip.show"
        class="fixed z-50 rounded bg-neutral-900 px-2 py-1 text-xs text-white shadow-lg pointer-events-none"
        :style="{
            top: tooltip.y + 12 + 'px',
            left: tooltip.x + 12 + 'px',
        }"
        >
        <strong>{{ tooltip.count }}</strong>
        {{ locale === 'en' ? 'contributions on' : 'kontribusi pada' }}
        {{ tooltip.date }}
    </div>

  </div>
</template>

<script setup lang="ts">
    const BOX_SIZE = 12
    const COLUMN_GAP = 2.9
    const WEEK_WIDTH = BOX_SIZE + COLUMN_GAP // 14.9

    import { computed, ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import type {
        ContributionCalendar,
        ContributionDay,
        ContributionMonth,
    } from '@/types/github'

    interface CalendarProps {
        data?: ContributionCalendar
    }

    const tGithub = (key: string) => t(`DashboardPage.github.${key}`)

    const props = defineProps<CalendarProps>()

    const { t, locale } = useI18n()

    interface CalendarMonth extends ContributionMonth {
        contributionsCount: number
        weekIndex: number
    }

    const weeks = computed(() => props.data?.weeks ?? [])


    const months = computed<CalendarMonth[]>(() => {
        if (!props.data?.months) return []

        let weekIndex = 0

        return props.data.months.map((month) => {
            const currentIndex = weekIndex
            weekIndex += month.totalWeeks

            const contributionsCount = weeks.value
            .filter(
                (week) =>
                week.firstDay.slice(0, 7) === month.firstDay.slice(0, 7),
            )
            .flatMap((week) => week.contributionDays)
            .reduce((t, d) => t + d.contributionCount, 0)

            return {
            ...month,
            weekIndex: currentIndex,
            contributionsCount,
            }
        })
    })

    const tooltip = ref({
        show: false,
        x: 0,
        y: 0,
        count: 0,
        date: '',
    })

    const contributionColors = computed(() => props.data?.colors ?? [])

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

</script>
