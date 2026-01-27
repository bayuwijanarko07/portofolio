<template>
  <section class="space-y-4 leading-7 text-neutral-800 dark:text-neutral-300">
    <ElementsHeader
      :title="tProj('title')"
      icon="mdi:briefcase-variant-outline"
    />
    <ElementsSubHeader>
      {{ tProj('description') }}
    </ElementsSubHeader>
     
  </section>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const tProj = (key: string) => t(`ProjectsPage.${key}`)
</script>