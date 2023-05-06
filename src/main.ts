import { createApp } from 'vue'

import App from './App.vue'

import mitt from 'mitt'

import { createPinia } from 'pinia'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import '@/assets/styles/index.css'
import '@/assets/styles/globalStyle.css'

const app = createApp(App)

const emitter = mitt()
app.config.globalProperties.$emitter = emitter
// emitter 전역 등록

app.component('VueDatePicker', VueDatePicker)
// 날짜 선택 라이브러리 사용

app.use(createPinia())

app.use(router)

app.mount('#app')
