let authToken: string | null = null

export function setAuthToken(token: string) {
  authToken = token
}

export function getAuthToken(): string | null {
  return authToken
}

export function clearAuthToken() {
  authToken = null
}