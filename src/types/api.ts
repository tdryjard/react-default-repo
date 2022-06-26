export interface ResponseStatus {
  status?: number
  message: string
}

export interface DistributorSettings {
  contractNumber: string
  endOfContract: string
  depositMethod: string
  clientCodeFormat: string
  invoiceCodeFormat: string
  updateDataFrenquency: string
  type: string
}

export interface ManufacturerSettings {
  contractNumber: string
  endOfContract: string
  programName: string
  programUrl: string
  consentFormTitle: string
  consentFormContent: string
  type: string
}

export interface CreateUserRequestBody {
  email: string
  templateUrl: string
  subject: string
  fromName: string
  fromEmail: string
  replyTo: string
  password: string
  activationToken: string
}

export interface ResetPasswordRequestBody {
  email: string
  templateUrl: string | undefined
  subject: string
  fromName: string
  fromEmail: string
  replyTo: string
  redirectUrl: string
}

export interface ValidResetPasswordRequestBody {
  email: string
  templateUrl: string | undefined
  password: string
  subject: string
  fromName: string
  fromEmail: string
  replyTo: string
  activationToken: string
}

export interface LoginResponse extends ResponseStatus {
  token: string
  refreshToken: string
}

export interface SavePasswordResponse extends ResponseStatus {
  message: string
}

export interface SwitchResponse extends ResponseStatus {
  token: string
}

export type RefreshTokenResponse = LoginResponse

export interface ResetPasswordResponse extends ResponseStatus {
  message: string
}

export interface MeResponse extends ResponseStatus {
  user: {
    id: string
    email: string
    firstname: string
    lastname: string
    role: string
    switched: boolean
    setting: DistributorSettings | ManufacturerSettings
  }
  company: {
    id: string
    name: string
    logo: string
  }
}

export interface AuthServices {
  login: (body: { username: string; password: string }) => Promise<LoginResponse>
  create: (body: CreateUserRequestBody) => Promise<SavePasswordResponse>
  me: () => Promise<MeResponse>
  switch: (body: { company: string }) => Promise<SwitchResponse>
  refresh: (body: { refreshToken: string }) => Promise<RefreshTokenResponse>
  reset: (body: ResetPasswordRequestBody) => Promise<ResetPasswordResponse>
  validReset: (body: ValidResetPasswordRequestBody) => Promise<SavePasswordResponse>
}

export interface ReferencesDistributor {
  '@context': string
  '@id': string
  '@type': string
  uuid: string
}

export interface DistributorMember {
  '@id': string
  '@type': string
  email: string
  manufacturers: string[]
  name: string
  logo: string
  uuid: string
  administrators: number
  references: number
  referenceDistributor: ReferencesDistributor[]
}

export interface FindDistributorsResponse extends ResponseStatus {
  'hydra:member': DistributorMember[]
}

export interface ManufacturerMember {
  '@id': string
  '@type': string
  distributors: string[]
  name: string
  logo: string
  administrators: number
  references: number
}

export interface FindManufacturersResponse extends ResponseStatus {
  'hydra:member': ManufacturerMember[]
}

export interface ReferencesDistributor {
  '@context': string
  '@id': string
  '@type': string
  uuid: string
}

export interface DistributorMember {
  '@id': string
  '@type': string
  email: string
  name: string
  logo: string
  uuid: string
  administrators: number
  references: number
  referenceDistributor: ReferencesDistributor[]
  manufacturers: string[]
  setting: DistributorSettings
}

export interface FindDistributorsResponse extends ResponseStatus {
  'hydra:member': DistributorMember[]
}

export interface FindOneDistributorResponse extends ResponseStatus, DistributorMember {}

export interface DistributorsServices {
  create: (body: FormData) => Promise<ResponseStatus>
  find: ({
    page,
    itemsPerPage,
  }: {
    page: number
    itemsPerPage: number
  }) => Promise<FindDistributorsResponse>
  findOne: ({ id }: { id: string }) => Promise<FindOneDistributorResponse>
  update: (body: FormData, { id }: { id: string }) => Promise<FindOneDistributorResponse>
  exportConsent: ({ id }: { id: string }) => Promise<ResponseStatus>
}

export interface ManufacturerMember {
  '@id': string
  '@type': string
  name: string
  logo: string
  administrators: number
  references: number
  distributors: string[]
  setting: ManufacturerSettings
  email: string
}

export interface FindManufacturersResponse extends ResponseStatus {
  'hydra:member': ManufacturerMember[]
}

export interface FindOneManufacturerResponse extends ResponseStatus, ManufacturerMember {}

export interface ManufacturersServices {
  create: (body: FormData) => Promise<ResponseStatus>
  find: ({
    page,
    itemsPerPage,
  }: {
    page: number
    itemsPerPage: number
  }) => Promise<FindManufacturersResponse>
  findOne: ({ id }: { id: string }) => Promise<FindOneManufacturerResponse>
  update: (body: FormData, { id }: { id: string }) => Promise<FindOneManufacturerResponse>
  exportConsent: ({ id }: { id: string }) => Promise<ResponseStatus>
}
