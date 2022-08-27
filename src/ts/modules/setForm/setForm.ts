// modules
import { getResultOfValidPassword } from '../getResultOfValidPassword/getResultOfValidPassword'

/**
 * input要素を制御するオブジェクトを生成する
 * @param {Element} inputUserIdEl ユーザーIDのinput要素
 * @param {Element} inputPasswordEl パスワードのinput要素
 */
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
    isValidPassword = getResultOfValidPassword(password)
  })

  /**
   * ユーザーIDを入力中かを取得
   * @return {boolean}
   */
  const getIsFocusUserIdEl = () => isFocusUserIdEl
  /**
   * パスワードを入力中かを取得
   * @return {boolean}
   */
  const getIsFocusPasswordEl = () => isFocusPasswordEl
  /**
   * ユーザーIDのバリデーション結果を取得
   * @return {boolean}
   */
  const getIsValidUserId = () => isValidUserId
  /**
   * パスワードのバリデーション結果を取得
   * @return {boolean}
   */
  const getIsValidPassword = () => isValidPassword

  return {
    getIsFocusUserIdEl,
    getIsFocusPasswordEl,
    getIsValidUserId,
    getIsValidPassword
  }
}
