<template>
  <section class="space-y-2">
    <ElementsHeader
      :title="tGithub('title')"
      icon="octicon:mark-github-24"
    />

    <ElementsSubHeader>
      <h3>{{ tGithub('sub_title') }}</h3>
    </ElementsSubHeader>

    <p v-if="loading">
      {{ t('DashboardPage.error') }}
    </p>

    <p
      v-else-if="error"
      class="text-red-500"
    >
      {{ t('DashboardPage.error') }}
    </p>

    <div
      v-else-if="contributionCalendar"
      class="space-y-1"
    >
      <Overview :data="contributionCalendar" />
      <Calendar :data="contributionCalendar" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useGithubStore } from '@/stores/github'
  import { useI18n } from '#imports'
  import Overview from './Overview.vue'
  import Calendar from './Calendar.vue'

  const { t } = useI18n()
  const tGithub = (key: string) => t(`DashboardPage.github.${key}`)

  const githubStore = useGithubStore()
  const { loading, error, contributionCalendar } = storeToRefs(githubStore)

  if (!contributionCalendar.value && !loading.value) {
    await githubStore.fetchGithubData()
  }
</script>