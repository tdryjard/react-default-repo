function tupleArrayToObject(entries): any {
  const result = {}
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value
  }
  return result
}

const getUrlParams = () => {
  const search = window.location.href?.split('?')[1]
  const urlParams = new URLSearchParams(search)
  const entries = urlParams.entries() //returns an iterator of decoded [key,value] tuples
  return tupleArrayToObject(entries)
}

export default getUrlParams
