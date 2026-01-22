export const GITHUB_ACCOUNT = {
  username: 'bayuwijanarko07',
  token: process.env.GITHUB_PERSONAL_TOKEN,
  user_endpoint: 'https://api.github.com/graphql',
  endpoint: "/api/github",
  type: "personal",
  github_url: 'https://github.com/bayuwijanarko07',
  is_active: true
}

export const GITHUB_USER_QUERY = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
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