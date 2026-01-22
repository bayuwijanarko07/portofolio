<template>
  <section class="space-y-2">
    <ElementsHeader
      :title="tGithub('title')"
      icon="octicon:mark-github-24"
    />

    <ElementsSubHeader>
      <h3>{{ tGithub('sub_title') }}</h3>
    </ElementsSubHeader>

    <p v-if="pending">
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
  import { useI18n } from '#imports'
  import Overview from './Overview.vue'
  import Calendar from './Calendar.vue'
  import type { ContributionCalendar } from '@/types/github'

  const { t } = useI18n()
  const tGithub = (key: string) => t(`DashboardPage.github.${key}`)

  const { data, pending, error } = await useAsyncData<ContributionCalendar>('github-contributions', () =>
    $fetch('/api/github', {
      method: 'POST',
    })
  )
  
  const contributionCalendar = computed(() =>
    data.value
  )

</script>