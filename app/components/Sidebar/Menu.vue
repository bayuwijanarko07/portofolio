<template>
  <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
    <nav class="mb-6">
      <ul class="flex flex-col gap-1">
        <SidebarMenuItem
          v-for="(item, index) in list"
          :key="index"
          v-bind="item"
        />
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
    import type { MenuProps } from '@/types/menu'
    defineProps<MenuProps>()
</script>
