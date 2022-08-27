// spine
import * as spine from '@esotericsoftware/spine-webgl'
// module
import { SpineApp } from './modules/spineApp'
import { Form } from './modules/form'

window.onload = () => {
  // form要素を取得
  const inputUserIdEl = document.querySelector('.js_userId') as Element
  const inputPasswordEl = document.querySelector('.js_password') as Element
  // formをセット
  const form = new Form({
    inputUserIdEl,
    inputPasswordEl
  })

  // canvas要素
  const canvas = document.querySelector('.js_canvas') as HTMLCanvasElement
  // canvas 要素と SpineApp インスタンスを紐付ける
  new spine.SpineCanvas(canvas, {
    pathPrefix: 'assets/spine-data/',
    app: new SpineApp({ form })
  })
}
