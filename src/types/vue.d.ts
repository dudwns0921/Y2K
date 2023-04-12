// Works correctly

import { Emitter } from 'mitt'

export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $emitter: Emitter<any>
  }
}
