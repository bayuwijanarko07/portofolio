<template>
  <div class="min-h-screen xl:flex bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
    <Sidebar/>
     <SidebarBackdrop />
      <main class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
      >
        <SidebarHeader />
        <div class="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <slot />
        </div>
      </main>
  </div>
</template>

<script setup lang="ts">
  import { useSidebar } from '@/composables/useSidebar'

  const { isExpanded, isHovered } = useSidebar()
</script>
