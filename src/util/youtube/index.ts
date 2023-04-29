export function extractVideoIdFromUrl(url: string) {
  const params = new URLSearchParams(new URL(url).search)
  const videoId = params.get('v')

  return videoId
}

export function validateYouTubeUrl(url: string) {
  const regExp =
    // eslint-disable-next-line no-useless-escape
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/

  return regExp.test(url)
}
