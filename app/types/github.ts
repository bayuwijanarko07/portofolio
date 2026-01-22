export interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

export interface ContributionWeek {
  firstDay: string
  contributionDays: ContributionDay[]
}

export interface ContributionMonth {
  name: string
  firstDay: string
  totalWeeks: number
}

export interface ContributionCalendar {
  totalContributions: number
  colors: string[]
  months: ContributionMonth[]
  weeks: ContributionWeek[]
}

export interface GithubUser {
  contributionsCollection: {
    contributionCalendar: ContributionCalendar
  }
}

export interface GithubApiResponse {
  status: number
  data: GithubUser
}

export interface GithubGraphQLResponse {
  data: {
    user: GithubUser
  }
}