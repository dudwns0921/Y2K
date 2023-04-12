import type { FirebaseError } from 'firebase/app'

export function handleFirebaseError(error: FirebaseError) {
  // Handle Firebase authentication errors
  const errorCode = error.code
  const errorMessage = error.message
  console.log(errorCode, errorMessage)
}

export function handleOtherError(error: any) {
  // Handle other types of errors
  console.log(error)
}
