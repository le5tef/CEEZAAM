export function makeEnvMetaTagString() {
  const envAllowList = ['NODE_ENV']
  const envAllowPrefix = 'SZ_'
  const envKeysValid = Object.keys(process.env).filter(
    (key) => key.includes(envAllowPrefix) || envAllowList.includes(key)
  )
  const envJsonString = JSON.stringify(
    envKeysValid.reduce((prev, cur) => ({ ...prev, ...{ [cur]: process.env[cur] } }), {})
  )

  console.log('Server to client env variables: ' + envKeysValid.toString().split(',').join(', '))

  return `<meta data-hid='prql-env' content='${envJsonString}'>`
}
