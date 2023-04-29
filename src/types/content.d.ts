export type yearAndMonth = {
  year: number
  month: number
}

export type ContentData = {
  id: string
  title: string
  videoURL: string
  thumbnailURL: string
  filters: string[]
  date: yearAndMonth[]
  description: string
}
