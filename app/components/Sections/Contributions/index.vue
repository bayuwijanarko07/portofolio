<template>
  <section class="space-y-2 px-4 md:px-10 mx-auto w-full">
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

    <p v-else-if="error" class="text-red-500">
      {{ t('DashboardPage.error') }}
    </p>
    <div v-else-if="contributionCalendar">
      <Overview :data="contributionCalendar" />
      <div class="flex flex-col xl:flex-row xl:items-center gap-4 py-2">
        <div class="w-full xl:flex-1">
          <Calendar :data="contributionCalendar" />
        </div>

        <div class="w-full xl:w-[260px] flex items-center">
          <div class="w-full max-h-[260px]">
            <GithubLineChart :data="allTimeContribution" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useI18n } from '#imports'
  import Overview from './Overview.vue'
  import Calendar from './Calendar.vue'
  import GithubLineChart from './GithubLineChart.client.vue'
  import type { GithubContributionApiResponse } from '@/types/github'

  const { t } = useI18n()
  const tGithub = (key: string) => t(`DashboardPage.github.${key}`)

  const { data, pending, error } = await useAsyncData<GithubContributionApiResponse>('github-contributions', () =>
    $fetch('/api/github', {
      method: 'POST',
    })
  )
  
  const contributionCalendar = computed(() =>
    data.value?.contributionCalendar
  )

 const allTimeContribution = computed(() => {
  if (!data.value) return null

    return {
      commits: data.value.totalCommitContributions,
      issues: data.value.totalIssueContributions,
      pullRequests: data.value.totalPullRequestContributions,
      pullRequestReviews: data.value.totalPullRequestReviewContributions,
      total:
        data.value.totalCommitContributions +
        data.value.totalIssueContributions +
        data.value.totalPullRequestContributions +
        data.value.totalPullRequestReviewContributions
    }
  })
</script>