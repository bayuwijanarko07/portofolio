<template>
  <div class="flex items-center justify-between md:px-2 lg:flex-col lg:space-y-4">
    <ElementsImage  
      src="/images/1.webp"
      alt="example"
      :width="expandMenu ? 80 : imageSize * 0.9"
      :height="expandMenu ? 80 : imageSize * 0.9"
      sizes="sm:100vw md:50vw"
      rounded="rounded-xl"
      class="border-2 border-neutral-400 dark:border-neutral-600 lg:hover:scale-105 rounded-full"
      loading="lazy"
      :modifiers="{ round: '100%' }"
    />

    <div class="mt-1 flex items-center gap-2 lg:mt-4">
      <NuxtLink to="/">
        <h2 class="flex-grow text-lg font-medium lg:text-xl">
          Bayu Wijanarko
        </h2>
      </NuxtLink>
    </div>

    <div class="hidden text-sm text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400 lg:flex">
      @bayuwijanarko07
    </div>

    <div class="hidden justify-between gap-6 lg:mt-4 lg:flex">
      <LocaleSwitcher />
      <ModeSwitcher />
    </div>
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