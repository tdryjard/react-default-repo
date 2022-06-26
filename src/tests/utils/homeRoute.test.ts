import { homeRouteUtils } from 'utils'

describe(`::homeRouteUtils.ts`, function () {
  describe('send => ROLE_SUPER_ADMIN', function () {
    it('expected => /super-admin-dashboard', function () {
      expect(homeRouteUtils('ROLE_SUPER_ADMIN')).toBe('/super-admin-dashboard')
    })
  })
  describe('send => ROLE_MANUFACTURER', function () {
    it('expected => /manufactuer-dashboard', function () {
      expect(homeRouteUtils('ROLE_MANUFACTURER')).toBe('/manufacturer-dashboard')
    })
  })
  describe('send => ROLE_DISTRIBUTOR', function () {
    it('expected => /distributor-dashboard', function () {
      expect(homeRouteUtils('ROLE_DISTRIBUTOR')).toBe('/distributor-dashboard')
    })
  })
  describe('send => ROLE_UNDEFINED', function () {
    it('expected => /login', function () {
      expect(homeRouteUtils('ROLE_UNDEFINED')).toBe('/login')
    })
  })
})
