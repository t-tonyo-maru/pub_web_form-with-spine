// modules
import { getResultOfValidPassword } from './getResultOfValidPassword/getResultOfValidPassword'

/**
 * input要素を制御するオブジェクトを生成する
 */
export class Form {
  // ユーザーID input要素
  private inputUserIdEl: Element
  // パスワード input要素
  private inputPasswordEl: Element
  // input の値
  private userIdValue: string = ''
  private passwordValue: string = ''
  // 入力中か
  private isFocusUserIdEl: boolean = false
  private isFocusPasswordEl: boolean = false

  /**
   * @param {Element} inputUserIdEl ユーザーIDのinput要素
   * @param {Element} inputPasswordEl パスワードのinput要素
   */
  constructor({ inputUserIdEl, inputPasswordEl }: { inputUserIdEl: Element; inputPasswordEl: Element }) {
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
    this.inputUserIdEl.addEventListener('blur', () => {
      this.isFocusUserIdEl = false
    })
    this.inputUserIdEl.addEventListener('keydown', (event) => {
      this.userIdValue = (event.target as HTMLInputElement).value
    })

    // パスワードのイベントセット
    this.inputPasswordEl.addEventListener('focus', () => {
      this.isFocusPasswordEl = true
    })
    this.inputPasswordEl.addEventListener('blur', (event) => {
      this.isFocusPasswordEl = false
      this.passwordValue = (event.target as HTMLInputElement).value
    })
    // this.inputPasswordEl.addEventListener('keydown', (event) => {
    //   this.passwordValue = (event.target as HTMLInputElement).value
    // })
  }

  /**
   * input 要素を取得
   * @return {Element}
   */
  getInputUserIdEl = () => this.inputUserIdEl
  getInputPasswordEl = () => this.inputPasswordEl

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
   * ユーザーIDの値を取得
   * @return {boolean}
   */
  getUserIdValue = () => this.userIdValue
  /**
   * パスワードの値を取得
   * @return {boolean}
   */
  getPasswordValue = () => this.passwordValue

  /**
   * ユーザーIDのバリデーション結果を取得
   * @return {boolean}
   */
  getIsValidUserId = () => this.userIdValue.length > 0
  /**
   * パスワードのバリデーション結果を取得
   * @return {boolean}
   */
  getIsValidPassword = () => getResultOfValidPassword(this.passwordValue)
}
