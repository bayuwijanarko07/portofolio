<template>
  <label class="cursor-pointer">

    <input
      type="checkbox"
      :checked="isDark"
      class="sr-only"
    />
    
    <div
      class="relative flex h-10 w-20 items-center bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-300 dark:border-neutral-700 p-1 transition-color"
    >
      <div
        ref="sliderEl"
        class="absolute bottom-1 top-1 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700"
      />
      
      <div class="flex w-full items-center justify-between px-2">
        <div 
          ref="sunEl" 
          class="relative z-10 flex items-center p-2 -m-2"
          @click="setLightMode"
        >
          <Icon
            name="mdi:white-balance-sunny"
            class="p-1 rounded-full text-yellow-500 hover:text-yellow-600 dark:text-yellow-300 hover:dark:text-yellow-400 transition-colors duration-300"
          />
        </div>
        
        <div 
          ref="moonEl" 
          class="relative z-10 flex items-center p-2 -m-2"
          @click="setDarkMode"
        >
          <Icon
            name="mdi:weather-night"
            class="p-1 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100 transition-colors duration-300"
          />
        </div>
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMotion } from '@vueuse/motion'

const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const sliderEl = ref<HTMLElement>()
const sunEl = ref<HTMLElement>()
const moonEl = ref<HTMLElement>()

const sliderMotion = useMotion(sliderEl)
const sunMotion = useMotion(sunEl)
const moonMotion = useMotion(moonEl)

const setLightMode = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
  isDark.value = false
}

const setDarkMode = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
  isDark.value = true
}

watch(isDark, (val) => {
  sliderMotion.apply({
    x: val ? 38 : 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  })

  sunMotion.apply({
    opacity: val ? 0.4 : 1,
    scale: val ? 0.9 : 1,
    transition: { 
      duration: 0.2,
      ease: 'easeInOut'
    },
  })

  moonMotion.apply({
    opacity: val ? 1 : 0.4,
    scale: val ? 1 : 0.9,
    transition: { 
      duration: 0.2,
      ease: 'easeInOut'
    },
  })
}, { immediate: true })
</script>