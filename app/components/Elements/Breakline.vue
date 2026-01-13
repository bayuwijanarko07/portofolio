<template>
  <div
    :class="[
      'my-4 border-t border-neutral-300 dark:border-neutral-700',
      className,
    ]"
    v-bind="$attrs"
  />
</template>
<script setup lang="ts">
    defineProps<{
    className?: string
    }>()
</script>