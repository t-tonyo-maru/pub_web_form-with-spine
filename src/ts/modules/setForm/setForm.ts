// modules
import { getIsValidPassword } from '../getIsValidPassword/getIsValidPassword'

export const setForm = ({
  inputUserIdEl,
  inputPasswordEl
}: {
  inputUserIdEl: Element
  inputPasswordEl: Element
}) => {
  // バリデーション結果
  let isValidUserId = false
  let isValidPassword = false

  // ユーザーIDのイベントセット
  inputUserIdEl.addEventListener('blur', (event) => {
    const userId = (event.target as HTMLInputElement).value
    isValidUserId = userId.length > 0
  })

  // パスワードのイベントセット
  inputPasswordEl.addEventListener('blur', (event) => {
    const password = (event.target as HTMLInputElement).value
    isValidPassword = getIsValidPassword(password)
  })

  return {
    getisValidUserId: () => isValidUserId,
    getisValidPassword: () => isValidPassword
    // バリデーション情報を取得
    getIsValidUserId: () => isValidUserId,
    getIsValidPassword: () => isValidPassword
  }
}
