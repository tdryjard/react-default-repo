import { Dispatch, SetStateAction } from 'react'
import { ManufacturerSettings, DistributorSettings } from './api'

export interface UserProviderType {
  id: string
  email: string
  firstname: string
  lastname: string
  role: string
  switched: boolean
  token: string
  exp: string | number
  setting: ManufacturerSettings | DistributorSettings
  company: {
    id: string
    name: string
    logo: string
  }
}

export interface UserContextType {
  setUser: Dispatch<SetStateAction<UserProviderType>>
  user: UserProviderType
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  resetUser: () => void
}
