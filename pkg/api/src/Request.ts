import {Method, Headers, Response, QueryString, APIError, config} from '.'
import RequestLogger from './RequestLogger'
import {getAuthToken} from './authentication'
import {encodeQueryString, endpointURL} from './util'

export interface Options {
  authenticate?: boolean
  headers?:      Headers
  query?:        QueryString
  timeout?:      number
}

export type Body = ArrayBuffer | string

export default class Request {

  constructor(method: Method, endpoint: string, options: Options = {}) {
    this.method   = method
    this.endpoint = endpoint

    Object.assign(this, options)
    Object.assign(this.headers, config.extraHeaders)

    if (options.authenticate !== false) {
      const token = getAuthToken()
      // tslint:disable-next-line no-string-literal
      this.headers['Authorization'] = token == null ? '' : `Bearer ${token}`
    }
  }

  method:         Method
  endpoint:       string
  headers:        Headers = {}
  query:          QueryString = {}
  timeout:        number = 0

  onOpenXHR?:     (xhr: XMLHttpRequest) => void

  logger: RequestLogger = new RequestLogger(this)

  get url(): string {
    return endpointURL(this.endpoint)
  }

  send(body: Body | null): Promise<Response> {
    const xhr = this.openXHR()

    return new Promise(resolve => {
      xhr.onload = () => {
        this.logger.log(xhr, body)
        resolve(this.handleResponse(xhr))
      }
      xhr.onerror = () => {
        this.logger.log(xhr, body)
        resolve(this.handleResponse(xhr))
      }
      xhr.ontimeout = () => {
        this.logger.log(xhr, body, 'time-out')
        resolve(this.handleResponse(xhr))
      }

      xhr.send(body)
    })
  }

  openXHR(): XMLHttpRequest {
    const xhr = new XMLHttpRequest()

    let url = this.url
    if (this.query != null) {
      url += `?${encodeQueryString(this.query)}`
    }

    xhr.open(this.method.toUpperCase(), url)

    xhr.timeout = this.timeout

    for (const name of Object.keys(this.headers)) {
      xhr.setRequestHeader(name, this.headers[name])
    }

    if (this.onOpenXHR != null) {
      this.onOpenXHR(xhr)
    }

    return xhr
  }

  handleResponse(xhr: XMLHttpRequest): Response {
    const {status} = xhr

    let contentType = xhr.getResponseHeader('Content-Type')
    if (contentType != null) {
      contentType = contentType.split(';')[0]
    }

    let json = null
    if (contentType === 'application/vnd.api+json' || contentType === 'application/json') {
      try {
        json = JSON.parse(xhr.responseText)
      } catch {} // tslint:disable-line no-empty
    }

    const error = status === 0 || status >= 400 ? APIError.deserialize(status, json) : null
    if (error != null) {
      config.onError(error)
    }

    return {status, json, error}
  }

}