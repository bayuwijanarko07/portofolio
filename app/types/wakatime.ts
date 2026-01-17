export interface WakaStatsResponse {
  data: {
    start: string
    end: string
    modified_at: string

    best_day?: {
      date: string
      text: string
    }

    human_readable_daily_average_including_other_language: string
    human_readable_total_including_other_language: string

    languages: {
      name: string
      total_seconds: number
      percent: number
      text: string
    }[]

    editors: {
      name: string
      total_seconds: number
      percent: number
      text: string
    }[]
  }
}

export interface WakaStatsData {
  start_date?: string
  end_date?: string
  last_update?: string
  best_day?: {
    date?: string
    text?: string
  }
  human_readable_daily_average?: string
  human_readable_total?: string
  languages?: any[]
  editors?: any[]
}

export interface WakaAllTimeData {
  text?: string
  total_seconds?: number
}

export interface WakaCombinedResult {
  status: number
  stats: WakaStatsData | null
  all_time: WakaAllTimeData | null
}

export interface WakaRawResponse {
  data: any
}
