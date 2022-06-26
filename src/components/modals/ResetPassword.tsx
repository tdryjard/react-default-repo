import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { message, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

import { urlParams } from 'utils'
import { Title, Text, ColumnCenter, Column, Row, Input, Button, InputPassword } from 'styles/global'
import { KeyIcon, ColumnResetPasswordRules, Rules } from 'pages/login/style'
import { PASSWORD_REGEX, EMAIL_REGEX } from 'constants/index'
import { authService } from 'services'
import { routes } from 'router'

type BottomButtonsProps = {
  validateCallback: () => void
  setIsDisplayed: Dispatch<SetStateAction<boolean>>
  t: (string) => string
}

const BottomButtons = ({ validateCallback, setIsDisplayed, t }: BottomButtonsProps) => {
  return (
    <Row responsive={`flex-direction: column-reverse;`}>
      <Button.Secondary onClick={() => setIsDisplayed(false)} margin="0 10px">
        {t('cancel')}
      </Button.Secondary>
      <Button.Primary
        responsive={`margin-bottom: 10px;`}
        onClick={validateCallback}
        margin="0 10px"
      >
        {t('send')}
      </Button.Primary>
    </Row>
  )
}

type Props = {
  isDisplayed: boolean
  setIsDisplayed: Dispatch<SetStateAction<boolean>>
}

const ResetPassword = ({ isDisplayed, setIsDisplayed }: Props) => {
  const [currentStep, setCurrentStep] = useState({
    SEND_EMAIL: true,
    RESET_PASSWORD: false,
  })
  const [email, setEmail] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>('')
  const [required, setRequired] = useState<{
    [key: string]: { valid: boolean; regex: RegExp }
  }>({
    charLength: { valid: false, regex: PASSWORD_REGEX.LENGTH },
    digit: { valid: false, regex: PASSWORD_REGEX.DIGIT },
    upper: { valid: false, regex: PASSWORD_REGEX.UPPER },
    special: { valid: false, regex: PASSWORD_REGEX.SPECIAL },
    lower: { valid: false, regex: PASSWORD_REGEX.LOWER },
  })
  const paramsUrl = urlParams()
  const { t } = useTranslation()

  useEffect(() => {
    if (paramsUrl.resetToken) {
      setCurrentStep({
        SEND_EMAIL: false,
        RESET_PASSWORD: true,
      })
    }
  }, [])

  const resetPasswordIsValid = () => {
    return (
      Object.keys(required).every((key) => required[key].valid === true) &&
      newPasswordRepeat === newPassword
    )
  }

  // check if we are on a reset password url
  useEffect(() => {
    if (paramsUrl.activationToken) {
      setIsDisplayed(true)
      setCurrentStep({
        SEND_EMAIL: false,
        RESET_PASSWORD: true,
      })
    }
  }, [])

  const sendResetEmail = () => {
    if (EMAIL_REGEX.test(email)) {
      authService
        .reset({
          email: email,
          redirectUrl: `${process.env.REACT_APP_URL}${routes.login.path}`,
          templateUrl: undefined,
          subject: t('auth.resetPassword.subject'),
          replyTo: process.env.REACT_APP_EMAIL_REPLY || '',
          fromName: process.env.REACT_APP_EMAIL_NAME || '',
          fromEmail: process.env.REACT_APP_EMAIL_FROM || '',
        })
        .then((res) => {
          message[res.status === 200 ? 'success' : 'error'](t(res.message))
          if (res.status === 200) {
            setIsDisplayed(false)
          }
        })
    } else {
      message.error(t('badEmail'))
    }
  }

  const validResetPassword = () => {
    if (resetPasswordIsValid()) {
      authService
        .validReset({
          email: decodeURI(paramsUrl.email),
          password: newPassword,
          activationToken: paramsUrl.activationToken,
          templateUrl: undefined,
          subject: t('auth.resetPassword.subjectConfirm'),
          replyTo: process.env.REACT_APP_EMAIL_REPLY || '',
          fromName: process.env.REACT_APP_EMAIL_NAME || '',
          fromEmail: process.env.REACT_APP_EMAIL_FROM || '',
        })
        .then((res) => {
          message[res.status === 200 ? 'success' : 'error'](t(res.message))
          if (res.status === 200) {
            setIsDisplayed(false)
          }
        })
    } else {
      message.error(t('auth.resetPassword.badResetPassword'))
    }
  }

  const handleChangePassword = (event) => {
    setNewPassword(event.target.value)
    for (const key in required) {
      if (required[key].regex.test(event.target.value)) {
        setRequired((prevState) => ({
          ...prevState,
          [key]: { ...required[key], valid: true },
        }))
      } else {
        setRequired((prevState) => ({
          ...prevState,
          [key]: { ...required[key], valid: false },
        }))
      }
    }
  }

  return (
    <Modal visible={isDisplayed} footer={[]} onCancel={() => setIsDisplayed(false)}>
      {currentStep.SEND_EMAIL ? (
        <ColumnCenter>
          <KeyIcon />
          <Title weight="bold">{t('auth.resetPassword.step1.title')}</Title>
          <Text size="18px" position="center">
            {t('auth.resetPassword.step1.subTitle')}
          </Text>

          <Column margin="50px 0 35px 0">
            <Text>{t('auth.resetPassword.step1.placeholder')}</Text>
            <Input
              onPressEnter={sendResetEmail}
              width="350px"
              placeholder={t('auth.resetPassword.step1.placeholder')}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Column>
          <BottomButtons validateCallback={sendResetEmail} setIsDisplayed={setIsDisplayed} t={t} />
        </ColumnCenter>
      ) : (
        <ColumnCenter>
          <KeyIcon />
          <Title weight="bold">{t('auth.resetPassword.step2.title')}</Title>
          <Row margin="50px 0 35px 0" responsive={`flex-direction: column; align-items: center`}>
            <Column margin="20px">
              <Text margin="0 0 5px 0">{t('auth.resetPassword.step2.placeholder')}</Text>
              <InputPassword
                width="350px"
                placeholder={t('auth.resetPassword.step2.placeholder')}
                onChange={handleChangePassword}
              />
              <Text margin="20px 0 5px 0">{t('auth.resetPassword.step2.placeholder2')}</Text>
              <InputPassword
                width="350px"
                placeholder={t('auth.resetPassword.step2.placeholder2')}
                onChange={(event) => setNewPasswordRepeat(event.target.value)}
              />
            </Column>
            <ColumnResetPasswordRules margin="20px">
              <Text size="16px">{t('auth.resetPassword.step2.rules.title')}</Text>
              <Row wrap>
                {Object.keys(required).map((rules) => (
                  <Rules valid={required[rules].valid} key={rules} margin="6px 20px 0 0">
                    {t(`auth.resetPassword.step2.rules.${rules}`)}
                  </Rules>
                ))}
              </Row>
            </ColumnResetPasswordRules>
          </Row>
          <BottomButtons
            validateCallback={validResetPassword}
            setIsDisplayed={setIsDisplayed}
            t={t}
          />
        </ColumnCenter>
      )}
    </Modal>
  )
}

export default ResetPassword
