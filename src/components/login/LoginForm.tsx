import React, { ReactElement, useState, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { Input, InputPassword, Button, Form, Title, Text } from 'styles/global'
import { FormContainer } from 'pages/login/style'
import { useAuth } from 'hooks'
import { Loader } from 'components'

type Credential = {
  username: string
  password: string
}

function LoginForm({
  setIsResetPasswordDisplayed,
}: {
  setIsResetPasswordDisplayed: Dispatch<SetStateAction<boolean>>
}): ReactElement {
  const { t } = useTranslation()
  const [credentials, setCredentials] = useState<Credential>({
    username: '',
    password: '',
  })
  const { login, isLoading } = useAuth()

  return (
    <FormContainer>
      <Loader isDisplayed={isLoading} />
      <Title margin="40px">Connexion</Title>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() =>
          login({
            username: credentials.username,
            password: credentials.password,
          })
        }
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={t('username')}
          name={t('username')}
          rules={[
            {
              type: 'email',
              required: true,
              message: t('usernameRequired'),
            },
          ]}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('password')}
          name={t('password')}
          rules={[{ required: true, message: t('passwordRequired') }]}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        >
          <InputPassword />
        </Form.Item>

        <Text
          onClick={() => setIsResetPasswordDisplayed(true)}
          margin="-3px 0 5px"
          position="end"
          color="secondary"
          pointer
        >
          {t('auth.forgotPassword')}
        </Text>
        <Form.Item className="center">
          <Button.Primary margin="20px" type="primary" htmlType="submit">
            {t('auth.connect')}
          </Button.Primary>
        </Form.Item>
      </Form>
    </FormContainer>
  )
}

export default LoginForm
