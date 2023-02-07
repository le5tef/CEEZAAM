export function getQueryFromString(str: string): string {
  return str.split('?')[1] || ''
}

export function encodeQuery(queryObject: any) {
  return Object.keys(queryObject)
    .map((key) => {
      let keyValue = ''
      const k = key
      const v = queryObject[key] === 'undefined' ? '' : queryObject[key]

      keyValue += k

      if (v) keyValue += `=${v}`

      return keyValue
    })
    .join('&')
}

export function decodeQuery(str: string) {
  // отрезаем все лишнее включая знак вопроса, остаются только парамеры=значения через символ &
  const queryString = getQueryFromString(str)

  if (!queryString) return {}

  return decodeURI(queryString)
    .split('&')
    .reduce((acc, val) => {
      const pair = val.split('=')

      // @ts-ignore
      acc[pair[0]] = pair[1] + ''

      return acc
    }, {})
}
