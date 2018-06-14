export type Serialized = any

export interface Extra {
  [key: string]: any
}

export default class SocketError extends Error {

  constructor(
    public status: number = 500,
    message: string,
    extra: Extra = {}
  ) {
    super(message)

    this.status = status
    this.extra = extra
  }

  extra: Extra

  static deserialize(data: Serialized) {
    if (typeof data === 'string') {
      data = {status: null, message: data}
    }

    let {status, message, ...extra} = data
    if (typeof status !== 'number') { status = 500 }
    if (typeof message !== 'string') { message = "Unknown error" }

    return new SocketError(status, message, extra)
  }

}