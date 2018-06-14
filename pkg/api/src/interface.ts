import Request, {Options} from './Request'
import {QueryString, Response, Method, UploadProgress} from '.'
import {omit} from 'lodash'

export type UploadOptions = Options & {
  method?:     Method.post | Method.put | Method.patch,
  onProgress?: (progress: UploadProgress) => any
}

export function get(endpoint: string, query: QueryString | null = null, options: Options = {}): Promise<Response> {
  const request = new Request(Method.get, endpoint, query == null ? options : {...options, query})
  return request.send(null)
}

export function post(endpoint: string, data: any | null = null, options: Options = {}): Promise<Response> {
  const request = new Request(Method.post, endpoint, options)
  if (data != null && request.headers['Content-Type'] == null) {
    request.headers['Content-Type'] = 'application/vnd.api+json'
  }

  const json = data == null ? null : JSON.stringify(data)
  return request.send(json)
}

export function put(endpoint: string, data: any | null, options: Options = {}): Promise<Response> {
  const request = new Request(Method.put, endpoint, options)
  if (data != null && request.headers['Content-Type'] == null) {
    request.headers['Content-Type'] = 'application/vnd.api+json'
  }

  const json = data == null ? null : JSON.stringify(data)
  return request.send(json)
}

export function patch(endpoint: string, data: any | null, options: Options = {}): Promise<Response> {
  const request = new Request(Method.patch, endpoint, options)
  if (data != null && request.headers['Content-Type'] == null) {
    request.headers['Content-Type'] = 'application/vnd.api+json'
  }

  const json = data == null ? null : JSON.stringify(data)
  return request.send(json)
}

export function del(endpoint: string, data: any | null = null, options: Options = {}): Promise<Response> {
  const request = new Request(Method.delete, endpoint, options)
  if (data != null && request.headers['Content-Type'] == null) {
    request.headers['Content-Type'] = 'application/vnd.api+json'
  }

  const json = data == null ? null : JSON.stringify(data)
  return request.send(json)
}

export function upload(endpoint: string, data: any, options: UploadOptions = {}): Promise<Response> {
  const request = new Request(options.method || Method.post, endpoint, omit(options, 'method'))

  // Upload as JSON.
  if (request.headers['Content-Type'] == null) {
    request.headers['Content-Type'] = 'application/vnd.api+json'
  }

  // Tell the server to allow larger requests.
  request.headers['X-Upload'] = '1'

  request.onOpenXHR = xhr => {
    const {onProgress} = options
    if (onProgress == null) { return }

    xhr.upload.onprogress = event => {
      onProgress({sent: event.loaded, total: event.total})
    }
  }

  const json = JSON.stringify(data)
  return request.send(json)
}
