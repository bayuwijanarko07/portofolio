<template>
  <header class="sticky flex w-full top-0 z-50 bg-white xl:border-b xl:px-6 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-100">
    <div class="flex items-center justify-between grow xl:flex-row">

      <div class="flex items-center w-full gap-2 px-3 py-3 border-gray-200 dark:border-gray-800 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-0">
        <button
          @click="handleToggle"
          class="flex items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
          :class="[
            isMobileOpen
              ? 'lg:bg-transparent dark:lg:bg-transparent bg-gray-100 dark:bg-gray-800'
              : '',
          ]"
        >
        <Icon
          name="mdi-light:format-indent-increase"
          class="text-gray-600 w-5 h-5 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100 transition-colors duration-300"
        />
        </button>
        
        <!-- <div class="hidden xl:block">
          <form>
            <div class="relative">
              <label for="search-input" class="sr-only">Search or type command</label>
              <input id="search-input" type="text" placeholder="Search or type command..." 
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm
                text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 
                dark:focus:border-brand-800 xl:w-[430px]">
                <button type="button" class="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg 
                border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800
              dark:bg-white/[0.03] dark:text-gray-400" aria-label="Focus search input">
                </button>
              </div>
            </form>
        </div> -->
      </div>

      <div class="flex justify-end items-center w-full gap-4 px-5 py-4">
        <LocaleSwitcher />
        <ModeSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup>
  import { useSidebar } from '@/composables/useSidebar'

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar()

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
        toggleSidebar()
      } else {
        toggleMobileSidebar()
      }
  }
</script>