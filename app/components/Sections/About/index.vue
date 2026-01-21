<template>
  <section class="space-y-4 leading-7 text-neutral-800 dark:text-neutral-300">
    <ElementsHeader
      :title="tAbout('title')"
      icon="mdi:briefcase-variant-outline"
    />
    <ElementsSubHeader>
      {{ tAbout('description') }}
    </ElementsSubHeader>
     <div
      v-for="item in paragrafData"
      :key="item"
    >
      {{ t(`ProfilPage.about.paragraf_${item}`) }}
    </div>
  </section>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const tAbout = (key: string) => t(`ProfilPage.${key}`)
  const paragrafData = [1, 2, 3, 4]
</script>