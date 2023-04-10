import { defineStore } from 'pinia'
import { TOKEN_KEY } from '@/constants'

interface AuthState {
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({ token: localStorage.getItem(TOKEN_KEY) || '' }),
})
