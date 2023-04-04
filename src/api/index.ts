import { GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth'
import { auth, provider } from './firebase/index'
import { FirebaseError } from 'firebase/app'

export async function requestSignInWithPopup() {
  const result = await signInWithPopup(auth, provider)
  try {
    if (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result.user

      return {
        token,
        user,
      }
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      // Handle Firebase authentication errors
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    } else {
      // Handle other types of errors
      console.log(error)
    }
  }
}

export async function requestSignOut() {
  try {
    await signOut(auth)
  } catch (error) {
    if (error instanceof FirebaseError) {
      // Handle Firebase authentication errors
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    } else {
      // Handle other types of errors
      console.log(error)
    }
  }
}
