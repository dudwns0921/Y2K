import { app } from './index'
import { FirebaseError } from 'firebase/app'
import { child, get, getDatabase, ref, remove, set } from 'firebase/database'
import { handleFirebaseError, handleOtherError } from './error'
import type { ContentData } from '@/types/content'
import Logger from '@/util/logger/Logger'

const logger = new Logger('database')

export async function saveContent(contentData: ContentData, isUpdate: boolean) {
  try {
    const dbRef = ref(getDatabase(app))
    const snapshot = await get(child(dbRef, `contents/${contentData.id}`))
    if (!snapshot.exists() || isUpdate) {
      // 신규 콘텐츠 혹은 기존 콘텐츠 수정하는 경우에만 수행
      await set(
        ref(getDatabase(app), 'contents/' + contentData.id),
        contentData
      )
    } else {
      throw new Error('중복된 id 입니다.')
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
  logger.setPrefix('getContentsAndFilters')

  try {
    const contents: ContentData[] = []
    let filters: string[] = []

    const dbRef = ref(getDatabase(app))
    const snapshot = await get(child(dbRef, 'contents/'))
    if (snapshot.exists()) {
      logger.log('Data available')
      for (const key in snapshot.val()) {
        const data = snapshot.val()[key] as ContentData
        contents.push(data)

        filters = [...filters, ...data.filters]
      }
    } else {
      logger.log('No data available')
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

export async function deleteContent(
  contentId: string,
  isDeleteSelectionMode = false
) {
  try {
    await remove(ref(getDatabase(app), 'contents/' + contentId))
    if (!isDeleteSelectionMode) {
      // 성공시 새로고침
      window.location.reload()
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
