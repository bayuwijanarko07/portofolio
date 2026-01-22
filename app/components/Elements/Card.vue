<template>
  <div
    ref="divRef"
    tabindex="0"
    @mousemove="handleMouseMove"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="[
      'relative overflow-hidden rounded-2xl border-[1.5px] border-neutral-300 bg-white dark:border-neutral-800 dark:bg-neutral-900',
      className,
    ]"
  >
    <div
      class="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
      :style="{
        opacity,
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
      }"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface Position {
    x: number
    y: number
  }

  const props = withDefaults(
    defineProps<{
      className?: string
      spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
    }>(),
    {
      className: '',
      spotlightColor: 'rgba(255, 255, 255, 0.25)',
    }
  )

  const divRef = ref<HTMLDivElement | null>(null)
  const isFocused = ref(false)
  const position = ref<Position>({ x: 0, y: 0 })
  const opacity = ref(0)

  function handleMouseMove(e: MouseEvent) {
    if (!divRef.value || isFocused.value) return

    const rect = divRef.value.getBoundingClientRect()
    position.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function handleFocus() {
    isFocused.value = true
    opacity.value = 0.6
  }

  function handleBlur() {
    isFocused.value = false
    opacity.value = 0
  }

  function handleMouseEnter() {
    opacity.value = 0.6
  }

  function handleMouseLeave() {
    opacity.value = 0
  }
</script>
