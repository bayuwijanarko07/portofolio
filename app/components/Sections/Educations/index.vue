<template>
  <section class="space-y-2">
    <ElementsHeader
      :title="tEdu('title')"
      icon="mdi:education-outline"
    />
    <ElementsSubHeader>
      {{ tEdu('sub_title') }}
    </ElementsSubHeader>
    <Overview />
  </section>
</template>


<script setup lang="ts">
  import Overview from './Overview.vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const tEdu = (key: string) => t(`ProfilPage.education.${key}`)
</script>

