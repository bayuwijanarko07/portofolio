<template>
  <ElementsCardWrapper>
    <div ref="container" class="w-full sm:w-[360px] md:w-[220px] aspect-[4/3] mt-4 mx-auto">
      <svg ref="svg" class="w-full h-full"></svg>
    </div>
  </ElementsCardWrapper>
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue'
import { useColorMode } from '#imports'

interface AllTimeContribution {
  commits: number
  issues: number
  pullRequests: number
  pullRequestReviews: number
  total: number
}

const props = defineProps<{
  data: AllTimeContribution | null
}>()

const svg = ref<SVGSVGElement | null>(null)
const container = ref<HTMLDivElement | null>(null)

const colorMode = useColorMode()

const colors = computed(() => ({
  axis: colorMode.value === 'dark' ? '#4ade80' : '#22c55e',
  label: colorMode.value === 'dark' ? '#e5e7eb' : '#475569',
  dot: colorMode.value === 'dark' ? '#4ade80' : '#22c55e'
}))

let resizeObserver: ResizeObserver | null = null

const createLabel = (
  root: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  x: number,
  y: number,
  title: string,
  value: number,
  total: number,
  color: string
) => {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100)

  const text = root.append('text')
    .attr('x', x)
    .attr('y', y)
    .attr('fill', color)
    .attr('font-size', 12)

  text.append('tspan').text(title)
  text.append('tspan')
    .attr('x', x)
    .attr('dy', '1.2em')
    .attr('font-weight', 600)
    .text(`${percent}%`)
}

const draw = () => {
  if (!svg.value || !container.value || !props.data) return

  const { width } = container.value.getBoundingClientRect()
  const height = width * 0.75
  const radius = Math.min(width, height) * 0.35

  const {
    commits,
    issues,
    pullRequests,
    pullRequestReviews,
    total
  } = props.data

  const scale = d3.scaleLinear()
    .domain([0, total])
    .range([0, radius])

  const cx = width / 2
  const cy = height / 2

  const root = d3.select(svg.value)
  root.selectAll('*').remove()
  root.attr('viewBox', `0 0 ${width} ${height}`)

  // axis
  root.append('line')
    .attr('x1', cx - radius)
    .attr('y1', cy)
    .attr('x2', cx + radius)
    .attr('y2', cy)
    .attr('stroke', colors.value.axis)

  root.append('line')
    .attr('x1', cx)
    .attr('y1', cy - radius)
    .attr('x2', cx)
    .attr('y2', cy + radius)
    .attr('stroke', colors.value.axis)

  const dot = (x: number, y: number) =>
    root.append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 5)
      .attr('fill', colors.value.dot)

  dot(cx - scale(commits), cy)
  dot(cx + scale(issues), cy)
  dot(cx, cy + scale(pullRequests))
  dot(cx, cy - scale(pullRequestReviews))

  createLabel(root, cx - radius - 70, cy - 10, 'Commits', commits, total, colors.value.label)
  createLabel(root, cx + radius + 10, cy - 10, 'Issues', issues, total, colors.value.label)
  createLabel(root, cx - 50, cy - radius - 30, 'Code reviews', pullRequestReviews, total, colors.value.label)
  createLabel(root, cx - 55, cy + radius + 15, 'Pull requests', pullRequests, total, colors.value.label)
}

onMounted(() => {
  draw()

  resizeObserver = new ResizeObserver(draw)
  if (container.value) {
    resizeObserver.observe(container.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

watch(() => props.data, draw)
watch(() => colorMode.value, draw)
</script>

