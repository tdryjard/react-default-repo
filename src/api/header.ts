import { cookies } from 'services'
import { getCheckedToken } from 'utils'
import { COOKIES } from 'constants/index'

export const getHeader = async (
  type: 'file' | 'default' = 'default',
  auth = true,
  token = cookies.get(COOKIES.TOKEN),
): Promise<Record<string, string>> => {
  let lastToken = token

  if (auth) {
    // CHECK IF WE RECEIVE AN EXPIRED CUSTOM TOKEN, TAKE THE LAST TOKEN REFRESH IN COOKIES
    lastToken = await getCheckedToken()
  }

  if (auth) {
    switch (type) {
      case 'file':
        return {
          Authorization: `Bearer ${lastToken}`,
        }
      default:
        return {
          Authorization: `Bearer ${lastToken}`,
          'content-Type': 'application/json; charset=UTF-8',
          'Accept-Language': 'fr-FR',
        }
    }
  }
  return { 'content-Type': 'application/json; charset=UTF-8' }
}
