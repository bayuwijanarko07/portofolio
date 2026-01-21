<template>
  <section class="space-y-2">
    <div class="flex items-center gap-2 text-primary">
      <Icon :name="icon" size="16" :class="iclas"/>
      <span class="text-sm font-semibold uppercase tracking-wider">
        {{ title }}
      </span>
    </div>

    <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="flex gap-2"
      >
        <span class="font-bold">✓</span>
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  items: string[]
  icon: string
  iclas: string
}>()
</script>