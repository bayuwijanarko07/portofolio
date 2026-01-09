<script setup>

const locales = [
  { value: 'id', flag: 'ID' },
  { value: 'en', flag: 'US' }
]

const currentIndex = ref(0)
const isPending = ref(false)

const totalWidth = 40 * locales.length
const slidePosition = 0

const handleLocaleChange = (value) => {
  if (isPending.value) return

  isPending.value = true
  currentIndex.value = locales.findIndex(l => l.value === value)

  setTimeout(() => {
    isPending.value = false
  }, 300)
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="relative hidden items-center gap-1 rounded-full border-[1.5px]
             border-neutral-300 bg-neutral-100 p-1
             dark:border-neutral-700 dark:bg-neutral-800 lg:flex"
      :class="isPending ? 'pointer-events-none opacity-70' : ''"
      :style="{ width: `${totalWidth + (locales.length - 1) * 4 + 10}px` }"
    >
      <Motion
        class="absolute bottom-1 top-1 w-10 rounded-full bg-green-500"
        :animate="{ x: slidePosition + currentIndex * 44 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
      />
      <button
        v-for="(locale, index) in locales"
        :key="locale.value"
        class="relative z-10 flex h-8 w-10 items-center justify-center"
        :disabled="isPending"
        @click="handleLocaleChange(locale.value)"
      >
        <Motion
          class="text-xs font-medium"
          :animate="{
            color: currentIndex === index ? '#FFFFFF' : '#737373'
          }"
          :while-hover="!isPending ? { scale: 1.15 } : {}"
          :while-tap="!isPending ? { scale: 0.9 } : {}"
          :transition="{ duration: 0.3, ease: 'easeInOut' }"
        >
          {{ locale.flag }}
        </Motion>
      </button>
    </div>
  </div>
</template>
