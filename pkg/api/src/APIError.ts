export default class APIError extends Error {

  constructor(
    public status: number = 500,
    message?: string
  ) {
    super(message || `HTTP ${status}`)
  }

  static deserialize(status: number, json: any) {
    if (json == null) {
      return new APIError(status)
    }
    if (typeof json.error === 'string') {
      return new APIError(status, json.error)
    }
    if (typeof json.reason === 'string') {
      return new APIError(status, json.reason)
    }
    if (typeof json.message === 'string') {
      return new APIError(status, json.message)
    }
    if (typeof json.error === 'object' && typeof json.error.message === 'string') {
      return new APIError(status, json.error.message)
    }

    return new APIError(status)
  }

}