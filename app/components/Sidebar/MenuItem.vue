<template>
  <NuxtLink
    :is="isHashLink ? 'div' : 'NuxtLink'"
    :to="!isHashLink ? props.href : undefined"
    :target="isExternalUrl ? '_blank' : undefined"
    :aria-current="isActiveRoute ? 'page' : undefined"
    class="cursor-pointer"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div :class="[activeClasses, props.class]">

      <Icon
        :name="icon"
        :size="props.iconSize"
        class="transition-all duration-300 group-hover:-rotate-12"
        :class="isActiveRoute && 'animate-pulse'"
      />

      <div class="flex-grow">
        {{ t(`Navigation.${props.title}`) }}
      </div>

      <slot />

      <Icon
        v-if="isActiveRoute && !props.isExclusive"
        name="mdi:arrow-right"
        class="animate-pulse text-gray-500"
      />

      <Icon
        v-if="isExternalUrl && isHovered && !isExclusive"
        name="mdi:arrow-top-right"
        :size="props.iconSize"
        class="-rotate-100 text-gray-500 transition-all duration-300"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import { useI18n } from 'vue-i18n'
    import { useMenu } from '@/stores/menu'
    import type { MenuItemProps } from '@/types/menu'

    const props = defineProps<MenuItemProps>()

    const { hideMenu } = useMenu()
    const route = useRoute()
    const { t } = useI18n()

    const isHovered = ref(false)

    const isExternalUrl = computed(() => props.href?.startsWith('http'))
    const isHashLink = computed(() => props.href === '#')
    const isActiveRoute = computed(() => route.path === props.href)

    const activeClasses = computed(() => {
    if (props.isExclusive) {
        return `
        my-1 flex items-center gap-2 rounded-full
        border border-green-600 bg-green-600/10
        px-4 py-2 text-green-600
        hover:bg-green-600/20
        dark:border-green-300 dark:bg-green-300/10 dark:text-green-300
        dark:hover:bg-green-400/20
        lg:transition-all lg:duration-300 lg:hover:scale-105
        `
    }

    return `
        flex items-center gap-2 py-2 px-4 rounded-lg group
        text-neutral-700 dark:text-neutral-400
        hover:text-neutral-900 hover:dark:text-neutral-300
        ${
        isActiveRoute.value
            ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:!text-neutral-200'
            : 'hover:lg:bg-neutral-200 hover:dark:lg:bg-neutral-800 lg:hover:scale-105 lg:transition-all lg:duration-300'
        }
    `
    })

    const emit = defineEmits<{
    (e: 'click'): void
    }>()

    function handleClick() {
    hideMenu()
    emit('click')
    }
</script>
