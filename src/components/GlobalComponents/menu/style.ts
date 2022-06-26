import { styled, theme, mediaQuery } from 'styles'
import { Row, defaultButton } from 'styles/global'

export const MenuWrapper = styled.div`
  height: 100vh;
  width: 350px;
  background: white;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 60px;
  padding-top: 15px;
  ${mediaQuery.desktop} {
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      height: 100vh;
      width: 35px;
      background: ${({ isAdmin }: { isAdmin: boolean }) =>
        isAdmin ? theme.color.brown : theme.color.topToBottomGradient};
      clip-path: polygon(
        0 0,
        0% 0%,
        10% 0%,
        100% 7%,
        100% 100%,
        100% 100%,
        0% 100%,
        0% 90%,
        0% 10%
      );
    }
  }
  ${mediaQuery.mobile} {
    background: ${theme.color.primaryGradient};
    width: 100%;
    max-height: calc(100vh - 80px);
    padding-top: 40px;
  }
`

export const MenuItem = styled(Row)`
  align-items: center;
  padding: 10px 20px;
  color: ${theme.color.black};

  ${mediaQuery.mobile} {
    color: white;
    opacity: 0.8;
    font-weight: bold;
    font-size: 16px;
  }

  ${({ isActive }: { isActive: boolean }) =>
    isActive &&
    `
    ${mediaQuery.desktop}{
      ${defaultButton}
    color: ${theme.color.white};
    background-color: ${theme.color.primary};
    width: auto;
    }
    
    ${mediaQuery.mobile}{
      opacity: 1;
    }
    `};
`

export const LogoMini = styled.img`
  width: 50px;
  height: auto;
`

export const Logo = styled.img`
  width: 140px;
  height: auto;
  margin-bottom: 20px;
`

export const MenuFooter = styled.div`
  position: absolute;
  bottom: 30px;
  left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const UserLogo = styled.img`
  border-radius: 50%;
  margin: 0;
  height: 50px;
  width: 50px;
  margin-right: 20px;
`
