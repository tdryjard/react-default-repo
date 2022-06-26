import React, { ReactElement, useState, useEffect, useContext } from 'react'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'

import { Menu, Header } from 'components'
import { windowSizes } from 'styles/mediaQuery'
import { routes } from 'router'
import { styled, mediaQuery, theme } from 'styles'
import { Route } from 'types'
import { authUtils, homeRouteUtils } from 'utils'
import { UserContext } from 'providers'
import { useAuth } from 'hooks'

interface Props {
  children: ReactElement
}

export const Wrapper = styled.div`
  width: 100%;
  background: ${theme.color.white};
  display: flex;
  flex-direction: ${({ direction }: { direction: string }) => direction};
`

export const Container = styled.div`
  margin: 16px;
  border-radius: 13px;
  width: calc(92vw - 312px);
  height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  padding-left: 74px;
  padding-bottom: 85px;
  overflow-x: hidden;
  margin-top: 150px;
  overflow-y: scroll;
  ${mediaQuery.mobile} {
    width: 95vw;
    padding-left: 0;
    height: calc(100vh - 90px);
    max-height: calc(100vh - 90px);
    margin-top: 30px;
  }
`

const PageWrapper = ({ children }: Props): ReactElement => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useContext(UserContext)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < windowSizes.mobile)
  const [isMobileMenuDisplayed, setIsMobileMenuDisplayed] = useState<boolean>(false)
  const { getMyInformations } = useAuth()

  useEffect(() => {
    window.addEventListener('resize', () =>
      window.innerWidth < windowSizes.mobile ? setIsMobile(true) : setIsMobile(false),
    )
    return () =>
      window.removeEventListener('resize', () =>
        window.innerWidth < windowSizes.mobile ? setIsMobile(true) : setIsMobile(false),
      )
  }, [])

  useEffect(() => {
    getMyInformations()
  }, [])

  useEffect(() => {
    // listen disconnect
    if (!authUtils.isAuth()) {
      navigate(routes.login.path)
    }
  }, [isAuthenticated])

  const currentRouteKey: string | undefined = Object.keys(routes).find(
    (key) => routes[key].path === pathname,
  )

  const currentRoute: Route | undefined =
    currentRouteKey !== undefined ? routes[currentRouteKey] : undefined

  const isAuthorizedCurrentRoute: boolean = Object.keys(routes).some((key) =>
    routes[key].access.includes(user.role),
  )

  if (!isAuthorizedCurrentRoute) {
    return <Navigate to={homeRouteUtils(user.role)} />
  }
  if (currentRoute?.haveMenu) {
    return (
      <Wrapper direction="column">
        <Header isMobile={isMobile} setIsMobileMenuDisplayed={setIsMobileMenuDisplayed} />
        <Wrapper direction="row">
          <Menu
            isMobile={isMobile}
            setIsMobileMenuDisplayed={setIsMobileMenuDisplayed}
            isMobileMenuDisplayed={isMobileMenuDisplayed}
          />
          <Container>{children}</Container>
        </Wrapper>
      </Wrapper>
    )
  }
  return <Wrapper>{children}</Wrapper>
}

export default PageWrapper
export { default as Login } from 'pages/login'
