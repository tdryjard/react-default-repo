import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

import { UserContext } from 'providers'
import { authService, cookies } from 'services'
import { authUtils, homeRouteUtils } from 'utils'
import { MeResponse } from 'types/api'
import routes from 'router/routes'
import { ROLES, COOKIES } from 'constants/index'

interface ReturnType {
  login: ({ username, password }) => void
  getMyInformations: () => void
  isLoading: boolean
  logout: () => void
}

const useAuth = (): ReturnType => {
  const { setIsAuthenticated, setUser, user, resetUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Logout by clearing cookies and context
  const logout = (): void => {
    cookies.clear('expires')
    cookies.clear('token')
    cookies.clear('refreshToken')
    cookies.clear('superAdminToken')
    cookies.clear('selectedCompanyToken')
    setIsAuthenticated(false)
    resetUser()
    navigate(routes.login.path)
    setIsLoading(false)
  }

  const feedAuthCookies = (data): void => {
    const { token, refreshToken } = data
    const payload = authUtils.decodedJwt(data.token)
    const setCookies = [
      { key: 'token', value: token },
      { key: 'refreshToken', value: refreshToken },
    ]
    if (payload.roles.includes(ROLES.SUPER_ADMIN)) {
      setCookies.push({ key: 'superAdminToken', value: token })
    }
    cookies.set(setCookies)
  }

  // Get /me infromations when token cookies change (or logout if we have a invalid token)
  const { refetch: getMyInformations, isLoading: isMyInformationsLoading } = useQuery(
    `myInformations${user.id}`,
    async () => authUtils.isAuth() && authService.me(),
    {
      enabled: authUtils.isAuth(),
      onSuccess: (data: MeResponse) => {
        if (data.status === 200) {
          const token = cookies.get('token')
          const payload = authUtils.decodedJwt(token)
          setUser({
            ...user,
            ...data.user,
            company: data.company,
            token,
            exp: payload.exp,
          })

          setIsAuthenticated(true)
          setIsLoading(false)
        }
      },
    },
  )

  // Login with credentials given by login form
  const login = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }): Promise<void> => {
    setIsLoading(true)
    await authService
      .login({
        username,
        password,
      })
      .then(async (data) => {
        if (data.status === 200) {
          feedAuthCookies(data)
          await getMyInformations()
          setIsLoading(false)
          navigate(homeRouteUtils(authUtils.currentRole()))
          await message.success(t(data.message))
        } else {
          setIsLoading(false)
          await message.error(t(data.message))
        }
      })
  }

  useEffect(() => {
    setIsLoading(isMyInformationsLoading)
  }, [isMyInformationsLoading])

  return {
    login,
    getMyInformations,
    isLoading,
    logout,
  }
}

export default useAuth
