import { GITHUB_ACCOUNT, GITHUB_USER_QUERY } from '@/common/constants/github'
import { githubAuthHeader } from '../utils/githubAuthHeader'
import type { GithubGraphQLResponse } from '@/types/github'

export default defineEventHandler(async () => {
  const username = GITHUB_ACCOUNT.username

  const res = await $fetch<GithubGraphQLResponse>(
    GITHUB_ACCOUNT.user_endpoint,
    {
      method: 'POST',
      headers: githubAuthHeader(),
      body: {
        query: GITHUB_USER_QUERY,
        variables: { username },
      },
    }
  )
  return res.data.user.contributionsCollection.contributionCalendar
})
