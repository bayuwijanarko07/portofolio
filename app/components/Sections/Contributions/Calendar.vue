<template>
    <div class="w-full overflow-x-auto lg:overflow-x-auto">
        <div class="min-w-max">
            <ul class="relative mb-1 h-5">
                <li
                    v-for="month in months"
                    :key="month.firstDay"
                    class="absolute text-xs text-neutral-500 dark:text-neutral-400"
                    :class="{ invisible: month.totalWeeks < 2 }"
                    :style="{
                        left: `${DAY_LABEL_WIDTH + month.weekIndex * WEEK_WIDTH}px`
                    }"
                >
                    {{ month.name }}
                </li>
            </ul>

            <div class="flex">
                <div class="mr-2 flex flex-col justify-start">
                    <span
                        v-for="(day, i) in dayLabels"
                        :key="day"
                        class="my-[2px] h-[12px] text-xs text-neutral-500 dark:text-neutral-400"
                        :class="{ invisible: !showDayLabel(i) }"
                        >
                        {{ day }}
                    </span>
                </div>
                <div class="flex justify-start gap-[2px] sm:gap-[2.5px] md:gap-[2.9px]">
                    <div v-for="week in weeks" :key="week.firstDay">
                        <span
                            v-for="contribution in week.contributionDays"
                            :key="contribution.date"
                            class="my-[2px] block h-[15px] w-[15px] rounded-sm
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
                            @click="(e) => onHover(e, contribution)"
                            />
                    </div>
                </div>
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
</template>

<script setup lang="ts">
    const DAY_LABEL_WIDTH = 32
    const BOX_SIZE = 15
    const COLUMN_GAP = 2.9
    const WEEK_WIDTH = BOX_SIZE + COLUMN_GAP

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

    interface CalendarMonth extends ContributionMonth {
        contributionsCount: number
        weekIndex: number
    }

    const { t, locale } = useI18n()

    const tGithub = (key: string) => t(`DashboardPage.github.${key}`)

    const props = defineProps<CalendarProps>()

    const weeks = computed(() => props.data?.weeks ?? [])

    const months = computed<CalendarMonth[]>(() => {
        if (!weeks.value?.length) return []

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

    const contributionColors = computed<string[]>(() => {
        if (!weeks.value?.length) return []

        const set = new Set<string>()

        for (const week of weeks.value) {
            for (const day of week.contributionDays) {
            set.add(day.color)
            }
        }

        return Array.from(set)
    })

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

        if (left + TOOLTIP_WIDTH > vw) {
            left = vw - TOOLTIP_WIDTH - 8
        }
        if (left < 8) left = 8

        if (top + TOOLTIP_HEIGHT > vh) {
            top = tooltip.value.y - TOOLTIP_HEIGHT - TOOLTIP_OFFSET
        }
        if (top < 8) top = 8

        return {
            left: `${left}px`,
            top: `${top}px`,
        }
    })

    const onLeave = () => {
        tooltip.value.show = false
    }

    const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', '']

    const showDayLabel = (index: number) => {
        return index === 0 || index === 2 || index === 4
    }

</script>
