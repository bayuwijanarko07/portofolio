// import { GITHUB_ACCOUNT, GITHUB_USER_QUERY } from '@/common/constants/github'
// import { githubAuthHeader } from '../utils/githubAuthHeader'
// import type { GithubGraphQLResponse } from '@/types/github'

// export default cachedEventHandler(async () => {
//     const username = GITHUB_ACCOUNT.username

//     const res = await $fetch<GithubGraphQLResponse>(
//       GITHUB_ACCOUNT.user_endpoint,
//       {
//         method: 'POST',
//         headers: githubAuthHeader(),
//         body: {
//           query: GITHUB_USER_QUERY,
//           variables: { username },
//         },
//       }
//     )
//     return res.data.user.contributionsCollection.contributionCalendar
//   },
//   // {
//   //   maxAge: 60 * 60, 
//   //   staleMaxAge: 60 * 60 * 24,
//   //   name: 'github-contribution-calendar',
//   // }
// )


export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  console.log('TOKEN EXISTS:', !!config.githubToken)
  console.log('TOKEN LENGTH:', config.githubToken?.length)

  return config.githubToken
})