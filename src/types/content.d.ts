export type yearAndMonth = {
  month: number
  year: number
}

export interface ContentDataRequest {
  title: string
  videoId: string
  thumbnailURL: string
  filters: string[]
  date: yearAndMonth[]
  description: string
}

export interface ContentDataResponse extends ContentDataRequest {
  id: string
}
