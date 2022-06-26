const status = {
  auth: {
    login: {
      200: 'auth.login.success',
      401: 'auth.login.error',
      403: 'auth.login.error',
      404: 'auth.login.error',
    },
    me: {
      200: 'auth.login.success',
      404: 'error',
      401: 'error',
    },
  },
}

export const response = async ({
  promise,
  serviceType,
  service,
}: {
  promise: any
  serviceType: string
  service: string
}): Promise<any> => {
  try {
    const res = await promise.json()
    return {
      ...res,
      status: promise.status,
      message: status[serviceType][service][promise.status],
    }
  } catch {
    return {
      status: promise.status,
      message: status[serviceType][service][promise.status],
    }
  }
}
