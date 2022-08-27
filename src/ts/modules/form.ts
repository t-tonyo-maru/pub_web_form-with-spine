// modules
import { getResultOfValidPassword } from './getResultOfValidPassword/getResultOfValidPassword'

/**
 * input要素を制御するオブジェクトを生成する
 * @param {Element} inputUserIdEl ユーザーIDのinput要素
 * @param {Element} inputPasswordEl パスワードのinput要素
 */

export class Form {
  // ユーザーID input要素
  private inputUserIdEl: Element
  // パスワード input要素
  private inputPasswordEl: Element
  // 入力中か
  private isFocusUserIdEl: boolean = false
  private isFocusPasswordEl: boolean = false
  // バリデーション結果
  private isValidUserId: boolean = false
  private isValidPassword: boolean = false

  constructor({
    inputUserIdEl,
    inputPasswordEl
  }: {
    inputUserIdEl: Element
    inputPasswordEl: Element
  }) {
    this.inputUserIdEl = inputUserIdEl
    this.inputPasswordEl = inputPasswordEl
    this.setEvent()
  }

  /**
   * input要素にイベントをセット
   */
  setEvent = () => {
    // ユーザーIDのイベントセット
    this.inputUserIdEl.addEventListener('focus', () => {
      this.isFocusUserIdEl = true
    })
    this.inputUserIdEl.addEventListener('blur', (event) => {
      // 非入力中状態に更新
      this.isFocusUserIdEl = false
      // バリデーション情報を更新
      const userId = (event.target as HTMLInputElement).value
      this.isValidUserId = userId.length > 0
    })

    // パスワードのイベントセット
    this.inputPasswordEl.addEventListener('focus', () => {
      this.isFocusPasswordEl = true
    })
    this.inputPasswordEl.addEventListener('blur', (event) => {
      // 非入力中状態に更新
      this.isFocusPasswordEl = false
      // バリデーション情報を更新
      const password = (event.target as HTMLInputElement).value
      this.isValidPassword = getResultOfValidPassword(password)
    })
  }

  /**
   * ユーザーIDを入力中かを取得
   * @return {boolean}
   */
  getIsFocusUserIdEl = () => this.isFocusUserIdEl
  /**
   * パスワードを入力中かを取得
   * @return {boolean}
   */
  getIsFocusPasswordEl = () => this.isFocusPasswordEl

  /**
   * ユーザーIDのバリデーション結果を取得
   * @return {boolean}
   */
  getIsValidUserId = () => this.isValidUserId
  /**
   * パスワードのバリデーション結果を取得
   * @return {boolean}
   */
  getIsValidPassword = () => this.isValidPassword
}
