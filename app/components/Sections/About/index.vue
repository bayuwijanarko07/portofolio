<template>
  <section class="space-y-2 col-span-12">
    <ElementsHeader
      :title="tAbout('title')"
      icon="mdi:account"
    />
    <ElementsSubHeader>
      {{ tAbout('description') }}
    </ElementsSubHeader>
    <ElementsCard class="space-y-2 col-span-12 p-6">
    <div
      v-for="item in paragrafData"
      :key="item"
    >
      {{ t(`ProfilPage.about.paragraf_${item}`) }}
    </div>
    </ElementsCard>
  </section>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const tAbout = (key: string) => t(`ProfilPage.${key}`)
  const paragrafData = [1, 2, 3, 4]
</script>