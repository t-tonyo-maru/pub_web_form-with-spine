// modules
import { getIsValidPassword } from '../getIsValidPassword/getIsValidPassword'

export const setForm = ({
  inputUserIdEl,
  inputPasswordEl
}: {
  inputUserIdEl: Element
  inputPasswordEl: Element
}) => {
  // 入力中か
  let isFocusUserIdEl = false
  let isFocusPasswordEl = false
  // バリデーション結果
  let isValidUserId = false
  let isValidPassword = false

  // ユーザーIDのイベントセット
  // focus イベント
  inputUserIdEl.addEventListener('focus', () => {
    isFocusUserIdEl = true
  })
  // blur イベントセット
  inputUserIdEl.addEventListener('blur', (event) => {
    // 非入力中状態に更新
    isFocusUserIdEl = false
    // バリデーション情報を更新
    const userId = (event.target as HTMLInputElement).value
    isValidUserId = userId.length > 0
  })

  // パスワードのイベントセット
  // focus イベント
  inputPasswordEl.addEventListener('focus', () => {
    isFocusPasswordEl = true
  })
  // blur イベントセット
  inputPasswordEl.addEventListener('blur', (event) => {
    // 非入力中状態に更新
    isFocusPasswordEl = false
    // バリデーション情報を更新
    const password = (event.target as HTMLInputElement).value
    isValidPassword = getIsValidPassword(password)
  })

  return {
    // 入力中かを取得
    getIsFocusUserIdEl: () => isFocusUserIdEl,
    getIsFocusPasswordEl: () => isFocusPasswordEl,
    // バリデーション情報を取得
    getIsValidUserId: () => isValidUserId,
    getIsValidPassword: () => isValidPassword
  }
}
