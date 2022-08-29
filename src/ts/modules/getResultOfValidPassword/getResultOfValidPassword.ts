/**
 * パスワードの強度をチェックする
 * 半角英小文字をそれぞれ1文字以上含むこと
 * 半角数字を1文字以上含むこと
 * @param {string} password - 対象パスワード
 * @return {boolean} - 対象パスワードの強度が条件を通過したか
 */
export const getResultOfValidPassword = (password: string): boolean => {
  // パスワードの長さは8文字以上か
  if (password.length < 8) return false
  // 半角英小文字を含むか
  if (!password.match(/([a-z])/)) return false
  // 半角数字を含むか
  if (!password.match(/([0-9])/)) return false

  return true
}
