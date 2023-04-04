import { defineStore } from 'pinia'
import { TOKEN_KEY } from '@/constants'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: localStorage.getItem(TOKEN_KEY) || '' }),
})
