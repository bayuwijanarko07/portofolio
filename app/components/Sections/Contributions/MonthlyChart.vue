<template>
  <ClientOnly>
    <div class="rounded-2xl">
      <h3 class="mb-4 text-sm font-semibold text-white">
        Monthly Contributions
      </h3>

      <div class="h-[260px]">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'
import type { ContributionCalendar } from '@/types/github'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

interface CalendarProps {
  data?: ContributionCalendar
}

const props = defineProps<CalendarProps>()

const months = computed(() => {
  if (!props.data?.weeks?.length) return []

  const monthMap = new Map<
    string,
    { name: string; contributionsCount: number }
  >()

  for (const week of props.data.weeks) {
    const date = new Date(week.firstDay)
    const key = `${date.getFullYear()}-${date.getMonth()}`

    if (!monthMap.has(key)) {
      monthMap.set(key, {
        name: date.toLocaleString('en-US', { month: 'short' }),
        contributionsCount: 0,
      })
    }

    monthMap.get(key)!.contributionsCount +=
      week.contributionDays.reduce(
        (t, d) => t + d.contributionCount,
        0
      )
  }

  return Array.from(monthMap.values())
})

const chartData = computed(() => ({
  labels: months.value.map(m => m.name),
  datasets: [
    {
      data: months.value.map(m => m.contributionsCount),
      backgroundColor: '#5B6CFF',
      borderRadius: 1,
      barThickness: 18,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#94A3B8',
        font: { size: 12 },
      },
    },
    y: {
      grid: {
        color: 'rgba(255,255,255,0.06)',
      },
      ticks: {
        color: '#94A3B8',
        font: { size: 12 },
      },
    },
  },
}
</script>
