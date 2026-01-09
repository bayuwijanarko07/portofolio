<template>
  <aside class="sticky top-0 z-10 flex flex-col transition-all duration-300 lg:py-8">
    <div class="fixed z-20 w-full p-5 lg:relative">
     <div class="mt-1 flex items-center gap-2 lg:mt-4">
         <NuxtLink to="/">
            <h2 class="flex-grow text-lg font-medium lg:text-xl">Bayu Wijanarko</h2>
         </NuxtLink>
      </div>
      <div class="hidden justify-between gap-6 lg:mt-4 lg:flex">
         <!-- <LocaleSwitcher/> -->
         <ModeSwitcher/>
      </div>
    </div>
    <nav class="p-4 space-y-1">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.name"
        :to="menu.to"
        class="flex items-center gap-2 py-2 px-4 rounded-lg group"
        active-class="text-gray-800 dark:bg-dark-950 dark:text-gray-100"
      >
        <span>{{ menu.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
   import { useRoute } from 'vue-router'

   const route = useRoute()
   const menus = [
      { to: '/', label: 'Dashboard' },
      { to: '/about', label: 'Tentang' },
      { to: '/projects', label: 'Projects' },
   ]

   const isActive = (path) => {
   return path === '/'
      ? route.path === '/'
      : route.path.startsWith(path)
   }
</script>