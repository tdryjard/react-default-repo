const cookies = {
  set: (cookies: Array<{ key: string; value: string }>): void => {
    cookies.forEach((cookie) => {
      document.cookie = `${cookie.key}=${cookie.value};path=/`
    })
  },
  get: (key: string): string => {
    const name = `${key}=`
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookiesArray = decodedCookie.split(';')
    for (let index = 0; index < cookiesArray.length; index++) {
      let cookie = cookiesArray[index]
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1)
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length)
      }
    }
    return ''
  },
  clear: (key = ''): void => {
    const cookies = document.cookie.split(';')
    if (key === '') {
      for (let index = 0; index < cookies.length; index++) {
        const cookie = cookies[index]
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`
      }
    } else document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`
  },
}

export default cookies
