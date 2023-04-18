import Logger from '@/util/logger/Logger'
import type { FirebaseError } from 'firebase/app'

const logger = new Logger('error')

export function handleFirebaseError(error: FirebaseError) {
  logger.setPrefix('handleFirebaseError')
  // Handle Firebase authentication errors
  const errorCode = error.code
  const errorMessage = error.message
  logger.error(errorCode, errorMessage)
}

export function handleOtherError(error: any) {
  // Handle other types of errors
  logger.error(error)
}
