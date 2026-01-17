<template>
  <section class="space-y-2">
      <ElementsHeader
        :title="tWaka('title')"
        icon="octicon:check-circle-24"
      />
      <ElementsSubHeader>
         <NuxtLink
          href="https://wakatime.com/@satriabahari"
          target="_blank"
          className="text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400"
        >
        </NuxtLink>
      </ElementsSubHeader>
    <Overview />
  </section>
</template>

<script setup lang="ts">
  const { t } = useI18n()
  const tWaka = (key: string) => t(`DashboardPage.wakatime.${key}`)
  import Overview from './Overview.vue'
</script>