import { defineStore } from 'pinia'
import { GITHUB_ACCOUNTS } from '@/common/constants/github'
import type { GithubApiResponse, GithubUser } from '@/types/github'

export const useGithubStore = defineStore('github', {
  state: () => ({
    user: null as GithubUser | null,
    contributionCalendar: null as GithubUser['contributionsCollection']['contributionCalendar'] | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchGithubData() {
      this.loading = true
      this.error = null

      try {
        const res = await $fetch<GithubApiResponse>(
          GITHUB_ACCOUNTS.endpoint,
          {
            method: 'POST',
            body: {
              username: GITHUB_ACCOUNTS.username,
            },
          }
        )

        this.user = res.data
        this.contributionCalendar =
          res.data?.contributionsCollection?.contributionCalendar ?? null
      } catch (err) {
        this.error =
          err instanceof Error
            ? err.message
            : 'Failed to fetch GitHub data'
      } finally {
        this.loading = false
      }
    },
  },
})
