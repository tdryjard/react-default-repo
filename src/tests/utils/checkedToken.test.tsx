import React from 'react'
import { screen } from '@testing-library/dom'

import ComponentWrapper from '../ComponentWrapper'

import { Login } from 'pages'

import { getCheckedToken } from 'utils'
import { cookies } from 'services'
import { COOKIES } from 'constants/index'

describe(`:: utils :: checkedToken`, function () {
  describe(`When => cookies.token.exp === expired`, function () {
    it(`Expect => return new token`, async function () {
      ComponentWrapper({ children: <Login /> })
      document.cookie = `token=;refreshToken=`
      expect(cookies.get(COOKIES.TOKEN)).toBe('')
      expect(cookies.get(COOKIES.REFRESH_TOKEN)).toBe('')
      // token date =  Sunday 12 June 2022 12:05:11 / 1655035511
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjI1NTI3NzQyMTcsImV4cCI6MTY1NTAzNTUxMSwicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRob21hcy5kcnlqYXJkQGtpc3N0aGVicmlkZS5mciJ9.pZWWGGxAcFkKvALFvp9S1WkMvFuXJSq3KZBi86GtNHW5DiGIOK-m68NE-w1kfqPayrJaAUToH-XqHkTyjK6PnCHVrPAeKw2WxG2-EuHlZBfGfHYDpA8WCCcL4k2si2MT5K8LSzqFvq_VaFhhK7hLCK-u47pBfQrSoBop76akLD8tJkvCvLmErlhYNB8sCj9OSsqucIv1B55UV6Lzg52bqA8i4R7-fvk7aBE9zuhHMt2W4cppyxDMWOrHI68_1Vl6M99UaEQ-bXPuuA-epzJy7E00XZLUnBPREusD_GC7S11KLVqVPGUyQTdR6P1Q22N6-hNNXchFyjRBqYYCu4ImWA'

      const refreshToken =
        '65db552f7adb80fb56a3e6a2eaeb6d1314cb9619e513423ec7b18bdc56e39420b4de0301aea2f330a817882741764fbceb35da42a4c2ec636c3830ea3715661c'
      document.cookie = `token=${token};refreshToken=${refreshToken}`
      const newToken = await getCheckedToken()
      expect(newToken).not.toBe(token || undefined || '')
    })
  })
  describe(`When => cookies.token.exp is not expired`, function () {
    it(`Expect => return same token`, async function () {
      // token date =  Sunday 11 June 2050 12:05:11 / 2552777817
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjI1NTI3NzQyMTcsImV4cCI6MjU1Mjc3NzgxNywicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRob21hcy5kcnlqYXJkQGtpc3N0aGVicmlkZS5mciJ9.5NjkMvI7zMLvlmQWfhlrclwEL81SuROqMKd6Q2ZKZrX0h8BTQ4v_oAiNkXYWjCGUEoFfa51Bep3eikH1s4uPEb6Lv9ca0ibwcYDAFFnak-_eWCVJ_lN95smiFzf-80OIjv4TiDhbTQLRj99OyO62uYM7CEK5l3eJ3ULqNaLioVAZVbqbCnh8fgiMfAbXrORhK-nVwwRdNowZ7OFe5ueVOhGWBg7QmHJtZ-Jp1Aqmu16RCUjT3LIhrXUnNcFsuB6Gh-nnClbwRkKFanF8P6CIQMVL3UADnN4XQ7k2CG2PXx6tkUThi0UfqQ-nQZjmH_sWsEIwqp5L9jp8-IK3koEBag'

      document.cookie = `token=${token}`
      const newToken = await getCheckedToken()
      expect(newToken).toBe(token)
    })
  })
  describe(`When => cookies.refreshToken === undefined`, function () {
    it(`Expect => cookies.token === undefined`, async function () {
      // token date =  Sunday 11 June 2050 12:05:11 / 2552777817
      const token = ''
      document.cookie = `token=${token}`
      const newToken = await getCheckedToken()
      expect(newToken).toBe(undefined || '')
    })
  })
})
