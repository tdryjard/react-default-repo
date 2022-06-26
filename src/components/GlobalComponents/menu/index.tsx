import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SettingFilled, GoldFilled, TagFilled, HomeFilled, CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { homeRouteUtils } from 'utils'
import { Text, Drawer, Row } from 'styles/global'
import { MenuWrapper, LogoMini, MenuFooter, Logo, MenuItem, UserLogo } from './style'
import { ROLES } from 'constants/index'
import { routes } from 'router'
import { theme } from 'styles'

import { UserContext } from 'providers'
import { UserProviderType } from 'types/providers'

import logoMini from 'assets/icons/logo_mini.svg'
import logo from 'assets/icons/logo.png'
import switchIcon from 'assets/icons/switch_white.svg'

const MenuContent = ({
  isMobile,
  user,
  resetUser,
}: {
  isMobile: boolean
  user: UserProviderType
  resetUser: () => void
}) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const homeRoute = homeRouteUtils(user.role)

  const isActiveLink = (path: string): string => {
    return path === pathname ? 'bold' : ''
  }

  const defaultIconStyle = (isActive) => ({
    color: isMobile || isActive ? 'white' : theme.color.primary,
    fontSize: '20px',
    marginRight: '15px',
    opacity: isActive ? '1' : '0.4',
  })

  const isAdmin = user.role === ROLES.SUPER_ADMIN || user.switched

  return (
    <MenuWrapper isAdmin={isAdmin}>
      {isMobile === false && (
        <>
          <LogoMini src={logoMini} />
          <Text margin="15px 0">TITLE APP</Text>
        </>
      )}
      <Link to={homeRoute}>
        <MenuItem isActive={isActiveLink(homeRoute)}>
          <HomeFilled style={defaultIconStyle(isActiveLink(homeRoute))} />
          Home
        </MenuItem>
      </Link>
      {isMobile === false ? (
        <MenuFooter>
          <Logo src={logo} />
          <Text size="12px">Contact + 33 4 56 43 32 34</Text>
          <Text size="12px">email@gmail.com</Text>
        </MenuFooter>
      ) : (
        isMobile === true && (
          <MenuItem onClick={resetUser} isMobile={isMobile} margin="15px 0 0 0">
            <img
              src={switchIcon}
              style={defaultIconStyle(isActiveLink(routes.distributorProducts.path))}
            />
            {t('disconnect')}
          </MenuItem>
        )
      )}
    </MenuWrapper>
  )
}

const Menu = ({
  isMobile,
  isMobileMenuDisplayed,
  setIsMobileMenuDisplayed,
}: {
  isMobile: boolean
  isMobileMenuDisplayed: boolean
  setIsMobileMenuDisplayed: Dispatch<SetStateAction<boolean>>
}) => {
  const { pathname } = useLocation()
  const { user, resetUser } = useContext(UserContext)

  // auto close mobile drawer when navigate
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuDisplayed(false)
    }
  }, [pathname])

  return isMobile ? (
    <>
      <Drawer
        title={
          // TO DO intégration future
          <Row>
            <UserLogo src={user.company.logo} />
            <Text>
              Jean-chritophe
              <br />
              SAVENCIA
            </Text>
          </Row>
        }
        closeIcon={
          <CloseOutlined
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontSize: '20px',
            }}
          />
        }
        placement="left"
        visible={isMobileMenuDisplayed}
        onClose={() => setIsMobileMenuDisplayed(false)}
      >
        <MenuContent isMobile={isMobile} user={user} resetUser={resetUser} />
      </Drawer>
    </>
  ) : (
    <MenuContent isMobile={isMobile} user={user} resetUser={resetUser} />
  )
}

export default Menu
