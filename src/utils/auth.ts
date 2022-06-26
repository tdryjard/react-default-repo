import { LoginResponse } from 'types/api'
import { cookies } from 'services'
import { JWTPayload } from 'types'
import { ROLES, COOKIES } from 'constants/index'

const decodedJwt = (token: string = cookies.get(COOKIES.TOKEN)): JWTPayload => {
  const base64Url = token.split('.')[1]
  if (base64Url === undefined || base64Url === '') {
    return {
      company: '',
      exp: 0,
      iat: 0,
      roles: [],
      username: '',
    }
  }
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  )
  return JSON.parse(jsonPayload)
}

const hasExpired = (expirationDate = decodedJwt()?.exp): boolean => {
  if (expirationDate === 0) {
    return false
  }
  return (
    expirationDate === undefined ||
    parseInt(Date.now().toString().substring(0, 10), 0) >= expirationDate
  )
}

const auth = {
  decodedJwt,
  hasExpired,
  isAuth: (): boolean => {
    const tokenExpiration = decodedJwt()?.exp
    return tokenExpiration !== undefined && tokenExpiration !== 0 && !hasExpired()
  },
  currentRole: (): string => {
    const tokenRoles = decodedJwt()?.roles
    return tokenRoles[0]
  },
  saveUserCookies: ({ token, refreshToken }: LoginResponse, callback: () => void): void => {
    cookies.set([
      { key: 'token', value: token },
      { key: 'refreshToken', value: refreshToken },
    ])
    callback()
  },
}

export default auth
