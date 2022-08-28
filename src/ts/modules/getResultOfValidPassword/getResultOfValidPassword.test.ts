// module
import { getResultOfValidPassword } from './getResultOfValidPassword'

describe('test: getResultOfValidPassword', () => {
  it('正しいパスワードテスト', () => {
    expect(getResultOfValidPassword('a1Ss0x1nvMrkgs6')).toBe(true)
  })

  it('文字数が足りない場合', () => {
    expect(getResultOfValidPassword('a1Ss0x')).toBe(false)
  })

  it('英大文字が存在しない場合', () => {
    expect(getResultOfValidPassword('a1ss0x1nvmrkgs6')).toBe(false)
  })

  it('英小文字が存在しない場合', () => {
    expect(getResultOfValidPassword('A1SS0X1NVMRKGS6')).toBe(false)
  })

  it('数値が存在しない場合', () => {
    expect(getResultOfValidPassword('aXSsIxInvMrkgsX')).toBe(false)
  })
})
