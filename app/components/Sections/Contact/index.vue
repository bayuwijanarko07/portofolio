<template>
  <section class="space-y-4 leading-7 text-neutral-800 dark:text-neutral-300">
    <ElementsHeader
      :title="tCont('title')"
      icon="mdi:briefcase-variant-outline"
    />
    <ElementsSubHeader>
      {{ tCont('description') }}
    </ElementsSubHeader>
    <section class="space-y-2 text-neutral-800 dark:text-neutral-300">
    <ElementsCard class="space-y-2 p-6">
       <div>
        <form>
          <div class="-mx-2.5 flex flex-wrap gap-y-5">
            <div class="w-full px-2.5 xl:w-1/2">
              <input type="text" placeholder="Name" class="dark:bg-neutral-900 h-11 w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
            </div>
            <div class="w-full px-2.5 xl:w-1/2">
              <input type="email" placeholder="Email address" class="dark:bg-neutral-900 h-11 w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
            </div>
            <div class="w-full px-2.5">
              <textarea placeholder="Enter your message" rows="6" class="dark:bg-neutral-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"></textarea>
            </div>
            <div class="w-full px-2.5">
              <button type="submit" class="w-full p-3 text-sm font-medium text-white transition-colors rounded-lg bg-brand-500 hover:bg-brand-600"> Submit </button>
            </div>
          </div>
        </form>
      </div>
    </ElementsCard>
    </section>
  </section>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const tCont = (key: string) => t(`ContactPage.${key}`)

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

</script>