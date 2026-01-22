<template>
  <div
    :class="[
      'flex items-center gap-1.5 text-xl font-medium text-neutral-800 dark:text-neutral-300',
      className
    ]"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="text-xl"
    />
    <h2 class="capitalize">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        title: string
        icon?: string
        className?: string
    }>()
</script>