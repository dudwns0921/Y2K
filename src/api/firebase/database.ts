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

export async function getContents() {
  try {
    const contents: ContentData[] = []
    const dbRef = ref(getDatabase(app))
    const snapshot = await get(child(dbRef, 'contents/'))
    if (snapshot.exists()) {
      console.log('Data available')
      for (const key in snapshot.val()) {
        const id = key
        const data = snapshot.val()[key]
        data.id = id
        contents.push(data)
      }
    } else {
      console.log('No data available')
    }
    return contents
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

export async function setFilters(filterData: string[]) {
  try {
    const filters = await getFilters()
    if (filters !== undefined) {
      await set(ref(getDatabase(app), 'filters/'), [...filters, ...filterData])
    } else {
      await set(ref(getDatabase(app), 'filters/'), [...filterData])
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

export async function getFilters() {
  try {
    const filters: string[] = []
    const dbRef = ref(getDatabase(app))
    const snapshot = await get(child(dbRef, 'filters/'))
    if (snapshot.exists()) {
      console.log('Data available')
      for (const filter of snapshot.val()) {
        filters.push(filter)
      }
    } else {
      console.log('No data available')
    }
    return filters
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleFirebaseError(error)
    } else {
      // Handle other types of errors
      handleOtherError(error)
    }
  }
}
