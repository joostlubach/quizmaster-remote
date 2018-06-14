import {APIError} from '.'

export enum Method {
  get    = 'get',
  post   = 'post',
  put    = 'put',
  patch  = 'patch',
  delete = 'delete',
}

export interface Headers {
  [name: string]: string
}

export interface QueryString {
  [name: string]: StringConvertible | null | undefined
}

export type StringConvertible = null | number | string | boolean | {toString: () => string}

export interface Response {
  status: number
  error:  APIError | null
  json:   any | null
}

export interface UploadProgress {
  sent:  number
  total: number
}