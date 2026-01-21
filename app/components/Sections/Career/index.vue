<template>
  <section class="space-y-2">
    <ElementsHeader
      :title="tCar('title')"
      icon="mdi:briefcase-variant-outline"
    />
    <ElementsSubHeader>
      {{ tCar('sub_title') }}
    </ElementsSubHeader>
    <Overview />
  </section>
</template>


<script setup lang="ts">
  import Overview from './Overview.vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const tCar = (key: string) => t(`ProfilPage.career.${key}`)
</script>

