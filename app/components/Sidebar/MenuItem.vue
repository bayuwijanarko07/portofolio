<template>
  <li>
    <div v-if="isHashLink" class="cursor-pointer">
      <div :class="[activeClasses, props.class]">
        <Icon :name="icon" :size="props.iconSize" />
        <span v-if="isSidebarOpen">{{ tNav(title) }}</span>
      </div>
    </div>

    <NuxtLink
      v-else
      :to="!isHashLink ? props.href : undefined"
      :target="isExternalUrl ? '_blank' : undefined"
      :aria-current="isActiveRoute ? 'page' : undefined"
      class="cursor-pointer"
      @click="handleMobileNavigate"
    >
      <div :class="[activeClasses, props.class]">
        <Icon
          :name="icon"
          :size="props.iconSize"
          :class="isActiveRoute && 'transition-all duration-300 animate-pulse bg-blue-500'"
        />
        <span
          v-if="isSidebarOpen"
          class="menu-item-text flex-grow"
          :class="isActiveRoute && 'text-blue-500'"
          >{{ tNav(`${title}`) }}</span
        >
        <div v-if="!isSidebarOpen" class="absolute left-full ml-2 hidden group-hover:block">
          <span class="px-2 py-1 text-xs rounded bg-neutral-800 text-white">
            {{ tNav(`${title}`) }}
          </span>
        </div>
        <Icon
          v-if="isActiveRoute && !props.isExclusive && isSidebarOpen"
          name="mdi:arrow-right"
          class="animate-pulse bg-blue-500"
        />
        <Icon
          v-if="isExternalUrl && isHovered && !isExclusive"
          name="mdi:arrow-top-right"
          :size="props.iconSize"
          class="text-blue-500 transition-all duration-300"
        />

      </div>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import type { MenuItemProps } from '@/types/menu'

  import { useSidebar } from "@/composables/useSidebar";

  const { isExpanded, isMobileOpen, isHovered , toggleMobileSidebar } = useSidebar();

  const props = defineProps<MenuItemProps>()

  const route = useRoute()
  const { t } = useI18n()
  const tNav = (key: string) => t(`Navigation.${key}`)

  const isExternalUrl = computed(() => props.href?.startsWith('http'))
  const isHashLink = computed(() => props.href === '#')
  const isActiveRoute = computed(() => route.path === props.href)
  const isSidebarOpen = computed(() => isExpanded.value || isHovered.value || isMobileOpen.value)

  const activeClasses = computed(() => {
    if (props.isExclusive) {
        return `
          my-1 flex items-center gap-2 rounded-full
          border border-blue-500 bg-blue-500/10
          px-4 py-2 text-blue-500
          hover:bg-blue-500/20
          dark:border-blue-300 dark:bg-blue-300/10 dark:text-blue-300
          dark:hover:bg-blue-400/20
          lg:transition-all lg:duration-300
        `
    }

  return `
    flex items-center rounded-lg group
    ${isSidebarOpen.value ? 'gap-2 px-4 py-2' : 'justify-center p-2'}
    text-neutral-700 dark:text-neutral-400
    hover:text-neutral-900 hover:dark:text-neutral-300
    ${
      isActiveRoute.value
        ? 'bg-blue-100 dark:bg-neutral-800 text-blue-500 dark:!text-neutral-200'
        : 'hover:lg:bg-neutral-200 hover:dark:lg:bg-neutral-800 lg:transition-all lg:duration-300'
    }
  `
  })

  const handleMobileNavigate = () => {
    if (isMobileOpen.value) {
      toggleMobileSidebar()
    }
  }
</script>
