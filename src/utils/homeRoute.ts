import { routes } from 'router'

export const homeRouteUtils = (role): string => {
  return routes[Object.keys(routes).find((key) => routes[key].name === role) || 'login']?.path
}
