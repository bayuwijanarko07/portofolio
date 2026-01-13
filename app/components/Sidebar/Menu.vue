<template>
  <nav class="flex flex-col gap-y-1">
    <div
      v-if="title"
      class="mb-2 ml-2 mt-1 hidden text-sm text-neutral-600 dark:text-neutral-500 lg:block"
    >
      {{ title }}
    </div>

    <SidebarMenuItem
      v-for="(item, index) in list"
      :key="index"
      v-bind="item"
    />
  </nav>
</template>

<script setup lang="ts">
    import type { MenuItemProps } from '@/types/menu'

    interface MenuProps {
        title?: string
        list: MenuItemProps[]
    }

    defineProps<MenuProps>()
</script>
