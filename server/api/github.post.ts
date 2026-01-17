const GITHUB_USER_ENDPOINT = 'https://api.github.com/graphql'

const GITHUB_USER_QUERY = `
query ($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          firstDay
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}
`

interface GithubResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: any
      }
    }
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const username = body?.username
  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username is required',
    })
  }

  const res = await $fetch<GithubResponse>(GITHUB_USER_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${config.githubToken}`,
      'Content-Type': 'application/json',
    },
    body: {
      query: GITHUB_USER_QUERY,
      variables: { username },
    },
  })

  return {
    status: 200,
    data: res.data.user,
  }
})