import { cookies, authService } from 'services'
import { authUtils } from 'utils'
import { COOKIES } from 'constants/index'

const clearCookies = () => {
  cookies.clear('expires')
  cookies.clear('token')
  cookies.clear('refreshToken')
  cookies.clear('superAdminToken')
  cookies.clear('selectedCompanyToken')
}

export const getCheckedToken = async (): Promise<string> => {
  const currentToken = cookies.get(COOKIES.TOKEN) || ''
  const tokenExp = authUtils.decodedJwt()?.exp
  if (currentToken && authUtils.hasExpired(tokenExp)) {
    const refreshToken = cookies.get(COOKIES.REFRESH_TOKEN)
    if (refreshToken) {
      const newToken = await authService.refresh({ refreshToken })
      cookies.set([
        { key: 'refreshToken', value: newToken.refreshToken },
        { key: 'token', value: newToken.token },
      ])
      return newToken.refreshToken
    } else {
      clearCookies()
      return ''
    }
  }
  return currentToken
}
