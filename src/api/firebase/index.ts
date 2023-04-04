import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBIv_HLDRbXyPvrqhqkqBETbvapuICO8NA',
  authDomain: 'y2k-project-e9ed8.firebaseapp.com',
  projectId: 'y2k-project-e9ed8',
  storageBucket: 'y2k-project-e9ed8.appspot.com',
  messagingSenderId: '866597264014',
  appId: '1:866597264014:web:a779c7e04f7446293d07df',
}

export const app = initializeApp(firebaseConfig)
export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
