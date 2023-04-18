export type ContentData = {
  title: string
  videoId: string
  thumbnailURL: string
  filters: string[]
  // FIXME : 유효성 검사 있으면 나중에 삭제 필요
  date: Date | null
  description: string
}
