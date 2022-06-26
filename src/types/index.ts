export interface Route {
  name: string
  path: string
  access: string[] | '*'
  haveMenu: boolean
}

export interface RoutesType {
  [k: string]: Route
}

export interface JWTPayload {
  company: string
  exp: number
  iat: number
  roles: string[]
  username: string
}

export interface Roles {
  SUPER_ADMIN: string
}

export interface AccountTypes {
  SUPER_ADMIN: string
}

export interface Distributor {
  email: string
  name: string
  logo: string
  manufacturers: { name: string; logo: string }[]
  setting: {
    contractNumber: string
    endOfContract: string
    depositMethod: string
    clientCodeFormat: string
    invoiceCodeFormat: string
    updateDataFrequency: string
    type: string
  }
}

export interface Manufacturer {
  name: string
  logo: string
  distributors: { name: string; logo: string }[]
  setting: {
    contractNumber: string
    endOfContract: string
    programName: string
    programUrl: string
    consentFormTitle: string
    consentFormContent: string
    type: string
  }
}
