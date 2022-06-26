import { styled, mediaQuery, theme } from 'styles'
import { Row, Column, Text } from 'styles/global'
import logo from 'assets/login/logo.png'
import background from 'assets/login/background.png'
import keyIcon from 'assets/icons/key.svg'

export const Container = styled(Row)`
  width: 100vw;
  height: 100vh;
`

export const FormContainer = styled(Column)`
  width: 35%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  ${mediaQuery.mobile} {
    width: 100%;
  }
`

export const BrandingContainer = styled(Column)`
  width: 65%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url(${background});
  background-size: cover;
  ${mediaQuery.mobile} {
    display: none;
  }
`

export const KeyIcon = styled.img.attrs({
  src: keyIcon,
})`
  width: 40px;
  height: auto;
  margin-bottom: 10px;
`

export const ColumnResetPasswordRules = styled(Column)`
  background: ${theme.color.beige};
  min-height: 165px;
  padding: 15px;
`

export const Rules = styled(Text)`
  color: ${({ valid }: { valid: boolean }) => valid && theme.color.primary};
  text-decoration: ${({ valid }: { valid: boolean }) => valid && 'line-through'};
`
