import { GITHUB_ACCOUNT, GITHUB_USER_QUERY } from '@/common/constants/github'
import type { GithubGraphQLResponse } from '@/types/github'

export default cachedEventHandler(
  async () => {
    try {
      const { githubToken } = useRuntimeConfig()

      if (!githubToken) {
        throw new Error('GitHub token missing')
      }

      const res = await $fetch<GithubGraphQLResponse>(
        GITHUB_ACCOUNT.user_endpoint,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            'User-Agent': 'Nuxt-Cloudflare-App',
            'Content-Type': 'application/json',
          },
          body: {
            query: GITHUB_USER_QUERY,
            variables: { username: GITHUB_ACCOUNT.username },
          },
        }
      )

      return res.data.user.contributionsCollection.contributionCalendar
    } catch (e) {
      console.error('GitHub API error:', e)
      throw createError({
        statusCode: 500,
        statusMessage: 'GitHub GraphQL failed',
      })
    }
  },
  {
    maxAge: 60 * 60,
    staleMaxAge: 60 * 60 * 24,
    name: 'github-contribution-calendar',
  }
)