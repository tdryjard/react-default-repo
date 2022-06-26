import React, { ReactElement, useState } from 'react'

import { LoginForm } from 'components/login'
import { ResetPasswordModal } from 'components/modals'
import { Container, BrandingContainer } from './style'

function Login(): ReactElement {
  const [isResetPasswordDisplayed, setIsResetPasswordDisplayed] = useState<boolean>(false)

  return (
    <Container data-testid="login-page">
      <ResetPasswordModal
        isDisplayed={isResetPasswordDisplayed}
        setIsDisplayed={setIsResetPasswordDisplayed}
      />
      <BrandingContainer />
      <LoginForm setIsResetPasswordDisplayed={setIsResetPasswordDisplayed} />
    </Container>
  )
}

export default Login
