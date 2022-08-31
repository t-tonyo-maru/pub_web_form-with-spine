// modules
import { getResultOfValidPassword } from './getResultOfValidPassword/getResultOfValidPassword'

/**
 * input要素を管理するオブジェクトを生成する
 */
export class Form {
  // ユーザーネーム input要素
  private inputUserNameEl: Element
  // パスワード input要素
  private inputPasswordEl: Element
  // input の値
  private userNameValue: string = ''
  private passwordValue: string = ''
  // 入力中か
  private isFocusUserNameEl: boolean = false
  private isFocusPasswordEl: boolean = false
  // はじめての入力が完了したか
  private isInitialInputUserName: boolean = false
  private isInitialInputPassword: boolean = false

  /**
   * @param {Element} inputUserNameEl ユーザーネームのinput要素
   * @param {Element} inputPasswordEl パスワードのinput要素
   */
  constructor({ inputUserNameEl, inputPasswordEl }: { inputUserNameEl: Element; inputPasswordEl: Element }) {
    this.inputUserNameEl = inputUserNameEl
    this.inputPasswordEl = inputPasswordEl
    this.setEvent()
  }

  /**
   * input要素にイベントをセット
   */
  setEvent = () => {
    // ユーザーネームのイベントセット
    this.inputUserNameEl.addEventListener('focus', () => {
      this.isFocusUserNameEl = true
    })
    this.inputUserNameEl.addEventListener('blur', (event) => {
      this.isFocusUserNameEl = false
      this.userNameValue = (event.target as HTMLInputElement).value

      if (!this.isInitialInputUserName) this.isInitialInputUserName = true
    })
    this.inputUserNameEl.addEventListener('keydown', (event) => {
      this.userNameValue = (event.target as HTMLInputElement).value
    })

    // パスワードのイベントセット
    this.inputPasswordEl.addEventListener('focus', () => {
      this.isFocusPasswordEl = true
    })
    this.inputPasswordEl.addEventListener('blur', (event) => {
      this.isFocusPasswordEl = false
      this.passwordValue = (event.target as HTMLInputElement).value

      if (!this.isInitialInputPassword) this.isInitialInputPassword = true
    })
  }

  /**
   * input 要素を取得
   * @return {Element}
   */
  getInputUserNameEl = () => this.inputUserNameEl
  getInputPasswordEl = () => this.inputPasswordEl

  /**
   * ユーザーネームを入力中かを取得
   * @return {boolean}
   */
  getIsFocusUserNameEl = () => this.isFocusUserNameEl
  /**
   * パスワードを入力中かを取得
   * @return {boolean}
   */
  getIsFocusPasswordEl = () => this.isFocusPasswordEl

  /**
   * ユーザーネームの値を取得
   * @return {boolean}
   */
  getUserNameValue = () => this.userNameValue
  /**
   * パスワードの値を取得
   * @return {boolean}
   */
  getPasswordValue = () => this.passwordValue

  /**
   * ユーザーネームのバリデーション結果を取得
   * @return {boolean}
   */
  getIsValidUserName = () => this.userNameValue.length > 0
  /**
   * パスワードのバリデーション結果を取得
   * @return {boolean}
   */
  getIsValidPassword = () => getResultOfValidPassword(this.passwordValue)

  /**
   * ユーザーネーム/パスワードのはじめての入力が完了したか
   * @return {boolean}
   */
  getIsDoneInitialInput = () => this.isInitialInputUserName && this.isInitialInputPassword
}
