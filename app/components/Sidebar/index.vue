<template>
  <aside class="lg:w-1/5">
    <div class="sticky top-0 z-999 bg-white rounded-2xl px-2 border-[1.5px] border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 py-4 dark:text-gray-100 z-10 flex flex-col transition-all duration-300">
      <div class="hidden md:block">
        <ElementsBreakline />
        <div class="hidden lg:block">
          <SidebarMenu :list="filteredMenu" />
        </div>
        <ElementsBreakline />
        <SidebarFooter />
      </div>
    </div>
  </aside>
</template>

<script setup>
  import { MENU_ITEMS } from "@/common/constants/menu";
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
</script>