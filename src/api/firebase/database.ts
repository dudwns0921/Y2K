import { app } from './index'
import { FirebaseError } from 'firebase/app'
import { child, get, getDatabase, ref, remove, set } from 'firebase/database'
import { handleFirebaseError, handleOtherError } from './error'
import type { ContentData } from '@/types/content'

export async function saveContent(contentData: ContentData) {
  try {
    const dbRef = ref(getDatabase(app))
    const snapshot = await get(child(dbRef, `contents/${contentData.videoId}`))
    if (!snapshot.exists()) {
      await set(
        ref(getDatabase(app), 'contents/' + contentData.videoId),
        contentData
      )
    } else {
      throw new Error('중복된 videoId 입니다.')
    }
    // 성공시 메인 페이지로 이동
    window.location.replace('/')
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleFirebaseError(error)
    } else {
      // Handle other types of errors
      handleOtherError(error)
    }
  }
}

export async function getContentsAndFilters() {
  try {
    const contents: ContentData[] = []
    let filters: string[] = []

    const dbRef = ref(getDatabase(app))
    const snapshot = await get(child(dbRef, 'contents/'))
    if (snapshot.exists()) {
      console.log('Data available')
      for (const key in snapshot.val()) {
        const data = snapshot.val()[key] as ContentData
        contents.push(data)

        filters = [...filters, ...data.filters]
      }
    } else {
      console.log('No data available')
    }
    return {
      contents,
      filters,
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleFirebaseError(error)
    } else {
      // Handle other types of errors
      handleOtherError(error)
    }
  }
}

export async function deleteContent(contentId: string) {
  try {
    await remove(ref(getDatabase(app), 'contents/' + contentId))
    // 성공시 새로고침
    window.location.reload()
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleFirebaseError(error)
    } else {
      // Handle other types of errors
      handleOtherError(error)
    }
  }
}
