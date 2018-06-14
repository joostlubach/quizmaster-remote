import config from '../config'

export default function endpointURL(endpoint: string): string {
  const {baseURL} = config
  if (baseURL == null) { return endpoint }

  if (/^\//.test(endpoint)) {
    return `${baseURL}${endpoint}`
  } else {
    return `${baseURL}/${endpoint}`
  }
}