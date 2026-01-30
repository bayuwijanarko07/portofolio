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

    totalCommitContributions: number
    totalIssueContributions: number
    totalPullRequestContributions: number
    totalPullRequestReviewContributions: number
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

export interface GithubContributionApiResponse {
  contributionCalendar: ContributionCalendar
  totalCommitContributions: number
  totalIssueContributions: number
  totalPullRequestContributions: number
  totalPullRequestReviewContributions: number
}

export interface AllTimeContribution {
  commits: number
  issues: number
  pullRequests: number
  pullRequestReviews: number
  total: number
}
