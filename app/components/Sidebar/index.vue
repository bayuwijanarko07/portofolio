<template>
  <aside
   ref="sidebarEl"
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-neutral-900 dark:border-neutral-800 text-neutral-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-neutral-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
  >
    <div
        :class="[
          'py-8 flex',
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
        ]"
      >
      <NuxtLink to="/">
          <ElementsImage
            v-if="isExpanded || isHovered || isMobileOpen"
            class="dark:hidden"
            src="/images/1.webp"
            alt="Logo"
            width="150"
            height="40"
          />
          <ElementsImage
            v-if="isExpanded || isHovered || isMobileOpen"
            class="hidden dark:block"
            src="/images/1.webp"
            alt="Logo"
            width="150"
            height="40"
          />
          <ElementsImage
            v-else
            src="/images/1.webp"
            alt="Logo"
            width="32"
            height="32"
          />
      </NuxtLink>
    </div>
    <ElementsBreakline />
    <SidebarMenu :list="filteredMenu" />
    <ElementsBreakline />
    <!-- <SidebarFooter /> -->
  </aside>
</template>

<script setup>
  import { computed } from "vue";
  import { MENU_ITEMS } from "@/common/constants/menu";
  const filteredMenu = computed(() => MENU_ITEMS.filter(item => item.isShow))

  import { useSidebar } from "@/composables/useSidebar";

  const { isExpanded, isMobileOpen, isHovered } = useSidebar();
</script>