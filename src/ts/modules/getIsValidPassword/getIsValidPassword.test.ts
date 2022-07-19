// module
import { getIsValidPassword } from './getIsValidPassword'

describe('test: getIsValidPassword', () => {
  it('正しいパスワードテスト', () => {
    expect(getIsValidPassword('a1Ss0x1nvMrkgs6')).toBe(true)
  })

  it('文字数が足りない場合', () => {
    expect(getIsValidPassword('a1Ss0x')).toBe(false)
  })

  it('英大文字が存在しない場合', () => {
    expect(getIsValidPassword('a1ss0x1nvmrkgs6')).toBe(false)
  })

  it('英小文字が存在しない場合', () => {
    expect(getIsValidPassword('A1SS0X1NVMRKGS6')).toBe(false)
  })

  it('数値が存在しない場合', () => {
    expect(getIsValidPassword('aXSsIxInvMrkgsX')).toBe(false)
  })
})
