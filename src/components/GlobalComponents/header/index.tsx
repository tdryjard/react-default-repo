import React, { Dispatch, SetStateAction, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { UserContext } from 'providers'
import { ROLES } from 'constants/index'
import { routes } from 'router'
import { HeaderContainer, Logo, CollapseIcon, UserLogo, MenuIcon } from './style'
import { Collapse, Column, Text } from 'styles/global'

import logo from 'assets/icons/logo.png'
import userIcon from 'assets/icons/user.svg'
import switchIcon from 'assets/icons/switch.svg'
import { Link } from 'react-router-dom'

type Props = {
  isMobile: boolean
  setIsMobileMenuDisplayed: Dispatch<SetStateAction<boolean>>
}

const Header = ({ isMobile, setIsMobileMenuDisplayed }: Props) => {
  const { t } = useTranslation()
  const { user, resetUser } = useContext(UserContext)

  return (
    <HeaderContainer>
      {isMobile && (
        <>
          <MenuIcon
            onClick={() => setIsMobileMenuDisplayed(true)}
            style={{ fontSize: '25px', cursor: 'pointer' }}
          />
          <Logo src={logo} />
        </>
      )}
      {!isMobile && (
        <Collapse>
          <Collapse.Panel
            header={
              <Column>
                <Text weight="bold">{user.firstname}</Text>
                <Text>{user.company.name}</Text>
              </Column>
            }
            key="1"
          >
            <Column>
              {user.role !== ROLES.SUPER_ADMIN && (
                <Link style={{ marginBottom: '15px' }} to={routes.myAccount.path}>
                  <Text pointer={true}>
                    <CollapseIcon src={userIcon} alt="user icon" />
                    {t('myAccount')}
                  </Text>
                </Link>
              )}
              <Text pointer={true} onClick={resetUser}>
                <CollapseIcon src={switchIcon} alt="user icon" />
                {t('disconnect')}
              </Text>
            </Column>
          </Collapse.Panel>
        </Collapse>
      )}
      <UserLogo src={user.company.logo} />
    </HeaderContainer>
  )
}

export default Header
