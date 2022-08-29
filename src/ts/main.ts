// spine
import * as spine from '@esotericsoftware/spine-webgl'
// module
import { SpineApp } from './modules/spineApp'
import { Form } from './modules/form'

window.onload = () => {
  // form要素を取得
  const inputUserNameEl = document.querySelector('.js_userName') as Element
  const inputPasswordEl = document.querySelector('.js_password') as Element
  // formをセット
  const form = new Form({
    inputUserNameEl,
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
