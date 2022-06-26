import { authUtils } from 'utils'
import { cookies } from 'services'
import { COOKIES } from 'constants/index'

describe(':: authUtils.hasExpired()', function () {
  it(`When => jwt expiré => Expect hasExpired = true`, function () {
    const expiredJwt =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTI3NzQyMTcsImV4cCI6MTU1Mjc3NzgxNywicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRob21hcy5kcnlqYXJkQGtpc3N0aGVicmlkZS5mciJ9.JqJ62Trf1fwri8I32XI_4WG05HbVJXblKBpM3zDZ1_RO3X6wQuIHi3_M5qDnIJvxGtjPDjfUnkH1h6s7GfMbnjcD2ERAxXkE2u-7BHoQ8XVLM8yNb6SbmZG95xHw9JneYzaf_o215JxN658F3UJI2RYHp_8BczjbsFQ0fsOEzqs7CFFc4s2Nl1JON5JwmBl2uf0X41ZD3leISE5J0pHa-Iy7eYGKgGieK5AXmGJK03QuzO1G-8lkE2FFp66V_RvWZh3hfMi0gG_96dNIYf0rGys8miLGpsnjBPlI84-gt9S8JCv2dwubiORx3LAagKZFaGyuERB75bH7SXvARn6dHQ'

    const decodedJwt = authUtils.decodedJwt(expiredJwt)
    const hasExpiredResult = authUtils.hasExpired(decodedJwt.exp)
    expect(hasExpiredResult).toBe(true)
  })
  it(`When => jwt non expiré => Expect hasExpired = false`, function () {
    const validJwt =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjI1NTI3NzQyMTcsImV4cCI6MjU1Mjc3NzgxNywicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRob21hcy5kcnlqYXJkQGtpc3N0aGVicmlkZS5mciJ9.5NjkMvI7zMLvlmQWfhlrclwEL81SuROqMKd6Q2ZKZrX0h8BTQ4v_oAiNkXYWjCGUEoFfa51Bep3eikH1s4uPEb6Lv9ca0ibwcYDAFFnak-_eWCVJ_lN95smiFzf-80OIjv4TiDhbTQLRj99OyO62uYM7CEK5l3eJ3ULqNaLioVAZVbqbCnh8fgiMfAbXrORhK-nVwwRdNowZ7OFe5ueVOhGWBg7QmHJtZ-Jp1Aqmu16RCUjT3LIhrXUnNcFsuB6Gh-nnClbwRkKFanF8P6CIQMVL3UADnN4XQ7k2CG2PXx6tkUThi0UfqQ-nQZjmH_sWsEIwqp5L9jp8-IK3koEBag'

    const decodedJwt = authUtils.decodedJwt(validJwt)
    const hasExpiredResult = authUtils.hasExpired(decodedJwt.exp)
    expect(hasExpiredResult).toBe(false)
  })
})

describe(':: authUtils.isAuth()', function () {
  it(`When => set cookie avec jwt expiré => Expect isAuth() = false`, function () {
    const expiredJwt =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTI3NzQyMTcsImV4cCI6MTU1Mjc3NzgxNywicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRob21hcy5kcnlqYXJkQGtpc3N0aGVicmlkZS5mciJ9.JqJ62Trf1fwri8I32XI_4WG05HbVJXblKBpM3zDZ1_RO3X6wQuIHi3_M5qDnIJvxGtjPDjfUnkH1h6s7GfMbnjcD2ERAxXkE2u-7BHoQ8XVLM8yNb6SbmZG95xHw9JneYzaf_o215JxN658F3UJI2RYHp_8BczjbsFQ0fsOEzqs7CFFc4s2Nl1JON5JwmBl2uf0X41ZD3leISE5J0pHa-Iy7eYGKgGieK5AXmGJK03QuzO1G-8lkE2FFp66V_RvWZh3hfMi0gG_96dNIYf0rGys8miLGpsnjBPlI84-gt9S8JCv2dwubiORx3LAagKZFaGyuERB75bH7SXvARn6dHQ'
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `token=${expiredJwt}`,
    })
    expect(authUtils.isAuth()).toBe(false)
  })
  it(`When => set cookie avec un jwt valide => Expect isAuth() = true`, function () {
    const validJwt =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjI1NTI3NzQyMTcsImV4cCI6MjU1Mjc3NzgxNywicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRob21hcy5kcnlqYXJkQGtpc3N0aGVicmlkZS5mciJ9.5NjkMvI7zMLvlmQWfhlrclwEL81SuROqMKd6Q2ZKZrX0h8BTQ4v_oAiNkXYWjCGUEoFfa51Bep3eikH1s4uPEb6Lv9ca0ibwcYDAFFnak-_eWCVJ_lN95smiFzf-80OIjv4TiDhbTQLRj99OyO62uYM7CEK5l3eJ3ULqNaLioVAZVbqbCnh8fgiMfAbXrORhK-nVwwRdNowZ7OFe5ueVOhGWBg7QmHJtZ-Jp1Aqmu16RCUjT3LIhrXUnNcFsuB6Gh-nnClbwRkKFanF8P6CIQMVL3UADnN4XQ7k2CG2PXx6tkUThi0UfqQ-nQZjmH_sWsEIwqp5L9jp8-IK3koEBag'
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `token=${validJwt}`,
    })
    expect(authUtils.isAuth()).toBe(true)
  })
})

describe(':: cookies.get()', function () {
  it(`When => Save cookies token/refreshToken => Expect cookie.get(token)/cookie.get(refreshToken) === token sauvegardé`, async function () {
    document.cookie = `token=;refreshToken=`
    expect(cookies.get(COOKIES.TOKEN)).toBe('')
    expect(cookies.get(COOKIES.REFRESH_TOKEN)).toBe('')
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjI1NTI3NzQyMTcsImV4cCI6MjU1Mjc3NzgxNywicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRob21hcy5kcnlqYXJkQGtpc3N0aGVicmlkZS5mciJ9.5NjkMvI7zMLvlmQWfhlrclwEL81SuROqMKd6Q2ZKZrX0h8BTQ4v_oAiNkXYWjCGUEoFfa51Bep3eikH1s4uPEb6Lv9ca0ibwcYDAFFnak-_eWCVJ_lN95smiFzf-80OIjv4TiDhbTQLRj99OyO62uYM7CEK5l3eJ3ULqNaLioVAZVbqbCnh8fgiMfAbXrORhK-nVwwRdNowZ7OFe5ueVOhGWBg7QmHJtZ-Jp1Aqmu16RCUjT3LIhrXUnNcFsuB6Gh-nnClbwRkKFanF8P6CIQMVL3UADnN4XQ7k2CG2PXx6tkUThi0UfqQ-nQZjmH_sWsEIwqp5L9jp8-IK3koEBag'

    document.cookie = `token=${token};refreshToken=${token}`
    expect(cookies.get(COOKIES.TOKEN)).toBe(token)
    expect(cookies.get(COOKIES.REFRESH_TOKEN)).toBe(token)
  })
})
