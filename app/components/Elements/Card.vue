<template>
  <div
    ref="divRef"
    class="rounded-2xl border-[1.5px] border-neutral-300 bg-white dark:border-neutral-800 dark:bg-neutral-900"
  >
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
