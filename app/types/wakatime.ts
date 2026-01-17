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

  languages?: {
    name: string
    text: string
    total_seconds?: number
    percent?: number
  }[]

  editors?: {
    name: string
    text: string
    total_seconds?: number
    percent?: number
  }[]
}

export interface WakaAllTimeData {
  text?: string
  total_seconds?: number
}

export type WakaCombinedResult = {
  status: number
  stats: {
    start_date?: string
    end_date?: string
    last_update?: string
    best_day?: {
      date: string
      text: string
    }
    human_readable_daily_average?: string
    human_readable_total?: string
    languages?: {
      name: string
      text: string
    }[]
    editors?: any[]
  } | null
  all_time: {
    text?: string
    total_seconds?: number
  } | null
}

export interface WakaRawResponse {
  data: any
}

