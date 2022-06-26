import React from 'react'
import { screen } from '@testing-library/dom'

import ComponentWrapper from './ComponentWrapper'

import { Login } from 'pages'

describe(':: <Login/>', function () {
  describe('When => render <Login/>', function () {
    it('Expect => <Login/> be visible', function () {
      ComponentWrapper({ children: <Login /> })
      const loginPage = screen.getByTestId('login-page')
      expect(loginPage).toBeVisible()
    })
  })
})
