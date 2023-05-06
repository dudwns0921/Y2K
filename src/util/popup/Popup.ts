import ConfirmPopup from '@/components/organism/popup/ConfirmPopup.vue'
import { createApp, type App } from 'vue'

const POPUP_ID = 'popup'

export type popupButtonObj = {
  title: string
  callback: () => void
}

export class Popup {
  static instance: Popup
  private popup: App<Element>

  constructor() {
    this.popup = {} as App<Element>
  }

  show(content: string, buttons: popupButtonObj[], targetElementId: string) {
    this.popup = createApp(ConfirmPopup, {
      content: content,
      buttons: buttons,
    })

    const divElement = document.createElement('div')
    divElement.id = POPUP_ID
    divElement.style.width = '100%'
    divElement.style.height = '100%'
    divElement.style.position = 'absolute'

    const root = document.getElementById(targetElementId)
    const elementForMount = root?.appendChild(divElement) as Element

    this.popup.mount(elementForMount)
  }

  closePopup() {
    this.popup.unmount()
    document.getElementById(POPUP_ID)?.remove()
    this.popup = {} as App<Element>
  }

  getIsPopupShowing() {
    return document.getElementById(POPUP_ID) !== null
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Popup()
    return this.instance
  }
}
