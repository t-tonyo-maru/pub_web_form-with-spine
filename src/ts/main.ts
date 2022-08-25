// spine
import * as spine from '@esotericsoftware/spine-webgl'
// module
import { getIsValidPassword } from './modules/getIsValidPassword/getIsValidPassword'
import { SpineApp } from './modules/spineApp'

window.onload = () => {
  // canvas要素
  const canvas = document.querySelector('.js_canvas') as HTMLCanvasElement
  // canvas 要素と SpineApp インスタンスを紐付ける
  new spine.SpineCanvas(canvas, {
    pathPrefix: 'assets/spine-data/',
    app: new SpineApp()
  })

  // HTMLフォーム要素
  const form = document.querySelector('.js_form') as Element
  const inputUserId = document.querySelector('.js_userId') as Element
  const inputPassword = document.querySelector('.js_password') as Element

  // バリデーション結果
  let isValidUserId = false
  let isValidPassword = false

  // フォームのイベントをセット
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!isValidUserId || !isValidPassword) return
  })

  // ユーザーIDのイベントセット
  inputUserId.addEventListener('blur', (event) => {
    const userId = (event.target as HTMLInputElement).value
    isValidUserId = userId.length > 0
  })

  // パスワードのイベントセット
  inputPassword.addEventListener('blur', (event) => {
    const password = (event.target as HTMLInputElement).value
    isValidPassword = getIsValidPassword(password)
  })
}
