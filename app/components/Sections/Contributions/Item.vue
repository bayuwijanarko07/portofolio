<template>
  <ElementsCard class="flex flex-col bg-neutral-100 p-4">
    <span class="text-sm dark:text-neutral-400">
      {{ label }}
    </span>
    <div class="text-xl font-bold text-blue-500 lg:text-2xl">
      {{ value }}
      <span
        v-if="unit"
        class="ml-1 text-sm font-normal dark:text-neutral-400"
      >
        {{' ' + unit }}
      </span>
    </div>
  </ElementsCard>
</template>


<script setup lang="ts">
  withDefaults(
    defineProps<{
      label: string
      value: number
      unit?: string
    }>(),
    {
      unit: '',
    }
  )
</script>