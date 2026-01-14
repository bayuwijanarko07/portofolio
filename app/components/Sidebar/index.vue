<template>
  <aside class="lg:w-1/5">
    <div class="sticky bg-white dark:bg-gray-950 dark:text-gray-100 top-0 z-10 flex flex-col transition-all duration-300 lg:py-8">
      <SidebarHeader />
      <div class="hidden md:block">
        <div class="hidden lg:block">
          <SidebarMenu :list="filteredMenu" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
  import { MENU_ITEMS } from "@/common/constants/menu";
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
</script>