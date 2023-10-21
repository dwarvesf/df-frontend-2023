let accessToken: string | null = null

export const removeCredentials = () => {
  accessToken = null
  localStorage.removeItem('accessToken')
}
export const getCredentials = () => {
  if (!accessToken) {
    const token = localStorage.getItem('accessToken')
    accessToken = token
  }
  return accessToken
}

export const storeCredentials = (Token: string | null) => {
  if (!Token) return
  accessToken = Token
  window.localStorage.setItem('accessToken', Token)
}
