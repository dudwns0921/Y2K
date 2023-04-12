import { FirebaseError } from 'firebase/app'
import {
  getDownloadURL,
  uploadBytes,
  ref,
  type StorageReference,
  getStorage,
} from 'firebase/storage'
import { app } from './index'
import { handleFirebaseError, handleOtherError } from './error'

export async function uploadImage(imageFile: File) {
  try {
    const imagesRef = ref(getStorage(app), `images/${imageFile.name}`)
    await uploadBytes(imagesRef, imageFile)
    return imagesRef
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleFirebaseError(error)
    } else {
      // Handle other types of errors
      handleOtherError(error)
    }
  }
}

export async function getImageURL(ref: StorageReference) {
  try {
    const url = await getDownloadURL(ref)
    return url
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleFirebaseError(error)
    } else {
      // Handle other types of errors
      handleOtherError(error)
    }
  }
}
