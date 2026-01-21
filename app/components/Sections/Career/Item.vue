<template>
    <ElementsCard class="flex flex-col gap-4 p-6 md:flex-row md:items-start md:gap-5">
        <ElementsImage  
            :src="logo"
            :alt="company"
            width="70"
            height="70"
            loading="lazy"
            class="shrink-0"
        />
        <div class="w-full space-y-1">
            <h6>{{ position }}</h6>
            <div class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <NuxtLink :href="link || '#'" target="_blank" rel="noopener">
                        <span class="cursor-pointer hover:text-neutral-900 hover:underline hover:dark:text-neutral-50">
                            {{ company }}
                        </span>
                    </NuxtLink>
                    <span class="hidden text-neutral-300 dark:text-neutral-700 md:inline">
                    •
                    </span>
                    <span>{{ location }}</span>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-neutral-600 dark:text-neutral-400">
                <span class="text-neutral-500 dark:text-neutral-400">
                    {{ startLabel }} - {{ endLabel }}
                </span>
                <span class="hidden md:inline text-neutral-300 dark:text-neutral-300">
                •
                </span>
                <span class="dark:text-neutral-500">
                  {{ duration }}
                </span>
                <div class="flex gap-2">
                    <span class="hidden md:inline text-neutral-300 dark:text-neutral-300">
                    •
                    </span>
                    <span class="hidden md:inline text-neutral-500 dark:text-neutral-300">{{ location_type }}</span>
                </div>
                <div class="flex gap-2">
                    <span class="hidden text-neutral-300 dark:text-neutral-700 md:block">
                    •
                    </span>
                    <span class="hidden md:inline text-neutral-500 dark:text-neutral-300">{{ type }}</span>
                </div>
            </div>
            <div class="pt-2">
                <button
                    type="button"
                    class="group inline-flex items-center gap-2 pt-2
                        text-sm font-medium
                        text-neutral-600 hover:text-neutral-800
                        dark:text-neutral-500 dark:hover:text-neutral-300
                        transition-colors
                    "
                    :aria-expanded="isOpen"
                    @click="isOpen = !isOpen"
                    >
                    <span>
                        {{ isOpen
                        ? t('ProfilPage.career.hide_detail')
                        : t('ProfilPage.career.show_detail') }}
                    </span>

                    <span
                        ref="chevronEl"
                        class="
                        inline-flex
                        origin-center
                        "
                    >
                        <Icon name="mdi-light:chevron-right" size="18" />
                    </span>
                </button>
                <div ref="sliderEl" class="overflow-hidden">
                    <div class="overflow-hidden">
                        <div class="leading-normal text-neutral-600 dark:text-neutral-400">
                            <div v-show="isOpen" class="space-y-4 pt-4 dark:border-neutral-800">
                                <CareerDetail
                                    v-if="responsibilities?.length"
                                    icon="mdi-light:format-list-checks"
                                    iclas="text-blue-500"
                                    :title="t('ProfilPage.career.sections.responsibilities')"
                                    :items="responsibilities"
                                />
                                <div class="grid gap-4 sm:grid-cols-2">
                                <CareerDetail
                                    v-if="lessons_learned?.length"
                                    icon="mdi:lightbulb-outline"
                                    iclas="text-yellow-500"
                                    :title="t('ProfilPage.career.sections.lessons_learned')"
                                    :items="lessons_learned"
                                />
                                 <CareerDetail
                                    v-if="impact?.length"
                                    icon="mdi:rocket-launch-outline"
                                    iclas="text-green-500"
                                    :title="t('ProfilPage.career.sections.impact')"
                                    :items="impact"
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </ElementsCard>
</template>
<script setup lang="ts">
    import {
        formatMonthYear,
        diffInMonths,
        formatDurationFromMonths,
    } from '@/utils/date'

    import CareerDetail from './CareerDetail.vue'
    import { useMotion } from '@vueuse/motion'
    import { useI18n } from 'vue-i18n'
    
    const { t, locale } = useI18n()

    const props = defineProps<{
        position: string
        company: string
        logo: string
        link: string
        location: string
        location_type: string
        type: string | number
        start_date: string
        end_date: string
        industry: string
        responsibilities?: string[]
        lessons_learned?: string[]
        impact?: string[]
    }>()

    const startLabel = computed(() =>
        formatMonthYear(props.start_date, locale.value as 'id' | 'en')
    )

    const endLabel = computed(() =>
        formatMonthYear(props.end_date, locale.value as 'id' | 'en') ??
        t('ProfilPage.duration.present')
    )

    const duration = computed(() =>
        formatDurationFromMonths(
            diffInMonths(props.start_date, props.end_date),
            t
        )
    )

    const isOpen = ref(false)

    const ACCORDION_SPRING = {
        type: 'spring',
        stiffness: 200,
        damping: 24,
    }

    const sliderEl = ref<HTMLElement | null>(null)
    const chevronEl = ref<HTMLElement | null>(null)

    const sliderMotion = useMotion(sliderEl, {
        initial: {
            height: 0,
            opacity: 0,
        },
    })

    const chevronMotion = useMotion(chevronEl, {
        initial: {
            rotate: 0,
        },
    })

    watch(isOpen, async (open) => {
    await nextTick()
    if (!sliderEl.value) return

    const height = open ? sliderEl.value.scrollHeight : 0

    sliderMotion.apply({
        height,
        opacity: open ? 1 : 0,
        transition: ACCORDION_SPRING,
    })

    chevronMotion.apply({
            rotate: open ? 90 : 0,
            transition: ACCORDION_SPRING,
        })
    })
</script>
