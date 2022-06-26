import React, { FC, ReactNode, useState } from 'react'
import { cookies } from 'services'

import { UserProviderType, UserContextType } from 'types/providers'

interface ProviderProps {
  children: ReactNode
}

const initialState = {
  id: '',
  email: '',
  firstname: '',
  lastname: '',
  token: '',
  exp: '',
  role: '',
  switched: false,
  company: {
    id: '',
    name: '',
    logo: '',
  },
  setting: {
    contractNumber: '',
    endOfContract: '',
    programName: '',
    programUrl: '',
    consentFormTitle: '',
    consentFormContent: '',
    type: '',
  },
}

const defaultContext = {
  isAuthenticated: false,
  setIsAuthenticated: () => false,
  resetUser: () => false,
  user: initialState,
  setUser: () => true,
}

export const UserContext = React.createContext<UserContextType>(defaultContext)

UserContext.displayName = 'User'

const UserProvider: FC<ProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<UserProviderType>(initialState)

  const resetUser = (): void => {
    setUser(initialState)
    setIsAuthenticated(false)
    cookies.set([
      { key: 'token', value: '' },
      { key: 'refreshToken', value: '' },
    ])
  }

  const context = {
    isAuthenticated,
    setIsAuthenticated,
    resetUser,
    setUser,
    user,
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserProvider
