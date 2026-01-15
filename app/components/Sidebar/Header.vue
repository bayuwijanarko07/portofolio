<template>
  <div class="sticky top-0 z-999 flex w-full rounded-2xl px-2 border-[1.5px] border-neutral-300 bg-white xl:border-b dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-100">
    <div class="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 lg:py-4 xl:justify-normal xl:border-b-0 xl:px-0 dark:border-gray-800">
      <div class="hidden xl:block">
        <form action="">
          <div class="relative">
            <input type="text" class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30">
          </div>
        </form>
      </div>
    </div>
    <div class="shadow-theme-md w-full items-center justify-between gap-4 px-5 py-4 xl:flex xl:justify-end xl:px-0 xl:shadow-none hidden">
      <LocaleSwitcher />
      <ModeSwitcher />
    </div>
    <!-- <ElementsImage  
      src="/images/1.webp"
      alt="example"
      :width="expandMenu ? 80 : imageSize * 0.9"
      :height="expandMenu ? 80 : imageSize * 0.9"
      sizes="sm:100vw md:50vw"
      rounded="rounded-xl"
      class="border-2 border-neutral-400 dark:border-neutral-600 lg:hover:scale-105 rounded-full"
      loading="lazy"
      :modifiers="{ round: '100%' }"
    /> -->

    <!-- <div class="mt-1 flex items-center gap-2 lg:mt-4">
      <NuxtLink to="/">
        <h2 class="flex-grow text-lg font-medium lg:text-xl">
          Bayu Wijanarko
        </h2>
      </NuxtLink>
    </div>

    <div class="hidden text-sm text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400 lg:flex">
      @bayuwijanarko07
    </div> -->

    <!-- <div class="hidden justify-between gap-6 lg:mt-4 lg:flex">
      <LocaleSwitcher />
      <ModeSwitcher />
    </div> -->
  </div>
</template>

<script setup>
  const props = defineProps({
    expandMenu: Boolean,
    imageSize: {
      type: Number,
      default: 40
    }
  })
</script>