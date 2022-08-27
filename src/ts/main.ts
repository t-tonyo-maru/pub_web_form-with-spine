// spine
import * as spine from '@esotericsoftware/spine-webgl'
// module
import { getIsValidPassword } from './modules/getIsValidPassword/getIsValidPassword'
import { SpineApp } from './modules/spineApp'
import { setForm } from './modules/setForm/setForm'

window.onload = () => {
  // canvas要素
  const canvas = document.querySelector('.js_canvas') as HTMLCanvasElement
  // canvas 要素と SpineApp インスタンスを紐付ける
  new spine.SpineCanvas(canvas, {
    pathPrefix: 'assets/spine-data/',
    app: new SpineApp()
  })

  // HTMLフォーム要素
  const inputUserId = document.querySelector('.js_userId') as Element
  const inputPassword = document.querySelector('.js_password') as Element
  setForm({
    inputUserIdEl: inputUserId,
    inputPasswordEl: inputPassword
  })
}
