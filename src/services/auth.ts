import { AuthServices } from 'types/api'
import { PATHS, ROUTE, getHeader, response } from 'api'

const login: AuthServices = {
  login: async (body) => {
    const headers = await getHeader('default', false)
    const promise = await fetch(`${ROUTE(PATHS.AUTH.DEFAULT)}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
    return await response({ promise, serviceType: 'auth', service: 'login' })
  },

  create: async (body) => {
    const headers = await getHeader('default', false)
    const promise = await fetch(`${ROUTE(PATHS.AUTH.DEFAULT)}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
    return await response({ promise, serviceType: 'auth', service: 'create' })
  },

  me: async () => {
    const headers = await getHeader('default', true)
    const promise = await fetch(`${ROUTE(PATHS.AUTH.ME)}`, {
      method: 'GET',
      headers,
    })
    return await response({ promise, serviceType: 'auth', service: 'me' })
  },

  switch: async (body) => {
    const headers = await getHeader('default', true)
    const promise = await fetch(`${ROUTE(PATHS.AUTH.DEFAULT)}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
    return await response({ promise, serviceType: 'auth', service: 'switch' })
  },

  refresh: async (body) => {
    const headers = await getHeader('default', false)
    const promise = await fetch(`${ROUTE(PATHS.AUTH.REFRESH)}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
    return await response({ promise, serviceType: 'auth', service: 'refresh' })
  },

  reset: async (body) => {
    const headers = await getHeader('default', false)
    const promise = await fetch(`${ROUTE(PATHS.AUTH.DEFAULT)}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
    return await response({ promise, serviceType: 'auth', service: 'reset' })
  },

  validReset: async (body) => {
    const headers = await getHeader('default', false)
    const promise = await fetch(`${ROUTE(PATHS.AUTH.RESET)}/save`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
    return await response({ promise, serviceType: 'auth', service: 'validReset' })
  },
}

export default login
