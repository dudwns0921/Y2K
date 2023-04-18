import { GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth'
import { auth, provider } from './index'
import { FirebaseError } from 'firebase/app'
import { handleFirebaseError, handleOtherError } from './error'
import { TOKEN_KEY } from '@/constants'

export async function requestSignInWithPopup() {
  try {
    const result = await signInWithPopup(auth, provider)
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
  } catch (error: any) {
    if (error instanceof FirebaseError) {
      handleFirebaseError(error)
    } else {
      // Handle other types of errors
      handleOtherError(error)
    }
  }
}

export async function requestSignOut() {
  try {
    await signOut(auth)
    localStorage.removeItem(TOKEN_KEY)
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
