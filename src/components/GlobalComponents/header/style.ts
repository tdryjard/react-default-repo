import { MenuOutlined } from '@ant-design/icons'
import { styled, theme, mediaQuery } from 'styles'
import { Row } from 'styles/global'

export const HeaderContainer = styled(Row)`
  width: calc(100vw - 330px);
  position: absolute;
  top: 0;
  right: 0;
  height: 90px;
  background: white;
  justify-content: flex-end;
  padding: 10px 85px;
  ${mediaQuery.mobile} {
    padding: 10px 25px;
    width: 100vw;
    height: 80px;
    background: white;
    position: relative;
    justify-content: space-between;
    align-items: center;
  }
`

export const UserLogo = styled.img`
  max-height: 65px;
  margin: 0 50px;
  border-radius: 4px;
  margin-top: 3px;
  ${mediaQuery.mobile} {
    border-radius: 50%;
    margin: 0;
    height: 50px;
    width: 50px;
  }
`

export const Logo = styled.img`
  max-height: 65px;
  margin: 30px;
  height: auto;
  width: auto;
  max-width: 50vw;
`

export const CollapseIcon = styled.img`
  width: 20px;
  height: auto;
  margin-right: 20px;
`
export const MenuIcon = styled(MenuOutlined)`
  fontsize: 25px;
  color: ${theme.color.black};
`
