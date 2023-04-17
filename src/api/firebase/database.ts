import { app } from './index'
import { FirebaseError } from 'firebase/app'
import { child, get, getDatabase, ref, remove, set } from 'firebase/database'
import { handleFirebaseError, handleOtherError } from './error'
import type { ContentDataRequest, ContentDataResponse } from '@/types/content'

export async function saveContent(
  contentId: string,
  contentData: ContentDataRequest
) {
  try {
    await set(ref(getDatabase(app), 'contents/' + contentId), contentData)
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
    const contents: ContentDataResponse[] = []
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
