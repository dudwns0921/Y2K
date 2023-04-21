export type yearAndMonth = {
  year: number
  month: number
}

export type ContentData = {
  id: string
  title: string
  videoId: string
  thumbnailURL: string
  filters: string[]
  date: yearAndMonth[]
  description: string
}
