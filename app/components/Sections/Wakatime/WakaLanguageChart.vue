<template>
  <div ref="container" class="w-full overflow-x-auto"></div>
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import { ref, onMounted, watch, computed } from 'vue'
import type { WakaCombinedResult } from '@/types/wakatime'

type Stats = NonNullable<WakaCombinedResult['stats']>
type AllTime = NonNullable<WakaCombinedResult['all_time']>

type LanguageChartItem = {
  name: string
  value: number
  label: string
}

const props = defineProps<{
  stats: Stats | null
  allTime: AllTime | null
}>()

const container = ref<HTMLDivElement | null>(null)

const chartData = computed<LanguageChartItem[]>(() => {
  const languages = props.stats?.languages ?? []

  return languages
    .map(l => ({
      name: l.name,
      value: Number(l.total_seconds) || 0,
      label: l.text ?? '',
    }))
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value)
})

const draw = () => {
  if (!container.value) return
  if (!chartData.value.length) return

  container.value.innerHTML = ''

  const margin = { top: 10, right: 40, bottom: 30, left: 140 }
  const width = 600 - margin.left - margin.right
  const barHeight = 26
  const height = barHeight * chartData.value.length

  const svg = d3
    .select(container.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const maxValue = d3.max(chartData.value, d => d.value) ?? 0

  const x = d3
    .scaleLinear<number, number>()
    .domain([0, maxValue])
    .nice()
    .range([0, width])

  const y = d3
    .scaleBand<string>()
    .domain(chartData.value.map(d => d.name))
    .range([0, height])
    .padding(0.3)

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(5))

  svg
    .append('g')
    .call(d3.axisLeft(y))

  svg
    .selectAll('rect')
    .data(chartData.value)
    .enter()
    .append('rect')
    .attr('y', d => y(d.name)!)
    .attr('height', y.bandwidth())
    .attr('x', 0)
    .attr('width', d => x(d.value))
    .attr('rx', 6)
    .attr('fill', '#22c55e')

  svg
    .selectAll('.label')
    .data(chartData.value)
    .enter()
    .append('text')
    .attr('class', 'text-xs fill-neutral-700 dark:fill-neutral-300')
    .attr('x', d => x(d.value) + 6)
    .attr('y', d => y(d.name)! + y.bandwidth() / 2 + 4)
    .text(d => d.label)
}

onMounted(draw)

watch(chartData, draw, { deep: true })
</script>
