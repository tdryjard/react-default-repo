export const baseUrl: string | undefined = process.env.REACT_APP_API_ENDPOINT

export const PATHS = {
  AUTH: {
    DEFAULT: 'login',
    ME: 'me',
    REFRESH: 'token/refresh',
    RESET: 'reset-password',
  },
}

export const ROUTE = (path: string): string => (baseUrl !== undefined ? `${baseUrl}${path}` : path)
