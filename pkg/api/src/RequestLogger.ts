import Request, {Body} from './Request'
import {encodeQueryString} from './util'
import Logger from 'logger'
import config from './config'

export default class RequestLogger {

  constructor(readonly request: Request) {}

  logger = new Logger('API')

  log(xhr: XMLHttpRequest, body: Body | null, statusText: string | null = null) {
    if (statusText == null) {
      statusText = xhr.status.toString()
    }

    let url = this.request.url
    if (this.request.query != null) {
      url += `?${encodeQueryString(this.request.query)}`
    }

    const level = xhr.status < 200 || xhr.status >= 400 ? 'error' : 'info'
    const message = [this.request.method.toUpperCase(), url, `(${xhr.status})`].join(' ')
    const details = []

    details.push(header('Request headers'))
    const requestHeaders = Object.keys(this.request.headers)
      .filter(name => !!name)
      .map(name => `${name}: ${this.request.headers[name]}`)

    details.push(indent(alignHeaders(requestHeaders.join('\n'))))

    details.push(header('Response headers'))
    details.push(indent(alignHeaders(xhr.getAllResponseHeaders())))

    if (this.request.method !== 'get') {
      details.push(header('Request body'))
      details.push(indent(formatBody(body)))
    }

    details.push(header('Response body'))
    details.push(indent(formatBody(xhr.responseText)))

    this.logger[level](message, details)

    if (config.onLogRequest) {
      config.onLogRequest(level, message, [])
    }
  }

}

function formatBody(body: Body | null) {
  if (body == null) { return '(Empty)' }
  if (typeof body !== 'string') { return '(Binary)' }

  try {
    const json = JSON.parse(body)
    return JSON.stringify(json, null, 2)
  } catch {
    return body === '' ? '(Empty)' : body
  }
}

function header(text: string) {
  return {text, style: 'font-weight: bold;'}
}

function indent(text: string) {
  return text.split('\n').map(l => `  ${l}`).join('\n')
}

function alignHeaders(headersText: string): string {
  if (headersText == null || headersText.trim().length === 0) { return '(None)' }
  const headers = headersText.split('\n').map(h => h.trim())

  const max = Math.max(...headers.map(h => h.indexOf(':')))
  return headers.map(header => {
    const [name, value] = header.split(':')

    let pad = ' '
    for (let i = name.length; i < max; i++) { pad += ' ' }
    return `${name}:${pad}${value}`
  }).join('\n')
}
