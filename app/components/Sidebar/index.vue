<template>
  <aside class="fixed flex-col mt-0 top-0 px-5 left-0 h-screen border-r dark:border-neutral-800 xl:w-[290px]
    bg-white dark:bg-neutral-900 dark:text-gray-100 -translate-x-full xl:translate-x-0">
    <div class="pt-8 pb-7 flex justify-start">
      <h3>Bayu Wijanarko</h3>
    </div>
    <ElementsBreakline />
    <SidebarMenu :list="filteredMenu" />
    <ElementsBreakline />
    <SidebarFooter />
  </aside>
</template>

<script setup>
  import { MENU_ITEMS } from "@/common/constants/menu";
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
</script>