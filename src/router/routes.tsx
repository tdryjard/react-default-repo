import { RoutesType } from 'types'
import { ROLES } from 'constants/index'

const routes: RoutesType = {
  login: {
    path: '/login',
    name: 'login',
    access: '*',
    haveMenu: false,
  },
}

export default routes
